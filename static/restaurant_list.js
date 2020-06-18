window.addEventListener("DOMContentLoaded", (event) => {

const params = new URLSearchParams(window.location.search);

let town = params.get("town");

let needs = params.get("needs");
const url = "/restaurants_for_town_needs?town_list=" + town;
console.log(url);


function GetRestaurantList(){
    function AddHeader(data) {
        console.log(data);
        let entry = data[0];
        let header = "Restaurants in " + entry.town_name + " for " + needs + " requirements";
        document.getElementById("rest_heading").innerHTML = header;
        let requ = "Number of " + needs + " options";
        document.getElementById("requ").innerHTML = requ;
    }
    const AddHead = AddHeader;
    $.getJSON(url, {}, AddHead);
}

const RestList = GetRestaurantList;

window.onload = RestList;

$.getJSON(url, {}, function (data) {
console.log(data);
    if (needs === "vegetarian") {
        data.sort(function(a, b) {return b.vegetarian_num_options - a.vegetarian_num_options;});
        $.each(data, function (key, entry) {
            let veg_restaurant_list = "<tr><td><a href=reviews.html?restaurant=" + entry.restaurant_id+ "&requirement=" + needs + ">" + entry.restaurant_name + "</a></td><td>" + entry.vegetarian_num_options + "</td><td>" + Math.round(parseInt(entry.vegetarian_total_stars)/parseInt(entry.vegetarian_num_reviews)) + "</td></tr>";
            $("#rest_list").append(veg_restaurant_list);
    });} else if (needs === "vegan") {
        data.sort(function(a, b) {return b.vegan_num_options - a.vegan_num_options;});
        $.each(data, function (key, entry) {
            let vegan_restaurant_list = "<tr><td><a href=reviews.html?restaurant=" + entry.restaurant_id+"&requirement=" + needs +">" + entry.restaurant_name + "</td><td>" + entry.vegan_num_options + "</td><td>" + Math.round(parseInt(entry.vegan_total_stars)/parseInt(entry.vegan_num_reviews)) + "</td></tr>";
            $("#rest_list").append(vegan_restaurant_list);
    });} else {
        data.sort(function(a, b) {return b.coeliac_num_options - a.coeliac_num_options;});
        $.each(data, function (key, entry) {
            let coeliac_restaurant_list = "<tr><td><a href=reviews.html?restaurant=" + entry.restaurant_id+"&requirement=" + needs +">" + entry.restaurant_name + "</td><td>" + entry.coeliac_num_options + "</td><td>" + Math.round(parseInt(entry.coeliac_total_stars)/parseInt(entry.coeliac_num_reviews)) + "</td></tr>";
            $("#rest_list").append(coeliac_restaurant_list);
    });
    }
  });
});