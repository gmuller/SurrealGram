require.config({
    baseUrl: 'js',
    //urlArgs: "ts="+new Date().getTime(),
    paths: {
        'jquery': "lib/jquery/jquery.min",
        'jquery-mobile': "lib/jquery-mobile-bower/js/jquery.mobile-1.3.2",
        '_': 'lib/underscore/underscore-min',
        'Backbone': 'lib/backbone/backbone-min',
        'text': 'lib/text/text',
        'pixastic': 'pixastic'
    },
    shim: {
        '_': {
            exports: '_'
        },
        'jquery-mobile': {
            deps: ['jquery'],
            exports: 'jquery-mobile'
        },
        'Backbone': {
            deps: ['_', 'jquery'],
            exports: 'Backbone'
        },
        'app': {
            deps: ['_', 'Backbone', 'pixastic']
        }
    }
});

require(['jquery', 'jquery-mobile', 'app'],
    function($, jqm, App) {
        $(document).bind("mobileinit", function () {
            $.mobile.ajaxEnabled = false;
            $.mobile.linkBindingEnabled = false;
            $.mobile.hashListeningEnabled = false;
            $.mobile.pushStateEnabled = false;

            // Remove page from DOM when it's being replaced
            $('div[data-role="page"]').live('pagehide', function (event, ui) {
                $(event.currentTarget).remove();
            });
        });
        window.app = new App();
    });