import "./Cart.css";
import { useCart } from '../context/CartContext'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

// Componente del toast de confirmación
const ConfirmPaymentToast = ({ onConfirm, onCancel }) => (
    <div className="">
        <p className="mb-2 fw-bold">¿Confirmar el pedido?</p>
        <p className="small text-muted mb-3">Procederás al pago de tu carrito</p>
        <div className="d-flex gap-3">
            <button
                className="btn btn-success btn-sm px-3"
                onClick={onConfirm}
            >
                Pagar
            </button>
            <button
                className="btn btn-outline-secondary btn-sm px-3"
                onClick={onCancel}
            >
                Cancelar
            </button>
        </div>
    </div>
)

function Cart() {
    // Variables globales del carrito
    const { cart, removeFromCart, updateQuantity, cartTotal, cartCount, clearCart } = useCart()
    const navigate = useNavigate()
    // Genera un número de pedido falso
    const generateOrderNumber = () => {
        const random = Math.floor(Math.random() * 900000) + 100000
        return `SHOOTIFY-${random}`
    }
    // Manejador del boton de comprar
    const handleCheckout = () => {
        // Si el carrito está vacío no hace nada
        if (cart.length === 0) return
        // Variable para guardar el id del toast
        let confirmToastId = null
        // Manejador del boton de pagar
        const handleConfirm = () => {
            toast.dismiss(confirmToastId)   // Cierra el toast de confirmación
            // Genera un número de pedido
            const orderNumber = generateOrderNumber()
            // Toast de éxito
            toast.success(
                <div>
                    <p className="fw-bold mb-1">¡Pedido completado! 🎉</p>
                    <p className="small mb-0">Número de pedido:</p>
                    <p className="fw-bold text-success d-flex align-items-center mb-1">{orderNumber}</p>
                    <p className="small text-muted">Recibirás un email de confirmación</p>
                </div>,
                {
                    position: 'top-center',
                    autoClose: 5000,
                    closeOnClick: false,
                }
            )
            clearCart() // Limpia el carrito
            navigate('/') // Navega a la página de inicio
        }

        const handleCancel = () => {
            toast.dismiss(confirmToastId) // Cierra el toast de confirmación
            // Toast de cancelar
            toast.info('Pedido cancelado', {
                position: 'top-center',
                autoClose: 2000,
            })
        }

        // Muestra el toast de confirmación
        confirmToastId = toast(
            <ConfirmPaymentToast
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />,
            {
                position: 'top-center',
                autoClose: false,    // no se cierra solo
                closeOnClick: false, // no se cierra al hacer clic fuera
                draggable: false,
                closeButton: false,
            }
        )
    }
    return (
        <div className="container py-4">
            {/* TÍTULO */}
            <div className="mb-3">
                <h1 className="page-title"> Carrito de Compras</h1>
                <p className="page-description"> {cartCount} Productos en tu carrito de compras</p>
            </div>
            {/* Division de la pantalla en dos apartados */}
            <div className="row">
                {/* LISTA DE PRODUCTOS */}
                <div className="cart-left col-lg-8 col-sm-12">
                    {/* Si hay productos */}
                    <div className="row">
                        {cart.map(item => (
                            <div key={item.id} className="cart-item-card mb-3 p-4 d-flex align-items-center position-relative">
                                {/* Imagen */}
                                <div className="cart-img-container me-4">
                                    <img src={item.image} alt={item.name} className="rounded-3" />
                                </div>

                                {/* Info y Controles */}
                                <div className="flex-grow-1">
                                    <div className="d-flex justify-content-between align-items-start">
                                        <div>
                                            <h5 className="fw-bold mb-0">{item.name}</h5>
                                            <small className="text-muted">SHOOTIFY</small>
                                        </div>
                                        <button className="btn-close-custom" onClick={() => removeFromCart(item.id)}>✕</button>
                                    </div>

                                    <div className="d-flex justify-content-between align-items-center mt-4">
                                        <div className="quantity-control d-flex align-items-center border rounded-3">
                                            <button className="btn btn-sm" onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                                            <span className="px-3 fw-bold">{item.quantity}</span>
                                            <button className="btn btn-sm" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                        </div>
                                        <h4 className="fw-bold mb-0">{item.price.toFixed(2)}€</h4>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {/* Si no hay productos */}
                        {cart.length === 0 && (
                            <div className="text-center py-5 border rounded-4 bg-light">
                                <h3>Tu carrito está vacío</h3>
                                <Link to="/" className="btn btn-dark mt-3">Ir a la tienda</Link>
                            </div>
                        )}
                    </div>
                </div>
                {/* RESUMEN DEL PEDIDO */}
                <div className="col-lg-4 col-md-4 col-sm-12 ">
                    <div className="summary-card p-4 rounded-4">
                        <h4 className="fw-bold mb-4">Resumen del pedido</h4>
                        <div className="d-flex justify-content-between mb-2">
                            <span>Subtotal</span>
                            <span className="fw-bold">{cartTotal.toFixed(2)}€</span>
                        </div>
                        <div className="d-flex justify-content-between mb-4">
                            <span>Envío</span>
                            <span className="text-success fw-bold">
                                {cartTotal.toFixed(2) >= 49 ? "GRATIS" : "9.99€"}
                            </span>
                        </div>
                        <hr />
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h3 className="fw-bold">Total</h3>
                            <h2 className="fw-bold">
                                {/* si es mayor o igual a 49, pone la suma total, si no, pone el total + 9.99 */}
                                {cartTotal.toFixed(2) >= 49 ? cartTotal.toFixed(2) : (cartTotal + 9.99).toFixed(2)}€
                            </h2>
                        </div>
                        <button className="btn btn-dark w-100 py-3 rounded-3 fw-bold mb-3" onClick={handleCheckout} disabled={cart.length === 0}>Continuar Compra</button>
                        <Link to="/" className="btn btn-outline-dark w-100 py-3 rounded-3 fw-bold">Seguir Comprando</Link>
                        <hr />
                        <div className="">
                            <p className="fw-bold"><i className="bi bi-check-circle-fill text-success"></i> Pago seguro </p>
                            <p className="fw-bold"><i className="bi bi-check-circle-fill text-success"></i> Devoluciones 30 días </p>
                            <p className="fw-bold"><i className="bi bi-check-circle-fill text-success"></i> Envio en 48h </p>

                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Cart
