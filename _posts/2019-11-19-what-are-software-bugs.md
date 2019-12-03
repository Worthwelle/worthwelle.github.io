---
layout: post
title:  "What is a software bug?"
categories: [Jargon, Software]
tags: [bugs, programming]
series: software-jargon
excerpt: A software bug, usually referred to just as a "bug", is an unexpected behavior or result in a piece of software.
---

> It has been just so in all of my inventions. The first step is an intuition, and comes with a burst, then difficulties arise&mdash;this thing gives out and [it is] then that "Bugs"&mdash;as such little faults and difficulties are called—show themselves and months of intense watching, study and labor are requisite before commercial success or failure is certainly reached.
> 
> &mdash; Thomas Edison

A software bug, usually referred to just as a "bug", is an unexpected behavior or result in a piece of software.

The term "bug" has been around since before computer software and may have been coined by Thomas Edison.[^ieee_edison_bug] The word spread into common use by hardware and electrical engineers. From there it was adopted by software engineers.

It's unclear where exactly the word comes from. It is thought to derive from the Middle English word *bugge*, which referred to a monster.

Some examples of bugs include…

**The Y2K bug**

The "Y2K bug" is probably the most well-known and widely-reported software bug. Since early computers had resources, programmers decided to save space by reducing the year down to two digits. The year 1999 was represented as 99 instead of the full four digits. When the new millennium came around, this created ambiguity in any software written to store the year this way.

Any calculations done between the current year and a year in the past would return a negative number. `2001` would be stored as `01` and `1999` would be stored as `99`, so `1 - 99` would return `-98`. Since this calculation was expected to be positive in these software, they could do any number of unexpected things.

**The F-16 bug**

Another popular bug was discovered during development of the F-16 fighter.[^chicagotrib_f16] The F-16 was the first production aircraft to use a fly-by-wire flight control system. This system replaced manual flight controls with computers to control movement. This system was also used to help correct for some dangerous maneuvers a pilot might make in flight.

In the northern hemisphere latitudes are positive numbers, but in the southern hemisphere they are negative numbers. The fly-by-wire software in the F-16 reportedly was not prepared for negative latitudes. This, for some reason, caused the airplane to flip upside down when it crossed the equator. The flip was bad enough that the forces exerted on the pilot were strong enough to kill.

Thankfully this bug was discovered in simulations[^risksdig_f16] and it was fixed before it went to production.

## Where do bugs come from?

When programmers create a piece of software, they do so using what's called a programming language. There are many of these languages, each with a focus on specific types of development. The general purpose for them is the same: the language allows a programmer to give instructions to the computer.

Just as we sometimes have miscommunications when we talk to people, sometimes there is a miscommunication between a programmer and a computer. As with people, this is often a result of misused punctuation. Punctuation is used to give structure to the instructions that the computer has to follow.

If you use a parenthesis to write an aside to a colleague, but forget to close the aside with the closing parenthesis, they will likely still understand your message. Computers, however, need to read instructions literally. When something is written ambiguously, they're not able to resolve the ambiguity intelligently.

As software becomes more complex, it also becomes more likely that a programmer will make a mistake when trying to implement a complicated system. It's easy to forget outliers or exceptions when trying to break a system down.

A recent example of this is Uber's self-driving capability, which was not designed to see jaywalkers.[^bloomberg_uber] That is, it was designed to look out for pedestrians in crosswalks and stop if one was found. Since jaywalking is not legal in the US, it is likely that the designers behind the system did not consider the possibility of someone doing such a thing because they don't often see it in their own lives.

## How do we find bugs?

As with any field, conventions and best practices are constantly changing. The way that computer code is written has changed a lot over the years. Currently, it is considered best to break code down into small pieces. Each of these pieces is responsible for a single task. These pieces are then used and reused wherever it is necessary.

This can be compared to a factory: if you're building a chair, you're not going to build a different machine for each leg. Each machine would inevitably end up with its own quirks and the maintenance costs would also be higher. If you were at the end of the assembly line and received a chair missing a leg, you would then have to spend time figuring out which machine caused the problem before you could even begin to figure out what the problem *was*.

This same principle exists in computer code. If you realize that the code that shows a message to the user has a bug, you don't want to have to fix this in every place where a message is likely to be shown. Instead you put this code in one place and only refer to it each time you want to show an error message. When you then have to fix a bug, you only fix it once.

In order to find bugs, software engineers will generally write one or more automated tests for each of these small pieces of code. The tests will give a variety of test inputs and verify that there are no errors and the output is what is expected. These tests run every time that the software is built to ensure that everything is running as expected.

Naturally, if software engineers are required to think of all the possible inputs, it is inevitable that a possible input will be missed in these tests. At that point, it is the responsibility of the technical support department to pass error reports from software users on to the software engineers so that these tests can be updated.

---

Understanding not only what software bugs are, but also how to find them is becoming increasingly important as software gets more complex. Hospitals, emergency response, banks, airplanes and cars are only a few examples of places where software is used to control vital processes and can save lives. If the software doesn't work as intended, it could ruin those lives instead.

---

[^chicagotrib_f16]: Van, Jon. (1986-12-14). ["Software Bugs Turning Deadly In Complex Era"][chicagotrib_f16]. Chicago Tribune. Retrieved November 19, 2019.
[^risksdig_f16]: Peter G. Neumann. (August 14, 1986). ["F-16 Problems (from Usenet net.aviation)"][risksdig_f16]. The RISKS Digest. **3** (44). August 14, 1986. Retrieved November 19, 2019.
[^bloomberg_uber]: Benne, Ryan and Levin, Alan. (2019-11-05). ["Self-Driving Uber in Crash Wasn't Designed to See Jaywalkers"][bloomberg_uber]. Bloomberg. Retrieved on 2019-11-19.
[^ieee_edison_bug]: Magoun, Alexander B. and Israel, Paul. (2013-08-01). ["Did You Know? Edison Coined the Term "Bug""][ieee_edison_bug]. Retrieved July 19, 2019.

[chicagotrib_f16]: https://www.chicagotribune.com/news/ct-xpm-1986-12-14-8604030475-story.html
[risksdig_f16]: http://catless.ncl.ac.uk/Risks/3.44.html#subj1
[bloomberg_uber]: https://www.bloomberg.com/news/articles/2019-11-05/self-driving-uber-in-crash-wasn-t-programmed-to-spot-jaywalkers
[ieee_edison_bug]: https://spectrum.ieee.org/the-institute/ieee-history/did-you-know-edison-coined-the-term-bug
