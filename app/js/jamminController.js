jammin.controller('JamminController', ['$scope', 'SocketFactory', 'MetronomeFactory', 'SoundFactory', 'UserFactory',
    function($scope, SocketFactory, MetronomeFactory, SoundFactory, UserFactory) {

  var self = this;

  self.validNickname = false;
  self.statusLabel = 'not connected';
  self.metronomeStatus = 'off';

  self.toggleMetronome = function() {
    self.metronomeStatus = MetronomeFactory.toggleMetronome(self.metronomeStatus);
  };

  self.startJammin = function() {
    self.toggleMetronome();

    SocketFactory.setup(function(result) {
      self.statusLabel = result;
      $scope.$digest();
    });

    self.otherUsers = UserFactory.users.filter(function(user) {
      return user.name !== self.nickname;
    });
  }

  self.playSound = function(tone) {
    SoundFactory.playSound(tone);
  }

  self.checkNickname = function() {
    self.validNickname = true;
    UserFactory.createUser(self.nickname);
    self.startJammin();
  }
}]);