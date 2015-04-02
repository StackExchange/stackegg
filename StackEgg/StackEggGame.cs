using System;
using System.Collections.Generic;
using System.Linq;

namespace StackEgg
{
    public class StackEggGame
    {
        public int DaysElapsed { get; set; }

        public StackEggPhase.Id CurrentPhaseId { get; set; }
        public StackEggPhase CurrentPhase { get { return StackEggPhase.ById(CurrentPhaseId); } }

        public Dictionary<StackEggStat, double> Stats { get; set; }

        public Dictionary<StackEggStat, int> AccumulatedStats { get; set; }

        public int ModeratorFlags { get; set; }

        public bool IsFailing { get; set; }

        /// <summary>
        /// equal to CurrentPhaseId if the game is still active
        /// </summary>
        public StackEggPhase.Id ReachedActivePhaseId { get; set; }

        public StackEggGame Initialize()
        {
            DaysElapsed = 0;
            CurrentPhaseId = ReachedActivePhaseId = StackEggPhase.Id.PrivateBeta;

            Stats = new Dictionary<StackEggStat, double>()
            {
                { StackEggStat.Questions, 0.0 },
                { StackEggStat.Answers, 0.0 },
                { StackEggStat.Quality, 0.0 },
                { StackEggStat.Users, 0.0 },
                { StackEggStat.Traffic, 0.0 }
            };

            AccumulatedStats = new Dictionary<StackEggStat, int>()
            {
                { StackEggStat.Questions, 0 },
                { StackEggStat.Answers, 0 },
                { StackEggStat.Quality, 0 },
                { StackEggStat.Users, 0 },
                { StackEggStat.Traffic, 0 }
            };

            ModeratorFlags = 0;
            //AdvanceToNextPhase(); AdvanceToNextPhase();

            return this;
        }

        public static int UsefulRound(double x)
        {
            return (int)Math.Round(x, MidpointRounding.AwayFromZero);
        }

        /// <summary>
        /// rounds a stat to the number of hearts (zero to four) that should be displayed to the user
        /// </summary>
        public static int HeartRound(double x)
        {
            return Math.Min(4, Math.Max(0, UsefulRound(x)));
        }

        /// <summary>
        /// Like HeartRound, but can return -1 (which to the user would cause a red "dangerously low" warning)
        /// </summary>
        public static int HeartRoundExtended(double x)
        {
            return Math.Min(4, Math.Max(-1, UsefulRound(x)));
        }

        private static double CapStat(double x, bool atZero)
        {
            return Math.Min(4.5, Math.Max(atZero ? -0.49 : -1.5, x));
        }

        public IEnumerable<StackEggAction> AvailableActions()
        {
            if (CurrentPhase == null)
                yield break;

            if (!IsFailing)
            {
                foreach (var action in CurrentPhase.AvailableActions)
                    yield return action;
            }

            if (ModeratorFlags > 0)
                yield return StackEggAction.FlagForModerator;

            yield return StackEggAction.Nothing;
        }

        public bool ActionIsLegal(StackEggAction action)
        {
            if (CurrentPhase == null)
                return false;
            switch (action)
            {
                case StackEggAction.Nothing: return true;
                case StackEggAction.FlagForModerator: return ModeratorFlags > 0;
                default: return !IsFailing && CurrentPhase.AvailableActions.Contains(action);
            }
        }

        public IEnumerable<StackEggStat> BadStats()
        {
            return StatsLessThan(-0.5);
        }
        public IEnumerable<StackEggStat> CriticalStats()
        {
            return StatsLessThan(-1.5);
        }

        public IEnumerable<StackEggStat> StatsLessThan(double x)
        {
            return StatsAvailableNowOrAtTheEnd().Where(s => Stats[s] <= x);
        }

