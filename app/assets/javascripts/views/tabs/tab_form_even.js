TabSplitter.Views.TabFormEven = Backbone.CompositeView.extend({
  template: JST['tabs/form_even'],

  render: function () {
    var content = this.template({ tab: this.model })
    this.$el.html(content);

    return this;
  } 
});
