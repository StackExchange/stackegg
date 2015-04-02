using System;
using System.Collections.Generic;
using System.Linq;

namespace StackEgg
{
    public class StackEggPhase
    {
        public enum Id
        {
            PrivateBeta = 1,
            PublicBeta,
            Launched,
            
            Failed = 98,
            WonTheInternet = 99,
        }

        /// <summary>
        /// The stats that are used during this phase
        /// </summary>
        public StackEggStat[] AvailableStats { get; set; }

        /// <summary>
        /// The base actions available during this phase
        /// </summary>
        public StackEggAction[] AvailableActions { get; set; }

        public Dictionary<StackEggStat, StackEggStatInfluence> StatInfluences { get; set; }

        /// <summary>
        /// The criteria required to reach the next phase. All stat goals must be reached to
        /// advance to the next round. The number this is checked against is the user-visible stat
        /// (i.e. zero to four hearts), integrated over the days. E.g. two days at two hearts and one
        /// day at three hearts gets you seven points closer to the goal.
        /// </summary>
        public Dictionary<StackEggStat, int> StatGoals { get; set; }

        /// <summary>
        /// The phase that the game will advance to when all goals are met.
        /// </summary>
        public Id NextPhaseId { get; set; }


        public static StackEggPhase ById(Id id)
        {
            switch (id)
            {
                case Id.PrivateBeta: return PrivateBeta;
                case Id.PublicBeta: return PublicBeta;
                case Id.Launched: return Launched;
                case Id.WonTheInternet:
                case Id.Failed:
                    return null;
            }
            throw new ArgumentOutOfRangeException("id");
        }



        public static StackEggPhase PrivateBeta = new StackEggPhase
        {
            AvailableStats = new StackEggStat[] { StackEggStat.Questions, StackEggStat.Answers },
            AvailableActions = new StackEggAction[] { StackEggAction.Ask, StackEggAction.Answer },
            StatInfluences = new Dictionary<StackEggStat, StackEggStatInfluence>()
            {
                {
                    StackEggStat.Questions, new StackEggStatInfluence
                    {
                        // asking increases the question stat
                        ActionInfluences = new Dictionary<StackEggAction,double>() { { StackEggAction.Ask, 1.0 } },

                        StatInfluences = null,

                        IdleInfluence = -0.3
                    
                    }
                },
                {
                    StackEggStat.Answers, new StackEggStatInfluence
                    {
                        // answering increases the answers stat
                        ActionInfluences = new Dictionary<StackEggAction,double>() { { StackEggAction.Answer, 1.0 } },

                        StatInfluences = new Dictionary<StackEggStat,double?[]>()
                        {
                            // a low question count causes a decrease in answers
                            { StackEggStat.Questions, new double?[] { -1.0, -0.5, null, null, null, null } }
                        },

                        IdleInfluence = -0.3
                    }
                }
            },
            StatGoals = new Dictionary<StackEggStat, int>()
            {
                { StackEggStat.Questions, 50 },
                { StackEggStat.Answers, 50 }
            },
            NextPhaseId = Id.PublicBeta
        }; // end private beta


        public static StackEggPhase PublicBeta = new StackEggPhase
        {
            AvailableStats = new StackEggStat[] { StackEggStat.Questions, StackEggStat.Answers, StackEggStat.Users, StackEggStat.Quality },
            AvailableActions = new StackEggAction[] { StackEggAction.Ask, StackEggAction.Answer, StackEggAction.Upvote, StackEggAction.Downvote },
            StatInfluences = new Dictionary<StackEggStat, StackEggStatInfluence>()
            {
                {
                    StackEggStat.Questions, new StackEggStatInfluence
                    {
                        // asking increases the question stat
                        ActionInfluences = new Dictionary<StackEggAction,double>() { { StackEggAction.Ask, 1.0 } },

                        StatInfluences = null,

                        IdleInfluence = -0.3
                    
                    }
                },
                {
                    StackEggStat.Answers, new StackEggStatInfluence
                    {
                        // answering increases the answers stat
                        ActionInfluences = new Dictionary<StackEggAction,double>() { { StackEggAction.Answer, 1.0 } },

                        StatInfluences = new Dictionary<StackEggStat,double?[]>()
                        {
                            // A low question count causes a decrease in answers. These value are a little bit harder than in private beta
                            { StackEggStat.Questions, new double?[] { -1.0, -0.5, -0.4, null, null, null } }
                        },

                        IdleInfluence = -0.3
                    }
                },
                {
                    StackEggStat.Users, new StackEggStatInfluence
                    {
                        // upvoting increases the users stat; downvoting decreases it
                        ActionInfluences = new Dictionary<StackEggAction,double>() { { StackEggAction.Upvote, 1.0 }, { StackEggAction.Downvote, -0.5 } },

                        StatInfluences = null,

                        IdleInfluence = -0.3
                    }
                },
                {
                    StackEggStat.Quality, new StackEggStatInfluence
                    {
                        // downvoting increases the quality stat
                        ActionInfluences = new Dictionary<StackEggAction,double>() { { StackEggAction.Downvote, 1.0 } },

                        StatInfluences = null,

                        IdleInfluence = -0.3
                    
                    }
                }
            },
            StatGoals = new Dictionary<StackEggStat, int>()
            {
                { StackEggStat.Questions, 200 },
                { StackEggStat.Answers, 200 },
                { StackEggStat.Users, 200 },
                { StackEggStat.Quality, 200 }
            },
            NextPhaseId = Id.Launched
        }; // end public beta


