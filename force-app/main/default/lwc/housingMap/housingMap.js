import { LightningElement, wire } from 'lwc';

// Hook to Apex controller
import getHouses from "@salesforce/apex/HouseService.getRecords";

export default class HousingMap extends LightningElement {

    /**
     * @type Array<{ 
     *  location: {
     *      Street: string,
     *      City: string,
     *      State: string
     *  },
     *  title: string
     * }>
     */
    mapMarkers;
    error = undefined;

    @wire(getHouses)
    wiredHouses({ 
        error, 
        data 
    }){

        /**
         * @var fetchedData
         * @type Array<{ 
         * Address__c: string,
         * City__c: string,
         * State__c: String,
         * Name: string
         * }>
         */
        let fetchedData = data;

        if(data && !error){
            this.mapMarkers = fetchedData.map((e) => {
                return {
                    location: {
                        "Street": e.Address__c,
                        "City": e.City__c,
                        "State": e.State__c
                    },
                    title: e.Name
                }
            });
        }else {
            this.error = error;
            this.mapMarkers = undefined;
        }
    }
}