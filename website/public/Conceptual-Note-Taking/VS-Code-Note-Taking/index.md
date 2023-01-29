> **This post is outdated**
>
> Since writing this post, I have switched to using Neovim for note-taking. This post was preserved nonetheless.

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
- [Markdown PDF](https://marketplace.visualstudio.com/items?itemName=yzane.markdown-pdf)

> settings.json

```jsx
  //

  //

  // --------------------
  //     VIM BINDINGS
  // --------------------

  "editor.lineNumbers": "relative",

  "vim.normalModeKeyBindingsNonRecursive": [
    {
      "before": ["g", "d"],
      "commands": ["editor.action.openLink", "editor.action.revealDefinition"]
    }
  ],
  "vim.visualModeKeyBindingsNonRecursive": [
    // Bind p in visual mode to paste without overriding the current register
    // -- VS Code Vim extension
    {
      "before": ["p"],
      "after": ["p", "g", "v", "y"]
    }
  ],

  //

  //

  // --------------------
  //    NOTE-TAKING
  // --------------------

  "md-graph.autoStart": false,
  "MarkdownPaste.silence": true,
  "MarkdownPaste.rules": [
    {
      "regex": "^(?:https?://)?(?:(?:(?:www\\.?)?youtube\\.com(?:/(?:(?:watch\\?.*?v=([^&\\s]+).*)|))?))",
      "options": "g",
      "replace": "[![](https://img.youtube.com/vi/$1/0.jpg)](https://www.youtube.com/watch?v=$1)"
    },
    {
      "regex": "^(https?://.*)",
      "options": "ig",
      "replace": "<$1>"
    }
  ],
  "md-graph.graph.defaultMode": "FOCUS",
  "md-graph.graph.focusNeighborDepth": 2,
  "md-graph.graph.fadeDepth": 1,
  "md-graph.showColumn": "active",
  "workbench.editor.enablePreview": false,
  "memo.links.rules": [
    {
      "rule": "",
      "folder": "$CURRENT_FILE_DIRECTORY"
    }
  ],
  "markdown.styles": [
    // "https://use.fontawesome.com/releases/v5.7.1/css/all.css", // mermaid
    // https://www.dropboxforum.com/t5/Dropbox-files-folders/public-links-to-raw-files/td-p/110391
    // .github-markdown-body, .github-markdown-content { background-color: #000000; }
    // .github-markdown-body code { font-family: 'Fira Code'; }
    "https://dl.dropbox.com/s/4g49nwbn2w0pxoj/markdown.css?dl=0"
  ],
  "markdown.preview.linkify": false,
  "markdown.preview.openMarkdownLinks": "inEditor",
  "markdown-pdf.styles": [
    // https://latex.vercel.app/
    // https://github.com/yzane/vscode-markdown-pdf/issues/21
    // https://www.mathjax.org/cdn-shutting-down/
    // http://docs.mathjax.org/en/v3.2-latest/web/configuration.html
    // https://docs.mathjax.org/en/latest/web/components/index.html#web-components
    // https://stackoverflow.com/questions/1664049/can-i-force-a-page-break-in-html-printing
    // https://stackoverflow.com/questions/22601053/pagebreak-in-markdown-while-creating-pdf
    // https://stackoverflow.com/questions/14051715/markdown-native-text-alignment
    // https://stackoverflow.com/questions/21316313/how-can-i-indent-all-text-in-a-paragraph-except-the-first-line
    // https://gist.github.com/jonikarppinen/47dc8c1d7ab7e911f4c9
    "https://latex.vercel.app/style.css"
  ],

  "markdown-pdf.margin.left": "0",
  "markdown-pdf.margin.right": "0",
  "markdown-pdf.margin.top": "0",
  "markdown-pdf.margin.bottom": "0",
  "markdown-pdf.includeDefaultStyles": false,
  "markdown-pdf.headerTemplate": "&nbsp;",
  "markdown-pdf.footerTemplate": "&nbsp;",

  //

  //

  // --------------------
  //  FORMATTERS LINTERS
  // --------------------

  "cSpell.allowCompoundWords": true,
  "cSpell.useGitignore": false,
  "cSpell.logLevel": "Information",
  "cSpell.userWords": [
    // ...
  ],
  "cSpell.ignoreRegExpList": [
    "/\\\\[\\{\\}a-z]+/gi", // latex commands including { and }
    "/\\b[A-Z]{3,5}s?\\b/g" // acronyms including possible s
  ],

```

> keybindings.json

```jsx
  // navigation
  {
    "key": "alt+u",
    "command": "workbench.action.closeActiveEditor",
    "when": "editorTextFocus || editorIsOpen"
  },
  {
    "key": "alt+o",
    "command": "workbench.action.nextEditorInGroup",
    "when": "editorTextFocus || editorIsOpen"
  },
  {
    "key": "alt+y",
    "command": "workbench.action.previousEditor",
    "when": "editorTextFocus || editorIsOpen"
  },

  {
    "key": "shift+alt+u",
    "command": "fileutils.removeFile",
    "when": "editorTextFocus || editorIsOpen"
  },
  {
    "key": "alt+i",
    "command": "workbench.action.quickOpen",
    "when": "editorTextFocus || editorIsOpen"
  },
  {
    "key": "shift+alt+y",
    "command": "workbench.action.moveEditorLeftInGroup",
    "when": "editorTextFocus || editorIsOpen"
  },
  {
    "key": "shift+alt+o",
    "command": "workbench.action.moveEditorRightInGroup",
    "when": "editorTextFocus || editorIsOpen"
  },
  {
    "key": "shift+alt+i",
    "command": "workbench.action.reopenClosedEditor",
    "when": "editorTextFocus || editorIsOpen"
  },
  {
    "key": "alt+`",
    "command": "-workbench.action.closeActiveEditor",
    "when": "editorTextFocus || editorIsOpen"
  },
  {
    "key": "alt+`",
    "command": "workbench.action.terminal.toggleTerminal",
    "when": "terminal.active"
  },
  {
    "key": "alt+shift+`",
    "command": "workbench.action.terminal.new",
    "when": "terminalProcessSupported || terminalWebExtensionContributedProfile"
  },

  // remap markdown paste to Ctrl+V
  {
    "key": "ctrl+v",
    "command": "telesoho.MarkdownPaste",
    "when": "editorTextFocus && resourceLangId == 'markdown'"
  },
  {
    "key": "ctrl+alt+v",
    "command": "-telesoho.MarkdownPaste",
    "when": "editorTextFocus && resourceLangId == 'markdown'"
  },
  {
    "key": "ctrl+shift+v",
    "command": "editor.action.clipboardPasteAction",
    "when": "editorTextFocus && resourceLangId == 'markdown'"
  }
```

## The Result

All of the above extensions and settings work together to make note-taking more efficient and more powerful. For instance, I can paste an image or a link straight from my clipboard and it will be inserted into the markdown document automatically. I can also use the `g` key to quickly navigate through files, with `gd` to open a note from its link.

The markdown preview on VS Code is also extended to support full `LaTeX`, `mermaid`, and `Chart.JS`. Below are some screenshots of it.
#img

|                                                                                                 |                                                                                                 |
| ----------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| ![markdown source code and preview side-by-side](VS-Code-Note-Taking/ksnip_20220322-211838.png) | ![markdown source code and preview side-by-side](VS-Code-Note-Taking/ksnip_20220322-211912.png) |

And, of course, a tree view is generated in real time through the [md-graph](https://marketplace.visualstudio.com/items?itemName=ianjsikes.md-graph) extension. In the screenshot below, each node is a note and each edge is a link between different notes. Clicking on a note in the tree view will open it in the editor, which is a good way to quickly navigate through notes. If this screenshot doesn't manage to convert you to a conceptual note-taker, I don't know what will.

#tree
![tree view of note system](VS-Code-Note-Taking/ksnip_20220322-212458.png)
