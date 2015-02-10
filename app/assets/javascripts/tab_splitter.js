window.TabSplitter = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    // var sidebarView = new TabSplitter.Views.Sidebar();
    // $('#sidebar-nav').append(sidebarView.render().$el);
    new TabSplitter.Routers.Router({ $rootEl: $('#main') });
    Backbone.history.start();
  }
};

$(document).ready(function(){
  $('#tabsTable').dataTable()
  // TabSplitter.initialize();
});
