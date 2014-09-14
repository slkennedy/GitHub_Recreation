
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
    created_at: moment(user.created_at).format("MMMM DD, YYYY"),
    followers: user.followers,
    followersUrl: user.follower_url,
    following: user.following,
    followingUrl: user.following_url,
    location: user.location
  };
  reusableTemplate('templateSideBar', '.sidebartop', sidebarData);

});

$.getJSON("https://api.github.com/users/slkennedy/repos").done(function(repos){

var repoData = _.chain(repos)
 .sortBy(function(sort) {return sort.pushed_at;})
 .map(function(repo){
  return{
    repoName: repo.name,
    repoDescription: repo.description,
    repoUrl:repo.html_url,
    forks: repo.forks,
    forksCount: repo.forks_count,
    forksUrl: repo.forks_url,
    gitUrl: repo.git_url,
    stargazersCount: repo.stargazers_count,
    stargazersUrl: repo.stargazers_url,
    updated: moment(repo.pushed_at).fromNow(),
    language: repo.language}
  })
  .reverse()
  .value();

_.each(repoData, function(output){
reusableTemplate('templateMainContent', '.maincontentfeature', output);
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
reusableTemplate('templateSideBarOrgs', '.sidebarbottom', output);
});
});

// $( ".maincontentmenu li" ).on('click' function(event) {
//   $( this ).toggleClass( "tabnav-selected" );
// });
