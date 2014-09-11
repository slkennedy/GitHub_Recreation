
function reusableTemplate(templateId, container, model) {
var templateFunction = _.template($('#' + templateId).text());
var renderedTemplate = templateFunction(model);
$(container).append(reusableTemplate);


$.getJSON("https://api.github.com/users/slkennedy").done(function(user){

reuableTemplate('templateMenuBar', '.menuRight', user);

return{
  avatar: user.avatar,
  name: user.name,
  login: user.login,
  avatarUrl: user.avatar_url,
  email: user.email,
  followers: user.followers,
  followersUrl: user.follower_url,
  following: user.following,
  followingUrl: user.following_url,
  location: user.location
};
});

$.getJson("https://api.github.com/users/slkennedy/repos").done(function(repos){
  console.log(repos);
});
$.getJson("https://api.github.com/users/slkennedy/starred").done(function(starred){
  console.log(starred);
});
$.getJson("https://api.github.com/users/slkennedy/orgs").done(function(orgs){
  console.log(orgs);
});
