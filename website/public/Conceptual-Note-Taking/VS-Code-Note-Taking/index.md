## Preface

A few months ago, I started taking notes conceptually using [Notion](https://www.notion.so/product). Even though choosing conceptual note-taking was definitely the right way to go, I felt like Notion was holding me back somewhat. It did offer a lot of features, but it lacked the customization I was after.

Since I already had a lot of experience using VS Code, I decided to look around to see if any extensions were available to make the note-taking process easier. Let's put it this way:

> I'm not the first person to try to use VS Code to take notes conceptually.

## My Current Setup

After a few days of experimenting with different extensions, I decided to settle on the following setup, a mix of extensions, settings and key bindings.

- [Chart.js Markdown Preview](https://marketplace.visualstudio.com/items?itemName=FlomoN.chartjs-markdown-preview)
- [Chart.js Preview](https://marketplace.visualstudio.com/items?itemName=RandomFractalsInc.vscode-chartjs)
- [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)
- [File Utils](https://marketplace.visualstudio.com/items?itemName=sleistner.vscode-fileutils)
- [GitHub Markdown Preview](https://marketplace.visualstudio.com/items?itemName=bierner.github-markdown-preview)
- [Markdown Checkboxes](https://marketplace.visualstudio.com/items?itemName=bierner.markdown-checkbox)
- [Markdown Emoji](https://marketplace.visualstudio.com/items?itemName=bierner.markdown-emoji)
- [Markdown Footnotes](https://marketplace.visualstudio.com/items?itemName=bierner.markdown-footnotes)
- [Markdown Memo](https://marketplace.visualstudio.com/items?itemName=svsool.markdown-memo)
- [Markdown Preview Github Styling](https://marketplace.visualstudio.com/items?itemName=bierner.markdown-preview-github-styles)
- [Markdown Preview Mermaid Support](https://marketplace.visualstudio.com/items?itemName=bierner.markdown-mermaid)
- [Markdown yaml Preamble](https://marketplace.visualstudio.com/items?itemName=bierner.markdown-yaml-preamble)
- [md-graph](https://marketplace.visualstudio.com/items?itemName=ianjsikes.md-graph)

> **settings.json**

```js
  "vim.normalModeKeyBindingsNonRecursive": [
    // open link with gd
    {
      "before": ["g", "d"],
      "commands": ["editor.action.openLink"]
    },
    {
      "before": ["g", "p"],
      "commands": ["workbench.action.quickOpen"]
    },
    {
      "before": ["g", "r"],
      "commands": [
        "fileutils.removeFile",
        //focus current editor
        "workbench.action.openPreviousRecentlyUsedEditor",
        "workbench.action.openNextRecentlyUsedEditor"
      ]
    },
    { "before": ["g", "z"], "commands": ["workbench.action.toggleZenMode"] }
  ],
  "vim.visualModeKeyBindingsNonRecursive": [
    // Bind p in visual mode to paste without overriding the current register
    {
      "before": ["p"],
      "after": ["p", "g", "v", "y"]
    }
  ],

  "md-graph.autoStart": true,
  "MarkdownPaste.silence": true,
  "md-graph.graph.defaultMode": "FOCUS",
  "md-graph.graph.focusNeighborDepth": 2,
  "md-graph.showColumn": "active",
  "md-graph.openColumn": "three",
  "workbench.editor.enablePreview": false,
  "memo.links.rules": [
    {
      "rule": "",
      "folder": "$CURRENT_FILE_DIRECTORY"
    }
  ],
  "markdown.styles": [
    "https://use.fontawesome.com/releases/v5.7.1/css/all.css", // mermaid
    // https://www.dropboxforum.com/t5/Dropbox-files-folders/public-links-to-raw-files/td-p/110391
    // .github-markdown-body, .github-markdown-content { background-color: #000000; }
    // .github-markdown-body code { font-family: 'Fira Code'; }
    "https://dl.dropbox.com/s/4g49nwbn2w0pxoj/markdown.css?dl=0"
  ],
  "cSpell.allowCompoundWords": true,
  "cSpell.useGitignore": false,
  "cSpell.logLevel": "Information",
  "cSpell.ignoreWords": [
    "srcs",
    "extremum",
    "biconditional",
    "karnaugh",
    "hasselbalch",
    "println",
    "implicant",
    "implicants",
    "atreum",
    "bipyramid",
    "bipyramidal",
    "instanceof",
    "phosphite",
    "analyte"
  ],
  "cSpell.ignoreRegExpList": [
    "/\\\\[\\{\\}a-z]+/gi", // latex commands including { and }
    "/\\b[A-Z]{3,5}s?\\b/g" // acronyms including possible s
  ],
```

> **keybindings.json**

```js
[
  // navigation
  {
    key: 'down',
    command: 'workbench.action.closeActiveEditor',
    when: 'editorTextFocus',
  },
  {
    key: 'right',
    command: 'workbench.action.nextEditorInGroup',
    when: 'editorTextFocus',
  },
  {
    key: 'left',
    command: 'workbench.action.previousEditor',
    when: 'editorTextFocus',
  },
  {
    key: 'up',
    command: 'workbench.action.reopenClosedEditor',
    when: 'editorTextFocus',
  },
  {
    key: 'shift+left',
    command: 'workbench.action.moveEditorLeftInGroup',
    when: 'editorTextFocus',
  },
  {
    key: 'shift+right',
    command: 'workbench.action.moveEditorRightInGroup',
    when: 'editorTextFocus',
  },
];
```

## The Result

All of the above extensions and settings work together to make note-taking more efficient and more powerful. For instance, I can paste an image or a link straight from my clipboard and it will be inserted into the markdown document automatically. I can also use the `g` key to quickly navigate through files, with `gd` to open a note from its link, `gp` to search for a note, `gr` to delete a note, and so on.

The markdown preview on VS Code is also extended to support full `LaTeX`, `mermaid`, and `Chart.JS`. Below are some screenshots of it.
#img

|                                                                                                 |                                                                                                 |
| ----------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| ![markdown source code and preview side-by-side](VS-Code-Note-Taking/ksnip_20220322-211838.png) | ![markdown source code and preview side-by-side](VS-Code-Note-Taking/ksnip_20220322-211912.png) |

And, of course, a tree view is generated in real time through the [md-graph](https://marketplace.visualstudio.com/items?itemName=ianjsikes.md-graph) extension. In the screenshot below, each node is a note and each edge is a link between different notes. Clicking on a note in the tree view will open it in the editor, which is a good way to quickly navigate through notes.

#tree
![tree view of note system](VS-Code-Note-Taking/ksnip_20220322-212458.png)

If this screenshot doesn't manage to convert you to a conceptual note-taker, I don't know what will.

Joking aside, the post right below this one was written when I first discovered conceptual note-taking, and is a good place to get your feet wet. It goes over the advantages of conceptual note-taking and explains how to take notes more efficiently. Enjoy!
