import authConstants from '../../constants/auth.constants'

const initialState = {
    isLogedIn: false,
    isError: false,
    user: {},
};

const authReducer = (state = initialState, action) => {

    let updatedState;

    switch(action.type){
        case authConstants.LOGIN_USER_SUCCESS:
            updatedState = {
                ...state
            }
            updatedState.isLogedIn = true;
            updatedState.isError = false;
            updatedState.user = action.payload;
            return updatedState;
        case authConstants.LOGIN_USER_FAILURE:
            updatedState = {
                ...state
            }
            updatedState.isLogedIn = false;
            updatedState.isError = true;
            updatedState.user = {}
            return updatedState;
        default:
            return {
                ...state
            };
    }
}

export default authReducer;