        private void PerformBaseAction(StackEggAction action)
        {
            var phase = CurrentPhase;
            var newValues = new Dictionary<StackEggStat, double>();
            foreach (var influencedStat in phase.AvailableStats)
            {
                var oldValue = Stats[influencedStat];
                var newValue = oldValue;
                bool anyInfluence = false,
                     anyPositiveActionInfluence = false;
                var statInfluence = phase.StatInfluences[influencedStat];
                if (statInfluence.ActionInfluences != null && statInfluence.ActionInfluences.ContainsKey(action))
                {
                    var change = statInfluence.ActionInfluences[action];
                    newValue = oldValue + change;
                    if (change > 0)
                    {
                        // see the guarantee in the description of StackEggStatInfluence.ActionInfluences
                        newValue = Math.Max(newValue, HeartRound(oldValue) + 1);
                        anyPositiveActionInfluence = true;
                    }
                    anyInfluence = true;
                }

                if (statInfluence.StatInfluences != null && !anyPositiveActionInfluence)
                {
                    foreach (var kvp in statInfluence.StatInfluences)
                    {
                        var influencingStat = kvp.Key;
                        var arrayIndex = HeartRoundExtended(Stats[influencingStat]) + 1;
                        var change = kvp.Value[arrayIndex];
                        if (change.HasValue)
                        {
                            newValue += change.Value;
                            anyInfluence = true;
                        }
                    }
                }

                if (!anyInfluence)
                {
                    newValue = oldValue + statInfluence.IdleInfluence;
                }

                newValues[influencedStat] = CapStat(newValue, statInfluence.CapAtZero);
            }

            foreach (var stat in phase.AvailableStats)
            {
                Stats[stat] = newValues[stat];
            }
        }

        private void FlagForModerator()
        {
            foreach (var stat in CurrentPhase.AvailableStats)
            {
                Stats[stat] = Math.Max(Stats[stat], 1);
            }
            ModeratorFlags--;
        }

        /// <summary>
        /// Returns true if we're advancing to a new phase, false otherwise
        /// </summary>
        /// <param name="performedAction"></param>
        /// <returns></returns>
        public bool AdvanceDay(StackEggAction performedAction)
        {
            if (!ActionIsLegal(performedAction))
                throw new InvalidOperationException(performedAction + " is not a legal action at this time");

            var critical = CriticalStats().ToList();

            switch (performedAction)
            {
                case StackEggAction.Ask:
                case StackEggAction.Answer:
                case StackEggAction.Upvote:
                case StackEggAction.Downvote:
                case StackEggAction.Close:
                case StackEggAction.Nothing:
                    PerformBaseAction(performedAction);
                    break;
                case StackEggAction.FlagForModerator:
                    FlagForModerator();
                    break;
            }

            foreach (var stat in CurrentPhase.AvailableStats)
            {
                AccumulatedStats[stat] += HeartRound(Stats[stat]);
            }

            DaysElapsed++;

            var stillCritical = critical.Intersect(CriticalStats()).ToList();
            if (stillCritical.Count > 0)
            {
                if (!IsFailing && ModeratorFlags > 0)
                {
                    IsFailing = true;
                    return false;
                }                    
                else
                {
                    CurrentPhaseId = StackEggPhase.Id.Failed;
                    return true;
                }
            }
            
            IsFailing = false;

            if (GetPhaseProgress() >= 1.0)
            {
                AdvanceToNextPhase();
                return true;
            }
            return false;
        }

        public IEnumerable<StackEggStat> StatsAvailableNowOrAtTheEnd()
        {
            if (CurrentPhase != null)
                return CurrentPhase.AvailableStats;

            return StackEggPhase.ById(ReachedActivePhaseId).AvailableStats;
        }

        private void AdvanceToNextPhase()
        {
            var oldPhase = CurrentPhase;
            CurrentPhaseId = oldPhase.NextPhaseId;

            if (CurrentPhase != null)
            {
                ModeratorFlags++;
                ReachedActivePhaseId = CurrentPhaseId;

                // stats that were available in the old phase are set to 1, the others stay at 0
                // (note we're relying on the fact that AvailableStats only gets new stats, but never
                // has stats removed)
                foreach (var oldStat in oldPhase.AvailableStats)
                {
                    Stats[oldStat] = 1.0;
                    AccumulatedStats[oldStat] = 0;
                }
            }
        }

        public double GetPhaseProgress()
        {
            if (CurrentPhase == null)
                return 0.0;

            var goals = CurrentPhase.StatGoals;
            if (goals == null || goals.Count == 0)
                return 0.0;
            return goals.Average(kvp => Math.Min(1.0, (double)AccumulatedStats[kvp.Key] / kvp.Value));
        }
    }
}