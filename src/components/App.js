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
      rows: 20,
      columns: 40
    };
    this.handlePlayButtonClick = this.handlePlayButtonClick.bind(this);
    this.handlePauseButtonClick = this.handlePauseButtonClick.bind(this);
    this.handleResetButtonClick = this.handleResetButtonClick.bind(this);
    this.handleClearButtonClick = this.handleClearButtonClick.bind(this);
    this.handleCellClick = this.handleCellClick.bind(this);
    this.handleSpeedChange = this.handleSpeedChange.bind(this);
    this.handleBoardSizeChange = this.handleBoardSizeChange.bind(this);
  }

  componentDidMount() {
    this.setState({cells: this.getNewCells(this.state.rows, this.state.columns)});
  }

  getNewCells(numberOfRows, numberOfColumns) {
    const cells = [];
    for (let row = 0; row < numberOfRows; row++) {
      const columns = [];
      for (let column = 0; column < numberOfColumns; column++) {
        const cell = this.getNewCell(row, column);
        columns.push(cell);
      }
      cells.push(columns);
    }
    return cells;
  }

  getNewCell(row, column) {
    return (
      <Cell
        key={row + '-' + column} 
        emoji={this.getRandomEmoji()} 
        alive={this.getRandomBoolean()} 
        onClick={() => this.handleCellClick(row, column)} 
      />
    );
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
          key={cell.key} 
          emoji={cell.props.emoji} 
          alive={!cell.props.alive} 
          onClick={cell.props.onClick}
        />);
      return {
        cells: cells
      };
    });
  }

  handlePlayButtonClick() {
    if (this.state.isPlaying) {
      return;
    }
    clearInterval(this.state.interval);
    const interval = setInterval(this.nextGeneration.bind(this), this.state.speed);
    this.setState({
      isPlaying: true,
      interval: interval
    });
  }

  nextGeneration() {
    this.setState(prevState => ({
      generation: prevState.generation + 1,
      cells: this.getNextGenerationOfCells(prevState.cells)
    }));
  }

  getNextGenerationOfCells(prevCells) {
    const cells = [];
    for (let row = 0; row < prevCells.length; row++) {
      const columns = [];
      for (let column = 0; column < prevCells[row].length; column++) {
        const cell = prevCells[row][column];
        columns.push(this.updateCell(row, column, cell, prevCells));
      }
      cells.push(columns);
    }
    return cells;
  }

  updateCell(row, column, cell, prevCells) {
    const aliveNeighbours = this.countAliveNeighbours(row, column, prevCells);
    const isAlive = aliveNeighbours === 3 || (cell.props.alive && aliveNeighbours === 2);
    return (
      <Cell
        key={cell.key} 
        emoji={cell.props.emoji} 
        alive={isAlive} 
        onClick={cell.props.onClick} 
      />
    );
  }

  countAliveNeighbours(row, column, prevCells) {
    let aliveNeighbours = 0; 
    if (prevCells[row - 1] && prevCells[row-1][column] && prevCells[row - 1][column].props.alive) {
      aliveNeighbours++;
    }
    if (prevCells[row - 1] && prevCells[row - 1][column + 1] && prevCells[row - 1][column + 1].props.alive) {
      aliveNeighbours++;
    }
    if (prevCells[row] && prevCells[row][column + 1] && prevCells[row][column + 1].props.alive) {
      aliveNeighbours++;
    }
    if (prevCells[row + 1] && prevCells[row + 1][column + 1] && prevCells[row + 1][column + 1].props.alive) {
      aliveNeighbours++;
    }
    if (prevCells[row + 1] && prevCells[row + 1][column] && prevCells[row + 1][column].props.alive) {
      aliveNeighbours++;
    }
    if (prevCells[row + 1] && prevCells[row + 1][column - 1] && prevCells[row + 1][column - 1].props.alive) {
      aliveNeighbours++;
    }
    if (prevCells[row] && prevCells[row][column - 1] && prevCells[row][column - 1].props.alive) {
      aliveNeighbours++;
    }
    if (prevCells[row - 1] && prevCells[row - 1][column - 1] && prevCells[row - 1][column - 1].props.alive) {
      aliveNeighbours++;
    }
    return aliveNeighbours;
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
    this.setState({
      generation: 0,
      isPlaying: false,
      cells: this.getNewCells(this.state.rows, this.state.columns)
    });
  }

  handleClearButtonClick() {
    clearInterval(this.state.interval);
    this.setState(prevState => ({
      generation: 0,
      isPlaying: false,
      cells: prevState.cells.map(row => {
        return row.map(cell => {
          return (
            <Cell
              key={cell.key} 
              emoji={cell.props.emoji} 
              alive={false} 
              onClick={cell.props.onClick} 
            />
          );
        });
      })
    }));
  }

  handleSpeedChange(speed) {
    this.setState({speed: speed});
    if (!this.state.isPlaying) {
      return;
    }
    clearInterval(this.state.interval);
    const interval = setInterval(this.nextGeneration.bind(this), speed);
    this.setState({
      isPlaying: true,
      interval: interval
    });
  }

  handleBoardSizeChange(rows, columns) {
    this.setState(prevState => ({
      generation: 0,
      cells: this.getNewCells(rows, columns),
      rows: rows,
      columns: columns
    }));
    if (!this.state.isPlaying) {
      return;
    }
    clearInterval(this.state.interval);
    const interval = setInterval(this.nextGeneration.bind(this), this.state.speed);
    this.setState({
      isPlaying: true,
      interval: interval
    });
  }

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
          rows={this.state.rows}
          columns={this.state.columns}
        />
      </div>
    );
  }
}

export default App;
