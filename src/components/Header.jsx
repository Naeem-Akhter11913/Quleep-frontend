import React, { useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { toast } from 'react-toastify';
import { logoutUser } from '../store/action/auth.action';
import { clearMessage } from '../store/slice/auth.slice';
const Header = () => {
  const {accessToken , successMessage,errorMessage,loading} = useSelector(state => state.auth);
  const dispatch = useDispatch();


  const handleLogin = () =>{
    dispatch(logoutUser())
  }

  useEffect(() =>{
    if(successMessage){
      toast.success(successMessage);
      <Navigate to={'/'} />
    }

    if(errorMessage){
      toast.error(errorMessage)
    }

    dispatch(clearMessage())
  },[dispatch ,successMessage,errorMessage])
  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">3D Products</Link>
        <nav>
          {accessToken && <button type='button' disabled={loading} onClick={handleLogin}>Logout</button>}
        </nav>
      </div>
    </header>
  )
}

export default Header