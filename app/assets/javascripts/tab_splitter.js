window.TabSplitter = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new TabSplitter.Routers.Router({ $rootEl: $('#main')});
    Backbone.history.start();
  }
};

$(document).ready(function(){
  // TabSplitter.initialize();
});
