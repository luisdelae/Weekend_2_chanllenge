var i = -1;

$(document).ready(function(){


    getData();

});

function getData(){
    $.ajax({
        type: "GET",
        url:"/data",
        success: function(data) {

            var timerID;
            console.log(data);

           startTimer(data.people);

            $('#left-arrow').on('click', function() {

                stopTimer();

                if (i > 0) {
                    i--;
                    emptyPeopleDiv();
                    appendPerson(data.people[i]);
                    showPerson();
                    selectButton(i);
                    startTimer(data.people);
                } else if (i === 0) {
                    i = 19;
                    emptyPeopleDiv();
                    appendPerson(data.people[i]);
                    showPerson();
                    selectButton(i);
                    startTimer(data.people);
                }
            });

            $('#right-arrow').on('click', function() {

                stopTimer();

                if (i < 19) {
                    i++;
                    emptyPeopleDiv();
                    appendPerson(data.people[i]);
                    showPerson();
                    selectButton(i);
                    startTimer(data.people);
                } else if (i === 19) {
                    i = 0;
                    stopTimer();
                    emptyPeopleDiv();
                    appendPerson(data.people[i]);
                    showPerson();
                    selectButton(i);
                    startTimer(data.people);
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
                startTimer(data.people);
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


function startTimer(object) {
    timerID = setInterval(function () {
        if (i < 19) {
            i++;
            emptyPeopleDiv();
            appendPerson(object[i]);
            showPerson();
            selectButton(i);
        } else if (i === 19) {
            i = 0;
            emptyPeopleDiv();
            appendPerson(object[i]);
            showPerson();
            selectButton(i);
        }
    }, 10000);
}

function stopTimer() {
    clearInterval(timerID);
}