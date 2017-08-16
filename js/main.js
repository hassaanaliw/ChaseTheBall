$(document).ready(function () {

    window.getSelection().removeAllRanges();

    var sound = new Howl({
      src: ['click.mp3']
    });

    var score = 0;

    if (localStorage.getItem('score')) {
        score = parseInt(localStorage.getItem('score'));
        $(".scores").text("Score: " + score);
    }

    animateDiv();


    $("#ball").click(function () {
        sound.play();
        score += 1;
        $(".scores").text("Score: " + score);
    });

    window.onbeforeunload = function() {
        localStorage.setItem('score',score);
    };


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

    var greatest = x > y ? x : y;

    var speedModifier = 0.8;

    return Math.ceil(greatest / speedModifier);

}

function makeNewPosition() {

    // Get viewport dimensions (remove the dimension of the div)
    var h = $(window).height() - 50;
    var w = $(window).width() - 50;

    var nh = Math.floor(Math.random() * h);
    var nw = Math.floor(Math.random() * w);

    nh *= Math.floor(Math.random() * 2) === 1 ? 1 : -1;
    nw *= Math.floor(Math.random() * 2) === 1 ? 1 : -1;

    return [nh, nw];

}

