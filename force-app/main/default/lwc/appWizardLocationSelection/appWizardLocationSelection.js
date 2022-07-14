import { LightningElement, wire, api } from 'lwc';

import getAddresses from "@salesforce/apex/AppointmentWizardController.getAddresses";

export default class AppWizardLocationSelection extends LightningElement {

    @api
    street;

    @api
    city;

    @api
    state;

    @api
    zip;

    @api
    country;
    
    @api
    selectedAddressId;

    addressesFound;

    connectedCallback() {
        this.findAddresses();
    }

    findAddresses() {
        getAddresses({ 
            street: this.street,
            city: this.city,
            state: this.state,
            zip: this.zip,
            country: this.country
        })
        .then(result => {
            console.log(result);
            this.addressesFound = result;
        })
    }

    handleAddressSelectionChange(event) {
        this.selectedAddressId = event.detail;
    }
   
}