import React, { Fragment, useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ObjectItem from './ObjectItem';
import Spinner from '../layout/Spinner';
import ObjectContext from '../../context/object/objectContext';

const Objects = () => {
    const objectContext = useContext(ObjectContext);

    const { objects, filtered, getObjects, loading } = objectContext;

    useEffect(() => {
        getObjects();
        // eslint-disable-next-line
    }, []);

    if (objects !== null && objects.length === 0 && !loading) {
        return <h4>Please add some objects.</h4>
    }

    return (
        <Fragment>
            {objects !== null && !loading ? (
                <TransitionGroup>
                {filtered !== null ?
                    filtered.map(obj => (
                        <CSSTransition key={obj._id} timeout={500} classNames='item'>
                            <ObjectItem object={obj} />
                        </CSSTransition>))
                    : objects.map((obj) => (
                        <CSSTransition key={obj._id} timeout={500} classNames='item'>
                            <ObjectItem object={obj} />
                        </CSSTransition>))}
            </TransitionGroup>
            ) : <Spinner />}
        </Fragment>
    );
};

export default Objects;
