import React from 'react';
import './about.css';

export const About = () => {
    return (
        <>
            <div className="data-container">
                <div className="text">
                    <h2 className="title content-left">Who are we?</h2>
                    <p className="data" >We are a university startup company with a dedicated and enthusiastic team.
                        Our journey started in 2022 as a little project, which developed into the final form of the currently-existing PackX.
                        The original idea was to bleed fresh blood into the delivery industry.
                        We are constantly at the edge of new technologies, taking full advantage of digitalization and automation.
                        With our services, we are offering world-class delivery solutions to our customers. </p>
                </div>
                <div className="image-right">
                    <img src={require("../../assets/images/undraw_takeout_boxes_ap54.svg").default} alt="startup" />  {/* Should be: loading_trans.gif*/}
                </div>
            </div>
            <div className="seperator-line"></div>
            <div className="data-container">
                <div className="image-left">
                    <img src={require("../../assets/images/undraw_in_no_time_-6-igu.svg").default} alt="system" />
                </div>
                <div className="text">
                    <h2 className="title content-right">How it works?</h2>
                    <p className="data" >The core of the service is the main idea of a package point.
                        The sender puts the given item into one of our package points, after a quick registration on our website.
                        Then the logistics department takes care of the rest. All of the goods go through our main central warehouse.
                        With our in-house developed check-in-out automated package system (Quick'n Go), the unloading takes about 5 minutes after a carrier truck arrives.
                        Within a quarter of an hour, the package is sorted into the correct truck that takes care of the final transport.</p>
                </div>
            </div>
            <div className="seperator-line"></div>
            <div className="data-container">
                <div className="text">
                    <h2 className="title content-left">Why PackX?</h2>
                    <p className="data" >The PackX experience is unlike any other carrier could ever have provided.
                        Every item gets our "Quick'n Go" sorting treatment, resulting in insanely fast warehouse logistics processing and therefore the quickest delivery possible.
                        The package point architecture also allows us to work environmentally friendly.
                        Our truck fleet is completely electric, further reducing the carbon footprint of our company. </p>
                </div>
                <div className="image-right">
                    <img src={require("../../assets/images/undraw_takeout_boxes_ap54.svg").default} alt="electric" />
                </div>
            </div>
            <div className="seperator-line"></div>
            <div className="person-container">
                <h2 className="title">Designed and created by</h2>
                <div className="logo-container">
                    <div className="logo-column">
                        <img src={require("../../assets/images/undraw_takeout_boxes_ap54.svg").default} alt="Szakály Károly" />
                        <p  ></p>
                        <a href= "https://github.com/szkly" className="data" >Szakály Károly</a>
                        <p className="data" >DevOps and Backend </p>
                    </div>
                    <div className="logo-column">
                        <img src={require("../../assets/images/undraw_takeout_boxes_ap54.svg").default} alt="Friedrich Artúr" />
                        <p  ></p>
                        <a href= "https://github.com/arturfriedrich" className="data" >Friedrich Artúr</a>
                        <p className="data" >Frontend and UX Design</p>
                    </div>
                    <div className="logo-column">
                        <img src={require("../../assets/images/undraw_takeout_boxes_ap54.svg").default} alt="Szilágyi Dominik" />
                        <p  ></p>
                        <a href= "https://github.com/dominikszilagyi" className="data" >Szilágyi Dominik</a>
                        <p className="data" >Backend</p>
                    </div>
                    <div className="logo-column">
                        <img src={require("../../assets/images/undraw_takeout_boxes_ap54.svg").default} alt="Töreky Zsombor" />
                        <p  ></p>
                        <a href= "https://github.com/tzsombi01" className="data" >Töreky Zsombor</a>
                        <p className="data" >Backend</p>
                    </div>
                    <div className="logo-column">
                        <img src={require("../../assets/images/undraw_takeout_boxes_ap54.svg").default} alt="Székely Dániel" />
                        <p  ></p>
                        <a href= "https://github.com/MrHumanRebel" className="data" >Székely Dániel</a>
                        <p className="data" >Frontend and UX Design</p>
                    </div>
                </div>
                <div className="image-center">
                        <img src={require("../../assets/images/undraw_takeout_boxes_ap54.svg").default} alt="sze" />
                </div>
            </div>
            
        </>
    );
}