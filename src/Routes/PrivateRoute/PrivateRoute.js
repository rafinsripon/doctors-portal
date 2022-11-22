import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';

const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const location = useLocation();

    if(loading){
        return <div className="w-16 h-16 mx-auto border-4 border-dashed rounded-full animate-spin dark:border-rose-700 mt-32"></div>
    }
    if(user){
        return children;
    }
    return <Navigate to="/login" state={{from: location}} replace />;
};

export default PrivateRoute;