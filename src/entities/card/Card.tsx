import { FC, ReactNode } from 'react'

type Props = {
    children: ReactNode
}

const Card:FC<Props> = ({children}) => {
  return (
    <div className='p-4 shadow-md rounded-lg bg-card flex flex-col justify-start w-full text-left'>
        {children}
    </div>
  )
}

export default Card;