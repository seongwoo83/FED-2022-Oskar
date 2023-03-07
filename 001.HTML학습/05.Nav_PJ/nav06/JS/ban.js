window.addEventListener("DOMContentLoaded", setBan);

function setBan(){
    /* 1. 호출확인 */
    console.log("배너야");

    /* 2. 대상선정: .bancont */
    const  bancont = document.querySelector(".bancont");

    /* 3. 태그 구성하기 */
    /* 태그 변수 */
    let hcode = `<ul class="slide">`;

    for(let i = 1; i <= 13; i++){
        hcode += `
            <li>
                <img src="./nav06/img_nav06/ban${i}.png" alt="배너 이미지">
            </li>
        `;
    }
    hcode +=`</ul>`;
    bancont.innerHTML = hcode;
}