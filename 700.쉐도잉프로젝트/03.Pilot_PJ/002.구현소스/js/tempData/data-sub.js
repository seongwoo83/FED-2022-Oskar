// 서브 data 객체 세팅 JS - data-sub.js

const subData = {
    // 배너 영역
    banner: `
        <section id="ban" class="page">
            <div class="swiper mySwiper">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="v in $store.state.cnt" v-bind:key="v">
                        <img v-bind:src="'./images/sub/' + $store.state.cat + '/banner/ban' + v + '.png'" alt="서브배너 이미지" />
                    </div>
                </div>
                <div class="swiper-button-next"></div>
                <div class="swiper-button-prev"></div>
                <div class="swiper-pagination"></div>
            </div>
        </section>
    `,
    // 컨텐츠1 영역 : new arrival
    cont1: `
    <section v-bind:class="'cont c1 '+ $store.state.cat" id="c1" :data-cat="$store.state.cat">
        <!-- 2-2-1. 신상품 타이틀 -->
        <h2 class="c1tit js-reveal">{{$store.state.menu[0]}}</h2>
        <!-- 2-2-2. 신상품 박스 -->
        <div class="flowbx">
            <!-- 리스트박스 -->
            <ul class="flist js-reveal">
                <li v-for="v in 9" :class="'m'+v"><a href="#"><img :src="'./images/goods/'+$store.state.cat+'/m'+v+'.png'" alt="신상품"></a></li>
            </ul>
        </div>
    </section>
    `,
    // 컨텐츠2 영역 : special
    cont2: ``,
    // 컨텐츠3 영역 : 일반소개1
    cont3: ``,
    // 컨텐츠4 영역 : 일반소개2
    cont4: ``,
};

export default subData;