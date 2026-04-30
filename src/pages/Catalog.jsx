import ProductCard from "../components/ProductsCard";
import { NavLink } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useState } from "react";
import { db } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { useEffect } from "react";
import CategoryFilter from "../components/CategoryFilter";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import PageBanner from "../components/PageBanner";
import bannerProductos from "../assets/banner_productos.jpg";
import bannerAccesorios from "../assets/banner_accesorios.jpg";
function Catalog({ limit, type: typeFromProps }) {
    const { type: typeFromParams } = useParams();
    const type = typeFromProps || typeFromParams; // Obtiene el tipo de producto de las props o de los parámetros de la URL
    //console.log("tipo: ", type);
    //Hooks para guardar la información
    const [category, setCategory] = useState("Todos"); // Hook para guardar la categoría seleccionada
    const [products, setProducts] = useState([]); // Hook para guardar los productos
    const [loading, setLoading] = useState(true); // Hook para guardar el estado de carga

    const location = useLocation(); // Hook para obtener la ubicación actual
    const queryParams = new URLSearchParams(location.search); // Obtiene los parámetros de la URL

    const search = decodeURIComponent(queryParams.get("search") || ""); //decodeURIComponent para decodificar el parámetro de búsqueda, por si tiene espacios o caracteres especiales

    //Función para normalizar el texto
    const normalizarTexto = (texto) => texto
        ?.toLowerCase()
        ?.normalize("NFD")
        ?.replace(/[\u0300-\u036f]/g, "");

    //Obtener productos de firebase
    useEffect(() => {
        const obtenerProductos = async () => {
            setLoading(true); // Estado de carga
            try {
                const querySnapshot = await getDocs(collection(db, "catalog")); // Obtiene todos los documentos de la colección
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
    }, [search, location.search, type]); // type se agrega para que se actualice cuando cambia el tipo de producto
    //search y location.search se actualizan cuando cambia el search o la location.search

    //Si no hay productos, muestra un mensaje de carga
    if (loading) {
        return <div className="container py-5 text-center">Cargando productos...</div>
    }

    if (!products) {
        return <div className="container py-5 text-center">Productos no encontrados</div>
    }

    const filtroProductos = products.filter((product) => {
        //FILTRO POR TIPO
        let elegirTipo = true;
        if (type === "novedades") {
            elegirTipo = product.featured === true;
        } else if (type === "ofertas") {
            elegirTipo = product.onSale === true;
        } else if (type && type !== "Todos") { // Si el tipo no es Todos, filtra por tipo
            elegirTipo = product.type?.toLowerCase() === type?.toLowerCase();
        }
        //FILTRO POR CATEGORIA
        const elegirCategoria =
            category === "Todos" ||
            product.category?.toLowerCase() === category?.toLowerCase();
        //FILTRO POR BUSQUEDA
        const elegirBusqueda =
            !search ||
            normalizarTexto(product.name).includes(normalizarTexto(search));
        // Devuelve solo si el producto coincide con la busqueda
        return elegirTipo && elegirCategoria && elegirBusqueda;
    });

    //Mostrar titulo segun el tipo de producto
    const mostrarTitulo = () => {
        if (type === "accesorios") {
            return "Accesorios";
        } else if (type === "productos") {
            return "Productos";
        } else if (type === "novedades") {
            return "Destacados";
        } else if (type === "ofertas") {
            return "Ofertas";
        } else {
            return "Catálogo";
        }
    }

    //Limite de productos para la pagina de inicio
    const productosVisibles = limit ? filtroProductos.slice(0, limit) : filtroProductos;
    console.log("Filtro productos: ", filtroProductos.length)
    console.log("limit: ", limit)
    console.log("type: ", type)
    // Función para elegir el banner según el tipo
    const getBanner = () => {
        switch (type) {
            case "productos": return { img: bannerProductos, title: "Productos" }
            case "accesorios": return { img: bannerAccesorios, title: "Accesorios" }
            case "novedades": return { img: bannerProductos, title: "Destacados" }
            case "ofertas": return { img: bannerProductos, title: "Ofertas" }
            default: return null
        }
    }
    const banner = getBanner()
    return (
        <>
            {/* Banner solo si no se pasa el limite, es decir, si no estamos en la pagina principal Home */}
            {banner && !limit && <PageBanner title={banner.title} image={banner.img} />}
            <Container className="py-3">
                <div className="d-flex justify-content-between align-items-center mb-4" >
                    {/* Boton para ver todos los productos */}
                    {limit && (
                        <>
                            <h2>{mostrarTitulo()}</h2>
                            <NavLink to={`/catalog/${type?.toLowerCase() || ""}`} className="btn btn-outline-dark btn-sm px-4">Ver todos</NavLink>
                        </>
                    )}
                </div>
                <div className="row g-4 align-items-stretch">
                    <CategoryFilter type={type} currentCategory={category} onCategoryChange={setCategory} />
                    {productosVisibles.length === 0 ? (
                        <div className="text-center py-5 w-100">
                            <h5>No se encontraron productos</h5>
                            {search && (
                                <p className="text-muted">
                                    No hay resultados para "<strong>{search}</strong>"
                                </p>
                            )}
                            <button className="btn btn-dark mt-3" onClick={() => window.location.href = "/catalog"}>Ver todos los productos</button>
                        </div>
                    ) : (
                        // Hace un bucle para cada producto para generar una tarjeta por cada uno 
                        productosVisibles.map((product) => (
                            <div key={product.id} className="col-md-6 col-lg-3">
                                <ProductCard product={product} as={NavLink} to={`/catalog/item/${product.id}`} alt={`Imagen de ${product.name}`} />
                            </div>
                        ))
                    )}
                </div>

            </Container>
        </>
    )
}

export default Catalog