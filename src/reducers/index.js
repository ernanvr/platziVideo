import { combineReducers } from 'redux';
import chargeData from './chargeData';
import setFavorite from './setFavorite';

const combined = combineReducers({ chargeData, setFavorite });

export default combined;
