
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

        // Paint background-color for each color value
        this.$leagues.find('.color').each(function(){
            $this = $(this);
            var color = $this.attr('data-color');
            $this.css('background-color', '#' + color);
        });

        // Setup HEX/RGB color toggling
        var $intro = $('.intro-main'),
            introText = $intro.html().replace('the color', 'the <select><option value="HEX">HEX</option><option value="RGB">RGB</option></select>');
        $intro.html(introText);
        this.activeColorMode = 'HEX';

        // Create an 'all' listing 
        // In both the nav and content areas
        this.$leagues.find('.league').hide(); // Hide all leagues
        var allTeamsHtml = '',
            $teams = this.$leagues.find('.team');
        for (var i = 0; i < $teams.length; i++) {
            allTeamsHtml += $teams[i].outerHTML;
        };
        // Sort content alphabetically in 'all' listing
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

        // Load logos
        // Check if the .svg image exists,
        // if it does not, load the .png
        var svgSupport = false;
        if($('html').hasClass('svg')) {
            svgSupport = true;
        }
        this.$leagues.find('.team').each(function(){
            var $this = $(this),
                img = new Image();
            img.alt = $this.attr('data-team');
            img.className = "team__logo";
            if( svgSupport ) {
                img.src = $this.attr('data-logo') + '.svg'; // fires off loading of image
            } else {
                img.src = $this.attr('data-logo') + '.png'
            }
            $(img).prependTo($this);

            // If the svg can't be found, load the png
            img.onerror = function() {
                img.src = $this.attr('data-logo') + '.png';
                $(img).prependTo($this);
            };
            
        });
    },
};




$(document).ready(function(){
    
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
            var name = $(this).attr('data-team').toLowerCase();
            
            if(TeamColors.search.length == 0) {
                $(this).show();
                $(this).find('.team__name').html($(this).attr('data-team'));
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

    // Select color on click
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