import React, {Suspense} from "react";


function withSuspense<P>(Component: React.ComponentType<P>) {
    return (props: P) => {
        return <Suspense fallback={<div>Loading...</div>}>
            <Component {...props} />
        </Suspense>
    }
}

export default withSuspense;

