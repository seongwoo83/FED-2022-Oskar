// DC 게임 페이지 컴포넌트
import React from "react";
import Ban from "./modules/ban";
import VidIntro from "./modules/VidIntro";

const Games = () =>{
    return(
        <>
            <h2>Games 페이지</h2>
            <Ban cat="Games" />
            <VidIntro pg="GAMES" />
        </>
    );
};

export default Games;