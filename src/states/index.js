import React from 'react'
import { formatNumber, formatFloat } from "../utils/math";
import './states.css';

export function States({ states, updateActiveState }) {
  return (
    <div className="states">
      <h1>US Population by State <small className="text-muted">as per the 2010 US Census</small></h1>

      <hr />

      <section>
        {states.map(state =>
          <article key={state.state}>
            <header>
              <h3>{state.name}</h3>
            </header>

            <ul>
              <li>Population: {formatNumber(state.pop)}</li>
              <li>Population Density: {formatFloat(state.density)}</li>
            </ul>

            <form onSubmit={e => updateActiveState(e, state.state)}>
              <button>View county data for {state.name} ▶</button>
            </form>
          </article>
        )}
      </section>
    </div>
  );
}