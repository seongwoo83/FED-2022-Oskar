import "./css/ban.css";
import ban_data from "./data/banner";
import $ from "jquery";

$(()=>{
    let prot = 0;


    // 1. 버튼 클릭시 이동기능 구현
    $(".abtn").on("click",function(){
        if(prot) return;
        prot = 1;
        setTimeout(() => {prot = 0;}, 400);

        let isB = $(this).is(".rb");
        // console.log('오른쪽? ', isB);

        // 슬라이드 타겟 설정 : 클릭된 버튼의 형제요소 슬라이더
        let tg = $(this).siblings(".slider");

        // 2. 분기하여 기능 구현
        // 2-1 오른쪽 버튼 클릭시: 오른쪽에서 들어옴(left : -100%)
        if(isB){
            tg.animate({left:"-100%"}, 400, function(){$(this).append($(this).find("li").first()).css({left:"0"});});
        }else{
            tg.prepend(tg.find("li").last()).css({left:"-100%"}).animate({left:"0"}, 400);
        }

        // 3. 배너와 일치하는 불릿 클래스 "on" 넣기
        // 대상:  .indic li
        $(".indic li").eq(tg.find("li").eq(isB).attr("data-seq")).addClass("on").siblings().removeClass("on")

    });////////click
});

function MakeList(props) {
    return (
        <li data-seq={props.idx}>
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
                    sel_data.map((x, i)=><MakeList rec={x} idx={i} key={i}/>)
                }
            </ul>
            {/* 이동버튼+슬라이드 불릿 : 슬라이드가 두 장 이상일 때 */}
            {
                /* 조건식 && 코드: 조건식이 true 일때 코드 출력 */
                sel_data.length > 1 &&
                <>
                    {/* 양쪽 이동 버튼 */}
                    <button className="abtn lb">＜</button>
                    <button className="abtn rb">＞</button>
                    {/* 불릿 인디케이터 */}
                    <ol className="indic">
                        {
                            sel_data.map((x,i)=>
                                <li className={i === 0? 'on' : "" } key={i}></li>
                                )
                        }
                    </ol>
                </>
            }
        </div>
    );
} /////////// Ban
export default Ban;
