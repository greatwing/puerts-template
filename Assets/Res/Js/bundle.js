/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/GameMain.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/GameMain.ts":
/*!*************************!*\
  !*** ./src/GameMain.ts ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var csharp__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! csharp */ "csharp");
/* harmony import */ var csharp__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(csharp__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./framework/logger/Logger */ "./src/framework/logger/Logger.ts");
// import {UnitTest} from './unittest/UnitTest';

// import { SceneDef } from './framework/scene/SceneDef';
// import { S } from './global/GameConfig';

// import { commonUI } from './data/ui/common';
// import { UIServerListItem } from './game/module/login/ui/UIServerListItem';
class GameMain {
    constructor() {
        csharp__WEBPACK_IMPORTED_MODULE_0__["JsManager"].Instance.JsOnApplicationQuit = () => this.onApplicationQuit();
        csharp__WEBPACK_IMPORTED_MODULE_0__["JsManager"].Instance.JsOnDispose = () => this.onDispose();
    }
    start() {
        try {
            _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_1__["Logger"].log("Game start in JS....");
            // S.StoryManager.initialize();
            // //加载通用FairyGUI资源
            // await S.ResManager.loadFairyGUIPackage(commonUI.PackageName);
            // //do Unit Test
            // UnitTest.doTest();
            // //进入登录模块
            // await S.SceneManager.loadScene(SceneDef.LoginScene);
            //JS启动完成，通知C#层
            csharp__WEBPACK_IMPORTED_MODULE_0__["GameLaunch"].Instance.JsLuanchFinish();
            // let extItem = ()=>{
            // let item =  new UIServerListItem();
            // // pool.push(item)
            // return item;
            // }
            // FairyGUI.UIObjectFactory.SetPackageItemExtension("ui://l64dumk9feeg54",extItem)
        }
        catch (ex) {
            _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_1__["Logger"].error(ex);
        }
    }
    onApplicationQuit() {
        // S.GameObjectPool.cleanup(true);
        _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_1__["Logger"].log("Game onApplicationQuit in JS....");
    }
    onDispose() {
        _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_1__["Logger"].log("Game onDispose in JS....");
    }
}
new GameMain().start();


/***/ }),

/***/ "./src/framework/logger/Logger.ts":
/*!****************************************!*\
  !*** ./src/framework/logger/Logger.ts ***!
  \****************************************/
/*! exports provided: Logger */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Logger", function() { return Logger; });
/* harmony import */ var csharp__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! csharp */ "csharp");
/* harmony import */ var csharp__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(csharp__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _global_GameConfig__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../global/GameConfig */ "./src/global/GameConfig.ts");


