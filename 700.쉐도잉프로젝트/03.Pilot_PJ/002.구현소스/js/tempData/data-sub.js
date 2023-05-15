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
    cont2: `
    <section :class="'cont c2 '+ $store.state.cat" id="c2">
        <h2 class="c2tit js-reveal">{{$store.state.menu[1]}}</h2>
    </section>
    `,
    // 컨텐츠3 영역 : 일반소개1
    cont3: `
    <section class="cont c3" id="c3">
        <ul class="pgc">
            <li class="txtc">
                <h2>
                    <a href="#" class=" js-reveal"> {{$store.state.cat.toUpperCase()}}'S<br />{{$store.state.menu[2]}} </a>
                </h2>
            </li>
            <li class="imgc">
                <img :src="'./images/sub/'+$store.state.cat+'/03.disc.png'" alt="남자" />
            </li>
        </ul>
    </section>
    `,
    // 컨텐츠4 영역 : 일반소개2
    cont4: `
    <section class="cont c4" id="c4">
        <ul class="pgc">
            <li class="imgc">
                <img :src="'./images/sub/'+$store.state.cat+'/04.disc.png/'" alt="공유 가방" />
            </li>
            <li class="txtc">
                <h2 class="tm">
                    <a href="#" class=" js-reveal"> {{$store.state.cat.toUpperCase()}}'S<br />SPORT STYLE </a>
                </h2>
                <h2 class="tw">
                    <a href="#" class=" js-reveal"> {{$store.state.cat.toUpperCase()}}'S<br />LIFE STYLE </a>
                </h2>
            </li>
            <li class="imgc">
                <img :src="'./images/sub/'+$store.state.cat+'/05.disc.png/'" alt="공유 의자" />
            </li>
        </ul>
    </section>
    `,
};

export default subData;