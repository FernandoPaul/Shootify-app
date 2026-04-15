import { useState } from "react";
import { db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { useEffect } from "react";
import { FaShoppingCart, FaRegHeart } from 'react-icons/fa';
import { useParams } from "react-router-dom";
import './ProductDetail.css'

function ProductDetail() {
    //Producto
    const { id } = useParams(); // Obtiene el id del producto de la URL
    //const id = "TPDGXSgIVAy7kkLhyiUk";
    console.log(id);

    //Variable que almacena el producto
    const [product, setProduct] = useState(null);
    //Variable que detecta si el producto se está cargando
    const [loading, setLoading] = useState(true);
    //Variable que almacena la imagen seleccionada
    const [selectedImage, setSelectedImage] = useState(null); /* Inicializa con null, luego se actualiza */
    //Variable que almacena la cantidad
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const obtenerProducto = async () => {
            setLoading(true); // Estado de carga
            try {
                const productDoc = doc(db, "products", id); // Simplificado
                const querySnapshot = await getDoc(productDoc);

                if (querySnapshot.exists()) {
                    setProduct({ id: querySnapshot.id, ...querySnapshot.data() });

                } else {
                    console.log("No such product!");
                }
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setLoading(false);
            }
        }
        obtenerProducto();
    }, [id])

    if (loading) {
        return <div className="container py-5 text-center">Cargando producto...</div>
    }

    if (!product) {
        return <div className="container py-5 text-center">Producto no encontrado</div>
    }

    // MOSTRAR PRODUCTO
    return (
        <div className="container py-5">
            <div className="row ">
                {/* Izquierda: Imagenes */}
                <div className="col-md-6">
                    <div className="main-image">
                        {/* Verificamos si product.image y url existen antes de acceder */}
                        {product.image && product.image.length > 0 ? (
                            <img src={selectedImage || product.image[0]} alt={product.name} className="img-fluid rounded" />
                        ) : (
                            <div className="bg-light p-5 text-center">Imagen no disponible</div>
                        )}
                    </div>
                    {/* Imagenes pequeñas */}
                    <div className="d-flex gap-2 mt-3">
                        {product.image && product.image.map((img, index) => (
                            <div key={index}
                                className={`thumb ${selectedImage === img ? 'active' : ''}`}
                                onClick={() => setSelectedImage(img)} >
                                <img src={img} alt={product.name} className="rounded" />
                            </div>
                        ))}
                    </div>

                </div>
                {/* Derecha: Info */}
                <div className="col-md-6">
                    <small className="text-muted">{product.brand}</small>
                    <h2 className="mt-2">{product.name}</h2>
                    {/* RATING */}

                    {/* PRECIO */}
                    <div className="d-flex align-items-center gap-2 mb-3">
                        <h3 className="d-inline">{product.price}€</h3>
                        {product.oldPrice == 0 ? (
                            <></>
                        ) : (
                            <span className="text-decoration-line-through text-muted">{product.oldPrice}€</span>
                        )}
                    </div>
                    {/* CANTIDAD*/}
                    <div className="d-flex justify-content-start align-items-center gap-2 mb-3">
                        <button className="btn btn-outline-secondary" onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}>-</button>
                        <div className="qty-num ">{quantity}</div>
                        <button className="btn btn-outline-secondary" onClick={() => setQuantity(quantity < product.stock ? quantity + 1 : product.stock)}>+</button>
                        {/* STOCK */}
                        {product.stock <= 10 ? (
                            <small className="text-danger"> {product.stock} unidades disponibles</small>
                        ) : (
                            <></>
                        )
                        }
                    </div>

                    {/* BOTÓNES */}
                    <div className="d-grid gap-2">
                        <button className="btn btn-dark w-100 mb-3"><FaShoppingCart /> Añadir al carrito</button>
                        <button className="btn btn-outline-dark w-100"><FaRegHeart /> Añadir a favoritos</button>
                    </div>
                    {/* DESCRIPCIÓN */}
                    <div className="mt-4">
                        <h4>Descripción</h4>
                        <p className="text-muted">{product.description}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail