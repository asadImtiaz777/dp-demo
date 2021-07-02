import axiosInstance from "../../utils/axios";
import recordTimeConstants from "../constants/recordTime.constants";

const getProjects = () => {
    return async dispatch => {
        try {
            dispatch({
                type: recordTimeConstants.GET_PROJECT_REQUEST,
                payload: true
            });
            await axiosInstance.get('projects').then((response) => {
                dispatch({
                    type: recordTimeConstants.GET_PROJECT_SUCCESS,
                    payload: response.data
                });
            }).catch((error) => {
                dispatch({
                    type: recordTimeConstants.GET_PROJECT__FAILURE,
                    payload: false
                });
                console.log(error);
            });

        } catch (error) {
            dispatch({
                type: recordTimeConstants.GET_PROJECT__FAILURE,
                payload: false
            });

        }
    }
}

export default getProjects;