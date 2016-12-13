angular.module("MyApp")
    .controller("MainCtrl", mainController);

mainController.$inject = ["$http", "alamodfactory"];



function mainController($http, alamodfactory) {
    var main = this;
    main.inventoryList = [];

    main.greeting = "This is only a test";

    // Populate the Inventory List from the DB
    main.getInvent = function() {
        // var userId = idToGet
        alamodfactory.getInvent()
            .then(function(returnData) {
                console.log("This is the returndata: ", returnData.data);
                main.inventoryList = returnData.data;
            }).catch(function(err) {
                console.log("This is the error: ", err);
            });
    }
    main.getInvent();

}
