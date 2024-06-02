// fetch('./html/knockout-frontend.html')
//             .then(response => response.text())
//             .then(data => document.getElementById('knockout-nevin').innerHTML = data);

document.addEventListener("DOMContentLoaded", function() {
    // Load the content of abh section from a.html
    fetch("./html/knockout-frontend.html")
      .then(response => response.text())
      .then(data => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(data, "text/html");
        const sectionToExport = doc.querySelector("#sectionToExport");
        const knockoutNevin = document.getElementById("knockout-nevin");
        
        // Apply 50% scale to the section
        // sectionToExport.style.transform = "scale(1)";
        
        knockoutNevin.innerHTML = sectionToExport.outerHTML;
        console.log(sectionToExport.innerHTML);
      })
      .catch(error => console.error(error));
  });



  // for hover effects of sidebar
  // watch
  // function toggleSidebar(show) {
  //   var sidebar = document.querySelector('.sidebarhoverwatch');
  //   if (show) {
  //     sidebar.style.display = 'block';
  //   } else {
  //     sidebar.style.display = 'none';
  //   }
  // }

  var sidebarActive = false;

function toggleSidebar(show) {
    var sidebar = document.querySelector('.sidebarhoverwatch');
    if (show && !sidebarActive) {
        console.log(show);
        sidebar.style.display = 'block';
    }
  }
// Add an event listener for when the sidebar is active
document.querySelector('.sidebarhoverwatch').addEventListener('mousehover', function() {
    sidebarActive = true;
console.log("mouseon")
});

// setTimeout(function() {
//   sidebar.style.display = 'none';
// }, 2000);
// }
  