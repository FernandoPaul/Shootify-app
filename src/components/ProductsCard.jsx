import './ProductsCard.css'
import { FaPlus } from 'react-icons/fa'
import { useNavigate } from "react-router-dom";

{/* FaPlus para añadir al carrito */ }
function ProductCard({ product }) {
    const navigate = useNavigate(); // Para navegar entre páginas
    const handleCardClick = () => {
        navigate(`/catalog/item/${product.id}`); // Entra al detalle del producto
    };

    const handleAddToCart = (e) => {
        e.stopPropagation(); // Evita que se propague el evento al hacer clic en el botón
        // Aquí irá la lógica para añadir al carrito
        console.log('Añadir al carrito:', product.nombre);
    };

    return (
        <div className='card product-card ' onClick={handleCardClick} >
            {/* border-0 para que no tenga borde */}
            {/* PARTE SUPERIOR */}
            <div className={`product-image ${product.onSale ? 'oferta' : ''}`}>
                {/* BADGE SOLO SI HAY OFERTA */}
                {product.onSale && (<span className='badge bg-danger text-light position-absolute start-0 top-0 m-2'>OFERTA</span>)}
                <div className='icon-placeholder'>
                    <img src={product.image[0]} alt={product.name} className='img-fluid' />
                </div>
            </div>

            {/* PARTE INFERIOR */}
            <div className='card-body'>
                <small className='text-muted'>{product.brand}</small>
                <h5 className='product-title mt-1 '>{product.name}</h5>
                <div className='d-flex justify-content-between ms-2'>
                    <div>
                        <strong>{product.price}€</strong>
                        {product.oldPrice == 0 ? (
                            <></>
                        ) : (
                            <small className='text-muted text-decoration-line-through text-danger ms-2'>
                                {product.oldPrice}€
                            </small>
                        )}
                    </div>
                    <div className=''>
                        <button className='btn btn-primary border-0 ' onClick={handleAddToCart}>
                            <FaPlus />
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ProductCard