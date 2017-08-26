import React, { Component } from 'react';
import '../styles/App.css';
import Button from './Button';
import Cell from './Cell';

class App extends Component {
  state = {
    generation: 0,
    cells: this.getCells()
  };

  componentDidMount() {
    setInterval(() => {
      this.setState(prevState => ({
        generation: prevState.generation,
        cells: prevState.cells.map(row => {
          return row.map(cell => {
            return <Cell emoji={cell.props.emoji} alive={!cell.props.alive} key={cell.key} onClick={this.handleClick} />; 
          });
        })
      }));
    }, 500);
  }

  handlePlayButtonClick() {
    console.log("play button clicked");
  }

  handlePauseButtonClick() {
    console.log('pause button clicked');
  }

  handleResetButtonClick() {
    console.log('reset button clicked');
  }

  handleClearButtonClicked() {
    console.log('clear button clicked');
  }

//////

  handleClick(event) {
    console.log(event);
  }

  randomSymbol() {
    return '&#' + (Math.floor(Math.random() * (128567 - 128513 + 1)) + 128513) + ';';
  }

  randomBoolean() {
    return Math.random() > 0.49;
  }
  
  getCells() {
    const rows = [];
    for (let i = 1; i <= 20; i++) {
      const columns = [];
      for (let j = 0; j < 40; j++) {
        columns.push(<Cell key={j} emoji={this.randomSymbol()} 
        alive={this.randomBoolean()} onClick={this.handleClick} />);
      }
      rows.push(columns);
    }
    return rows;
  }

  getRows() {
    const rows = [];
    this.state.cells.forEach((row, i) => {
      rows.push((<div className="row">
        {row}
      </div>));
    });
    return rows;
  }

//////

  render() {
    return (
      <div className="App">
        <h1 className="heading">
          Game <span role="img" aria-label="Smiling Face">&#128515;</span>f Life
        </h1>
        <div className="controls">
          <span className="generation">Generation - {this.state.generation}</span>
          <Button text="Play" onClick={this.handlePlayButtonClick} />
          <Button text="Pause" onClick={this.handlePauseButtonClick} />
          <Button text="Reset" onClick={this.handleResetButtonClick} />
          <Button text="Clear" onClick={this.handleClearButtonClicked} />
        </div>
        
        <div className="board">
          {this.getRows()}
        </div>

        <div className="controls">
          <span>Speed</span>
          <Button text="Slow" />
          <Button text="Medium" />
          <Button text="Fast" />
          <Button text="Fastest" />
        </div>
        <div className="controls">
          <span>Board Size</span>
          <Button text="Size 1" />
          <Button text="Size 2" />
          <Button text="Size 3" />
        </div>
      </div>
    );
  }
}

export default App;

// class App extends Component {
//   state = {cells: this.getCells()};

//   componentDidMount() {
//     setInterval(() => {
//       this.setState(prevState => ({
//         cells: prevState.cells.map(row => {
//           return row.map(cell => {
//             return <Cell emoji={cell.props.emoji} alive={!cell.props.alive} key={cell.key} onClick={this.handleClick} />; 
//           });
//         })
//       }));
//     }, 500);
//   }

//   handleClick(event) {
//     console.log(event);
//   }

//   randomSymbol() {
//     return '&#' + (Math.floor(Math.random() * (128567 - 128513 + 1)) + 128513) + ';';
//   }

//   randomBoolean() {
//     return Math.random() > 0.49;
//   }
  
//   getCells() {
//     const rows = [];
//     for (let i = 1; i <= 10; i++) {
//       const columns = [];
//       for (let j = 0; j < 15; j++) {
//         columns.push(<Cell key={j} emoji={this.randomSymbol()} 
//         alive={this.randomBoolean()} onClick={this.handleClick} />);
//       }
//       rows.push(columns);
//     }
//     return rows;
//   }

//   getRows() {
//     const rows = [];
//     this.state.cells.forEach((row, i) => {
//       rows.push((<div className="row">
//         {row}
//       </div>));
//     });
//     return rows;
//   }

//   render() {
//     // board size
//     // generation
//     // links to wikipedia
//     return (
//       <div className="App">
//         <h1>Game 😀f Life</h1>
//         {this.getRows()}
//         <button className="btn btn-default">Play</button>
//         <button className="btn btn-default">Pause</button>
//         <button className="btn btn-default">Clear</button>
//         <button className="btn btn-default">Slow</button>
//         <button className="btn btn-default">Medium</button>
//         <button className="btn btn-default">Fast</button>
//         <button className="btn btn-default">Fastest</button>
//         <span>Generation: 0</span>
//       </div>
//     );
//   }
// }

// export default App;
