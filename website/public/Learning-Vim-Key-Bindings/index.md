## Some Backstory

About one and a half years ago, I created a program called [Caps Hotkeys](../Caps-Hotkeys/). In short, it is a system of key bindings that would remap common navigation operations such as the arrow keys or the `Page Up` and `Page Down` keys to more convenient shortcuts. But then a few months ago, when exploring alternatives to my program, I stumbled upon the set of key bindings used by the Vim editor.

> The underlying principle of Vim is the operator-motion pair. [...] For Vim, `d` is the delete operator, and `_` is the line motion. So, typing `d_` will delete a line.
> This is the essence of Vim. Instead of trying to memorize hundreds of commands, you learn the verbs and nouns that make up the language, and then combine together.
>
> [Marcus Kazmierczak](https://mkaz.blog/working-with-vim/the-tao-of-vim/)

When I first read this paragraph, it was truly eye-opening. At that moment, I knew I had to learn Vim key bindings.

## Learing Vim Key Bindings

Learning key bindings is very similar to learning a [new keyboard layout](./dvorak.html) or a new writing system such as [shorthand](../Learning-Gregg-Shorthand/) (which you can learn more about [here](../Learning-Gregg-Shorthand/)). When the learning curve isn't too steep, the best way to do so is to **commit** to the new system entirely.

With this in mind, I spent the last few months programming exclusively with Vim key bindings. Since I already had a lot of experience with VSCode, I decided to use the Vim extension to be able to use its bindings outside of the Vim editor itself. Here is a list of a few of the resources I used to learn them:
#res

- [Vim Tutorial](https://www.youtube.com/watch?v=IiwGbcd8S7I) by [Ben Awad](https://www.youtube.com/channel/UC-8QAzbLcRglXeN_MY9blyw) &mdash; for learning basic bindings and use cases
- [Mastering the Vim Language](https://www.youtube.com/watch?v=wlR5gYd6um0) by Chris Toomey &mdash; for understanding real-world uses of Vim
- [Vim Cheat Sheet](https://vim.rtorr.com/) by [rtorr](https://github.com/rtorr) &mdash; just a very comprehensive Vim cheat sheet

And, as honorable mentions, [this answer by Alex Fedotov](https://askubuntu.com/questions/363346/how-to-permanently-switch-caps-lock-and-esc) for remapping the `Caps Lock` key to `Escape` system-wide on Linux and [this answer by JoePerkins](https://stackoverflow.com/questions/4967217/relative-line-numbers-in-visual-studio) for switching to relative line numbers on VSCode.

## Final Words

It might not seem like it at a first glance, but learning any set of key bindings will make you **way more efficient** of a programmer. It won't allow you to type faster, but it'll allow you to manipulate text in a very efficient manner.

It is said to be impossible to master Vim. Some people that have more than `30 years` of experience with it claim that they are still constantly learning new techniques. Regardless, I have no idea how I used to program without a proper set of key bindings: not using them genuinely feels like a handicap. After having used Vim for only a few months, I can confirm the legend is true &mdash; **I would never go back**.
