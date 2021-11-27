Have you ever wanted to have access to all your files from **anywhere** in the world, all the while keeping local copies synced together **seamlessly**?

Now that I say it out loud, probably not. However, in the last few weeks, there were many times where I wanted to show something to a friend just to realize I didn't have my laptop with me.

> If only there was a way for me to access my files remotely from my phone...

This is when I decided I would try to find a solution to this problem.

## The Plan

My plan was simple: I would find a way to sync files between my laptop and my [Ubuntu](https://ubuntu.com/) [server](../Raspberry-Pi-Server/), and I would use an [`SFTP` client](https://play.google.com/store/apps/details?id=com.arpaplus.adminhands) on my phone to access all my files remotely.

The first idea I had was to use [Git](https://git-scm.com/) to track changes and sync files between multiple machines.

> Git is software for tracking changes in any set of files, usually used for coordinating work among programmers collaboratively developing source code during software development. Its goals include speed, data integrity, and support for distributed, non-linear workflows.
>
> [Wikipedia](https://en.wikipedia.org/wiki/Git)

However, I quickly realized its limitations when working on large binary files. As it turns out, the size of the `.git` folder used to keep track of the changes in a set directory exploded as large files were created and deleted. Consequently, I had to find another solution to this problem.

## The Actual Solution

Obviously, the first idea that came to mind was to create an **entirely custom** program from scratch that would use a **proprietary file tracking format**.

#works
[FileSync](https://github.com/Bricktech2000/FileSync) is a program that tracks changes on a file system and synchronizes them without a centralized authority. Essentially, one can think of the structure created by multiple machines using this system as an _undirected graph_. Even though a single node can request syncing with any other node, the synchronization is entirely symmetrical.

For keeping track of file system changes, a daemon process must be running at all times. It uses a library called [Watchdog](https://pypi.org/project/watchdog/) to listen for file system events, and then updates an index file using `JSON` format, `.sync`. Here is a rough example of a simple `.sync` file to give an idea of its structure:

```json
{
  ".": {
    ".st": 1637981552,
    ".sd": 0,
    "file1": {
      ".st": 1637981552,
      ".sd": 1
    },
    "file2": {
      ".st": 1637981552,
      ".sd": 1
    }
  }
}
```

Essentially, the deamon process keeps track of the following properties for each file and folder:

- _key_ is the name of the file or folder
- `".st"` is the time at which the file or folder was last modified
- `".sd"` is the type of data stored: `1` for a file, `0` for a folder and `null` for a deleted item

When a synchronization is requested, [FileSync](https://github.com/Bricktech2000/FileSync) downloads the index file `.sync` from the remote through `SFTP`. Then, it compares the `".st"` properties of each file and folder in both index files, and overrides an older file with a newer version of the same file. This means that, in contrast to [Git](https://git-scm.com/), [merge conflicts](https://www.gitkraken.com/learn/git/tutorials/how-to-resolve-merge-conflict-in-git) are avoided since the program is running under assumption that the user knows which files have been modified prior to the current synchronization request.

In more practical terms, this means that I can run `python3 main.py sync` on my laptop to sync its file system with the file system on [my server](../Raspberry-Pi-Server/). Since it is always online, that means I can access all my files from any device using an `SFTP` client such as [Admin Hands](https://play.google.com/store/apps/details?id=com.arpaplus.adminhands).

## Conclusion

This program is a pseudo-replacement for another file syncing system I made a while ago, [Auto Cloud Backup](../Auto-Cloud-Backup/). However, that program used the [Google Drive API](https://developers.google.com/drive) to upload files to a cloud service, meaning upload rates were **severely** limited and storage space **fairly expensive**. Even though this program seems to solve most issues I had with [Auto Cloud Backup](../Auto-Cloud-Backup/), I wonder for [how much time](./outdated.html) I will keep using [FileSync](https://github.com/Bricktech2000/FileSync) before I inevitably end up discovering the flaws of this new approach.

With that said, this project was a great learning opportunity, allowing me to revisit the [Watchdog](https://pypi.org/project/watchdog/) library and teaching me about transfering files in Python through `SFTP`.
