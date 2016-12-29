angular.module("MyApp")
    .factory('alamodfactory', alamodfactory);

alamodfactory.$inject = ['$http'];


function alamodfactory($http) {

    return {
        getInvent: function() {
            return $http.get("/api/inventory");
        },

        createInvent: function(adventData) {
            return $http.post("/api/inventory", adventData);
        },
        // searchInvent: function(data) {
        //     return $http.get("/api/search" + data)
        // }
    }
}
