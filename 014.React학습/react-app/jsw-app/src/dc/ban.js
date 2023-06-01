import "./css/ban.css";

function Ban() {
    const ban_data = [
        {
            "src":"./images/dcm21.jpg",
            "tit1":"GOTHAM GAZETTE",
            "tit2":"WORLDS TRAVELER",
            "cont":`Barry who? The Flash isn't the only DC hero this summer who's been traveling through the multiverse.`,
            "btn":"NEW PLACES FAMILAR FACES"
        },
        {
            "src":"./images/dcm23.jpg",
            "tit1":"GET TO KNOW",
            "tit2":"ROBIN",
            "cont":`Damian Wayne, offspring of Bruce Wayne and Talia al Ghul, is now Robin, Son of Batman.`,
            "btn":"MEET CASS"
        },
    ];
    return (
        <div className="banner">
            <ul className="slider">
                <li>
                    <img src={ban_data[0]["src"]} alt="배너" className="banimg" />
                    <section className="bantit">
                        <h3>{ban_data[0]["tit1"]}</h3>
                        <h2>{ban_data[0]["tit2"]}</h2>
                        <p>{ban_data[0]["cont"]}</p>
                        <button>{ban_data[0]["btn"]}</button>
                    </section>
                </li>
            </ul>
        </div>
    );
} /////////// Ban
export default Ban;
