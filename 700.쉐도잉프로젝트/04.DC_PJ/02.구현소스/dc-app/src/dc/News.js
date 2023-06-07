// DC 뉴스 페이지 컴포넌트
import React from "react";
import Ban from "./modules/ban";

const News = () =>{
    return(
        <>
            <h2>News 페이지</h2>
            <Ban cat="News" />
        </>
    );
};

export default News;