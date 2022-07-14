({
    init: function (component, event, helper) {
        setTimeout(function(){
            var stageData = [];
            for (let step of component.get("v.stages")) {
                stageData.push([
                    'lightning:progressStep',
                    {
                        "aura:id": "step_" + step,
                        label: step,
                        value: step
                    }]
                );
            }

            var currentStep = component.get("v.currentStage");
            
            $A.createComponents(
                stageData,
                function (stages) {
                    $A.createComponents(
                        [['lightning:progressIndicator', {
                            currentStep: currentStep,
                            body: stages,
                            type: 'path'
                        }]],
                        function (indicator) {
                            component.set("v.body", indicator);
                        }
                    )
                }
            );
        }, 1);
    }
})
