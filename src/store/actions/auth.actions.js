import axiosInstance from "../../utils/axios";
import authConstants from '../constants/auth.constants';


const getUser = () => {
    return async dispatch => {
        try {
            await axiosInstance.get('users/1').then((response) => {
                dispatch({
                    type: authConstants.LOGIN_USER_SUCCESS,
                    payload: response.data
                });
                localStorage.setItem('_DPWORLDUSER', response.data.name);
            }).catch((error) => {
                dispatch({
                    type: authConstants.LOGIN_USER_FAILURE,
                    payload: false
                });
            });

        } catch (error) {
            dispatch({
                type: authConstants.LOGIN_USER_FAILURE,
                payload: false
            });

        }
    }
}

export default getUser;
