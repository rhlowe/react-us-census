import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { objectifyArray } from "./utils/array2object";
import { fetchData } from "./utils/fetch";
import { sortObjects } from "./utils/sort";
import { formatNumber, formatFloat } from "./utils/math";

function App() {
  const [activeState, setActiveState] = useState("*");
  const [loadingState, setLoadingState] = useState('loading');
  const [stateData, setStateData] = useState([]);

  useEffect(() => {
    console.debug("activeState", activeState);
    if (activeState === "*") {
      fetchData(
        `https://api.census.gov/data/2019/pep/population?get=NAME,POP,DENSITY&for=state:${activeState}&DATE_CODE=1`
      ).then((data) => {
        const formattedData = sortObjects(objectifyArray(data), 'name');
        setStateData(formattedData);
        setLoadingState('settled');
      });
    }
  }, [activeState]);

  const updateActiveState = (e, stateID) => {
    e.preventDefault();
    console.debug('updateActiveState', {e, stateID});
    setActiveState(stateID);
  };

  return (
    <>
      <h1>Hi, {activeState}</h1>
      {loadingState === 'loading' &&
        <p>Loading Data...</p>
      }

      {loadingState === 'settled' &&
        activeState === '*' &&
        <>
          {stateData.map(state =>
            <article key={state.state}>
              <header>
                <h2>{state.name}</h2>
              </header>

              <ul>
                <li>Population: {formatNumber(state.pop)}</li>
                <li>Population Density: {formatFloat(state.density)}</li>
              </ul>

              <form onSubmit={e => updateActiveState(e, state.state)}>
                <button>View county data for {state.name}</button>
              </form>
            </article>
          )}
        </>
      }

{loadingState === 'settled' &&
        activeState !== '*' &&
        <>
          <article>
            <header>
              <h2>OH!</h2>
              <form onSubmit={e => updateActiveState(e, "*")}>
                <button>◀ Return to all state data</button>
              </form>
            </header>
          </article>
        </>
      }

      {loadingState === 'settled' &&
        <pre>{JSON.stringify(stateData, null, 2)}</pre>
      }
    </>
  );
}

ReactDOM.render(<App />, document.querySelector("#root"));
