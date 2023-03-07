## The Idea

Up until about a month ago, my resume was tailored primarily for teenage jobs. However, to stand any chance of getting employed as a fresh Computer Science student at [uOttawa](https://www2.uottawa.ca/en), I knew I would have to design a brand new resume from scratch.

After a [bit](https://www.youtube.com/watch?v=r_Wf532f5X4) [of](https://www.youtube.com/watch?v=Tt08KmFfIYQ) [research](https://www.youtube.com/watch?v=BYUy1yvjHxE) about what content to include or leave out of a resume, I was faced with a dilemma:

> Which program would I use to design it?

A sensible person would likely use something along the lines of [Google Docs](https://www.google.ca/docs/about/) or [Microsoft Word](https://www.microsoft.com/en-us/microsoft-365/word), but I knew better. I would program my resume in `HTML` and `CSS`.

## But Why?

`HTML` is a type of programming language known as _markup language_.

> In computer text processing, a markup language is a system for annotating a document in a way that is visually distinguishable from the content. It is used only to format the text, so that when the document is processed for display, the markup language does not appear.
>
> [Wikipedia](https://en.wikipedia.org/wiki/Markup_language)

There are numerous advantages of using a markup language to design a resume as opposed to using a UI-based program like [Google Docs](https://www.google.ca/docs/about/) or [Microsoft Word](https://www.microsoft.com/en-us/microsoft-365/word). Here are a few:

- Any text editor can be used to edit markup files since they are nothing more than normal text files
- The global presentation can be changed in a few seconds by modifying the stylesheet directly
- They can be parsed by text processing tools such as version control software

<?
https://dev.to/practicalprogramming/advantages-of-document-markup-languages-vs-wysiwyg-editors-9f6
?>

## Because!

In a nutshell, markup languages are way more **powerful** and **flexible** than UI-based editors. For example, if I want to modify the position of all bullet points in the document or if I feel like changing all headings to a different font, I can do so in a single line of `CSS`. Moreover, since I used [flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) to style my resume, its design is entirely responsive. All of the content is justified vertically not to leave any empty space, meaning that I can change the global font size or the dimensions of the sheet of paper used and the whole design will update accordingly.

Since markup files are supported by version control software, every change I make to my resume will be recorded through `git commit`s. As it is currently [hosted publicly on GitHub](https://github.com/Bricktech2000/Resume), anyone can view every version of my resume, all the way back to when it was an entirely empty document!

I have a feeling that using `HTML` to design a resume is one of those great ideas that turn out not to be so great when I eventually realize that superior technology already exists. Only time will tell...
