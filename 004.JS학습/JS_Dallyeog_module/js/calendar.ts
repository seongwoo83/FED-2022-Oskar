//호출
MakeDallyeok();

function MakeDallyeok(){

    const qs = (x :any) => document.querySelector(x);
    const qsa = (x : any) => document.querySelectorAll(x);
    
    
    // 1. 변수 세팅

    // 1-1 변경할 현재날짜 객체
    const curr_date : Date = new Date();
    // 1-2 오늘 날짜 객체
    const today : Date = new Date();
    // 1-3 년도 요소 .yearTit
    const yearTit : any = qs(".yearTit");
    // 1-4 월 요소 .monthTit
    const monthTit :any = qs(".monthTit");
    // 1-5 날짜 요소 .dates
    const dates :any = qs(".dates");

    // 2. 함수 만들기
    // 2-1 달력 초기화 구성 함수
    const initDallyeok = ()=>{
        // getMonth() 정보는 항상 현재달 숫자보다 1작음
        // 1) 전달 마지막 날짜 (옵션 : 0) - 달력 전달 끝 날짜표시
        const prevLast = new Date(curr_date.getFullYear(), curr_date.getMonth(), 0);
        // 2) 현재 달 첫번째 날짜 (옵션 : 1 -> 전 달로 세팅) 
        const thisFirst = new Date(curr_date.getFullYear(), curr_date.getMonth(), 1);
        // 3) 현재 달 마지막 날짜 (옵션 : 0 -> 현재 달로 세팅) 
        const thisLast = new Date(curr_date.getFullYear(), curr_date.getMonth()+1, 0);
        // 4) 년도 표시하기
         yearTit.innerHTML = curr_date.getFullYear();
        // 5) 월 표시하기
         monthTit.innerHTML = curr_date.getMonth()+1;
        // 6) 날짜 넣을 배열 변수 만들기
        const dset :any[] =[];
        // 7) 전달 날짜 앞쪽 채우기
        // 조건 : 현재 달 첫번째 날짜 요일이 0이 아닌 경우
        if(thisFirst.getDay() !== 0 ){
            // for문 세팅 -> 요일 순번 보다 작을때 까지 ++ 
            for(let i =0; i<thisFirst.getDay(); i++){
                // 반복횟수만큼 배열 앞쪽에 추가
                // 전달은 클래스 "bm"으로 구분
                // 전달 마지막 날짜부터 -> prevLast.getDate()
            dset.unshift(`<span style="color:#ccc" class="bm">${prevLast.getDate()-i}</span>`);
            }
        }
        // 2-2 현재월 삽입하기
        // 반복문 구성: 현재월 1일부터 마지막 날짜까지 반복 배열추가
        for(let i:number=1; i<=thisLast.getDate(); i++){
            dset.push(i);
        }
        
        // 2-3 다음달 나머지칸 삽입하기
        // 다음달 클래스는 "am"으로 구분
        for(let i = 1; i< 14 ; i++){
            dset.push(`<span style="color:#ccc" class="am">${i}</span>`);
        }

        // 화면에 출력할 html변수
        let hcode : string = "";

        // 2-4 날짜만큼 배열 정보로 세팅하기
        // 7일 X 6주 = 42일
        for(let i =0; i< 42 ; i++){
            //오늘 날짜 표시
            if(today.getDate() === dset[i] && today.getMonth() === curr_date.getMonth() && today.getFullYear() === curr_date.getFullYear()){
                hcode += `
                <div class="date today">${dset[i]}</div>`;
            }else{
                hcode += `
                <div class="date">${dset[i]}</div>`;
            }
        }
        // 2-5 코드 화면에 출력
        // 대상 : .dates
        dates.innerHTML = hcode;

        // 각 날짜 .date 요소에 링크 설정하기
        qsa(".date").forEach(ele => {
            ele.onclick = ()=>{
                //년
                let cyear = addZero(yearTit.innerText);
                //월
                let cmonth = addZero(monthTit.innerText);
                //일
                let cdate = addZero(ele.innerText);

                // 전달/다음달은 span태그가 있으므로 구분함
                let isSpan = ele.querySelector("span");
                console.log(isSpan);
                // 없을 경우 null값이 나옴 -  if문에서 false처리됨

                if(isSpan){
                    let cls : boolean = isSpan.classList.contains("bm");
                    if(cls){ // 이전 달일 경우
                        //월에서 1을 뺌
                        // Number(문자형숫자) -> 숫자형으로 변환
                        // +를 제외한 다른 연산자들은 브라우저가 자체적으로 숫자형 계산을 해줌
                        cmonth = addZero((Number(cmonth)-1).toString())
                        console.log(cmonth);
                        if(cmonth === "0") {    
                            cmonth = "12";
                            cyear = (Number(cyear)-1).toString();
                        }
                    }else{ // 다음 달일 경우
                        cmonth = (Number(cmonth)+1).toString();
                        if(cmonth === "13") {
                            cmonth = "1";
                            cyear = (Number(cyear)+1).toString();
                        }
                    }
                }


                // 최종 날짜 데이터
                let comp = cyear + "-" + cmonth + "-" + cdate;
                console.log(comp);
            }
        });


    };

    //0자릿수 만들기 함수
    const addZero = (x:string )=> parseInt(x)<10?"0"+x:x;
    // 보낸 숫자가 10보다 작으면 앞에  "0"을 더해서 리턴함


    initDallyeok();//최초 호출


    // 2-2 이전 달력 출력하기 함수
    const prevCal = ()=>{
        // 이전 월로 변경하여 initDallyeok() 호출
        //getMonth() 월 가져오기 / setMonth() 월 세팅하기
        curr_date.setMonth(curr_date.getMonth()-1);
        initDallyeok();
    }
    // 2-3 다음 달력 출력하기 함수
    const nextCal = ()=>{
        // 이전 월로 변경하여 initDallyeok() 호출
        //getMonth() 월 가져오기 / setMonth() 월 세팅하기
        curr_date.setMonth(curr_date.getMonth()+1);
        initDallyeok();
    }
    
    // 버튼에 클릭 설정 하기
    qs(".btnL").onclick = prevCal;
    qs(".btnR").onclick = nextCal;

    

}