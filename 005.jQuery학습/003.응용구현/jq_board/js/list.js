// 리스트 페이지 JS

// [ json 파일 데이터 로컬 스토리지에 넣기 ]
// 1. 변수에 json파일 문자화 하여 불러오기
let jsn = JSON.stringify(mydata);
// console.log(jsn);

// 2. 로컬 스토리지 변수를 설정하여 할당하기
localStorage.setItem("bdata", jsn);
// console.log(localStorage.getItem("bdata"));

// 3. 로컬 스토리지 데이터를 파싱하여 게시판 리스트에 넣기
// 3-1 로컬 스토리지 데이터 파싱하기
let bdata = JSON.parse(localStorage.getItem("bdata"))
console.log(bdata); 