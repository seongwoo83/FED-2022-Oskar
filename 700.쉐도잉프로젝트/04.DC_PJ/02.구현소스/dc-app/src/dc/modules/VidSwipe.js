import $ from 'jquery';
import '../css/vidswipe.css'
import SwiperVId from '../plugins/SwiperVid';

function jqfn(){
    $(()=>{
        $(".swiper-slide").on("click",function(){
            $(".playvid").show().find("iframe").attr("src", $(this).find("p").text()+ "?autoplay=1&mute=1")
        });
        $(".cbtn").on("click",function(){
            $(".playvid").hide().find("iframe").attr("src", "");
        })
    });
}
function Vidswipe(props){
    return(
        <>
            {/* 모듈코드 */}
            <section className='vidswbox'>
                <h2 className='tit' >LATEST TRAILERS, CLIPS & MORE</h2>
                <SwiperVId />
                {/* 비디오 재생창 */}
                <section className='playvid'>
                    <div className='vidbx'>
                        <iframe src='' title='video' ></iframe>
                        <button className='cbtn'>×</button>\
                    </div>
                </section>
            </section>
            {jqfn()}
        </>
    );
}

export default Vidswipe;