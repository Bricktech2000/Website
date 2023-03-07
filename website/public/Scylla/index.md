## What is Scylla

Scylla is inspired by [Prison Break](https://en.wikipedia.org/wiki/Prison_Break)'s cartel database.

> In Prison Break, Scylla is a set of 6 hard drives that contain secret data. However, the hard drives are useless uneless all 6 of them are present.

Inspired from this show, my version of Scylla takes one file (can be a zip containing multiple files) and splits it into `n` key files, which are worthless gibberish unless all `n` key files are present, in which case the original file can be reconstructed!

## How to use it

Click on [this link](./scyllaV1.html) to open Scylla's _very advanced_ web interface. First, you will see an integer input prompting you for the _Scylla type_.

> The _Scylla type_ is the number of key files that will be used or generated. It has to be the same for both the encoding and the decoding of the key files.

To encode a file (split it), you need to first enter the _Scylla type_. Then, click on _Choose Files_, and then chose one file to encode. If your browser asks you if you want to allow Scylla to download more than one file, click on _Allow_, otherwise some key files will not be downloaded properly.

To decode a file (reconstruct it), you need to re-enter the same _Scylla type_ as you did for the encoding process. Then, click on _Choose Files_, and then choose **every key file that was previously generated** (using Ctrl-Click). No warnings or errors should appear and your original file should be downloaded successfully!

## Some Errors...

Some error messages might show up while trying to encode or decode a file.
Here are some errors and warnings and how to fix them:

- `Fatal Error: No files selected.` Select one or more files to encode or decode.
- `Fatal Error: Scylla type should be larger than 1.` The _Scylla type_ should be larger than 1, in order to split the file into multiple key files.
- `Warning: Scylla type not equal to number of files.` During decoding, the _Scylla type_ you have entered is not equal to the number of files you have selected in the file prompt. This is a very important warning, because if one file is missing, you will not be able to decode back into the original file. Make sure all the key files were selected.
- `Fatal Error: Invalid Key File Name: ...` During decoding, if one of the selected key files is not a valid key file or if it has been renamed, the operation will halt. This prevents trying to decode non-key files.
- `Warning: Invalid Key File Name ... for Scylla type ...` During decoding, this error will be thrown if the name of one or more of the key files doesn't line up with the entered _Scylla type_. Make sure you have entered the right _Scylla type_, otherwise the decoded file will just contain gibberish.

## Final Words

> Many backup because they have seen the dark side of failing to do so, blessed are those that backup who have not seen!
>
> &mdash; T.E. Ronneberg

Even if it might seem like it, just remember that Scylla is... _How would I say_... not a great way to backup files. Unless you want to increase the probability of losing all your files, don't use Scylla to make backups!
