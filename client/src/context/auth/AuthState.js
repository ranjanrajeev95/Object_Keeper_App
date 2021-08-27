import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS,
} from '../types';
import setAuthToken from '../../utils/setAuthToken';

/*
In state-
objects: an array of all objects of a user
current: the object currently being showed in form to edit
filtered: an array of object to show while user sarches all objects (filtered content)
*/
const AuthState = (props) => {
    const initialState = {
        user: null,
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        error: null,
    };

    const [state, dispatch] = useReducer(authReducer, initialState);

    // load user
    const loadUser = async () => {
        if(localStorage.token) {
            setAuthToken(localStorage.token);
        }
        try {
            const res = await axios.get('/api/auth');
            dispatch({ type: USER_LOADED, payload: res.data });
        } catch (error) {
            dispatch({ type: AUTH_ERROR });
        }
    };

    // register user
    const register = async (formData) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        };

        try {
            const res = await axios.post('/api/users', formData, config);
            if (res.data.token) localStorage.setItem('token', res.data.token);
            dispatch({ type: REGISTER_SUCCESS, payload: res.data });
            // token is added to state by dispatch above then the user data is loaded instantly
            loadUser();
        } catch (err) {
            localStorage.removeItem('token');
            dispatch({ type: REGISTER_FAIL, payload: err.response.data.msg });
        }
    };

    // login user
    const login = async (formData) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        try {
            const res = await axios.post('/api/auth', formData, config);
            if (res.data.token) localStorage.setItem('token', res.data.token);
            dispatch({ type: LOGIN_SUCCESS, payload: res.data });
            // token is added to state by dispatch above then the user data is loaded instantly
            loadUser();
        } catch (err) {
            dispatch({ type: LOGIN_FAIL, payload: err.response.data.msg });
        }
    };

    // logout
    const logout = () => dispatch({type: LOGOUT});

    // clear errors
    const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                token: state.tokens,
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                error: state.error,
                register,
                clearErrors,
                loadUser,
                login,
                logout
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthState;
