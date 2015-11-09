//
//  Main object for a whole area. This file is abstracted from specific implementations: it is meant to be used in any kind of area (e.g. public, admin, etc.).
//
R("app", [], function () {

  return {

    routes: {},
    dialog: ko.o(""),
    template: ko.o(""),
    panel: ko.o(""),

    go: function (model, params) {
      var cp = this.panel();
      if (cp && cp instanceof model && cp.handleParams) {
        cp.handleParams(params);
        return this;
      }
      return this.setPanel(new model(params));
    },

    /**
     * Sets the given panel as model for the main view, using the panel template.
     * @param instance of panel to set in the main view
     */
    setPanel: function (instance) {
      this.template("").disposePanel();
      return this.template(instance.template).panel(instance);
    },

    disposePanel: function () {
      var currentPanel = this.panel();
      if (currentPanel) {
        if (currentPanel.dispose)
          currentPanel.dispose();
        this.panel(void(0));
      }
      return this;
    },

    message: function (title, message) {
      return this.dialog({
        title: title,
        content: message,
        type: "generic-dialog"
      });
    },

    error: function (title, message) {
      return this.dialog({
        title: title || I.t("errors.TechnicalError"),
        content: message || I.t("errors.PerformingOperation"),
        type: "generic-dialog"
      });
    }
  };

});
