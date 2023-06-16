import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';


// 스크롤 상단이동 컴포넌트 모듈은
// 라우터가 세팅된 <BrowserRouter>안에
// <ScrollTop />형태로 호출해야한다
// 현재 PJ에서는 index.js에 위치함
export default function ScrollTop(){
    // 현재 라우터의 매핑 페이지 위치 알아내기
    const {pathname} = useLocation();

    // 컴포넌트가 속해있는 컴포넌트의 변경이 있을 경우 부가적으로 함께 작동되도록 액션을 주고자 할 때 사용하는 리액트 모듈 -> useEffect
    // useEffect(함수,[사용할 라우터 페이지]) -> 함수가 실행됨
    useEffect(()=>{
        window.scrollTo(0, 0)
        // console.log("useEffect : ",localStorage.getItem("minfo"));
    }, [pathname]);

    // 이 컴포넌트 실행은 다른 부가적인 코드를 실행시키지 않는 다는 의미의 null값을 리턴함
    return null;
}
