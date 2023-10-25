import React from 'react';
import { Link } from 'react-router-dom';
import './about.css';

export const About = () => {
    return (
        <main>
            <div className="container about-container">
                <div className="row">
                    <div className="col-md-4">
                        <h1 className="about-title">Who are we?</h1>
                        <p className="about-data">We are a university startup company with a dedicated and enthusiastic team. Our journey started in 2022 as a little project, which developed into the final form of the currently-existing PackX. The original idea was to bring innovation to the delivery industry. We take full advantage of digitalization and automation to offer world-class delivery solutions to our customers.</p>
                    </div>
                    <div className="col-md-6">
                        <img src={require("../../assets/logos/packx_logo.png")} alt="startup" className="img-fluid" />
                    </div>
                </div>
            </div>
            <div className="container about-container">
                <div className="row">
                    <div className="col-md-6">
                        <img src={require("../../assets/images/undraw_in_no_time_-6-igu.svg").default} alt="system" className="img-fluid" />
                    </div>
                    <div className="col-md-6">
                        <h1 className="about-title">How it works?</h1>
                        <p className="about-data">The core of the service is the idea of a package point. Senders use our package points after a quick registration on our website. The logistics department takes care of the rest. All goods go through our central warehouse. With our in-house developed check-in-out automated package system (Quick'n Go), unloading takes about 5 minutes after a carrier truck arrives. Within a quarter of an hour, the package is sorted into the correct truck for final transport.</p>
                    </div>
                </div>
            </div>
            <div className="container about-container">
                <div className="row">
                    <div className="col-md-6">
                        <h1 className="about-title">Why PackX?</h1>
                        <p className="about-data">The PackX experience is unlike any other carrier could ever provide. Every item gets our "Quick'n Go" sorting treatment, resulting in fast warehouse logistics processing and the quickest delivery possible. Our truck fleet is completely electric, further reducing the carbon footprint of our company.</p>
                    </div>
                    <div className="col-md-6">
                        <img src={require("../../assets/images/undraw_environment_iaus.svg").default} alt="electric" className="img-fluid" />
                    </div>
                </div>
            </div>
            <div className="person-container text-center">
                <h1 className="about-title">Designed and created by</h1>
                <div className="row justify-content-center logo-container">
                    <div className="col-md-2 logo-column">
                        <img src={require("../../assets/images/undraw_takeout_boxes_ap54.svg").default} alt="Szakály Károly" className="img-fluid rounded-circle" />
                        <a href="https://github.com/szkly" className="about-data">Szakály Károly</a>
                        <p className="about-data">DevOps and Backend</p>
                    </div>
                    <div className="col-md-2 logo-column">
                        <img src={require("../../assets/images/undraw_takeout_boxes_ap54.svg").default} alt="Friedrich Artúr" className="img-fluid rounded-circle" />
                        <a href="https://github.com/arturfriedrich" className="about-data">Friedrich Artúr</a>
                        <p className="about-data">Frontend and UX Design</p>
                    </div>
                    <div className="col-md-2 logo-column">
                        <img src={require("../../assets/images/undraw_takeout_boxes_ap54.svg").default} alt="Szilágyi Dominik" className="img-fluid rounded-circle" />
                        <a href="https://github.com/dominikszilagyi" className="about-data">Szilágyi Dominik</a>
                        <p className="about-data">Backend</p>
                    </div>
                    <div className="col-md-2 logo-column">
                        <img src={require("../../assets/images/undraw_takeout_boxes_ap54.svg").default} alt="Töreky Zsombor" className="img-fluid rounded-circle" />
                        <a href="https://github.com/tzsombi01" className="about-data">Töreky Zsombor</a>
                        <p className="about-data">Backend</p>
                    </div>
                    <div className="col-md-2 logo-column">
                        <img src={require("../../assets/images/undraw_takeout_boxes_ap54.svg").default} alt="Székely Dániel" className="img-fluid rounded-circle" />
                        <a href="https://github.com/MrHumanRebel" className="about-data">Székely Dániel</a>
                        <p className="about-data">Frontend and UX Design</p>
                    </div>
                </div>
                <div className="about-content-center">
                <img src={require("../../assets/logos/sze.png")} alt="sze" className="img-sze" />
                </div>

            </div>

        </main>
    );
}
