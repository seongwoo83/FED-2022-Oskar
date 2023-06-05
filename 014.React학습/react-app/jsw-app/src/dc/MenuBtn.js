import $ from 'jquery';
import './css/menubtn.css'

function jqfn(){
    $(()=>{

    });
}
function MenuBtn(pros){
    return(
        <>
            <section class="menubtn">
                <div >
                    <div class="imbx">
                        <img src={pros.rec.isrc} alt="cardboard" />
                    </div>
                    <div class="titbx">
                        <h3>{pros.rec.h3}</h3>
                        <h2>{pros.rec.h2}</h2>
                    </div>
                    <div class="btnbx">
                        <button>{pros.rec.btntxt}</button>
                    </div>
                </div>
            </section>
            {jqfn()}
        </>
    );
}

export default MenuBtn;