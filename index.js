const projectsArray = 
[
{name: "w/Food.", 
tagline: "Food is our language", 
img:"./images/with_food_1.jpg", 
url:"https://patln.github.io/with-food/", 
filters:["dev"], 
devices:["desktop"]}, 

{name: "Shirayuri Production", 
tagline: "Building for an ensemble", 
img:"./images/shirayuripro_1.jpg", 
url:"http://shirayuripro.webflow.io/", 
filters:["design", "dev"], 
devices:["desktop"]}, 

{name: "AllKnightr", 
tagline: "For gamers to group and meet", 
img:"./images/akr_01.jpg", 
url:"#", 
filters:["design"], 
devices:["mobile"]}, 

{name: "Raise A Suillen", 
tagline: "Event coverage", 
img:"./images/raise_01.JPG", 
url:"#", 
filters:["other"], 
devices:[]},

{name: "Reading to Kids", 
tagline: "Cool story", 
img:"./images/r2k_beauty1.jpg", 
url:"#", 
filters:["design"], 
devices:["mobile"]}, 

{name: "IBP Masters", 
tagline: "You had to be there!", 
img:"./images/ibp_masters_01.jpg", 
url:"#", 
filters:["other"], 
devices:[]}, 

{name: "A Shop Called Quest", 
tagline: "A shop full of character", 
img:"./images/mockup1.png", 
url:"#", 
filters:["design"], 
devices:["desktop"]},

{name: "Kindletrix", 
tagline: "It's fun playing with fire", 
img:"./images/meltytoy_1.jpg", 
url:"#", 
filters:["other"], 
devices:[]}
]

let filtersArray = projectsArray.slice(0);
let renderArray = filtersArray.slice(0);
let activeFilters = [];


let cardIndex = 0;
let columns = 3;


// Preloader to do css animations with a delay before display none
$(window).on("load", function() {

  setTimeout(animateLoader, 1000);

  setTimeout(hideLoader, 3000);
});

function animateLoader() {
  let loader1 = $(".load-1");
  let loader2 = $(".load-2");

  loader1.addClass("animate-l");
  loader2.addClass("animate-r");
}

function hideLoader() {
  $("#loading-screen").css("display", "none");
}


//Navbar on scroll
$(window).on("scroll", function(){
  let scrollPos = window.scrollY;
  let height = window.innerHeight;
  let nav = $(".nav-wrapper");

  //navbar reveals after scrolling 30%
  if (scrollPos === 0) {
    nav.css("background-color", "rgba(255, 255, 255, 0)");
    nav.css("-webkit-backdrop-filter", "blur(0px)");
    nav.css("backdrop-filter", "blur(0px)");
  }

  else {
    nav.css("background-color", "rgba(255, 255, 255, .9");
    nav.css("-webkit-backdrop-filter", "blur(10px)");
    nav.css("backdrop-filter", "blur(10px)");
  }
});


/* Making a mobile response hamburger nav */
$(".button-burger").on("click", function(){
	let clicked = $(this);
  let list = $(".mobile-list");
  
  if (clicked.attr("clicked") === "0") {
  	clicked.attr("clicked", "1");
    list.css("display", "flex");
  }
  
  else {
  	clicked.attr("clicked", "0");
    list.css("display", "none");
  }
});

// Listener for the filtering buttons
$("#type-buttons .filter").on("click", function() {
  let clicked = $(this);
  let filterButton = $("#type-buttons .filter");

  if ((clicked.attr("filter") === "all") && (clicked.attr("clicked") === "0")) {
    filterButton.removeClass("pressed");
    filterButton.attr("clicked", "0");
    clicked.attr("clicked", "1");
    clicked.addClass("pressed");
    activeFilters = [];
  }

  else if (!(clicked.attr("filter") === "all")) {

    if ($(`.filter[filter='all']`).attr("clicked") === "1") {
      $(`.filter[filter='all']`).removeClass("pressed");
      $(`.filter[filter='all']`).attr("clicked", "0");

    }

    if (clicked.attr("clicked") === "0") {
      clicked.attr("clicked", "1");
      clicked.addClass("pressed");
    }

    else {
      clicked.attr("clicked", "0");
      clicked.removeClass("pressed");
    }

    if ((($(".filter:nth-child(2)").attr("clicked") === "0")) && (($(".filter:nth-child(3)").attr("clicked") === "0")) && (($(".filter:nth-child(4)").attr("clicked") === "0"))) {
      $(`.filter[filter='all']`).attr("clicked", "1");
      $(`.filter[filter='all']`).addClass("pressed");
      activeFilters = [];
    }

    else {
      activeFilters= [];
      $(`.filter[clicked ="1"]`).each(function () {
        activeFilters.push($(this).attr("filter"));
      });
    }
  }
  sortCards();
});


