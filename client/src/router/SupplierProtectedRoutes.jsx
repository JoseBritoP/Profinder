import { Navigate, Outlet } from 'react-router-dom'

export default function ProtectedRoutes () {
  const userSession = JSON.parse(window.localStorage.getItem("userSession"))

  if (!userSession) {
    return <Navigate to='/userLogin' />
  }

  if (!userSession.status || userSession.usuario !== 'p') {
    return <Navigate to='/' />
  }

  return (
    <Outlet />
  )
}