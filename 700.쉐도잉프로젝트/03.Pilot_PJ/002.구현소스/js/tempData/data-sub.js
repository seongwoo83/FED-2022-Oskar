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
    detail:`
        
    <!-- 큰이미지 배경박스 -->
    <div id="bgbx">
        <!-- 오른쪽버튼 -->
        <a href="#" class="abtn rb">
            <span class="ir">오른쪽버튼</span>
        </a>
        <!-- 왼쪽버튼 -->
        <a href="#" class="abtn lb">
            <span class="ir">왼쪽버튼</span>
        </a>
        <!-- 닫기버튼 -->
        <a href="#" class="cbtn">
            <span class="ir">닫기버튼</span>
        </a>
        
        <!-- 큰이미지 박스 -->
        <div id="imbx">
            <div class="inx">
                <!-- 큰 이미지 -->
                <section class="gimg">
                    <img :src="'./images/goods/' + $store.state.cat + '/' + $store.state.cls +'.png'" alt="큰 이미지">
                    <!-- 썸네일 이미지 -->
                    <div class="small">
                        <a href="#">
                            <img v-for="v in 6" :src="'./images/goods/' + $store.state.cat + '/m' + v +'.png'" alt="썸네일 이미지">
                        </a>
                    </div>
                </section>
                <!-- 이미지 설명 -->
                <section class="gdesc scbar">
                    
                    <!--상품 정보 영역-->
                    <h1>HOME &gt; {{$store.state.cat.toUpperCase()}}</h1>
                    <div>
                        <ol>
                            <li>
                                <img src="images/dx_ico_new-28143800.gif" alt="new버튼">
                            </li>
                            <li id="gtit">상품명 : {{$store.state.gname}}</li>
                            <li>
                                <img src="images/icon_type02_social01.gif" alt="페이스북"><img
                                    src="images/icon_type02_social02.gif" alt="트위터"><img src="images/icon_mail02.gif"
                                    alt="이메일"><img src="images/btn_source_copy.gif" alt="URL복사">
                            </li>
                            <li>
                                <span>판매가</span>
                                <span id="gprice">{{$store.state.gprice}}</span>
                            </li>
                            <li>
                                <span>적립금</span>
                                <span><img src="images/icon_my_m02.gif" alt="적립금">4,950(5%적립)</span>
                            </li>
                            <li>
                                <span>무이자할부</span>
                                <span>부분 무이자 할부 혜택 <img src="images/view_btn_nointerest_card.gif" alt="무이자카드보기"></span>
                            </li>
                            <li>
                                <span>상품코드</span>
                                <span id="gcode">{{$store.state.gcode}}</span>
                            </li>
                            <li>
                                <span>사이즈</span>
                                <span>95 100 105 110</span>
                            </li>
                            <li>
                                <span>구매수량</span>
                                <span>
                                    <input type="text" id="sum" value="1"/>
                                    <!--
                                    readonly 속성은 직접입력을 막음
                                    disable 속성은 입력창의 비활성화
                                    -->
                                    <b class="chg_num">
                                        <img src="images/cnt_up.png" alt="증가">
                                        <img src="images/cnt_down.png" alt="감소">
                                    </b>
                                </span>
                            </li>
                            <li>
                                <span>컬러</span>
                                <span></span>
                            </li>
                            <li>
                                <span>권장계절</span>
                                <span>여름</span>
                            </li>
                            <li class="tot">
                                <span>총합계</span>
                                <span id="total">13,000</span>
                            </li>
                        </ol>

                    </div>
                    <div>
                        <!--버튼영역-->
                        <button class="btn btn1">BUY NOW</button>
                        <button class="btn">SHOPPING CART</button>
                        <button class="btn">WISH LIST</button>

                    </div>
                </section>
            </div>
        </div>
    </div>
    
    `
};

export default subData;