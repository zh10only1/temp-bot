import React from 'react'

interface ContainerProps {
    children: React.ReactNode
}

const Container:React.FC<ContainerProps> = ({children}) => {
  return (
    <div className='w-full sm:w-[28rem] mx-auto'>
        {children}
    </div>
  )
}

export default Container;