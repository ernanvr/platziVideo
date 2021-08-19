import { combineReducers } from 'redux';
import chargeData from './chargeData';
import setFavorite from './setFavorite';
import loginUser from './login';

const combined = combineReducers({ chargeData, setFavorite, loginUser });

export default combined;
