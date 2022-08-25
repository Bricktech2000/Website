import React, { Component, useEffect, useRef } from 'react';
import useOnScreen from '../../hooks/useOnScreen';

import styles from './SkillsGraph.module.css';

// TODO: use `useCanvas` hook, see GameOfLife

var isOnScreen = false;

const SkillsGraph = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  isOnScreen = process.browser && useOnScreen(containerRef);

  useEffect(() => {
    const resizeHandler = () => {
      if (canvasRef.current === null) return;

      canvasRef.current.width = containerRef.current.clientWidth * 2;
      canvasRef.current.height = containerRef.current.clientHeight * 2;
    };
    const listener = window.addEventListener('resize', resizeHandler);
    resizeHandler();

    return () => {
      window.removeEventListener('resize', listener);
    };
  }, []);

  const centerForce = 0.025;
  const repelForce = 0.00004;
  const linkForce = 0.25;
  const dragForce = 0.25;
  const linkDistance = 0.05;

  useEffect(() => {
    var links = {
      // Skills: ['Software', 'Hardware', 'Design'],
      Software: [
        'Development Tools',
        'Other Technologies',
        'Programming Languages',
        'Frameworks',
        'Other',
        'Hardware',
      ],
      'Programming Languages': ['C++', 'Rust', 'JavaScript', 'Python'],
      Frameworks: ['React', 'Express.js', 'Node.js', 'Next.js'],
      'Development Tools': ['Linux', 'Git', 'GitHub', 'VS Code', 'Vim'],
      'Other Technologies': [
        'LaTeX',
        'Assembly',
        'CSS',
        'Arduino',
        'YAML',
        'HTML',
        'C',
        'Raspberry Pi',
        'JSON',
        'Markdown',
      ],
      Hardware: [
        'Electronics',
        '3D Printing',
        'Raspberry Pi',
        'Arduino',
        '3D Design',
        'Robotics',
        // 'Fusion 360',
        // 'Cura',
        // 'Figma',
        'Other',
        'Software',
      ],
      Other: [
        'Artificial Intelligence',
        'UI Design',
        'Security',
        'Drone',
        'RC',
        'Security',
        'Electronics',
        'Robotics',
        'Software',
        'Hardware',
      ],
    };
    var highlighted = [
      'Development Tools',
      'Other Technologies',
      'Programming Languages',
      'Frameworks',
      'Software',
      'Hardware',
      'Other',
    ];
    var bolded = [
      'Software',
      'Hardware',
      'Other',
      //
    ];

    const ctx = canvasRef.current.getContext('2d');
    const em = parseFloat(getComputedStyle(canvasRef.current).fontSize);
    const gravity = (d) => 1 / d;
    const dampen = (d) => Math.pow(d, 3);

    var nodes = {};
    const randomNode = (text) => {
      return {
        x: Math.random(),
        y: Math.random(),
        vx: 0,
        vy: 0,
        text: text,

        highlighted: highlighted.includes(text),
        bolded: bolded.includes(text),
      };
    };

    for (var name in links) {
      nodes[name] = randomNode(name);
      for (var child of links[name]) {
        nodes[child] = randomNode(child);
        if (!links[child]) links[child] = [];
        links[child].push(name);
      }
    }

    const draw = () => {
      if (canvasRef.current === null) return;
      if (!isOnScreen) return requestAnimationFrame(draw);

      const width = canvasRef.current.width;
      const height = canvasRef.current.height;
      const xToCoord = (x) => x * width;
      const yToCoord = (y) => y * height;
      const size = (px) => px * em;

      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

      // https://stackoverflow.com/questions/39294065/vertical-alignment-of-canvas-text
      ctx.lineWidth = size(0.125);
      ctx.textAlign = 'center';
      ctx.textBaseLine = 'middle';

      // update
      for (var node of Object.values(nodes)) {
        // center force
        var dvx = 0;
        var dvy = 0;
        dvx -= dampen(node.x - 0.5) * centerForce;
        dvy -= dampen(node.y - 0.5) * centerForce;

        // repel force
        var dx = 0;
        var dy = 0;
        for (var other of Object.values(nodes)) {
          if (other === node) continue;
          // if (links[node.text].includes(other.text)) continue;
          // if (links[other.text].includes(node.text)) continue;
          const x = node.x - other.x;
          const y = node.y - other.y;
          const distance = Math.hypot(x, y);
          const angle = Math.atan2(y, x);

          dx += Math.cos(angle) * gravity(distance);
          dy += Math.sin(angle) * gravity(distance);
        }
        dvx += dx * repelForce;
        dvy += dy * repelForce;

        // link force
        var dx = 0;
        var dy = 0;
        for (var other of Object.values(links[node.text])) {
          other = nodes[other];
          if (other === node) continue;
          const x = node.x - other.x;
          const y = node.y - other.y;
          const distance = Math.hypot(x, y);
          const angle = Math.atan2(y, x);

          const deltaDistance = distance - linkDistance;
          dx += Math.cos(angle) * dampen(deltaDistance);
          dy += Math.sin(angle) * dampen(deltaDistance);
        }
        dvx -= dx * linkForce;
        dvy -= dy * linkForce;

        // drag force
        node.vx *= 1 - dragForce;
        node.vy *= 1 - dragForce;

        node.vx += dvx;
        node.vy += dvy;
        node.x += node.vx;
        node.y += node.vy;
      }

      const setColors = (highlighted, bolded) => {
        if (bolded) {
          ctx.font = 'bold calc(min(2em, 5vw, 5vh) * 1.25) sans-serif';
        } else {
          ctx.font = 'min(2em, 5vw, 5vh) sans-serif';
        }

        if (highlighted) {
          ctx.fillStyle = '#fff';
          ctx.strokeStyle = '#aaa';
        } else {
          ctx.fillStyle = '#888';
          ctx.strokeStyle = '#444';
        }
      };

      // draw edges
      for (var node of Object.values(nodes)) {
        if (links[node.text] !== undefined) {
          for (var child of links[node.text]) {
            setColors(
              node.highlighted && nodes[child].highlighted,
              node.bolded
            );

            ctx.beginPath();
            ctx.moveTo(xToCoord(node.x), yToCoord(node.y));
            ctx.lineTo(xToCoord(nodes[child].x), yToCoord(nodes[child].y));
            ctx.stroke();
          }
        }
        ctx.closePath();
      }

      // draw nodes
      for (var node of Object.values(nodes)) {
        setColors(node.highlighted, node.bolded);

        ctx.beginPath();
        ctx.arc(xToCoord(node.x), yToCoord(node.y), size(0.5), 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
      }

      // draw text
      for (var node of Object.values(nodes)) {
        setColors(node.highlighted, node.bolded);

        ctx.beginPath();
        ctx.fillText(
          node.text,
          xToCoord(node.x),
          yToCoord(node.y) - size(1.25)
        );
        ctx.closePath();
      }

      requestAnimationFrame(draw);
    };

    draw();
  }, []);

  return (
    <div className={styles.SkillsGraph} ref={containerRef}>
      <canvas width="1000" height="1000" ref={canvasRef} />
    </div>
  );
};

export default SkillsGraph;
