This repository contains the core game logic of Stack Exchange's April 1st 2015 game, StackEgg, for those who are curious about the game's details. It includes a minimal console app that allows you to play the game.

If you mainly want to know how which action influenced which stat(s), I suggest you start at the definitions of [`PrivateBeta`](https://github.com/StackExchange/stackegg/blob/7b367857a65582d5c4f3e4ee370f86efe6b53f09/StackEgg/StackEggPhase.cs#L61), [`PublicBeta`](https://github.com/StackExchange/stackegg/blob/7b367857a65582d5c4f3e4ee370f86efe6b53f09/StackEgg/StackEggPhase.cs#L104), and [`Launched`](https://github.com/StackExchange/stackegg/blob/7b367857a65582d5c4f3e4ee370f86efe6b53f09/StackEgg/StackEggPhase.cs#L172).
 For an explanation of what the numbers mean, see [`StackEggStatInfluence`](https://github.com/StackExchange/stackegg/blob/7b367857a65582d5c4f3e4ee370f86efe6b53f09/StackEgg/StackEggStatInfluence.cs).

If you don't care about such things and just want to have another look at the cute StackEgg animations, head over to the [animations page](http://stackexchange.github.io/stackegg/) instead.
