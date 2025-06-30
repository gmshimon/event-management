
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../Loading/Loading';

const PrivateRoute = ({children}) => {
    const {user,isGetUserDataLoading} = useSelector(state=>state.user)
    const location = useLocation();

    if(isGetUserDataLoading){
        return <div className='flex h-screen items-center justify-center'>
            <Loading/>
        </div>
    }

    if(user?.email){
        return children
    }

    return (
        <Navigate to="/login" state={{from:location}} replace/>
    );
};

export default PrivateRoute;