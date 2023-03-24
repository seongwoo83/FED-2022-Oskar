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
    console.log(dates);

    // 2. 함수 만들기
    // 2-1 달력 초기화 구성 함수
    const initDallyeok = ()=>{
        // getMonth() 정보는 항상 현재달 숫자보다 1작음
        // 1) 전달 마지막 날짜 (옵션 : 0) - 달력 전달 끝 날짜표시
        const prevLast = new Date(curr_date.getFullYear(), curr_date.getMonth(), 0);
        console.log(prevLast);
        // 2) 현재 달 첫번째 날짜 (옵션 : 1 -> 전 달로 세팅) 
        const thisFirst = new Date(curr_date.getFullYear(), curr_date.getMonth(), 1);
        console.log(thisFirst);
        // 3) 현재 달 마지막 날짜 (옵션 : 0 -> 현재 달로 세팅) 
        const thisLast = new Date(curr_date.getFullYear(), curr_date.getMonth()+1, 0);
        console.log(thisLast);
        // 4) 년도 표시하기
         yearTit.innerHTML = curr_date.getFullYear();
        // 5) 월 표시하기
         monthTit.innerHTML += curr_date.getMonth();
        // 6) 날짜 넣을 배열 변수 만들기
        const dset :string[] =[];
        // 7) 전달 날짜 앞쪽 채우기
        // 조건 : 현재 달 첫번째 날짜 요일이 0이 아닌 경우
        if(thisFirst.getDay() !== 0 ){
            // for문 세팅 -> 요일 순번 보다 작을때 까지 ++ 
            for(let i =0; i<thisFirst.getDay(); i++){
                // 반복횟수만큼 배열 앞쪽에 추가
                // 전달 마지막 날짜부터 -> prevLast.getDate()
            dset.unshift(`${prevLast.getDate()-i}`);
            }
        }
        // 2-2 현재월 삽입하기
        // 반복문 구성: 현재월 1일부터 마지막 날짜까지 반복 배열추가
        for(let i:number=1; i<=thisLast.getDate(); i++){
            dset.push(`${i}`);
        }
        
        // 2-3 다음달 나머지칸 삽입하기
        for(let i = 1; i< 14 ; i++){
            dset.push(`${i}`);
        }

        // 화면에 출력할 html변수
        let hcode : string = "";

        // 2-4 날짜만큼 배열 정보로 세팅하기
        // 7일 X 6주 = 42일
        for(let i =0; i< 42 ; i++){
            hcode += `${dset[i]}`;
        }
        console.log(hcode);
    

    };

    initDallyeok();


}