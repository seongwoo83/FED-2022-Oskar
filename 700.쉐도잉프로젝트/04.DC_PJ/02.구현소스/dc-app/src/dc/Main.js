// DC 메인 페이지 컴포넌트
import React from "react";
import mdata from "./data/menu";
import Ban from "./modules/ban";
import MenuBtn from "./modules/MenuBtn";
import VidIntro from "./modules/VidIntro";

const Main = () =>{
    return(
        <>
            <Ban cat="Main" />
            <div className="menubx" >
                {mdata.map((x, i)=>{
                    return <MenuBtn rec={x} key={i} /> 
                })}
            </div>
            <VidIntro pg={"main"}/>
        </>
    );
};

export default Main;