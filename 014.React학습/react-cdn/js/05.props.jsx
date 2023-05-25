// 05.Props JSX

/********************************************************** 
    [ 리액트 Props ]
    1. 리액트 구성요소에 전달되는 인수다!(전달변수)
    2. HTML 속성을 통해서 구성요소에 전달된다
    3. props는 속성이다.
    4. JS 함수에 셋팅되는 전달변수와 HTML속성과 동일함
    5. 컴포넌트로 보내기 위해서는 HTML속성과 동일한 구문사용
**********************************************************/


//  자기차를 소개하는 컴포넌트1
function Car (props){
    // 일반함수에서는 전달변수로 여러개 썼으나, 컴포넌트에 전달하는 props는 하나로 여러개 사용가능
    // 사용법: props.속성명

    return(
        <React.Fragment>
            <h2>나의 차는 {props.brand}입니다.</h2>
        </React.Fragment>
    )
}//////////////////  Car component

// 자기차를 소개하는 컴포넌트2
function Car2(props) {
    return(
        <React.Fragment>
            <h2>
                나의 차는 {props.brand.model}입니다.
                차 색은 {props.brand.color}입니다.
            </h2>
            <img src="./images/ray.png" alt="레이" style={props.brand.opt}/>
            {/* 
                인라인 스타일시트  넣기 형식:
                <태그 style={{ 객체형식 css }}
                -> 값은 문자형으로 함
            */}
        </React.Fragment>
    )
}


// 차 종류를 물어보고 답하는 컴포넌트 - Car 컴포넌트 사용
function Brand(){
    return (
        <React.Fragment>
            <h1>당신의 차는 무슨 차죠?</h1>
            <Car brand="기아레이" />
            {/* 다른 컴포넌트를 삽입한다. */}
        </React.Fragment>
    )
}

// 차 정보를 자세히 물어보는 컴포넌트  - Car2  컴포넌트 사용
function Brand2(props){
    // 코드를 여러가지고 return 전에 만들어준다
    // 속성을 객체로 여러개 세팅한다
    const carInfo = [{
        color: "라잇블루", 
        model: "2023년형",
        opt: {filter: 'hue-rotate(0deg)'}
    },
    {
        color: "녹차그린", 
        model: "2024년형",
        opt: {filter: 'hue-rotate(207deg)', transform: "rotateY(180deg)"}
    }]

    return(
        <React.Fragment>
            <h1>더 자세히 말씀해주세요</h1>
            <Car2 brand={carInfo[props.num]}></Car2>
        </React.Fragment>
    )
}



// 컴포넌트를 호출시 속성값으로 객체를 사용하려면 중괄호 안에 객체명을 써준다.
// 중괄호는 리액트에서 표현식이다.
ReactDOM.render(
    <div>
        <Brand />
        <Brand2 num="0"/>
        <Brand2 num="1"/>
    </div>,
    document.querySelector("#root1")
)