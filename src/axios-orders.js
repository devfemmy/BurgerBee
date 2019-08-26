import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-bee.firebaseio.com/'
});

export default instance;