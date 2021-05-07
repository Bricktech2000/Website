## What is MiniML?

MiniML is a custom-built markup language, which was used to create this webpage. [See the page's source code](./index.md).

> In computer text processing, a markup language is a system for annotating a document in a way that is syntactically distinguishable from the text, meaning when the document is processed for display, the markup language is not shown, and is only used to format the text.
>
> [Wikipedia](https://en.m.wikipedia.org/wiki/Markup_language)

As the definition states, a markup language is not a programming language; it is a system used to _format the text_ of a document. Following this definition, _MiniML_ is only used to tell the browser how to display different items such as logos, images, quotes and so on.

## But Why?

Most of you are probably wondering,

> Why create a markup language when hundreads already exist?

And this is a fair point. Many markup languages such as `Markdown`, `HTML`, `XML`, and many others have been around for decades. However, I wanted to create my own for the following reasons:

- Ease of use
- Simplicity
- Customization

Languages such as `HTML` have now become so complex that way too much customization is available. For example, in `HTML`, `span`, `div` and `p` elements are very similar, but have small quirks that make using them simply annoying. This is why I wanted to make a language that is very simple.

> And what about `Markdown`?

Fair enough, `Markdown` is a simple and easy-to-use markup language. But there is only one problem: it lacks customization. Let's suppose I want to add an easy way to put an icon in some text. With MiniML and some programming skills, one can add such a feature in about 5 lines of code, which could not be said for a language such as `Markdown`.

So as you can see, there are many benifits to creating a custom markup language.

## How Does it Work?

_MiniML_ consists of only one function in one `Javascript` file, which is about 50 lines long. [See MiniML's source code](./../MiniML%20Compiler.js). It compiles down to `HTML` code, and then applies some classes to elements to allow custom styling for the end-user.

For example, here is the part of MiniML that parses links:

```javascript
out = out.replace(/\{(.+?)\:(.*?)\}/g, function (a, b, c) {
  return '<a class="markup-link" href="' + c + '">' + b + '</a>';
});
```

It consists of two parts: the regular expression (`/\{(.+?)\:(.*?)\}/g`) and the function executed when a match is found (`return '...'`). The code says the following:

> Find one opening curly brace (`\{`), followed by some characters (`(.+?)`), followed by a colon (`\:`), followed by some more characters (`(.*?)`), followed by a closing curly brace (`\}`). For each match found, replace the text with a valid `HTML` link.

which looks something like this in MiniML:

```html
{Text to Display: https://example.com/}
```

and then would produce the following HTML code:

```html
<a class="markup-link" href="https://example.com/">Text to Display</a>
```

and would look something like this: [Text to Display](https://example.com/)

If you want to see a side-by-side comparison between MiniML code and an actual page made using it, you can check out the following files:

- [The source code](./example.txt) (the code I have to write in MiniML)
- [The `HTML` code](./example.html) (the HTML code that is automatically generated, to display on a webpage)

As you can see, using MiniML to write these posts is an easy and efficient way to save time.
