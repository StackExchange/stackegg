using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StackEgg
{
    class Program
    {
        static void Main(string[] args)
        {
            var game = new StackEggGame().Initialize();

            while (true)
            {
                if (game.CurrentPhase == null)
                {
                    switch (game.CurrentPhaseId)
                    {
                        case StackEggPhase.Id.WonTheInternet:
                            Console.WriteLine("Congratulations, your site has won the internet!");
                            break;
                        case StackEggPhase.Id.Failed:
                            Console.WriteLine("Oops, your site was shut down.");
                            break;
                    }
                    return;
                }

                var sb = new StringBuilder();
                sb.AppendFormat("{0} day{1} elapsed, your Site is ", game.DaysElapsed, game.DaysElapsed == 1 ? "" : "s");
                switch (game.CurrentPhaseId)
                {
                    case StackEggPhase.Id.PrivateBeta:
                        sb.Append("in private beta");
                        break;
                    case StackEggPhase.Id.PublicBeta:
                        sb.Append("in public beta");
                        break;
                    case StackEggPhase.Id.Launched:
                        sb.Append("fully graduated");
                        break;
                }
                sb.AppendFormat(", phase progress: {0}%", (int)(game.GetPhaseProgress() * 100));
                sb.AppendLine();
                sb.AppendLine("Site stats:");
                foreach (var stat in game.CurrentPhase.AvailableStats)
                {
                    var exact = game.Stats[stat];
                    var hearts = StackEggGame.HeartRound(exact);
                    sb.AppendFormat("  {0, -10} {1}{2}", stat, new String('#', hearts), new String('.', 4 - hearts));
                    if (StackEggGame.HeartRoundExtended(exact) < 0)
                        sb.Append(" (dangerously low!)");
                    sb.AppendLine();
                }
                if (game.ModeratorFlags > 0)
                {
                    sb.AppendLine();
                    sb.AppendLine("  Mod flags  " + game.ModeratorFlags);
                }
                    
                sb.AppendLine();
                if (game.IsFailing)
                {
                    sb.AppendLine("Your Site is on the verge of being shut down!");
                    sb.AppendLine("Only flagging for moderator attention can save it now.");
                    sb.AppendLine();
                }

                sb.AppendLine("Choose your action:");
                
                foreach (var action in game.AvailableActions())
                {
                    sb.AppendFormat("{0}: {1}", (int)action, action);
                    sb.AppendLine();
                }
                sb.AppendLine("q: Quit");

                Console.Write(sb.ToString());

                var validAction = false;
                StackEggAction chosenAction = StackEggAction.Nothing;
                
                while (!validAction)
                {
                    var s = Console.ReadLine();
                    if (s == "q" || s == "Q")
                    {
                        Console.WriteLine("Good bye.");
                        return;
                    }
                    else
                    {
                        int num;
                        if (int.TryParse(s, out num))
                        {
                            chosenAction = (StackEggAction)num;
                            if (game.ActionIsLegal(chosenAction))
                                validAction = true;
                        }
                    }
                    if (!validAction)
                        Console.WriteLine("That's not a valid action, choose again:");
                }
                Console.WriteLine();
                Console.WriteLine();
                game.AdvanceDay(chosenAction);
            }
        }
    }
}
