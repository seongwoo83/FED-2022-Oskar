// 메인 레이아웃 컴포넌트
import Logo from "./Logo";
import "./css/layout.css";
import { Link, Outlet } from "react-router-dom";
import ScrollTop from "./common/ScrollTop";

/* 폰트어썸 임포트 */
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { gnb_data, bmenu } from "./data/common";
/******************************************************* 
    [ 리액트 라우터와 연결하여 사용되는 라우터 컴포넌트 ]
    1. <Link to="/경로명"></Link>
    -> to속성의 경로는 <Route path="/경로명"> 과 일치함!

    2. <Outlet />
    -> 라우터 연결 컴포넌트 출력자리 컴포넌트
*******************************************************/

const Layout = () => {
    /* GNB메뉴 데이터구성하기 */
    
    const [logSts, setLogSts] = useState(localStorage.getItem("minfo"));
    const [logMsg, setLogMsg] = useState("");
    const logStyle= {
        position:"absolute",
        left:"50%",
        transform:"translateX(-50%)"
    };

    // 로그인 세팅함수
    // -> ScrollTop.js 의 useEffect 함수구역에서 호출
    const setLogin = ()=>{
        // 1. 로그인 Hook변수 업데이트하기
        setLogSts(localStorage.getItem("minfo"))

        // 2. 로컬스토리지 값이 null 이 아니면 메시지 출력하기
        if(localStorage.getItem("minfo")){
            // 메시지 세팅하기
            setLogMsg("Welcome " + JSON.parse(localStorage.getItem("minfo"))["unm"])
        }
    }

    // 로그아웃 세팅함수
    // -> LOGOUT 버튼에서 호출함
    const logout = ()=>{
        //1. 로컬스토리지 "minfo" 삭제하기
        localStorage.removeItem("minfo");
        // 2. 로그인 상태 Hook 변수 업데이트
        setLogSts(null);
        console.log("로그아웃됨");
    }



    const callMe = (x) => {
        console.log("누구?",x);
    }; ////////// callMe /////////////

    return (
        <>
        {/* 라우터 갱신될 떄 스크롤 상단이동 모듈작동함
        + 로그인 세팅함수 호출전달하기 자식에게 setLogin 함수 전달*/}
        <ScrollTop sfn={setLogin}/>
            {/* 1.상단영역 */}
            <header className="top">

                {/* 로그인 환영 메시지 */}
                {
                    logSts != null && 
                    <div className="logmsg" style={logStyle}>
                        {logMsg}
                    </div>
                }


                {/* 네비게이션 파트 */}
                <nav className="gnb">
                    <ul>
                        <li>
                            <Link to="/main">
                                <Logo gb="top" tt={callMe}/>
                            </Link>
                        </li>
                        {gnb_data.map((v, i) => (
                            <li key={i}>
                                <Link to={v.link}>{v.txt}</Link>
                                {/* {console.log(v.sub)} */}
                                {/* v.sub가 없으면 undefined */}
                                {
                                    // 조건식 && 출력코드
                                    // 조건: sub데이터가 없지 않으면
                                    // undefined - 정의되지 않은값
                                    // null - 빈값
                                    // 위의 두가지는 데이터가 없다는 값임!
                                    v.sub !== undefined && (
                                        <div className="smenu">
                                            <ol>
                                                {v.sub.map((v, i) => (
                                                    <li key={i}>
                                                        <Link to={v.link}>{v.txt}</Link>
                                                    </li>
                                                ))}
                                            </ol>
                                        </div>
                                    )
                                }
                            </li>
                        ))}

                        <li style={{ marginLeft: "auto" }}>
                            <Link to="/sch"><FontAwesomeIcon icon={faSearch} fade/></Link>
                        </li>
                        {
                            /* 회원가입, 로그인은 로그인 아닌 상태일 때만 */
                            logSts === null && 
                            <>
                                <li>
                                    <Link to="/mem">Join Us</Link>
                                </li>
                                <li>
                                    <Link to="/login">LOG IN</Link>
                                </li>
                            </>
                        }
                        {
                            // 로그아웃 버튼은 로그인 상태일 때만
                            logSts !== null &&
                            <>
                                <li>
                                    { /*eslint-disable-next-line jsx-a11y/anchor-is-valid*/ }
                                    <a href="#" onClick={logout}>LOG OUT</a>
                                </li>
                            </>
                        }
                    </ul>
                </nav>
            </header>
            {/* 2. 메인영역 */}
            <main className="cont">
                {/* 출력파트 : 각 페이지의 컴포넌트가 출력됨 */}
                <Outlet />
            </main>
            {/* 3.하단영역 */}
            <footer className="info">
                <ul>
                    <li>
                        <Logo gb="bottom" />
                    </li>
                    <li>
                        <ol className="bmenu">
                            {bmenu.map((v, i) => (
                                <li key={i}>
                                    <a href={v.link} target="_blank" rel="noreferrer">
                                        {v.txt.toUpperCase()}
                                    </a>
                                </li>
                            ))} 
                        </ol>
                    </li>
                    <li>© & ™ DC. ALL RIGHTS RESERVED</li>
                </ul>
            </footer>
        </>
    );
}; ////////// Layout 컴포넌트 ///////

// 내보내기
export default Layout;