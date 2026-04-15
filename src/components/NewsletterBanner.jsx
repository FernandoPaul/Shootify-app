import './NewsletterBanner.css'

function NewsletterBanner() {
    return (
        <section className='newsletter-banner py-5'>
            <div className='container d-flex justify-content-between align-items-center'>
                {/* TEXTO */}
                <div className='col-lg-6'>
                    {/* fw-bold para que sea negrita*/}
                    <h2 className='fw-bold'>Suscríbete a la Newsletter</h2>
                    <p className='text-muted mb-0'>Y consigue un 10% de descuento en tu primer pedido</p>
                </div>
                {/* FORMULARIO */}
                <div className='d-flex col-lg-6 gap-2'>
                    <input type='email' className='form-control' placeholder='Correo electrónico' /> {/* form-control para que sea responsive*/}
                    <button className='btn btn-dark'>Suscribirse</button>
                </div>
            </div>
        </section>
    )
}

export default NewsletterBanner