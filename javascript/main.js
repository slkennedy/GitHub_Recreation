
function reusableTemplate(templateId, container, model) {
var templateFunction = _.template($('#'+ templateId).text());
var renderedTemplate = templateFunction(model);
$(container).append(renderedTemplate);
}

$.getJSON("https://api.github.com/users/slkennedy").done(function(user){

  var userData = {
    avatarUrl: user.avatar_url,
    login: user.login,
  };
  reusableTemplate('templateMenuBar', '.menurtuser', userData);
});

$.getJSON("https://api.github.com/users/slkennedy").done(function(user){

  var sidebarData = {
    avatarUrl: user.avatar_url,
    name: user.name,
    login: user.login,
    email: user.email,
    created_at: user.created_at,
    followers: user.followers,
    followersUrl: user.follower_url,
    following: user.following,
    followingUrl: user.following_url,
    location: user.location
  };
  reusableTemplate('templateSideBar', '.sideBarTop', sidebarData);
  $.getJSON('https://api.github.com/users/slkennedy/starred').done(function(stars) {
    sidebardata.starred = stars.length;
    renderTemplate('templateSideBar', '.sideBarTop', sidebarData);
  });
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

_.each(repoData, function(output){
reusableTemplate('templateMainContent', '.mainContentFeature', output);
});

});

$.getJSON("https://api.github.com/users/slkennedy/orgs").done(function(orgs){
var orgData = _.map(orgs, function(org){
return{
  orgAvatar:org.avatar_url,
  orgUrl:org.url,
  };
});

_.each(orgData, function(output){
reusableTemplate('templateSideBarOrgs', '.sideBarBottom', output);
});
});
