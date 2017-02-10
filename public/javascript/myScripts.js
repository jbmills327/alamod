angular.module("MyApp")
    .controller("MainCtrl", mainController);

// angular.module("MyApp")
//     .config(myRouter);

// myRouter.$inject = ["$routeProvider"];
mainController.$inject = ["$http", "alamodfactory"];


// This is the function that controls where we hop during the routing process
// function myRouter($routeProvider) {
//     $routeProvider
//         .when("/print", {
//             templateUrl: "./html/print.html"
//         })
//
// }


function mainController($http, alamodfactory) {
    var main = this;
    main.id = "";
    main.newEditImages = "";
    main.newListingImages = [];
    main.priceColor = "";
    // main.editedItem = {};
    main.zoomPhoto = "";
    main.removeThatShit = "";
    main.newCarouselImages = [];
    main.showInventoryForm = false;
    main.showMyEdit = true;
    main.showMyEditNewListing = true;
    main.newImages = [];
    main.editedImages = "";
    main.editItem = {};
    main.editNewListingItem = {};
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
                    // main.newEditImages = returnData.data.imageUrl.join();
                }
            }).catch(function(err) {
                console.log("This is the error: ", err);
            });
    }

    // Calling get inventory
    main.getInvent();

    main.getNewListing = function() {
        alamodfactory.getNewListing()
            .then(function(returnData) {
                console.log("This is the return data", returnData.data);
                main.newListingImages = returnData.data;
                console.log("This is the main object", main.newListingImages);
            }).catch(function(err) {
                console.log("This is the error", err);
            })
    }

    main.getNewListing();


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
        // main.editItem.imageUrl = main.newEditImages.split(",")
        alamodfactory.editInvent(main.editItem)
            .then(function(err, returnData) {
                if (err) {
                    console.log("This is the error", err);
                } else {
                    console.log("This is the edited data", returnData);
                }
            });
        // main.editItem = {};
        $('#editModal').modal('hide');

    }

    main.editNewListing = function() {
        console.log(main.newListingImages[0]);
        alamodfactory.editNewListing(main.newListingImages[0])
            .then(function(err, returnData) {
                if (err) {
                    console.log("This is the error", err);
                } else {
                    console.log("This is the edited data", returnData);
                }
            })
        main.newListingImages = {};
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

    main.showEditNewListingForm = function() {
        main.showMyEditNewListing = !main.showMyEditNewListing;
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

    // main.redSold = function(color) {
    //     console.log("This is the color", color);
    //     if (color.toUpperCase() === "SOLD") {
    //         main.mySold = {
    //             "color": "red"
    //         }
    //     }
    // }
    //
    // main.redSold(main.priceColor);

    main.printContent = function(el) {
        var printcontent = document.getElementById(el).innerHTML;
        // document.body.innerHTML = printcontent;
        printcontent.print();
        location.reload();

    }

    main.printDiv = function(divName) {
        var printContents = document.getElementById(divName).innerHTML;
        var popupWin = window.open('', '_blank', 'width=300,height=300');
        popupWin.document.open();
        popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="../css/main.css" /><title>Printing Item</title><link rel="icon" type="image/png" href="../css/resources/palm_tree_two.png"/></head><body onload="window.print()">' + printContents + '</body></html>');
        popupWin.document.close();

        // setTimeout(function() {
        //     popupWin.close();
        // }, 1000);

    }

    main.backToTop = function() {
        window.scrollTo(0, 0)
    }



}
