## Motivation

I concluded the previous post by stating that

> I don't plan on making [this password manager] production-ready as that would require building a **nice UI** and **good UX** and **a lot of polishing**

Unfortunately, this statement has not aged well. At the time of writing this post, I use DBLess on over 30 of my accounts across a dozen services. Convenience was the main motivation pushing me to build a web version of the password manager, which would allow myself and others to use it on any device.

## Convenience

A few changes were made to the password manager to make it more user-friendly.

The first change is fairly obvious: it now runs on a browser, which means that it can be access by any device from anywhere in the world. I had never used cryptographic functions in JavaScript before, and they're just about as terrible as one would expect. Below are two equivalent samples so that you can admire the difference between the original Python implementation and the new JavaScript implementation.

```python
# Python Version: short and to-the-point

def join(*args):
  def xor(bytes1, bytes2):
    return bytes(a ^ b for a, b in  zip(bytes1, bytes2))
  return reduce(xor, [sha1(arg.encode('utf-8')).digest() for arg in args])

digest = sha256(join(name, user, master, token)).digest()
password = encode(digest)
```

```javascript
// JavaScript Version: unnecessarily verbose and filled with async madness

const join = async (...args) => {
  const xor = (a, b) => a.map((x, i) => x ^ b[i]);

  return (
    await Promise.all(
      args
        .map((arg) => new TextEncoder().encode(arg))
        .map((data) => crypto.subtle.digest('SHA-1', data))
    )
  )
    .map((arr) => new Uint8Array(arr))
    .reduce(xor, new Uint8Array(20));
};

const digest = Array.from(
  new Uint8Array(await crypto.subtle.digest('SHA-256', await join(...args)))
);

const password = encode(digest);
```

The second modification was made to the token system. In the original console version, the token file had to be loaded from disk **every time** a password was generated. In the new web version, the token file is loaded from disk once and can then be saved to the browser's local storage for future use, improving security. A link to the password manager with the token preloaded is also provided, allowing users to store their token as a URL in a safe place. I currently store mine in a QR code in my [wallet](../../3D-Printed-Wallet/) as a backup, meaning that if I ever lose access to all my electronic devices, I can scan it with someone else's phone to log into any account.

Both of these changes, along with the fact that the password manager can now be installed as a PWA, make it a lot more convenient to use.

## Try It

#try
If all that sounds appealing and you would like to give this password manager a try, head over to [dbless.emilien.ca](https://dbless.emilien.ca/). For more detailed instructions on how to use the software, refer to the `README` on the project's [GitHub repository](https://github.com/Bricktech2000/DBLess).

## Final Words

During this project, I learned how to use cryptographic functions in a browser through JavaScript and how to use the [PWA API](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps) to make the web app installable on any device. I also learned a bit about the [Material UI](https://mui.com/) library for React and NextJS, which I used to build part of the frontend layer.

For most people, password managers are by far the best way to improve account security. Now that [DBLess](https://dbless.emilien.ca/) is more user friendly, I am hoping more people will adopt it to secure their online accounts. If you end up using it, I would love to get some feedback!
