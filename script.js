'use strict';

const cardList = document.querySelector('.card-list');
const filterBtns = document.querySelectorAll('.filter-btn');
const filterContainer = document.getElementById('filter');
const themeIcon = document.querySelector('#theme-btn img');
const appLogo = document.querySelector('#app-logo');

// The array that holds the extensions
let extensions = [];

// Fetching from JSON file
async function getExtensions() {
  const response = await fetch('./data.json');
  // putting the JSON data in the extensions array
  extensions = await response.json();

  // The Extensions get put into the card
  createCard(extensions);
}
getExtensions();

//Create card
function createCard(arrayOfEachExtension) {
  arrayOfEachExtension.forEach((extension) => {
    const cardLi = document.createElement('li');
    cardLi.classList.add('card');
    cardLi.innerHTML = `<div class="details-container">
              <img
                alt="extension-image"
                src="${extension.logo}"
              />
              <div class="text-container">
                <h2 class="extension-name">${extension.name}</h2>
                <p class="desc">
                ${extension.description}
                </p>
              </div>
            </div>
            <div class="btn-container">
              <button type='button' class="remove-btn" data-name='${extension.name}'>Remove</button>
              <label class="switch">
                  <input aria-label='${extension.name}' type="checkbox" data-name='${extension.name}'  ${extension.isActive ? 'checked' : ''}/>
                <span class="slider round"></span>
              </label>
            </div>`;

    // Add To Dom
    cardList.appendChild(cardLi);
  });
}

// Theme button
function toggleTheme() {
  document.body.classList.toggle('light-mode');
  if (document.body.classList.contains('light-mode')) {
    themeIcon.src = './assets/images/icon-moon.svg';
    appLogo.src = './assets/images/logo.svg';
  } else {
    themeIcon.src = './assets/images/icon-sun.svg';
    appLogo.src = './assets/images/logo-dark.svg';
  }
}

// Remove Button
function removeExtension(e) {
  if (e.target.classList.contains('remove-btn')) {
    const name = e.target.dataset.name;
    const updateExtensions = extensions.filter((extension) => {
      return extension.name !== name;
    });
    extensions = updateExtensions;
    e.target.closest('.card').remove();
  }
}

// Toggle button to change if extension button is active or not
function toggleExtension(e) {
  if (e.target.type === 'checkbox') {
    const name = e.target.dataset.name;
    const extension = extensions.find((extension) => {
      return extension.name === name;
    });
    extension.isActive = !extension.isActive;
  }
}

// Clear Cards from filters
function clearCard() {
  cardList.replaceChildren();
}

// Change active filter buttons color
function filterBtnColor(e) {
  if (e.target.classList.contains('filter-btn')) {
    filterBtns.forEach((button) => {
      button.classList.remove('filter-btn-active');
    });
    e.target.classList.add('filter-btn-active');
  }
}

// Filter Extension pages
function filterExtensions(e) {
  if (e.target.classList.contains('filter-btn')) {
    clearCard();
    // Switch Statement to check which button was clicked
    switch (e.target.textContent) {
      case 'All':
        createCard(extensions);
        break;

      case 'Active':
        const active = extensions.filter((extension) => extension.isActive);
        createCard(active);
        break;

      case 'Inactive':
        const inactive = extensions.filter((extension) => !extension.isActive);
        createCard(inactive);
        break;

      default:
        break;
    }
  }
}

// Event Listeners
filterContainer.addEventListener('click', filterExtensions);
filterContainer.addEventListener('click', filterBtnColor);
cardList.addEventListener('change', toggleExtension);
cardList.addEventListener('click', removeExtension);
themeIcon.addEventListener('click', toggleTheme);
