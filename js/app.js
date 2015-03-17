(function () {

	'use strict';
	var dependencies = ['ac-dropdown-datepicker','ui.bootstrap'];
	angular.module('acDropdownDatepickerDemo', dependencies)

		/* @ngInject */
		.controller('acDropdownDatepickerDemoCtrl', function ($scope) {
			$scope.examplemodel = [];
			$scope.$watch('examplemodel', function () { $scope.asd = $scope.examplemodel.id; },true);
			$scope.dt = new Date();


		});
})();