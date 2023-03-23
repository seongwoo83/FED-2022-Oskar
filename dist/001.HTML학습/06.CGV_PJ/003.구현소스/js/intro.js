"use strict";
// 인트로 페이지 JS - intro.js
window.addEventListener("DOMContentLoaded", loadFn);
function loadFn() {
    console.log("로딩완료");
    /* 동영상 시간을 체크하여 일정시간후 메인페이지로 넘길 수 있음 */
    /* setTimeout(() => {
        location.href = "main.html";
    }, 40000); */
    /* 그러나, 동영상시간 이벤트를 사용하여 넘기는 것이 나음 */
    /* 대상: #myvid */
    /* 동영상 재생중 발생하는 이벤트 */
    /**
     * timeupdate -> 동영상 재생시간이 계속 업데이트시 발생
     */
    const myvid = document.querySelector("#myvid");
    // console.log('myvid: ', myvid);
    myvid.addEventListener("timeupdate", chkVid);
    function chkVid() {
        console.log("Stop?", myvid.paused);
        /* 비디오가 멈추면 재생끝이므로
        비디오 멈춤상태 체크함 */
        /* paused 속성은 멈추면 true/ 재생중이면 false 리턴 */
        /* 주의, 비디오의 자동재생 속성이 없어야함 */
        if (myvid.paused) {
            location.href = "main.html";
        }
    }
}
