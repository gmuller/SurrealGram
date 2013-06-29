require.config({
    baseUrl: 'js',
    //urlArgs: "ts="+new Date().getTime(),
    paths: {
        '_': 'lib/underscore/underscore-min',
        'Backbone': 'lib/backbone/backbone-min',
        'text': 'lib/text/text',
        'pixastic': 'pixastic'
    },
    shim: {
        '_': {
            exports: '_'
        },
        'Backbone': {
            deps: ['_'],
            exports: 'Backbone'
        },
        'app': {
            deps: ['_', 'Backbone', 'pixastic']
        }
    }
});

require(['app'],
    function(App) {
        window.app = new App();
    });