import { LightningElement, api, wire } from 'lwc';
import OWNER_ID_FIELD from '@salesforce/schema/Account.OwnerId';
import { getRecord } from 'lightning/uiRecordApi';
import getUserDetails from '@salesforce/apex/userDetails.getUserDetails';

export default class userDetails extends LightningElement {
    @api recordId;
    owner;
    endResult = [];

    @wire(getRecord, { recordId: '$recordId', fields: [OWNER_ID_FIELD] })
    wiredAccount({ error, data }) {
        if (data) {
            const ownerId = data.fields.OwnerId.value
            if (ownerId) {
                this.loadOwnerDetails(ownerId);
            }
        } else if (error) {
            console.error('Error retrieving account owner details', error);
        }
    }
    loadOwnerDetails(ownerId) {
        getUserDetails({ ownerId })
            .then(result => {
                this.owner = result;
            })
            .catch(error => {
                console.error('Error retrieving user details', error);
            });
    }
}