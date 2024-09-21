class Status {

    constructor(lightSwitchPos, headlightLeverPos, hazardLightPos, isHighLowBeamToggled) {
        this.lightSwitchPos = lightSwitchPos;
        this.headlightLeverPos = headlightLeverPos;
        this.hazardLightPos = hazardLightPos;
        this.isHighLowBeamToggled = isHighLowBeamToggled;
    }

    isEqual(status) {
        return this.lightSwitchPos == status.lightSwitchPos &&
            this.headlightLeverPos == status.headlightLeverPos &&
            this.hazardLightPos == status.hazardLightPos &&
            this.isHighLowBeamToggled == status.isHighLowBeamToggled;
    }

    toggleHazardLight() {
        this.hazardLightPos = this.hazardLightPos == hazardLight.off ? hazardLight.on : hazardLight.off;
    }

    toString() {
        return `lightSwitch: ${this.lightSwitchPos}, headlightLever: ${this.headlightLeverPos}, hazardLight: ${this.hazardLightPos}, isHighLowBeamToggled: ${this.isHighLowBeamToggled}`;
    }
}