import React, { Component } from 'react';
import '../styles/App.css';
import Cell from './Cell';

class App extends Component {
  state = {cells: this.getCells()};

  componentDidMount() {
    setInterval(() => {
      this.setState(prevState => ({
        cells: prevState.cells.map(cell => {
         return <Cell emoji={cell.props.emoji} alive={!cell.props.alive} key={cell.key} onClick={this.handleClick} />; 
        })
      }));
    }, 500);
  }

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
    const elems = [];
    for (let i = 1; i <= 2000; i++) {
      elems.push(<Cell key={i} emoji={this.randomSymbol()} 
      alive={this.randomBoolean()} onClick={this.handleClick} />);
    }
    return elems;
  }

  render() {
    return (
      <div className="App">
        {this.state.cells}
      </div>
    );
  }
}

export default App;
