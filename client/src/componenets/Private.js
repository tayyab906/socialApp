import React from 'react'
import { useSelector } from 'react-redux'
import LoadingToRedirect from './LoadingToRedirect'

const Private = ({children}) => {

    const { user } = useSelector((state) => ({ ...state.auth }));
    return user ? children : <LoadingToRedirect />;

}

export default Private






