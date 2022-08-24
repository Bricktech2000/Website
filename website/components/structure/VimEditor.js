import React, { Component, useRef, useEffect } from 'react';

import styles from './VimEditor.module.css';

const VimEditor = () => {
  const width = 50;
  const height = 12;
  const editorRef = useRef(null);

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const generate_grid = (content, mode) => {
    const grid = new Array(height)
      .fill(null)
      .map(() => new Array(width).fill(' '));

    var cursor = [0, 0];
    const type = (text) => {
      const type_char = (char) => {
        if (char == '\n') cursor = [0, ++cursor[1]];
        else grid[cursor[1]][cursor[0]++] = char;
      };
      text.split('').map(type_char);
    };

    type(content);
    const position = `${cursor[1] + 1},${cursor[0] + 1}`;

    var x = cursor[0];
    if (mode != 'insert') x = Math.max(0, x - 1);
    grid[cursor[1]][x] += 'CURSOR';
    if (mode == 'visual line') grid[cursor[1]][x] += 'VISUAL_LINE';
    type('\n');

    type('~\n'.repeat(height - cursor[1] - 1));

    const mode2 = mode == 'normal' ? '' : `-- ${mode.toUpperCase()} --`;
    const status = ' '.repeat(5) + 'All';
    type(mode2);
    type(' '.repeat(width - mode2.length - position.length - status.length));
    type(position);
    type(status);

    return grid;
  };

  const highlight = (text) =>
    `\n${text}`
      .replace(/\n# (CURSOR)?/g, '\n<u>#</u> $1')
      .replace(/\*(.*?)\*(CURSOR)?/g, '<u>*</u><b>$1</b><u>*$2</u>')
      .replace(/(.)CURSOR/g, '<span>$1</span>')
      .replace(/(.*)VISUAL_LINE(.?)/g, '<div>$1$2</div>')
      .slice(1);

  const set_editor_content = async (content, mode) => {
    if (editorRef.current == null) return;

    // dangerouslySetInnerHTML
    editorRef.current.innerHTML = highlight(
      // use tabs for delays in type_out
      generate_grid(content.replaceAll('\t', ''), mode)
        .map((row) => row.join(''))
        .join('\n')
    );
  };

  useEffect(() => {
    var mounted = true;

    (async () => {
      set_editor_content('', 'normal');
      await sleep(2000);
      set_editor_content('', 'insert');
      await sleep(1000);

      const type_out = async (header, content) => {
        for (var i = 0; i < content.length; i++) {
          await sleep(50);
          set_editor_content(header + content.slice(0, i + 1), 'insert');
        }
      };

      const header = '# \tWhat I Do\t\t\n\t\t\n';
      const contents = [
        '*\t\t\t\t\tpro\t\tgram\tming\t\t*',
        '*\telectronics\t\t\t\t*',
        '*\tengine\ter\ting\t\t*',
      ];
      await type_out('', header);
      await sleep(1000);
      while (mounted) {
        for (var content of contents) {
          await sleep(250);
          await type_out(header, content);
          await sleep(250);
          await set_editor_content(header + content, 'normal');
          await sleep(1500);
          await set_editor_content(header + content, 'visual line');
          await sleep(250);
          await set_editor_content(header, 'insert');
        }
        await set_editor_content(header, 'normal');
        await sleep(1500);
        await set_editor_content(header, 'insert');
      }
    })();

    return () => {
      mounted = false;
    };
  }, [editorRef.current]);

  return <div className={styles.VimEditor} ref={editorRef} />;
};

export default VimEditor;
