import { useState } from "react";
import { db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCart } from '../context/CartContext'
import { toast } from 'react-toastify'
import './ProductDetail.css'
import 'bootstrap-icons/font/bootstrap-icons.css';


function ProductDetail() {
    //Producto
    const { id } = useParams(); // Obtiene el id del producto o accesorio de la URL
    //Variable que almacena el producto
    const [product, setProduct] = useState(null);
    //Variable que detecta si el producto se está cargando
    const [loading, setLoading] = useState(true);
    //Variable que almacena la imagen seleccionada
    const [selectedImage, setSelectedImage] = useState(null); /* Inicializa con null, luego se actualiza */
    //Variable que almacena la cantidad
    const [quantity, setQuantity] = useState(1);

    //Variables para las opciones de las carcasas
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedModel, setSelectedModel] = useState(null);

    // variables para el carrito
    const { addToCart } = useCart()

    useEffect(() => {
        const obtenerProducto = async () => {
            setLoading(true); // Estado de carga
            try {
                const productDoc = doc(db, "catalog", id); // Simplificado para que funcione con cualquier id
                const querySnapshot = await getDoc(productDoc);

                if (querySnapshot.exists()) {
                    //Obtiene el producto y lo guarda en la variable product
                    setProduct({ id: querySnapshot.id, ...querySnapshot.data() });

                    //Si el producto tiene opciones, selecciona la primera opción por defecto. Esto es para que no de error al cargar la página.
                    if (data.options && data.options.length > 0) {
                        //Variables para las opciones de las carcasas
                        setSelectedColor(product.options[0].color[0]);
                        setSelectedModel(product.options[0].model[0]);
                    }
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
    }, [id]) // [id] hace que la función se ejecute cada vez que el id cambia

    // Manejador del carrito
    const handleAddToCart = async () => {
        await addToCart(product, quantity)
        toast.success(`${product.name} añadido al carrito`, {
            position: 'bottom-right',
            autoClose: 2000,
        })
    }
    // Manejador para añadir a favoritos
    const handleAddFavorite = async () => {
        toast.success(`${product.name} añadido a favoritos`, {
            position: 'bottom-right',
            autoClose: 1500,
        })
    }

    if (loading) {
        return <div className="container py-5 text-center">Cargando producto...</div>
    }

    if (!product) {
        return <div className="container py-5 text-center">Producto no encontrado</div>
    }

    // MOSTRAR PRODUCTO
    return (
        <div className="container py-3">
            <div className="row ">
                {/* Izquierda: Imagenes */}
                <div className="col-lg-8 col-md-7">
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
                <div className="col-lg-4 col-md-5">
                    {/* INFORMACION DEL PRODUCTO */}
                    <small className="text-muted">{product.brand}</small>
                    <h2 className="mt-2">{product.name}</h2>
                    {/* PRECIO */}
                    <div className="d-flex align-items-center justify-content-end gap-2 mb-3 ">
                        <h3 className="d-inline">{product.price}€</h3>
                        {product.oldPrice == 0 ? (
                            <></>
                        ) : (
                            <span className="text-decoration-line-through text-muted">{product.oldPrice}€</span>
                        )}
                    </div>
                    {/* SELECTOR DE MODELO */}
                    {product.category === "Carcasas" && (
                        <div className="option-group">
                            <label>Modelo</label>
                            <select
                                className="form-select"
                                value={selectedModel}
                                onChange={(e) => setSelectedModel(e.target.value)}
                            >
                                {product.options.models.map((model) => (
                                    <option key={model} value={model}>{model}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* SELECTOR DE COLOR */}
                    {product.category === "Carcasas" && (
                        <div className="mt-3">
                            <label>Color: {selectedColor?.name}</label>
                            <div className="d-flex gap-2 mt-2">
                                {product.options.colors.map((color) => (
                                    <button
                                        key={color.name}
                                        onClick={() => { setSelectedColor(color); setSelectedImage(color.img) }}
                                        style={{
                                            backgroundColor: color.hex,
                                            width: '30px',
                                            height: '30px',
                                            borderRadius: '50%',
                                            border: selectedColor?.name === color.name ? '3px solid black' : '1px solid #ccc',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s ease',
                                        }}>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* CANTIDAD*/}
                    <div className="d-flex justify-content-start align-items-center gap-2 my-3">
                        <button className="btn btn-outline-secondary" onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}>-</button>
                        <div className="qty-num ">{quantity}</div>
                        <button className="btn btn-outline-secondary" onClick={() => setQuantity(quantity < product.stock ? quantity + 1 : product.stock)}>+</button>
                        {/* STOCK */}
                        {product.stock <= 5 ? (
                            <small className="text-danger"> {product.stock} unidades disponibles</small>
                        ) : (
                            <small className="text-success"> Unidades disponibles</small>
                        )
                        }
                    </div>

                    {/* BOTÓNES */}
                    <div className="d-grid gap-2">
                        <button className="btn btn-outline-primary w-100 mb-3" onClick={handleAddToCart}><i className="bi bi-bag-plus-fill"></i> Añadir al carrito</button>
                        <button className="btn btn-outline-dark w-100 mb-3" onClick={handleAddFavorite}><i className="bi bi-heart-fill"></i> Añadir a favoritos</button>
                    </div>
                    {/* DESCRIPCIÓN */}
                    <div className="mt-4">
                        <h4>Descripción</h4>
                        <p className="text-muted">{product.description}</p>
                    </div>

                    {/* Accesorios si son Cables */}
                    {product.category === "Cables" && (
                        <div className="mt-4">
                            <h4>Datos técnicos</h4>
                            <p className="text-muted">Longitud: {product.length} m</p>
                            <p className="text-muted">Tipo de entrada: {product.inputType}</p>
                            <p className="text-muted">Tipo de salida: {product.outputType}</p>
                        </div>
                    )}
                    {/* Accesorios si son Cargadores */}
                    {product.category === "Cargadores" && (
                        <div className="mt-4">
                            <h4>Datos técnicos</h4>
                            <p className="text-muted">Potencia: {product.power} W</p>
                            <p className="text-muted">Puertos de salida: {product.outputType.join(', ')}</p> {/* join() separa los puertos con una coma*/}
                        </div>
                    )}
                    {/* Accesorios si son Powerbanks */}
                    {product.category === "Power Banks" && (
                        <div className="mt-4">
                            <h4>Otros datos</h4>
                            <p className="text-muted">Capacidad: {product.capacity} mAh</p>
                            <p className="text-muted">Puertos de salida: {product.outputType.join(', ')}</p>
                            <p className="text-muted">Puertos de entrada: {product.inputType}</p>
                            <p className="text-muted">Potencia: {product.power} W</p>
                        </div>
                    )}
                    {/* Accesorios si son Carcasas */}
                    {product.category === "Carcasas" && (
                        <div className="mt-4">
                            <h4>Otros datos</h4>
                            <p className="text-muted">Material: {product.material}</p>
                        </div>
                    )}



                    {/* INFO */}
                    <div className='row g-2 mt-4'>
                        <div className="col-6">
                            <div className="benefit-box">
                                <i className="bi bi-shield-lock"></i>
                                <span className="small text-muted">Pago 100% seguro</span>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="benefit-box">
                                <i className="bi bi-truck"></i>
                                <span className="small text-muted">Envio en 24-48h</span>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="benefit-box">
                                <i className="bi bi-arrow-return-left"></i>
                                <span className="small text-muted">Devoluciones en 30 días</span>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="benefit-box">
                                <i className="bi bi-star"></i>
                                <span className="small text-muted">Garantía de 2 años</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div >
    )
}

export default ProductDetail