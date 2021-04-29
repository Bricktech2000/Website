## Preview

This encoder takes plain text and encodes it into a format that is really hard to read. If you can, it means that your brain is easily able to adapt to new situations!

Here are some of the things it does to make reading the output difficult:

- Replaces some letters with numbers
- Puts spaces in key positions in words
- Changes the order of the letters in words

#demo

As a little challenge, try to read the following:

```
CN0 R6 74 LU 74 01 N5! 0LNY 4 54M LL F4R 7C 01N 0F P03 LP3 C4N R43D 71H5 M53 45 63!
```

[//]: # 'congratulations! only a small fraction of people can read this message!'

If you wish to try it for yourself, simply [click here](./Encoder-2.0/Encoder.html)!

## How it Was Made

All began when I saw the following on the internet:

> Aoccdrnig to a rscheearch at Cmabrigde Uinervtisy, it deosn't mttaer in waht oredr the ltteers in a wrod are, the olny iprmoetnt tihng is taht the frist and lsat ltteer be at the rghit pclae. The rset can be a toatl mses and you can sitll raed it wouthit porbelm. Tihs is bcuseae the huamn mnid deos not raed ervey lteter by istlef, but the wrod as a wlohe.
>
> [University of Cambridge](https://www.mrc-cbu.cam.ac.uk/people/matt.davis/cmabridge/)

As stated by the above quote, the human brain reads words as a whole, so only the first and last letters need to be in the right position. All the other ones can be scrambled and your brain will still be able to read without a problem.

This is what first inspired me to create this encoder. But then I thought...

> I bet I can improve this to make it even more difficult to read.

I made the first version of this encoder on [my first website](./../Encoder-2.0/My-First-Website/client/). [Click here](./Encoder-2.0/../My-First-Website) to see a blog post talking about it! However, the code has just become a total mess. I wanted to fix that, so I made a second version, which uses regular expressions (`RegExp`) to make it work.

> A regular expression (shortened as regex or regexp; also referred to as rational expression) is a sequence of characters that define a search pattern. Usually such patterns are used by string searching algorithms for "find" or "find and replace" operations on strings, or for input validation.
>
> [Wikipedia](https://en.wikipedia.org/wiki/Regular_expression)

The mentioned regular expressions find and replace specific patterns in the input text to encode it into an output which is really hard to read!

## Final Words

This project was quick to program, but I had a lot of fun making it work! At first, it might be hard to read the output. However with a little practice, it gets really easy: you will be able to read the encoded text as fluidly as normal text!
