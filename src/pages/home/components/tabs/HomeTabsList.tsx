import { TabsList, TabsTrigger } from "@/shared/components/ui/tabs"

const HomeTabsList = () => {
    return (
        <TabsList className=" text-gray-800 mx-auto w-full bg-transperent">
            <TabsTrigger value="items">Предметы</TabsTrigger>
            <TabsTrigger value="categories">Категории</TabsTrigger>
            <TabsTrigger value="suppliers">Поставщики</TabsTrigger>
        </TabsList>
    )
}
export default HomeTabsList;