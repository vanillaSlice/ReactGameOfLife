# React Game of Life

Game of Life is a cellular automaton devised by mathematician John Conway.

In the game there exists a grid of cells, each of which can be in one of two states, *alive* or *dead*.
Every cell has eight neighbours which it interacts with (the adjacent cells). After each step in the game, the following rules apply:

1. Any live cell with fewer than two live neighbours dies, i.e. under population
2. Any live cell with two or three live neighbours lives on to the next generation
3. Any live cell with more than three live neighbours dies, i.e. overpopulation
4. Any dead cell with exactly three live neighbours becomes a live cell, i.e. reproduction

See [Wikipedia](https://en.wikipedia.org/wiki/Conway's_Game_of_Life) for more information on The Game of Life.

This implementation is built using React. A working version can be viewed [here](https://vanillaslice.github.io/ReactGameOfLife/).

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Installing dependencies
```
yarn install
```

## Running locally
```
yarn start
```

## Run tests
```
yarn test
```
