import React from 'react'
import { formatNumber, formatFloat } from "../utils/math";
import './counties.css';

export function Counties({ activeState, counties, states, updateActiveState }) {
  return (
    <>
      <h1>{states.find(state => state.state === activeState).name} Population by County <small className="text-muted">as per the 2010 US Census</small></h1>

      <hr />

      <form onSubmit={e => updateActiveState(e, "*")}>
        <button>◀ Return to all state data</button>
      </form>

      <article>
        <table>
          <thead>
            <tr>
              <th>County Name</th>
              <th>Population</th>
              <th>Pop. Density</th>
            </tr>
          </thead>
          <tbody>
            {counties.map(county => (
              <tr key={county.county}>
                <td>{ county.name }</td>
                <td>{ formatNumber(county.pop) }</td>
                <td>{ formatFloat(county.density) }</td>
              </tr>
            ))}
          </tbody>
        </table>
      </article>

      <form onSubmit={e => updateActiveState(e, "*")}>
        <button>◀ Return to all state data</button>
      </form>
    </>
  );
}