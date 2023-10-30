import React from "react";
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './customscroll.css';

function CustomScrollBar(props) {
  return (
    <PerfectScrollbar>
      {props.children}
    </PerfectScrollbar>
  );
}

export default CustomScrollBar;
