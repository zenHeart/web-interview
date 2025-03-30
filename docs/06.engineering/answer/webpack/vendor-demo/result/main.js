'use strict';
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self.webpackChunk = self.webpackChunk || []).push([['main'], {

  /***/ './src/main.js':
  /*! *********************!*\
  !*** ./src/main.js ***!
  \*********************/
  /***/ (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
    eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ \"./src/utils.js\");\n/* harmony import */ var _vendor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./vendor */ \"./src/vendor.js\");\n\n\n\nconst logger = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.createLogger)('Main')\nlogger('主模块开始初始化')\n\n// 创建计算器实例\nconst calculator = new _vendor__WEBPACK_IMPORTED_MODULE_1__.Calculator()\nlogger('计算器已创建')\n\n// 暴露测试函数到全局\nwindow.testAdd = function(a, b) {\n  logger(`执行加法运算: ${a} + ${b}`)\n  const result = calculator.add(a, b)\n  logger(`计算结果: ${result}`)\n  return result\n}\n\nlogger('主模块加载完成，可以开始测试')\n\n\n//# sourceURL=webpack:///./src/main.js?")
    /***/ },

  /***/ './src/vendor.js':
  /*! ***********************!*\
  !*** ./src/vendor.js ***!
  \***********************/
  /***/ (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
    eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Calculator: () => (/* binding */ Calculator)\n/* harmony export */ });\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ \"./src/utils.js\");\n\n\nconst logger = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.createLogger)('Vendor')\nlogger('计算器模块初始化')\n\nclass Calculator {\n  constructor () {\n    this.logger = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.createLogger)('Calculator')\n    this.history = []\n    this.logger('计算器实例已创建')\n  }\n\n  add (a, b) {\n    const result = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.add)(a, b)\n    const operation = `${a} + ${b} = ${result}`\n    this.history.push(operation)\n    this.logger(`计算完成: ${operation}`)\n    return result\n  }\n\n  getHistory () {\n    return this.history\n  }\n}\n\nlogger('计算器模块加载完成')\n\n\n//# sourceURL=webpack:///./src/vendor.js?")
    /***/ }

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ const __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
  /******/ __webpack_require__.O(0, ['commons'], () => (__webpack_exec__('./src/main.js')))
  /******/ const __webpack_exports__ = __webpack_require__.O()
/******/ }
])
