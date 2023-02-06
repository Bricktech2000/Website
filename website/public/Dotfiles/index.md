## Dotfiles

Syncing configuration across multiple devices wasn't hard back when I used [VS Code](https://code.visualstudio.com/) and the default terminal on my Linux installation. However, since switching to [kitty](https://sw.kovidgoyal.net/kitty/), [tmux](https://github.com/tmux/tmux/wiki) and [Neovim](https://neovim.io/), syncing dotfiles across my laptop, server and phone became somewhat of a hassle. This was a perfect opportunity for me to finally create a Git repository to track them.

> Dotfiles are plain text configuration files on Unix like systems `...`. Dotfiles store settings of almost every application, service and tool running on your system. These files control the behavior of applications from boot to termination and everything in between.
>
> &mdash; [SE-EDU](https://se-education.org/learningresources/contents/dotfiles/Dotfiles.html)

## Managing Dotfiles

A very common practice is to use a version control system such as [Git](https://git-scm.com/) to track dotfiles. This brings all the benefits of version control to your configuration files, such as:

- Being able to revert changes to a previous state if something goes wrong
- Being able to share your configuration with others effortlessly
- Being able to easily set up a new machine with your configuraton

Many people track their dotfiles by setting up symlinks between the dotfiles in the repository and the actual configuration files on the system, generally located in the `home` directory. However, this solution has a few drawbacks, like the fact that the symlinks must be kept in sync with the state of the repository at all times.

I decided to use a different approach, a [Git bare](https://git-scm.com/book/en/v2/Git-on-the-Server-Getting-Git-on-a-Server) repository, which does not contain a working directory. By then setting the working directory manually to the `home` directory through the `--work-tree` flag using an [alias](https://www.geeksforgeeks.org/alias-command-in-linux-with-examples/), such a repository can be used to track dotfiles without the need for symlinks. More information about this can be found in my [dotfiles repo](https://github.com/Bricktech2000/dotfiles). The resulting workflow is as follows, and works regardless of the current working directory:

```bash
# adding a new file to the repository
config add .vimrc # or any other dotfile
config commit -m "added .vimrc"
config push

# updating the repository on a new machine
config pull
```

As you can see, this workflow is very similar to the one used for regular Git repositories &mdash; the only difference being that the `config` alias is used instead of `git`. Not having to deal with symlinks makes it convenient to use the repository on multiple machines simultaneously, which was one of my main goals.

## Moving Forward

I will continue to update my [dotfiles repository](https://github.com/Bricktech2000/dotfiles) as my configuration evolves. If you are interested in using my configuration, feel free to clone the repository and use it as a starting point for your own dotfiles. If you have any questions or suggestions, feel free to open an issue on the repository or to contact me!
