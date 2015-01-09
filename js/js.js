
var TeamColors = {

    // Set the defaults
    activeLeague: 'all',
    activeColorMode: 'hex',
    search: '',
    $teams: $('#content'),
    $navigation: $('#navigation'),

    init: function(){

        // Load the page's CSS
        loadCSS( "css/build/style.css" );

        // Append the "Back to Top" link
        $('body').append('<a href="#" id="top">&#8593;</a>');

        // Setup HEX/RGB color toggling
        var $intro = $('.intro-description'),
            introText = $intro.html().replace('the HEX', 'the <select><option value="hex">HEX</option><option value="rgb">RGB</option></select>');
        $intro.html(introText);
        this.activeColorMode = 'hex';            

        // Paint background-color for each color value
        this.$teams.find('.color').each(function(){
            $(this).css('background-color', $(this).attr('data-hex'));
        });
       
        // Create an 'all' listing 
        // In both the nav and content areas
        // Sort content alphabetically in 'all' listing
        $allTeams = this.$teams.find('.team').clone();
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
        this.$teams.html($allTeams);

        // Setup the navigation
        // Append the search box and convert nav <ul> into <select>
        var selectHtml = '<select><option value="all">All Leagues</option>';
        this.$navigation.find('a').each(function(){
            selectHtml += '<option value="' + $(this).attr('href').substr(1) + '">'+ $(this).text() +'</option>';
        });
        selectHtml += '</select>';
        this.$navigation.find('ul').remove();
        this.$navigation.prepend(selectHtml + '<input type="text" placeholder="Filter by team name..." class="search"/>');
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
    $('#navigation select').on('change', function(e){
        e.preventDefault();

        // Clear the search box if it's filled
        $('.search').val('');
        TeamColors.search = '';
        
        if( TeamColors.activeLeague != $(this).val() ) {
            
            // Set the active league
            TeamColors.activeLeague = $(this).val();

            // Loop over each team and hide/show depending on league filter
            TeamColors.$teams.find('.team').each(function(){
                if( TeamColors.activeLeague == $(this).attr('data-league') ) {
                    $(this).show();
                } else if(TeamColors.activeLeague == 'all') {
                    $(this).show();
                } else {
                    $(this).hide();
                }
            });

            // Trigger scroll for showing images
            $(window).trigger('scroll');
            
        }
    });

    // Search functions
    $('.search').on('keyup', function(){
        TeamColors.search = $(this).val().toLowerCase();
        
        // Filter by team name within the currently active league selection
        // Loop over them and show/hide
        TeamColors.$teams.find('.team').filter(function(){
            return TeamColors.activeLeague == 'all' || $(this).attr('data-league') == TeamColors.activeLeague;
        }).each(function(){
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

        // Trigger scroll which is bound to lazy load of images
        $(window).trigger("scroll");
    });

    // Color type changer
    $('.intro-description select').on('change', function(){
        TeamColors.activeColorMode = $(this).val().toLowerCase();
        TeamColors.$teams.find('.color').each(function(){
            console.log($(this));
            $(this).html( $(this).attr('data-' + TeamColors.activeColorMode) );
        });
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

    // Lazy load team logos
    if($('html').hasClass('svg')){
        $(".team__name").lazyload();
    }

    // Show/hide blocks (only visible on mobile)
    $('.team').on('click', function(){
        $(this).toggleClass('show');
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