var LogType;
(function (LogType) {
    LogType[LogType["Error"] = 0] = "Error";
    LogType[LogType["Assert"] = 1] = "Assert";
    LogType[LogType["Warning"] = 2] = "Warning";
    LogType[LogType["Log"] = 3] = "Log";
    LogType[LogType["Exception"] = 4] = "Exception";
})(LogType || (LogType = {}));
class Logger {
    static getPrintStack(type, showStack, ...args) {
        let message = '';
        for (let i = 0; i < args.length; i++) {
            const element = args[i];
            if (typeof element === 'object' && Logger.LOG_OBJECT_TO_JSON) {
                message += JSON.stringify(element);
            }
            else {
                message += element;
            }
            if (i < args.length - 1) {
                message += ' ';
            }
        }
        if (showStack || csharp__WEBPACK_IMPORTED_MODULE_0__["UnityEngine"].Application.isEditor) {
            var stacks = new Error().stack.split('\n');
            for (let i = 3; i < stacks.length; i++) {
                const line = stacks[i];
                message += '\n';
                message += line;
            }
        }
        if (!Logger.unity_log_target) {
            Logger.unity_log_target = new csharp__WEBPACK_IMPORTED_MODULE_0__["UnityEngine"].Object();
        }
        return message;
    }
    static log(...args) {
        if (!_global_GameConfig__WEBPACK_IMPORTED_MODULE_1__["GameConfig"].debug)
            return;
        let msg = Logger.getPrintStack(LogType.Log, true, args);
        console.log(msg);
    }
    /**
     * Outputs a warning message to the Logger.
     * @param message  list of JavaScript objects to output. The string representations of each of these objects are appended together in the order listed and output.
     */
    static warn(...args) {
        if (!_global_GameConfig__WEBPACK_IMPORTED_MODULE_1__["GameConfig"].debug)
            return;
        let msg = Logger.getPrintStack(LogType.Warning, true, args);
        console.warn(msg);
    }
    /**
     * Outputs an error message to the Logger.
     * @param message A list of JavaScript objects to output. The string representations of each of these objects are appended together in the order listed and output.
     */
    static error(...args) {
        if (!_global_GameConfig__WEBPACK_IMPORTED_MODULE_1__["GameConfig"].debug)
            return;
        let msg = Logger.getPrintStack(LogType.Error, true, args);
        console.error(msg);
    }
    /** Outputs a stack trace to the Logger.
     * @param message A list of JavaScript objects to output. The string representations of each of these objects are appended together in the order listed and output.
    */
    static trace(...args) {
        if (!_global_GameConfig__WEBPACK_IMPORTED_MODULE_1__["GameConfig"].debug)
            return;
        let msg = Logger.getPrintStack(LogType.Log, true, args);
        console.log(msg);
    }
    /** Log JavaScript Objects as JSON format */
    static LOG_OBJECT_TO_JSON(...args) {
        return false;
    }
}
Logger.unity_log_target = null;


/***/ }),

/***/ "./src/global/GameConfig.ts":
/*!**********************************!*\
  !*** ./src/global/GameConfig.ts ***!
  \**********************************/
/*! exports provided: GameConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GameConfig", function() { return GameConfig; });
// import { GameObjectPool } from "../framework/common/GameObjectPool";
// import { ResManager } from "../framework/common/ResManager";
// import { StoryManager } from "../framework/ink/StoryManager";
// import { StoryMessageManager } from "../framework/ink/StoryMessageManager";
// import { GameSession } from "../framework/net/GameSession";
// import { HttpManager } from "../framework/net/HttpManager";
// import { SessionManager } from "../framework/net/SessionManager";
// import { SceneManager } from "../framework/scene/SceneManager";
// import { UIManager } from "../framework/ui/UIManager";
// import { UIMessageManger } from "../game/event/UIMessageManager";
class GameConfig {
}
GameConfig.debug = true;
// export class S{
// public static UIManager = UIManager.Instance(UIManager);
// public static UIMessageManger = UIMessageManger.Instance(UIMessageManger);
// public static SceneManager = SceneManager.Instance(SceneManager);
// public static GameObjectPool = GameObjectPool.Instance(GameObjectPool);
// public static ResManager = ResManager.Instance(ResManager);
// public static StoryManager = StoryManager.Instance(StoryManager);
// public static SessionManager = SessionManager.Instance(SessionManager);
// public static GameSession = GameSession.Instance(GameSession);
// public static StoryMessageManager = StoryMessageManager.Instance(StoryMessageManager);
// public static HttpManager = HttpManager.Instance(HttpManager);
// }


/***/ }),

