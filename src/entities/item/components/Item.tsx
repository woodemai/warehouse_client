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
export const Item = (
    {
        item,
    }: {
        item: IItem
    }) => {
    return (
        <Dialog>
            <DialogTrigger>
                <div className='bg-background hover:scale-105 cursor-pointer transition-all durantion-100 md:max-w-lg lg:max-w-xl flex flex-row justify-between p-4 border-gray-300 text-gray-700 border rounded-lg shadow-md'>
                    <div className='leading-6'>
                        <div className='mb-4'>
                            <div className='flex flex-row gap-4 items-end'>
                                <div className='font-semibold text-xl tracking-tight'>
                                    <h2>{item.name}</h2>
                                </div>
                                <div className='font-bold text-xl tracking-tight text-green-600'>
                                    {item.price} ₽
                                </div>
                            </div>
                            <div className='font-light text-left'>
                                <p>{item.supplier.name}</p>
                            </div>
                        </div>
                        <div>
                            <h3 className='text-left'>Описание</h3>
                            <p className='text-left tracking-wide font-light text-sm'>{item.description}</p>
                        </div>
                    </div>
                </div>
            </DialogTrigger>
            <DialogContent className='flex flex-col gap-y-4'>
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