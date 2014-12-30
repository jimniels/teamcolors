<?php
// Get the page data
$file = file_get_contents('team-data.json');
$leagues = json_decode($file, true);

function convertNameToID($name) {
    $name = str_replace(" ","-",$name);
    $name = strtolower($name);
    return $name;
}

/**
 * Convert HEX to RGB
 * http://css-tricks.com/snippets/php/convert-hex-to-rgb/
 */
function hex2rgb( $colour ) {
        if ( $colour[0] == '#' ) {
                $colour = substr( $colour, 1 );
        }
        if ( strlen( $colour ) == 6 ) {
                list( $r, $g, $b ) = array( $colour[0] . $colour[1], $colour[2] . $colour[3], $colour[4] . $colour[5] );
        } elseif ( strlen( $colour ) == 3 ) {
                list( $r, $g, $b ) = array( $colour[0] . $colour[0], $colour[1] . $colour[1], $colour[2] . $colour[2] );
        } else {
                return false;
        }
        $r = hexdec( $r );
        $g = hexdec( $g );
        $b = hexdec( $b );
        //return array( 'red' => $r, 'green' => $g, 'blue' => $b );
        return "rgb($r,$g,$b)";
}

?>
<!DOCTYPE HTML>
<html>
<head>
    <title>Team Hex Codes</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!--[if lt IE 9]>
        <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
    
    <link href="http://fonts.googleapis.com/css?family=Droid+Sans:400,700" rel="stylesheet" type="text/css">

    <style>
        .highlight {
            background-color: yellow;
        }
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
        <h1 class="intro-main"><strong>Team Colors:</strong> Find and copy the color values of your favorite teams.</h1>
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
            <input type="text" placeholder="Filter by team name..." />
        </form>
    </nav>

    <section id="content">
        <ul class="leagues clearfix">
        <?php foreach ($leagues as $league => $teams) { ?>

            <li id="<?= $league ?>" class="league clearfix">
                <h2 class="league__name"><?= $league ?></h2>
                <!-- Inline block spacing
                     http://css-tricks.com/fighting-the-space-between-inline-block-elements/ -->
                <ul class="teams"><!--

                <?php foreach($teams as $team => $colors) {

                    $teamID = convertNameToId($team);

                    if($colors) {  ?>

                        --><li class="team" id="<?= $teamID ?>" data-team-id="<?= $team ?>">
                            <h3 id="<?= $teamID ?>" class="team__name" data-logo-path="img/<?= $league . '/' . $teamID ?>"><?= $team ?></h3>

                            <ul class="colors">
                                <?php foreach($colors as $x => $color) { ?>
                                    <li class="color" data-color="<?= $color ?>">
                                        <span class="color__hex">#<?= $color ?></span>
                                        <span class="color__rgb"><?= hex2rgb($color) ?></span>
                                    </li>
                                <?php } ?>
                            </ul>
                        </li><!--

                    <?php } //end if ?>
                <?php } //end $teams foreach ?>
                --></ul>
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