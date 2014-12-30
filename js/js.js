
var TeamColors = {
    activeLeague: '',
    activeColorMode: '',
    search: '',

    $leagues: $('.leagues'),
    $leaguesNav: $('.nav-leagues'),

    init: function(){

        // Load the page's CSS
        loadCSS( "css/style.css" );

        // Append the "Back to Top" link
        $('body').append('<a href="#" id="top">&#8593;</a>');

        // Setup HEX/RGB color toggling
        var $intro = $('.intro-main'),
            introText = $intro.html().replace('the color', 'the <select><option value="HEX">HEX</option><option value="RGB">RGB</option></select>');
        $intro.html(introText);
        this.activeColorMode = 'HEX';            

        // Paint background-color for each color value
        this.$leagues.find('.color').each(function(){
            $(this).css('background-color', '#' + $(this).attr('data-color'));
        });

        // Set logos as background images
        // use double background image declaration for png fallback
        // http://css-tricks.com/using-svg/
        if($('html').hasClass('svg')){
            this.$leagues.find('.team__name').each(function(){
                var logoPath = $(this).attr('data-logo-path');
                var vals = {
                    'background-image': 'url(' + logoPath + '.png)',
                    'background-image': 'url(' + logoPath + '.svg), none'
                }
                $(this).css(vals);
            });
        }
       
        // Create an 'all' listing 
        // In both the nav and content areas
        // Sort content alphabetically in 'all' listing
        $allTeams = this.$leagues.find('.team').clone();
        $allTeams.sort(function(a,b){
            var an = a.getAttribute('data-team-id'),
                bn = b.getAttribute('data-team-id');
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
            .css('display', 'block')
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

    // Test for SVG support
    // Used to test whether or not to display the team logo
    // https://github.com/Modernizr/Modernizr/issues/687
    // https://github.com/Modernizr/Modernizr/blob/master/feature-detects/svg/asimg.js    
    if(document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1")) {
        $('html').addClass('svg');
    }

    // Initialize the page
    TeamColors.init();

    // Navigation click handler
    $('.nav-league__name').on('click', function(e){
        e.preventDefault();
        $this = $(this);

        // Clear the search box if it's filled
        $('.search input').val('');

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
        TeamColors.search = $(this).val().toLowerCase();
        
        // Find all teams within the currently active selection
        TeamColors.$leagues.find('#' + TeamColors.activeLeague + ' .team').each(function(){
            var name = $(this).attr('data-team-id').toLowerCase();
            
            if(TeamColors.search.length == 0) {
                $(this).show();
                $(this).find('.team__name').html($(this).attr('data-team-id'));
            }
            else if(name.indexOf(TeamColors.search) != -1) {
                $(this).show();
                searchHighlight($(this), name);
            } else {
                $(this).hide();
            }
        }); 
    });

    // Color type changer
    $('.intro-main select').on('change', function(){
        TeamColors.$leagues.toggleClass('leagues--rgb'); 
        TeamColors.activeColorMode = $(this).val();
    });

    // Select color value on click
    // http://stackoverflow.com/questions/6139107/programatically-select-text-in-a-contenteditable-html-element
    $('.color').on('click', function(){
        var el = $(this).find('.color__' + TeamColors.activeColorMode);
        el = el['context'];

        var range = document.createRange();
        range.selectNodeContents(el);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    });
});



function searchHighlight($el) {
    var $teamName = $el.find('.team__name');
    var name = $teamName.text().toLowerCase();  
    var highlight = '<span class="highlight">' + TeamColors.search + '</span>';
    newName = name.replace(TeamColors.search, highlight); 
    $teamName.html(newName); 

    // Array method 
    // var $teamName = $el.find('.team__name');
    // var name = $teamName.text().toLowerCase();  
    // var matchPosition = name.indexOf(TeamColors.search.toLowerCase());
    // if(matchPosition >= 0) {
    //     var highlight = $teamName.text().split('');
    //     highlight.splice(matchPosition, TeamColors.search.length, '<span class="y">'+TeamColors.search+'</span>');
    //     $teamName.html(highlight.join(''));
    // }
}