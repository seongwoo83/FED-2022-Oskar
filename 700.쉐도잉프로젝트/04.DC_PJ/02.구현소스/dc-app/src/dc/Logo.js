// DC 로고 컴포넌트
import isrc from "./Imgsrc";

const Logo = () => {
    //객체형 스타일적용: 속성명이 틀리면 아예 출력되지 않는다!
    const mystyle = {
        width: "45px",
        height: "45px",
        borderRadius: "50%",
        marginRight:"20px"
        // outline:"3px solid lime"
    };

    return(
        <h1 style={mystyle}>
            <img src={isrc.logo} style={{width:"45px"}}  alt="로고"/>
        </h1>
    );
};
export default Logo;
