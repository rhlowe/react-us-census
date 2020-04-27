import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { objectifyArray } from "./utils/array2object";
import { fetchData } from "./utils/fetch";
import { sortObjects } from "./utils/sort";
import { States } from "./states";
import { Counties } from "./counties";
import "./index.css";

function App() {
  const [activeState, setActiveState] = useState("*");
  const [loadingState, setLoadingState] = useState('loading');
  const [stateData, setStateData] = useState([]);
  const [countyData, setCountyData] = useState([]);

  useEffect(() => {
    setLoadingState('loading');

    console.debug("activeState", activeState);
    if (activeState === "*" && stateData.length === 0) {
      fetchData(
        `https://api.census.gov/data/2019/pep/population?get=NAME,POP,DENSITY&for=state:*&DATE_CODE=1`
      ).then((data) => {
        const formattedData = sortObjects(objectifyArray(data), 'name');
        setStateData(formattedData);
        setLoadingState('settled');
      });
    } else if (activeState === "*" && stateData.length > 0) {
      setLoadingState('settled');
    }

    if (activeState !== '*') {
      fetchData(
        `https://api.census.gov/data/2019/pep/population?get=NAME,POP,DENSITY&for=county:*&in=state:${activeState}&DATE_CODE=1`
      ).then((data) => {
        const formattedData = sortObjects(objectifyArray(data), 'name');
        setCountyData(formattedData);
        setLoadingState('settled');
      });
    }
  }, [activeState, stateData.length]);

  const updateActiveState = (e, stateID) => {
    e.preventDefault();
    console.debug('updateActiveState', {e, stateID});
    setActiveState(stateID);
  };

  return (
    <>
      <header id="site-header" className="bg-light">React Census App</header>

      <main>
        {loadingState === 'loading' &&
          <p>Loading Data...</p>
        }

        {loadingState === 'settled' &&
          activeState === '*' &&
          <States
            states={stateData}
            updateActiveState={updateActiveState}
          />
        }

        {loadingState === 'settled' &&
          activeState !== '*' &&
          <Counties
            activeState={activeState}
            counties={countyData}
            states={stateData}
            updateActiveState={updateActiveState}
            />
        }
      </main>
    </>
  )
}

ReactDOM.render(<App />, document.querySelector("#root"));
