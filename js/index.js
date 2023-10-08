// Get references to HTML elements
const githubForm = document.getElementById('github-form');
const searchInput = document.getElementById('search');
const userList = document.getElementById('user-list');
const reposList = document.getElementById('repos-list');
const toggleButton = document.getElementById('toggle-search'); // Get the toggle button

let searchType = 'user'; // Variable to store the current search type (user or repo)

// Event listener for form submission
githubForm.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the default form submission

    const searchTerm = searchInput.value.trim();

    if (searchTerm !== '') {
        if (searchType === 'user') {
            searchGitHubUsers(searchTerm);
        } else {
            searchGitHubRepos(searchTerm);
        }
    }
});

// Event listener for toggle button click
toggleButton.addEventListener('click', function () {
    searchType = searchType === 'user' ? 'repo' : 'user'; // Toggle between 'user' and 'repo'
    searchInput.placeholder = `Search ${searchType === 'user' ? 'GitHub Users' : 'GitHub Repositories'}`;
    searchInput.value = ''; // Clear the input field
    userList.innerHTML = ''; // Clear previous results
    reposList.innerHTML = ''; // Clear previous results
});

// Function to search GitHub users
function searchGitHubUsers(query) {
    const apiUrl = `https://api.github.com/search/users?q=${query}`;

    fetch(apiUrl, {
        headers: {
            'Accept': 'application/vnd.github.v3+json'
        }
    })
    .then(response => response.json())
    .then(data => {
        displayUsers(data.items);
    })
    .catch(error => console.error('Error:', error));
}

// Function to search GitHub repositories
function searchGitHubRepos(query) {
    const apiUrl = `https://api.github.com/search/repositories?q=${query}`;

    fetch(apiUrl, {
        headers: {
            'Accept': 'application/vnd.github.v3+json'
        }
    })
    .then(response => response.json())
    .then(data => {
        displayRepositories(data.items);
    })
    .catch(error => console.error('Error:', error));
}

// Function to display GitHub users
function displayUsers(users) {
    userList.innerHTML = ''; // Clear previous results

    users.forEach(user => {
        const userItem = document.createElement('li');
        userItem.innerHTML = `
            <img src="${user.avatar_url}" alt="${user.login}'s avatar">
            <span>${user.login}</span>
            <button data-username="${user.login}">View Repositories</button>
        `;

        userItem.querySelector('button').addEventListener('click', function () {
            const username = this.getAttribute('data-username');
            getUserRepositories(username);
        });

        userList.appendChild(userItem);
    });
}

// Function to display GitHub repositories
function displayRepositories(repositories) {
    reposList.innerHTML = ''; // Clear previous results

    repositories.forEach(repo => {
        const repoItem = document.createElement('li');
        repoItem.innerHTML = `
            <a href="${repo.html_url}" target="_blank">${repo.name}</a>
        `;
        reposList.appendChild(repoItem);
    });
}





