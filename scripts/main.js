console.log("HEllo WOrld")

console.log("please discuss with team before you rename this file,purpose of this file is pretty self explanatory")

document.addEventListener('DOMContentLoaded', function() {
    var sidebar = document.getElementById('sidebarMenu');
    var hamburger = document.getElementById('hamburger');
    var sidebarOpen = false;
    var backdrop = document.getElementById('backdrop');
  
    // Toggle sidebar when hamburger is clicked
    hamburger.onclick = function() {
      if (!sidebarOpen) {
        openSidebar();
      } else {
        closeSidebar();
      }
    };
  
    // Close sidebar when clicking outside of it
    document.body.addEventListener('click', function(event) {
      if (sidebarOpen && !sidebar.contains(event.target) && event.target !== hamburger) {
        closeSidebar();
      }
    });
  
    // Function to open the sidebar
    function openSidebar() {
      sidebar.style.left = "0";
      sidebarOpen = true;
      backdrop.classList.toggle('backdrop');      
      
    }
  
    // Function to close the sidebar
    function closeSidebar() {
      sidebar.style.left = "-250px";
      sidebarOpen = false;
    //   targetElement.classList.remove('backdrop');
      targetElement.classList.toggle('backdrop.backdrop-close');
      
    }
  });