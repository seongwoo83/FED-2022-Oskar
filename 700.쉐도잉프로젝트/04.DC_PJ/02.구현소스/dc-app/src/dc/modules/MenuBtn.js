import $ from 'jquery';
import '../css/menubtn.css'
import { Link } from 'react-router-dom';

function jqfn(){$(()=>{});}
function MenuBtn(pros){
    return(
        <>
            <section className="menubtn">
                <div >
                    <div className="imbx">
                        <img src={pros.rec.isrc} alt="cardboard" />
                    </div>
                    <div className="titbx">
                        <h3>{pros.rec.tit.split("^")[0]}</h3>
                        <h2>{pros.rec.tit.split("^")[1]}</h2>
                    </div>
                    <div className="btnbx">
                        <button ><Link to={pros.rec.link}>{pros.rec.btn}</Link></button>
                    </div>
                </div>
            </section>
            {jqfn()}
        </>
    );
}

export default MenuBtn;