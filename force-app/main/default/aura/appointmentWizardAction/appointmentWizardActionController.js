({
    init : function (cmp) {
        var flow = cmp.find("flowData");
        flow.startFlow("Appointment_Wizard");
    },
    handleStatusChange : function (component, event) {
        // If the flow is finished, close the quick action
        if(event.getParam("status") === "FINISHED") {
            var dismissActionPanel = $A.get("e.force:closeQuickAction");
            dismissActionPanel.fire();
         }
     }
})