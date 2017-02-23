angular.module("MyApp")
    .factory('alamodfactory', alamodfactory);

alamodfactory.$inject = ['$http'];


function alamodfactory($http) {

    return {
        getInvent: function(category) {
            category = category ? "/" + category : " ";
            return $http.get("/api/inventory" + category);
        },
        getInventOne: function(id) {
            id = id ? "/" + id : " ";
            return $http.get("/api/inventory" + id);
        },

        createInvent: function(adventData) {
            return $http.post("/api/inventory", adventData);
        },

        editInvent: function(editData) {
            return $http.put("/api/inventory", editData);
        },
        deleteItem: function(id) {
            id = id ? "/" + id : " ";
            return $http.delete("/api/inventory" + id);
        },
        // These are the calls for the new listing data
        createNewListing: function(newListData) {
            return $http.post("/api/newListing", newListData);
        },
        getNewListing: function(id) {
            id = id ? "/" + id : " ";
            return $http.get("/api/newListing" + id);

        },
        editNewListing: function(editNewListingData) {
            return $http.put("/api/newListing", editNewListingData)
        },
        sendMails: function(mailData) {
            return $http.post("/sendEmail", mailData)
        }

    }
}
