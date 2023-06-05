import $ from 'jquery';
import './css/menubtn.css'

function jqfn(){$(()=>{});}
function MenuBtn(pros){
    return(
        <>
            <section class="menubtn">
                <div >
                    <div class="imbx">
                        <img src={pros.rec.isrc} alt="cardboard" />
                    </div>
                    <div class="titbx">
                        <h3>{pros.rec.tit.split("^")[0]}</h3>
                        <h2>{pros.rec.tit.split("^")[1]}</h2>
                    </div>
                    <div class="btnbx">
                        <button ><a href={pros.rec.link}>{pros.rec.btn}</a></button>
                    </div>
                </div>
            </section>
            {jqfn()}
        </>
    );
}

export default MenuBtn;