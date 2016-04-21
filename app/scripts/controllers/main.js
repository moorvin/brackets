'use strict';

/**
 * @ngdoc function
 * @name testApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the testApp
 */
angular.module('testApp')
  .directive('brackets', function() {
    return {
      require: 'ngModel',
      scope: {
        rez: '=color',
      },
      link: function(scope, elm, attrs, ctrl) {
        ctrl.$parsers.unshift(function(brackets) {
          if (/^[\[|\]|\(|\)|\{|\}]+$/.test(brackets)) {
            var stack = [];
            for (var i = 0; i < brackets.length; i++) {
              var numLastElemStack = stack.length -1;
              if (brackets[i] === '{' || brackets[i] === '[' || brackets[i] === '(') {
                stack.push(brackets[i]);
              }
              else {
                if (stack[numLastElemStack] === '{' && brackets[i] === '}' ||
                  stack[numLastElemStack] === '[' && brackets[i] === ']' ||
                  stack[numLastElemStack] === '(' && brackets[i] === ')') {
                  stack.pop();
                }
                else {
                  scope.rez = 'false';
                  return 'Не валидно';
                }
              }
            }
            if (stack.length === 0) {
              scope.rez = 'true';
              return 'Валидно';
            }
          }
          else {
            scope.rez = 'false';
            return 'Вы ввели недопустимые символы';
          }
          scope.rez = 'false';
          return 'Не валидно';
        });
      }
    };
  });
