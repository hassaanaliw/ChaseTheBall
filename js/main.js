/** CATCH THE BALL by Hassaan Ali Wattoo
 * https://hassaanaliw.me :) **/


$(document).ready(function () {

    var colors = ['(119, 34, 34,0.7)', '(73, 185, 156,0.7)', '(90,66,132,0.7)'];

    //disable selection which is pretty annoying when clicking multiple times
    //is the point of the game
    window.getSelection().removeAllRanges();

    var sound = new Howl({
        src: ['click.mp3']
    });

    var score = 0;

    //if score saved from previous sessions, restore it to continue game
    if (localStorage.getItem('score')) {
        score = parseInt(localStorage.getItem('score'));
        $(".scores").text("Score: " + score);
    }

    animateDiv();


    $("#ball").click(function () {
        //play satisfying clicky sound and increment scores
        sound.play();
        score += 1;
        $(".scores").text("Score: " + score);
    });

    //save score before closing window
    window.onbeforeunload = function () {
        localStorage.setItem('score', score);
    };


    setInterval(function () {
        var color = "linear-gradient(rgba{0},rgba{0}), url(blueprint.jpg)".format(colors[Math.floor(Math.random() * colors.length)]);
        $("body").css("background", color);
        $("body").css("background-repeat","round");
    }, 10000)


});


function animateDiv() {
    var newq = makeNewPosition();
    var oldq = $('#ball').offset();
    var speed = calcSpeed([oldq.top, oldq.left], newq);

    $('#ball').animate({top: newq[0], left: newq[1]}, speed, function () {
        animateDiv();
    });

};

function calcSpeed(prev, next) {

    var x = Math.abs(prev[1] - next[1]);
    var y = Math.abs(prev[0] - next[0]);
    var speedModifier;

    var greatest = x > y ? x : y;


    if (/Mobi/i.test(navigator.userAgent) || /Android/i.test(navigator.userAgent)) {
        //increase speed on mobile devices since it's a bit easier on touch screens
        speedModifier = 1.0;
    }
    else {
        speedModifier = 0.8;
    }

    return Math.ceil(greatest / speedModifier);

}

function makeNewPosition() {

    // Get viewport dimensions (remove the dimension of the div)
    var h = $(window).height() - 50;
    var w = $(window).width() - 50;


    //get new random coords for the ball to move to
    var nh = Math.floor(Math.random() * h);
    var nw = Math.floor(Math.random() * w);

    //randomly add a negative sign to reverse the direction of motion
    nh *= Math.floor(Math.random() * 2) === 1 ? 1 : -1;
    nw *= Math.floor(Math.random() * 2) === 1 ? 1 : -1;

    return [nh, nw];

}


$.fn.nodoubletapzoom = function () {
    $(this).bind('touchstart', function preventZoom(e) {
        var t2 = e.timeStamp;
        var t1 = $(this).data('lastTouch') || t2;
        var dt = t2 - t1;
        var fingers = e.originalEvent.touches.length;
        $(this).data('lastTouch', t2);
        if (!dt || dt > 500 || fingers > 1) {
            return; // not double-tap
        }
        e.preventDefault(); // double tap - prevent the zoom
        // also synthesize click events we just swallowed up
        $(e.target).trigger('click');
    });
};
$('body').nodoubletapzoom();


if (!String.prototype.format) {
    String.prototype.format = function () {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != 'undefined'
                ? args[number]
                : match
                ;
        });
    };
}

