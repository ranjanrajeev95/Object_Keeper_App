import React, { useState, useContext, useEffect } from 'react'
import ObjectContext from '../../context/object/objectContext'

const ObjectForm = () => {
    const objectContext = useContext(ObjectContext);
    const { addObject, current, clearCurrent, updateObject, setCurrent } = objectContext;

    // loads the current object inside the form
    useEffect(() => {
        if (current !== null) {
            // if we're editing an object then that will be
            // out current object, so we fill up the form's object with it
            setObject(current);
        } else {
            setObject({
                name: '',
                location: '',
                extras: '',
            })
        }
    }, [objectContext, current]);

    // component level state for storing the object while
    // the user enter it this will then be added to context
    const [object, setObject] = useState({
        name: '',
        location: '',
        extras: '',
    })

    const { name, location, extras } = object;

    const onChange = (e) => setObject({ ...object, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        if (current === null) {
            addObject(object);
        } else {
            updateObject(object);
            setCurrent(object);
        }
        // new object added to global context
        setObject({
            name: '',
            location: '',
            extras: '',
        });
    };

    const clearAll = () => {
        clearCurrent();
    };

    return (
        <form onSubmit={onSubmit}>
            <h2 className='text-primary'>
                {current ? 'Edit Object' : 'Add Object'}
            </h2>
            <input
                type='text'
                placeholder='name'
                name='name'
                value={name}
                onChange={onChange}
            />
            <input
                type='text'
                placeholder='Location'
                name='location'
                value={location}
                onChange={onChange}
            />
            <input
                type='text'
                placeholder='Extras'
                name='extras'
                value={extras}
                onChange={onChange}
            />
            <div>
                <input
                    type='submit'
                    value={current ? 'Edit object' : 'Add Object'}
                    className='btn btn-primary btn-block'
                />
            </div>
            {current && (
                <div>
                    <button className='btn btn-light btn-block' onClick={clearAll}>Clear</button>
                </div>
            )}
        </form>
    )
}

export default ObjectForm
