/* eslint-disable */
// DC 메인 페이지 컴포넌트
import React from "react";
import mdata from "./data/menu";
import Ban from "./modules/ban";
import MenuBtn from "./modules/MenuBtn";
import VidIntro from "./modules/VidIntro";
import Vidswipe from "./modules/VidSwipe";
import { Tilt } from 'react-tilt';

const defaultOptions = {
	reverse:        false,  // reverse the tilt direction
	max:            35,     // max tilt rotation (degrees)
	perspective:    1000,   // Transform perspective, the lower the more extreme the tilt gets.
	scale:          1.1,    // 2 = 200%, 1.5 = 150%, etc..
	speed:          1000,   // Speed of the enter/exit transition
	transition:     true,   // Set a transition on enter/exit.
	axis:           null,   // What axis should be disabled. Can be X or Y.
	reset:          true,    // If the tilt effect has to be reset on exit.
	easing:         "cubic-bezier(.03,.98,.52,.99)",    // Easing on enter/exit.
}

const Main = () =>{
    return(
        <>
            <Ban cat={"Main"+Math.ceil(Math.random()*2)}/>
            <div className="menubx" >
                {mdata.map((x, i)=>{
                    return<MenuBtn rec={x} key={i} />
                })}
            </div>
            <VidIntro pg={"main"}/>
            <Vidswipe />
            <Ban cat="Characters" />
        </>
    );
};

export default Main;