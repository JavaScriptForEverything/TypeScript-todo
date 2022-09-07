import React from 'react'

// type ComponentProps = {
//   title: string,
//   children?: React.ReactElement, 
// }

// // const PropComponent = ({ title }: ComponentProps ) => {
// const PropComponent: React.FC<ComponentProps> = ({ title }) => {
//   return (
//     <>
//      <div>{title}</div>
//     </>
//   )
// }
// export default PropComponent


// type ComponentProps = {
//   title: string,
//   children?: React.ReactElement | React.ReactNode 
// }

// type ComponentProps = React.PropsWithChildren<{
//   title: string,
// }>

type ComponentProps = {
  title: string,
} & {
  children?: React.ReactElement | React.ReactNode 
}

const PropComponent: React.FC<ComponentProps> = ({ title, children }) => {
  return (
    <>
     <div>{title}</div>
     <div>{children}</div>
    </>
  )
}
export default PropComponent
