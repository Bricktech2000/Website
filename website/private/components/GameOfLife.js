import React, { Component, useRef, useEffect } from 'react';

import styles from './GameOfLife.module.css';

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
    class Cell {
      constructor() {}
      init = (x, y, s, neighbours) => {
        this.x = x;
        this.y = y;
        this.s = s;
        this.alive = Math.random() > 0.5;
        this.lastActive = false;
        this.neighbours = neighbours;
      };
      update = () => {
        const neighbourCount =
          this.neighbours.reduce((acc, neighbour) => acc + neighbour.alive, 0) -
          this.alive;
        // https://spicyyoghurt.com/tutorials/javascript/conways-game-of-life-canvas
        if (neighbourCount == 2) this.nextAlive = this.alive;
        else if (neighbourCount == 3) this.nextAlive = true;
        else this.nextAlive = false;
      };
      draw = () => {
        const style = getComputedStyle(document.documentElement);
        if (this.alive != this.nextAlive) {
          ctx.fillStyle = this.nextAlive
            ? style.getPropertyValue('--color')
            : style.getPropertyValue('--black');
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

  const draw = () => {
    grid.forEach((row) => row.forEach((cell) => cell.update()));
    grid.forEach((row) => row.forEach((cell) => cell.draw()));
  };
  useEffect(() => {
    const interval = setInterval(draw, 1000 / 20);
    // draw();
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
