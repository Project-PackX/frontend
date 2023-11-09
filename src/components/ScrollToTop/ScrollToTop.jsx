import ScrollToTop from "react-scroll-to-top";
import "./scrolltotop.css";

export default function ScrollBackToTop() {
  return (
      <ScrollToTop 
        top='20'
        smooth
        color='var(--purple)' 
        width='20'
        height='20'
        viewBox='0 0 256 256'   
        className="scroll-btn"
      />
  );
}
