var Reflux =      require('reflux');
var User =        require('../actions/user');
var pick =        require('lodash-node/modern/objects/pick');
var cache =       require('mixins/cache');

module.exports = Reflux.createStore({
  init: function() {
    //this.listenTo(UserActions.userProfile, this.onUserProfile);
  },

  cacheKey: function(username) {
    return 'profile:{username}'.replace('{username}', username);
  },

  getProfileData: function(username) {
    req({
      url: 'https://api.github.com/users/{username}'.replace('{username}', username),
      type: 'json'
    })
      .then(function(data) {
        data = pick(data,
          'avatar_url',
          'blog',
          'followers',
          'following',
          'repos_url',
          'starred_url',
          'location',
          'login',
          'name',
          'public_repos',
          'html_url'
        );

        this.trigger({
          user: data
        });

        cache.setItem(this.cacheKey(username), data);
      }.bind(this));
  },

  onUserProfile: function(username) {
    var cached = cache.getItem(this.cacheKey(username));

    if (cached) {
      this.trigger({
        user: cached
      });
    } else {
      this.getProfileData(username);
    }
  }
});