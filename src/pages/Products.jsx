import ProductCard from "../components/ProductsCard";
import { NavLink } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useState } from "react";
import { db } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { useEffect } from "react";
import CategoryFilter from "../components/CategoryFilter";
import { useLocation } from "react-router-dom";

function Products() {
    const [category, setCategory] = useState("Todos"); // Hook para guardar la categoría seleccionada
    const [products, setProducts] = useState([]); // Hook para guardar los productos
    const [loading, setLoading] = useState(true); // Hook para guardar el estado de carga

    const location = useLocation(); // Hook para obtener la ubicación actual
    const queryParams = new URLSearchParams(location.search); // Obtiene los parámetros de la URL
    const search = decodeURIComponent(queryParams.get("search") || ""); //decodeURIComponent para decodificar el parámetro de búsqueda, por si tiene espacios o caracteres especiales
    //Función para normalizar el texto
    const normalizar = (texto) => texto
        ?.toLowerCase()
        ?.normalize("NFD")
        ?.replace(/[\u0300-\u036f]/g, "");

    //Obtener productos de firebase
    useEffect(() => {
        const obtenerProductos = async () => {
            setLoading(true); // Estado de carga
            try {
                const querySnapshot = await getDocs(collection(db, "products")); // Obtiene todos los documentos de la colección
                const productsArray = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })); // Mapear los datos
                setProducts(productsArray); // Guardar los datos
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false); // Guardar el estado de carga
            }
        };
        obtenerProductos();
        //Se ejecuta cada vez que cambia el search o la location.search
    }, [search, location.search]);

    if (loading) {
        return <div className="container py-5 text-center">Cargando productos...</div>
    }

    if (!products) {
        return <div className="container py-5 text-center">Productos no encontrados</div>
    }
    //FILTRO POR BUSQUEDA
    const filtroProductos = products.filter((product) => {
        const elegirCategoria =
            category === "Todos" ||
            product.category?.toLowerCase() === category?.toLowerCase();
        const elegirBusqueda =
            !search ||
            normalizar(product.name).includes(normalizar(search));
        // Devuelve solo si el producto coincide con la busqueda
        return elegirCategoria && elegirBusqueda;
    });


    return (
        <Container className="container py-5">
            <h2 className="mb-4">Productos</h2>
            <div className="row g-4">
                <CategoryFilter currentCategory={category} onCategoryChange={setCategory} />
                {filtroProductos.length === 0 ? (
                    <div className="text-center py-5 w-100">
                        <h5>No se encontraron productos</h5>
                        {search && (
                            <p className="text-muted">
                                No hay resultados para "<strong>{search}</strong>"
                            </p>
                        )}
                        <button className="btn btn-dark mt-3" onClick={() => window.location.href = "/products"}>Ver todos los productos</button>
                    </div>
                ) : (
                    // Hace un bucle para cada producto para generar una tarjeta por cada uno 
                    filtroProductos.map((product) => (
                        <div key={product.id} className="col-md-6 col-lg-3">
                            <ProductCard product={product} as={NavLink} to={`/product/${product.id}`} />
                        </div>
                    ))
                )}
            </div>
        </Container>
    )
}

export default Products