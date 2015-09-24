import React from 'react';
import App from './components/App';
import teamData from '../../assets/data/team-colors';

React.render(
    <App
      teams={teamData.teams}
      leagues={teamData.leagues}
      colors={teamData.colors}
      threshold={20}
      initialColor={'hex'}
    />,
    document.getElementById('content')
);
/*
    Page interactions

var TeamColors = {

    // Set the defaults
    activeLeague: 'all',
    activeColor: 'hex',
    search: '',
    $teams: $('.team'),
    $navigation: $('#navigation'),

    // Initialize the view
    init: function(){

        // Load the page's CSS
        loadCSS("assets/styles/styles.css");

        // Append the "Back to Top" link
        $('body').append('<a href="#" id="top">&#8593;</a>');

        // Paint background-color for each color value
        this.$teams.find('.color').each(function(){
            $(this).css('background-color', $(this).attr('data-bg-color'));
        });

        // Create an 'all' listing
        // In both the nav and content areas
        // Sort content alphabetically in 'all' listing
        //$allTeams = this.$teams.clone();
        //console.log($allTeams);
        this.$teams.sort(function(a,b){
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
        $('#content')
            .empty()
            .append(this.$teams)
            .wrapInner('<ul class="teams"></ul>');

        // Setup leauge/color toggling
        // Convert the nav <ul> into <select>
        var selectHtml = '<label for="select-league">Teams:</label><select id="select-league"><option value="all">All</option><optgroup label="By League">';
        this.$navigation.find('a').each(function(){
            selectHtml += '<option value="' + $(this).attr('href').substr(1) + '">'+ $(this).text() +'</option>';
        });
        selectHtml += '</optgroup></select>';
        // Create color <select>
        var colorHtml = '<label for="select-color">Colors:</label><select id="select-color"><option value="hex">HEX</option><option value="rgb">RGB</option><option value="cmyk">CMYK</option><option value="pms">Pantone</option></select>';
        // Append it all to DOM with a search box
        this.$navigation.find('ul').remove();
        this.$navigation.prepend(selectHtml + colorHtml + '<input type="text" placeholder="Filter by team name..." class="search"/>');

        // Render it
        this.render();
    },

    render: function(){
        this.$teams.each(function(){

            var teamLeague = $(this).attr('data-league'),
                teamColors = $(this).attr('data-colors'),
                show = false;

            // Show/hide teams based on filter criteria
            if(
                (TeamColors.activeLeague == 'all' || TeamColors.activeLeague == teamLeague) &&
                teamColors.indexOf(TeamColors.activeColor) != -1
            ) {
                // show/hide colors
                $(this).find('.color').each(function(){
                    if($(this).hasClass(TeamColors.activeColor)) {
                        $(this).show();
                    } else {
                        $(this).hide();
                    }
                });
                // Show team
                $(this).show();
            } else {
                $(this).hide();
            }

            // Trigger scroll for showing images
            $(window).trigger('scroll');

        });
    }
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
    $('#select-league').on('change', function(e){
        e.preventDefault();

        // Set the active league
        TeamColors.activeLeague = $(this).val();

        // If '.show' exists (expanded team view on mobile)
        // Collapse the team by removing the class
        if( $('.show').length > 0 ) {
            $('.show').removeClass('show');
        }

        // If the search field is not empty (user has a filtered selection)
        // Reset the search field
        if( $('.search').val() !== '' ) {
            $('.search').val('');
            TeamColors.search = '';

            // Reset the team name 'highlight' for any teams that have it
            TeamColors.$teams.find('.highlight').each(function(){
                $(this).parent().html( $(this).parents('.team').attr('data-team') );
            });
        }

        // Render it!
        TeamColors.render();
    });

    // Search functions
    $('.search').on('keyup', function(){
        TeamColors.search = $(this).val().toLowerCase();

        // Filter by team name within the currently active league selection
        // Loop over them and show/hide
        TeamColors.$teams.filter(function(){
            return TeamColors.activeLeague == 'all' || $(this).attr('data-league') == TeamColors.activeLeague;
        }).each(function(){
            var name = $(this).attr('data-team').toLowerCase();

            if(TeamColors.search.length === 0) {
                $(this).show();
                $(this).find('.team-name').html($(this).attr('data-team'));
            }
            else if(name.indexOf(TeamColors.search) != -1) {
                $(this).show();
                addSearchHighlight($(this), name);
            } else {
                $(this).hide();
            }
        });

        // Trigger scroll which is bound to lazy load of images
        $(window).trigger("scroll");
    });

    // Color type changer
    $('#select-color').on('change', function(){
        TeamColors.activeColor = $(this).val().toLowerCase();
        TeamColors.render();
    });

    // Select color value on click
    // http://stackoverflow.com/questions/6139107/programatically-select-text-in-a-contenteditable-html-element
    $('.color').on('click', function(){
        var el = $(this);
        el = el.context;

        var range = document.createRange();
        range.selectNodeContents(el);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    });

    // Show/hide blocks (only visible on mobile)
    $('.team').on('click', function(){
        $(this).toggleClass('show');
    });

    // Lazy load team logos
    if($('html').hasClass('svg')){
        $(".team-name").lazyload({
            threshold : 200,
            data_attribute : "logo-url",
            skip_invisible : true
        });
    }
});

function addSearchHighlight($el) {
    var $teamName = $el.find('.team-name');
    var name = $teamName.text().toLowerCase();
    var highlight = '<span class="highlight">' + TeamColors.search + '</span>';
    newName = name.replace(TeamColors.search, highlight);
    $teamName.html(newName);

    // Array method
    // var $teamName = $el.find('.team-name');
    // var name = $teamName.text().toLowerCase();
    // var matchPosition = name.indexOf(TeamColors.search.toLowerCase());
    // if(matchPosition >= 0) {
    //     var highlight = $teamName.text().split('');
    //     highlight.splice(matchPosition, TeamColors.search.length, '<span class="y">'+TeamColors.search+'</span>');
    //     $teamName.html(highlight.join(''));
    // }
}
*/
