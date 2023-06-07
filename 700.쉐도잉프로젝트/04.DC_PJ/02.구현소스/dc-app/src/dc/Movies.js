// DC 무비 페이지 컴포넌트
import React from "react";
import Ban from "./modules/ban";
import VidIntro from "./modules/VidIntro";

const Movies = () =>{
    return(
        <>
            <h2>Movies 페이지</h2>
            <Ban cat="Movies" />
            <VidIntro pg="MOVIES & TV" />
        </>
    );
};

export default Movies;