import "./css/ban.css";
import ban_data from "./data/banner";

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
            <ul className="slider">
                {
                    sel_data.map((x, i)=><MakeList rec={x} key={i}/>)
                }
            </ul>
        </div>
    );
} /////////// Ban
export default Ban;
