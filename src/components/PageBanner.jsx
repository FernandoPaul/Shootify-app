import './PageBanner.css';

function PageBanner({ title, image }) {
    return (
        <div className="page-banner" style={{ backgroundImage: `url(${image})` }}>
            <div className="container">
                <h1 className='page-banner-title'>{title}</h1>
            </div>
        </div>
    )
}

export default PageBanner