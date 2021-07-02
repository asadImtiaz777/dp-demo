import recordTimeConstants from "../../constants/recordTime.constants";

const initialState = {
    isRequest: false,
    projects: [],
};

const recordTimeReducer = (state = initialState, action) => {

    let updatedState;

    switch(action.type){

        case recordTimeConstants.GET_PROJECT_SUCCESS:
            updatedState = {
                ...state
            }
            updatedState.isRequest = false;
            updatedState.projects = action.payload;
            return updatedState;

        case recordTimeConstants.GET_PROJECT__FAILURE:
            updatedState = {
                ...state
            }
            updatedState.isRequest = false;
            updatedState.projects = []
            return updatedState;

        case recordTimeConstants.GET_PROJECT_REQUEST:
            updatedState = {
                ...state
            }
            updatedState.isRequest = true;
            updatedState.projects = []
            return updatedState;

        default:
            return {
                ...state
            };
    }
}

export default recordTimeReducer;