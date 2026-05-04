import { useState } from "react";
import './Contact.css';

function Contact() {
    // Variables para guardar los datos del formulario
    const [form, setForm] = useState({
        name: '', email: '', subject: '', order: '', message: ''
    })

    // Función para manejar los cambios en el formulario
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    // Manejador del envio del formulario
    const handleSubmit = (e) => {
        e.preventDefault()
        toast.success(
            <div>
                <p className="fw-bold mb-1">¡Mensaje enviado! 🎉</p>
                <p className="small text-muted">Recibirás una respuesta lo antes posible</p>
            </div>,
            {
                position: 'top-center',
                autoClose: 3000,
            }
        )
        setForm({ name: "", email: "", subject: "", order: "", message: "" }) // Resetear el formulario
    }

    return (
        <div className="container py-4">
            <div className="contact-page p-4">
                {/* TÍTULO */}
                <h1 className="contact-title">Contacto</h1>
                <p className="contact-subtitle">
                    ¿Tienes alguna duda? Rellena el formulario y te responderesmos lo antes posible.
                </p>
                <div className="row g-4 mt-2">
                    {/* FORMULARIO */}
                    <form className="col-lg-9" onSubmit={handleSubmit}>
                        <div className="row g-23">
                            <div className="col-lg-6 col-md-6 col-sm-12">
                                <input type="text" className="form-control contact-input" name="name" placeholder="Tu nombre" value={form.name} onChange={handleChange} required />
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12">
                                <input type="email" className="form-control contact-input" name="email" placeholder="usuario@gmail.com" value={form.email} onChange={handleChange} required />
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12">
                                <input type="text" className="form-control contact-input" name="subject" placeholder="Asunto" value={form.subject} onChange={handleChange} required />
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12">
                                <input type="text" className="form-control contact-input" name="order" placeholder="Nº de pedido (opcional)" value={form.order} onChange={handleChange} />
                            </div>
                            <div className="col-lg-12 col-md-12 col-sm-12">
                                <textarea className="form-control contact-input" name="message" placeholder="Mensaje" rows={8} value={form.message} onChange={handleChange} required></textarea>
                            </div>
                        </div>
                        <div className="text-center">
                            <button type="submit" className="btn contact-btn mt-2 px-4">Enviar</button>
                        </div>
                    </form>
                    {/* INFORMACION */}
                    <div className="col-md-3" >
                        <div className="contact-info">
                            <p className="contact-info-label mb-1"><strong>Email</strong></p>
                            <p className="contact-info-value">support@shootify.com</p>
                            <hr className="contact-divider" />
                            <p className="contact-info-label mb-1"><strong>Horario</strong></p>
                            <p className="contact-info-value">Lun - Vie, 9:00 - 18:00</p>
                        </div>
                    </div>
                </div >
            </div>
        </div >
    )
}

export default Contact