// Function that will do all the sorting logic on the arrays before sending to render.
// Will continue to be called each time before render, so sort every render.
function sortCards(){
  renderArray =  [];
  filtersArray = [];
  filtersArray = projectsArray.slice(0);
  let currentDevice = $(`.device[clicked="1"]`).attr("platform");

  if (activeFilters.length <= 0) {
    renderArray = filtersArray.slice(0);
  }

  else {
    renderArray = [];
    for (let i = 0; i < filtersArray.length; i++){
      let currentCard = filtersArray[i];
      
      for (let j = 0; j < activeFilters.length; j++) {
        if (currentCard.filters.includes(activeFilters[j])){    
            renderArray.push(currentCard);
            break;
        }
      }
    }
  }

  if (!(currentDevice === "all")) {
    filtersArray = [];
    filtersArray = renderArray.slice(0);
    renderArray = [];

    for (let i = 0; i < filtersArray.length; i++) {
      if (filtersArray[i].devices.includes(currentDevice)) {
        renderArray.push(filtersArray[i]);
      }
    }
  }
  
  renderCols(renderArray, ".projects-body");
}

// Listener for the device buttons
$("#device-buttons .device").on("click", function() {
  let clicked = $(this);
  let devicesButton = $("#device-buttons .device");

  devicesButton.removeClass("pressed");
  devicesButton.attr("clicked", "0");
  clicked.attr("clicked", "1");
  clicked.addClass("pressed");
  sortCards();
});

//Function that sets the number of columns for project-list
//Based on window width
function resizeColumns() {

    if ( $(window).width() < 800) {
    	columns = 1;
    }
    
    else if ( $(window).width() < 1440) {     
    	columns = 2;
    }
    
    else {
    	columns = 3;
    }
    
   	sortCards();
}

//Listener that checks for a window resize. Using timer to delay to buffer calls.
var timeout = false;
$(window).on("resize", function(){
		clearTimeout(timeout);
    timeout = setTimeout(resizeColumns, 100);
});


//function to render cols/spacer in project list then calls to render cards
function renderCols(template, node){
	let target = $(`${node}`);
  target.empty();
  
  for (let col = 0; col < columns; col++) {
  	target.append(`
    <div class="projects-column-${col} column" col=${col}>
    
    </div>
    `);
    if (col + 1 < columns) {
    target.append(`
    <div class="spacer">
    `);
    }
  }
  cardIndex = 0;
  renderCards();
}

//function renders the cards into the cols
function renderCards() {
    while (cardIndex < renderArray.length) {
    
        for (let col = 0; col < columns; col++) {
            let currentCard = renderArray[cardIndex];

            if (cardIndex === renderArray.length){
                break;
            }

            $(`.projects-column-${col}`).append(`
                <div class="projects-card">
                  <div class="projects-card-body">
                      <a href="${currentCard.url}" class="img-link" target="_blank"><img src="${currentCard.img}" class="projects-card-img"></a>
                  </div>
                  <div class="projects-card-footer">
                    <div class="projects-card-footer-l">
                      <a href="${currentCard.url}" class="card-link" target="_blank">${currentCard.name} <span class="arrow"> <i class="icon fa-solid fa-arrow-right"></i></span> </a>
                      <div class="projects-card-tagline">${currentCard.tagline}</div>
                    </div>
                    <div class="projects-card-footer-r">
                      <div class="projects-card-footer-filters">

                      </div>
                      <div class="projects-card-footer-devices">
                      
                      </div>
                    </div>
                  </div>
                </div>
            `);

            for (let i = 0; i < currentCard.filters.length; i++) {
              $(`.projects-column-${col} .projects-card-footer-filters:last`).append(`
              <div class="card-footer-tag ${currentCard.filters[i]}">${currentCard.filters[i]} </div>`);
            }
            for (let j = 0; j < currentCard.devices.length; j++) {
              $(`.projects-column-${col} .projects-card-footer-devices:last`).append(`
              <div class="card-footer-device ${currentCard.devices[j]}">${currentCard.devices[j]} </div>`);
            }

            cardIndex++;
        }
        renderCards();
    }
}

renderCols(renderArray, ".projects-body");
resizeColumns(); //Call the function once








