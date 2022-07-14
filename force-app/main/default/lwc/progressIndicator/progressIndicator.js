import { LightningElement, api } from 'lwc';

export default class ProgressIndicator extends LightningElement {
    @api stages;
    @api currentStage;
}