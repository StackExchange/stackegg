using System;
using System.Collections.Generic;
using System.Linq;

namespace StackEgg
{
    public enum StackEggAction
    {
        Nothing = 0,

        // the follwing five are the "base actions"
        Ask,
        Answer,
        Upvote,
        Downvote,
        Close,

        FlagForModerator
    }
}