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

    const lcode = (data) => { // data는 desc/sum 둘중에 전달됨
        return(
            <>
                {data.split('*')[0]}
                <a href={sdt.link[1]} target='_blank'>
                    {sdt.link[0]}
                </a>
                {data.split('*')[1]}            
            </>
        )
    }
    return(
        <>
            <section className={
                props.pg === 'main' ? 'vid_box' : 'vid_box on'
            }>
                <div className="vid_container">
                    <div className='video_box'>
                        <iframe src={sdt.vsrc} title={sdt.btit}></iframe>
                    </div>
                    <div className='title_box'>
                        <h3>{sdt.stit}</h3>
                        <h2>{sdt.btit}</h2>
                        <p>
                        {
                            sdt.sum.indexOf('*') == -1 ?
                            sdt.sum : lcode(sdt.sum)
                        }
                    </p>
                    <p className='desc'>
                        {
                            sdt.desc.indexOf('*') == -1 ?
                            sdt.desc : lcode(sdt.desc)
                        }
                    </p>
                        {
                            sdt.link[0] != "" && <a className='link_btn' href={sdt.link[1]} target='_blank'>{sdt.link[0]}</a>
                        }
                    </div>
            </div>
            </section>
            {/* 모듈코드 */}
            {jqfn()}
        </>
    );
}

export default VidIntro;