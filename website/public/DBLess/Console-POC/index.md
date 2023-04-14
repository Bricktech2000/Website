## The idea

I first had the idea to create [this password manager](https://github.com/Bricktech2000/DBLess) when I heard about a website that stored secret information using a user-provided password as a symmetric encryption key.

> A password manager is a computer program that allows users to store, generate, and manage their passwords for local applications and online services. A password manager assists in generating and retrieving complex passwords, storing such passwords in an encrypted database or calculating them on demand.
>
> [Wikipedia](https://en.wikipedia.org/wiki/Password_manager)

This website stored the user's secret information on the server side in an encrypted form. When the information is requested by the client, it is sent encrypted and must be decrypted using the same key that was used to encrypt it in the first place. This is where it gets interesting: the key was derived directly from the user-provided password, meaning storing the password was totally unnecessary. A few days later, I decided to create a password manager based on the same idea.

## How it works

This password manager uses simple cryptography to generate website passwords on demand. This means that that no database is required to store them, which has many advantages:

- All generated passwords are totally different from one website to another and are very hard to brute force
- No trust is put on a third-party password manager's security infrastructure
- A plain-text database leak has virtually no chances of exposing your master password

At this point, you are probably wondering:

> And how does it do such a thing?

It turns out that it is fairly simple. The password manager takes in 4 parameters as an input: the `Service` to log into, the `Username` used, your `Master Password` and a token file.

1. The program asks for user input. For this example, the service to log into will be **_google_**, the username used will be **_my.email@gmail.com_**, the master password will be **_Password123_** and the token file will be empty.
2. Each of the three values inputted is individually hashed using `SHA-1` before being `XOR`ed together. This step of the process is not meant to be cryptographically secure and is only used to "join" the different values together. In this example, it would produce the following 160-bit digtest: **ec50c<wbr>24d12<wbr>87019<wbr>83dd1<wbr>9e458<wbr>14ff2<wbr>d1daa<wbr>bf3ca**.
3. The previously generated digest is then hashed again using `SHA-256`, a cryptographically secure hashing algorithm, which would produce the following output when represented as hexadecimal: **d1c3<wbr>f43b<wbr>b4fc<wbr>0727<wbr>fff7<wbr>31e1<wbr>e3d3<wbr>0199<wbr>994b<wbr>6f7d<wbr>b748<wbr>4b54<wbr>7c71<wbr>2776<wbr>f654<wbr>40da**.
4. The newly generated digest is mutated through a [Base-85](https://en.wikipedia.org/wiki/Ascii85) encoder to reduce its length before being copied to the user's clipboard. The final password would look something like this: **zLPrWepdR%mXnb<i[3%Nm?EDW[6d>D#QJS{eBrh**.

As you can clearly see, the generated password is derived from well-known data and a secret. For this reason, it will be different for every service and for every username used. The generated password will be **completely wrong** if the master password isn't exactly the same, which is ideal in this scenario.

#try

If you would like to try this program for yourself, refer to the `README` on the [project's github](https://github.com/Bricktech2000/DBLess). Clone the repo, install `pyperclip` and run the program!

## Conclusion

This password manager definitely has a long way to go, but it is still a good proof-of-concept that uses cryptography to greatly reduce the amount of potential weak links in a system. Even though I currently use it as my main password manager, I don't plan on making it production-ready as that would require building a **nice UI** and **good UX** and **a lot of polishing**. Let's just hope [Quantum Computers](https://en.wikipedia.org/wiki/Quantum_computing) don't [break everything](https://en.wikipedia.org/wiki/Shor%27s_algorithm) too soon...
