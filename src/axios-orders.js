import axios from 'axios';

const instance = axios.create({
    baseURL:'https://sample-burger-a1dfc.firebaseio.com/'
});

export default instance;