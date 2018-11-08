import React, { Component } from 'react';
import ResultsPane from './ResultsPane';
import MapResults from './MapResults';
import * as SchoolsAPI from './SchoolsAPI';
import './App.css';

class App extends Component {

  state = {
    results: [],
    uniqueGradeRanges: [],
    selectedGradeRange: "all",
    dataUnavailable: false,
    mapsError: false
  }

  componentDidMount() {
    SchoolsAPI.getAllPublicElementary().then((results) => {
      const uniqueGradeRanges = [...new Set(results.map(result => result.gradeRange))].sort();
      this.setState({ results, uniqueGradeRanges });
    }).catch((error) => {
      this.setState({ dataUnavailable: true });
    });
  }
  
  componentWillMount() {
    this.setState({ mapsError: window.mapsError || !navigator.onLine });
  }
 
  onFilterChange = (selected) => {
    this.setState({ selectedGradeRange: selected });
  }

  changeResult = (result) => {
    this.setState((currentState) => ({
      results: currentState.results.map(res => ({ ...res, open: !result.open && res.name === result.name }))
    }));
  }

  render() {

    const filteredResults = this.state.results.filter((result) => {
      if (this.state.selectedGradeRange === "all") {
        return true;
      } else {
        return result.gradeRange === this.state.selectedGradeRange;
      }
    });

    return (
      <div className="app">
        <ResultsPane
          dataUnavailable={this.state.dataUnavailable}
          results={filteredResults}
          onChangeResult={this.changeResult}
          uniqueGradeRanges={this.state.uniqueGradeRanges}
          gradeRange={this.state.selectedGradeRange}
          onFilterChange={this.onFilterChange}
        />
        {!this.state.mapsError && <MapResults
          results={filteredResults}
          onChangeResult={this.changeResult}
        />}
        {this.state.mapsError && (
          <p className="error-message">Unable to connect to Google Maps</p>
        )}
      </div>
    );
  }
}

export default App;