        public static StackEggPhase Launched = new StackEggPhase
        {
            AvailableStats = new StackEggStat[] { StackEggStat.Questions, StackEggStat.Answers, StackEggStat.Users, StackEggStat.Quality, StackEggStat.Traffic },
            AvailableActions = new StackEggAction[] { StackEggAction.Ask, StackEggAction.Answer, StackEggAction.Upvote, StackEggAction.Downvote, StackEggAction.Close },
            StatInfluences = new Dictionary<StackEggStat, StackEggStatInfluence>()
            {
                {
                    StackEggStat.Questions, new StackEggStatInfluence
                    {
                        // asking increases the question stat; closing severly decreases it
                        ActionInfluences = new Dictionary<StackEggAction,double>() { { StackEggAction.Ask, 1.0 }, { StackEggAction.Close, -2.0 } },

                        StatInfluences = null,

                        IdleInfluence = -0.3
                    
                    }
                },
                {
                    StackEggStat.Answers, new StackEggStatInfluence
                    {
                        // answering increases the answers stat
                        ActionInfluences = new Dictionary<StackEggAction,double>() { { StackEggAction.Answer, 1.0 } },

                        StatInfluences = new Dictionary<StackEggStat,double?[]>()
                        {
                            // A low question count causes a decrease in answers. These value are even harder than in public beta
                            { StackEggStat.Questions, new double?[] { -1.0, -0.8, -0.6, -0.4, null, null } }
                        },

                        IdleInfluence = -0.3
                    }
                },
                {
                    StackEggStat.Users, new StackEggStatInfluence
                    {
                        // upvoting increases the users stat; downvoting decreases it
                        ActionInfluences = new Dictionary<StackEggAction,double>() { { StackEggAction.Upvote, 1.0 }, { StackEggAction.Downvote, -0.5 } },

                        StatInfluences = new Dictionary<StackEggStat,double?[]>()
                        {
                            // very high traffic brings new users
                            { StackEggStat.Traffic, new double?[] { null, null, null, -0.2, 0.0, 0.2 } }
                        },

                        IdleInfluence = -0.3
                    }
                },
                {
                    StackEggStat.Quality, new StackEggStatInfluence
                    {
                        // downvoting increases the quality stat, closing even more so
                        ActionInfluences = new Dictionary<StackEggAction,double>() { { StackEggAction.Downvote, 1.0 }, { StackEggAction.Close, 2.0 } },

                        StatInfluences = new Dictionary<StackEggStat,double?[]>()
                        {
                            // very high traffic badly impacts quality
                            { StackEggStat.Traffic, new double?[] { null, null, null, null, -0.7, -0.9 } }
                        },

                        IdleInfluence = -0.3
                    }
                },
                {
                    StackEggStat.Traffic, new StackEggStatInfluence
                    {
                        CapAtZero = true,

                        // traffic cannot be directly influenced
                        ActionInfluences = null,

                        StatInfluences = new Dictionary<StackEggStat,double?[]>()
                        {
                            // both answers and quality have to be pretty high for traffic growth
                            { StackEggStat.Quality, new double?[] { -0.5, -0.5, -0.5, -0.2, -0.1, 0.1 } },
                            { StackEggStat.Answers, new double?[] { -0.3, -0.3, -0.3, 0, 0.1, 0.3 } }
                        },

                        IdleInfluence = 0
                    }
                }
            },
            StatGoals = new Dictionary<StackEggStat, int>()
            {
                { StackEggStat.Questions, 400 },
                { StackEggStat.Answers, 400 },
                { StackEggStat.Users, 400 },
                { StackEggStat.Quality, 400 },
                { StackEggStat.Traffic, 300 }
            },
            NextPhaseId = Id.WonTheInternet
        }; // end launched

    }
}