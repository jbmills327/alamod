angular.module("MyApp")
    .controller("MainCtrl", mainController);

// angular.module("MyApp")
//     .config(myRouter);

// myRouter.$inject = ["$routeProvider"];
mainController.$inject = ["$http", "alamodfactory"];


// This is the function that controls where we hop during the routing process
// function myRouter($routeProvider) {
//     $routeProvider
//         .when("/inventoryZoom", {
//             templateUrl: "./html/inventoryZoom.html"
//         })
//
// }


function mainController($http, alamodfactory) {
    var main = this;
    main.id = "";
    // main.editedItem = {};
    main.zoomPhoto = "";
    main.removeThatShit = "";
    main.newCarouselImages = [];
    main.showInventoryForm = false;
    main.showMyEdit = true;
    main.newImages = [];
    main.editedImages = "";
    main.editItem = {};
    main.search = "";
    main.newInvent = {
        "name": "",
        "period": "",
        "description": "",
        "price": "",
        "condition": "",
        "measurements": {
            "width": "",
            "height": "",
            "depth": "",
            "diameter": "",
        },
        "numOfItems": "",
        "imageUrl": [],
        "category": "",
    };
    main.inventoryList = [];
    main.creators = [
        "Yaakov Agam",
        "Alessandro Albrizzi",
        "Architectural Pottery",
        "Fontana Arte",
        "Arteluce",
        "Sergio Asti",
        "Gas Aplenty",
        "Milo Baughman",
        "Brent Bennet",
        "Breton",
        "Paolo Buffa",
        "Chapman",
        "Raul Coronel",
        "David Cressey",
        "Curtis Jere",
        "D.I.A. Design Institute of America",
        "Del Campo",
        "Drylund",
        "Dunbar",
        "Charles Eames",
        "Paul Evans",
        "Garouste et Bonetti",
        "Frank Gehry",
        "General Electric",
        "Milton H. Greene",
        "Grosfeld House",
        "Guillermo et Chambray",
        "Gary Gutterman",
        "Charles Hollis Jones",
        "Robert Josten",
        "Kittinger",
        "Florence Knoll",
        "Koch and Lowry",
        "Cesare Lacca",
        "Percival Lafer",
        "Victoria Littlejohn",
        "Maitland-Smith",
        "Angelo Mangiarotti",
        "Mastercraft",
        "Phyllis Morris",
        "George Nelson",
        "Arne Norell",
        "Pace Collection",
        "Pierre Paulin",
        "Warren Platner",
        "Gio Ponti",
        "Jens Harald Quistgaard",
        "Raymor",
        "Willy Rizzo",
        "Rougier",
        "Renzo Rutili",
        "Victor Salmones",
        "Tobia & Afra Scarpa",
        "Karl Springer",
        "Steel case",
        "Ilmari Tapiovaara",
        "Aldo Tura",
        "Ludwig Mies van der Rohe",
        "Yvaral (Jean-Pierre Vasarely)",
        "Venini",
        "Vistosi",
        "Hans Wegner",
        "Bjorn Wiinblad"
    ];
    main.categories = [
        "Seating",
        "Lighting",
        "Case Pieces and Storage",
        "Tables",
        "Mirrors",
        "Folk Art",
        "Asian Art and Furniture",
        "Rug and Carpets",
        "Serveware, Ceramics, Silver and Glass",
        "Wall Decorations",
        "Building and Garden Elements",
        "Decorative Objects",
        "More Furniture and Collectibles"
    ];
    main.periods = [
        "21st Century and New",
        "All 20th Century",
        "1980-2000",
        "1970s",
        "1960s",
        "1950s",
        "1940s",
        "1930s",
        "1900-1920",
        "19th Century",
        "18th Century and Earlier"
    ];


    // Populate the Inventory List from the DB
    main.getInvent = function(category) {
        alamodfactory.getInvent(category)
            .then(function(returnData) {
                if (returnData.data.length) {
                    console.log("This is the returndata: ", returnData.data);
                    main.inventoryList = returnData.data;
                    // main.inventoryList.push(returnData.data);
                    console.log("This is main.inventoryList", main.inventoryList);
                } else {
                    main.editItem = returnData.data;
                }
            }).catch(function(err) {
                console.log("This is the error: ", err);
            });
    }
    main.getInvent();
    // main.getInvent();

    main.setId = function(objId) {
        main.id = objId;
        console.log("This is the main.id", main.id);

    }

    main.setZoom = function(objPhoto) {
        main.zoomPhoto = objPhoto;
        console.log("This is the zoomed photo ID", main.zoomPhoto);
        // main.zoomPhoto = "";

    }


    main.getInventOne = function(id) {
        console.log(id);
        alamodfactory.getInventOne(id)
            .then(function(returnData) {
                console.log("This is the returndata: ", returnData.data);
                // main.inventoryList = returnData.data;
                // main.inventoryList.push(returnData.data);
                // console.log("This is main.inventoryList", main.inventoryList);
                console.log("This is the return data", returnData.data);
            }).catch(function(err) {
                console.log("This is the error: ", err);
            });
    }

    main.creatorFinder = function(name) {
        console.log(name);
        main.search = name;
        console.log(main.search);
    }

    main.addInvent = function() {
        main.newInvent.imageUrl = main.newImages.split(",");
        alamodfactory.createInvent(main.newInvent)
            .then(function(err, returnData) {
                if (err) {
                    console.log("This is the error", err);
                } else {
                    console.log("This is the return data", returnData);

                }
                main.newInvent = {};
                main.newImages = "";
            })
    }

    main.editItems = function() {
        if (!main.editItem.imageUrl.length) {
            main.newImages = main.editItem.imageUrl.split(",");
            main.editItem.imageUrl = main.newImages;
        }
        console.log(main.editItem);
        alamodfactory.editInvent(main.editItem)
            .then(function(err, returnData) {
                if (err) {
                    console.log("This is the error", err);
                } else {
                    console.log("This is the edited data", returnData);
                }
            })
        main.editItem = {};
    }

    main.removeItems = function(id) {
        alamodfactory.deleteItem(id)
            .then(function(err, retrunData) {
                if (err) {
                    console.log("This is the error", err);
                } else {
                    console.log("This is the return data", returnData);
                }
            })
        main.removeThatShit = "";
    }

    main.resetField = function() {
        main.search = "";
    }

    main.showAddInventory = function() {
        main.showInventoryForm = !main.showInventoryForm;
    }

    main.showEditForm = function() {
        main.showMyEdit = !main.showMyEdit;
    }

    main.carouselNewListings = function(one, two, three, four) {
        console.log("This is firing");
        main.newCarouselImages = [one, two, three, four];
        console.log(main.newCarouselImages);

    }
    main.logThis = function() {

        console.log(main.newCarouselImages[2]);

    }

    main.logThis();


}
