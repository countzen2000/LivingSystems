var app = angular.module('livingApp', []);

app.controller('wordSpinController', ['$scope', '$interval', function ($scope, $interval) {
  $scope.words = [
    ['A', 'r', 'c', 'h', 'i', 'e', 'c', 't', 's'],
    ['D', 'e', 's', 'i', 'g', 'n', 'e', 'r', 's'],
    ['C', 'r', 'a', 'f', 't', 's', 'm', 'a', 'n'],
    ['E', 'n', 'g', 'i', 'n', 'e', 'e', 'r', 's']
  ];

  $scope.wordContainers = [];
  $scope.currentWordIndex = 0;

  $scope.rotateWords = function () {
    var index = $scope.currentWordIndex;
    var current = $scope.wordContainers[index];
    index = (index + 1 >= $scope.wordContainers.length) ? 0 : index + 1
    var next = $scope.wordContainers[index];

    current.rotateOut();
    next.rotateIn();

    $scope.currentWordIndex = index;
  };

  $scope.registerWord = function (wordElement) {
    $scope.wordContainers.push(wordElement);
  };

  $scope.intervalID = $interval($scope.rotateWords, 1000);
}]);

app.directive("wordContainer", [function () {
  var templateString = '<span class="word" style="visibility: {{hiddenProperty}}" id={{$index}}><span letters ng-repeat="letter in characterList track by $index"></span></span>';
  var controllerFunction = function ($scope, $element, $attrs) {
    var allChildren = $scope.allChildren = [];
    $scope.hiddenProperty = "hidden";

    $scope.rotateOut = function () {
      var stagger = .03;
      angular.forEach(allChildren, function (childScope) {
        childScope.rotateOut(stagger);
        stagger += .03;
      });
    };

    $scope.rotateIn = function () {
      $scope.hiddenProperty = "visible";
      var stagger = .03;
      angular.forEach(allChildren, function (childScope) {
        childScope.rotateIn(stagger);
        stagger += .03;
      });
    };

    this.registerChildren = function (child) {
      $scope.allChildren.push(child);
    };

    $scope.registerWord($scope);
    
    if ($scope.$index == 0) {
      $scope.hiddenProperty = "visible";
    }
  };

  var linkFunction = function (scope, element) {

  }

  return {
    link: linkFunction,
    controller: controllerFunction,
    template: templateString,
    transclude: true,
    replace: true,
    scope: true
  };
}]);

app.directive("letters", [function () {
  var templateString = '<span class="letters" id={{$index}}>{{letter}}</span>';

  var linkFunction = function (scope, element, attrs, wordCtrl) {
    scope.rotateOut = function (stagger) {
      TweenLite.set(element[0], {
        perspective: 400,
        transformStyle: "preserve-3d"
      });
      TweenLite.set(element[0], {
        transformOrigin: "0% 50% 30"
      });
      TweenLite.to(element[0], .3, {
        rotationX: -90,
        opacity: 0,
        delay: stagger
      });
    };

    scope.rotateIn = function (stagger) {
      TweenLite.set(element[0], {
        perspective: 400,
        transformStyle: "preserve-3d"
      });
      TweenLite.set(element[0], {
        transformOrigin: "0% 50% 30"
      });
      TweenLite.fromTo(element[0], .3, {
        rotationX: 90,
        opacity: 0,
        delay: stagger
      }, {
        rotationX: 0,
        opacity: 1,
        delay: stagger
      });
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