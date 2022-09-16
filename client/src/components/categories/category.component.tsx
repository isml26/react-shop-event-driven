import "./categories.styles.scss"
import CategoryItem from "../category-item/category-item.component"

interface Category {
    categories: {
        id?: number;
        title?: string;
        imageUrl?: string;
    }[]
}

function CategoriesComponent({ categories }: Category) {
    return (
        <div className="categories-container">
            {categories.map((category: any) => (
                <CategoryItem key={category.id}  {...category} />
            ))}

        </div>
    )
}

export default CategoriesComponent