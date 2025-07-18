public with sharing class HouseService {

    // Enable AuraEnabled for Lightning Components
    @AuraEnabled(cacheable = true)
    public static List<House__c> getRecords() {
        try {
            // SOQL Query
            List<House__c> lstHouses = [
                SELECT 
                    Id,
                    Name,
                    Address__c,
                    State__c,
                    City__c,
                    Zip__c
                FROM
                    House__c
                WITH USER_MODE
                ORDER BY CreatedDate
                LIMIT 10
            ];

            return lstHouses;

        } catch(Exception e){
            throw new AuraHandledException(e.getMessage());
        }
    }


    public HouseService() {

    }
}