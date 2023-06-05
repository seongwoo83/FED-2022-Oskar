import $ from 'jquery';
import './css/menubtn.css'

function jqfn(){
    $(()=>{

    });
}
function MenuBtn(){
    return(
        <>
            <div id="menubx">
                <section class="menubtn">
                    <div class="imbx">
                        <img src="./images/dcmmenu1.jpg" alt="cardboard" />
                    </div>
                    <div class="titbx">
                        <h3>WORLDS COLLIDE</h3>
                        <h2>THE FLASH IS ONLY IN THEATERS JUNE 16</h2>
                    </div>
                    <div class="btnbx">
                        <button>TICKETS ON SALE NOW</button>
                    </div>
                </section>
            </div>
            {jqfn()}
        </>
    );
}

export default MenuBtn;