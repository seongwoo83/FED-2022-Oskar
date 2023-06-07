// DC 비디오 페이지 컴포넌트
import React from "react";
import isrc from "./Imgsrc";
import VidIntro from "./modules/VidIntro";

const Video = () =>{
    return(
        <>
            <h2>Video 페이지</h2>
            <iframe src={isrc.video} title="Video" />
            <VidIntro pg="VIDEO" />
        </>
    );
};

export default Video;