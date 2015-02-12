TabSplitter.Views.OwedTab = Backbone.CompositeView.extend({
  template: JST['tabs/owed'],

  render: function () {
    var content = this.template({
      usersTabs: this.model.userTabs()
     });
    this.$el.html(content);

    return this;
  }

});
