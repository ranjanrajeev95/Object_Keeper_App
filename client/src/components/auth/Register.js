import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';

const Register = (props) => {
    const alertContext = useContext(AlertContext);
    const { setAlert } = alertContext;

    const authContext = useContext(AuthContext);
    const { register, error, clearErrors, isAuthenticated } = authContext;

    // directly load home page if user is already logged in
    useEffect(() => {
        if(isAuthenticated) {
            props.history.push('/');
        }
        if(error === 'User already exists! Enter a different email.') {
            setAlert(error, 'danger');
            clearErrors();
        }
        // eslint-disable-next-line
    }, [error, isAuthenticated, props.history]);

    // component level state
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        passwordConfirm: '',
    });

    const { name, email, password, passwordConfirm } = user;

    const onChange = (e) =>
        setUser({ ...user, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        if (name === '' || email === '' || password === '') {
            setAlert('Please enter all fields.', 'danger');
        } else if (password !== passwordConfirm) {
            setAlert('Both passwords should be same.', 'danger');
        } else {
            register({ name, email, password });
        }
    };

    return (
        <div className='form-container'>
            <h1>
                Account <span className='text-primary'>Register</span>
            </h1>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <label htmlFor='name'>Name</label>
                    <input
                        type='text'
                        name='name'
                        value={name}
                        onChange={onChange}
                        required
                    />
                    <label htmlFor='email'>E-mail</label>
                    <input
                        type='email'
                        name='email'
                        value={email}
                        onChange={onChange}
                        required
                    />
                    <label htmlFor='password'>Password</label>
                    <input
                        type='password'
                        name='password'
                        value={password}
                        onChange={onChange}
                        required
                        minLength='6'
                    />
                    <label htmlFor='passwordConfirm'>Confirm Password</label>
                    <input
                        type='password'
                        name='passwordConfirm'
                        value={passwordConfirm}
                        onChange={onChange}
                        required
                        minLength='6'
                    />
                </div>
                <input
                    type='submit'
                    value='Register'
                    className='btn btn-primary btn-block'
                />
            </form>
        </div>
    );
};

export default Register;
