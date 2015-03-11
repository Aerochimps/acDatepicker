(function () {

	'use strict';
	var dependencies = ['ac-dropdown-datepicker','ui.bootstrap'];
	angular.module('acDropdownDatepickerDemo', dependencies)

		/* @ngInject */
		.controller('acDropdownDatepickerDemoCtrl', function ($scope) {
			$scope.examplemodel = [];
			$scope.$watch('examplemodel', function () { $scope.asd = $scope.examplemodel.id; },true);
			$scope.exampledata = [
				{id: 1, label: 'David'},
				{id: 2, label: 'Jhon'},
				{id: 3, label: 'Danny'}];
			$scope.examplesettings = {
				showCheckAll: false,
				showUncheckAll: false,
				dynamicTitle: true,
				smartButtonMaxItems: 3,
				enableNewItem: true,
				selectionLimit: 2,
				enableEdit: true
			};

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