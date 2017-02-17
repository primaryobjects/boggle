import React, { Component } from 'react';
import SnackBar from 'react-material-snackbar';
import GridControl from './controls/gridControl';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      board: [],
      alert: '',
      words: []
    };

    this.onGridChange = this.onGridChange.bind(this);
    this.onSolve = this.onSolve.bind(this);
  };

  onGridChange(state) {
    this.setState({ board: state.board });
  };

  onSolve() {
    var that = this;

    // Start web worker.
    var worker = new Worker('js/boggle/solveManagerWorker.js');
    worker.postMessage({ board: that.state.board });
    worker.onmessage = function(message) {
      if (message.data.status.indexOf('Solving') !== -1 || message.data.done) {
        that.setState({ alert: message.data.status, alertText: message.data.status });
      }
      else if (message.data.result) {
        var words = that.state.words;
        words.push(message.data.result);
        that.setState({ words: words });
      }
    }
  };

  render() {
    return (
      <div id="main-app">
        <div className="row">
          <div className="col s5 offset-s3">
            <GridControl onChange={this.onGridChange}></GridControl>
          </div>
          <div className="div-results col s3">
            <table className="word-results highlight">
              <thead>
                <tr>
                  <th>Word</th>
                  <th>Points</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.words.sort(function(a, b) { return b.score - a.score; }).map(function(word, i) {
                    return (
                      <tr key={i}>
                        <td>{word.word}</td>
                        <td>{word.score}</td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>          
        </div>
        <div className="row">
          <div className="col s5 offset-s3">
            <a className="waves-effect waves-light btn solve-btn" onClick={this.onSolve}><i className="material-icons fa fa-sort-alpha-asc right"></i>Solve</a>
          </div>
        </div>
        <SnackBar snackBarText={this.state.alert} timer={6000} show={this.state.alert ? true : false} />
      </div>
    );
  }
}

export default App;
