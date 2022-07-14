public with sharing class AppointmentWizardController {
    
    @AuraEnabled
    public static List<Address__c> getAddresses(String street, String city, String state, String zip, String country){
        try {
            // Generate URL to call Google Geocoding API
            String baseEndpoint = 'https://maps.googleapis.com/maps/api/geocode/json?';
            baseEndpoint += 'key=INSERT_YOUR_KEY_HERE';
            
            String address = street + ' ' + city + ' ' + state + ' ' + zip + ' ' + country;

            baseEndpoint += '&address=' + EncodingUtil.urlEncode(address, 'UTF-8');

            // Make callout
            Http h = new Http();
            HttpRequest req = new HttpRequest();
            req.setMethod('GET');       
            req.setEndpoint(baseEndpoint);
            HttpResponse res = h.send(req);

            // Parse the response from API
            Map<String,Object> gr = (Map<String,Object>)JSON.deserializeUntyped(res.getBody());
            List<Object> results = (List<Object>)gr.get('results');
            Map<String,Object> firstResult = (Map<String,Object>)results[0]; // just taking the first one for this example
                    
            // Grab the "geometry" attribute and get lat / long
            Map<String, Object> geometry = (Map<String, Object>) firstResult.get('geometry'); 
            
            Map<String, Object> locationMap = (Map<String, Object>) geometry.get('location');
            
            Decimal latitude = (Decimal) locationMap.get('lat');
            Decimal longitude = (Decimal) locationMap.get('lng');

            // Query for addresss that are within 50 miles of the provided address
            List<Address__c> addressesFound = [SELECT Id, Account__r.Name, Street_1__c, City__c, State__c, Postal_Code__c  
                                                FROM Address__c 
                                                WHERE DISTANCE(Location__c, GEOLOCATION(:latitude,:longitude), 'mi') < 5];
            
            return addressesFound;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

}