import { useState } from 'react';
import { validateEmail } from '../utils/validations';
import './NewsLetterBanner.css'
import { toast } from 'react-toastify'

function NewsLetterBanner() {

    // Estado del formulario
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    // Validaciones
    const formValid = validateEmail(email)

    // Manejador del formulario con Toastify
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!formValid) {
                setError("Formato de correo electrónico no válido");
                return;
            }
            setError(""); // Limpiar el error
            toast.success(
                <div>
                    <p className='fw-bold mb-1'>¡Suscrito correctamente!</p>
                    <p className='mb-0'>Comprueba tu correo electrónico para confirmar la suscripción.</p>
                </div>,
                {
                    position: 'top-center',
                    autoClose: 4000,
                }
            );
            setEmail(''); // Limpiar el formulario
        } catch (error) {
            setError("Error al suscribirse");
        }
    }

    return (
        <section className='newsletter-banner py-5'>
            <div className='container'>
                {/* TEXTO */}
                <div className='text-center'>
                    {/* fw-bold para que sea negrita*/}
                    <h2 className='fs-1 fw-bold'>Suscríbete a la Newsletter</h2>
                    <p className='text-muted mb-0'>Y consigue un 10% de descuento en tu primer pedido</p>
                </div>
                {/* FORMULARIO */}
                <form onSubmit={handleSubmit}>
                    <div className='d-flex align-items-center justify-content-center gap-4 mt-4'>
                        <input type='email' className='form-control' value={email} onChange={e => setEmail(e.target.value)} placeholder='Correo electrónico' /> {/* form-control para que sea responsive*/}
                        <button type="submit" className='btn btn-dark px-4'>Suscribirse</button>
                    </div>
                </form>
                {/* ERROR */}
                {error && <p className='text-center text-danger'>{error}</p>}
            </div>
        </section>
    )
}

export default NewsLetterBanner