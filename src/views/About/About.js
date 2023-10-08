import React from 'react';
import './about.css';

export const About = () => {
    return (
        <>
            <div className="data-container">
                <div className="text">
                    <h2 className="title content-left">Who are we?</h2>
                    <p className="data" >Lorem Ipsum</p>
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
                    <p className="data" >Lorem Ipsum</p>
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
            <div className="seperator-line"></div>
            <div className="data-container">
                <div className="text">
                    <h2 className="title content-left">Why PackX?</h2>
                    <p className="data" >Lorem Ipsum</p>
                </div>
                <div className="image-right">
                    <img src={require("../../assets/images/undraw_takeout_boxes_ap54.svg").default} alt="login" />
                </div>
            </div>
        </>
    );
}