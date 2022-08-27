import axios from "axios";
import store from '../store'
const instance = axios;

instance.defaults.baseURL = "http://localhost:8888/api";
// instance.defaults.headers.common['Authorization'] = "Bearer " + store.state.access_token;
instance.defaults.withCredentials = true;

instance.interceptors.request.use(function(config) {
    if (store.state.access_token !== "")
    {
        config.headers.Authorization = "Bearer " + store.state.access_token;
        console.info("config");
        
    }
    return config;
    
}, function(error) {
    return Promise.reject(error);
});

export default instance;
