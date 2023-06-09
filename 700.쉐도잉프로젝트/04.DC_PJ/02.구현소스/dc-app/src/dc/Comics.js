// DC 코믹 페이지 컴포넌트
import React from "react";
import VidIntro from "./modules/VidIntro";

const Comics = (props) =>{
    console.log(props.sub);
    const tit_data=[
        "",
        "LATEST COMICS & GRAPHIC NOVELS ",
        "DC UNIVERSE INFINITE",
        "ALL COMICS SERIES"
    ]

    return(
        <>
            <h1>COMICS 페이지</h1>
            <h2>{tit_data[props.sub]}</h2>
            <VidIntro pg='COMICS' />
        </>
    );
};

export default Comics;