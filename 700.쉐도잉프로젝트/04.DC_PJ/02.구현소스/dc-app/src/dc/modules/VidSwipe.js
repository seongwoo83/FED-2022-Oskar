import $ from 'jquery';
import '../css/vidswipe.css'
import SwiperVId from '../plugins/SwiperVid';

function jqfn(){
    $(()=>{

    });
}
function Vidswipe(props){
    return(
        <>
            {/* 모듈코드 */}
            <SwiperVId />
            {/* 비디오 재생창 */}
            <section className='playvid'>
                <iframe src='' title=' '></iframe>
                <button className='cbtn'>×</button>
            </section>
            {jqfn()}
        </>
    );
}

export default Vidswipe;