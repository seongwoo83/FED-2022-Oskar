// DC 메인 페이지 컴포넌트
import React from "react";
import Ban from "./ban";
import MenuBtn from "./MenuBtn";

const Main = () =>{
    return(
        <>
            <Ban cat="Main" />
            <MenuBtn />
        </>
    );
};

export default Main;