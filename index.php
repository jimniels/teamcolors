<?php
// Get the page data
$file = file_get_contents('team-data.json');
$leagues = json_decode($file, true);

// If the color is black or white,
// give it a class for alternative styling
function blackOrWhite($color) {
    switch (strtolower($color)) {
        case 'fff' :
        case 'ffffff' :
        case 'white' :
            return 'color-white';
            break;
        case '000' :
        case '000000' :
        case 'black' :
            return 'color-black';
            break;
    }
}
?>
<!DOCTYPE HTML>
<html>
<head>
    <title>Team Hex Codes</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <script src="js/modernizr.js"></script>
    <link href="http://fonts.googleapis.com/css?family=Droid+Sans:400,700" rel="stylesheet" type="text/css">
    <link href="css/style.css" rel="stylesheet" type="text/css" />
    <!--[if lte IE 8]>
        <link rel="stylesheet" type="text/css" href="ie.css" />
    <![endif]-->
</head>

<body>
    <header id="header">
        <p class="intro-arc"><a href="http://lab.arc90.com/">Arc90 Lab</a> + <a href="http://twitter.com/jimniels">@jimniels</a> present:</p>
        <h1 class="intro-main"><strong>Team Colors</strong>Find and copy the HEX values of your favorite team&rsquo;s colors.<br>First, choose a league:</h1>
        <img src="img/arrow.png" id="arrow" width="50" height="50" />
    </header>

    <nav role="navigation" id="nav">
        <h2 class="league-name-active"><a href="#"></a><span>&#9660;</span></h2>
        <ul class="drop-down hide">
            <?php foreach ($leagues as $league => $teams) { ?>
                <li>
                    <a href="#<?= $league ?>" id="nav-<?= $league ?>" class="league-name"><?= $league ?></a>
                </li>
            <?php } ?>
        </ul>
    </nav>


    <section id="leagues">
        <?php foreach ($leagues as $league => $teams) { ?>

            <ul id="<?= $league ?>" class="league-content clearfix">

                <?php foreach($teams as $team => $colors) {

                    $teamID = str_replace(" ","-",$team);
                    $teamID = strtolower($teamID);

                    if($colors) {  ?>

                        <li class="team">
                            <h3 id="<?= $teamID ?>" class="team-name" style="color: #<?= $colors[0] ?>"><?= $team ?></h3>

                            <ul class="colors">
                                <?php foreach($colors as $x => $color) { ?>

                                    <li style="background-color:#<?= $color ?>;" class="color <?= blackOrWhite($color) ?>">
                                        <span class="hex">#<?= $color ?></span>
                                    </li>

                                <?php } ?>
                            </ul>
                        </li>

                    <?php } //end if ?>
                <?php } //end $teams foreach ?>

            </ul>

        <?php } //end $leagues foreach?>
    </section>

    <footer id="footer">
        <a href="#" id="top"><span>&#8593;</span>Back to the top</a>
        <p>Want to add a new team or league? Want to make a correction? <a href="https://github.com/arc90/teamcolors">Find the source code on Github &raquo;</a></p>
    </footer>

    <!-- Script includes -->
    <script src="js/jquery1.8.js"></script>
    <script src="js/js.js" type="text/javascript"></script>

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