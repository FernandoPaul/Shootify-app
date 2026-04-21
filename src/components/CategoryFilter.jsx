import "./CategoryFilter.css";

const categoriesProducts = ["Todos", "Almacenamiento", "Estabilizadores", "Iluminación", "Micrófonos", "Trípodes"];
const categoriesAccessories = ["Todos", "Cables", "Carcasas", "Cargadores", "Power Banks"];

// currentCategory es la categoría seleccionada
// onCategoryChange es la función que cambia la categoría
function CategoryFilter({ type, currentCategory, onCategoryChange }) {
    return (
        <div className="container category-filter justify-content-center d-flex flex-wrap gap-2 m-2">
            {/* Si el type es products, mostrar las categorías de productos */}
            {type === "productos" && categoriesProducts.map((cat) => (
                <button
                    key={cat}
                    onClick={() => onCategoryChange(cat)}
                    className={`btn ${currentCategory === cat ? 'btn-dark' : 'btn-outline-secondary'} text-capitalize`}
                >
                    {cat}
                </button>
            ))}
            {/* Si el type es accessories, mostrar las categorías de accesorios */}
            {type === "accesorios" && categoriesAccessories.map((cat) => (
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