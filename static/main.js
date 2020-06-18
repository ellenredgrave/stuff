function getAndClearDropdown(key){
  let dropdown = $(key);
  dropdown.empty();
  dropdown.append("<option selected='true' disabled>Choose town</option>");
  dropdown.prop("selectedIndex", 0);
  return dropdown;
}

function dropdownOptions(entry, dropdown) {
  console.log('calling DropdownOptions', entry, dropdown);
  dropdown.append($("<option></option>").attr("value", entry.town_id).text(entry.town_name));
}

function easyToTest() {
  return "called";
}

function populateDropdown() {
  //Set up dropdown
  const dropdown = getAndClearDropdown("#where");
  console.log('calling populateDropdown', dropdown);
  const url = "/list_towns";
//  const DropOp = DropdownOptionsJon;
  $.getJSON(url, {}, function(data){
    console.log('data populateDropdown', data)

    $.each(data, function(key, entry){dropdownOptions(entry, dropdown);});
});}

//Check if the town dropdown is empty, and if it is bring up an alert to remind user
function CheckIfEmpty() {
  let x;
  x = document.getElementById("where").value;
  if (x === "Choose town") {
      alert("Enter a valid location");
      return false;
  }
}

const Dropdown = Object.create(null);
Dropdown.test = easyToTest;
Dropdown.populateDropdown = populateDropdown;
Dropdown.dropdownOptions = dropdownOptions;

window.addEventListener('DOMContentLoaded', (event) => {
  console.log('in domcontentloaded')
  populateDropdown();
  const empty = CheckIfEmpty;

  let y = document.getElementById("submit_button");
  if(y) {
  y.onclick = empty;
  }
  //$(document).ready(PopDrop);
});
//Populate the town dropdown with the list of town names from the database
/*   function PopulateDropdown() {
    //Set up dropdown
    let dropdown = $("#where");
    dropdown.empty();
    dropdown.append("<option selected='true' disabled>Choose town</option>");
    dropdown.prop("selectedIndex", 0);

    const url = "/list_towns";
//Function to get dropdown info
      function AppendDropdown(data) {
        function DropdownOptions(key, entry) {
          dropdown.append($("<option></option>").attr("value", entry.town_id).text(entry.town_name));
        }
    const DropOp = DropdownOptions;
    $.each(data, DropOp);
  }

  const ApDrop =  AppendDropdown;
    $.getJSON(url, {}, ApDrop);
} */


export default Object.freeze(Dropdown);