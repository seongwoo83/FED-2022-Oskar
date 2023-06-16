// DC 로고 컴포넌트
import isrc from "./Imgsrc";
import React from "react";

const Logo = (props) => {
    //객체형 스타일적용: 속성명이 틀리면 아예 출력되지 않는다!
    const mystyle = {
        width: "45px",
        height: "45px",
        borderRadius: "50%",
        marginRight:"20px"
        // outline:"3px solid lime"
    };

    // 자식 컴포넌트 처리용 함수
    const nayana = (x) =>{
        props.tt(x)
    }

    return(
        <h1 style={mystyle} onClick={()=>nayana("나야나")}>
            <img src={isrc.logo} style={{width:"45px"}}  alt="로고"/>
        </h1>
    );
};
export default Logo;
