//Clear dropdown and set what is shown
function clearDropdown(dropdown) {
  console.log("clearing", dropdown);
  dropdown.empty();
  dropdown.append("<option selected='true' disabled>Choose town</option>");
  dropdown.prop("selectedIndex", 0);
  return dropdown;
}
//Clear dropdown with specified key
function getAndClearDropdown(key){
  let dropdown = $(key);
  return clearDropdown(dropdown);
}

function getDropdown(key){
  let dropdown = $(key);
  return clearDropdown(dropdown);
}

//Add list of towns to dropdown
function dropdownOptions(entry, dropdown) {
  console.log("calling DropdownOptions", entry, dropdown);
  dropdown.append($("<option></option>").attr("value", entry.town_id).text(entry.town_name));
}


function populateDropdown() {
  //Set up dropdown
  const dropdown = getDropdown("#where");
  const url = "/list_towns";
  //Fill in dropdown
  $.getJSON(url, {}, function(data){
    $.each(data, function(key, entry){dropdownOptions(entry, dropdown);});
});}

//Check if the town dropdown is empty, if it is bring up an alert to remind user
function CheckIfEmpty() {
  let x;
  x = document.getElementById("where").value;
  if (x === "Choose town") {
      alert("Enter a valid location");
      return false;
  }
}

const Dropdown = Object.create(null);
Dropdown.populateDropdown = populateDropdown;
Dropdown.dropdownOptions = dropdownOptions;
Dropdown.clearDropdown = clearDropdown;
Dropdown.getAndClearDropdown = getAndClearDropdown;



window.addEventListener("DOMContentLoaded", function (event) {
  console.log("in domcontentloaded");
  populateDropdown();
  const empty = CheckIfEmpty;

  //If submit button pressed when it is empty, don't submit form
  let y = document.getElementById("submit_button");
  if(y) {
  y.onclick = empty;
  }

});

export default Object.freeze(Dropdown);