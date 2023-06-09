import Logo from "./Logo";
import "./css/layout.css";
import { Link, Outlet } from "react-router-dom";

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
            txt:"Home",
            link:"/"
        },
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
                    link:"/lc"
                },
                {
                    txt:"DC UNIVERSE INFINITE",
                    link:"/du"
                },
                {
                    txt:"ALL COMICS SERIES",
                    link:"/ac"
                },
            ]
        },
        {
            txt:"MOVIES & TV",
            link:"/mv",
            sub:[
                {
                    txt:"DC MOVIES",
                    link:"/dm"
                },
                {
                    txt:"DC SERIES",
                    link:"/ds"
                },
                {
                    txt:"DC ON HBO MAX",
                    link:"/hbo"
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

    return (
        <>
            {/* 1. 상단영역 */}
            <header className="top">
                {/*  네비게이션 파트 */}
                <nav className="gnb">
                    <ul>
                        <li>
                            <Logo />
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
                                                        <li>
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
                All Site Content © &amp; TM DC, unless otherwise noted here.
                <br />
                All rights reserved.
            </footer>
        </>
    );
}; //////////////// Layout

export default Layout;