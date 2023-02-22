// JS 실험실: 03.배너스타일 JS - ban.js

window.addEventListener("DOMContentLoaded", loadFn);
function loadFn() {
    let slist = document.querySelectorAll("#slide li");
    const abtn = document.querySelectorAll(".abtn");
    const slide = document.querySelector("#slide");
    const indic = document.querySelectorAll(".indic li");

    slist.forEach((ele, idx) => {
        ele.setAttribute("data-seq", idx);
    });

    let prot = 0;

    const goSlide = (seq) => {
        if (prot) return;
        prot = 1;
        setTimeout(() => {
            prot = 0;
        }, 400);
        let clist = slide.querySelectorAll("li");
        if (seq) {
            slide.style.left = "-330%";
            slide.style.transition = ".4s ease-in-out";
            clist.forEach((ele) => ele.classList.remove("on"));
            setTimeout(() => {
                slide.appendChild(clist[0]);
                clist[3].classList.add("on");
                slide.style.transition = "none";
                slide.style.left = "-220%";
            }, 400);
        } else {
            slide.insertBefore(clist[clist.length - 1], clist[0]);
            clist.forEach((ele) => ele.classList.remove("on"));
            slide.style.left = "-330%";
            slide.style.transition = "none";
            setTimeout(() => {
                slide.style.left = "-220%";
                slide.style.transition = ".4s ease-in-out ";
            }, 0);
            setTimeout(() => {
                clist[2].classList.add("on");
            }, 400);
        }

        clist = slide.querySelectorAll("li");
        let cseq = clist[seq].getAttribute("data-seq");

        for (let x of indic) x.classList.remove("on");

        indic[cseq].classList.add("on");
    };

    abtn.forEach((ele, idx) => {
        ele.onclick = (e) => {
            e.preventDefault();
            clearAuto();
            goSlide(idx);
        };
    });

    let autoI;
    let autoT;

    function autoSlide() {
        autoI = setInterval(() => goSlide(1), 3000);
    }

    autoSlide();

    function clearAuto() {
        clearInterval(autoI);
        clearTimeout(autoT);
        autoT = setTimeout(autoSlide, 5000);
    }
}
