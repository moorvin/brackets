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
                  return 'Не валидно';
                }
              }
            }
            if (stack.length === 0) {
              return 'Валидно';
            }
          }
          return 'Не валидно';
        });
      }
    };
  });
