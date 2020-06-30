import {setUserAuthThunk} from "./authReducer";
import {Dispatch} from "redux";
import {StateType} from "./reduxStore";
import {ThunkAction} from "redux-thunk";

const INITIALIZING_SUCCESS = 'INITIALIZING_SUCCESS';


let initialState = {
    initialized: false,
};
type InitialStateType = typeof initialState

//@ts-ignore
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
type InitalizatingActionType = {
    type: typeof INITIALIZING_SUCCESS
}
//@ts-ignore
type AppActionTypes = InitalizatingActionType | AuthThunkType

export const initalizating = (): InitalizatingActionType => ({type: INITIALIZING_SUCCESS});

export const initalizedThunk = () => (dispatch: Dispatch<AppActionTypes>) => {
    let promise = dispatch(setUserAuthThunk());
    Promise.all([promise]).then(() => {
        dispatch(initalizating())
    });
}

export default appReducer;