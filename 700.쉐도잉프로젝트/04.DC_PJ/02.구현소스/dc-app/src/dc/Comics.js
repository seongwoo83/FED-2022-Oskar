// DC 코믹 페이지 컴포넌트
import React from "react";
import Ban from "./ban";

const Comics = () =>{
    return(
        <>
            <h2>Comics 페이지</h2>
            <Ban cat="Comics" />
        </>
    );
};

export default Comics;