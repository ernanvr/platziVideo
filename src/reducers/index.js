import { combineReducers } from 'redux';
import chargeData from './chargeData';
import setFavorite from './setFavorite';
import loginUser from './login';
import playing from './playing';

const combined = combineReducers({ chargeData, setFavorite, loginUser, playing });

export default combined;
