+function($) {
    var list = $('#sidebar');

    $("h1").each(function() {
        $(this).prepend('<a name="' + $(this).text() + '"></a>');
        $(list).append('<li><a href="#' + $(this).text() + '">' +  $(this).text() + '</a></li>');
    });
});
