TabSplitter.Views.TabsIndex = Backbone.CompositeView.extend({
  template: JST['tabs/index'],

  initialize: function () {
    this.listenTo(this.collection, "remove sync add change:title", this.render)
  },

  render: function () {
    var content = this.template({ tabs: this.collection })
    this.$el.html(content);
    this.addSearchResults();

    return this;
  },

  addSearchResults: function () {
    var that = this;
    TabSplitter.Collections.users.fetch({
      success: function () {
        var searchView = new TabSplitter.Views.UserSearch({
          collection: TabSplitter.Collections.users
        });

        $('.search').html(searchView.render().$el);
      }
    });
  }
})
