// this file sets the JWT inside heaer of all axios requests by default
// in case it's already present inside localstorage
import axios from 'axios';

const setAuthToken = (token) => {
    if (token) {
        axios.defaults.headers.common['x-auth-token'] = token;
    } else {
        delete axios.defaults.headers.common['x-auth-token'];
    }
};

export default setAuthToken;
