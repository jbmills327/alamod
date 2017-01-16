angular.module("MyApp")
    .factory('alamodfactory', alamodfactory);

alamodfactory.$inject = ['$http'];


function alamodfactory($http) {

    return {
        getInvent: function(category) {
            category = category ? "/" + category : " "
            return $http.get("/api/inventory" + category);
        },
        getInventOne: function(id) {
            id = id ? "/" + id : " "
            return $http.get("/api/inventory" + id);
        },

        createInvent: function(adventData) {
            return $http.post("/api/inventory", adventData);
        }

    }
}
