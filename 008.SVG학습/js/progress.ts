$(()=>{
    console.log("로딩완료");


    // 1. 대상선정
    // 1-1. 버튼 : .act button
    const abtn = $(".act button");
    // 1-2. 퍼센트원: .btns
     const btns = $(".btns");

    // 2. 이벤트 설정
    // 2-1. 첫번째 버튼(팽수1) - 퍼센트 원
    abtn.first().on("click", progFn)
    
    /***********************************************
     함수명: progFn
     기능: 퍼센트 증가에 따른 숫자, 그래프변경
     ***********************************************/

    // 변경할 숫자변수
    let num : number = 0;

    function progFn(){
        // 퍼센트 증가
        num++;        
        if(num<101){
        // 첫번째 퍼센트원 진행하기
        btns.eq(0).find("circle").css({
            strokeDashoffset: "0"
        })
     
        // 첫번째 퍼센트원 숫자
        btns.eq(0).find(".ptxt").text(num);
        
        // 재귀호출하기 : 기준 수 보다 작을 때 까지
        // 기준수의 숫자가 원하는 %가 된다
            setTimeout(() => {
                progFn()
            }, 30);
        }
        
   }


})