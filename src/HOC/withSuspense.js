import React, {Suspense} from "react";
import DialogsContainer from "../components/Dialogs/DialogsContainer";


let withSuspense = (Component) => {
    return (props) => {
        return <Suspense fallback={<div>Loading...</div>}>
            <Component {...props} />
        </Suspense>
    }
}

export default withSuspense;

export let withSuspenseDialogs =  (props) => {
        return <Suspense fallback={<div>Loading...</div>}>
            <DialogsContainer {...props} />
        </Suspense>
}

