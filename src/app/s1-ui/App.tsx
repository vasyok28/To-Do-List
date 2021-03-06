import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { LoadingPage } from '../../components/loading/LoadingPage';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { LoginPage } from '../../pages/auth/login/s1-ui/LoginPage';
import { Logout } from '../../pages/auth/login/s1-ui/Logout';
import { NotFound } from '../../pages/errors/NotFound';
import { SheetPage } from '../../pages/sheet/s1-ui/SheetPage';
import { AppStoreType } from '../s2-bll/store';
import { initApp } from '../s2-bll/appThunks';
import {DesignType} from "../s2-bll/appSlice";
import './App.css';

function App() {

    const design = useSelector<AppStoreType, DesignType>(state => state.app.theme);
    const isInit = useSelector<AppStoreType, boolean>(state => state.app.initialized);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(initApp());
    }, []);

    if (!isInit) {
        return <LoadingPage design={design} />
    }

    return (
        <div className={design}>
            <Routes>
                <Route path='/' element={<SheetPage />} />
                <Route path='login' element={<LoginPage />} />
                <Route path='logout' element={<Logout design={design} />} />
                <Route path='404' element={<NotFound />} />
                <Route path="*" element={<Navigate to="/404" />} />
            </Routes>
        </div>
    );
}

export default App;
