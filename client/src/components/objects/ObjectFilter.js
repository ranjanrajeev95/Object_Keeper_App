import React, { useContext, useRef, useEffect } from 'react'
import ObjectContext from '../../context/object/objectContext';

const ObjectFilter = () => {
    const objectContext = useContext(ObjectContext);
    const text = useRef('');

    const { filtered, filterObjects, clearFilter } = objectContext;

    useEffect(() => {
        if(filtered === null) {
            text.current.value = '';
        }
    });

    const onChange = e => {
        if (text.current.value !== '') {
            filterObjects(e.target.value);
        } else {
            clearFilter();
        }
    };

    return (
        <form>
            <input ref={text} type='text' onChange={onChange} placeholder='Filter objects...'></input>
        </form>
    )
}

export default ObjectFilter
