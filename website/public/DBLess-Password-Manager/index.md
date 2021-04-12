MiniML 1.0
//Copyright Emilien Breton


The idea
--------

I first had the idea for {this password manager:: https://github.com/Bricktech2000/DBLess-Password-Manager} when I heard about a website that stores secret information client-side, using the password as an symmetric encryption key.
	""A password manager is a computer program that allows users to store, generate, and manage their passwords for local applications and online services. A password manager assists in generating and retrieving complex passwords, storing such passwords in an encrypted database or calculating them on demand.
	{Wikipedia:: https://en.wikipedia.org/wiki/Password_manager}""
This website sends encrypted data to the user, which can only be decrypted client-side using the key, which happens to be the password that protects the document. A few days later, I decided to create this /password manager/.


How it works
------------

The way this password manager works is very simple. It works on the premise that no database is needed to store your passwords. Your passwords are not stored; they are calculated on-the-fly by the program. This has multiple advantages:
	* There are absolutely no security risks
	* No internet connection is required
	* No harware device is required

At this point, you are probably wondering:
	""And how does it do such a thing?""
Turns out, it is fairly simple. It takes in 3 parameters as an input: the website [domain name], the [username] used and your [master password].
	* First, the program asks for user input. For this example, the domain name will be /*gmail.com*/, the username will be /*my.email@gmail.com*/ and the master password will be /*Password123*/.
	* Second, they are concatenated into a single long string, which looks like the following: *gmail.com%my.email@gmail.com%Password123*.
	* Third, it gets hashed using [SHA256] in order to obtain raw binary data, which looks like this: *f46cbae1ee0533b574657355934f28f587c1159e61f0977e3f027ad6326f841b*.
	* Fourth, it is mutaed through a {Base-85:: https://en.wikipedia.org/wiki/Ascii85} encoder before being copied to the user's clipboard. The final password will look something like this: *Lza$)GCzOBy/I[LtrR1HRTZ%vEPRjklueZgh?\*+*.
As you can clearly see, the generated password is derived from well-known data and a secret. For this reason, it will be different for every website and for every username. The generated password will be completely wrong if even a single character of the *master password* is not the same, which makes this algorithm very secure.

# try
If you would like to try this program for yourself, refer to the [README] on the {project's github:: https://github.com/Bricktech2000/DBLess-Password-Manager}. Clone the repo, install [pyperclip] and run the program!


Conclusion
----------

Even if this password manager has a long way to go, I think it is perfect as a simple demo of the power of hashing. I also learned that programming a proof of concept is way easier than making a production-ready program, which requires a *nice UI*, *good UX* and *a lot of polish*. Can't wait for the day {Quantum Computers:: https://en.wikipedia.org/wiki/Quantum_computing} will {break everything:: https://en.wikipedia.org/wiki/Shor%27s_algorithm}...
