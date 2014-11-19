define(function () {
    var main = function () {
        require(['page/main/view'], function(View) {
            new View({ el: $('body') });
        });
    };

    return {
        main: main
    }
});
