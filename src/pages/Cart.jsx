import { useState } from "react";
import "./Cart.css";

function Cart() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-8">
                    <h1>Carrito</h1>
                    <p>Aquí va el carrito</p>
                </div>
                <div className="col-md-4">
                    <h1>Resumen</h1>
                    <p>Aquí va el resumen</p>
                </div>
            </div>
        </div>
    );
};

export default Cart;
