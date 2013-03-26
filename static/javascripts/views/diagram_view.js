define(['templates'], function(templates) {
  var template = templates['static/templates/diagram.handlebars'];
  var DiagramView = Backbone.View.extend({
    render: function() {
      this.$el.html(template(_.extend({}, this.model.attributes)));
      this.$(".diagram").sequenceDiagram({theme: 'hand'});
      return this;
    }
  });

  return DiagramView
});
