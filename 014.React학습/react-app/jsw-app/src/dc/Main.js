// DC 메인 페이지 컴포넌트
import React from "react";
import Ban from "./ban";
import MenuBtn from "./MenuBtn";
import mdata from "./data/menu";

const Main = () =>{
    return(
        <>
            <Ban cat="Main" />
            <div className="menubx" >
                {mdata.map((x, i)=>{
                    return <MenuBtn rec={x} key={i} /> 
                })}
            </div>
        </>
    );
};

export default Main;