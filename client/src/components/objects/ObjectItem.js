import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import ObjectContext from '../../context/object/objectContext'

const ObjectItem = ({ object }) => {
    const objectContext = useContext(ObjectContext);
    const { deleteObject, setCurrent, clearCurrent } = objectContext;

    const onDelete = () => {
        deleteObject(_id);
        clearCurrent();
    };

    const { _id, name, location, extras } = object;
    return (
        <div className='card bg-light'>
            <span className='text-primary text-left'>{name}</span>
            <ul className='list'>
                <li>
                    <i className='fas fa-search-location'></i> <b>Location:</b>
                     &nbsp; {location}
                </li>
                {extras && (
                    <li>
                        <i className='fas fa-receipt'></i> <b>Extras:</b>{' '}
                        {extras}
                    </li>
                )}
            </ul>
            <button className='btn btn-success btn-sm' onClick={() => setCurrent(object)}>Edit</button>
            <button className='btn btn-danger btn-sm' onClick={onDelete}>Delete</button>
        </div>
    )
}

ObjectItem.propTypes = {
    object: PropTypes.object.isRequired
}

export default ObjectItem
