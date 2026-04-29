import { useState } from "react";
import "./Cart.css";
import { useCart } from '../context/CartContext'

function Cart() {
    const { cart, removeFromCart, updateQuantity, cartTotal } = useCart()
    return (
        <div className="container py-4">
            <div className="cart-page">
                {/* TÍTULO */}
                <h2 className="text-center cart-title">Carrito</h2>
                {/* si hay productos */}
                <div className="row">
                    {cart.map(item => (
                        <div key={item.id} className="col-lg-3 col-md-4 col-sm-12 mb-3">
                            <div className="cart-item-image col-lg-2 col-md-4 col-sm-12 ">
                                {item.image !== '' ? (
                                    <img src={item.image} alt={item.name} width={50} height={50} />
                                ) : (
                                    <div className="no-image">Imagen no disponible</div>
                                )}
                            </div>
                            <div>

                                <h5 className="cart-item-name">{item.name}</h5>
                                <p className="cart-item-price">{item.price}€</p>
                                <button className="btn btn-outline-secondary btn-sm mx-2" onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                                <span>{item.quantity}</span>
                                <button className="btn btn-outline-secondary btn-sm mx-2" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                <button className="btn btn-outline-danger btn-sm mx-2" onClick={() => removeFromCart(item.id)}>
                                    Eliminar
                                </button>
                                <h5 className="">Precio total: {item.price * item.quantity}€</h5>
                            </div>
                            <hr></hr>
                        </div>
                    ))}
                    {/* si no hay productos */}
                    {cart.length === 0 && (
                        <p className="text-center py-4">El carrito está vacío.</p>
                    )}
                </div>
                <h2 className="d-flex justify-content-end m-4">Total: {cartTotal}€</h2>
                <div className="d-flex justify-content-end m-4">
                    <button className="btn btn-primary ">Continuar compra</button>
                </div>
            </div>
        </div>
    )
}

export default Cart
