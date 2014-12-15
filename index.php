<?php
// Get the page data
$file = file_get_contents('team-data.json');
$leagues = json_decode($file, true);

function convertNameToID($name) {
    $name = str_replace(" ","-",$name);
    $name = strtolower($name);
    return $name;
}

?>
<!DOCTYPE HTML>
<html>
<head>
    <title>Team Hex Codes</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <script src="js/modernizr.js"></script>
    <link href="http://fonts.googleapis.com/css?family=Droid+Sans:400,700" rel="stylesheet" type="text/css">

    <style>
        @media print {
            .hex,
            .colors li {
                box-shadow: none !important; 
                text-shadow: none !important;
            }
            .colors li {
                padding: .5em .75em;
                border: 0 !important;
                border-bottom: 1px solid #aaa !important;
            }
            .colors li:first-child {
                border-top: 1px solid #aaa !important;
            }
            #footer {
                display: none;
            }
            body:after {
                content: "Brought to you by: http://teamcolors.ar90.com";
            }
        }

    </style>
</head>

<body>
    <header id="header">
        <p class="intro-arc"><a href="http://twitter.com/jimniels">@jimniels</a> + <a href="http://lab.arc90.com/">Arc90 Lab</a> present:</p>
        <h1 class="intro-main"><strong>Team Colors:</strong> Find and copy the HEX values of your favorite team&rsquo;s colors.</h1>
    </header>

    <nav id="navigation">
        <ul class="nav-leagues">
            <?php foreach ($leagues as $league => $teams) { ?>
                <li id="nav-<?= $league ?>" class="nav-league">
                    <a href="#<?= $league ?>" class="nav-league__name"><?= $league ?></a>
                </li>
            <?php } ?>
        </ul>
        <form class="search">
            <input type="text" placeholder="Filter..." />
        </form>
    </nav>

    <section id="content">
        <ul class="leagues clearfix">
        <?php foreach ($leagues as $league => $teams) { ?>

            <li id="<?= $league ?>" class="league clearfix">
                <h2 class="league__name"><?= $league ?></h2>
                <ul class="teams">

                <?php foreach($teams as $team => $colors) {

                    $teamID = convertNameToId($team);

                    if($colors) {  ?>

                        <li class="team" id="<?= $teamID ?>" data-team="<?= $team ?>">
                            <?php /*<img src="img/<?= $league . '/' . $teamID ?>.svg" class="team-logo"/> */?>
                            <h3 id="<?= $teamID ?>" class="team__name"><?= $team ?></h3>

                            <ul class="colors">
                                <?php foreach($colors as $x => $color) { ?>

                                    <li class="color">#<?= $color ?></li>

                                <?php } ?>
                            </ul>
                        </li>

                    <?php } //end if ?>
                <?php } //end $teams foreach ?>
                </ul>
            </li>

        <?php } //end $leagues foreach?>
        </ul>
    </section>

    <footer id="footer">
        <p>Want to add a new team or league? Want to make a correction? <a href="https://github.com/arc90/teamcolors">Find the source code on Github &raquo;</a></p>
    </footer>

    <!-- Script includes -->
    <script src="js/jquery1.8.js"></script>
    <script src="js/js.js" type="text/javascript"></script>
    <script src="js/loadcss.js"></script>

    <!-- Google Analytics -->
    <script type="text/javascript">
        var _gaq = _gaq || [];
        _gaq.push(['_setAccount', 'UA-2118091-16']);
        _gaq.push(['_trackPageview']);

        (function() {
        var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
        ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
        })();
    </script>
</body>
</html>