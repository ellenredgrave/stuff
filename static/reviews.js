window.addEventListener("DOMContentLoaded", (event) => {

//Set username with prompt. Do not accept if empty
function setUserName() {
    let myName = prompt("Please enter your name.");
    if(!myName || myName === null) {
        setUserName();
    }
    else {
    //When username set, save in local storage
        localStorage.setItem("name", myName);
        myHeading.textContent = "Welcome " + myName;
    }
    return myName;
  }

let myHeading = document.querySelector("h2");
var name = localStorage.getItem("name");

//When page has loaded, ask name if not in local storage, otherwise update header.
if(!localStorage.getItem("name")) {
    setUserName();
    var name = setUserName();
} else {
    myHeading.textContent = "Welcome " + name;
}


const params = new URLSearchParams(window.location.search);

//Get parameters from url
let restaurant = params.get("restaurant");
let requirement = params.get("requirement");

//Set hidden form values of restaurant_choice and requirement_choice from the url
let rest_choice = $("#restaurant_choice");
rest_choice.val(restaurant);

let requ_choice = $("#requirement_choice");
requ_choice.val(requirement);

const url  = "/list_reviews?restaurant_choice=" + restaurant +"&requirement_choice=" + requirement;


//Add comment to review page
function AddComment(data) {
    console.log(data);
    function CreateCommentCode(key, entry) {
        console.log(data);
        //Create comment from form submission
         let user_comment = "<tr><td>" + entry.comment +" -     " + entry.star_rating + "    stars</td>";
         //Add to review list
        $("#review_list").append(user_comment);
        console.log(entry.restaurant_name);
        //Update header with restaurant name
        document.getElementById("restaurant").innerHTML = entry.restaurant_name;
        }
    const CommentCode = CreateCommentCode;
    $.each(data, CommentCode);
}

const AddCom = AddComment;
$.getJSON(url, {}, AddCom);


function SetVariableTitles() {
    let header = restaurant;
    document.getElementById("restaurant").innerHTML = header;

    let plz_leave_review = "Please leave a review for other " + requirement + " people";
    document.getElementById("plz_leave_review").innerHTML = plz_leave_review;
  }

const VarTitles = SetVariableTitles;
window.onload = VarTitles;



function on_submit() {
    let star_rating = params.get("star_rating");
    let comment = params.get("comment");
    const url_new  = "/list_reviews?restaurant_choice=" + restaurant +"&requirement_choice=" + requirement + "&star_rating=" + star_rating + "&comment=" + comment;
    window.location.reload();
}

let y = document.getElementById("submit");


function IsRatingEmpty() {
    let x;
    x = document.getElementById("star_rating").value;
    if (x === "-") {
        alert("Enter a star rating before submitting your review");
        //DO NOT SUBMIT FORM
        return false;
    }
  }

const empty_rating = IsRatingEmpty;
y. onclick = empty_rating;
});