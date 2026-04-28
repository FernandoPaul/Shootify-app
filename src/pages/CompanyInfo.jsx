import { useParams } from "react-router-dom";
import { companyInfo } from "../data/companyInfo";


function CompanyInfo() {
    // Obtiene el slug de la URL - parte final de la URL 
    const { slug } = useParams();
    const page = companyInfo[slug];

    if (!page) {
        return (
            <div className="container py-5 text-center">
                <h2>Página no encontrada</h2>
            </div>
        )
    }
    return (
        <div className="container py-5" style={{ maxWidth: "800px" }}>
            <h1 className="mb-5">{page.title}</h1>
            {page.sections.map((section, index) => (
                <div key={index} className="mb-4">
                    <h4 className="fw-bold">{section.heading}</h4>
                    <p className="text-muted">{section.content}</p>
                </div>
            ))}
        </div>
    )
}
export default CompanyInfo;