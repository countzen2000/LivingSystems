var app = angular.module('livingApp', []);

app.controller('wordSpinController', ['$scope', function($scope) {
  $scope.words = [
    ['w','o','r','d','1'],
    ['a','b','c','d','e'],
    ['w','k','r','d','1','@','e','g'],
  ];
  
  $scope.timeline;
  $scope.currentWordIndex = 0;
  
  $scope.rotateWords = function() {    
    //tells currently active word to rotate.
      //The Active word--is a directive with information about next word, which is another directive.
      //The Active word animtes out while telling next work for animte in
    //The currently active word gets updated.
  };
}]);

app.directive("wordContainer", [function() {
  var templateString = '<span class="word" id={{$index}}><span letters ng-repeat="letter in characterList"></span></span>';
  var controllerFunction = function($scope, $element, $attrs) {
    var allChildren = $scope.allChildren = [];
    
    var rotateChildren = function($scope) {
      console.log(allChildren);
      angular.forEach(allChildren, function(childScope) {
        childScope.rotateOut();
      });
    };
    
    this.registerChildren = function(child) {
      $scope.allChildren.push(child);
    };
    
    //for testing
    $element.bind("click", rotateChildren);
    
  };
  
  return {
    controller : controllerFunction,
    template: templateString,
    transclude: true,
    replace: true
  };
}]);

app.directive("letters", [function() {
  var templateString = '<span class="letters" id={{$index}}>{{letter}}</span>';
  
  var linkFunction = function(scope, element, attrs, wordCtrl) {
    scope.rotateOut = function() {
      TweenLite.set(element[0], {perspective: 400, transformStyle: "preserve-3d"});
      TweenLite.set(element[0],  {transformOrigin: "0% 50% 50"});
      TweenLite.to(element[0], 1, {rotationX:-90});
    };
    
    wordCtrl.registerChildren(scope);
  };
  
  return {
    require: '^wordContainer',
    template: templateString,
    link: linkFunction,
    replace: true,
    scope: true
  };
}]);