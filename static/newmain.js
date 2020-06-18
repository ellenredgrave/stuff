window.addEventListener('DOMContentLoaded', (event) => {

    $(document).ready(function(){
        let dropdown = $("#where");
        dropdown.empty();
        dropdown.append("<option selected='true' disabled>Choose town</option>");
        dropdown.prop("selectedIndex", 0);
    
        const url = "/list_towns";
        $.getJSON(url, {}, function (data) {
          $.each(data, function (key, entry) {
            dropdown.append($("<option></option>").attr("value", entry.town_id).text(entry.town_name));
    });
    });
      });
    

    });

    function CheckIfEmpty() {
        let x;
        x = document.getElementById("where").value;
        if (x === "Choose town") {
            alert("Enter a valid location");
            return false;
        }
      }
      const empty = CheckIfEmpty;

      let y = document.getElementById("submit_button");
      y.onclick = empty;