(function () {
    
    $(function () {
        var canvas = $("canvas")[0];
        var ctx = canvas.getContext("2d");
        var pixelSize = canvas.width / 32 | 0;
        var playing;
        $("#buttons button").click(function () {
            var name = $(this).data("ani");
            if (playing)
                playing.stop();
            playing = playAnimation(ANIMATIONS[name], ctx, pixelSize);
        })
    })
    
    
    var IMAGES = {
        landscape: "AAAAAAAAAAAAAAAAAAAAAADAAAAAAAAAvDADAAAA8AAoPsD8PA86DDq+6woOwg6MA6j6Do+Dg6AgDoDAoqDo6APA6AAq6Ao6PAoAAAo6Ag+AAAAAAgAAAAAKAAACAAAAAAAAAAAAAACAAAAAAAACAAAAAgAAAAAAAAAAAAAAAAA",
        a51sign: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8////////PAXVVVVVVVVDw1X/3ff1f3Ac/31d1fd1NA319ffXXddDw9f311/VX3AcX319fd/dNAXVVVVVVVVDw/////////AAAAA8PAAAAA",
        ufo: "AAAAAAAAAAAAAAAAAAAAAAw//AAAAAAAAXV1AAAAAAAsZm5AAAAAAAXVVNAAAAAA/////AAAAAAwqqOAAAAAAAw//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
        asiteisborn: "VVVVVVVVVVVVVVVVVVVVVVfV9d/9XVVVdd1VXXXVVVVXX1111XVVV1/V1dddVVVVdd1XXX/VVVVVVVVVVVVVV11X9X91fddXdXVX31ddf3VXX1fdd/1/d1VXddX3ddfVdfV/VfddX3VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVF",
        egg: "AgKAAAAAAAAgqqAAAAAAAAVVVAAAAAAAgqqKAAAAAAAoqqCAAAAAAQVVVBAAAAAA8///AAAAAAA///PAAAAAAQVVVBAAAAAAw//PAAAAAAAw//AAAAAAAAAwDAAAAAAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
        eggeyes_down: "AAAAAAAAAAA/AwPAAAAAAc1MXNAAAAAA3NzdDAAAAAA/wwPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
        eggeyes_left: "AAAAAAAAAAA/AwPAAAAAAc1MXNAAAAAAfNzXDAAAAAA/wwPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
        eggeyes_right: "AAAAAAAAAAA/AwPAAAAAAc1MXNAAAAAAXPz1DAAAAAA/wwPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
        eggeyes_halfopen: "AAAAAAAAAAAAAAAAAAAAAwPA8DAAAAAAXNzVDAAAAAA/wwPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
        upvote_on: "AACAAAAAAAAA4CAAAAAAAAg/CAAAAAAAA+/CAAAAAAA4//CAAAAAAg///CAAAAAA+///CAAAAAAqqqKAAAAAAAAAAAAAAAAAoqqqAAAAAAAoAgCAAAAAAAoAKAAAAAAAAooAAAAAAAAAoCAAAAAAAAAIAAAAAAAAAAAAAAAAAAA",
        votes_off: "AAAAAAAAAAAAgAAAAAAAAAAqAAAAAAAAAooAAAAAAAAgCoAAAAAAAAKAoAAAAAAAoqqqAAAAAAAAAAAAAAAAAAAAAAAAAAAAoqqqAAAAAAAoAgCAAAAAAAoAKAAAAAAAAooAAAAAAAAAoCAAAAAAAAAIAAAAAAAAAAAAAAAAAAA",
        cursor: "DAAAAAAAAAwDAAAAAAAAAcDAAAAAAAAAXDAAAAAAAAwVDAAAAAAAAcVDAAAAAAAAXVDAAAAAAAwV/AAAAAAAAc3AAAAAAAAAP3AAAAAAAAAwNAAAAAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
        plusone: "AAwAAAAAAAAAAPAAAAAAAADMDAAAAAAAwAwAAAAAAAw/DMAAAAAAAADADAAAAAAAwAwAAAAAAAAAw/DAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
        questionmark: "8PAAAAAAAAw/PAAAAAAAA8wDAAAAAAAAA8AAAAAAAAAwDAAAAAAAAAPAAAAAAAAAwDAAAAAAAAAAAAAAAAAAAAPAAAAAAAAAwDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
        eggeyes_up: "AAAAAAAAAAA/AwPAAAAAAc3M3NAAAAAAXNzVDAAAAAA/wwPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
        downvote_on: "AAAAAAAAAAAAgAAAAAAAAAAqAAAAAAAAAooAAAAAAAAgCoAAAAAAAAKAoAAAAAAAoqqqAAAAAAAAAAAAAAAAAgqqqCAAAAAA+///CAAAAAA+//LAAAAAAA+/vAAAAAAAA+/CAAAAAAAA+LAAAAAAAAAuAAAAAAAAAACAAAAAAAA",
        minusone: "AAwAAAAAAAAAAPAAAAAAAAAMDAAAAAAAAAwAAAAAAAw/DMAAAAAAAAAADAAAAAAAAAwAAAAAAAAAw/DAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
        flag1: "AwDPAAAAAAAA8v+wDAAAAAwva57AAAAAA8qVqOAAAAAAvqp6AAAAAA8rvqOAAAAAAvP86AAAAAAwPAwDAAAAAAPAAAAAAAAAwDAAAAAAAAA8AAAAAAAAAwDAAAAAAAAA8AAAAAAAAAAPAAAAAAAAA8AAAAAAAAAAPAAAAAAAAAA",
        flag2: "AwDA8PAAAAAA8P8qDAAAAAwv+q6AAAAAA8qmqDAAAAAAvap6AAAAAA8rWqDAAAAAAvqp/AAAAAAw/rPAAAAAAAPAPAAAAAAAwDAAAAAAAAA8AAAAAAAAAwDAAAAAAAAA8AAAAAAAAAAPAAAAAAAAA8AAAAAAAAAAPAAAAAAAAAA",
        garbage: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAgAAAAAAAo8AKAwDAAwjK/jKqwDAA/rA/ogq8AAA",
        broom_mod: "AAAAAwAAAAAAAAAAMAAAAAAAAAwPAAAAAAAAA8DAAAAAAAMw7DAAAAAAwDo+AAAAAAgfp6/VVVFAAuq+/fVVVBAwXV9/VVVVAAfVV/fVVVFA8VVV/VVVVx/fVV1fVVVVr/XVV1VVVVFu+XVVdVVVVB46VVVVVVVVAgXVVVVVVVF",
        garbage_pile: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8AAAAAAAAAALAAAAAAAAAoOAAAAAAAAwzCAAAAAAAA+vCAAAAAAAoi+AAAAAAAM/rOAAAAAAwM88KAAAAAA87jPCAAAAAA8/oiCAAAAAA",
        eggwave1: "AgKAAAAAAAAgqqAADAAAAAVVVAwMAAAAgqqKA/AAAAAoqqC8/AAAAQVVV/PAAAAA8///PAAAAAA///PAAAAAAQVVVBAAAAAAw//PAAAAAAAw//AAAAAAAAAwDAAAAAAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
        eggwave2: "AgKAAAAAAAAgqqAzMAAAAAVVVA/AAAAAgqqKwDAAAAAoqqC8AAAAAQVVV/PAAAAA8////AAAAAA///PAAAAAAQVVVBAAAAAAw//PAAAAAAAw//AAAAAAAAAwDAAAAAAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
        eggeyes_wide: "AAAAAAAAAAA/AwPAAAAAAc1MXNAAAAAA3NzdDAAAAAwVzc1AAAAAAwPA8DAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
        eggeyes_closed: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/Pz/DAAAAAA/wwPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
        help: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAz8M8wAAAAAwMDDzMAAAAA8zzwDDAAAAAzMMMAAAAAAwMPPDMAAAAAAAAAAA",
        speechbubble: "AAAAw////DAAAAADAAAADAAAAMAAAAADAAAADAAAAwAAAAwAAAAAMAAAAwAAAAwAAAAAwD///DAAAAAwMAAAAAAAAAzAAAAAAAAAwDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
        speech: "AAAAAAAAAAAAAAAAAAAAAAAAAA88PPDAAAAAAAAAAAAAAAAw8zPPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
        speechcover: "AAAAAAAAAAAAAAAAAAAAAAAAAAUVVVBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
        check_on: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAoKAAAAAAAAgAIAAAAAAAACPCAAAAAgqI8jAAAAAACgwPIAAAAAg8A/gAAAAAAI/8DCAAAAAAC/PIAAAAAAAC/gAAAAAAAACACAAAAAAAAqKAA",
        check_off: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKAAAAAAAAAoCAAAAAAAAgKAAAAAAAoAqAAAAAAAAqoCAAAAAAAAqKAAAAAAAAAqAAAAAAAAAAAAAAAAAAAAAAAA",
        house_out: "ZlVlVlVlVll2///n///qqW////3qoeWl1DAA8tConZl+AAAvrA6qqWPAAw3KgeVW5DAA8tAgXll+AAAvDAwqqWPAAw3//fWV1DAA8VlVlZl+AAAvqqqqqWPAAwXaVWVW1DAA8lVlall+AAAvqqqqqWPAAwXVWVWV1DAA8lmVlVG",
        house_in: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIiICAAAAAAAIiIAAAAAAAgIiIAAAAAAAgIiAAAAAAAAiIiAAAAAAAAiICAAAAAAAIiICAAAAAAAIiIAAAAAAAgIiIAAAAAAAoqqCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
        door1: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAoDAAAAAAAAA6AAAAAAAAAgOAAAAAAAAAoDAAAAAAAAA+AAAAAAAAAgOAAAAAAAAAoDAAAAAAAAA6AAAAAAAAAgOAAAAAAAAAoDAAAAAAAAA6AAAAAAAAAgDAAAAAAAAAMAAAAAAAAA",
        door2: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAoqDAAAAAAAAq6AAAAAAAAgqOAAAAAAAAoqDAAAAAAAAq7AAAAAAAAgqOAAAAAAAAoqDAAAAAAAAq6AAAAAAAAgqOAAAAAAAAoqDAAAAAAAAq6AAAAAAAAgqPAAAAAAAAoPAAAAAAAA",
        door3: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAoq6AAAAAAAAqqOAAAAAAAgqqDAAAAAAAoq6AAAAAAAAqqOAAAAAAAgquDAAAAAAAoq6AAAAAAAAqqOAAAAAAAgqqDAAAAAAAoq6AAAAAAAAqqOAAAAAAAgq6DAAAAAAAo+DAAAAAAA",
        door4: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAoqqOAAAAAAAqqqDAAAAAAgqq6AAAAAAAoqqOAAAAAAAqqqDAAAAAAgqq6AAAAAAAoq6OAAAAAAAqqqDAAAAAAgqq6AAAAAAAoqqOAAAAAAAqqqDAAAAAAgqq6AAAAAAAoqqOAAAAAA",
        closed: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQVVVVVVVVVA1XX1X91/9XQX3VX31dVXH0Vd11dVX11BdVXdd91fddQX1VXX1dVXH01d11ddX11B1X/1X91/9XAVVVVVVVVVBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
        dark: "//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////P",
        tear_small: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAAAAAAwNAAAAAAAAAnOAAAAAAAAA/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
        tear_large: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAAAAAAwNAAAAAAAAAcDAAAAAAAAwlDAAAAAAAAc6AAAAAAAAA8DAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
        tear_splash1: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAAAAAgwNCAAAAAAAAsDAAAAAAAA8pPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
        tear_splash2: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAIMgAAAAAAAIwOAAAAAAAAkruCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
        tear_splash3: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAoqqCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
        suitcase: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/DAAAAAAAAMADAAAAAAA8//PAAAAAAwqqqOAAAAAAsqqqDAAAAAArqq6AAAAAAwqqqOAAAAAAsqqqDAAAAAA8//PAAA",
        egggrab: "AgKAAAAAAAAgqqAAAAAAAAVVVAAAAAAAgqqKAAAAAAAoqqCAAAAAAQVVV/PAAAAA8/////AAAAA///PAzAAAAQVVVBAAAAAAw//PAAAAAAAw//AAAAAAAAAwDAAAAAAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
        goodbye: "wD8AP8DAAAADwwMMDDAAAw8MMDzwAAAAMMDzwMMAAAA8APwD/AAAAAAAAAAAAAAA8wM/MAAAAAAzMzADAAAAAwPM8wAAAAAAMMDDAAAAAAA/wwPDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
        mortarboard1: "AwPAAAAAAAAwr+AAAAAAAwrq6DAAAAAArrqrDAAAAAA/q6/AAAAAAAs/OMAAAAAAAPwDPAAAAAAAAAwDAAAAAAAAA8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
        mortarboard2: "AwPAAAAAAAAwr+AAAAAAAwrq6DAAAAAArrqrDAAAAAA/q6P/DAAAAAs/OA/DAAAAAPwDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
        mortarboard3: "AwPAAAAAAAAwr+Aw/AAAAwrq6z/DAAAArrqrDAAAAAA/q6PAAAAAAAs/OAAAAAAAAPwDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
        timetograduate: "AAAAAAAAAAAAAAAAAAAAAA8zMw8D/wDAAMMPPDADDDAADzMzDwwwAAwwMwMAMMMAAMMDM/AD8AAAAAAAAAAAAwzDM8wMM8zPDMzMzMzMMMwAP8zMz8DDPMzMzMzMzwwA8MzMP8zMM8DAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
        curtain1: "lXe5lf5lXeZ5lXe5Xe5lXWe5lX+lXe5llXe5lf5lXeZ5lXe5Xe5lXWe5lX+lXe5llXe5lf5lXeZ5lXe5Xe5lXWe5lX+lXe5llXe5lf5lXeZ5lXe5Xe5lXWe5lX+lXe5llXe5lf5lXeZ5lXe5Xe5lXWe5lX+lXe5llXe5lf5lXeJ",
        curtain2_left: "lXe5lDAAAAQ5lXe5AAAAAUe5lXOAAAAAlXe5lDAAAAQ5lXe5AAAAAUe5lXOAAAAAlnXe5AAAAAQe5lXOAAAAAkXe5lDAAAAA5lXe5AAAAAQe5lXOAAAAAkXee5AAAAAA55lXOAAAAAQee5lDAAAAA4lXe5AAAAAAe55lDAAAAAA",
        curtain2_right: "AAAAAc5lXeJAAAAAXe5lXCAAAAwlXe5lAAAAAc5lXeJAAAAAXe5lXCAAAAwlXe5lAAAAAwlXeeJAAAAAc5lXeBAAAAAXe5lXAAAAAwlXe5FAAAAAc5lXeBAAAAAc55lXAAAAAAXe55FAAAAAwlXeeBAAAAAc5lXeAAAAAAc55lH",
        curtain3_left: "5lXe5AAAAAQe5lXOAAAAAkXe5lDAAAAA55lXOAAAAAgXe5lDAAAAA4lXe5AAAAAAee5lDAAAAAgnXe5AAAAAAc5lXOAAAAAAnXe5AAAAAAw5lXOAAAAAAcee5AAAAAAA5pnOAAAAAAgue6AAAAAAA46pDAAAAAAAunOAAAAAAAA",
        curtain3_right: "AAAAAwlXe5FAAAAAc5lXeBAAAAAXe5lXAAAAAAXe55FAAAAAwlXe5BAAAAAc5lXeAAAAAAc5lnHAAAAAAXe55BAAAAAwlXe5AAAAAAwlXeOAAAAAAc5lnDAAAAAAc655AAAAAAAXe6JAAAAAAAneuCAAAAAAAnuuAAAAAAAAnuL",
        spotlight: "///////rqq6////Xpqqqq+///XVlqqqq///fVVlqqq6///VVVlqqq+//XVVVlqqq///VVVVpqq6//XVVVVpqq+//VVVVVqqq//fVVVVlqq///fVVVVqq////XVVVlq/////XVVVq//////XVVp///////XVl////////fl+///P",
        publicbeta: "AAAAAAAAAAAAUVVVVVVFAAA91dfdddBAAQ3d3dX3dAAA0X3911dFAAAd1d3dd3BAAQX93XfXXAAAUVVVVVVFAAAVf99XXXBAAQ1dXdd3VAAAU91XX3dFAAAV3d11fVBAAQ1Xfdd3VAAAUVVVVVVFAAAAAAAAAAAAAAAAAAAAAAA",
        fw1: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
        fw2: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEQAAAAAAAAAEBAAAAAAAAAAAAAAAAAAAFRBAAAAAAAAAAAAAAAAAAARAAAAAAAAAEQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
        fw3: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAEAAAAAAAAEQAAAAAAAAAEBAAAAAAAAAAAAAAAAAAQFQFAAAAAAAAAAAAAAAAAAARAAAAAAAAAEQAAAAAAAAQAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
        fw4: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAUAAAAAAAAEQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQBAFAAAAAAABAAEAAAAAAAAAAAAAAAAAAEQAAAAAAAAQAQAAAAAAAAEAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
        fw5: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQFAUBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAEAAAAAAABAAEAAAAAAEAAAEAAAAAAAAAAAAAAAAAQAQAAAAAAAAEAEAAAAAAAABABAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
        fw6: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQBAQBAAAAAABAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAEAAAAAAEAAAEAAAAAABAAABAAAAAAAAAAAAAAAAAEAEAAAAAAAABABAAAAAAAQAQAAAAAAAAAAAAAAAAAA",
        fw7: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAABAAAAAEAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAABAAAAAQAAAQAAAAAAAAAAAAAAAAAABABAAAAAAAQAQAAAAAAAAAAAAAAAAAA",
        fw8: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAEAAAAAAA",
        skyline: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAgKgAAAAAAKAoCqKAAKAoCAqACgAgCAqoiKgAKgogiKqqCIqCqKooiqqqiqoqqKqoqqqoKqqqiKqqqKqiqqqoqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqK",
        youwin: "BEAAAAAQAABRAAAAAAAAQABUQQABEREEQQQEEQARUEBEEEBBEREBBABUAVAEBRQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
    };

    var ANIMATIONS = {
        site_is_born: [9,"landscape","a51sign","ufo","egg","asiteisborn","eggeyes_halfopen","eggeyes_down","eggeyes_left","eggeyes_right",14,0,-1,14,1,-33,14,2,-34,14,3,-16,14,4,-9,14,5,17,14,6,17,14,7,32,14,8,0,4,53,0,17,8,0,3,0,8,1,3,0,8,2,3,1,16,12,0,12,1,12,2,12,2,16,15,44,15,29,6,200,5,16,53,15,44,15,29,12,3,12,3,12,4,8,3,9,4,3,2,6,200,5,15,62,6,1000,15,29,13,4,8,3,9,4,3,2,13,5,8,6,9,5,3,3,6,200,5,14,85,0,15,29,13,6,13,6,8,6,9,5,3,3,13,7,13,7,8,7,9,8,3,4,6,200,5,15,108,0,6,300,3,4,6,300,5,2,136,6,1000,14,6,4,14,5,2,8,6,9,5,0,3,3,6,500,3,5,6,500,3,6,6,1000,3,7,6,300,3,6,6,300,3,8,6,300,3,6,6,300,5,2,171,6,1000],
        upvote: [4,"votes_off","cursor","upvote_on","plusone",14,0,31,14,1,13,0,2,9,1,0,13,0,13,0,13,1,18,0,1,3,1,6,300,5,7,6,6,300,0,2,9,1,2,3,1,6,300,0,2,9,1,2,12,1,12,1,9,1,3,1,6,300,5,5,38,0,2,10,4,3,6,300,0,2,9,1,2,6,300,5,2,56,0,2,10,4,3,6,1000],
        idle_egg: [4,"egg","eggeyes_right","eggeyes_down","eggeyes_left",14,0,4,14,1,2,18,0,1,0,12,0,8,0,3,0,3,1,6,300,5,11,9,3,2,6,300,0,13,0,8,0,3,0,3,3,6,300,5,11,27,3,2,6,300,4,9],
        ask: [7,"egg","eggeyes_right","eggeyes_down","eggeyes_left","eggeyes_halfopen","questionmark","eggeyes_up",14,0,10,14,1,1,14,2,13,14,3,-10,0,18,0,1,3,0,3,1,6,300,3,2,6,300,3,3,6,300,3,2,6,600,0,3,0,3,4,6,300,3,2,6,300,5,2,34,12,1,12,3,0,18,2,3,3,5,18,0,1,3,0,3,6,6,300,5,10,48,0,3,0,3,6,6,300,0,18,2,3,3,5,18,0,1,3,0,3,6,6,300,5,3,70,3,2,6,1000],
        downvote: [4,"votes_off","cursor","downvote_on","minusone",14,0,23,14,1,-5,0,2,9,0,0,13,0,12,1,12,1,18,0,1,3,1,6,300,5,7,6,6,300,0,2,9,0,2,3,1,6,300,0,2,9,0,2,12,1,12,1,9,1,3,1,6,300,5,5,38,0,2,10,4,3,6,300,0,2,9,0,2,6,300,5,2,56],
        flag: [5,"flag1","flag2","garbage","broom_mod","garbage_pile",14,0,7,14,1,2,18,0,1,0,3,0,6,300,0,3,1,6,300,5,5,9,14,2,33,14,3,0,14,4,18,14,5,11,0,1,2,13,2,13,2,18,2,3,3,3,13,4,13,5,18,5,4,3,4,6,300,5,17,34,0,13,2,13,2,18,2,3,3,3,13,5,13,5,18,5,4,3,4,6,300,5,8,60],
        help: [5,"eggwave1","eggeyes_wide","help","eggwave2","eggeyes_halfopen",14,0,2,14,1,2,18,0,1,0,3,0,3,1,1,2,6,300,0,3,3,3,1,1,2,6,300,5,3,9,0,3,0,3,1,1,2,6,300,0,3,3,3,4,1,2,6,300,4,9],
        answer: [7,"egg","eggeyes_down","speech","speechcover","speechbubble","check_off","check_on",14,0,1,14,1,-13,14,2,1,14,3,2,14,4,1,14,5,1,4,56,0,18,2,3,3,0,3,1,18,0,1,3,2,8,4,3,3,12,1,12,1,18,5,1,3,3,13,1,13,1,18,0,1,3,4,16,15,20,6,600,12,3,12,1,12,1,15,20,6,300,5,6,60,6,300,12,4,15,20,6,100,5,11,75,12,5,15,20,6,100,5,11,84,13,2,13,2,13,0,13,4,13,5,15,20,6,300,5,11,93,6,600,1,5,6,600,1,6,6,1200],
        close: [10,"house_in","door1","egg","eggeyes_down","door4","house_out","eggeyes_left","door2","door3","closed",14,0,20,14,1,4,9,1,4,30,0,1,0,1,1,3,2,16,0,1,0,3,2,3,3,1,4,1,5,16,13,0,8,0,15,10,3,6,1,5,6,300,5,10,30,13,0,8,0,15,10,3,3,1,5,6,300,5,4,45,6,900,12,0,8,0,15,10,3,3,1,5,6,300,5,3,62,0,1,0,3,2,3,3,1,7,1,5,6,300,0,1,0,3,2,3,3,1,8,1,5,6,300,0,1,0,3,2,3,3,1,4,1,5,6,300,15,18,6,100,1,9,6,200,5,3,116,6,900],
        cry: [9,"egg","eggeyes_closed","eggeyes_down","eggeyes_halfopen","tear_small","tear_large","tear_splash1","tear_splash2","tear_splash3",4,20,0,2,10,1,0,5,8,15,2,10,0,1,16,2,10,1,2,16,0,2,10,1,0,2,10,1,2,6,1200,0,2,10,1,0,2,10,1,3,6,600,0,2,10,1,0,2,10,1,1,6,1200,14,0,1,14,1,-1,18,0,1,15,2,3,4,6,200,12,1,9,1,15,2,3,5,6,200,5,5,68,12,1,9,1,15,2,3,6,6,200,12,1,9,1,15,2,3,7,6,200,15,2,3,8,6,200,15,2,6,400,4,53],
        goodbye: [16,"landscape","suitcase","egg","egggrab","eggeyes_down","eggeyes_right","eggeyes_closed","tear_small","tear_large","tear_splash1","tear_splash2","tear_splash3","eggwave2","eggwave1","eggeyes_left","goodbye",14,0,-10,14,1,1,14,2,5,14,3,0,14,4,-14,14,5,2,4,56,0,2,0,-2,0,18,2,3,3,1,16,18,0,1,19,4,43,3,2,12,4,4,48,14,4,1000,3,3,16,15,20,15,31,3,4,16,15,20,6,1000,15,20,12,0,18,0,1,3,2,3,5,6,300,5,14,60,14,6,-4,14,7,-1,15,20,15,31,3,4,6,1000,15,20,15,31,3,6,6,300,19,5,82,13,5,18,6,7,3,7,6,200,15,20,18,0,1,15,31,3,6,18,6,7,3,8,12,7,15,49,18,6,7,3,8,6,200,5,5,124,12,7,15,49,18,6,7,3,9,6,200,12,7,18,6,7,15,49,18,6,7,3,10,6,200,15,49,18,6,7,3,11,6,300,15,49,5,1,179,4,220,15,20,18,0,1,3,12,3,4,6,300,15,20,18,0,1,3,13,3,4,6,300,5,3,179,6,300,15,20,18,0,1,3,3,3,4,6,300,5,1,76,13,0,13,2,15,49,3,14,6,300,5,28,220,14,8,0,14,9,17,14,10,0,13,9,13,10,13,10,0,18,8,10,3,0,18,8,9,3,15,6,300,5,12,242],
        graduate: [9,"timetograduate","eggwave1","eggeyes_down","mortarboard1","eggeyes_right","eggwave2","eggeyes_up","mortarboard2","mortarboard3",0,1,0,6,400,0,6,200,5,2,0,1,0,6,800,14,0,3,14,1,3,14,2,17,14,3,1,0,2,3,3,1,2,3,3,2,2,17,2,3,6,900,0,2,3,3,1,2,3,3,4,2,17,2,3,6,900,0,2,3,3,5,2,3,3,4,2,17,0,3,12,1,18,0,1,0,3,5,3,6,5,1,87,13,2,12,0,18,2,3,3,7,6,200,5,8,70,18,0,1,0,3,1,3,6,5,1,112,13,2,12,3,18,2,3,3,8,6,200,5,11,97,13,1,18,0,1,0,3,1,3,6,13,3,18,2,3,3,7,6,300,13,1,18,0,1,0,3,1,3,6,13,3,18,2,3,3,3,6,300,5,5,141,0,18,0,1,3,5,3,2,18,2,3,3,3,6,300,0,18,0,1,3,1,3,2,18,2,3,3,3,6,300,5,3,163],
        public_beta: [13,"dark","curtain2_left","curtain2_right","curtain3_left","curtain3_right","curtain1","publicbeta","spotlight","egg","eggeyes_up","eggeyes_down","eggwave1","eggwave2",14,0,1,14,1,-1,4,36,13,0,12,1,1,0,8,0,3,1,8,1,3,2,16,13,0,12,1,8,0,3,3,8,1,3,4,16,1,5,6,300,1,6,6,300,5,2,36,6,600,15,8,6,300,5,3,49,12,0,12,0,13,1,13,1,1,0,15,23,6,300,5,6,64,1,0,1,7,2,9,2,8,2,9,2,9,15,23,6,300,5,2,73,1,0,1,7,2,9,2,8,2,9,2,10,15,23,6,300,5,4,92,1,0,1,7,2,9,2,11,2,9,2,10,6,300,1,0,1,7,2,9,2,12,2,9,2,10,6,300,5,4,111],
        you_win: [11,"skyline","youwin","dark","fw1","fw6","fw2","fw7","fw3","fw8","fw4","fw5",14,0,-4,14,1,-4,14,2,10,14,3,-2,14,4,32,14,5,0,14,6,32,4,69,14,4,32,13,4,19,2,26,20,2,4,16,14,4,0,18,5,4,3,0,18,6,4,3,0,2,0,9,1,5,1,68,13,5,13,6,5,31,68,14,5,0,14,6,32,16,1,2,18,0,1,3,3,18,2,3,3,4,15,35,6,200,1,2,18,0,1,3,5,18,2,3,3,6,15,35,6,200,1,2,18,0,1,3,7,18,2,3,3,8,15,35,6,200,15,23,1,2,18,0,1,3,9,18,2,3,3,3,15,35,6,200,1,2,18,0,1,3,10,18,2,3,3,5,15,35,6,200,1,2,18,0,1,3,4,18,2,3,3,7,15,35,6,200,1,2,18,0,1,3,6,18,2,3,3,9,15,35,6,200,1,2,18,0,1,3,8,18,2,3,3,10,15,35,6,200,14,0,4,14,1,-3,5,1,69,14,0,-4,14,1,-4,4,69]
    };


    var COMMANDS = {
        Clear: 0,
        Pic: 1,
        PicPos: 2,
        PicXY: 3,
        Goto: 4,
        GotoTimes: 5,
        Wait: 6,
        Restart: 7,
        SetX: 8,
        SetY: 9,
        GetX: 10,
        GetY: 11,
        Inc: 12,
        Dec: 13,
        Set: 14,
        Call: 15,
        Return: 16,
        ClearXY: 17,
        SetXY: 18,
        GotoTimesVar: 19,
        SetVar: 20
    };
    
    function playAnimation(ani, ctx, pixelSize) {
        
        var pointer = 0;
        var gotocounts = {};
        var stopped = false;
        var img;
        var varX = 0, varY = 0;
        var vars = [];
        var stack = [];

        var images = [];
        var imagecount = next();
        for (var i = 0; i < imagecount; i++) {
            img = new Image();
            img.deserialize(IMAGES[next()]);
            images.push(img);
        }
        var headersize = imagecount + 1;
        step();

        function next() {
            var v = ani[pointer];
            pointer++;
            return v;
        }
        function step() {
            if (stopped)
                return;
            var wait = 0;
            
            while (wait <= 0 && pointer < ani.length) {
                var cmd = next();
                var x = 0, y = 0;
                
                switch (cmd) {
                    case COMMANDS.Clear:
                        ctx.clearRect(0, 0, 32*pixelSize, 16*pixelSize);
                        break;
                    case COMMANDS.PicPos:
                    case COMMANDS.PicXY:
                        if (cmd == COMMANDS.PicPos) {
                            x = next();
                            y = next();
                        } else {
                            x = varX;
                            y = varY;
                        }
                        // intentional fallthrough
                    case COMMANDS.Pic:
                        images[next()].toCanvas(ctx, x, y, pixelSize, false, true);
                        break;
                    case COMMANDS.Goto:
                        pointer = next() + headersize;
                        break;
                    case COMMANDS.GotoTimes:
                    case COMMANDS.GotoTimesVar:
                        var p = pointer;
                        if (p in gotocounts) {
                            gotocounts[p]--;
                            next(); //ignore
                        } else {
                            if (cmd === COMMANDS.GotoTimesVar)
                                gotocounts[p] = vars[next()];
                            else
                                gotocounts[p] = next();
                        }
                        if (gotocounts[p] > 0)
                            pointer = next() + headersize;
                        else {
                            delete gotocounts[p];
                            next(); // ignore;
                        }
                        break;
                    case COMMANDS.Wait:
                        wait = next();
                        break;
                    case COMMANDS.Restart:
                        gotocounts = {};
                        pointer = headersize;
                        break;
                    case COMMANDS.GetX:
                        vars[next()] = varX;
                        break;
                    case COMMANDS.GetY:
                        vars[next()] = varY;
                        break;
                    case COMMANDS.SetX:
                        varX = vars[next()];
                        break;
                    case COMMANDS.SetY:
                        varY = vars[next()];
                        break;
                    case COMMANDS.SetXY:
                        varX = vars[next()];
                        varY = vars[next()];
                        break;
                    case COMMANDS.SetVar:
                        var target = next();
                        vars[target] = vars[next()];
                        break;
                    case COMMANDS.Inc:
                        vars[next()]++;
                        break;
                    case COMMANDS.Dec:
                        vars[next()]--;
                        break;
                    case COMMANDS.Set:
                        var valnum = next();
                        vars[valnum] = next();
                        break;
                    case COMMANDS.Call:
                        if (stack.length > 10)
                            throw "stack overflow"
                        var target = next();
                        stack.push(pointer);
                        pointer = target + headersize;
                        break;
                    case COMMANDS.Return:
                        if (stack.length === 0)
                            throw "stack underflow"
                        pointer = stack.pop();
                        break;
                    case COMMANDS.ClearXY:
                        varX = varY = 0;
                        break;
                }
            }
            if (wait > 0)
                setTimeout(step, wait);
        }
        return { stop: function () { stopped = true; }};
    }

    function Image() {
        this.pixmap = [];
    }
    var BASE64CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    function base64twobit() {
        var pending = [];
        var s = [];
        function append(n) {
            pending.push(n & 3);
            if (pending.length === 3)
                processPending();
        }
        function processPending() {
            var v = pending[0] + 4 * pending[1] + 16 * pending[2];
            s.push(BASE64CHARS.charAt(v));
            pending = [];
        }
        function finalize() {
            while (pending.length)
                append(0);
            return s.join("");
        }
        return { append: append, finalize: finalize };
    }
    
    Image.prototype.pix = function (x, y, val) {
        if (arguments.length < 3) {
            if (x < 0 || x >= 32 || y < 0 || y >= 16)
                return undefined;
            if (!this.pixmap[y])
                return undefined;
            return this.pixmap[y][x];
        }
        if (x < 0 || x >= 32 || y < 0 || y >= 16)
            return this;
        this.pixmap[y] = this.pixmap[y] || [];
        this.pixmap[y][x] = val;
        return this;
    }
    Image.prototype.serialize = function () {
        var b = base64twobit();
        for (var y = 0; y < 16; y++) {
            for (var x = 0; x < 32; x++) {
                var pix = this.pix(x, y);
                if (COL.isTransparent(pix))
                    b.append(0);
                else
                    b.append(pix + 1);
            }
        }
        return b.finalize();
    }
    Image.prototype.deserialize = function (s) {
        var x = 0, y = 0;
        var that = this;
        function next(v) {
            v = v & 3;
            if (v === 0)
                that.pix(x, y, COL.transparent);
            else
                that.pix(x, y, v - 1);
            x++;
            if (x == 32) {
                x = 0;
                y++;
            }
        }
        for (var c = 0; c < s.length; c++) {
            var char = BASE64CHARS.indexOf(s.charAt(c));
            next(char);
            next(char >> 2)
            next(char >> 4)
        }
    }
    var RGB_low = [157, 179, 154];
    var RGB_high = [22, 44, 61];
    Image.prototype.toCanvas = function(ctx, dx, dy, pixelSize, drawTransparent, lightIsClear, noGap) {
        dx = dx || 0;
        dy = dy || 0;
        if (Math.abs(dx) >= 32 || Math.abs(dy) >= 16)
            return;
        var minx = Math.min(Math.max(dx, 0), 31);
        var maxx = Math.min(Math.max(dx + 31, 0), 31);
        var miny = Math.min(Math.max(dy, 0), 15);
        var maxy = Math.min(Math.max(dy + 15, 0), 15);
        var pixmap = this.pixmap;
        var py, px, row, pixval, col;
        var gap = noGap ? 0 : Math.min(.5, pixelSize / 20);
        for (var cy = miny; cy <= maxy; cy++) {
            py = cy - dy;
            row = pixmap[py];
            for (var cx = minx; cx <= maxx; cx++) {
                px = cx - dx;
                if (row)
                    pixval = row[px];
                else
                    pixval = undefined;
                if (COL.isTransparent(pixval)) {
                    if (!drawTransparent)
                        continue;
                    ctx.fillStyle = "rgb(" + RGB_low.join(",") + ")";
                    ctx.fillRect(cx * pixelSize, cy * pixelSize, pixelSize, pixelSize);
                } else if (pixval === COL.light && lightIsClear) {
                    ctx.clearRect(cx * pixelSize, cy * pixelSize, pixelSize, pixelSize);
                } else {
                    col = [];
                    for (var i = 0; i < 3; i++) {
                        col.push(Math.round(RGB_low[i] + pixval * (RGB_high[i] - RGB_low[i]) / 2));
                    }
                    ctx.fillStyle = "rgb(" + col.join(",") + ")";
                    ctx.clearRect(cx * pixelSize, cy * pixelSize, pixelSize, pixelSize);
                    ctx.fillRect(cx * pixelSize+gap, cy * pixelSize+gap, pixelSize-2*gap, pixelSize-2*gap);
                }
            }
        }
    }
    var COL = {
        transparent: undefined,
        light: 0,
        medium: 1,
        dark: 2,
        isTransparent: function (v) { return v == null; /* null or undefined */ },
        RGB_low: RGB_low,
        RGB_high: RGB_high
    };
    
})();