'use strict';
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self.webpackChunk = self.webpackChunk || []).push([['commons'], {

  /***/ './src/utils.js':
  /*! **********************!*\
  !*** ./src/utils.js ***!
  \**********************/
  /***/ (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
    debugger
    eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   add: () => (/* binding */ add),\n/* harmony export */   createLogger: () => (/* binding */ createLogger)\n/* harmony export */ });\n// 创建日志记录器\nconst createLogger = (prefix) => {\n    return (message) => {\n        const timestamp = new Date().toISOString();\n        const logMessage = `[${prefix}] ${message} (${timestamp})`;\n        console.log(logMessage);\n        \n        // 同时在页面上显示\n        const output = document.getElementById('output');\n        if (output) {\n            const line = document.createElement('div');\n            line.textContent = logMessage;\n            output.appendChild(line);\n        }\n    };\n};\n\n// 基础数学运算\nconst add = (a, b) => {\n    return a + b;\n};\n\n\n//# sourceURL=webpack:///./src/utils.js?")
    /***/ }

}])
