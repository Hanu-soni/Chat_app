import axios from 'axios';
export const axiosInstance=axios.create({
    headers:{
        autherization:`Bearer ${localStorage.getItem('token')}`
    },
});
