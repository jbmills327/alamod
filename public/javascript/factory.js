angular.module("MyApp")
    .factory('alamodfactory', alamodfactory);

alamodfactory.$inject = ['$http'];


function alamodfactory($http) {

    return {
        getInvent: function() {
            // console.log("This is the user ID: ", userId);
            return $http.get("/api/inventory/");
        },
        // getInvent: function(userId) {
        //     console.log("This is the user ID: ", userId);
        //     return $http.get("/api/inventory/" + userId);
        // },
        createInvent: function(adventData) {
            return $http.post("/api/inventory", adventData);
        }
    }
}
