import React from 'react';
import PersistentDrawerLeft from './PersistentDrawerLeft';
import Sidebar from './Sidebar';

const WrappedComponent = () => {
    return (
        <PersistentDrawerLeft>
            <Sidebar />
        </PersistentDrawerLeft>
    );
};

export default WrappedComponent;