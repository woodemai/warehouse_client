import { ReactNode } from "react";

interface ListProps<T> {
    items: T[]
    renderItem: (item: T) => ReactNode
}

const List = <T extends object>({
    items, renderItem
}: ListProps<T>) => {
    return (
        <>
            {items.length
                ? <div className="flex flex-col gap-y-4">{items.map(item => renderItem(item))}</div>
                : <h1 className="flex justify-center items-center font-bold text-xl tracking-tight">Ничего не найдено</h1>
            }
        </>
    );
}

export default List;