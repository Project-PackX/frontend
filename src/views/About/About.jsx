import { useState } from "react";
import "./about.css";

export const About = () => {
  const [clickCount, setClickCount] = useState(0);
  const maxClickCount = 3;

  const handleImageClick = () => {
    if (clickCount < maxClickCount) setClickCount(clickCount + 1);
  };

  const Column = ({ imgSrc, imgAlt, title, text }) => (
    <div className="col-md-5">
      <h1 className="about-title">{title}</h1>
      <p className="about-data">{text}</p>
    </div>
  );

  const Image = ({ imgSrc, imgAlt, className }) => <img src={imgSrc} alt={imgAlt} className={className} />;

  const Person = ({ imgSrc, imgAlt, name, github, role }) => (
    <div className="col-md-2 about-logo-column">
      <img src={imgSrc} alt={imgAlt} className="about-img-profile" />
      <a href={github} className="about-people-link">
        {name}
      </a>
      <p className="about-people-data">{role}</p>
    </div>
  );

  const SzeImage = () => (
    <img
      src={clickCount < maxClickCount ? "/assets/logos/sze.png" : "/assets/images/sze_2.webp"}
      alt="sze"
      className="about-img-sze"
      onClick={handleImageClick}
    />
  );

  return (
    <main>
      <div className="container about-container">
        <div className="row">
          <Column
            title="Who are we?"
            text="We are a university startup company with a dedicated and enthusiastic team. Our journey started in 2022 as a little project, which developed into the final form of the currently-existing PackX. The original idea was to bring innovation to the delivery industry. We take full advantage of digitalization and automation to offer world-class delivery solutions to our customers."
          />
          <div className="col-md-7">
            <Image imgSrc="/assets/logos/pack_norm_black.svg" imgAlt="startup" className="about-img-right" />
          </div>
        </div>
      </div>
      <div className="container about-container">
        <div className="row">
          <div className="col-md-7">
            <Image imgSrc="/assets/images/undraw_in_no_time_-6-igu.svg" imgAlt="system" className="about-img-left" />
          </div>
          <Column
            title="How it works?"
            text="The core of the service is the idea of a package point. Senders use our package points after a quick registration on our website. The logistics department takes care of the rest. All goods go through our central warehouse. With our in-house developed check-in-out automated package system (Quick'n Go), unloading takes about 5 minutes after a carrier truck arrives. Within a quarter of an hour, the package is sorted into the correct truck for final transport."
          />
        </div>
      </div>
      <div className="container about-container">
        <div className="row">
          <Column
            title="Why PackX?"
            text="The PackX experience is unlike any other carrier could ever provide. Every item gets our 'Quick'n Go' sorting treatment, resulting in fast warehouse logistics processing and the quickest delivery possible. Our truck fleet is completely electric, further reducing the carbon footprint of our company."
          />
          <div className="col-md-7">
            <Image imgSrc="/assets/images/undraw_environment_iaus.svg" imgAlt="electric" className="about-img-right" />
          </div>
        </div>
      </div>
      <div className="about-person-container text-center">
        <h1 className="about-title">Designed and created by</h1>
        <div className="row justify-content-center about-logo-container">
          <Person
            imgSrc="/assets/people/karcsi.jpg"
            imgAlt="Szakály Károly"
            name="Szakály Károly"
            github="https://github.com/szkly"
            role="DevOps and Backend"
          />
          <Person
            imgSrc="/assets/people/artur.jpg"
            imgAlt="Friedrich Artúr"
            name="Friedrich Artúr"
            github="https://github.com/arturfriedrich"
            role="Frontend and UX Design"
          />
          <Person
            imgSrc="/assets/people/domi.jpg"
            imgAlt="Szilágyi Dominik"
            name="Szilágyi Dominik"
            github="https://github.com/dominikszilagyi"
            role="Backend"
          />
          <Person
            imgSrc="/assets/people/zsombi.jpg"
            imgAlt="Töreky Zsombor"
            name="Töreky Zsombor"
            github="https://github.com/tzsombi01"
            role="Backend"
          />
          <Person
            imgSrc="/assets/people/danci.jpg"
            imgAlt="Székely Dániel"
            name="Székely Dániel"
            github="https://github.com/MrHumanRebel"
            role="Frontend and UX Design"
          />
        </div>
        <SzeImage />
      </div>
    </main>
  );
};
