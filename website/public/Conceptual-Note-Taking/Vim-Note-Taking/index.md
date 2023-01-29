## Some Updates

Since last posting about my [conceptual notes](https://notes.emilien.ca/), I have switched to using [Neovim](https://neovim.io/) as my primary text editor, which you can read more about [here](../Dotfiles/). My configuration for Neovim is part of my [dotfiles](https://github.com/Bricktech2000/dotfiles), which can be found on my [GitHub](https://github.com/Bricktech2000/). I have also started using [Obsidian](https://obsidian.md/) for previewing my notes as it does not require superfluous configuration for the superset of Markdown I use, which includes `[[wiki links]]` and `$\LaTeX$` equations.

## Publishing my Notes

One inconvenient to using plain-text [Markdown](https://en.wikipedia.org/wiki/Markdown) files for my conceptual notes is that it makes it difficult to share them with others. Sending [GitHub](https://github.com/) links is one solution, but GitHub supports neither LaTeX equations nor wiki links. I knew I needed a better solution.

Some of the advantages of using [Markdown](https://en.wikipedia.org/wiki/Markdown) for note-taking is that it is future-proof and highly portable. Markdown is used to create websites (such as the one you are on right now), technical documentation, presentations, email messages, and the list goes on. This is what made it so trivial to publish my notes to the internet. I used a library called [mkdocs](https://www.mkdocs.org/), which is a static site generator for Markdown documentation. I feed it the output of [Obsidian Export](https://github.com/zoni/obsidian-export) to convert Obsidian-style Markdown down to CommonMark. If you are interested in learning more about how this process works, check out my note's [GitHub repository](https://github.com/Bricktech2000/Notes/)!

## The Result

After a few client-side JavaScript patches, the result is [this website](https://notes.emilien.ca/). It is definitely not perfect, but it is still a good way to quickly share my notes with others. Feel free to explore around, and let me know what you think!
