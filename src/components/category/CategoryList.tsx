import axios from "axios";
import { useEffect, useState } from "react";
import Category from "./Category";
import { CategoryProps } from "./Category";

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:8080/categories")
            .then((res) => setCategories(res.data))
    }, []);
    return (
        <div className='flex flex-col'>
            {categories.map((category: CategoryProps) => <Category key={category.id} {...category} />)}
        </div>
    );
}

export default CategoryList;