/***/ "csharp":
/*!*************************!*\
  !*** external "csharp" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("csharp");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL0dhbWVNYWluLnRzIiwid2VicGFjazovLy8uL3NyYy9mcmFtZXdvcmsvbG9nZ2VyL0xvZ2dlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZ2xvYmFsL0dhbWVDb25maWcudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiY3NoYXJwXCIiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7OztBQ2pGQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGdEQUFnRDtBQUNEO0FBQy9DLHlEQUF5RDtBQUN6RCwyQ0FBMkM7QUFDUTtBQUNuRCwrQ0FBK0M7QUFDL0MsOEVBQThFO0FBSTlFLE1BQU0sUUFBUTtJQUVWO1FBQ0ksZ0RBQVMsQ0FBQyxRQUFRLENBQUMsbUJBQW1CLEdBQUcsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGlC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QUFLLENBQUM7SUFDakIsQ0FBQzs7QUE3RWdCLHVCQUFnQixHQUFHLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7OztBQ1g3QztBQUFBO0FBQUEsdUVBQXVFO0FBQ3ZFLCtEQUErRDtBQUMvRCxnRUFBZ0U7QUFDaEUsOEVBQThFO0FBQzlFLDhEQUE4RDtBQUM5RCw4REFBOEQ7QUFDOUQsb0VBQW9FO0FBQ3BFLGtFQUFrRTtBQUNsRSx5REFBeUQ7QUFDekQsb0VBQW9FO0FBRTdELE1BQU8sVUFBVTs7QUFFTixnQkFBSyxHQUFXLElBQUksQ0FBQztBQU92QyxrQkFBa0I7QUFDZCwyREFBMkQ7QUFDM0QsNkVBQTZFO0FBQzdFLG9FQUFvRTtBQUNwRSwwRUFBMEU7QUFDMUUsOERBQThEO0FBQzlELG9FQUFvRTtBQUNwRSwwRUFBMEU7QUFDMUUsaUVBQWlFO0FBQ2pFLHlGQUF5RjtBQUN6RixpRUFBaUU7QUFDckUsSUFBSTs7Ozs7Ozs7Ozs7O0FDL0JKLG1DIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL0dhbWVNYWluLnRzXCIpO1xuIiwiXHJcbi8vIGltcG9ydCB7VW5pdFRlc3R9IGZyb20gJy4vdW5pdHRlc3QvVW5pdFRlc3QnO1xyXG5pbXBvcnQgeyBKc01hbmFnZXIgLEdhbWVMYXVuY2ggfSBmcm9tICdjc2hhcnAnO1xyXG4vLyBpbXBvcnQgeyBTY2VuZURlZiB9IGZyb20gJy4vZnJhbWV3b3JrL3NjZW5lL1NjZW5lRGVmJztcclxuLy8gaW1wb3J0IHsgUyB9IGZyb20gJy4vZ2xvYmFsL0dhbWVDb25maWcnO1xyXG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tICcuL2ZyYW1ld29yay9sb2dnZXIvTG9nZ2VyJztcclxuLy8gaW1wb3J0IHsgY29tbW9uVUkgfSBmcm9tICcuL2RhdGEvdWkvY29tbW9uJztcclxuLy8gaW1wb3J0IHsgVUlTZXJ2ZXJMaXN0SXRlbSB9IGZyb20gJy4vZ2FtZS9tb2R1bGUvbG9naW4vdWkvVUlTZXJ2ZXJMaXN0SXRlbSc7XHJcblxyXG5cclxuXHJcbmNsYXNzIEdhbWVNYWlue1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIEpzTWFuYWdlci5JbnN0YW5jZS5Kc09uQXBwbGljYXRpb25RdWl0ID0gKCkgPT4gdGhpcy5vbkFwcGxpY2F0aW9uUXVpdCgpO1xyXG4gICAgICAgIEpzTWFuYWdlci5JbnN0YW5jZS5Kc09uRGlzcG9zZSA9ICgpID0+IHRoaXMub25EaXNwb3NlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXJ0KCkge1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRyeXtcclxuICAgICAgICAgICAgTG9nZ2VyLmxvZyhcIkdhbWUgc3RhcnQgaW4gSlMuLi4uXCIpO1xyXG5cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIFMuU3RvcnlNYW5hZ2VyLmluaXRpYWxpemUoKTtcclxuXHJcbiAgICAgIFxyXG4gICAgICAgICAgICAvLyAvL+WKoOi9vemAmueUqEZhaXJ5R1VJ6LWE5rqQXHJcbiAgICAgICAgICAgIC8vIGF3YWl0IFMuUmVzTWFuYWdlci5sb2FkRmFpcnlHVUlQYWNrYWdlKGNvbW1vblVJLlBhY2thZ2VOYW1lKTtcclxuXHJcbiAgICAgICAgICAgIC8vIC8vZG8gVW5pdCBUZXN0XHJcbiAgICAgICAgICAgIC8vIFVuaXRUZXN0LmRvVGVzdCgpO1xyXG5cclxuICAgICAgICAgICAgLy8gLy/ov5vlhaXnmbvlvZXmqKHlnZdcclxuICAgICAgICAgICAgLy8gYXdhaXQgUy5TY2VuZU1hbmFnZXIubG9hZFNjZW5lKFNjZW5lRGVmLkxvZ2luU2NlbmUpO1xyXG5cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vSlPlkK/liqjlrozmiJDvvIzpgJrnn6VDI+WxglxyXG4gICAgICAgICAgICBHYW1lTGF1bmNoLkluc3RhbmNlLkpzTHVhbmNoRmluaXNoKCk7XHJcblxyXG4gICAgICAgICAgICAvLyBsZXQgZXh0SXRlbSA9ICgpPT57XHJcbiAgICAgICAgICAgICAgICAvLyBsZXQgaXRlbSA9ICBuZXcgVUlTZXJ2ZXJMaXN0SXRlbSgpO1xyXG4gICAgICAgICAgICAgICAvLyAvLyBwb29sLnB1c2goaXRlbSlcclxuICAgICAgICAgICAgICAgIC8vIHJldHVybiBpdGVtO1xyXG4gICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgIC8vIEZhaXJ5R1VJLlVJT2JqZWN0RmFjdG9yeS5TZXRQYWNrYWdlSXRlbUV4dGVuc2lvbihcInVpOi8vbDY0ZHVtazlmZWVnNTRcIixleHRJdGVtKVxyXG4gICAgICAgICAgICBcclxuXHJcbiAgICAgICAgfWNhdGNoKGV4KXtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKGV4KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbkFwcGxpY2F0aW9uUXVpdCgpOnZvaWQge1xyXG5cclxuICAgICAgICAvLyBTLkdhbWVPYmplY3RQb29sLmNsZWFudXAodHJ1ZSk7XHJcbiAgICAgICAgTG9nZ2VyLmxvZyhcIkdhbWUgb25BcHBsaWNhdGlvblF1aXQgaW4gSlMuLi4uXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbkRpc3Bvc2UoKTp2b2lkIHtcclxuICAgICAgICBcclxuICAgICAgICBMb2dnZXIubG9nKFwiR2FtZSBvbkRpc3Bvc2UgaW4gSlMuLi4uXCIpO1xyXG4gICAgfVxyXG4gICAgXHJcbn1cclxuXHJcbm5ldyBHYW1lTWFpbigpLnN0YXJ0KCk7XHJcblxyXG4iLCJpbXBvcnQgeyBVbml0eUVuZ2luZSB9IGZyb20gJ2NzaGFycCc7XHJcbmltcG9ydCB7IEdhbWVDb25maWcgfSBmcm9tICcuLi8uLi9nbG9iYWwvR2FtZUNvbmZpZyc7XHJcbmVudW0gTG9nVHlwZSB7XHJcblx0RXJyb3IgPSAwLFxyXG5cdEFzc2VydCA9IDEsXHJcblx0V2FybmluZyA9IDIsXHJcblx0TG9nID0gMyxcclxuXHRFeGNlcHRpb24gPSA0XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBMb2dnZXJ7XHJcbiAgICBwcml2YXRlICBzdGF0aWMgIHVuaXR5X2xvZ190YXJnZXQgPSBudWxsO1xyXG5cclxuICAgIHN0YXRpYyBnZXRQcmludFN0YWNrKHR5cGU6IExvZ1R5cGUsIHNob3dTdGFjayA6IGJvb2xlYW4sIC4uLmFyZ3MpIHtcclxuICAgICAgICBsZXQgbWVzc2FnZSA9ICcnO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gYXJnc1tpXTtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBlbGVtZW50ID09PSAnb2JqZWN0JyAmJiBMb2dnZXIuTE9HX09CSkVDVF9UT19KU09OKSB7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlICs9IEpTT04uc3RyaW5naWZ5KGVsZW1lbnQpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZSArPSBlbGVtZW50O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChpIDwgYXJncy5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlICs9ICcgJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIGlmIChzaG93U3RhY2sgfHwgVW5pdHlFbmdpbmUuQXBwbGljYXRpb24uaXNFZGl0b3IpIHtcclxuICAgICAgICAgICAgdmFyIHN0YWNrcyA9IG5ldyBFcnJvcigpLnN0YWNrLnNwbGl0KCdcXG4nKTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDM7IGkgPCBzdGFja3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGxpbmUgPSBzdGFja3NbaV07XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlICs9ICdcXG4nO1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZSArPSBsaW5lO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgaWYgKCFMb2dnZXIudW5pdHlfbG9nX3RhcmdldCkge1xyXG4gICAgICAgICAgICBMb2dnZXIudW5pdHlfbG9nX3RhcmdldCA9IG5ldyBVbml0eUVuZ2luZS5PYmplY3QoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBtZXNzYWdlO1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG5cclxuXHRzdGF0aWMgbG9nKC4uLmFyZ3MpOiB2b2lke1xyXG4gICAgICAgIGlmKCFHYW1lQ29uZmlnLmRlYnVnKSByZXR1cm47XHJcblxyXG4gICAgICAgIGxldCBtc2cgPSBMb2dnZXIuZ2V0UHJpbnRTdGFjayhMb2dUeXBlLkxvZywgdHJ1ZSwgYXJncyk7XHJcbiAgICAgICAgY29uc29sZS5sb2cobXNnKTtcclxuICAgIH1cclxuXHJcblx0LyoqXHJcblx0ICogT3V0cHV0cyBhIHdhcm5pbmcgbWVzc2FnZSB0byB0aGUgTG9nZ2VyLlxyXG5cdCAqIEBwYXJhbSBtZXNzYWdlICBsaXN0IG9mIEphdmFTY3JpcHQgb2JqZWN0cyB0byBvdXRwdXQuIFRoZSBzdHJpbmcgcmVwcmVzZW50YXRpb25zIG9mIGVhY2ggb2YgdGhlc2Ugb2JqZWN0cyBhcmUgYXBwZW5kZWQgdG9nZXRoZXIgaW4gdGhlIG9yZGVyIGxpc3RlZCBhbmQgb3V0cHV0LlxyXG5cdCAqL1xyXG5cdHN0YXRpYyB3YXJuKC4uLmFyZ3MpOiB2b2lke1xyXG4gICAgICAgIGlmKCFHYW1lQ29uZmlnLmRlYnVnKSByZXR1cm47XHJcblxyXG4gICAgICAgIGxldCBtc2cgPSBMb2dnZXIuZ2V0UHJpbnRTdGFjayhMb2dUeXBlLldhcm5pbmcsIHRydWUsIGFyZ3MpO1xyXG4gICAgICAgIGNvbnNvbGUud2Fybihtc2cpO1xyXG4gICAgfVxyXG5cclxuXHQvKipcclxuXHQgKiBPdXRwdXRzIGFuIGVycm9yIG1lc3NhZ2UgdG8gdGhlIExvZ2dlci5cclxuXHQgKiBAcGFyYW0gbWVzc2FnZSBBIGxpc3Qgb2YgSmF2YVNjcmlwdCBvYmplY3RzIHRvIG91dHB1dC4gVGhlIHN0cmluZyByZXByZXNlbnRhdGlvbnMgb2YgZWFjaCBvZiB0aGVzZSBvYmplY3RzIGFyZSBhcHBlbmRlZCB0b2dldGhlciBpbiB0aGUgb3JkZXIgbGlzdGVkIGFuZCBvdXRwdXQuXHJcblx0ICovXHJcblx0c3RhdGljIGVycm9yKC4uLmFyZ3MpOiB2b2lke1xyXG4gICAgICAgIGlmKCFHYW1lQ29uZmlnLmRlYnVnKSByZXR1cm47XHJcblxyXG4gICAgICAgIGxldCBtc2cgPSBMb2dnZXIuZ2V0UHJpbnRTdGFjayhMb2dUeXBlLkVycm9yLCB0cnVlLCBhcmdzKTtcclxuICAgICAgICBjb25zb2xlLmVycm9yKG1zZyk7XHJcbiAgICB9XHJcblxyXG5cdC8qKiBPdXRwdXRzIGEgc3RhY2sgdHJhY2UgdG8gdGhlIExvZ2dlci5cclxuXHQgKiBAcGFyYW0gbWVzc2FnZSBBIGxpc3Qgb2YgSmF2YVNjcmlwdCBvYmplY3RzIHRvIG91dHB1dC4gVGhlIHN0cmluZyByZXByZXNlbnRhdGlvbnMgb2YgZWFjaCBvZiB0aGVzZSBvYmplY3RzIGFyZSBhcHBlbmRlZCB0b2dldGhlciBpbiB0aGUgb3JkZXIgbGlzdGVkIGFuZCBvdXRwdXQuXHJcblx0Ki9cclxuXHRzdGF0aWMgdHJhY2UoLi4uYXJncyk6IHZvaWR7XHJcbiAgICAgICAgaWYoIUdhbWVDb25maWcuZGVidWcpIHJldHVybjtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgbXNnID0gTG9nZ2VyLmdldFByaW50U3RhY2soTG9nVHlwZS5Mb2csIHRydWUsIGFyZ3MpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKG1zZyk7XHJcbiAgICB9XHJcblxyXG5cdC8qKiBMb2cgSmF2YVNjcmlwdCBPYmplY3RzIGFzIEpTT04gZm9ybWF0ICovXHJcblx0c3RhdGljIExPR19PQkpFQ1RfVE9fSlNPTiguLi5hcmdzKTogYm9vbGVhbntcclxuXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxufSIsIi8vIGltcG9ydCB7IEdhbWVPYmplY3RQb29sIH0gZnJvbSBcIi4uL2ZyYW1ld29yay9jb21tb24vR2FtZU9iamVjdFBvb2xcIjtcclxuLy8gaW1wb3J0IHsgUmVzTWFuYWdlciB9IGZyb20gXCIuLi9mcmFtZXdvcmsvY29tbW9uL1Jlc01hbmFnZXJcIjtcclxuLy8gaW1wb3J0IHsgU3RvcnlNYW5hZ2VyIH0gZnJvbSBcIi4uL2ZyYW1ld29yay9pbmsvU3RvcnlNYW5hZ2VyXCI7XHJcbi8vIGltcG9ydCB7IFN0b3J5TWVzc2FnZU1hbmFnZXIgfSBmcm9tIFwiLi4vZnJhbWV3b3JrL2luay9TdG9yeU1lc3NhZ2VNYW5hZ2VyXCI7XHJcbi8vIGltcG9ydCB7IEdhbWVTZXNzaW9uIH0gZnJvbSBcIi4uL2ZyYW1ld29yay9uZXQvR2FtZVNlc3Npb25cIjtcclxuLy8gaW1wb3J0IHsgSHR0cE1hbmFnZXIgfSBmcm9tIFwiLi4vZnJhbWV3b3JrL25ldC9IdHRwTWFuYWdlclwiO1xyXG4vLyBpbXBvcnQgeyBTZXNzaW9uTWFuYWdlciB9IGZyb20gXCIuLi9mcmFtZXdvcmsvbmV0L1Nlc3Npb25NYW5hZ2VyXCI7XHJcbi8vIGltcG9ydCB7IFNjZW5lTWFuYWdlciB9IGZyb20gXCIuLi9mcmFtZXdvcmsvc2NlbmUvU2NlbmVNYW5hZ2VyXCI7XHJcbi8vIGltcG9ydCB7IFVJTWFuYWdlciB9IGZyb20gXCIuLi9mcmFtZXdvcmsvdWkvVUlNYW5hZ2VyXCI7XHJcbi8vIGltcG9ydCB7IFVJTWVzc2FnZU1hbmdlciB9IGZyb20gXCIuLi9nYW1lL2V2ZW50L1VJTWVzc2FnZU1hbmFnZXJcIjtcclxuXHJcbmV4cG9ydCAgY2xhc3MgR2FtZUNvbmZpZ3tcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGRlYnVnOmJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAgIC8vIHB1YmxpYyBzdGF0aWMgcmVhbG1TZXJ2ZXJJUDpzdHJpbmcgPSBcIjEyNy4wLjAuMVwiOyBcclxuICAgIC8vIHB1YmxpYyBzdGF0aWMgcmVhbG1TZXJ2ZXJQb3J0Om51bWJlciA9IDkwMDE7XHJcblxyXG59XHJcblxyXG4vLyBleHBvcnQgY2xhc3MgU3tcclxuICAgIC8vIHB1YmxpYyBzdGF0aWMgVUlNYW5hZ2VyID0gVUlNYW5hZ2VyLkluc3RhbmNlKFVJTWFuYWdlcik7XHJcbiAgICAvLyBwdWJsaWMgc3RhdGljIFVJTWVzc2FnZU1hbmdlciA9IFVJTWVzc2FnZU1hbmdlci5JbnN0YW5jZShVSU1lc3NhZ2VNYW5nZXIpO1xyXG4gICAgLy8gcHVibGljIHN0YXRpYyBTY2VuZU1hbmFnZXIgPSBTY2VuZU1hbmFnZXIuSW5zdGFuY2UoU2NlbmVNYW5hZ2VyKTtcclxuICAgIC8vIHB1YmxpYyBzdGF0aWMgR2FtZU9iamVjdFBvb2wgPSBHYW1lT2JqZWN0UG9vbC5JbnN0YW5jZShHYW1lT2JqZWN0UG9vbCk7XHJcbiAgICAvLyBwdWJsaWMgc3RhdGljIFJlc01hbmFnZXIgPSBSZXNNYW5hZ2VyLkluc3RhbmNlKFJlc01hbmFnZXIpO1xyXG4gICAgLy8gcHVibGljIHN0YXRpYyBTdG9yeU1hbmFnZXIgPSBTdG9yeU1hbmFnZXIuSW5zdGFuY2UoU3RvcnlNYW5hZ2VyKTtcclxuICAgIC8vIHB1YmxpYyBzdGF0aWMgU2Vzc2lvbk1hbmFnZXIgPSBTZXNzaW9uTWFuYWdlci5JbnN0YW5jZShTZXNzaW9uTWFuYWdlcik7XHJcbiAgICAvLyBwdWJsaWMgc3RhdGljIEdhbWVTZXNzaW9uID0gR2FtZVNlc3Npb24uSW5zdGFuY2UoR2FtZVNlc3Npb24pO1xyXG4gICAgLy8gcHVibGljIHN0YXRpYyBTdG9yeU1lc3NhZ2VNYW5hZ2VyID0gU3RvcnlNZXNzYWdlTWFuYWdlci5JbnN0YW5jZShTdG9yeU1lc3NhZ2VNYW5hZ2VyKTtcclxuICAgIC8vIHB1YmxpYyBzdGF0aWMgSHR0cE1hbmFnZXIgPSBIdHRwTWFuYWdlci5JbnN0YW5jZShIdHRwTWFuYWdlcik7XHJcbi8vIH1cclxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY3NoYXJwXCIpOyJdLCJzb3VyY2VSb290IjoiIn0=