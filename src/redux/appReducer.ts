import {AuthActionTypes, setUserAuthThunk} from "./authReducer";
import {BaseThunkType, InferActionsType, StateType} from "./reduxStore";
import {ThunkDispatch} from "redux-thunk";

const INITIALIZING_SUCCESS = 'INITIALIZING_SUCCESS';

let initialState = {
    initialized: false,
};
type InitialStateType = typeof initialState

let appReducer = (state = initialState, action: AppActionTypes): InitialStateType => {
    switch (action.type) {

        case INITIALIZING_SUCCESS:
            return {
                ...state,
                initialized: true
            }

        default:
            return state;
    }
}

type AppActionTypes = InferActionsType<typeof appActions>

export const appActions = {
    initalizating: () => ({type: INITIALIZING_SUCCESS} as const)
}
export const initalizedThunk = (): (dispatch: ThunkDispatch<StateType, unknown, AppActionTypes>) => void => (dispatch) => {
    let promise = dispatch(setUserAuthThunk());
    Promise.all([promise]).then(() => {
        dispatch(appActions.initalizating())
    });
}

export default appReducer;