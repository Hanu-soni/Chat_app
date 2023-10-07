import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { LoginUser } from '../../apicalls/users'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { HideLoader, ShowLoader } from '../../redux/loaderSlice'

const Login = () => {
    const [user,setUser]=useState({
        email:'',
        password:''
    })
    const dispatch = useDispatch();
   
    const login=async ()=>{
      console.log(user)
      try{
        dispatch(ShowLoader())
        const response=await LoginUser(user);
        dispatch(HideLoader())
        console.log(response);
        if(response.success)
        {
          toast.success(response.message);
          localStorage.setItem("token",response.token);
          console.log(response.token)
          window.location.href='/'
          
        }
        else{
          toast.error(response.message);
        }
      }
      catch(error){
        dispatch(HideLoader())
        toast.error(error.message);
      }
    }
  return (
    <div className='h-screen bg bg-primary flex items-center justify-center'>

            <div style={{backgroundColor:"white"}}className="bg-white shadow-md p-5 flex flex-col gap-3">
            <h1 className='text-2xl font-bold uppercase'>
                Pankaj Login
            </h1>
            <hr/>
             <input
            type="text"
            value={user.email}
            onChange={(e)=>setUser({...user,email:e.target.value})}
            placeholder="enter your user_id"
            />
             <input
            type="password"
            value={user.password}
            onChange={(e)=>setUser({...user,password:e.target.value})}
            placeholder="enter your password"
            />
            <button  type='submit' className='contain-btn' onClick={login} > Login </button>
            <Link to="/register" className='underline'>
           Dont have account? Register
            </Link>
           
            
           
        </div>
        
    </div>
  )
}

export default Login