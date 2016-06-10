(function () {
    'use-strict';

    angular.module('ngBgloader', ['ngAnimate']).directive('bgLoader', function() {
        return {
            restrict: 'E',
            scope: {
                placeholder: '=placeholder',
                src: '=src',
                givenStyles: '=?styles'
            },
            controller: ['$scope', '$http', function($scope, $http) {

                $scope.loadComplete = false;

                if ($scope.givenStyles == null) {
                    $scope.styles = {};
                } else {
                    $scope.styles = JSON.parse(JSON.stringify($scope.givenStyles));
                }
                if ($scope.styles['background-size'] == null)
                    $scope.styles['background-size'] = 'cover';
                if ($scope.styles['position'] == null)
                    $scope.styles['position'] = 'absolute';
                if ($scope.styles['top'] == null)
                    $scope.styles['top'] = '0px';
                if ($scope.styles['left'] == null)
                    $scope.styles['left'] = '0px';
                if ($scope.styles['right'] == null)
                    $scope.styles['right'] = "0px";
                if ($scope.styles['height'] == null)
                    $scope.styles['height'] = "100%";

                $scope.fullImageStyles = JSON.parse(JSON.stringify($scope.styles));
                $scope.styles['background-image'] = 'url('+$scope.placeholder+')';

                setTimeout(function () {
                    $scope.$apply();
                }, 100);

                $http({
                    url: $scope.src,
                    method: "GET",
                    responseType: "blob"

                }).then(function (data) {
                    var reader = new FileReader();

                    reader.addEventListener("load", function () {
                        $scope.fullImageStyles['background-image'] = 'url('+reader.result+')';
                        $scope.loadComplete = true;
                        $scope.$apply();
                    }, false);

                    reader.readAsDataURL(data.data);
                });

            }],
            template:   '<div ng-style="styles"></div><div class="fadeIn" ng-if="loadComplete" ng-style="fullImageStyles"></div>' +
            '<style>.fadeIn.ng-enter { -webkit-transition: 0.5s linear all; transition:0.5s linear all; opacity:0;} .fadeIn.ng-enter.ng-enter-active { opacity:1; } </style>'
        };
    });

})();