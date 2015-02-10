window.TabSplitter = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new TabSplitter.Routers.Router({ $rootEl: $('#main')});
    Backbone.history.start();
    var sidebarView = new TabSplitter.Views.Sidebar();
    $('#sidebar-nav').append(sidebarView.render().$el);
  }
};

// $(document).ready(function(){
//   TabSplitter.initialize();
// });
