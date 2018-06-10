var targetscore;
var playerscore;
var winsANDlosses = [0,0];

$(document).ready(function() {
    restartValues();
    $('.btns').each(function(index,element){
        $(this).attr('power',Math.floor(Math.random() * 12)+1);
        $(this).on('click',function(){
            playerscore += parseInt($(this).attr('power'));
            $("#myscore").text(playerscore);
            var wl = winORloose(targetscore,playerscore);
            if (typeof wl == 'string') {
                $("#displaystatus").text(wl);
                $("#displaywins").text(winsANDlosses[0]);
                $("#displaylosses").text(winsANDlosses[1]);
                $(this).attr('power',Math.floor(Math.random() * 12)+1)
                restartValues();
            }
        });
    });

});

function winORloose(targetscore,playerscore) {
    if (playerscore == targetscore){
        winsANDlosses[0] += 1;
        return 'You won!';
    } else if (playerscore > targetscore) {
        winsANDlosses[1] += 1;
        return 'You lost!';
    }
}

function restartValues(){
    targetscore = Math.floor(Math.random() * (120 - 19 + 1)) + 19;
    playerscore = 0;
    $('#targetscore').text(targetscore);
    $('#myscore').text(playerscore);
}