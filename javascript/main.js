
function reusableTemplate(templateId, container, model) {
var templateFunction = _.template($('#'+ templateId).text());

var renderedTemplate = templateFunction(model);
console.log(renderedTemplate)
$(container).append(renderedTemplate);
}

$.getJSON("https://api.github.com/users/slkennedy").done(function(user){
  var userData = {
    avatar_url: user.avatar_url,
    name: user.name,
    login: user.login,
    email: user.email,
    followers: user.followers,
    followersUrl: user.follower_url,
    following: user.following,
    followingUrl: user.following_url,
    location: user.location
  };
  reusableTemplate('templateMenuBar', '.menuRight', userData);
});

$.getJSON("https://api.github.com/users/slkennedy/repos").done(function(repos){
  var repoData = _.map(repos, function(repo){
  return{
    repoName: repo.name,
    repoDescription: repo.description,
    forks: repo.forks,
    forksCount: repo.forks_count,
    forksUrl: repo.forks_url,
    gitUrl: repo.git_url,
    stargazersCount: repo.stargazers_count,
    stargazersUrl: repo.stargazers_url,
    updated: repo.updated_at,
    language: repo.language};
  });
console.log(repoData);


_.each(repoData, function(output){
reusableTemplate('templateMainContent', '.mainContentFeature', output);
});

});




// $.getJson("https://api.github.com/users/slkennedy/starred").done(function(starred){
//   console.log(starred);
// });
// $.getJson("https://api.github.com/users/slkennedy/orgs").done(function(orgs){
//   console.log(orgs);
// });
