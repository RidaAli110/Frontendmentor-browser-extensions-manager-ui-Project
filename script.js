'use strict';

const cardList = document.querySelector('.card-list');
const filterBtns = document.querySelectorAll('.filter-btn');
const filterContainer = document.getElementById('filter');

let extensions = [];

// Fetching from JSON file
async function getExtensions() {
  const response = await fetch('./data.json');
  extensions = await response.json();

  createCard(extensions);
}
getExtensions();

//Create card
function createCard(array) {
  array.forEach((extension) => {
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
              <button class="remove-btn">Remove</button>
              <label class="switch">
                  <input type="checkbox" ${extension.isActive ? 'checked' : ''}/>
                <span class="slider round"></span>
              </label>
            </div>`;

    // Add To Dom
    cardList.appendChild(cardLi);
  });
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
        console.log('default is running');
        break;
    }
  }
}

// Event Listeners
filterContainer.addEventListener('click', filterExtensions);
filterContainer.addEventListener('click', filterBtnColor);
