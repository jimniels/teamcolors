/**
 * Team Images
 * Load team images after page has loaded
 */
function insertImages() {

    // check to see if team logos are already in the DOM
    var teamLogos = $('.league-content.active .team-logo');

    // if they're not already in the DOM, load them
    if (teamLogos.length === 0) {

        $('.league-content.active .team-name').each(function(){

            var _this = $(this);
            var teamName = _this.text();
            var teamID = teamName.replace(/ +/g, '-').toLowerCase();
            var league = $('.league-content.active').attr('id');

            /**
             * Check if the image exists,
             * if it does load it,
             * otherwise give the team-name a class of 'no-img'
             */
            var src = 'img/'+league+'/'+teamID+'.svg';
            var img = new Image();

            img.onload = function() {
              // code to set the src on success
              $('<img src="img/'+league+'/'+teamID+'.svg" alt="'+teamName+'" class="team-logo" />').insertBefore(_this);
            };
            img.onerror = function() {
                // doesn't exist or error loading
                _this.addClass('no-img');
            };

            img.src = src; // fires off loading of image

        });
    }

}

/**
 * Replace the text in the navigation  element
 * Pass in the active league name
 */
function replaceNavText(league) {
    $('.league-name-active a').text(league);
}

/**
 * Handle visibility of the navigation drop down
 */
function dropDown(){
    var _dropDown = $('.drop-down');
    if ( _dropDown.hasClass('hide') ) {
        _dropDown.removeClass('hide').addClass('show');
    } else {
        _dropDown.removeClass('show').addClass('hide');
    }
}

$(document).ready(function() {


    // ON PAGE LOAD

    /**
     * Set Default League on Page Load
     * Add a class of 'active' to the default league's nav item
     */
    var defaultLeague = "NFL";
    $('#'+defaultLeague).addClass('active');
    $('a[href="#'+defaultLeague+'"]').addClass('active');
    replaceNavText(defaultLeague);


    /**
     * Check for SVG Support
     * Modernizr will add a class of 'svg' to <html> node if it's supported
     */
    if ( $('html').hasClass('svg') ) {
        insertImages();
    }


    // CLICK HANDLERS
    /**
     * Changing Leagues
     * When the league is changed,
     * add a class of 'active' to the navigation element
     * add a class of 'show' to the active league <div>
     */
    $('.league-name').on('click', function(e){
        e.preventDefault();

        var leagueID = $(this).attr('href');
        var league = $(this).text();
        //console.log('show leage: '+leagueID);

        // Change the active navigation
        $('.league-name.active').removeClass('active');
        $(this).addClass('active');
        replaceNavText(league);
        $('.drop-down').removeClass('show').addClass('hide');

        // Change visibility of active content
        $('.league-content.active').removeClass('active');
        $('#leagues '+leagueID).addClass('active');

        insertImages();

    });

    // Drop downs
    $('.league-name-active a').on('click', function(e){
        e.preventDefault();
        dropDown();
    });
});