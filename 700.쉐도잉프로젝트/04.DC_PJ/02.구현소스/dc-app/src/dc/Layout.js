import Logo from "./Logo";
import "./css/layout.css";
import { Link, Outlet } from "react-router-dom";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


/*****************************************
    [ 리액트 라우터와 연결하여 사용되는 라우터 컴포넌트 ]
    1. <Link to="/경로명"></Link>
    to의 경로는 Route 의 path 경로와 일치함

    2. <Outlet />
    -> 라우터 연결 컴포넌트 출력 자리 컴포넌트
*****************************************/

//  메인 레이아웃 컴포넌트
const Layout = () => {

    /* GNB메뉴 데이터 구성하기 */
    const gnb_data = [
        {
            txt:"CHARACTERS",
            link:"/ct"
        },
        {
            txt:"COMICS",
            link:"/co",
            sub:[
                {
                    txt:"LATEST COMICS",
                    link:"/co1"
                },
                {
                    txt:"DC UNIVERSE INFINITE",
                    link:"/co2"
                },
                {
                    txt:"ALL COMICS SERIES",
                    link:"/co3"
                },
            ]
        },
        {
            txt:"MOVIES & TV",
            link:"/mv",
            sub:[
                {
                    txt:"DC MOVIES",
                    link:"/mv"
                },
                {
                    txt:"DC SERIES",
                    link:"/mv"
                },
                {
                    txt:"DC ON HBO MAX",
                    link:"/mv"
                },
            ]
        },
        {
            txt:"GAMES",
            link:"/gm"
        },
        {
            txt:"NEWS",
            link:"/nw"
        },
        {
            txt:"VIDEO",
            link:"/vd"
        },
    ];
    const bmenu=['PRIVACY POLICY', 'TERMS', 'AD CHOICES', 'ACCESABILITY', 'COOKIE SETTINGS']

    return (
        <>
            {/* 1. 상단영역 */}
            <header className="top">
                {/*  네비게이션 파트 */}
                <nav className="gnb">
                    <ul>
                        <li>
                            <Link to="/main"><Logo gb="top"/></Link>
                        </li>
                        {
                            gnb_data.map((v,i)=>
                                <li key={i}>
                                    <Link to={v.link}>{v.txt}</Link>
                                    {
                                        v.sub !== undefined && 
                                        <div className="smenu">
                                            <ol>
                                                {
                                                    v.sub.map((v,i)=>
                                                        <li key={i}>
                                                            <Link to={v.link}>{v.txt}</Link>
                                                        </li>
                                                    )
                                                }
                                            </ol>
                                        </div>
                                    }
                                </li>
                            )
                        }
                        <li style={{marginLeft:"auto"}}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} fade size="lg"/>
                        </li>
                        <li>
                            <Link to="/mem">JOIN US</Link>
                        </li>
                        <li>
                            <Link to="/login">LOGIN</Link>
                        </li>
                    </ul>
                </nav>
            </header>
            {/* 2. 메인영역 */}
            <main className="cont">
                {/* 출력파트 : 각 페이지의 컴포넌트 출력됨 */}
                <Outlet />
            </main>
            {/* 3.하단영역 */}
            <footer className="info">
                <ul>
                    <li><Logo /></li>
                    <li>
                        <ol className="bmenu">
                            {
                                bmenu.map((v,i)=>
                                    <li key={i}><a href=" ">{v}</a></li>
                                )
                            }
                        </ol>
                    </li>
                    <li>All Site Content © &amp; TM DC, unless otherwise noted here.</li>
                    <li>All rights reserved.</li>
                </ul>
            </footer>
        </>
    );
}; //////////////// Layout

export default Layout;