import {Action, applyMiddleware, combineReducers, compose, createStore} from "redux";
import profileReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";
import usersReducer from "./usersReducer";
import authReducer from "./authReducer";
import thunk, {ThunkAction} from "redux-thunk";
import {reducer as formRedecer} from "redux-form";
import appReducer from "./appReducer";

let reducers = combineReducers({
    dialogsPage: dialogsReducer,
    profilePage: profileReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formRedecer,
    app: appReducer,
})
type ReducersType = typeof reducers
export type StateType = ReturnType<ReducersType>

type PropertiesType<T> = T extends {[key: string]: infer U} ? U : never
export type InferActionsType<T extends {[key: string]: (...args: any) => any}> = ReturnType<PropertiesType<T>>
export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, StateType, unknown, A>

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

//@ts-ignore
window.store = store;
export default store;