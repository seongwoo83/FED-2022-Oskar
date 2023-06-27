import $ from "jquery";
import "../css/catlist.css";
import { Link } from "react-router-dom";

function jqfn() {
    $(() => {});
}
function CatList(props) {
    let sdt = props.dt;

    return (
        <>
            {/* 모듈코드 */}
            <ul className="clist">
                {sdt.map((v, i) => {
                    return (
                        <li key={i}>
                            <Link
                                to="/det"
                                state={{
                                    cname: v.cname,
                                    cdesc: v.cdesc,
                                    facts: v.facts,
                                }}
                            ></Link>
                            <img src={v.tmsrc} alt={v.cname} />
                            <h3>{v.cname}</h3>
                        </li>
                    );
                })}
            </ul>
            {jqfn()}
        </>
    );
}

export default CatList;
