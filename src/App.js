import React, { useState, useEffect } from "react";

import NavBar from "./components/AppBar";
import MasterNodeCard from "./components/AUMCard";
import PieChart from "./components/PieChart";
import BarChart from "./components/BarChart";

import "./Cake.css";

function App() {
  /*
==============================================================================
To make the website mobile responsive we check the current size of the page
and adjust the elements on our page accordingly.
==============================================================================
*/

  const [isSmall, setIsSmall] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmall(window.innerWidth < 1000);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  /*
==============================================================================
In order to pass in the AUM values to the pie chart, we need to define
functions that are able to retrieve the API information from our AUM (masternode)
cards

we pass in those functions to the AUM cards, and set the state back in the
parent page (app.js) and pass in the AUM values as parameters in the piechart.
==============================================================================
*/

  const [dfiAUM, setDFIAUM] = useState(100);
  const [dashAUM, setDashAUM] = useState(100);
  const [ethAUM, setETHAUM] = useState(100);

  const handleDFIAUM = (AUM) => {
    setDFIAUM(AUM);
    console.log(AUM);
  };

  const handleDashAUM = (AUM) => {
    setDashAUM(AUM);
    console.log(AUM);
  };

  const handleETHAUM = (AUM) => {
    setETHAUM(AUM);
    console.log(AUM);
  };

  return (
    <div className="Cake">
      <NavBar />
      <div
        style={{
          display: "flex",
          flexDirection: isSmall ? "column" : "row",
          gap: isSmall ? 8 : 30,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div>
          <MasterNodeCard crypto={"dfi"} handleAUM={handleDFIAUM} />
        </div>
        <div>
          <MasterNodeCard crypto={"dash"} handleAUM={handleDashAUM} />
        </div>
        <div>
          <MasterNodeCard crypto={"eth"} handleAUM={handleETHAUM} />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: isSmall ? "column" : "row",
          justifyContent: "center",
          gap: isSmall ? 8 : 0,
          alignItems: "center",
        }}
      >
        <div style={{ width: isSmall ? 350 : 500 }}>
          <PieChart dfi={dfiAUM} dash={dashAUM} eth={ethAUM} />
        </div>
        <div style={{ width: isSmall ? 350 : 500 }}>
          <BarChart />
        </div>
      </div>
    </div>
  );
}

export default App;
