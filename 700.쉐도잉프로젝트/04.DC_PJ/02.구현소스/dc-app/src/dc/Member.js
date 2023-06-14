import $ from "jquery";
import "./css/member.css";
import { React, useRef, useState } from "react";
import { Link } from "react-router-dom";

function jqfn() {
    $(() => {});
}
function Member() {
    /* 
    [ 후크 : Hook - 왜 필요한가? ]
    1. 목적 - 어떤 특정 데이터가 변경될때
    다른 것을 매칭하여 실시간으로 변경할 필요가 있을 경우
    간단하고 효과적으로 이것을 구현해주는 방법이다!
    2. 구현방법
        1) 상단에 후크를 import 한다 -> useState
        2) useState() 메서드를 사용한다
        코드법: 
            배열변수 = useState(초기값)
        일반형:
            const [변수명,set변수명] = useState(초기값)
            -> set변수명 작성시 변수명 첫글자는 대문자로처리!
            -> set변수명(값) : 메서드 형태로 값을 셋팅한다!(셋터와 비슷함)
        3) 작동원리
            - useState에 쓴 초기값이 배열변수 첫번째에 할당된다
            - 코드에서 set변수명 에 값을 할당하면
            useState가 이것을 체크하여 다른 변경을 
            하도록 메서드를 실행한다!
        4) 사용결과
            - 별도의 메서드 호출없이 후크 상태변수를 사용한 곳이
            자동으로 변경될때마다 다시 갱신되는 것을 확인할 수 있다!
    */

    // 요구사항 : 각 입력항목에 맞는 유효성 검사를 입력하는 순간 실시간으로 체크하여 결과를 화면에 바로 리턴해줌
    // 1. 아이디 변수
    const [userId, setUserId] = useState("");
    // 2. 비밀번호 변수
    const [pwd, setPwd] = useState("");
    // 3. 비밀번호 확인
    const [chkPwd, setChkPwd] = useState("");
    // 4. 사용자 이름 변수
    const [userName, setUserName] = useState("");
    // 5. 이베일 변수
    const [email, setEmail] = useState("");

    // 에러 상태값 후크 변수
    // -> 에러 상태값 변수 : 초기값은 에러 아님상태(false)
    // 1. 아이디 에러 변수
    const [userIdError, setUserIdError] = useState(false);
    // 2. 비밀번호 에러 변수
    const [pwdError, setPwdError] = useState(false);
    // 3. 비밀번호 확인 에러 변수
    const [chkPwdError, setChkPwdError] = useState(false);
    // 4. 사용자 이름 에러 변수
    const [userNameError, setUserNameError] = useState(false);
    // 5. 이메일 에러 변수
    const [emailError, setEmailError] = useState(false);


    // 아이디 관련 메시지 프리셋
    const msgId = [
        "User ID must contain a minimum of 5 characters long",
        "This ID is already in use!",
        "That's a great ID!"
    ]

    // 후크 변수 메시지
    const [idMsg, setIdMsg] = useState(msgId[0])

    // 유효성 검사 메서드
    // 1. 아이디 유효성 검사
    const changeUserId = (e) => {
        const valid = /^[A-Za-z0-9+]{5,}$/;

        // 에러아님 상태 if문
        // 조건 : 유효성 검사결과가 true인가? 에러상태 false(에러 아님)
        // 정규식.test() -> 정규식 검사결과 리턴 메서드
        // 결과: true이면 에러상태값  false/ false이면 에러상태값 true
        if (valid.test(e.target.value)) {
            let memData = localStorage.getItem("mem-data");
            if(memData){
                memData = JSON.parse(memData);
                memData.forEach(v => {
                    if(v.uid === e.target.value){
                        setIdMsg(msgId[1]);
                        userIdError(true);
                    }else{
                        console.log("There's no DB");
                    }
                });
            }
            setUserIdError(false);
        } else {
            setUserIdError(true);
        }

        // 실제 userId 후크 변수 값이 업데이트 되어야 화면에 출력됨
        setUserId(e.target.value);
    };
    // 2. 비밀번호 유효성 검사
    const changePwd = (e) => {
        const valid = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (valid.test(e.target.value)) {
            setPwdError(false);
        } else {
            setPwdError(true);
        }
        setPwd(e.target.value);
    };

    // 3. 비밀번호 확인 유효성 검사
    const changeChkPwd = (e) => {
        if (e.target.value === pwd) {
            setChkPwdError(false);
        } else {
            setChkPwdError(true);
        }
        setChkPwd(e.target.value);
    };

    // 4. 이름 유효성 검사
    const changeUserName = (e) => {
        // 1. 에러상태를 먼저 false로 세팅
        if(e.target.value !== ""){
            setUserNameError(false);
        }else{
            setUserNameError(true);
        }
        setUserName(e.target.value);
    };
    
    // 5. 이메일 유효성 검사
    const changeEmail = (e) => {

        // 이메일 정규식 세팅
        const valid = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
        
        if(valid.test(e.target.value)){
            setEmailError(false);
        }else{
            setEmailError(true);
        }
        setEmail(e.target.value);
    };

    // 6. 전체 유효성 검사 함수
    const totalValid = ()=>{
        if(!userId) setUserIdError(true);
        if(!pwd) setPwdError(true);
        if(!chkPwd) setChkPwdError(true);
        if(!userName) setUserNameError(true);
        if(!email) setEmailError(true);

        // 에러 후크 변수가 모두 false일 경우 true 값 리턴
        if(userId && pwd && chkPwd && userName && email && !userIdError && !pwdError && !chkPwdError && !userNameError && !emailError){
            return true;
        }else{
            return false;
        }

    }


    // 7. submit 기능 함수
    const onSubmit = (e)=>{
        e.preventDefault();
        // 유효성 검사 전체 통과시
        if(totalValid()){
            // alert("처리페이지로 이동!");
            // 만약 localstorage "mem-data"가 null이면 만들어준다
            if(localStorage.getItem("mem-data") === null){ localStorage.setItem("mem-data",` [{"idx": "1", "uid": "tomtom", "pwd":"1111", "unm":"Tom", "eml":"tom@gmail.com"}] `) }
            
            // localstorage 변수할당
            let memData = localStorage.getItem("mem-data");
            console.log(localStorage.getItem("mem-data"));
            
            // localstorage 객체로 변환하기
            memData = JSON.parse(memData);
            console.log(memData);
            
            // 새로운 데이터 구성
            let newObj = { "idx": memData.length+1, "uid": userId, "pwd":pwd, "unm":userName, "eml":email };
            
            memData.push(newObj);
            console.log(memData);
            localStorage.setItem("mem-data", JSON.stringify(memData));
            console.log(localStorage.getItem("mem-data"));
        }else{
            // alert('입력을 수정하세요!');
        }

    }


    return (
        <>
            {/* 모듈코드 */}
            <section className="membx">
                <h2>Join Us</h2>
                <form>
                    <ul>
                        <li>
                            {/* 1. 아이디 */}
                            <label>ID : </label>
                            <input type="text" maxLength="20" placeholder="Please enter your ID" value={userId} onChange={changeUserId} />
                            {
                                // 에러일 경우 메세지 보여주기
                                // 조건문 && 요소 => 조건이 true이면 요소 출력
                                userIdError && (
                                    <div className="msg">
                                        <small style={{ color: "red", fontSize: "10px" }}>{idMsg}</small>
                                    </div>
                                )
                                // value={userId}값은 setUserId를 통해서만 업데이트되어 화면에 출력된다

                                // onChange={changeUserId} ->change이벤트 발생시 changeUserId호출
                            }
                        </li>
                        <li>
                            {/* 2. 비밀번호 */}
                            <label>Password : </label>
                            <input type="password" maxLength="20" placeholder="Please enter your Password" value={pwd} onChange={changePwd} />
                            {pwdError && (
                                <div className="msg">
                                    <small style={{ color: "red", fontSize: "10px" }}>Password must be at least 8 characters long and must contain at least one letter and one number each.</small>
                                </div>
                            )}
                        </li>
                        <li>
                            {/* 3. 비밀번호 확인 */}
                            <label>Password Confirm : </label>
                            <input type="password" maxLength="20" placeholder="Please enter your Password again" value={chkPwd} onChange={changeChkPwd} />
                            {chkPwdError && (
                                <div className="msg">
                                    <small style={{ color: "red", fontSize: "10px" }}>Password verification does not match.</small>
                                </div>
                            )}
                        </li>
                        <li>
                            {/* 4. 이름 */}
                            <label>User Name : </label>
                            <input type="text" maxLength="20" placeholder="Please enter your Name" value={userName} onChange={changeUserName} />
                            {userNameError && (
                                <div className="msg">
                                    <small style={{ color: "red", fontSize: "10px" }}>This is a required element.</small>
                                </div>
                            )}
                        </li>
                        <li>
                            {/* 5. 이메일 */}
                            <label>Email : </label>
                            <input type="text" maxLength="20" placeholder="Please enter your Name" value={email} onChange={changeEmail} />
                            {emailError && (
                                <div className="msg">
                                    <small style={{ color: "red", fontSize: "10px" }}>Please enter a valid eamil format.</small>
                                </div>
                            )}
                        </li>
                        <li style={{overflow:"hidden"}}>
                            {/* 6. 버튼 */}
                            <button className="sbtn" onClick={onSubmit}>
                                Submit
                            </button>
                        </li>
                        <li>
                            {/* 7. 로그인 페이지 링크 */}
                            Are you already a member? 
                            <Link to="/login">Log In</Link>
                        </li>
                    </ul>
                </form>
            </section>
            {jqfn()}
        </>
    );
}

export default Member;
