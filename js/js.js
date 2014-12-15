
// Create a clone of the menu, right next to original.
// var $nav = $('#navigation');
// $nav.addClass('js-original')
//     .clone()
//     .insertAfter($nav)
//     .addClass('js-sticky')
//     .removeClass('js-original')
//     .hide();

// scrollIntervalID = setInterval(stickIt, 10);

// function stickIt() {

//   var orgElementPos = $('.js-original').offset();
//   orgElementTop = orgElementPos.top;               

//   if ($(window).scrollTop() >= (orgElementTop)) {
//     // scrolled past the original position; now only show the cloned, sticky element.

//     // Cloned element should always have same left position and width as original element.     
//     orgElement = $('.js-original');
//     coordsOrgElement = orgElement.offset();
//     leftOrgElement = coordsOrgElement.left;  
//     widthOrgElement = orgElement.css('width');

//     $('.js-sticky').css('left',leftOrgElement+'px').css('top',0).css('width',widthOrgElement+'px').show();
//     $('.js-original').css('visibility','hidden');
//   } else {
//     // not scrolled past the menu; only show the original menu.
//     $('.js-sticky').hide();
//     $('.js-original').css('visibility','visible');
//   }
// }

var TeamColors = {
    activeLeague: '',
    search: '',

    $leagues: $('.leagues'),
    $leaguesNav: $('.nav-leagues'),

    init: function(){

        // Load the page's CSS
        loadCSS( "css/style.css" );

        // Append the "Back to Top" link
        $('body').append('<a href="#" id="top">&#8593;</a>');

        // Paint background-color for each hex value
        this.$leagues.find('.color').each(function(){
            $this = $(this);
            var color = $this.text();
            $this.css('background-color', '#' + color.substring(1));
        });

        // Create an 'all' listing 
        // In both the nav and content areas
        this.$leagues.find('.league').hide(); // hide all leagues
        var allTeamsHtml = '',
            $teams = this.$leagues.find('.team');
        for (var i = 0; i < $teams.length; i++) {
            allTeamsHtml += $teams[i].outerHTML;
        };
        // Sort content
        $allTeams = $(allTeamsHtml);
        $allTeams.sort(function(a,b){
            var an = a.getAttribute('data-team'),
                bn = b.getAttribute('data-team');
                
            if(an > bn) {
                return 1;
            }
            if(an < bn) {
                return -1;
            }
            return 0;
        });

        // Append everything
        this.$leagues
            .find('li')
            .first()
            .clone()
            .attr('id', 'ALL')
            .prependTo(this.$leagues)
            .show()
            .find('.teams')
            .html($allTeams);
        this.$leaguesNav
            .find('li')
            .first()
            .clone()
            .attr('id', 'nav-ALL')
            .addClass('nav-league--active')
            .prependTo(this.$leaguesNav)
            .find('.nav-league__name')
            .text('All Leagues')
            .attr('href', '#ALL');
        this.activeLeague = 'ALL';
        
        
    },
};


$(document).ready(function(){
    // Initialize the page
    TeamColors.init();

    // Navigation click handler
    $('.nav-league__name').on('click', function(e){
        e.preventDefault();
        $this = $(this);

        if( !$this.parent().hasClass('nav-league--active') ) {

            var id = $this.attr('href');
            TeamColors.activeLeague = id.substr(1);

            // add/remove active class
            $('.nav-league--active').removeClass('nav-league--active');
            $this.parent().addClass('nav-league--active');

            TeamColors.$leagues.find('.league').each(function(){
                if( TeamColors.activeLeague == $(this).attr('id') ) {
                    $(this).show();
                } else if(TeamColors.activeLeague == 'all') {
                    $(this).show();
                } else {
                    $(this).hide();
                }
            });
            
        }
    });

    // Search functions
    $('.search input').on('keyup', function(){
        TeamColors.search = $(this).val();
        
        // Find all teams within the currently active selection
        TeamColors.$leagues.find('#' + TeamColors.activeLeague + ' .team').each(function(){
            var name = $(this).attr('data-team');
            var len = TeamColors.search.length;
            if (TeamColors.search == name.substring(0,len) ) {
                $(this).show();
            } else {
                $(this).hide();
            }
        }); 
    });
});

// /**
//  * Team Images
//  * Load team images after page has loaded
//  */
// function insertImages() {

//     // check to see if team logos are already in the DOM
//     var teamLogos = $('.league-content.active .team-logo');

//     // if they're not already in the DOM, load them
//     if (teamLogos.length === 0) {

//         $('.league-content.active .team-name').each(function(){

//             var _this = $(this);
//             var teamName = _this.text();
//             var teamID = teamName.replace(/ +/g, '-').toLowerCase();
//             var league = $('.league-content.active').attr('id');

//             /**
//              * Check if the .svg image exists,
//              * if it does not, load the .png
//              */
//             var src = 'img/'+league+'/'+teamID+'.svg';
//             var img = new Image();

//             img.onload = function() {
//               // code to set the src on success
//               $('<img src="img/'+league+'/'+teamID+'.svg" alt="'+teamName+'" class="team-logo" />').insertBefore(_this);
//             };
//             img.onerror = function() {
//                 // if the svg isn't there, load the png
//                 $('<img src="img/'+league+'/'+teamID+'.png" alt="'+teamName+'" class="team-logo" />').insertBefore(_this);
//             };

//             img.src = src; // fires off loading of image

//         });
//     }

// }

// /**
//  * Replace the text in the navigation  element
//  * Pass in the active league name
//  */
// function replaceNavText(league) {
//     $('.league-name-active a').text(league);
    
//     // hide current league name in dropdown, show all the others
//     $('.drop-down li').each(function(){
//       $(this).show();
//     });
//     $('#nav-'+league).parent().hide();
// }

// /**
//  * Handle visibility of the navigation drop down
//  */
// function dropDown(){
//     var _dropDown = $('.drop-down');
//     if ( _dropDown.hasClass('hide') ) {
//         _dropDown.removeClass('hide').addClass('show');
//     } else {
//         _dropDown.removeClass('show').addClass('hide');
//     }
// }

// $(document).ready(function() {


//     // ON PAGE LOAD

//     /**
//      * Set Default League on Page Load
//      * Add a class of 'active' to the default league's nav item
//      */
//     var defaultLeague = "NFL";
//     $('#'+defaultLeague).addClass('active');
//     $('a[href="#'+defaultLeague+'"]').addClass('active');
//     replaceNavText(defaultLeague);


//     /**
//      * Check for SVG Support
//      * Modernizr will add a class of 'svg' to <html> node if it's supported
//      */
//     if ( $('html').hasClass('svg') ) {
//         insertImages();
//     }


//     // CLICK HANDLERS
//     /**
//      * Changing Leagues
//      * When the league is changed,
//      * add a class of 'active' to the navigation element
//      * add a class of 'show' to the active league <div>
//      */
//     $('.league-name').on('click', function(e){
//         e.preventDefault();

//         var leagueID = $(this).attr('href');
//         var league = $(this).text();
//         //console.log('show leage: '+leagueID);

//         // Change the active navigation
//         $('.league-name.active').removeClass('active');
//         $(this).addClass('active');
//         replaceNavText(league);
//         $('.drop-down').removeClass('show').addClass('hide');

//         // Change visibility of active content
//         $('.league-content.active').removeClass('active');
//         $('#leagues '+leagueID).addClass('active');

//         insertImages();

//     });

//     // Drop downs
//     $('.league-name-active a').on('click', function(e){
//         e.preventDefault();
//         dropDown();
//     });

//     $('.team').on('click', function() {
//       $(this).toggleClass('show');
//     });
// });