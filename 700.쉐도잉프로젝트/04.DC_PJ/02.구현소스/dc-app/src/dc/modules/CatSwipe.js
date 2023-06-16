import $ from 'jquery';
import '../css/catswipe.css'
import SwiperCat from '../plugins/SwiperCat';

function jqfn(){
    $(()=>{
        $(".swiper-slide").on("click",function(){
            $(".playCat").show().find("iframe").attr("src", $(this).find("p").text()+ "?autoplay=1&mute=1");
            $(".Cattit h2").text($(this).find("h2").text());
        });
        $(".cbtn").on("click",function(){
            $(".playCat").hide().find("iframe").attr("src", "");
            $(".Cattit h2").text("");
        })
    });
}
function Catswipe(props){
    return(
        <>
            {/* 모듈코드 */}
                <SwiperCat />
            {jqfn()}
        </>
    );
}

export default Catswipe;