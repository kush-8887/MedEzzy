// Constants
const increase = document.getElementById('increase');
const decrease = document.getElementById('decrease');
const itemContainer = document.getElementById('itemContainer');

// Class for managing page state
class Page {
    constructor() {
        this.pageNoElement = document.getElementById('page-no');
    }

    getPage() {
        return parseInt(this.pageNoElement.value);
    }

    setPage(pageNo) {
        this.pageNoElement.value = pageNo;
    }
}

// Object to manage filters and categories
const state = {
    link: 'http://localhost:8080/shop/v1/getitem/',
    filterArray: [],
    categoriesArray: [],
    pageManager: new Page()
};

// Function to fetch data based on current state
async function fetchData() {
    const link = state.link + buildQueryString();
    try {
        const response = await fetch(link);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

// Function to build query string
function buildQueryString() {
    const { filterArray, categoriesArray, pageManager } = state;
    let queryString = `?page=${pageManager.getPage()}`;
    for (const filter of filterArray) {
        queryString += `&fil=${filter}`;
    }
    for (const category of categoriesArray) {
        queryString += `&cat=${category}`;
    }
    queryString += '&d=default';
    return queryString;
}

// Function to update the link
function updateLink() {
    state.link = 'http://localhost:8080/shop/v1/getitem/';
}

// Function to handle increase and decrease buttons
function handlePageChange(increment) {
    const page = state.pageManager.getPage();
    state.pageManager.setPage(page + increment);
    fetchDataAndUpdateUI();
}

// Function to handle category selection
function handleCategoryChange() {
    state.categoriesArray = Array.from(document.querySelectorAll('input[type="checkbox"][name="category"]:checked')).map(checkbox => checkbox.id);
    fetchDataAndUpdateUI();
}

// Function to handle filter selection
function handleFilterChange() {
    state.filterArray = Array.from(document.querySelectorAll('input[type="checkbox"][name="a"]:checked')).map(checkbox => checkbox.id);
    fetchDataAndUpdateUI();
}

// Function to fetch data based on current state and update UI
async function fetchDataAndUpdateUI() {
    const data = await fetchData();
    putData(data, itemContainer);
}

// Add event listeners
increase.addEventListener('click', () => handlePageChange(1));
decrease.addEventListener('click', () => handlePageChange(-1));
document.querySelectorAll('input[type="checkbox"][name="category"]').forEach(checkbox => checkbox.addEventListener('change', handleCategoryChange));
document.querySelectorAll('input[type="checkbox"][name="a"]').forEach(checkbox => checkbox.addEventListener('change', handleFilterChange));

// Initial setup
document.addEventListener("DOMContentLoaded", () => {
    fetchDataAndUpdateUI();
});
