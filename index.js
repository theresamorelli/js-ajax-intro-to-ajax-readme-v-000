function getRepositories() {
  const req = new XMLHttpRequest();
  req.addEventListener('load', showRepositories);
  req.open('GET', 'https://api.github.com/users/octocat/repos');
  req.send();
}

function showRepositories() {
  let repos = JSON.parse(this.responseText);
  let repoList = `<ul>${repos.map(repo => {
    return '<li>' + repo.name + ' - <a href="#" data-repo="' + repo.name + '"onclick="getCommits(this)">Get Commits</a></li>';
  }).join('')}</ul>`;
  document.getElementById('repositories').innerHTML = repoList;
}

function getCommits(el) {
  console.log(el.dataset)
  const name = el.dataset.repo;
  const req = new XMLHttpRequest();
  req.addEventListener('load', showCommits);
  req.open('GET', 'https://api.github.com/repos/octocat/' + name + '/commits');
  req.send();
}

function showCommits() {
  const commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits.map(      commit =>
    '<li><strong>' +
    commit.author.login +
    '</strong> - ' +
    commit.commit.message +
    '</li>'
  ).join('')}</ul>`;
  document.getElementById('commits').innerHTML = commitsList;
}
