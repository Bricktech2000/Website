import React, { Component, useRef, useEffect } from 'react';
import useOnScreen from '../hooks/useOnScreen';

import styles from './GameOfLife.module.css';

var isOnScreen = false;

// https://stackoverflow.com/questions/57530728/react-canvas-with-ref-omitting-calling-ref-current-and-ctx
const useCanvas = (callback) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    callback([canvas, ctx]);
  }, []);

  return canvasRef;
};

const GameOfLife = (props) => {
  const gridSize = props.size;
  var grid;

  const canvasRef = useCanvas(([canvas, ctx]) => {
    const style = getComputedStyle(document.documentElement);
    ctx.fillStyle = style.getPropertyValue('--bg-l');
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    class Cell {
      constructor() {}
      init = (x, y, s, neighbours) => {
        this.x = x;
        this.y = y;
        this.s = s;
        this.alive = 0;
        this.nextAlive = (Math.random() < 1 / 8) * 2;
        this.neighbours = neighbours;
      };

      update = () => {
        const states = 2;
        // https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life#Variations
        const count =
          this.neighbours.reduce((acc, n) => acc + (n.alive == states), 0) -
          (this.alive == states);
        // https://spicyyoghurt.com/tutorials/javascript/conways-game-of-life-canvas
        if (count == 2) this.nextAlive = (this.alive == states) * states;
        else if (count == 3) this.nextAlive = states;
        else this.nextAlive = Math.max(0, this.alive - 1);
      };

      draw = () => {
        if (this.alive != this.nextAlive) {
          ctx.fillStyle = style.getPropertyValue(
            ['--bg-l', '--color-d', '--color-l'][this.nextAlive]
          );
          ctx.fillRect(this.x, this.y, this.s, this.s);
        }
        this.alive = this.nextAlive;
      };
    }

    grid = new Array(gridSize)
      .fill(null)
      .map(() => new Array(gridSize).fill(null).map(() => new Cell()));

    for (var x = 0; x < gridSize; x++) {
      for (var y = 0; y < gridSize; y++) {
        var neighbours = [];
        for (var dx = -1; dx <= 1; dx++)
          for (var dy = -1; dy <= 1; dy++)
            neighbours.push(
              grid[(x + dx + gridSize) % gridSize][
                (y + dy + gridSize) % gridSize
              ]
            );

        grid[x][y].init(x, y, 1, neighbours);
      }
    }
  });

  isOnScreen = useOnScreen(canvasRef);

  const draw = () => {
    if (!isOnScreen) return;

    grid.forEach((row) => row.forEach((cell) => cell.draw()));
    grid.forEach((row) => row.forEach((cell) => cell.update()));
  };

  useEffect(() => {
    const interval = setInterval(draw, 1000 / 20);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <canvas
      width={gridSize}
      height={gridSize}
      className={styles.GameOfLife}
      ref={canvasRef}
    ></canvas>
  );
};

export default GameOfLife;
