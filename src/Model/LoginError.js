import React from 'react'

const LoginError = ({visible,data}) => {
    if(!visible) return null

  return (
    <>
     {data == '' ? '' : <div className='sticky bg-[#ff121243] text-red-800 font-semibold h-fit w-fit mt-10 rounded-md flex justify-around border-2 border-[#aeaeae48]'>
    <p className='whitespace-nowrap px-2'>{data}</p>
    </div>}
    </>
  )
}

export default LoginError