const message = (name : string, age : number) => `
    나의 이름은 ${name} 입니다.
    나이는 ${age}살 입니다. 반갑습니다.<br>
`;
// 단일한 함수 내보내기
// export default message;

// 만약 import 에서 별칭을 쓰고 싶다면 default로 내보낼 수 없음
//default를 빼고 중괄호로 묶어 내보내면 별칭 사용가능
// 이 문법은 default 를 사용해서 이름을 변경못하도록 이름을 특화시키는 문법으로 볼 수 있다.
export{message}