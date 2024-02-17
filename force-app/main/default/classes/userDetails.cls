public class userDetails {
    @AuraEnabled(cacheable=true)
    public static User getUserDetails(Id ownerId) {
        System.debug('ownerId '+ownerId);
        return [SELECT Name , email, username, isActive FROM User WHERE Id = :ownerId];
    }
}