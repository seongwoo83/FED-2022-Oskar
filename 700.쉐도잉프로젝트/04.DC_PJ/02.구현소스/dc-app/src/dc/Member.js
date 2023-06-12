import $ from 'jquery';
import './css/member.css'

function jqfn(){
    $(()=>{

    });
}
function Member(){
    return(
        <>
            {/* 모듈코드 */}
            <h2>Member</h2>
            {jqfn()}
        </>
    );
}

export default Member;