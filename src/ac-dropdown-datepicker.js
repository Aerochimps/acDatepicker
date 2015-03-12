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
              template += '<button type="button" class="dropdown-toggle" ng-class="settings.buttonClasses" ng-click="toggleDropdown()">{{getButtonText()}}&nbsp;<i class="icon-down"></i></button>';
              template += '<ul class="dropdown-menu dropdown-menu-form" ng-click="$event.stopPropagation()" ng-style="{display: (settings.alwaysOpened || open) ? \'block\' : \'none\', height : settings.scrollable ? settings.scrollableHeight : \'auto\' }" style="overflow: scroll" >';
              template += '<li><datepicker ng-model="ngModel" min-date="minDate" show-weeks="showWeeks" datepicker-options="datepickerOptions" ng-keydown="keydown($event)" class="well well-sm"></datepicker></li>'
              template += '</ul>';
              template += '</div>';
          
          return template;
        },


        link: function (scope, element, attributes) {

          var dropdownTrigger = element.children()[0];
          
          scope.toggleDropdown = function () {
              scope.open = !scope.open;
          };

          scope.externalEvents = {
              onItemSelect: angular.noop,
              onItemDeselect: angular.noop,
              onSelectAll: angular.noop,
              onDeselectAll: angular.noop,
              onInitDone: angular.noop,
              onMaxSelectionReached: angular.noop,
              onNewItemAdd: angular.noop,
              onItemEdit: angular.noop,
              onItemRemove: angular.noop
          };

          scope.settings = {
              scrollable: false,
              scrollableHeight: '300px',
              closeOnBlur: true,
              alwaysOpened: false,
              closeOnSelect: false,
              buttonClasses: 'btn btn-default',
              closeOnDeselect: false
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
                  var parentFound = $(target).closest('.multiselect-parent').length > 0;

                  if (!parentFound) {
                      scope.$apply(function () {
                          scope.open = false;
                      });
                  }
              });
          }

          scope.getButtonText = function () {
              return scope.texts.buttonDefaultText;
          };

          scope.externalEvents.onInitDone();
        }
      };
  }]);
})();