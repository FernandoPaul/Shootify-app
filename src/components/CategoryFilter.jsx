import "./CategoryFilter.css";

const categories = ["Todos", "Almacenamiento", "Estabilizadores", "Iluminación", "Micrófonos", "Trípodes"];

// currentCategory es la categoría seleccionada
// onCategoryChange es la función que cambia la categoría
function CategoryFilter({ currentCategory, onCategoryChange }) {
    return (
        <div className="container category-filter justify-content-center d-flex flex-wrap gap-2 m-2">
            {categories.map((cat) => (
                <button
                    key={cat}
                    onClick={() => onCategoryChange(cat)}
                    className={`btn ${currentCategory === cat ? 'btn-dark' : 'btn-outline-secondary'} text-capitalize`}
                >
                    {cat}
                </button>
            ))}
        </div>
    );
};

export default CategoryFilter;