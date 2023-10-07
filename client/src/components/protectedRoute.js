import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { GetCurrentUser,GetAllUsers } from "../apicalls/users";
import {GetAllChats} from '../apicalls/chats';
import { HideLoader, ShowLoader } from "../redux/loaderSlice";
import { useDispatch, useSelector } from "react-redux";
import { SetAllUsers, SetUser, SetAllChats } from "../redux/userSlice";
import Home from "../pages/home/Home";


function ProtectedRoute({ children }) {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.userReducer);
  const getCurrentUser = async () => {
    try {
      dispatch(ShowLoader());

      const response = await GetCurrentUser();
      console.log(response)
      const allUsersResponse = await GetAllUsers();
      const allChatsResponse=await GetAllChats();

      dispatch(HideLoader())
      if (response.success) {
        dispatch(SetUser(response.data));
       dispatch(SetAllUsers(allUsersResponse.data));
         dispatch(SetAllChats(allChatsResponse.data))

      } else {
        toast.error(response.message);
        //console.log( response.message)
        localStorage.removeItem("token");
        navigate("/login");
      }
    } catch (error) {
      dispatch(HideLoader());
      console.log(error)
      toast.error(error.message);
      //localStorage.removeItem("token");
      navigate("/login");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getCurrentUser();
    } else {
      navigate("/login");
    }
  }, []);

  return (

    <div className="h-screen w-screen bg-gray-100 p-2">
      {/* header */}
      <div className="flex justify-between p-5 bg-primary rounded">
        <div className="flex items-center gap-1">
        <i className="ri-message-3-line text-2xl text-white"></i>
          <h1
            className="text-white text-2xl uppercase font-bold cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          >
            Chat_with_Pankaj
          </h1>

        </div>
            <div  className="flex gap-1 text-md items-center bg-white p-2 rounded">
            {user?.profilePic && 
            <img
              src={user?.profilePic}
              alt="profile"
              className="h-8 w-8 rounded-full object-cover"
            />
          }
          {!user?.profilePic && <i className="ri-shield-user-line"></i>}
          <h1
            className="underline text-green cursor-pointer"
            onClick={() => {
              navigate("/profile");
            }}
          >
            {user?.name}
          </h1>

          <i 
            className="ri-logout-circle-r-line ml-5 text-xl cursor-pointer"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
          ></i>

            </div>



      </div>

      {/* Page-content */}
      <div>
       <Home/>

      </div>


    </div>

  );
}

export default ProtectedRoute;