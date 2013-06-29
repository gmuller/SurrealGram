define(['_', 'Backbone', 'views/app'], function(_, Backbone, AppView) {
    var App = function() {
        this.views.app = new AppView();
        this.views.app.render();
    };

    App.prototype = {
        views: {}
    };

    return App;
});
