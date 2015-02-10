TabSplitter.Views.Sidebar = Backbone.CompositeView.extend({
  template: JST['navs/sidebar'],

  initialize: function (options) {

  },

  events: {
    "click li": "removeOldActive"
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);

    return this;
  },

  removeOldActive: function (event) {
    var $target = $(event.currentTarget);
    $(".active").removeClass("active");
    $target.addClass("active");
  }

});
