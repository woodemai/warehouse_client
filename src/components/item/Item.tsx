import { FC } from 'react';
import EditItemForm from './EditeItemForm';
import DeleteItemDialog from './DeleteItemDialog';
import { Separator } from "@/components/ui/separator"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

export interface ItemProps {
    id: string
    name: string
    description: string
    manufacturer: string
    productionDate: string
    expirationDate: string
    storageCondition: string
    weight: number
    price: number
}

const Item: FC<ItemProps> = ({
    id,
    name,
    description,
    manufacturer,
    productionDate,
    expirationDate,
    storageCondition,
    weight,
    price
}) => {

    return (
        <Dialog>
            <DialogTrigger>
                <div className='hover:scale-105 cursor-pointer transition-all durantion-100 md:max-w-lg lg:max-w-xl flex flex-row justify-between p-4 border-gray-300 text-gray-700 border rounded-md mb-4 shadow-md'>
                    <div className='leading-6'>
                        <div className='mb-4'>
                            <div className='flex flex-row gap-4 items-end'>
                                <div className='font-semibold text-xl tracking-tight'>
                                    <h2>{name}</h2>
                                </div>
                                <div className='font-bold text-xl tracking-tight text-green-600'>
                                    {price}₽
                                </div>
                            </div>
                            <div className='font-light text-left'>
                                <p>{manufacturer}</p>
                            </div>
                        </div>
                        <div>
                            <h3 className='text-left'>Description</h3>
                            <p className='text-left tracking-wide font-light text-sm'>{description}</p>
                        </div>
                    </div>
                </div>
            </DialogTrigger>
            <DialogContent className='flex flex-col gap-y-8'>
                <DialogHeader>
                    <DialogTitle>{name}</DialogTitle>
                    <DialogDescription>{manufacturer}</DialogDescription>
                </DialogHeader>
                <div>
                    <div>Description</div>
                    <div className='font-light'>{description}</div>
                </div>
                <Separator />
                <div>
                    <div>Storage condition</div>
                    <div className='font-light'>{storageCondition}</div>
                </div>
                <Separator />
                <div className='flex flex-row gap-x-8'>
                    <div className='flex flex-col justify-center items-center'>
                        <div>Price</div>
                        <div className='font-light'>{price}</div>
                    </div>
                    <div className='flex flex-col justify-center items-center'>
                        <div>Weight</div>
                        <div className='font-light'>{weight}</div>
                    </div>
                    <div className='flex flex-col justify-center items-center'>
                        <div>Production date</div>
                        <div className='font-light'>{productionDate}</div>
                    </div>
                    <div className='flex flex-col justify-center items-center'>
                        <div>Expirationt Date</div>
                        <div className='font-light'>{expirationDate}</div>
                    </div>
                </div>
                <div className='flex flex-row justify-between'>
                    <DeleteItemDialog name={name} id={id} />
                    <EditItemForm
                        id={id}
                        name={name}
                        description={description}
                        manufacturer={manufacturer}
                        productionDate={productionDate}
                        expirationDate={expirationDate}
                        storageCondition={storageCondition}
                        weight={weight}
                        price={price}
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default Item;