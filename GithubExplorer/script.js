const APIURL = "https://api.github.com/users/";
const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

async function getUser(username) {
  try {
    const { data } = await axios(APIURL + username);
    createUserCard(data);
    getRepos(username);
  } catch (err) {
    if (err.response.status == 404) {
      createErrorCard("Invalid Username | Please enter the correct username");
    }
  }
}
async function getRepos(username) {
  try {
    const { data } = await axios(APIURL + username + "/repos?sort=created");
    addReposToCard(data);
  } catch (err) {
    createErrorCard("Problem fetching repos");
  }
}
function createUserCard(user) {
  const userID = user.name || user.login;
  const userBio = user.bio ? `<p>${user.bio}</p>` : "";
  const cardHTML = `
<div class="card">
<div>
<img src="${user.avatar_url}" alt="${user.name}" class="avatar">
</div>
<div class="user-info">
<h2>${userID}</h2>
${userBio}
<ul>
<li>${user.followers} <strong>Followers</strong></li>
<li>${user.following} <strong>Following</strong></li>
<li>${user.public_repos} <strong>Repos</strong></li>
</ul>
<div id="repos"></div>
</div>
</div>
`;
  main.innerHTML = cardHTML;
}
function createErrorCard(msg) {
  const cardHTML = `
<div class="card">
<h1>${msg}</h1>
</div>
`;
  main.innerHTML = cardHTML;
}
function addReposToCard(repos) {
  const reposEl = document.getElementById("repos");
  repos.slice(0, 5).forEach((repo) => {
    const repoEl = document.createElement("a");
    repoEl.classList.add("repo");
    repoEl.href = repo.html_url;
    repoEl.target = "_blank";
    repoEl.innerText = repo.name;
    reposEl.appendChild(repoEl);
  });
}
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const user = search.value;
  if (user) {
    getUser(user);
    search.value = "";
  }
});


if(drop == "Repository"){
    function searchRepositories() {
      const searchInput = document.getElementById("repo-search-input");
      const query = searchInput.value.trim();
      if (!query) {
        alert("Please enter a repository name to search for.");
        return;
      }
      
      const api_url = `https://api.github.com/search/repositories?q=${query}&sort=stars&order=desc`;
      fetch(api_url)
        .then(response => response.json())
        .then(data => {
          const searchResults = document.getElementById("search-results");
          searchResults.innerHTML = "";
          for (const repo of data.items) {
            const li = document.createElement("li");
            const a = document.createElement("a");
            a.href = repo.html_url;
            a.target = "_blank";
            a.textContent = repo.full_name;
            li.appendChild(a);
            searchResults.appendChild(li);
          }
        })
        .catch(error => {
          console.error(error);
          alert("There was an error retrieving the search results.");
        });
    }
}

if(drop == "Topic"){
    function searchRepositories() {
      const searchInput = document.getElementById("topic-search-input");
      const query = searchInput.value.trim();
      if (!query) {
        alert("Please enter a topic to search for.");
        return;
      }
      
      const api_url = `https://api.github.com/search/repositories?q=topic:${query}&sort=stars&order=desc`;
      fetch(api_url)
        .then(response => response.json())
        .then(data => {
          const searchResults = document.getElementById("search-results");
          searchResults.innerHTML = "";
          for (const repo of data.items) {
            const li = document.createElement("li");
            const a = document.createElement("a");
            a.href = repo.html_url;
            a.target = "_blank";
            a.textContent = repo.full_name;
            li.appendChild(a);
            searchResults.appendChild(li);
          }
        })
        .catch(error => {
          console.error(error);
          alert("There was an error retrieving the search results.");
        });
    }
}
