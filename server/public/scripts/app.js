$(document).ready(function(){

    getData();

});

function getData(){
    $.ajax({
        type: "GET",
        url:"/data",
        success: function(data) {
            var i = -1;
            var timerID;
            console.log(data);

            startTimer(i, data.people);

            $('#left-arrow').on('click', function() {
                if (i > 0) {
                    i--;
                    emptyPeopleDiv();
                    appendPerson(data.people[i]);
                    showPerson();
                    selectButton(i);
                } else if (i = 0) {
                    emptyPeopleDiv();
                    appendPerson(data.people[i]);
                    showPerson();
                    selectButton(i);
                }
            });

            //the timer works kind of. It starts and cycles fine.
            //stops and resets OK when an arrow is pressed.
            //clicking the arrow isn't picking up the current value of i for some reason, just resetting
            //to -1 the first time then starting form there
            //the timer then works fine but hitting the arrow button keeps its own i value.
            //I don't think startTimer is updating the global value of i, but I can't get it to return the value.
            $('#right-arrow').on('click', function() {
                console.log('right arrow click i = ' + i);
                stopTimer();
                console.log('timer stopped. i = ' + i);

                if (i < 19) {
                    i++;
                    emptyPeopleDiv();
                    appendPerson(data.people[i]);
                    showPerson();
                    selectButton(i);
                    startTimer(i, data.people);
                } else if (i = 19) {
                    stopTimer();
                    emptyPeopleDiv();
                    appendPerson(data.people[i]);
                    showPerson();
                    selectButton(i);
                }

            });

            $('.btn').on('click', function() {
                var thisButton = parseInt($(this).data('id'));
                stopTimer();
                emptyPeopleDiv();
                i = (thisButton - 1);
                appendPerson(data.people[i]);
                showPerson();
                selectButton(i);
                startTimer(i, data.people);
            });

        },
        error: function() {
            console.log('ERROR: Unable to contact the server.');
        }

    });
}

function emptyPeopleDiv() {
    $('.person-hide').fadeOut('fast', function() {
        $('#people').empty();
    });
}

function appendPerson(array) {
    setTimeout(function() {
        $('#people').append('<div class = "person-hide"><img class="person-Photo" src="' + array.photoURL + '">' +
            '<p>Name: ' + array.name + '</p><p>Favorite Movie 1: ' + array.favoriteMovie1 + '</p>' +
            '<p>Favorite Movie 2: ' + array.favoriteMovie2 + '</p><p>Favorite Song: ' + array.favoriteSong + '</p>');
    }, 300);
}

function selectButton(i) {
    for (var j = 0; j < 21; j++) {
        $('#btn' + j).removeClass('btn-danger');
    }
    $('#btn' + (i + 1)).addClass('btn-danger');
}

function showPerson() {
    setTimeout(function() {
        $('.person-hide').fadeIn('fast')
    }, 400);
}


function startTimer(index, object) {
    timerID = setInterval(function () {
        if (index < 19) {
            index++;
            emptyPeopleDiv();
            appendPerson(object[index]);
            showPerson();
            selectButton(index);
        } else if (index = 19) {
            emptyPeopleDiv();
            appendPerson(object[index]);
            showPerson();
            selectButton(index);
        }
        console.log('startTimer i = ' + index); //updating fine
    }, 10000);
}

function stopTimer() {
    clearInterval(timerID);
}