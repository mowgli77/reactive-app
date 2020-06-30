import React from "react";
import preloader from "./preloader.gif";
import s from "./Preloader.module.css"

const Preloader: React.FC = () => {
    return <div className={s.img}>
        <img src={preloader} />
    </div>
}

export default Preloader;
