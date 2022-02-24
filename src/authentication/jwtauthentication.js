import axios from 'axios';
import { URL_FETCH_NEWS, URL_DELETE_NEWS, URL_INVENTORY_FETCH_ALL, URL_DELETE_INVENTORY } from '../constant/endpoints.js'

export default function axiosAuth(apiUrl,id){
    const config = {
       headers:{
         authorization: 'Bearer ' + localStorage.getItem("access-token")
       }
     }
     axios.delete(`${apiUrl}/${id}`,config);
  }

// const config = {
//   baseURL: apiUrl,
//   headers:{
//     Authorization: `Bearer ${accessToken}`
//   }
// axios.delete(apiUrl);

// const accessToken = localStorage.getItem("access-token");
// console.log(accessToken);
// const authAxios = axios.create({
//   baseURL: URL_DELETE_NEWS,
//   headers: {
//     authorization: `Bearer ${accessToken}`,
//   },
// });

// export default authAxios;