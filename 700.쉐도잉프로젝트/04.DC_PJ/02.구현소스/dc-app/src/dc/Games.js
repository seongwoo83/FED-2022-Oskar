// DC 게임 페이지 컴포넌트
import React from "react";
import Ban from "./ban";

const Games = () =>{
    return(
        <>
            <h2>Games 페이지</h2>
            <Ban cat="Games" />
        </>
    );
};

export default Games;