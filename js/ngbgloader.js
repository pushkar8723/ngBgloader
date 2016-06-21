/**
 * Created by pushkar on 6/21/16.
 */
(function () {
    'use-strict';

    angular.module('ngBgloader', ['ngAnimate']).directive('bgLoader', function() {
        return {
            restrict: 'E',
            scope: {
                placeholder: '=placeholder',
                src: '=src',
                givenStyles: '=?styles',
                placeholderStyles: '=?placeholderStyles'
            },
            controller: ['$scope', '$http', function($scope, $http) {

                $scope.loadComplete = false;

                if ($scope.placeholderStyles != null) {
                    $scope.styles = JSON.parse(JSON.stringify($scope.placeholderStyles));
                } else if ($scope.givenStyles != null) {
                    $scope.styles = JSON.parse(JSON.stringify($scope.givenStyles));
                } else {
                    $scope.styles = {};
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
                if ($scope.styles['bottom'] == null)
                    $scope.styles['bottom'] = "0px";

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
                        if ($scope.givenStyles == null) {
                            $scope.newStyles = {};
                        } else {
                            $scope.newStyles = JSON.parse(JSON.stringify($scope.givenStyles));
                        }
                        if ($scope.newStyles['background-size'] == null)
                            $scope.newStyles['background-size'] = 'cover';
                        if ($scope.newStyles['position'] == null)
                            $scope.newStyles['position'] = 'absolute';
                        if ($scope.newStyles['top'] == null)
                            $scope.newStyles['top'] = '0px';
                        if ($scope.newStyles['left'] == null)
                            $scope.newStyles['left'] = '0px';
                        if ($scope.newStyles['right'] == null)
                            $scope.newStyles['right'] = "0px";
                        if ($scope.newStyles['bottom'] == null)
                            $scope.newStyles['bottom'] = "0px";
                        $scope.fullImageStyles = JSON.parse(JSON.stringify($scope.newStyles));
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