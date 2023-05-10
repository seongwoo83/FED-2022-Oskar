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
    cont1: ``,
    // 컨텐츠2 영역 : special
    cont2: ``,
    // 컨텐츠3 영역 : 일반소개1
    cont3: ``,
    // 컨텐츠4 영역 : 일반소개2
    cont4: ``,
};

export default subData;