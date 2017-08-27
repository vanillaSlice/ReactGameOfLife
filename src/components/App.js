import React, { Component } from 'react';
import '../styles/App.css';
import MainControls from './MainControls'
import Board from './Board';
import Cell from './Cell';
import SpeedControls from './SpeedControls';
import BoardSizeControls from './BoardSizeControls';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      generation: 0,
      isPlaying: false,
      cells: [],
      speed: 500,
      boardWidth: 40,
      boardHeight: 20
    };
    this.handlePlayButtonClick = this.handlePlayButtonClick.bind(this);
    this.handlePauseButtonClick = this.handlePauseButtonClick.bind(this);
    this.handleResetButtonClick = this.handleResetButtonClick.bind(this);
    this.handleClearButtonClick = this.handleClearButtonClick.bind(this);
    this.handleCellClick = this.handleCellClick.bind(this);
    this.handleSpeedChange = this.handleSpeedChange.bind(this);
    this.handleBoardSizeChange = this.handleBoardSizeChange.bind(this);
  }

  //////

  componentDidMount() {
    this.setState({cells: this.getRandomCells()});
  }

  getRandomCells() {
    const cells = [];
    for (let row = 0; row < this.state.boardHeight; row++) {
      const columns = [];
      for (let column = 0; column < this.state.boardWidth; column++) {
        columns.push(
          <Cell
            key={row + '-' + column} 
            emoji={this.getRandomEmoji()} 
            alive={this.getRandomBoolean()} 
            onClick={() => this.handleCellClick(row, column)} 
          />
        );
      }
      cells.push(columns);
    }
    return cells;
  }

  getRandomEmoji() {
    return '&#' + (Math.floor(Math.random() * (128567 - 128513 + 1)) + 128513) + ';';
  }

  getRandomBoolean() {
    return Math.random() >= 0.5;
  }

  handleCellClick(row, column) {
    this.setState(prevState => {
      const cells = prevState.cells;
      const cell = cells[row][column];
      cells[row][column] = 
      (<Cell
        key={row + '-' + column} 
        emoji={cell.props.emoji} 
        alive={!cell.props.alive} 
        onClick={() => this.handleCellClick(row, column)} 
      />);
      return {
        cells: cells
      };
    });
  }

  handlePlayButtonClick() {
    if (this.state.isPlaying) return;
    clearInterval(this.state.interval);
    const interval = setInterval(() => {
      this.setState(prevState => ({
        cells: prevState.cells.map(row => {
          return row.map(cell => {
            return (
            <Cell
              key={cell.key} 
              emoji={cell.props.emoji} 
              alive={!cell.props.alive} 
              onClick={cell.props.onClick} 
            />);
          });
        }),
        interval: interval,
        isPlaying: true
      }));
    }, this.state.speed);
  }

  handlePauseButtonClick() {
    if (!this.state.isPlaying) {
      return;
    }
    clearInterval(this.state.interval);
    this.setState({isPlaying: false});
  }

  handleResetButtonClick() {
    clearInterval(this.state.interval);
    this.setState({isPlaying: false});
    this.setState({cells: this.getRandomCells()});
  }

  handleClearButtonClick() {
    this.setState(prevState => ({
      cells: prevState.cells.map(row => {
        return row.map(cell => {
          return <Cell alive={false} key={cell.key} onClick={this.handleClick} />; 
        });
      })
    }));
  }

  handleSpeedChange(speed) {
    this.setState(prevState => ({
      speed: speed
    }));
  }

  handleBoardSizeChange(boardWidth, boardHeight) {
    this.setState(prevState => ({
      boardWidth: boardWidth,
      boardHeight: boardHeight
    }));
  }

  //////

  render() {
    return (
      <div className="App">
        <h1 className="heading">
          Game <span role="img" aria-label="Smiling Face">&#128515;</span>f Life
        </h1>
        <span className="generation">Generation - {this.state.generation}</span>
        <MainControls 
          onPlayButtonClick={this.handlePlayButtonClick}
          onPauseButtonClick={this.handlePauseButtonClick}
          onResetButtonClick={this.handleResetButtonClick}
          onClearButtonClick={this.handleClearButtonClick}
        />
        <Board cells={this.state.cells} />
        <SpeedControls 
          onChange={this.handleSpeedChange}
          speed={this.state.speed}
        />
        <BoardSizeControls
          onChange={this.handleBoardSizeChange}
          boardWidth={this.state.boardWidth}
          boardHeight={this.state.boardHeight}
        />
      </div>
    );
  }
}

export default App;
