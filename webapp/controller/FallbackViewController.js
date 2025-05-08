sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel"
], function(Controller, JSONModel) {
  "use strict";
  
  /**
   * Fallback view controller that gets loaded if the main controller fails
   * Provides basic functionality to ensure something renders
   */
  return Controller.extend("converted.fallback.FallbackViewController", {
    onInit: function() {
      console.log("FallbackViewController initialized");
      
      // Create a basic model with error info
      var model = new JSONModel({
        title: "WebDynpro Conversion Preview",
        message: "This is the fallback view. The original view controller failed to initialize.",
        details: "Check the console for error messages.",
        timestamp: new Date().toLocaleString()
      });
      
      this.getView().setModel(model);
    },
    
    onAfterRendering: function() {
      console.log("FallbackViewController: View rendered");
    }
  });
});