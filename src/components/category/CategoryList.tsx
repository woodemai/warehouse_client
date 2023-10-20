
import { FC } from "react";
import Category from "./Category";
import { CategoryProps } from "./Category";
interface CategoryListProps {
    categories: CategoryProps[]
}

const CategoryList: FC<CategoryListProps> = ({ categories }) => {

    return (
        <div className='flex flex-col'>
            {categories.map((category: CategoryProps) => <Category key={category.id} {...category} />)}
        </div>
    );
}

export default CategoryList;