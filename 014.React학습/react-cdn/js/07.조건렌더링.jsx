///////////////////////////////////////
// 07. 조건 렌더링 + 리스트 렌더링 JSX //
///////////////////////////////////////

// 리액트에서는 조건부로 구성요소를 렌더링 할 수 있다!

////////////////////////////////////////
// 1. if문을 사용하여 조건부 렌더링하기 //
////////////////////////////////////////

// 선택적으로 로딩하도록 컴포넌트 2개 만들기

// 1번 컴포넌트
function MakeDev(){
    return <h1>나는 개발자야!</h1>;
};////////////////MakeDev
// 2번 컴포넌트
function LostDev(){
    return <h1>개발자가 뭐지?</h1>;
};////////////////MakeDev
// 3번 컴포넌트
function MakeImg(props){
    return <img src={props.isrc} alt={props.ialt} style={{width:"250px"}}/>
};///////////////MakeImg


// 출력 메인 컴포넌트
// 위의 두 가지 컴포넌트 중에 선택적으로 출력
function Developer(props){ // 호출시 전달되는 속성 props
    const isNow = props.isDev;  //boolean값 전달
    if(isNow){
        return (
            <React.Fragment>
                <MakeDev />
                <MakeImg isrc={props.isrc} ialt={props.ialt}/>
            </React.Fragment>
        )
    }

    // else문 없이도  if문에 들어가는 return 때문에 컴포넌트를 나감
    return (
        <React.Fragment>
            <LostDev />
            <MakeImg isrc={props.isrc} ialt={props.ialt}/>
        </React.Fragment>
    )
}///////////// Developer

// 이미지 경로 배열
const wisrc = [
    "data:image/jpeg;base64,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",
    "data:image/png;base64,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"
];

// 컴포넌트 호출1
ReactDOM. render(<Developer isDev={true} isrc={wisrc[0]} ialt={"배달이"}/>,  document.querySelector("#root1"))
// 컴포넌트 호출2
ReactDOM. render(<Developer isDev={false} isrc={wisrc[1]} ialt={"당근이"}/>,  document.querySelector("#root2"))


/**************************************************
    2.  if문이 아닌 조건 표현하기
    -> 조건식 && JSX표현식
    조건이 true일때만  && 뒤의 JSX조건식이 출력됨
**************************************************/

// 2-1 제목을 출력하기 위한 타이틀 컴포넌트
function Title(props){
    return <h1>개발자가 좋아하는 {props.tit}</h1>
}////////////////////// Title

// 음식리스트
const foods=["스파게티","짜파게티","냉면","짜장면","마라탕"];
// const foods=[];

// 2-2 반복리스트를 위한 컴포넌트
function FoodList(props){
    return <li>개발자는 {props.fname} 좋아해</li>
};///////////////////// FoodList

// 2-3 개발자 선호음식 리스트 출력 컴포넌트
function WishList(props){
    // 위시 리스트 담기
    const myfood = props.wlist;
    // 코드 리턴
    return(
        <React.Fragment>
            <Title tit="음식" />
            {/* 음식 위시리스트의 길이가 0보다 클때만 출력 */}
            {
                myfood.length > 0 &&
                <div>
                    <h2>
                        개발자가 좋아하는 음식은 모두 {myfood.length}가지 입니다.
                    </h2>
                    <ul>
                        {
                            //  배열변수.map()
                            // map(변수=>{표현식})
                            // 변수는 화살표 함수 안으로 값을 전달함
                            myfood.map(x=> <FoodList fname={x} />)
                        }
                    </ul>
                </div>
            }
            {/* 다른 경우 출력은 별도의 JSX 출력 중괄호 구역에 작성함 */}
            {
                myfood.length == 0 &&
                    <h2>아직 개발자 음식 리스트가 업데이트 되지 않았습니다.</h2>
            }
        </React.Fragment>
    )
};/////////////////////// WishList

// 컴포넌트 출력
ReactDOM.render(<WishList wlist={foods}/>, document.querySelector("#root3"));


// 좀 더 복잡한 리스트를 출력하는 컴포넌트

// 전달할 배열변수
const movs = [
    {year: "2021",mtit: "영화1"},
    {year: "2022",mtit: "영화2"},
    {year: "2023",mtit: "영화3"},
];

function MovieList(props){
    return <li>{props.year}년도 {props.mtit}</li>
}
function MovieWishList(props){
    const devMovie = props.mlist;
    return(
        <React.Fragment >
        {
            devMovie.length > 0 &&
            <div>
                <h2>개발자가 좋아하는 영화는 최근 {devMovie.length}년간 아래와 같습니다.</h2>
                <ul>
                    {
                        devMovie.map(x=><MovieList year={x.year} mtit={x.mtit}/>)
                    }
                </ul>
            </div>
        }
        {
            devMovie.length == 0 &&
            <h2>아직 개발자 영화 리스트가 업데이트 되지 않았습니다.</h2>
        }
        </React.Fragment>
    )
}
ReactDOM.render(<MovieWishList mlist={movs}/>, document.querySelector("#root4"));