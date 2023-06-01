import "./css/ban.css";
import ban_data from "./data/banner";

function Ban(props) { //props.cat 은 배너데이터 구분 속성명
    const sel_data = ban_data[props.cat]
    return (
        <div className="banner">
            <ul className="slider">
                <li>
                    <img src={sel_data[0]["src"]} alt="배너" className="banimg" />
                    <section className="bantit">
                        <h3>{sel_data[0]["tit1"]}</h3>
                        <h2>{sel_data[0]["tit2"]}</h2>
                        <p>{sel_data[0]["cont"]}</p>
                        <button>{sel_data[0]["btn"]}</button>
                    </section>
                </li>
            </ul>
        </div>
    );
} /////////// Ban
export default Ban;
