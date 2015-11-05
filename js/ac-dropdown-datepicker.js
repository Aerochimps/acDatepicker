(function() {
	'use strict';
	angular.module('ac-dropdown-datepicker', [])

		.directive('acDropdownDatepicker', ['$filter', '$document', function ($filter, $document) {

			return {
				restrict: 'AEC',
				scope: {
					ngModel: '=',
					minDate: '=',
					showWeeks: '=',
					datepickerOptions: '=',
					extraSettings: '=',
					events: '=',
					translationTexts: '='
				},

				template: function (element, attributes) {
					var template =  '<div class="multiselect-parent btn-group dropdown-multiselect" ng-class="{active: open && !settings.alwaysOpened}">';
						template += '<button type="button" class="acButton dropdown-toggle" ng-class="settings.buttonClasses" ng-click="toggleDropdown()"><span class="acButtonLabel">{{getButtonText()}}&nbsp;</span><i class="fa fa-caret-down"></i></button>';
						template += '<div class="dropdown-menu dropdown-menu-form" ng-click="stopEvent($event)" ng-style="{display: (settings.alwaysOpened || open) ? \'block\' : \'none\', height : settings.scrollable ? settings.scrollableHeight : \'auto\' }" >';
						template += '<datepicker ng-model="ngModel" min-date="minDate" show-weeks="showWeeks" datepicker-options="datepickerOptions" ng-keydown="keydown($event)" class="acCalendar well well-sm"></datepicker>'
						template += '<div class="today"><a ng-click="today()">Hoje</a></div>';
						template += '</div>';
					return template;
				},


				link: function (scope, element, attributes) {

				var dropdownTrigger = element.children()[0];

					scope.toggleDropdown = function () {
						scope.open = !scope.open;
					};

					scope.today = function(){
						scope.ngModel = new Date();
						scope.open = false;
						scope.externalEvents.onItemSelect(scope.ngModel)
					}

					scope.stopEvent = function(event){
						var role = (event.target.childElementCount > 0)? angular.element(event.target.parentElement).attr('role') : angular.element(event.target.parentElement.parentElement).attr('role')
						if (role == undefined) {
							 event.stopPropagation();
						}else{
							var selection = (event.target.childElementCount > 0)? angular.element(event.target.children).text() : angular.element(event.target).text();
							if (scope.isDay(selection)) {
									scope.open = false;
									scope.externalEvents.onItemSelect(scope.ngModel)
							}else{
								event.stopPropagation();
							}
						}
					}

					scope.externalEvents = {
						onItemSelect: angular.noop,
						onItemDeselect: angular.noop,
						onInitDone: angular.noop
					};

					scope.settings = {
						scrollable: false,
						scrollableHeight: '300px',
						closeOnBlur: true,
						alwaysOpened: false,
						closeOnSelect: false,
						buttonClasses: 'dropdown-button',
						closeOnDeselect: false,
						dynamicTitle: false,
						dynamicTitleRange:0
					};

					scope.texts = {
						buttonDefaultText: 'Select'
					};

					angular.extend(scope.settings, scope.extraSettings || []);
					angular.extend(scope.externalEvents, scope.events || []);
					angular.extend(scope.texts, scope.translationTexts);
 
					if (scope.settings.closeOnBlur) {
						$document.on('click', function (e) {
							var target = e.target.parentElement;
							var parentFound = $(target).closest('.multiselect-parent.active').length > 0;

							if (!parentFound) {
								scope.$apply(function () {
									scope.open = false;
								});
							}
					});
				}

				scope.getButtonText = function () {
					if (scope.settings.dynamicTitle ) {
						if(scope.settings.dynamicTitleRange > 0){
							return moment(scope.ngModel).format(angular.element("#dateFormat").val()) + ' - ' + moment(scope.ngModel).add(scope.settings.dynamicTitleRange,'days').format(angular.element("#dateFormat").val());
						}else{
							return moment(scope.ngModel).format(angular.element("#dateFormat").val());
						}
					}else{
						return scope.texts.buttonDefaultText;
					}
				};

				scope.isDay = function(obj){
					var number = obj * 1
					return angular.isNumber(number) && number > 0 && number < 31
				}
				scope.externalEvents.onInitDone();
			}
		};
	}]);
})();