(function () {

	'use strict';
	var dependencies = ['ac-dropdown-datepicker','ui.bootstrap'];
	angular.module('acDropdownDatepickerDemo', dependencies)

		/* @ngInject */
		.controller('acDropdownDatepickerDemoCtrl', function ($scope) {
			$scope.examplemodel = [];
			$scope.$watch('examplemodel', function () { $scope.asd = $scope.examplemodel.id; },true);
			$scope.dt = new Date();


			$scope.exampleevents = {
				onNewItemAdd: function (newItem) {
					var id = $scope.exampledata.length + 1;
					$scope.exampledata.push({id:id, label:newItem});
					console.log(newItem);
				},
				// onItemEdit: function (id, label) {
				// 	// debugger;
				// },
				// onItemRemove: function (id) {
				// 	// debugger;
				// }
			};
		});
})();