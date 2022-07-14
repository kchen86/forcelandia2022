import { LightningElement, api } from 'lwc';

export default class AddressPicker extends LightningElement {

    @api
    selected = false;
    
    @api
    addressId;

    @api
    accountName;
    
    @api
    street1;
    
    @api
    street2;

    @api
    city;

    @api
    state;

    @api
    zip

    @api
    country

    handleClick(event) {
        console.log("###Current Target : " + event.currentTarget.name);

        const filterEvent = new CustomEvent("addressselectionchange", {
            detail: this.addressId
        });
      
        //Raise an event
        this.dispatchEvent(filterEvent);
    }
}