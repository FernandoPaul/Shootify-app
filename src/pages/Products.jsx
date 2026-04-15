import ProductCard from "../components/ProductsCard";
import { NavLink } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useState } from "react";
import { db } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { useEffect } from "react";

function Products() {
    /*
    // DATOS DE PRUEBA (Luego vendra de firebase)
    const product = [
        {
            id: 1,
            nombre: "Trípode Palo Selfie",
            categoria: "Trípodes",
            descripcion: "Trípode monopie con control remoto bluetooth, 168cm de altura",
            precio: 15.99,
            precioAnterior: 25.99,
            oferta: true,
            marca: "CAMBOFOTO",
            stock: 10,
            destacado: true,
            imagen: tripodeSelfie,
            tags: ["iphone", "android", "tripode", "selfie", "bluetooth", "168cm"],
        }, {

            id: 2,
            nombre: "Trípode con Magsafe - MT85",
            categoria: "Trípodes",
            descripcion: "Trípode con soporte magnético para MagSafe con control remoto bluetooth, 150cm de altura ",
            precio: 34.99,
            precioAnterior: 49.99,
            oferta: true,
            marca: "ULANZI",
            stock: 10,
            destacado: true,
            imagen: tripodeMagsafe,
            tags: ["iphone", "android", "magsafe", "tripode", "150cm", "bluetooth"],
        }
    ]
    */
    const [products, setProducts] = useState([]); // Hook para guardar los productos
    const [loading, setLoading] = useState(true); // Hook para guardar el estado de carga

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
    }, []);

    if (loading) {
        return <div className="container py-5 text-center">Cargando productos...</div>
    }

    if (!products) {
        return <div className="container py-5 text-center">Productos no encontrados</div>
    }

    return (
        <Container className="container py-5">
            <h2 className="mb-4">Productos</h2>
            <div className="row g-4">
                {/* Hace un bucle para cada producto para generar una tarjeta por cada uno */}
                {products.map((product) => (
                    <div key={product.id} className="col-md-6 col-lg-3">
                        <ProductCard product={product} as={NavLink} to={`/product/${product}`} />
                    </div>
                ))}
            </div>
        </Container>
    )
}

export default Products