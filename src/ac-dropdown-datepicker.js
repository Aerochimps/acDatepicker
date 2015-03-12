(function() {

  'use strict';

  angular.module('ac-dropdown-datepicker', [])

    .directive('acDropdownDatepicker', ['$filter', '$document', function ($filter, $document) {

      return {
        restrict: 'AE',

        scope: {
          ngModel: '=',
          minDate: '=',
          showWeeks: '=',
          datepickerOptions: '=',
          options: '=',
          extraSettings: '=',
          events: '=',
          translationTexts: '=',
          useFontAwesome:'='
        },

        template: function (element, attributes) {
          var iconTag = attributes.useFontAwesome ? 'i' : 'span'
          var iconClass = attributes.useFontAwesome ? 'fa' : 'glyphicon'

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

          scope.checkboxClick = function (event, id) {
              scope.setSelectedItem(id);
              event.stopImmediatePropagation();
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
              dynamicTitle: true,
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

          scope.singleSelection = scope.settings.selectionLimit === 1;

          function getFindObj(id) {
              var findObj = {};

              if (scope.settings.externalIdProp === '') {
                  findObj[scope.settings.idProp] = id;
              } else {
                  findObj[scope.settings.externalIdProp] = id;
              }

              return findObj;
          }

          function clearObject(object) {
              for (var prop in object) {
                  delete object[prop];
              }
          }

          if (scope.singleSelection) {
              if (angular.isArray(scope.selectedModel) && scope.selectedModel.length === 0) {
                  clearObject(scope.selectedModel);
              }
          }

          if (scope.settings.closeOnBlur) {
              $document.on('click', function (e) {
                  var target = e.target.parentElement;
                  var parentFound = $(target).closest('.multiselect-parent').length > 0;;

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


          scope.setSelectedItem = function (id, dontRemove) {
              var findObj = getFindObj(id);
              var finalObj = null;

              if (scope.settings.externalIdProp === '') {
                  finalObj = _.find(scope.options, findObj);
              } else {
                  finalObj = findObj;
              }

              if (scope.singleSelection) {
                  clearObject(scope.selectedModel);
                  angular.extend(scope.selectedModel, finalObj);
                  scope.externalEvents.onItemSelect(finalObj);

                  return;
              }

              dontRemove = dontRemove || false;

              var exists = _.findIndex(scope.selectedModel, findObj) !== -1;

              if (!dontRemove && exists) {
                  scope.selectedModel.splice(_.findIndex(scope.selectedModel, findObj), 1);
                  scope.externalEvents.onItemDeselect(findObj);
              } else if (!exists && (scope.settings.selectionLimit === 0 || scope.selectedModel.length < scope.settings.selectionLimit)) {
                  scope.selectedModel.push(finalObj);
                  scope.externalEvents.onItemSelect(finalObj);
              }
          };


          scope.externalEvents.onInitDone();
        }
      };
  }]);
})();