import s from "./Pagination.module.css";
import React, {useState} from "react";

type PropsType = {
    portionSize: number
    totalItemsCount: number
    pageSize: number
    currentPage: number
    onChangedPage: (p: number) => void
}

export const Pagination: React.FC<PropsType> = React.memo(({portionSize, ...props}) => {

    let pagesCount = Math.ceil(props.totalItemsCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    let [portionNumber, setPortionNumber] = useState(1);

    let portionsCount = Math.ceil(pagesCount / portionSize);
    let leftBorder = portionSize * (portionNumber - 1) + 1;
    let rightBorder = portionSize * portionNumber;

    return <div className={s.pagination}>
            {portionNumber > 1 &&
                <button onClick={() => setPortionNumber(portionNumber - 1)}>
                    <i className={`${s.tiny} material-icons`}>fast_rewind</i></button>}
            {pages.filter(p => rightBorder >= p && p >= leftBorder).map(p => {
                return <span className={props.currentPage === p ? s.selectedPage : undefined}
                             onClick={() => props.onChangedPage(p)}><button>{p}</button></span>
            })
            }
            {portionsCount > portionNumber &&
                <button onClick={() => setPortionNumber(portionNumber + 1)}>
                    <i className={`${s.tiny} material-icons`}>fast_forward</i>
                </button>}
    </div>
})
