'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

document.addEventListener("DOMContentLoaded", function() {
  let popupOpen = false;

  function showPopup(title, customDescription, githubUrl) {
    // Close any existing popup
    closePopup();

    // Create the popup widget
    const popup = document.createElement('div');
    popup.classList.add('popup-widget', 'active');

    // Add content to the popup
    popup.innerHTML = `
      <div class="popup-content">
        <h2>${title}</h2>
        <p style="text-align: start;">${customDescription}</p>
        <a href="${githubUrl}" target="_blank" class="github-button">
          <ion-icon name="logo-github"></ion-icon>
        </a>
      </div>
    `;

    // Append the popup to the body
    document.body.appendChild(popup);

    // Create and append the overlay
    const overlay = document.createElement('div');
    overlay.classList.add('overlay', 'active');
    document.body.appendChild(overlay);

    // Add click event listener to overlay
    overlay.addEventListener('click', closePopup);

    // Disable scroll on the body
    document.body.style.overflow = "hidden";

    // Set popupOpen to true
    popupOpen = true;

    // Add scroll functionality to popup content
    const popupContent = document.querySelector('.popup-content');
    popupContent.addEventListener('scroll', function() {
      if (popupContent.scrollHeight > popupContent.clientHeight) {
        popupContent.style.overflowY = 'auto';
      } else {
        popupContent.style.overflowY = 'hidden';
      }
    });
  }

  function closePopup() {
    const popup = document.querySelector('.popup-widget');
    if (popup) {
      // Remove the popup with a delay to allow transition animation
      popup.classList.remove('active');
      setTimeout(() => {
        popup.parentNode.removeChild(popup);
      }, 300); // Delay to allow transition animation
    }

    // Remove the overlay
    const overlay = document.querySelector('.overlay');
    if (overlay) {
      overlay.classList.remove('active');
      setTimeout(() => {
        overlay.parentNode.removeChild(overlay);
      }, 300); // Delay to allow transition animation
    }

    // Enable scroll on the body
    document.body.style.overflow = "";

    // Set popupOpen to false
    popupOpen = false;
  }

  // Show popup when list element is clicked
  const listItems = document.querySelectorAll(".project-item");
  listItems.forEach(function(item) {
    item.addEventListener("click", function(event) {
      event.preventDefault();
      const title = this.querySelector(".project-title").textContent;
      const customDescription = this.getAttribute("data-description");
      const githubUrl = this.getAttribute("data-github-url");
      showPopup(title, customDescription, githubUrl);
    });
  });
});






  // Hide popup when overlay is clicked
  overlay.addEventListener("click", function(event) {
    if (event.target === overlay && popupOpen) {
      closePopup();
    }
  });


// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}