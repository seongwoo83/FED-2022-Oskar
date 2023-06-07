/* eslint-disable */
import $ from 'jquery';
import '../css/vidintro.css'
import vidintro_data from '../data/vidintro';

function jqfn(){
    $(()=>{

    });
}
function VidIntro(props){
    let sdt = vidintro_data[props.pg]
    return(
        <>
            <section className='vid_box'>
                <div className='video_box'>
                    <iframe src={sdt.vsrc} title={sdt.btit}></iframe>
                </div>
                <div className='title_box'>
                    <h3>{sdt.stit}</h3>
                    <h2>{sdt.btit}</h2>
                    <p>{sdt.sum}</p>
                    <p>{sdt.desc}</p>
                    {
                        sdt.link[0] != "" && 
                        <a className='link_btn' href={sdt.link[1]} target='_blank'>{sdt.link[0]}</a>
                    }
                </div>
            </section>
            {/* 모듈코드 */}
            {jqfn()}
        </>
    );
}

export default VidIntro;