import Axios, { type AxiosInstance } from "axios";
import { useAuthStore } from "@/stores/index";

const axios: AxiosInstance = Axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_ENDPOINT
});
/* los interceptores de una solicitud utilizara una configuracion  */
axios.interceptors.request.use(config => {
  const authStore = useAuthStore();
  if(config.headers) {
    config.headers["Content-type"] = "application/json";
    config.headers["Authorization"] = "Bearer " + authStore.token;
  }
  return config;
});

export default axios;

/*import Axios, { type AxiosInstance } from 'axios'

const axios: AxiosInstance = Axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_ENDPOINT,
  headers: { 
    "Content-type": "application/json",
    'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjUsImlhdCI6MTY1NjczMTQyMCwiZXhwIjoxNjU2NzMxNDgwfQ.fLk8xmmiNARyxlWWaI51Ev9BxsfllmScF_YFmFO5rBw"
   }
});

export default axios


/*const axios = Axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_ENDPOINT,
  headers: { 'Content-type': 'application/json' ,
    //'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjUsImlhdCI6MTY1NjczMTQyMCwiZXhwIjoxNjU2NzMxNDgwfQ.fLk8xmmiNARyxlWWaI51Ev9BxsfllmScF_YFmFO5rBw"
  }
})

export default axios*/

/* es variable creada para la conexion */
/* el json es por nuestra api rest*/