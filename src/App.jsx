import React, { useRef } from 'react'
import { gsap } from "gsap";
import { useGSAP } from '@gsap/react';
import flareImg from "./assets/flare.svg"


import './App.css'

function App() {
  const { useRef } = React;
  const container = useRef();

  gsap.registerPlugin(useGSAP);

  useGSAP(() => {

    const flareTimeline = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });
    flareTimeline.to(".heading img", { rotate: '360deg', duration: 2 });
    flareTimeline.to(".heading img", { rotate: '0deg', duration: 2 });


    flareTimeline.repeat();
    // gsap.fromTo(".heading", { opacity: 0 }, { opacity: 1, duration: 2 });
  },
    { scope: container }
  );

  return (
    <>
      <div className="container" ref={container}>
        <h1 className="heading">
          <span className="heading_txt">Coming Soon</span>
          <img src={flareImg} alt="" width={30} />
        </h1>

        <p className="sub-text">
          Something elegant, powerful, and designed <br />
          for creators is arriving shortly.
          
        </p>
      </div>
    </>
  )
}

export default App
