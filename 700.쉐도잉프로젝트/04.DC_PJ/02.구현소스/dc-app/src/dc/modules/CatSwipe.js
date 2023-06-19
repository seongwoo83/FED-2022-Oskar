import $ from 'jquery';
import '../css/catswipe.css'
import SwiperCat from '../plugins/SwiperCat';

function jqfn(){
    $(()=>{
    });
}
function Catswipe(props){
    return(
        <>
            <section className='Catswbox'>
                <h2 className='tit'>{props.tit}</h2>
                <SwiperCat />
            </section>
            {/* 모듈코드 */}
            {jqfn()}
        </>
    );
}

export default Catswipe;