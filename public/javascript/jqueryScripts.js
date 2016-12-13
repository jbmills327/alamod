// Beyon this is jquery

// This is to make the slide menu work

/* Set the width of the side navigation to 250px and the left margin of the page content to 250px and add a black background color to body */

function openNav() {
    document.getElementById("mySidenav").style.height = "75vh";
    // document.getElementById("main").style.marginLeft = "250px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

// function openNestedNav() {
//     document.getElementById("myNestedSidenav").style.width = "250px";
//     document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
//
// }

/* Set the width of the side navigation to 0 and the left margin of the page content to 0, and the background color of body to white */

function closeNav() {
    document.getElementById("mySidenav").style.height = "0";
    // document.getElementById("main").style.marginLeft = "0";
    document.body.style.backgroundColor = "white";
}

// function closeNestedNav() {
//     document.getElementById("myNestedSidenav").style.width = "0";
//     document.body.style.backgroundColor = "white";
// }
