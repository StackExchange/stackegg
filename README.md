This repository contains the core game logic of Stack Exchange's April 1st 2015 game, StackEgg, for those who are curious about the game's details. It includes a minimal console app that allows you to play the game.

If you mainly want to know how which action influenced which stat(s), I suggest you start at the definitions of [`PrivateBeta`](https://github.com/StackExchange/stackegg/blob/7b367857a65582d5c4f3e4ee370f86efe6b53f09/StackEgg/StackEggPhase.cs#L61), [`PublicBeta`](https://github.com/StackExchange/stackegg/blob/7b367857a65582d5c4f3e4ee370f86efe6b53f09/StackEgg/StackEggPhase.cs#L104), and [`Launched`](https://github.com/StackExchange/stackegg/blob/7b367857a65582d5c4f3e4ee370f86efe6b53f09/StackEgg/StackEggPhase.cs#L172).
 For an explanation of what the numbers mean, see [`StackEggStatInfluence`](https://github.com/StackExchange/stackegg/blob/7b367857a65582d5c4f3e4ee370f86efe6b53f09/StackEgg/StackEggStatInfluence.cs).

If you don't care about such things and just want to have another look at the cute StackEgg animations, head over to the [animations page](http://stackexchange.github.io/stackegg/) instead.

## License (MIT)

Copyright (c) 2015 Stack Exchange Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
