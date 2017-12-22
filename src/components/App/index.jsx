import React, { Component } from 'react';

import MainControls from '../MainControls';
import Board from '../Board';
import Cell from '../Cell';
import SpeedControls from '../SpeedControls';
import BoardSizeControls from '../BoardSizeControls';

import './index.css';

function getRandomEmoji() {
  return `&#${(Math.floor(Math.random() * (128567 - 128514)) + 128513)};`;
}

function getRandomBoolean() {
  return Math.random() >= 0.5;
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isPlaying: false,
      generation: 0,
      cells: [],
      speed: 500,
      rows: 20,
      columns: 40,
    };

    this.getNewCells = this.getNewCells.bind(this);
    this.getNewCell = this.getNewCell.bind(this);
    this.handleCellClick = this.handleCellClick.bind(this);
    this.handlePlayButtonClick = this.handlePlayButtonClick.bind(this);
    this.nextGeneration = this.nextGeneration.bind(this);
    this.getNextGenerationOfCells = this.getNextGenerationOfCells.bind(this);
    this.countAliveNeighbours = this.countAliveNeighbours.bind(this);
    this.handlePauseButtonClick = this.handlePauseButtonClick.bind(this);
    this.handleResetButtonClick = this.handleResetButtonClick.bind(this);
    this.handleClearButtonClick = this.handleClearButtonClick.bind(this);
    this.handleSpeedChange = this.handleSpeedChange.bind(this);
    this.handleBoardSizeChange = this.handleBoardSizeChange.bind(this);
  }

  componentWillMount() {
    this.setState({
      cells: this.getNewCells(this.state.rows, this.state.columns),
    });
  }

  getNewCells(rows, columns) {
    const cells = [];

    for (let rowIndex = 0; rowIndex < rows; rowIndex += 1) {
      const row = [];

      for (let columnIndex = 0; columnIndex < columns; columnIndex += 1) {
        const cell = this.getNewCell(rowIndex, columnIndex);
        row.push(cell);
      }

      cells.push(row);
    }

    return cells;
  }

  getNewCell(rowIndex, columnIndex) {
    return (
      <Cell
        key={`${rowIndex}-${columnIndex}`}
        emoji={getRandomEmoji()}
        alive={getRandomBoolean()}
        onClick={() => this.handleCellClick(rowIndex, columnIndex)}
      />
    );
  }

  handleCellClick(rowIndex, columnIndex) {
    this.setState(prevState => {
      const cells = prevState.cells;
      const cell = cells[rowIndex][columnIndex];
      const updatedCell = (
        <Cell
          key={cell.key} 
          emoji={cell.props.emoji} 
          alive={!cell.props.alive} 
          onClick={cell.props.onClick}
        />
      );

      cells[rowIndex][columnIndex] = updatedCell;

      return { cells };
    });
  }

  handlePlayButtonClick() {
    if (this.state.isPlaying) {
      return;
    }

    clearInterval(this.state.interval);
    const interval = setInterval(this.nextGeneration, this.state.speed);
    this.setState({
      isPlaying: true,
      interval,
    });
  }

  nextGeneration() {
    this.setState(prevState => ({
      generation: prevState.generation + 1,
      cells: this.getNextGenerationOfCells(prevState),
    }));
  }

  getNextGenerationOfCells(prevState) {
    return prevState.cells.map((row, rowIndex) =>
      row.map((cell, columnIndex) =>
        this.getCellInNextGeneration(rowIndex, columnIndex, cell, prevState)));
  }

  getCellInNextGeneration(rowIndex, columnIndex, cell, prevState) {
    const aliveNeighbours = this.countAliveNeighbours(rowIndex, columnIndex, prevState);
    const alive = (cell.props.alive && aliveNeighbours === 2) || aliveNeighbours === 3;

    return (
      <Cell
        key={cell.key}
        emoji={cell.props.emoji}
        alive={alive}
        onClick={cell.props.onClick}
      />
    );
  }

  countAliveNeighbours(rowIndex, columnIndex, prevState) {
    const cells = prevState.cells;
    const numberOfRows = prevState.rows;
    const numberOfColumns = prevState.columns;
    // wrap around indices eg in 5x5 board (-1,-1) would become (4,4)
    const north = (rowIndex - 1 + numberOfRows) % numberOfRows;
    const east = (columnIndex + 1 + numberOfColumns) % numberOfColumns;
    const south = (rowIndex + 1 + numberOfRows) % numberOfRows;
    const west = (columnIndex - 1 + numberOfColumns) % numberOfColumns;

    let aliveNeighbours = 0;

    if (cells[north][columnIndex].props.alive) {
      aliveNeighbours++;
    }
    if (cells[north][east].props.alive) {
      aliveNeighbours++;
    }
    if (cells[rowIndex][east].props.alive) {
      aliveNeighbours++;
    }
    if (cells[south][east].props.alive) {
      aliveNeighbours++;
    }
    if (cells[south][columnIndex].props.alive) {
      aliveNeighbours++;
    }
    if (cells[south][west].props.alive) {
      aliveNeighbours++;
    }
    if (cells[rowIndex][west].props.alive) {
      aliveNeighbours++;
    }
    if (cells[north][west].props.alive) {
      aliveNeighbours++;
    }

    return aliveNeighbours;
  }

  handlePauseButtonClick() {
    if (!this.state.isPlaying) {
      return;
    }

    clearInterval(this.state.interval);
    this.setState({ isPlaying: false });
  }

  handleResetButtonClick() {
    clearInterval(this.state.interval);
    this.setState({
      isPlaying: false,
      generation: 0,
      cells: this.getNewCells(this.state.rows, this.state.columns),
    });
  }

  handleClearButtonClick() {
    clearInterval(this.state.interval);
    this.setState(prevState => {
      const updatedCells = prevState.cells.map(row => {
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
      });

      return {
        generation: 0,
        isPlaying: false,
        cells: updatedCells,
      };
    });
  }

  handleSpeedChange(speed) {
    this.setState({ speed });

    if (!this.state.isPlaying) {
      return;
    }

    clearInterval(this.state.interval);
    const interval = setInterval(this.nextGeneration, speed);
    this.setState({
      isPlaying: true,
      interval,
    });
  }

  handleBoardSizeChange(rows, columns) {
    this.setState({
      generation: 0,
      cells: this.getNewCells(rows, columns),
      rows,
      columns,
    });

    if (!this.state.isPlaying) {
      return;
    }

    clearInterval(this.state.interval);
    const interval = setInterval(this.nextGeneration, this.state.speed);
    this.setState({
      isPlaying: true,
      interval,
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
