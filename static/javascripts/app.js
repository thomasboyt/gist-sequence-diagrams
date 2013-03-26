define(['models/diagram', 'views/diagram_view', 'gist_adapter'], function(Diagram, DiagramView, gistSync) {
  var Router = Backbone.Router.extend({
    routes: {
      "diagram/:gistid": "diagramPage"
    },

    diagramPage: function(gistId) {
      var diagram = new Diagram({
        id: gistId
      });
      diagram.sync = gistSync;
      diagram.fetch();

      var view = new DiagramView({
        el: $("#container"),
        model: diagram
      });

      diagram.on("change", function() {
        view.render();
      });
    }
  });
  var router = new Router();

  Backbone.history.start()
});
