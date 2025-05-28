import axios from 'axios';

const api = axios.create({
    
    baseURL: 'mysql://root:@localhost:3306/shield_tech',
    headers: {
        'Content-Type': 'application/json', 
    },
});

export default api;