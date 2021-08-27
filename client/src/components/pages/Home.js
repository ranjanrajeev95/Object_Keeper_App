import React, { useContext, useEffect } from 'react';
import Objects from '../objects/Objects';
import ObjectForm from '../objects/ObjectForm';
import ObjectFilter from '../objects/ObjectFilter';
import AuthContext from '../../context/auth/authContext';

const Home = () => {
    const authContext = useContext(AuthContext);

    useEffect(() => {
        authContext.loadUser();
        // eslint-disable-next-line
    }, []);

    return (
        <div className='grid-2'>
            <div><ObjectForm /></div>
            <div>
                <ObjectFilter />
                <Objects />
            </div>
        </div>
    )
}

export default Home
