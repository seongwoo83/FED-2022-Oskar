import $ from 'jquery';
import '../css/vidswipe.css'
import SwiperVId from '../plugins/SwiperVid';

function jqfn(){
    $(()=>{
        $(".swiper-slide").on("click",function(){
            $(".playvid").show().find("iframe").attr("src", $(this).find("p").text()+ "?autoplay=1&mute=1");
            $(".vidtit h2").text($(this).find("h2").text());
        });
        $(".cbtn").on("click",function(){
            $(".playvid").hide().find("iframe").attr("src", "");
            $(".vidtit h2").text("");
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
                        <div className='vidtit'>
                            <h2>''</h2>
                            <button className='cbtn'>×</button>
                        </div>
                        <iframe src='' title='video' ></iframe>
                    </div>
                </section>
            </section>
            {jqfn()}
        </>
    );
}

export default Vidswipe;