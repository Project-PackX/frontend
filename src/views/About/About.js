import React from 'react';
import './about.css';

export const About = () => {
    return (
        <>
            <div className="data-container">
                <div className="text">
                    <h2 className="title content-left">Who are we?</h2>
                    <p className="data" >We are a university startup company, with a dedicated and enthusiastic team. 
                    Our journey started in 2022 as a little project, that developed into the final form of the currently nown PackX.
                    The original idea was to bleed fresh blood into the delivery industry. 
                    We are constantly at the edge of new technologies, taking full advantage of the digitalization and automation. 
                    With our services, we are offering world class delivery solutions to our customers. </p>
                </div>
                <div className="image-right">
                    <img src={require("../../assets/images/undraw_takeout_boxes_ap54.svg").default} alt="login" />
                </div>
            </div>
            <div className="seperator-line"></div>
            <div className="data-container">
                <div className="image-left">
                    <img src={require("../../assets/images/undraw_takeout_boxes_ap54.svg").default} alt="login" />
                </div>
                <div className="text">
                    <h2 className="title content-right">How it works?</h2>
                    <p className="data" >The core of the service is the main idea of a package point. 
                    The sender puts the given item into one of our package pontis after a quick registration over our website.
                    Then the logistics department takes care of the rest. All of the goods go over our main central warehouse. 
                    With our in house developed check in-out automatized package system (Quick'n Go) the unloading takes about 5 minutes after a carrier truck arrives.
                    Withing a quater of an hour the package is sorted to the correct truck that takes care of the transport.</p>
                </div>
            </div>
            <div className="seperator-line"></div>
            <div className="data-container">
                <div className="text">
                    <h2 className="title content-left">Why PackX?</h2>
                    <p className="data" >The PackX experience is unlike any other carrier could ever have provided.
                    Every item gets our "Quick'n Go" sorting treatment, resulting in insanely fast warehouse logistics processing, therefore the quickest delivery possible.
                    The package point architechture also allows us to work enviromentally friendly. 
                    The truck fleet of ours is completeley 100% electric powered, further reducing the carbon footprint of our company. </p>
                </div>
                <div className="image-right">
                    <img src={require("../../assets/images/undraw_takeout_boxes_ap54.svg").default} alt="login" />
                </div>
            </div>
            <div className="seperator-line"></div>
            <div className="person-container">
                <h2 className="title">Designed and created by</h2>
                <div className="logo-container">
                    <div className="logo-column">
                        <img src="https://via.placeholder.com/200x200" alt="Szakály Károly" />
                        <p  ></p>
                        <a href= "https://github.com/szkly" className="data" >Szakály Károly</a>
                        <p className="data" >DevOps and Backend </p>
                    </div>
                    <div className="logo-column">
                        <img src="https://via.placeholder.com/200x200" alt="Friedrich Artúr" />
                        <p  ></p>
                        <a href= "https://github.com/arturfriedrich" className="data" >Friedrich Artúr</a>
                        <p className="data" >Frontend and UX Design</p>
                    </div>
                    <div className="logo-column">
                        <img src="https://via.placeholder.com/200x200" alt="Szilágyi Dominik" />
                        <p  ></p>
                        <a href= "https://github.com/dominikszilagyi" className="data" >Szilágyi Dominik</a>
                        <p className="data" >Backend</p>
                    </div>
                    <div className="logo-column">
                        <img src="https://via.placeholder.com/200x200" alt="Töreky Zsombor" />
                        <p  ></p>
                        <a href= "https://github.com/tzsombi01" className="data" >Töreky Zsombor</a>
                        <p className="data" >Backend</p>
                    </div>
                    <div className="logo-column">
                        <img src="https://via.placeholder.com/200x200" alt="Székely Dániel" />
                        <p  ></p>
                        <a href= "https://github.com/MrHumanRebel" className="data" >Székely Dániel</a>
                        <p className="data" >Frontend and UX Design</p>
                    </div>
                </div>
                <div className="image-center">
                        <img src={require("../../assets/logos/sze.png").default} alt="sze" />
                </div>
            </div>
            
        </>
    );
}