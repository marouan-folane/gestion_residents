import React, {  } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider'

function GuestLayout() {


  return (
    <div>
        <Outlet/>
    </div>
  )
}

export default GuestLayout
