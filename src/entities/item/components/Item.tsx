import { Separator } from "@/shared/components/ui/separator"
import { IItem } from '@/entities/item';
import ItemControlButtons from './ItemControlButtons';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/shared/components/ui/dialog"
import Card from "@/entities/card/Card";
export const Item = (
    {
        item,
    }: {
        item: IItem
    }) => {
    return (
        <Dialog>
            <DialogTrigger>
                <Card>
                    <div className="flex gap-x-4 items-center">
                        <h2>{item.name}</h2>
                        <h2 className="text-green-500 text-xl">{item.price} ₽</h2>
                    </div>
                    <p className="mb-4">{item.supplier.name}</p>
                    <p><span className="font-semibold">Описание: </span>{item.description}</p>
                </Card>
            </DialogTrigger>
            <DialogContent className='flex flex-col gap-y-4 bg-card'>
                <DialogHeader>
                    <DialogTitle>{item.name}</DialogTitle>
                    <DialogDescription>{item.category.name}</DialogDescription>
                </DialogHeader>
                <div>
                    <div>Описание</div>
                    <div className='font-light'>{item.description}</div>
                </div>
                <Separator />
                <div>
                    <div>Поставщик</div>
                    <div className='font-light'>{item.supplier.name}</div>
                </div>
                <Separator />
                <div>
                    <div>Условия хранения</div>
                    <div className='font-light'>{item.storageCondition}</div>
                </div>
                <Separator />
                <div className='flex flex-col items-start sm:items-center justify-between sm:flex-row gap-x-8'>
                    <div className='flex flex-col justify-center items-center'>
                        <div>Цена</div>
                        <div className='font-light'>{item.price}</div>
                    </div>
                    <div className='flex flex-col justify-center items-center'>
                        <div>Вес</div>
                        <div className='font-light'>{item.weight}</div>
                    </div>
                    <div className='flex flex-col justify-center items-center'>
                        <div>Дата производства</div>
                        <div className='font-light'>{String(item.productionDate)}</div>
                    </div>
                    <div className='flex flex-col justify-center items-center'>
                        <div>Годен до</div>
                        <div className='font-light'>{String(item.expirationDate)}</div>
                    </div>
                </div>
                <ItemControlButtons item={item} />
            </DialogContent>
        </Dialog>
    );
}