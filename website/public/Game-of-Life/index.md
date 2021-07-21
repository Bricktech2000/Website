## Intro

The _Game of Life_ is a cellular automaton that was created by the mathematician John Conway in 1970. It takes an initial state of cells, and through time steps and simple rules, it mutates the state of the cells in the grid. I had already programmed another version of the game of life in [my first website](../My-First-Website), but it was slow and inefficient.

## Demo

#demo

Here is a video of the program running on my phone, with a random starting state:

![video](ezgif-3-29a47e1a1c94.mp4)

If you wish to try it for yourself, you can [click here](./V4.html)! Draw cells by clicking or dragging your mouse or start from a random state, and click _Play_ to see the cells evolve!

## How it Works

This, as stated in the introduction, is a cellular automaton.

> A cellular automaton consists of a regular grid of cells, each in one of a finite number of states, such as on and off. The grid can be in any finite number of dimensions. For each cell, a set of cells called its neighborhood is defined relative to the specified cell. An initial state is selected by assigning a state for each cell. A new generation is created (advancing time by 1), according to some fixed rule (generally, a mathematical function).
>
> [Wikipedia](https://en.wikipedia.org/wiki/Cellular_automaton)

It consists of a 2D grid of cells which can be in one of two states: _alive_ or _dead_. In the program, the grid of cells is implemented by an `HTML canvas` for the best performance. By looking at the states of its _neighbors_ (a 3x3 square around a cell), it can modify its own state according to 4 simple rules. They are the following:
#rules

> - Any live cell with fewer than two live neighbours dies, as if by underpopulation.
> - Any live cell with two or three live neighbours lives on to the next generation.
> - Any live cell with more than three live neighbours dies, as if by overpopulation.
> - Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
>
> [Wikipedia](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life)

As you have seen in the video in the _Demo_ section, very complex behavior can emerge from these four very simple rules!

## Conclusion

I programmed and optimized this cellular automaton in a few hours, and it wasn't too hard to make it work due to the simplicity of the rules it uses. Despite that, I had a lot of fun making it and I am really pleased with the final result!
