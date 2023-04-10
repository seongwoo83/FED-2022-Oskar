// 보그 PJ 회원가입 페이지 JS - member.js

// 제이쿼리 코드블록
$(()=>{
    // 로딩확인
    console.log("로딩완료");

    /********************************************* 
        [ 사용자 입력폼 유효성 검사 ]
        - 이벤트종류 : blur(포커스가 빠질때 발생)
        - 제이쿼리 이벤트 메서드 : blur()
        - 이벤트 대상:
        -> id가 'email2'가 아니고 class가 'search'가 
        아닌 type이 'text'인 입력요소 input
        과 함께 type이 'password'인 입력요소 input

        ->>>> 제이쿼리 선택표현법:
        input[type=text][id!=email2][class!=search],
        input[type=password]
        >>> 대괄호는 속성선택자(CSS원래문법) 
        != 같지않다(제이쿼리전용)

    *********************************************/
   $(`input[type=text][id!=email2][class!=search],
   input[type=password]`)
   .on("blur",function(this: HTMLElement){

    // 0. 공백제거 처리함수
    // get rid of space -> 공백을 제거
    const groSpace = (txt : string) => txt.replace(/\s/g, "");
    // function(cv : string){return  cv.replace(/\s/g, "");}
    // 정규식: 슬래쉬( / )사이에 표현, \s 스페이스 문자
    //  정규식 참고 -> https://www.w3schools.com/jsref/jsref_obj_regexp.asp
    // 해석: 공백문자를 모두(g: global - 전역) 찾아서 없애시오


    // 1. 방금 블러가 발생한 요소의 id는?
    let cid = $(this).attr("id");
    
    // 2. 블러가 발생한 요소의 입력값은?
    let cv = cid === "mnm" ?
     ($(this).val() as string).trim() : groSpace($(this).val() as string);
    // 삼항 연산자 (cid가 mnm이냐? 응 : 아니)

    //서비스 차원에서 공백제거된 데이터를 다시 입력창에 넣어줌
    $(this).val(cv);

    /*********************************************
        3. 빈값 여부 검사하기
    *********************************************/
    if(cv === ""){
        // 메시지 출력
        $(this).siblings(".msg").text("값이 비어있습니다.");
        pass = false;
    }
    /*********************************************
        4. 아이디일 경우 유효성 검사
        - 검사기준: 영문자로 시작하는 6~20글자 영문자/숫자
    *********************************************/
else if(cid === "mid"){ // 아이디 검사
    console.log("아이디 검사 결과" ,vReg(cv, cid));
    if(!vReg(cv,cid)){ //false일때
        $(this).siblings(".msg").text("영문자로 시작하는 6~20글자 영문자/숫자").removeClass("on");
        pass = false;
    }else{ // true일때 통과시
        // 1. DB에 아이디가 있는지 조회후 결과로 처리해야함 -> 보류중
            // 만약 아이디가 이미 있으면 "이미 사용중이거나 탈퇴한 아이디입니다."
            // 만약 아이디가 없으면 "멋진 아이디네요!"

        // 2. 메시지 띄우기
        $(this).siblings(".msg").text("멋진 아이디네요!").addClass("on"); // 녹색글자
    }
}
    /*********************************************
        5. 비밀번호일 경우 유효성 검사
        - 검사기준: 특수문자,문자,숫자포함 형태의 5~15자리
    *********************************************/
else if(cid === "mpw"){ // 비밀번호 검사
    console.log("비밀번호 검사 결과" ,vReg(cv, cid));
    if(!vReg(cv,cid)){ //false일때
        $(this).siblings(".msg").text("특수문자,문자,숫자포함 형태의 5~15자리");
        pass = false;
    }else{ // true일때 통과시
        //  메시지 지우기
        $(this).siblings(".msg").empty();
    }
}
    /*********************************************
        6. 비밀번호확인일 경우 유효성 검사
        - 검사기준: 특수문자,문자,숫자포함 형태의 5~15자리
    *********************************************/
else if(cid === "mpw2"){ // 비밀번호확인 검사
    if(cv !== ($("#mpw").val() as string)){ //비밀번호와 같지 않을때
        $(this).siblings(".msg").text("비밀번호가 일치하지 않습니다.");
        pass = false;
    }else{ // 비밀번호와 같을때
        //  메시지 지우기
        $(this).siblings(".msg").empty();
    }
}


    else{ //모두 통과했을 경우
        $(this).siblings(".msg").empty(); //내용지우기 메서드 empty()
    }
    
   })

   
    // 이메일 관련 대상설정
    // 이메일 앞주소
   const eml1= $("#email1");
    // 이메일 뒷주소
   const eml2 = $("#email2");
   // 이메일 선택 박스
   const seleml = $("#seleml");

   /***************************************
        선택박스 변경시 이메일 검사하기
        _________________________

        검사시점: 선택박스 변경할 때
        이벤트: change -> 제이쿼리 change()메서드
        이벤트 대상: #seleml -> seleml 할당
   ***************************************/
   seleml.on("change",function(){
        // 1. 선택박스 변경된 값 읽어오기
        let cv = $(this).val();
        console.log(cv);

        // 2. 선택옵션별 분기문
        if(cv === "init"){
            // 선택해 주세요
            // 1. 메시지 출력
            eml1.siblings(".msg").text("이메일 옵션 선택필수").removeClass("on");
            // 2. 직접 입력창 숨기기
            eml2.fadeOut(300);
        }else if(cv === "free"){
            // 직접 입력
            // 1. 직접입력창 보이기
            eml2.fadeIn(300).val("").focus();
            //  val(값) -> 입력창에 값넣기(빈문자값은 기존값을 지워준다)
            // focus() -> 입력창에 포커스 가게 하기
            
            // 2. 기존 메시지 지우기
            eml1.siblings(".msg").empty();

        }else{
            // 이메일 주소일 경우
            // 1. 직접 입력창 숨기기
            eml2.fadeOut(300);

            // 2. 이메일 전체주소 조합하기
            let comp = eml1.val() + "@"+ cv;

            // 3. 이메일 유효성 검사 함수 호출
            resEml(comp)
        }
   })

   /********************************************
        키보드 입력시 이메일 체크하기
        _______________________________
        - 키보드 관련 이벤트 : keypress, keyup, keydown
        1. keypress : 키가 눌려졌을 때
        2. keyup : 키가 눌렸다가 올라올 때
        3. keydown :  키가 눌려져서 내려가 있을 때
        -> 과연 글자가 입력되는 순간은 어떤 키보드 이벤트를 적용해야 할까? -> keyup 이벤트

        이벤트 대상: #email1, #email2
        -> 모든 이벤트를 함수와 연결하는 제이쿼리 메서드는?
        on(이벤트명, 함수)
   ********************************************/
$("#email1, #email2").on("keyup", function(){
    // 1. 현재 이벤트 대상 아이디 읽어오기
    let cid = $(this).attr("id");
    // 2. 현재 입력된 값 읽어오기
    let cv = $(this).val();
    console.log("입력아이디", cid, "\n입력값", cv);
    //  3. 이메일 뒷주소 세팅하기
    let backeml = cid ==="email1" ? seleml.val() : eml2.val();
    //  현재 아이디가 "email1"인가? 맞으면 선택박스 : 아니면 두번째 이메일 뒷주소를 입력하는
    //  중이므로 그것을 선택
    // 4. 만약 선택박스 값이 "free"(직접입력)이면 이메일 뒷주소로 변경함
    if(seleml.val() === "free") backeml = eml2.val();  
    // 5. 이메일 전체주소 조합하기
    let comp = eml1.val() + "@" + backeml;
    // 6. 이메일 유효성 검사함수 호출
    resEml(comp);

})


    /********************************************
        함수명: resEml
        기능: 이메일 검사 결과 처리
    ********************************************/
const resEml = (comp : string) => {
    // 이메일 정규식 검사에 따른 메시지
    if(vReg(comp, "eml")){ //통과시
        eml1.siblings(".msg")
        .text("적합한 이메일 형식 입니다.").addClass("on");
    }else{ //통과 못했을 시
        eml1.siblings(".msg")
        .text("맞지 않는 이메일 형식 입니다.").removeClass("on");
    }
}

/***********************************************
    가입하기(submit) 버튼 클릭시 처리하기
    _______________________________

    전체검사의 원리:
    전역변수 pass를 설정하여  true를 할당하고 검사중간에
    불통과 사유발생시 false로 변경하여
    유효성 검사 통과여부를 판단함

    검사방법:
    기존 이벤트 blur이벤트를 강제로 발생시킨다
    이벤트를 강제로 발생시키는 메서드는? trigger(이벤트명)
***********************************************/
//  검사용 변수
let pass : boolean = true;
// 이벤트 대상: #btnj
// 원래 서브밋버튼은 클릭시 싸고있는 form태그의 action 설정 페이지로
// 모든 입력창의 값을 전송하도록 설계되어있다.
// 기본 서브밋 이동을 막고 우리가 검사한 후 전송한다
$("#btnj").on("click", function(e:any){
    // 1. 기본이동 막기
    e.preventDefault();
    
    // 2. pass 통과 여부 변수에 true를 할당
    //  처음에 true로 시작하여 검사 중간에 한번이라도 false로 할당되면 결과는 false로 리턴
    pass = true;

    // 3. 입력창  blur 이벤트 강제 발생
    //  대상: blur  이벤트 발생했던 요소들
    $(`input[type=text][id!=email2][class!=search],
   input[type=password]`).trigger("blur");

    // 최종 통과여부
    console.log("통과여부", pass);
})

});
/*////////////////////////////////////////////////////////
    함수명: vReg (validation with Regular Expression)
    기능: 값에 맞는 형식을 검사하여 리턴함
    (주의: 정규식을 따옴표로 싸지말아라!-싸면문자가됨!)
*/ ////////////////////////////////////////////////////////
function vReg(val : string, cid : string) {
    // val - 검사할값, cid - 처리구분아이디
    // //console.log("검사:"+val+"/"+cid);

    // 정규식 변수
    let reg : any;
    
    // 검사할 아이디에 따라 정규식을 변경함
    switch (cid) {
        case "mid": // 아이디
        reg = /^[a-z]{1}[a-z0-9]{5,19}$/g;
        // 영문자로 시작하는 6~20글자 영문자/숫자
        // /^[a-z]{1} 첫글자는 영문자로 체크!
        // [a-z0-9]{5,19} 첫글자 다음 문자는 영문 또는 숫자로
            // 최소 5글자에서 최대 19글자를 유효범위로 체크!
            // 첫글자 한글자를 더하면 최소 6글자에서 최대 20글자체크!
            break;
        case "mpw": // 비밀번호
        reg = /^.*(?=^.{5,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
        // 특수문자,문자,숫자포함 형태의 5~15자리
            // (?=^.{5,15}$) 시작부터 끝까지 전체 5~15자릿수 체크!
            // (?=.*\d) 숫자 사용체크!
            // (?=.*[a-zA-Z]) 영문자 대문자 또는 소문자 사용체크!
            // (?=.*[!@#$%^&+=]) 특수문자 사용체크!
            break;
            case "eml": // 이메일
            reg =
            /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
            // 이메일 형식에 맞는지 검사하는 정규식
            break;
        } //////////// switch case문 //////////////////
        
        // //console.log("정규식:"+reg);
        
        // 정규식 검사를 위한 JS메서드
        // -> 정규식.test(검사할값) : 결과 true/false
        return reg.test(val); //호출한 곳으로 검사결과리턴!
} //////////// vReg 함수 //////////////////////////////////
///////////////////////////////////////////////////////////