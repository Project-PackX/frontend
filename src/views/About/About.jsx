import React, { useState } from 'react';
import './about.css';

export const About = () => {

    const [clickCount, setClickCount] = useState(0);
    const maxClickCount = 5;

    const handleImageClick = () => {
        if (clickCount < maxClickCount) {
            setClickCount(clickCount + 1);
        }
    };
    return (
        <main>
            <div className="container about-container">
                <div className="row">
                    <div className="col-md-5">
                        <h1 className="about-title">Who are we?</h1>
                        <p className="about-data">We are a university startup company with a dedicated and enthusiastic team. Our journey started in 2022 as a little project, which developed into the final form of the currently-existing PackX. The original idea was to bring innovation to the delivery industry. We take full advantage of digitalization and automation to offer world-class delivery solutions to our customers.</p>
                    </div>
                    <div className="col-md-7">
                        <img src={"../../assets/logos/pack_norm_black.svg".default} alt="startup" className="about-img-right" />
                    </div>
                </div>
            </div>
            <div className="container about-container">
                <div className="row">
                    <div className="col-md-7">
                        <img src={"../../assets/images/undraw_in_no_time_-6-igu.svg".default} alt="system" className="about-img-left" />
                    </div>
                    <div className="col-md-5">
                        <h1 className="about-title">How it works?</h1>
                        <p className="about-data">The core of the service is the idea of a package point. Senders use our package points after a quick registration on our website. The logistics department takes care of the rest. All goods go through our central warehouse. With our in-house developed check-in-out automated package system (Quick'n Go), unloading takes about 5 minutes after a carrier truck arrives. Within a quarter of an hour, the package is sorted into the correct truck for final transport.</p>
                    </div>
                </div>
            </div>
            <div className="container about-container">
                <div className="row">
                    <div className="col-md-5">
                        <h1 className="about-title">Why PackX?</h1>
                        <p className="about-data">The PackX experience is unlike any other carrier could ever provide. Every item gets our "Quick'n Go" sorting treatment, resulting in fast warehouse logistics processing and the quickest delivery possible. Our truck fleet is completely electric, further reducing the carbon footprint of our company.</p>
                    </div>
                    <div className="col-md-7">
                        <img src={"../../assets/images/undraw_environment_iaus.svg".default} alt="electric" className="about-img-right" />
                    </div>
                </div>
            </div>
            <div className="about-person-container text-center">
                <h1 className="about-title">Designed and created by</h1>
                <div className="row justify-content-center about-logo-container">
                    <div className="col-md-2 about-logo-column">
                        <img src={"../../assets/people/karcsi.jpg"} alt="Szakály Károly" className="about-img-profile" />
                        <a href="https://github.com/szkly" className="about-people-link" >Szakály Károly</a>
                        <p className="about-people-data">DevOps and Backend</p>
                    </div>
                    <div className="col-md-2 about-logo-column">
                        <img src={"../../assets/people/artur.jpg"} alt="Friedrich Artúr" className="about-img-profile" />
                        <a href="https://github.com/arturfriedrich" className="about-people-link" >Friedrich Artúr</a>
                        <p className="about-people-data">Frontend and UX Design</p>
                    </div>
                    <div className="col-md-2 about-logo-column">
                        <img src={"../../assets/people/domi.jpg"} alt="Szilágyi Dominik" className="about-img-profile" />
                        <a href="https://github.com/dominikszilagyi" className="about-people-link" >Szilágyi Dominik</a>
                        <p className="about-people-data">Backend</p>
                    </div>
                    <div className="col-md-2 about-logo-column">
                        <img src={"../../assets/people/zsombi.jpg"} alt="Töreky Zsombor" className="about-img-profile" />
                        <a href="https://github.com/tzsombi01" className="about-people-link" >Töreky Zsombor</a>
                        <p className="about-people-data">Backend</p>
                    </div>
                    <div className="col-md-2 about-logo-column">
                        <img src={"../../assets/people/danci.jpg"} alt="Székely Dániel" className="about-img-profile" />
                        <a href="https://github.com/MrHumanRebel" className="about-people-link" >Székely Dániel</a>
                        <p className="about-people-data">Frontend and UX Design</p>
                    </div>
                </div>
                <div className="about-content-center">
                <img
                        src={clickCount < maxClickCount ? "../../assets/logos/sze.png") : require("../../assets/images/sze_2.webp"}
                        alt="sze"
                        className="about-img-sze"
                        onClick={handleImageClick}
                    />
                </div>
            </div>

        </main>
    );
}
