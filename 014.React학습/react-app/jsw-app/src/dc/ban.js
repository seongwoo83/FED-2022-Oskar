import "./css/ban.css";
import ban_data from "./data/banner";
import $ from "jquery";

$(()=>{
    // 1. 버튼 클릭시 이동기능 구현
    $(".abtn").on("click",function(){
        let isB = $(this).is(".rb");
        // console.log('오른쪽? ', isB);
        if(isB){
            
        }
    });////////click
});

function MakeList(props) {
    return (
        <li>
            <img src={props.rec["src"]} alt="배너" className="banimg" />
            <section className="bantit">
                <h3>{props.rec["tit1"]}</h3>
                <h2>{props.rec["tit2"]}</h2>
                <p>{props.rec["cont"]}</p>
                <button>{props.rec["btn"]}</button>
            </section>
        </li>
    );
} //////////////// MakeList

function Ban(props) {
    //props.cat 은 배너데이터 구분 속성명
    const sel_data = ban_data[props.cat];
    // sel_data에 담긴값은 data/banner.js 객체의 배열값
    return (
        <div className="banner">
            {/* 이동 슬라이드 */}
            <ul className="slider">
                {
                    sel_data.map((x, i)=><MakeList rec={x} key={i}/>)
                }
            </ul>
            {/* 이동버튼+슬라이드 불릿 : 슬라이드가 두 장 이상일 때 */}
            {
                /* 조건식 && 코드: 조건식이 true 일때 코드 출력 */
                sel_data.length > 1 &&
                <>
                    <button className="abtn lb">＜</button>
                    <button className="abtn rb">＞</button>
                </>
            }
        </div>
    );
} /////////// Ban
export default Ban;
