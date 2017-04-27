angular.module('demoApp', [
  'angular-slideout-panel'
]);

angular.module('demoApp').controller('demoCtrl', [
  '$scope',
  'angularSlideOutPanel',
  '$timeout',
  '$http',
  function($scope, angularSlideOutPanel, $timeout, $http) {
    var template = '<div class="">' +
      '<h1>{{ panelDirection }} Panel</h1>' +
      '<div class="clearfix">' +
      '<button class="btn btn-primary pull-left" ng-click="closePanel()">Close Me</button>' +
      '<button class="btn btn-primary pull-right" ng-click="dismissPanel()">Dismiss Me</button>' +
      '</div>' +
      '<br>' +
      '<br>' +
      '<strong>Resolved User : {{ user.firstName }}</strong>' +
      '<br>' +
      '<strong>Resolved Ajax Data : </strong>' +
      '<ol>' +
      '<li ng-repeat="venue in venues">' +
      '<p>{{ venue.name }}</p>' +
      '</li>' +
      '</ol>' +
      '<br>' +
      '<p>' +
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ultricies quam diam, quis tempor tellus posuere eu. Vestibulum ac massa rhoncus tellus aliquet lobortis id non tortor. Vestibulum at imperdiet justo. Mauris at dolor ultricies, vestibulum' +
      'lectus sit amet, ultricies erat. Nunc varius turpis vel vestibulum efficitur. Vestibulum elementum leo quis erat pulvinar tincidunt. Nulla eget purus ultrices, vehicula massa quis, fringilla ex. Nam tincidunt finibus quam id laoreet. Maecenas ac eleifend' +
      'lectus. Proin porttitor mi vel mauris vulputate, ac accumsan ex eleifend. Pellentesque venenatis magna justo, eget volutpat dolor pretium eget. Aliquam vitae velit in nulla posuere dictum. Aenean commodo, magna quis molestie maximus, lectus lorem' +
      'iaculis velit, nec pharetra justo erat tincidunt augue. Vestibulum pharetra erat et volutpat luctus. Sed purus nibh, semper ac vulputate ac, aliquam in erat. Aenean sagittis mi vitae lectus semper congue. Morbi rhoncus in justo at accumsan. Nulla' +
      'euismod velit in dolor egestas, et dapibus sem ultricies. Integer ultrices tortor pellentesque luctus molestie. Nulla eu vestibulum ipsum. Mauris eget porttitor libero, vitae egestas lorem. Cras sed ex et sem porta consequat. Ut rutrum massa elementum,' +
      'feugiat neque eu, tincidunt velit. Proin imperdiet quam in pulvinar feugiat. Quisque condimentum mauris nec interdum efficitur. Aenean mollis congue nibh, ac feugiat odio egestas nec. Maecenas et dolor sed sapien iaculis condimentum quis ac ante.' +
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras feugiat porttitor quam. Vestibulum tempor sem eros, sed volutpat elit pellentesque luctus. Pellentesque fermentum at metus quis blandit. Phasellus vulputate id justo sit amet pretium. In' +
      'porta, nulla vel semper porttitor, felis odio commodo ipsum, at sodales nisi lacus id velit. Vivamus porta gravida ex, vel fringilla turpis aliquam id. Donec et cursus neque, ut elementum enim. Praesent elementum arcu dapibus ipsum dapibus, vehicula' +
      'tristique nulla sagittis. Praesent feugiat nibh felis, non tristique libero sodales at. Praesent lacus sapien, scelerisque sed lorem sit amet, scelerisque aliquet turpis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id bibendum' +
      'libero, id sagittis elit. Aliquam erat volutpat. Quisque pretium maximus euismod. In vel quam justo. Maecenas a elementum turpis. Etiam nec laoreet leo, a malesuada erat. Pellentesque efficitur justo sed cursus pulvinar. Suspendisse scelerisque viverra' +
      'nisl, vitae feugiat arcu pellentesque et. In odio sem, tristique eget felis vitae, gravida vulputate augue. Praesent facilisis quam vestibulum ipsum ornare auctor quis in libero.' +
      '</p>' +
      '</div>';

    $scope.openPanel1 = function() {
      angularSlideOutPanel.open({
        template: template,
        openOn: 'left',
        controller: [
          '$scope',
          'user',
          'venues',
          'panelDirection',
          modalController
        ],
        resolve: {
          panelDirection : [
            function() {
             return 'Left';
            }
          ],
          user: [
            function() {
              return {
                firstName: 'Jerry'
              };
            }
          ],
          venues: [
            function() {
              return $http.get('https://api.tablelist.com/city/aa211bf5d25100ac/venue?limit=5&fields=name');
            }
          ]
        }
      });
    };

    $scope.openPanel2 = function() {
      var panelInstance2 = angularSlideOutPanel.open({
        template: template,
        openOn: 'right',
        controller: [
          '$scope',
          'user',
          'venues',
          'panelDirection',
          modalController
        ],
        resolve: {
          panelDirection : [
            function() {
             return 'Right';
            }
          ],
          user: [
            function() {
              return {
                firstName: 'Jerry'
              };
            }
          ],
          venues: [
            function() {
              return $http.get('https://api.tablelist.com/city/aa211bf5d25100ac/venue?limit=5&fields=name');
            }
          ]
        }
      });

      panelInstance2.result
        .then(function(result) {
          console.log('panel was closed with result : ', result);
        }).catch(function(error) {
          console.log('panel was rejected with error : ', error);
        });
    };

    function modalController($scope, user, venues, panelDirection) {
      $scope.closePanel = function() {
        $scope.$panelInstance.close('this is from the controller!!');
      };

      $scope.dismissPanel = function() {
        $scope.$panelInstance.dismiss('this is from the controller!!');
      };

      $scope.user = user;
      $scope.venues = venues ? venues.data : venues;
      $scope.panelDirection = panelDirection;
    }
  }
]);
