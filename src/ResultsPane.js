import React, { Component } from 'react';
import './App.css';

const sortByName = (first, second) => {
  return first.name < second.name ? -1 : (first.name > second.name ? 1 : 0);
}

class ResultsPane extends Component {
  render() {
    return (
      <div className="results-pane">
        <header>
          <h1>List of all San Francisco Schools</h1>
          <div className="filter-controls">
            <form aria-label="Filter the list of schools">
              <label htmlFor="select-grade-range">Filter by Grade</label>
              <select id="select-grade-range" value={this.props.gradeRange} onChange={(event) => this.props.onFilterChange(event.target.value)}>
                <option value="all">All</option>
                {this.props.uniqueGradeRanges.map((gradeRange) => {
                  return (
                    <option key={gradeRange} value={gradeRange}>{gradeRange}</option>
                  )
                })}
              </select>
            </form>
          </div>
        </header>
        <main aria-label="List of schools matching the selected grade range. Clicking one will open it on the map.">
          <div className="results-container">
            {!this.props.dataUnavailable && (
              <div className="results-list">
                {this.props.results.sort(sortByName).map((result) => {
                  return (
                    <button key={result.id}
                      className={result.open ? "result-item opened" : "result-item"}
                      onClick={() => this.props.onChangeResult(result)}>
                      <h2 className="result-name">{result.name}</h2>
                      <p className="result-details">{result.gradeRange}, District {result.district}</p>
                    </button>
                  )
                })}
              </div>
            )}
            {this.props.dataUnavailable && (
              <p className="error-message">Server Error!</p>
            )}
          </div>
        </main>
        <footer>Data of schools from <a target="_blank" rel="noopener noreferrer" href="https://datasf.org/opendata/">DataSF</a></footer>
      </div>
    );
  }
}

export default ResultsPane;