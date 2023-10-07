import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { RegisterUser } from '../../apicalls/users'
import toast from 'react-hot-toast'

const Register = () => {
    const [user,setUser]=useState({
        name:'',
        email:'',
        password:''
    })


    const register=async ()=>{
      try{
        const response=await RegisterUser(user);
        console.log(response);
        if(response.success)
        {
          toast.success(response.message);
        }
        else{
          toast.error(response.message);
        }
      }
      catch(error){
        toast.error(error.message);
      }

      //set all fields null
      setUser({name:"",email:"",password:""})

    }

  
  return (
    <div className='h-screen bg bg-primary flex items-center justify-center'>

            <div style={{backgroundColor:"white"}}className="bg-white shadow-md p-5 flex flex-col gap-3">
            <h1 className='text-2xl font-bold uppercase'>
                Pankaj register
            </h1>
            <hr/>
            <input
            type="text"
            value={user.name}
            onChange={(e)=>setUser({...user,name:e.target.value})}
            placeholder="enter your name"
            />
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
            <button  type='submit' className='contain-btn' onClick={register} > Register </button>
            <Link to="/login" className='underline'>
            Already have account ? Login
            </Link>
           
            
           
        </div>
        
    </div>
  )
}

export default Register