let myHeading = document.querySelector("h2");
function setUserName() {
    let myName = prompt("Please enter your name.");
    if(!myName || myName === null) {
        setUserName();
    }
    else {
        localStorage.setItem("name", myName);
        myHeading.textContent = "Welcome " + myName;
    }
    return myName;
  }


  var name = localStorage.getItem("name");

if(!localStorage.getItem("name")) {
    setUserName();
    var name = setUserName();
} else {
    myHeading.textContent = "Welcome " + name;
}



const params = new URLSearchParams(window.location.search);

let restaurant = params.get("restaurant");
let requirement = params.get("requirement");

let rest_choice = $("#restaurant_choice");
rest_choice.val(restaurant);

let requ_choice = $("#requirement_choice");
requ_choice.val(requirement);

const url  = "/list_reviews?restaurant_choice=" + restaurant +"&requirement_choice=" + requirement;

$.getJSON(url, {}, function (data) {
    console.log(data);
        $.each(data, function (key, entry) {
            console.log(data);
        let user_comment = "<tr><td>" + entry.comment +" - " + name + "    " + entry.star_rating + "    stars</td>";
            $("#review_list").append(user_comment);

    // put entry.restaurant_name on the page
    console.log(entry.restaurant_name);
    document.getElementById("restaurant").innerHTML = entry.restaurant_name;
});});

window.onload = function (){
    let header = restaurant;
    document.getElementById("restaurant").innerHTML = header;

    let plz_leave_review = "Please leave a review for other " + requirement + " people";
    document.getElementById("plz_leave_review").innerHTML = plz_leave_review;
  };



function on_submit() {
    let star_rating = params.get("star_rating");
    let comment = params.get("comment");
    const url_new  = "/list_reviews?restaurant_choice=" + restaurant +"&requirement_choice=" + requirement + "&star_rating=" + star_rating + "&comment=" + comment;
    window.location.reload();
}

let y = document.getElementById("submit");

y. onclick = function empty_rating() {
  let x;
  x = document.getElementById("star_rating").value;
  if (x === "-") {
      alert("Enter a star rating before submitting your review");
      //DO NOT SUBMIT FORM
      return false;
  }
};