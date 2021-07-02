import { combineReducers } from 'redux';
import authReducer from './auth/index';
import recordTimeReducer from './recordTime';
    const rootReducer = combineReducers({
        auth: authReducer,
        recordTime: recordTimeReducer
      });
export default rootReducer;