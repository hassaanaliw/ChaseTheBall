$(document).ready(function () {

    window.getSelection().removeAllRanges();

    console.log("ready!");
    spos = $("#ball")[0].offsetTop;
    console.log($(window).height());
    var score = 0;

    animateDiv();


    $("#ball").click(function () {
        console.log("S: " + score);
        score += 1;
        $(".scores").text("Score:" + score);
    });


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

    var speedModifier = 1;

    var speed = Math.ceil(greatest / speedModifier);

    return speed;

}

function makeNewPosition(){

    // Get viewport dimensions (remove the dimension of the div)
    var h = $(window).height() - 50;
    var w = $(window).width() - 50;

    var nh = Math.floor(Math.random() * h);
    var nw = Math.floor(Math.random() * w);

    nh *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
    nw *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;

    return [nh,nw];

}