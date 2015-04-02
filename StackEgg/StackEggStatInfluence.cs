using System;
using System.Collections.Generic;
using System.Linq;

namespace StackEgg
{
    /// <summary>
    /// Specifies how a particular stat is influenced (per day) by the taken action,
    /// the other stats, and in absence of other influences.
    /// </summary>
    public class StackEggStatInfluence
    {
        /// <summary>
        /// Specifies how the performed action influences the stat. If the influence is positive,
        /// then the action is guaranteed to make a *user-visible* change (i.e. the stat is increased
        /// such that there is at least one more full heart). Unless of course there are already
        /// four full hearts.
        /// </summary>
        public Dictionary<StackEggAction, double> ActionInfluences { get; set; }

        /// <summary>
        /// Specifies how the stat is influenced by the values of other stats. The double?[] must have
        /// a length of six, corresponding to -1, 0, 1, 2, 3, 4 hearts. Example: If for the influenced stat
        /// StackEggStat.Answers and the influencing stat StackEggStat.Questions, the value
        /// is [-1, -.8, -.6, -.4, null, null], and the current questions stat is 1.9: That rounds to 2.
        /// Thus the question stat causes a decrease in answer stat by 0.4.
        /// 
        /// StatInfluence is not consulted if the performed action has a positive influence on the influenced stat
        /// (i.e. in the above example, answers aren't influenced by questions if the performed action was "Answer").
        /// </summary>
        public Dictionary<StackEggStat, double?[]> StatInfluences { get; set; }

        /// <summary>
        /// If the performed action does not influence the stat and there is no influence from other stats, then
        /// the stat is changed by this amount.
        /// 
        /// "No influence" does *not* mean "zero"; rather it means the ActionInfluence does not contain the action at all,
        /// and StatInfluence either doesn't contain anything, or none of the relevant double?s is non-null.
        /// </summary>
        public double IdleInfluence { get; set; }

        /// <summary>
        /// If this is true, then the stat cannot got to -1 hearts (i.e. no red "dangerously low" warning and the
        /// stat cannot cause a site shutdown).
        /// </summary>
        public bool CapAtZero { get; set; }
    }
}