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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/framework/common/GameObjectPool.ts":
/*!************************************************!*\
  !*** ./src/framework/common/GameObjectPool.ts ***!
  \************************************************/
/*! exports provided: GameObjectPool */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GameObjectPool", function() { return GameObjectPool; });
/* harmony import */ var _Singleton__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Singleton */ "./src/framework/common/Singleton.ts");
/* harmony import */ var _ResManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ResManager */ "./src/framework/common/ResManager.ts");
/* harmony import */ var csharp__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! csharp */ "csharp");
/* harmony import */ var csharp__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(csharp__WEBPACK_IMPORTED_MODULE_2__);



// -- GameObject缓存池
// -- 注意：
// -- 1、所有需要预设都从这里加载，不要直接到ResourcesManager去加载，由这里统一做缓存管理
// -- 2、缓存分为两部分：从资源层加载的原始GameObject(Asset)，从GameObject实例化出来的多个Inst
class GameObjectPool extends _Singleton__WEBPACK_IMPORTED_MODULE_0__["Singleton"] {
    constructor() {
        super();
        this.__cacheTransRoot = null;
        this.__goPool = new Map();
        this.__instCache = new Map();
        let go = csharp__WEBPACK_IMPORTED_MODULE_2__["UnityEngine"].GameObject.Find("GameObjectCacheRoot");
        if (go == undefined) {
            go = new csharp__WEBPACK_IMPORTED_MODULE_2__["UnityEngine"].GameObject("GameObjectCacheRoot");
            csharp__WEBPACK_IMPORTED_MODULE_2__["UnityEngine"].Object.DontDestroyOnLoad(go);
        }
        this.__cacheTransRoot = go.transform;
    }
    //-- 检测是否已经被缓存
    checkHasCached(path) {
        let cachedInst = this.__instCache.get(path);
        if (cachedInst != undefined && cachedInst.length > 0) {
            return true;
        }
        let pooledGo = this.__goPool.get(path);
        return pooledGo != undefined;
    }
    //-- 缓存并实例化GameObject
    cacheAndInstGameObject(path, go, inst_count = 1) {
        this.__goPool.set(path, go);
        if (inst_count > 0) {
            let cachedInst = this.__instCache.get(path);
            for (let i = 0; i < inst_count; i++) {
                let inst = csharp__WEBPACK_IMPORTED_MODULE_2__["UnityEngine"].GameObject.Instantiate(go);
                inst.transform.SetParent(this.__cacheTransRoot);
                inst.SetActive(false);
                cachedInst.push(inst);
            }
        }
    }
    //-- 尝试从缓存中获取
    tryGetFromCache(path) {
        if (!this.checkHasCached(path)) {
            return null;
        }
        let cachedInst = this.__instCache.get(path);
        if (cachedInst != undefined && cachedInst.length > 0) {
            let inst = cachedInst.pop();
            return inst;
        }
        let pooledGo = this.__goPool.get(path);
        if (pooledGo != undefined) {
            let inst = csharp__WEBPACK_IMPORTED_MODULE_2__["UnityEngine"].GameObject.Instantiate(pooledGo);
            return inst;
        }
        return null;
    }
    //预加载：可提供初始实例化个数
    async preLoadGameObjectAsync(path, inst_count, callback, ...params) {
        if (this.checkHasCached(path)) {
            if (callback != null) {
                callback(params);
            }
            return;
        }
        let go = await _ResManager__WEBPACK_IMPORTED_MODULE_1__["ResManager"].Instance(_ResManager__WEBPACK_IMPORTED_MODULE_1__["ResManager"]).loadPrefab(path);
        if (go != undefined) {
            this.cacheAndInstGameObject(path, go, inst_count);
        }
        if (callback != null) {
            callback(params);
        }
    }
    //-- 异步获取：必要时加载
    async getGameObjectAsync(path, callback, ...params) {
        let inst = this.tryGetFromCache(path);
        if (inst == null) {
            await this.preLoadGameObjectAsync(path, 1, callback, params);
        }
        inst = this.tryGetFromCache(path);
        inst.SetActive(true);
    }
    //-- 回收
    recycleGameObject(path, inst) {
        inst.transform.SetParent(this.__cacheTransRoot);
        inst.SetActive(false);
        let cachedInst = this.__instCache.get(path) || new Array();
        cachedInst.push(inst);
        this.__instCache.set(path, cachedInst);
    }
    //-- 清理缓存
    cleanup(includePooledGo = false) {
        this.__instCache.forEach((values, key) => {
            for (let inst of values) {
                if (inst != null) {
                    csharp__WEBPACK_IMPORTED_MODULE_2__["UnityEngine"].GameObject.Destroy(inst);
                }
            }
        });
        this.__instCache.clear();
        if (includePooledGo) {
            this.__goPool.forEach((go, key) => {
                if (go != null) {
                    _ResManager__WEBPACK_IMPORTED_MODULE_1__["ResManager"].Instance(_ResManager__WEBPACK_IMPORTED_MODULE_1__["ResManager"]).releaseAddressGO(go);
                }
            });
            this.__goPool.clear();
        }
    }
}


/***/ }),

/***/ "./src/framework/common/ResManager.ts":
/*!********************************************!*\
  !*** ./src/framework/common/ResManager.ts ***!
  \********************************************/
/*! exports provided: ResManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResManager", function() { return ResManager; });
/* harmony import */ var _Singleton__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Singleton */ "./src/framework/common/Singleton.ts");
/* harmony import */ var puerts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! puerts */ "puerts");
/* harmony import */ var puerts__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(puerts__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var csharp__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! csharp */ "csharp");
/* harmony import */ var csharp__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(csharp__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _logger_Logger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../logger/Logger */ "./src/framework/logger/Logger.ts");




class ResManager extends _Singleton__WEBPACK_IMPORTED_MODULE_0__["Singleton"] {
    constructor() {
        super();
        this._pkgMap = new Map();
    }
    async loadScene(sceneName, mode = csharp__WEBPACK_IMPORTED_MODULE_2__["UnityEngine"].SceneManagement.LoadSceneMode.Single) {
        try {
            let task = csharp__WEBPACK_IMPORTED_MODULE_2__["NiceTS"].ResourceManager.LoadScene(sceneName, mode, (progress) => {
                _logger_Logger__WEBPACK_IMPORTED_MODULE_3__["Logger"].log("load scene: " + progress);
            });
            let scenInstance = await Object(puerts__WEBPACK_IMPORTED_MODULE_1__["$promise"])(task);
            return scenInstance;
        }
        catch (ex) {
            _logger_Logger__WEBPACK_IMPORTED_MODULE_3__["Logger"].error(`Load Scene :${sceneName} : ${ex}`);
            return null;
        }
    }
    async unloadScene(sceneInstance) {
        try {
            let task = csharp__WEBPACK_IMPORTED_MODULE_2__["NiceTS"].ResourceManager.UnloadScene(sceneInstance);
            let go = await Object(puerts__WEBPACK_IMPORTED_MODULE_1__["$promise"])(task);
            return go;
        }
        catch (ex) {
            _logger_Logger__WEBPACK_IMPORTED_MODULE_3__["Logger"].error(`Unload scene  : ${ex}`);
            return null;
        }
    }
    unloadSceneByName(sceneName) {
        csharp__WEBPACK_IMPORTED_MODULE_2__["NiceTS"].ResourceManager.UnloadSceneByName(sceneName);
    }
    async loadPrefab(address) {
        try {
            let task = csharp__WEBPACK_IMPORTED_MODULE_2__["NiceTS"].ResourceManager.LoadPrefab(address);
            let go = await Object(puerts__WEBPACK_IMPORTED_MODULE_1__["$promise"])(task);
            return go;
        }
        catch (ex) {
            _logger_Logger__WEBPACK_IMPORTED_MODULE_3__["Logger"].error(`Load prefab :${address} : ${ex}`);
            return null;
        }
    }
    async loadTextAsset(address) {
        try {
            let task = csharp__WEBPACK_IMPORTED_MODULE_2__["NiceTS"].ResourceManager.LoadTextAsset(address);
            let go = await Object(puerts__WEBPACK_IMPORTED_MODULE_1__["$promise"])(task);
            return go;
        }
        catch (ex) {
            _logger_Logger__WEBPACK_IMPORTED_MODULE_3__["Logger"].error(`Load textasset :${address} : ${ex}`);
            return null;
        }
    }
    async loadTextBytes(address) {
        try {
            let task = csharp__WEBPACK_IMPORTED_MODULE_2__["NiceTS"].ResourceManager.LoadTextBytes(address);
            let bytes = await Object(puerts__WEBPACK_IMPORTED_MODULE_1__["$promise"])(task);
            return bytes;
        }
        catch (ex) {
            _logger_Logger__WEBPACK_IMPORTED_MODULE_3__["Logger"].error(`LoadTextBytes :${address} : ${ex}`);
        }
    }
    async loadSprite(address) {
        try {
            let task = csharp__WEBPACK_IMPORTED_MODULE_2__["NiceTS"].ResourceManager.LoadSprite(address);
            let go = await Object(puerts__WEBPACK_IMPORTED_MODULE_1__["$promise"])(task);
            return go;
        }
        catch (ex) {
            _logger_Logger__WEBPACK_IMPORTED_MODULE_3__["Logger"].error(`Load sprite :${address} : ${ex}`);
            return null;
        }
    }
    releaseAddressGO(go) {
        csharp__WEBPACK_IMPORTED_MODULE_2__["NiceTS"].ResourceManager.ReleaseAddressGO(go);
    }
}


/***/ }),

/***/ "./src/framework/common/Singleton.ts":
/*!*******************************************!*\
  !*** ./src/framework/common/Singleton.ts ***!
  \*******************************************/
/*! exports provided: Singleton */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Singleton", function() { return Singleton; });
class Singleton {
    static Instance(c) {
        if (this.instance == null) {
            this.instance = new c();
        }
        return this.instance;
    }
}
Singleton.instance = null;


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

/***/ "./src/framework/scene/BaseScene.ts":
/*!******************************************!*\
  !*** ./src/framework/scene/BaseScene.ts ***!
  \******************************************/
/*! exports provided: BaseScene */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseScene", function() { return BaseScene; });
/* harmony import */ var _global_GameConfig__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../global/GameConfig */ "./src/global/GameConfig.ts");

class BaseScene {
    constructor() {
        this.finishCount = 0;
        this.totalCount = 0;
        this.preloadPrefab = new Map();
        this.finishCount = 0;
    }
    addPreloadPrefab(address, instCount) {
        if (!this.preloadPrefab.has(address)) {
            this.preloadPrefab.set(address, instCount);
            return;
        }
        this.preloadPrefab.set(address, this.preloadPrefab.get(address) + instCount);
    }
    setSceneInstance(sceneInstance) {
        this.sceneInstance = sceneInstance;
    }
    async loadAssetsAsync() {
        this.totalCount = this.preloadPrefab.size;
        let premises = [];
        this.preloadPrefab.forEach((value, key) => {
            let premise = _global_GameConfig__WEBPACK_IMPORTED_MODULE_0__["S"].GameObjectPool.preLoadGameObjectAsync(key, value, () => {
                this.finishCount++;
            });
            premises.push(premise);
        });
        await Promise.all(premises);
    }
    onDestroy() {
        //清理资源缓存
        _global_GameConfig__WEBPACK_IMPORTED_MODULE_0__["S"].GameObjectPool.cleanup(true);
        //卸载场景
        _global_GameConfig__WEBPACK_IMPORTED_MODULE_0__["S"].ResManager.unloadScene(this.sceneInstance);
        this.preloadPrefab.clear();
    }
}


/***/ }),

/***/ "./src/framework/scene/SceneDef.ts":
/*!*****************************************!*\
  !*** ./src/framework/scene/SceneDef.ts ***!
  \*****************************************/
/*! exports provided: SceneDef */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SceneDef", function() { return SceneDef; });
var SceneDef;
(function (SceneDef) {
    SceneDef["BattleScene"] = "BattleScene";
})(SceneDef || (SceneDef = {}));


/***/ }),

/***/ "./src/framework/scene/SceneFactory.ts":
/*!*********************************************!*\
  !*** ./src/framework/scene/SceneFactory.ts ***!
  \*********************************************/
/*! exports provided: SceneFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SceneFactory", function() { return SceneFactory; });
/* harmony import */ var _game_module_pvp_BattleScene__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../game/module/pvp/BattleScene */ "./src/game/module/pvp/BattleScene.ts");
/* harmony import */ var _SceneDef__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SceneDef */ "./src/framework/scene/SceneDef.ts");


class SceneFactory {
    static createScene(sceneName) {
        let scene = null;
        switch (sceneName) {
            case _SceneDef__WEBPACK_IMPORTED_MODULE_1__["SceneDef"].BattleScene:
                scene = new _game_module_pvp_BattleScene__WEBPACK_IMPORTED_MODULE_0__["default"]();
                break;
        }
        return scene;
    }
}


/***/ }),

/***/ "./src/framework/scene/SceneManager.ts":
/*!*********************************************!*\
  !*** ./src/framework/scene/SceneManager.ts ***!
  \*********************************************/
/*! exports provided: SceneManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SceneManager", function() { return SceneManager; });
/* harmony import */ var _global_GameConfig__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../global/GameConfig */ "./src/global/GameConfig.ts");
/* harmony import */ var _common_Singleton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/Singleton */ "./src/framework/common/Singleton.ts");
/* harmony import */ var _logger_Logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../logger/Logger */ "./src/framework/logger/Logger.ts");
/* harmony import */ var _SceneFactory__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SceneFactory */ "./src/framework/scene/SceneFactory.ts");




class SceneManager extends _common_Singleton__WEBPACK_IMPORTED_MODULE_1__["Singleton"] {
    constructor() {
        super();
        this.currentScene = null;
    }
    async loadScene(scene) {
        try {
            //清理旧场景
            if (this.currentScene) {
                this.currentScene.onLeave();
                this.currentScene.onDestroy();
            }
            //开始加载场景
            let sceneInstance = await _global_GameConfig__WEBPACK_IMPORTED_MODULE_0__["S"].ResManager.loadScene(scene);
            //开始加载进入场景的资源
            this.currentScene = _SceneFactory__WEBPACK_IMPORTED_MODULE_3__["SceneFactory"].createScene(scene);
            this.currentScene.setSceneInstance(sceneInstance);
            this.currentScene.onEnter();
            //加载资源
            await this.currentScene.loadAssetsAsync();
            await this.currentScene.onComplete();
        }
        catch (ex) {
            _logger_Logger__WEBPACK_IMPORTED_MODULE_2__["Logger"].log("load scene excep:" + ex);
        }
    }
}


/***/ }),

/***/ "./src/game/GameMain.ts":
/*!******************************!*\
  !*** ./src/game/GameMain.ts ***!
  \******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var csharp__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! csharp */ "csharp");
/* harmony import */ var csharp__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(csharp__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _framework_scene_SceneDef__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../framework/scene/SceneDef */ "./src/framework/scene/SceneDef.ts");
/* harmony import */ var _global_GameConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../global/GameConfig */ "./src/global/GameConfig.ts");
/* harmony import */ var _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../framework/logger/Logger */ "./src/framework/logger/Logger.ts");




class GameMain {
    constructor() {
        csharp__WEBPACK_IMPORTED_MODULE_0__["JsManager"].Instance.JsOnApplicationQuit = () => this.onApplicationQuit();
        csharp__WEBPACK_IMPORTED_MODULE_0__["JsManager"].Instance.JsOnDispose = () => this.onDispose();
    }
    async start() {
        try {
            _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_3__["Logger"].log("Game start in JS....");
            // //进入登录模块
            // await S.SceneManager.loadScene(SceneDef.LoginScene);
            await _global_GameConfig__WEBPACK_IMPORTED_MODULE_2__["S"].SceneManager.loadScene(_framework_scene_SceneDef__WEBPACK_IMPORTED_MODULE_1__["SceneDef"].BattleScene);
            //JS启动完成，通知C#层
            csharp__WEBPACK_IMPORTED_MODULE_0__["GameLaunch"].Instance.JsLuanchFinish();
        }
        catch (ex) {
            _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_3__["Logger"].error(ex);
        }
    }
    onApplicationQuit() {
        _global_GameConfig__WEBPACK_IMPORTED_MODULE_2__["S"].GameObjectPool.cleanup(true);
        _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_3__["Logger"].log("Game onApplicationQuit in JS....");
    }
    onDispose() {
        _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_3__["Logger"].log("Game onDispose in JS....");
    }
}
new GameMain().start();


/***/ }),

/***/ "./src/game/module/pvp/BattleScene.ts":
/*!********************************************!*\
  !*** ./src/game/module/pvp/BattleScene.ts ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BattleScene; });
/* harmony import */ var csharp__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! csharp */ "csharp");
/* harmony import */ var csharp__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(csharp__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var puerts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! puerts */ "puerts");
/* harmony import */ var puerts__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(puerts__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../framework/logger/Logger */ "./src/framework/logger/Logger.ts");
/* harmony import */ var _framework_scene_BaseScene__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../framework/scene/BaseScene */ "./src/framework/scene/BaseScene.ts");




class BattleScene extends _framework_scene_BaseScene__WEBPACK_IMPORTED_MODULE_3__["BaseScene"] {
    onEnter() {
        _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_2__["Logger"].log("BattleScene onEnter ~");
        let objCW = csharp__WEBPACK_IMPORTED_MODULE_0__["UnityEngine"].GameObject.Find("Team1/CubeWhite");
        let objCB = csharp__WEBPACK_IMPORTED_MODULE_0__["UnityEngine"].GameObject.Find("Team2/CubeBlue");
        if (objCW && objCB) {
            let agentCW = objCW.GetComponent(Object(puerts__WEBPACK_IMPORTED_MODULE_1__["$typeof"])(csharp__WEBPACK_IMPORTED_MODULE_0__["UnityEngine"].AI.NavMeshAgent));
            if (!agentCW.IsNull()) {
                // agent.SetDestination(objCB.transform.position);
                agentCW.SetDestination(new csharp__WEBPACK_IMPORTED_MODULE_0__["UnityEngine"].Vector3(0, 0, -2));
            }
            let agentCB = objCB.GetComponent(Object(puerts__WEBPACK_IMPORTED_MODULE_1__["$typeof"])(csharp__WEBPACK_IMPORTED_MODULE_0__["UnityEngine"].AI.NavMeshAgent));
            if (!agentCB.IsNull()) {
                // agent.SetDestination(objCB.transform.position);
                agentCB.SetDestination(new csharp__WEBPACK_IMPORTED_MODULE_0__["UnityEngine"].Vector3(0, 0, 2));
            }
        }
    }
    onComplete() {
        _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_2__["Logger"].log("BattleScene onComplete ~");
        return Promise.resolve();
    }
    onLeave() {
        _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_2__["Logger"].log("BattleScene onLeave ~");
    }
}


/***/ }),

/***/ "./src/global/GameConfig.ts":
/*!**********************************!*\
  !*** ./src/global/GameConfig.ts ***!
  \**********************************/
/*! exports provided: GameConfig, S */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GameConfig", function() { return GameConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "S", function() { return S; });
/* harmony import */ var _framework_common_GameObjectPool__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../framework/common/GameObjectPool */ "./src/framework/common/GameObjectPool.ts");
/* harmony import */ var _framework_common_ResManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../framework/common/ResManager */ "./src/framework/common/ResManager.ts");
/* harmony import */ var _framework_scene_SceneManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../framework/scene/SceneManager */ "./src/framework/scene/SceneManager.ts");



class GameConfig {
}
GameConfig.debug = true;
class S {
}
S.SceneManager = _framework_scene_SceneManager__WEBPACK_IMPORTED_MODULE_2__["SceneManager"].Instance(_framework_scene_SceneManager__WEBPACK_IMPORTED_MODULE_2__["SceneManager"]);
S.GameObjectPool = _framework_common_GameObjectPool__WEBPACK_IMPORTED_MODULE_0__["GameObjectPool"].Instance(_framework_common_GameObjectPool__WEBPACK_IMPORTED_MODULE_0__["GameObjectPool"]);
S.ResManager = _framework_common_ResManager__WEBPACK_IMPORTED_MODULE_1__["ResManager"].Instance(_framework_common_ResManager__WEBPACK_IMPORTED_MODULE_1__["ResManager"]);


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./game/GameMain */ "./src/game/GameMain.ts");

/***/ }),

/***/ "csharp":
/*!*************************!*\
  !*** external "csharp" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("csharp");

/***/ }),

/***/ "puerts":
/*!*************************!*\
  !*** external "puerts" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("puerts");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZyYW1ld29yay9jb21tb24vR2FtZU9iamVjdFBvb2wudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZyYW1ld29yay9jb21tb24vUmVzTWFuYWdlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZnJhbWV3b3JrL2NvbW1vbi9TaW5nbGV0b24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZyYW1ld29yay9sb2dnZXIvTG9nZ2VyLnRzIiwid2VicGFjazovLy8uL3NyYy9mcmFtZXdvcmsvc2NlbmUvQmFzZVNjZW5lLnRzIiwid2VicGFjazovLy8uL3NyYy9mcmFtZXdvcmsvc2NlbmUvU2NlbmVEZWYudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZyYW1ld29yay9zY2VuZS9TY2VuZUZhY3RvcnkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZyYW1ld29yay9zY2VuZS9TY2VuZU1hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUvR2FtZU1haW4udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUvbW9kdWxlL3B2cC9CYXR0bGVTY2VuZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZ2xvYmFsL0dhbWVDb25maWcudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImNzaGFycFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInB1ZXJ0c1wiIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFB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O0FBQW9FO0FBQ1I7QUFDRztBQUV4RCxNQUFPLFVBQVU7O0FBQ04sZ0JBQUssR0FBVyxJQUFJLENBQUM7QUFHaEMsTUFBTSxDQUFDOztBQUNJLGNBQVksR0FBRywwRUFBWSxDQUFDLFFBQVEsQ0FBQywwRUFBWSxDQUFDLENBQUM7QUFDbkQsZ0JBQWMsR0FBRywrRUFBYyxDQUFDLFFBQVEsQ0FBQywrRUFBYyxDQUFDLENBQUM7QUFDekQsWUFBVSxHQUFHLHVFQUFVLENBQUMsUUFBUSxDQUFDLHVFQUFVLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7O0FDWC9ELG1CQUFPLENBQUMsK0NBQWlCLEU7Ozs7Ozs7Ozs7O0FDQXpCLG1DOzs7Ozs7Ozs7OztBQ0FBLG1DIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiXHJcbmltcG9ydCB7IFNpbmdsZXRvbiB9IGZyb20gJy4vU2luZ2xldG9uJztcclxuaW1wb3J0IHsgUmVzTWFuYWdlciB9IGZyb20gJy4vUmVzTWFuYWdlcic7XHJcbmltcG9ydCB7IFVuaXR5RW5naW5lIH0gZnJvbSAnY3NoYXJwJztcclxuXHJcblxyXG5cclxuLy8gLS0gR2FtZU9iamVjdOe8k+WtmOaxoFxyXG4vLyAtLSDms6jmhI/vvJpcclxuLy8gLS0gMeOAgeaJgOaciemcgOimgemihOiuvumDveS7jui/memHjOWKoOi9ve+8jOS4jeimgeebtOaOpeWIsFJlc291cmNlc01hbmFnZXLljrvliqDovb3vvIznlLHov5nph4znu5/kuIDlgZrnvJPlrZjnrqHnkIZcclxuLy8gLS0gMuOAgee8k+WtmOWIhuS4uuS4pOmDqOWIhu+8muS7jui1hOa6kOWxguWKoOi9veeahOWOn+Wni0dhbWVPYmplY3QoQXNzZXQp77yM5LuOR2FtZU9iamVjdOWunuS+i+WMluWHuuadpeeahOWkmuS4qkluc3RcclxuZXhwb3J0IGNsYXNzIEdhbWVPYmplY3RQb29sIGV4dGVuZHMgU2luZ2xldG9uPEdhbWVPYmplY3RQb29sPntcclxuXHJcbiAgICBwcml2YXRlIF9fY2FjaGVUcmFuc1Jvb3QgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBfX2dvUG9vbCA9IG5ldyBNYXAoKTtcclxuICAgIHByaXZhdGUgX19pbnN0Q2FjaGU6TWFwPHN0cmluZyxBcnJheTxhbnk+PiA9IG5ldyBNYXA8c3RyaW5nLEFycmF5PGFueT4+KCk7XHJcblxyXG5cclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuXHJcbiAgICAgICAgbGV0IGdvID0gVW5pdHlFbmdpbmUuR2FtZU9iamVjdC5GaW5kKFwiR2FtZU9iamVjdENhY2hlUm9vdFwiKTtcclxuXHJcbiAgICAgICAgaWYoZ28gPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgZ28gPSBuZXcgVW5pdHlFbmdpbmUuR2FtZU9iamVjdChcIkdhbWVPYmplY3RDYWNoZVJvb3RcIik7XHJcbiAgICAgICAgICAgIFVuaXR5RW5naW5lLk9iamVjdC5Eb250RGVzdHJveU9uTG9hZChnbyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9fY2FjaGVUcmFuc1Jvb3QgPSBnby50cmFuc2Zvcm07XHJcbiAgICB9XHJcblxyXG4gICAgLy8tLSDmo4DmtYvmmK/lkKblt7Lnu4/ooqvnvJPlrZhcclxuICAgIHB1YmxpYyBjaGVja0hhc0NhY2hlZChwYXRoOnN0cmluZyl7XHJcblxyXG4gICAgICAgIGxldCBjYWNoZWRJbnN0OkFycmF5PGFueT4gPSB0aGlzLl9faW5zdENhY2hlLmdldChwYXRoKTtcclxuICAgICAgICBpZihjYWNoZWRJbnN0ICE9IHVuZGVmaW5lZCAmJiBjYWNoZWRJbnN0Lmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBwb29sZWRHbyA9IHRoaXMuX19nb1Bvb2wuZ2V0KHBhdGgpO1xyXG4gICAgICAgIHJldHVybiBwb29sZWRHbyAhPSB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vLS0g57yT5a2Y5bm25a6e5L6L5YyWR2FtZU9iamVjdFxyXG4gICAgcHVibGljIGNhY2hlQW5kSW5zdEdhbWVPYmplY3QocGF0aDpzdHJpbmcsIGdvOmFueSwgaW5zdF9jb3VudDpudW1iZXIgPSAxKXtcclxuXHJcbiAgICAgICAgdGhpcy5fX2dvUG9vbC5zZXQocGF0aCwgZ28pO1xyXG4gICAgICAgIGlmKGluc3RfY291bnQgPiAwKXtcclxuXHJcbiAgICAgICAgICAgIGxldCBjYWNoZWRJbnN0OkFycmF5PGFueT4gPSB0aGlzLl9faW5zdENhY2hlLmdldChwYXRoKTtcclxuICAgICAgICAgICAgZm9yKGxldCBpOm51bWJlciA9MDsgaSA8IGluc3RfY291bnQ7IGkrKyl7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGluc3QgPSBVbml0eUVuZ2luZS5HYW1lT2JqZWN0Lkluc3RhbnRpYXRlKGdvKSBhcyBVbml0eUVuZ2luZS5HYW1lT2JqZWN0O1xyXG4gICAgICAgICAgICAgICAgaW5zdC50cmFuc2Zvcm0uU2V0UGFyZW50KHRoaXMuX19jYWNoZVRyYW5zUm9vdCk7XHJcbiAgICAgICAgICAgICAgICBpbnN0LlNldEFjdGl2ZShmYWxzZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgY2FjaGVkSW5zdC5wdXNoKGluc3QpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vLS0g5bCd6K+V5LuO57yT5a2Y5Lit6I635Y+WXHJcbiAgICBwdWJsaWMgdHJ5R2V0RnJvbUNhY2hlKHBhdGg6c3RyaW5nKTphbnl7XHJcblxyXG4gICAgICAgIGlmKCF0aGlzLmNoZWNrSGFzQ2FjaGVkKHBhdGgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGNhY2hlZEluc3Q6QXJyYXk8b2JqZWN0PiAgPSB0aGlzLl9faW5zdENhY2hlLmdldChwYXRoKTtcclxuICAgICAgICBpZihjYWNoZWRJbnN0ICE9IHVuZGVmaW5lZCAmJiBjYWNoZWRJbnN0Lmxlbmd0aD4wKXtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBpbnN0ID0gY2FjaGVkSW5zdC5wb3AoKTtcclxuICAgICAgICAgICAgcmV0dXJuIGluc3Q7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgcG9vbGVkR28gPSB0aGlzLl9fZ29Qb29sLmdldChwYXRoKTtcclxuICAgICAgICBpZihwb29sZWRHbyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBsZXQgaW5zdCA9IFVuaXR5RW5naW5lLkdhbWVPYmplY3QuSW5zdGFudGlhdGUocG9vbGVkR28pO1xyXG4gICAgICAgICAgICByZXR1cm4gaW5zdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8v6aKE5Yqg6L2977ya5Y+v5o+Q5L6b5Yid5aeL5a6e5L6L5YyW5Liq5pWwXHJcbiAgICBwdWJsaWMgYXN5bmMgcHJlTG9hZEdhbWVPYmplY3RBc3luYyhwYXRoOnN0cmluZywgaW5zdF9jb3VudDpudW1iZXIsIGNhbGxiYWNrOkZ1bmN0aW9uLC4uLnBhcmFtcyl7XHJcblxyXG4gICAgICAgIGlmKHRoaXMuY2hlY2tIYXNDYWNoZWQocGF0aCkpe1xyXG4gICAgICAgICAgICBpZihjYWxsYmFjayE9bnVsbCl7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhwYXJhbXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBnbyA9IGF3YWl0IFJlc01hbmFnZXIuSW5zdGFuY2UoUmVzTWFuYWdlcikubG9hZFByZWZhYihwYXRoKTtcclxuICAgICAgICBpZihnbyE9dW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5jYWNoZUFuZEluc3RHYW1lT2JqZWN0KHBhdGgsIGdvLGluc3RfY291bnQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoY2FsbGJhY2shPW51bGwpe1xyXG4gICAgICAgICAgICBjYWxsYmFjayhwYXJhbXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLy8tLSDlvILmraXojrflj5bvvJrlv4XopoHml7bliqDovb1cclxuICAgIHB1YmxpYyBhc3luYyBnZXRHYW1lT2JqZWN0QXN5bmMocGF0aDpzdHJpbmcsIGNhbGxiYWNrOkZ1bmN0aW9uLC4uLnBhcmFtcyl7XHJcblxyXG4gICAgICAgIGxldCBpbnN0OmFueSA9IHRoaXMudHJ5R2V0RnJvbUNhY2hlKHBhdGgpO1xyXG4gICAgICAgIGlmKGluc3QgPT1udWxsKXtcclxuICAgICAgICAgICAgYXdhaXQgdGhpcy5wcmVMb2FkR2FtZU9iamVjdEFzeW5jKHBhdGgsIDEsIGNhbGxiYWNrLCBwYXJhbXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5zdCA9IHRoaXMudHJ5R2V0RnJvbUNhY2hlKHBhdGgpO1xyXG4gICAgICAgIGluc3QuU2V0QWN0aXZlKHRydWUpO1xyXG5cclxuICAgICAgICBcclxuICAgIH1cclxuXHJcblxyXG4gICAgLy8tLSDlm57mlLZcclxuICAgIHB1YmxpYyByZWN5Y2xlR2FtZU9iamVjdChwYXRoOnN0cmluZywgaW5zdDphbnkpe1xyXG5cclxuICAgICAgICBpbnN0LnRyYW5zZm9ybS5TZXRQYXJlbnQodGhpcy5fX2NhY2hlVHJhbnNSb290KTtcclxuICAgICAgICBpbnN0LlNldEFjdGl2ZShmYWxzZSk7XHJcblxyXG4gICAgICAgIGxldCBjYWNoZWRJbnN0ID0gdGhpcy5fX2luc3RDYWNoZS5nZXQocGF0aCkgfHwgbmV3IEFycmF5KCk7XHJcbiAgICAgICAgY2FjaGVkSW5zdC5wdXNoKGluc3QpO1xyXG5cclxuICAgICAgICB0aGlzLl9faW5zdENhY2hlLnNldChwYXRoLCBjYWNoZWRJbnN0KTtcclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vLS0g5riF55CG57yT5a2YXHJcbiAgICBwdWJsaWMgY2xlYW51cChpbmNsdWRlUG9vbGVkR286Ym9vbGVhbiA9IGZhbHNlKXtcclxuXHJcbiAgICAgICAgdGhpcy5fX2luc3RDYWNoZS5mb3JFYWNoKCh2YWx1ZXMsIGtleSk9PntcclxuXHJcbiAgICAgICAgICAgIGZvcihsZXQgaW5zdCBvZiB2YWx1ZXMpe1xyXG4gICAgICAgICAgICAgICAgaWYoaW5zdCAhPSBudWxsKXtcclxuICAgICAgICAgICAgICAgICAgICBVbml0eUVuZ2luZS5HYW1lT2JqZWN0LkRlc3Ryb3koaW5zdCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLl9faW5zdENhY2hlLmNsZWFyKCk7IFxyXG5cclxuICAgICAgICBpZihpbmNsdWRlUG9vbGVkR28pe1xyXG4gICAgICAgICAgICB0aGlzLl9fZ29Qb29sLmZvckVhY2goKGdvLCBrZXkpPT57XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoZ28gIT0gbnVsbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgUmVzTWFuYWdlci5JbnN0YW5jZShSZXNNYW5hZ2VyKS5yZWxlYXNlQWRkcmVzc0dPKGdvKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9fZ29Qb29sLmNsZWFyKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcblxyXG59IiwiXHJcbmltcG9ydCB7IFNpbmdsZXRvbiB9IGZyb20gJy4vU2luZ2xldG9uJztcclxuaW1wb3J0IHsgJHByb21pc2UgfSBmcm9tICdwdWVydHMnO1xyXG5pbXBvcnQge05pY2VUUywgVW5pdHlFbmdpbmV9IGZyb20gJ2NzaGFycCc7XHJcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gJy4uL2xvZ2dlci9Mb2dnZXInO1xyXG5cclxuZXhwb3J0IGNsYXNzIFJlc01hbmFnZXIgZXh0ZW5kcyBTaW5nbGV0b248UmVzTWFuYWdlcj57XHJcblxyXG4gICAgcHJpdmF0ZSBfcGtnTWFwOk1hcDxzdHJpbmcsbnVtYmVyPiA9IG5ldyBNYXA8c3RyaW5nLG51bWJlcj4oKTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGFzeW5jIGxvYWRTY2VuZShzY2VuZU5hbWU6c3RyaW5nLCBtb2RlID0gVW5pdHlFbmdpbmUuU2NlbmVNYW5hZ2VtZW50LkxvYWRTY2VuZU1vZGUuU2luZ2xlKXtcclxuICAgICAgICB0cnl7XHJcbiAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IHRhc2sgPSBOaWNlVFMuUmVzb3VyY2VNYW5hZ2VyLkxvYWRTY2VuZShzY2VuZU5hbWUsIG1vZGUsKHByb2dyZXNzOk51bWJlcik9PntcclxuICAgICAgICAgICAgICAgIExvZ2dlci5sb2coXCJsb2FkIHNjZW5lOiBcIitwcm9ncmVzcylcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBsZXQgc2Nlbkluc3RhbmNlID0gYXdhaXQgJHByb21pc2UodGFzaylcclxuICAgICAgICAgICAgcmV0dXJuIHNjZW5JbnN0YW5jZVxyXG5cclxuICAgICAgICB9Y2F0Y2goZXgpe1xyXG5cclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKGBMb2FkIFNjZW5lIDoke3NjZW5lTmFtZX0gOiAke2V4fWApXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGFzeW5jIHVubG9hZFNjZW5lKHNjZW5lSW5zdGFuY2U6VW5pdHlFbmdpbmUuUmVzb3VyY2VNYW5hZ2VtZW50LlJlc291cmNlUHJvdmlkZXJzLlNjZW5lSW5zdGFuY2Upe1xyXG4gICAgICAgIHRyeXtcclxuICAgICAgICAgICAgbGV0IHRhc2s9IE5pY2VUUy5SZXNvdXJjZU1hbmFnZXIuVW5sb2FkU2NlbmUoc2NlbmVJbnN0YW5jZSlcclxuICAgICAgICAgICAgbGV0IGdvID0gYXdhaXQgJHByb21pc2UodGFzayk7XHJcbiAgICAgICAgICAgIHJldHVybiBnbztcclxuICAgICAgICB9Y2F0Y2goZXgpe1xyXG5cclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKGBVbmxvYWQgc2NlbmUgIDogJHtleH1gKVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1bmxvYWRTY2VuZUJ5TmFtZShzY2VuZU5hbWU6c3RyaW5nKXtcclxuXHJcbiAgICAgICAgTmljZVRTLlJlc291cmNlTWFuYWdlci5VbmxvYWRTY2VuZUJ5TmFtZShzY2VuZU5hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGxvYWRQcmVmYWIoYWRkcmVzczpzdHJpbmcpe1xyXG5cclxuICAgICAgICB0cnl7XHJcbiAgICAgICAgICAgIGxldCB0YXNrPSBOaWNlVFMuUmVzb3VyY2VNYW5hZ2VyLkxvYWRQcmVmYWIoYWRkcmVzcyk7XHJcbiAgICAgICAgICAgIGxldCBnbyA9IGF3YWl0ICRwcm9taXNlKHRhc2spO1xyXG4gICAgICAgICAgICByZXR1cm4gZ287XHJcbiAgICAgICAgfWNhdGNoKGV4KXtcclxuXHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihgTG9hZCBwcmVmYWIgOiR7YWRkcmVzc30gOiAke2V4fWApXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGxvYWRUZXh0QXNzZXQoYWRkcmVzczpzdHJpbmcpe1xyXG5cclxuICAgICAgICB0cnl7XHJcbiAgICAgICAgICAgIGxldCB0YXNrID0gTmljZVRTLlJlc291cmNlTWFuYWdlci5Mb2FkVGV4dEFzc2V0KGFkZHJlc3MpO1xyXG4gICAgICAgICAgICBsZXQgZ28gPSBhd2FpdCAkcHJvbWlzZSh0YXNrKTtcclxuICAgICAgICAgICAgcmV0dXJuIGdvO1xyXG4gICAgICAgIH1jYXRjaChleCl7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihgTG9hZCB0ZXh0YXNzZXQgOiR7YWRkcmVzc30gOiAke2V4fWApXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGFzeW5jIGxvYWRUZXh0Qnl0ZXMoYWRkcmVzczpzdHJpbmcpe1xyXG5cclxuICAgICAgICB0cnl7XHJcbiAgICAgICAgICAgIGxldCB0YXNrID0gTmljZVRTLlJlc291cmNlTWFuYWdlci5Mb2FkVGV4dEJ5dGVzKGFkZHJlc3MpO1xyXG4gICAgICAgICAgICBsZXQgYnl0ZXMgPSBhd2FpdCAkcHJvbWlzZSh0YXNrKTtcclxuICAgICAgICAgICAgcmV0dXJuIGJ5dGVzO1xyXG4gICAgICAgIH1jYXRjaChleCl7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihgTG9hZFRleHRCeXRlcyA6JHthZGRyZXNzfSA6ICR7ZXh9YClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgbG9hZFNwcml0ZShhZGRyZXNzOnN0cmluZyl7XHJcblxyXG4gICAgICAgIHRyeXtcclxuICAgICAgICAgICAgbGV0IHRhc2sgPSBOaWNlVFMuUmVzb3VyY2VNYW5hZ2VyLkxvYWRTcHJpdGUoYWRkcmVzcyk7XHJcbiAgICAgICAgICAgIGxldCBnbyA9IGF3YWl0ICRwcm9taXNlKHRhc2spO1xyXG4gICAgICAgICAgICByZXR1cm4gZ287XHJcblxyXG4gICAgICAgIH1jYXRjaChleCl7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihgTG9hZCBzcHJpdGUgOiR7YWRkcmVzc30gOiAke2V4fWApXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyByZWxlYXNlQWRkcmVzc0dPKGdvOmFueSl7XHJcblxyXG4gICAgICAgIE5pY2VUUy5SZXNvdXJjZU1hbmFnZXIuUmVsZWFzZUFkZHJlc3NHTyhnbyk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIFxyXG59IiwiXHJcblxyXG5leHBvcnQgY2xhc3MgU2luZ2xldG9uPFQ+e1xyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGluc3RhbmNlOmFueSA9IG51bGw7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBJbnN0YW5jZTxUPiggYzogeyBuZXcoKTogVCB9ICkgOiBUe1xyXG5cclxuICAgICAgICBpZih0aGlzLmluc3RhbmNlID09IG51bGwpe1xyXG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlID0gbmV3IGMoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xyXG4gICAgfVxyXG5cclxufSIsImltcG9ydCB7IFVuaXR5RW5naW5lIH0gZnJvbSAnY3NoYXJwJztcclxuaW1wb3J0IHsgR2FtZUNvbmZpZyB9IGZyb20gJy4uLy4uL2dsb2JhbC9HYW1lQ29uZmlnJztcclxuZW51bSBMb2dUeXBlIHtcclxuXHRFcnJvciA9IDAsXHJcblx0QXNzZXJ0ID0gMSxcclxuXHRXYXJuaW5nID0gMixcclxuXHRMb2cgPSAzLFxyXG5cdEV4Y2VwdGlvbiA9IDRcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIExvZ2dlcntcclxuICAgIHByaXZhdGUgIHN0YXRpYyAgdW5pdHlfbG9nX3RhcmdldCA9IG51bGw7XHJcblxyXG4gICAgc3RhdGljIGdldFByaW50U3RhY2sodHlwZTogTG9nVHlwZSwgc2hvd1N0YWNrIDogYm9vbGVhbiwgLi4uYXJncykge1xyXG4gICAgICAgIGxldCBtZXNzYWdlID0gJyc7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBhcmdzW2ldO1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIGVsZW1lbnQgPT09ICdvYmplY3QnICYmIExvZ2dlci5MT0dfT0JKRUNUX1RPX0pTT04pIHtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2UgKz0gSlNPTi5zdHJpbmdpZnkoZWxlbWVudCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlICs9IGVsZW1lbnQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGkgPCBhcmdzLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2UgKz0gJyAnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgaWYgKHNob3dTdGFjayB8fCBVbml0eUVuZ2luZS5BcHBsaWNhdGlvbi5pc0VkaXRvcikge1xyXG4gICAgICAgICAgICB2YXIgc3RhY2tzID0gbmV3IEVycm9yKCkuc3RhY2suc3BsaXQoJ1xcbicpO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMzsgaSA8IHN0YWNrcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbGluZSA9IHN0YWNrc1tpXTtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2UgKz0gJ1xcbic7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlICs9IGxpbmU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBpZiAoIUxvZ2dlci51bml0eV9sb2dfdGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIExvZ2dlci51bml0eV9sb2dfdGFyZ2V0ID0gbmV3IFVuaXR5RW5naW5lLk9iamVjdCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG1lc3NhZ2U7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcblxyXG5cdHN0YXRpYyBsb2coLi4uYXJncyk6IHZvaWR7XHJcbiAgICAgICAgaWYoIUdhbWVDb25maWcuZGVidWcpIHJldHVybjtcclxuXHJcbiAgICAgICAgbGV0IG1zZyA9IExvZ2dlci5nZXRQcmludFN0YWNrKExvZ1R5cGUuTG9nLCB0cnVlLCBhcmdzKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhtc2cpO1xyXG4gICAgfVxyXG5cclxuXHQvKipcclxuXHQgKiBPdXRwdXRzIGEgd2FybmluZyBtZXNzYWdlIHRvIHRoZSBMb2dnZXIuXHJcblx0ICogQHBhcmFtIG1lc3NhZ2UgIGxpc3Qgb2YgSmF2YVNjcmlwdCBvYmplY3RzIHRvIG91dHB1dC4gVGhlIHN0cmluZyByZXByZXNlbnRhdGlvbnMgb2YgZWFjaCBvZiB0aGVzZSBvYmplY3RzIGFyZSBhcHBlbmRlZCB0b2dldGhlciBpbiB0aGUgb3JkZXIgbGlzdGVkIGFuZCBvdXRwdXQuXHJcblx0ICovXHJcblx0c3RhdGljIHdhcm4oLi4uYXJncyk6IHZvaWR7XHJcbiAgICAgICAgaWYoIUdhbWVDb25maWcuZGVidWcpIHJldHVybjtcclxuXHJcbiAgICAgICAgbGV0IG1zZyA9IExvZ2dlci5nZXRQcmludFN0YWNrKExvZ1R5cGUuV2FybmluZywgdHJ1ZSwgYXJncyk7XHJcbiAgICAgICAgY29uc29sZS53YXJuKG1zZyk7XHJcbiAgICB9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE91dHB1dHMgYW4gZXJyb3IgbWVzc2FnZSB0byB0aGUgTG9nZ2VyLlxyXG5cdCAqIEBwYXJhbSBtZXNzYWdlIEEgbGlzdCBvZiBKYXZhU2NyaXB0IG9iamVjdHMgdG8gb3V0cHV0LiBUaGUgc3RyaW5nIHJlcHJlc2VudGF0aW9ucyBvZiBlYWNoIG9mIHRoZXNlIG9iamVjdHMgYXJlIGFwcGVuZGVkIHRvZ2V0aGVyIGluIHRoZSBvcmRlciBsaXN0ZWQgYW5kIG91dHB1dC5cclxuXHQgKi9cclxuXHRzdGF0aWMgZXJyb3IoLi4uYXJncyk6IHZvaWR7XHJcbiAgICAgICAgaWYoIUdhbWVDb25maWcuZGVidWcpIHJldHVybjtcclxuXHJcbiAgICAgICAgbGV0IG1zZyA9IExvZ2dlci5nZXRQcmludFN0YWNrKExvZ1R5cGUuRXJyb3IsIHRydWUsIGFyZ3MpO1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IobXNnKTtcclxuICAgIH1cclxuXHJcblx0LyoqIE91dHB1dHMgYSBzdGFjayB0cmFjZSB0byB0aGUgTG9nZ2VyLlxyXG5cdCAqIEBwYXJhbSBtZXNzYWdlIEEgbGlzdCBvZiBKYXZhU2NyaXB0IG9iamVjdHMgdG8gb3V0cHV0LiBUaGUgc3RyaW5nIHJlcHJlc2VudGF0aW9ucyBvZiBlYWNoIG9mIHRoZXNlIG9iamVjdHMgYXJlIGFwcGVuZGVkIHRvZ2V0aGVyIGluIHRoZSBvcmRlciBsaXN0ZWQgYW5kIG91dHB1dC5cclxuXHQqL1xyXG5cdHN0YXRpYyB0cmFjZSguLi5hcmdzKTogdm9pZHtcclxuICAgICAgICBpZighR2FtZUNvbmZpZy5kZWJ1ZykgcmV0dXJuO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBtc2cgPSBMb2dnZXIuZ2V0UHJpbnRTdGFjayhMb2dUeXBlLkxvZywgdHJ1ZSwgYXJncyk7XHJcbiAgICAgICAgY29uc29sZS5sb2cobXNnKTtcclxuICAgIH1cclxuXHJcblx0LyoqIExvZyBKYXZhU2NyaXB0IE9iamVjdHMgYXMgSlNPTiBmb3JtYXQgKi9cclxuXHRzdGF0aWMgTE9HX09CSkVDVF9UT19KU09OKC4uLmFyZ3MpOiBib29sZWFue1xyXG5cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IHsgVW5pdHlFbmdpbmUgfSBmcm9tIFwiY3NoYXJwXCI7XHJcbmltcG9ydCB7IFMgfSBmcm9tIFwiLi4vLi4vZ2xvYmFsL0dhbWVDb25maWdcIjtcclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBCYXNlU2NlbmV7XHJcblxyXG4gICAgcHJpdmF0ZSBwcmVsb2FkUHJlZmFiOk1hcDxzdHJpbmcsbnVtYmVyPjtcclxuICAgIHByaXZhdGUgc2NlbmVJbnN0YW5jZTpVbml0eUVuZ2luZS5SZXNvdXJjZU1hbmFnZW1lbnQuUmVzb3VyY2VQcm92aWRlcnMuU2NlbmVJbnN0YW5jZVxyXG5cclxuICAgIHB1YmxpYyBmaW5pc2hDb3VudCA9IDA7XHJcbiAgICBwdWJsaWMgdG90YWxDb3VudCA9IDA7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICB0aGlzLnByZWxvYWRQcmVmYWIgPSBuZXcgTWFwPHN0cmluZyxudW1iZXI+KCk7XHJcbiAgICAgICAgdGhpcy5maW5pc2hDb3VudCA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFkZFByZWxvYWRQcmVmYWIoYWRkcmVzczpzdHJpbmcsIGluc3RDb3VudCl7XHJcbiAgICAgICAgaWYoIXRoaXMucHJlbG9hZFByZWZhYi5oYXMoYWRkcmVzcykpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnByZWxvYWRQcmVmYWIuc2V0KGFkZHJlc3MsIGluc3RDb3VudCk7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnByZWxvYWRQcmVmYWIuc2V0KGFkZHJlc3MsIHRoaXMucHJlbG9hZFByZWZhYi5nZXQoYWRkcmVzcykgKyBpbnN0Q291bnQpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRTY2VuZUluc3RhbmNlKHNjZW5lSW5zdGFuY2U6VW5pdHlFbmdpbmUuUmVzb3VyY2VNYW5hZ2VtZW50LlJlc291cmNlUHJvdmlkZXJzLlNjZW5lSW5zdGFuY2Upe1xyXG4gICAgICAgIHRoaXMuc2NlbmVJbnN0YW5jZSA9IHNjZW5lSW5zdGFuY2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFic3RyYWN0IG9uRW50ZXIoKTtcclxuICAgIHB1YmxpYyBhYnN0cmFjdCBvbkNvbXBsZXRlKCk6UHJvbWlzZTxhbnk+O1xyXG4gICAgcHVibGljIGFic3RyYWN0IG9uTGVhdmUoKTtcclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgbG9hZEFzc2V0c0FzeW5jKCl7XHJcblxyXG4gICAgICAgIHRoaXMudG90YWxDb3VudCA9IHRoaXMucHJlbG9hZFByZWZhYi5zaXplO1xyXG5cclxuICAgICAgICBsZXQgcHJlbWlzZXMgPSBbXTtcclxuXHJcbiAgICAgICAgdGhpcy5wcmVsb2FkUHJlZmFiLmZvckVhY2goKHZhbHVlLCBrZXkpPT57XHJcbiAgICAgICAgICAgIGxldCBwcmVtaXNlID0gUy5HYW1lT2JqZWN0UG9vbC5wcmVMb2FkR2FtZU9iamVjdEFzeW5jKGtleSwgdmFsdWUsKCk9PntcclxuICAgICAgICAgICAgICAgIHRoaXMuZmluaXNoQ291bnQrKztcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgcHJlbWlzZXMucHVzaChwcmVtaXNlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwocHJlbWlzZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbkRlc3Ryb3koKXtcclxuIFxyXG4gICAgICAgIC8v5riF55CG6LWE5rqQ57yT5a2YXHJcbiAgICAgICAgUy5HYW1lT2JqZWN0UG9vbC5jbGVhbnVwKHRydWUpO1xyXG5cclxuICAgICAgICAvL+WNuOi9veWcuuaZr1xyXG4gICAgICAgIFMuUmVzTWFuYWdlci51bmxvYWRTY2VuZSh0aGlzLnNjZW5lSW5zdGFuY2UpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMucHJlbG9hZFByZWZhYi5jbGVhcigpO1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IGVudW0gU2NlbmVEZWYge1xyXG4gICAgQmF0dGxlU2NlbmUgPSBcIkJhdHRsZVNjZW5lXCIsXHJcbn0iLCJpbXBvcnQgQmF0dGxlU2NlbmUgZnJvbSBcIi4uLy4uL2dhbWUvbW9kdWxlL3B2cC9CYXR0bGVTY2VuZVwiO1xyXG5pbXBvcnQgeyBCYXNlU2NlbmUgfSBmcm9tIFwiLi9CYXNlU2NlbmVcIjtcclxuaW1wb3J0IHsgU2NlbmVEZWYgfSBmcm9tIFwiLi9TY2VuZURlZlwiO1xyXG5cclxuXHJcblxyXG5leHBvcnQgY2xhc3MgU2NlbmVGYWN0b3J5e1xyXG5cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZVNjZW5lKHNjZW5lTmFtZTpzdHJpbmcpOkJhc2VTY2VuZXtcclxuXHJcbiAgICAgICAgbGV0IHNjZW5lOkJhc2VTY2VuZSA9IG51bGw7XHJcblxyXG4gICAgICAgIHN3aXRjaCAoc2NlbmVOYW1lKXtcclxuICAgICAgICAgICAgY2FzZSBTY2VuZURlZi5CYXR0bGVTY2VuZTpcclxuICAgICAgICAgICAgICAgIHNjZW5lID0gbmV3IEJhdHRsZVNjZW5lKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBzY2VuZTtcclxuICAgIH1cclxufSIsImltcG9ydCB7IFMgfSBmcm9tIFwiLi4vLi4vZ2xvYmFsL0dhbWVDb25maWdcIjtcclxuaW1wb3J0IHsgU2luZ2xldG9uIH0gZnJvbSBcIi4uL2NvbW1vbi9TaW5nbGV0b25cIjtcclxuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIi4uL2xvZ2dlci9Mb2dnZXJcIjtcclxuaW1wb3J0IHsgQmFzZVNjZW5lIH0gZnJvbSBcIi4vQmFzZVNjZW5lXCI7XHJcbmltcG9ydCB7IFNjZW5lRmFjdG9yeSB9IGZyb20gXCIuL1NjZW5lRmFjdG9yeVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNjZW5lTWFuYWdlciBleHRlbmRzIFNpbmdsZXRvbjxTY2VuZU1hbmFnZXI+e1xyXG5cclxuICAgIHByaXZhdGUgY3VycmVudFNjZW5lOkJhc2VTY2VuZSA9IG51bGw7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhc3luYyBsb2FkU2NlbmUoc2NlbmU6c3RyaW5nKXtcclxuICAgICAgICBcclxuICAgICAgICB0cnl7XHJcbiAgICAgICAgICAgIC8v5riF55CG5pen5Zy65pmvXHJcbiAgICAgICAgICAgIGlmKHRoaXMuY3VycmVudFNjZW5lKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFNjZW5lLm9uTGVhdmUoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFNjZW5lLm9uRGVzdHJveSgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL+W8gOWni+WKoOi9veWcuuaZr1xyXG4gICAgICAgICAgICBsZXQgc2NlbmVJbnN0YW5jZSA9IGF3YWl0IFMuUmVzTWFuYWdlci5sb2FkU2NlbmUoc2NlbmUpO1xyXG5cclxuICAgICAgICAgICAgLy/lvIDlp4vliqDovb3ov5vlhaXlnLrmma/nmoTotYTmupBcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50U2NlbmUgPSAgU2NlbmVGYWN0b3J5LmNyZWF0ZVNjZW5lKHNjZW5lKTtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50U2NlbmUuc2V0U2NlbmVJbnN0YW5jZShzY2VuZUluc3RhbmNlKTtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50U2NlbmUub25FbnRlcigpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIC8v5Yqg6L296LWE5rqQXHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuY3VycmVudFNjZW5lLmxvYWRBc3NldHNBc3luYygpO1xyXG5cclxuICAgICAgICAgICAgYXdhaXQgdGhpcy5jdXJyZW50U2NlbmUub25Db21wbGV0ZSgpXHJcbiAgICAgICAgfWNhdGNoKGV4KXtcclxuICAgICAgICAgICAgTG9nZ2VyLmxvZyhcImxvYWQgc2NlbmUgZXhjZXA6XCIrZXgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsIlxyXG5pbXBvcnQgeyBKc01hbmFnZXIgLEdhbWVMYXVuY2ggfSBmcm9tICdjc2hhcnAnO1xyXG5pbXBvcnQgeyBTY2VuZURlZiB9IGZyb20gJy4uL2ZyYW1ld29yay9zY2VuZS9TY2VuZURlZic7XHJcbmltcG9ydCB7IFMgfSBmcm9tICcuLi9nbG9iYWwvR2FtZUNvbmZpZyc7XHJcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gJy4uL2ZyYW1ld29yay9sb2dnZXIvTG9nZ2VyJztcclxuXHJcbmNsYXNzIEdhbWVNYWlue1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIEpzTWFuYWdlci5JbnN0YW5jZS5Kc09uQXBwbGljYXRpb25RdWl0ID0gKCkgPT4gdGhpcy5vbkFwcGxpY2F0aW9uUXVpdCgpO1xyXG4gICAgICAgIEpzTWFuYWdlci5JbnN0YW5jZS5Kc09uRGlzcG9zZSA9ICgpID0+IHRoaXMub25EaXNwb3NlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIHN0YXJ0KCkge1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRyeXtcclxuICAgICAgICAgICAgTG9nZ2VyLmxvZyhcIkdhbWUgc3RhcnQgaW4gSlMuLi4uXCIpO1xyXG5cclxuICAgICAgICAgICAgLy8gLy/ov5vlhaXnmbvlvZXmqKHlnZdcclxuICAgICAgICAgICAgLy8gYXdhaXQgUy5TY2VuZU1hbmFnZXIubG9hZFNjZW5lKFNjZW5lRGVmLkxvZ2luU2NlbmUpO1xyXG4gICAgICAgICAgICBhd2FpdCBTLlNjZW5lTWFuYWdlci5sb2FkU2NlbmUoU2NlbmVEZWYuQmF0dGxlU2NlbmUpO1xyXG5cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vSlPlkK/liqjlrozmiJDvvIzpgJrnn6VDI+WxglxyXG4gICAgICAgICAgICBHYW1lTGF1bmNoLkluc3RhbmNlLkpzTHVhbmNoRmluaXNoKCk7XHJcbiAgICAgICAgfWNhdGNoKGV4KXtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKGV4KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbkFwcGxpY2F0aW9uUXVpdCgpOnZvaWQge1xyXG4gICAgICAgIFMuR2FtZU9iamVjdFBvb2wuY2xlYW51cCh0cnVlKTtcclxuICAgICAgICBMb2dnZXIubG9nKFwiR2FtZSBvbkFwcGxpY2F0aW9uUXVpdCBpbiBKUy4uLi5cIik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uRGlzcG9zZSgpOnZvaWQge1xyXG4gICAgICAgIFxyXG4gICAgICAgIExvZ2dlci5sb2coXCJHYW1lIG9uRGlzcG9zZSBpbiBKUy4uLi5cIik7XHJcbiAgICB9XHJcbn1cclxuXHJcbm5ldyBHYW1lTWFpbigpLnN0YXJ0KCk7XHJcblxyXG4iLCJpbXBvcnQgeyBVbml0eUVuZ2luZSB9IGZyb20gXCJjc2hhcnBcIjtcclxuaW1wb3J0IHsgJHR5cGVvZiB9IGZyb20gXCJwdWVydHNcIjtcclxuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9sb2dnZXIvTG9nZ2VyXCI7XHJcbmltcG9ydCB7IEJhc2VTY2VuZSB9IGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvc2NlbmUvQmFzZVNjZW5lXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCYXR0bGVTY2VuZSBleHRlbmRzIEJhc2VTY2VuZSB7XHJcblxyXG4gICAgcHVibGljIG9uRW50ZXIoKSB7XHJcbiAgICAgICAgTG9nZ2VyLmxvZyhcIkJhdHRsZVNjZW5lIG9uRW50ZXIgflwiKTtcclxuICAgICAgICBsZXQgb2JqQ1cgPSBVbml0eUVuZ2luZS5HYW1lT2JqZWN0LkZpbmQoXCJUZWFtMS9DdWJlV2hpdGVcIik7XHJcbiAgICAgICAgbGV0IG9iakNCID0gVW5pdHlFbmdpbmUuR2FtZU9iamVjdC5GaW5kKFwiVGVhbTIvQ3ViZUJsdWVcIik7XHJcbiAgICAgICAgaWYob2JqQ1cgJiYgb2JqQ0IpIHtcclxuICAgICAgICAgICAgbGV0IGFnZW50Q1cgPSBvYmpDVy5HZXRDb21wb25lbnQoJHR5cGVvZihVbml0eUVuZ2luZS5BSS5OYXZNZXNoQWdlbnQpKSBhcyBVbml0eUVuZ2luZS5BSS5OYXZNZXNoQWdlbnQ7XHJcbiAgICAgICAgICAgIGlmKCFhZ2VudENXLklzTnVsbCgpKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBhZ2VudC5TZXREZXN0aW5hdGlvbihvYmpDQi50cmFuc2Zvcm0ucG9zaXRpb24pO1xyXG4gICAgICAgICAgICAgICAgYWdlbnRDVy5TZXREZXN0aW5hdGlvbihuZXcgVW5pdHlFbmdpbmUuVmVjdG9yMygwLDAsLTIpKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IGFnZW50Q0IgPSBvYmpDQi5HZXRDb21wb25lbnQoJHR5cGVvZihVbml0eUVuZ2luZS5BSS5OYXZNZXNoQWdlbnQpKSBhcyBVbml0eUVuZ2luZS5BSS5OYXZNZXNoQWdlbnQ7XHJcbiAgICAgICAgICAgIGlmKCFhZ2VudENCLklzTnVsbCgpKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBhZ2VudC5TZXREZXN0aW5hdGlvbihvYmpDQi50cmFuc2Zvcm0ucG9zaXRpb24pO1xyXG4gICAgICAgICAgICAgICAgYWdlbnRDQi5TZXREZXN0aW5hdGlvbihuZXcgVW5pdHlFbmdpbmUuVmVjdG9yMygwLDAsMikpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIG9uQ29tcGxldGUoKTpQcm9taXNlPGFueT4ge1xyXG4gICAgICAgIExvZ2dlci5sb2coXCJCYXR0bGVTY2VuZSBvbkNvbXBsZXRlIH5cIik7XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpXHJcbiAgICB9XHJcbiAgICBwdWJsaWMgb25MZWF2ZSgpIHtcclxuICAgICAgICBMb2dnZXIubG9nKFwiQmF0dGxlU2NlbmUgb25MZWF2ZSB+XCIpO1xyXG4gICAgfVxyXG5cclxufSIsImltcG9ydCB7IEdhbWVPYmplY3RQb29sIH0gZnJvbSBcIi4uL2ZyYW1ld29yay9jb21tb24vR2FtZU9iamVjdFBvb2xcIjtcclxuaW1wb3J0IHsgUmVzTWFuYWdlciB9IGZyb20gXCIuLi9mcmFtZXdvcmsvY29tbW9uL1Jlc01hbmFnZXJcIjtcclxuaW1wb3J0IHsgU2NlbmVNYW5hZ2VyIH0gZnJvbSBcIi4uL2ZyYW1ld29yay9zY2VuZS9TY2VuZU1hbmFnZXJcIjtcclxuXHJcbmV4cG9ydCAgY2xhc3MgR2FtZUNvbmZpZ3tcclxuICAgIHB1YmxpYyBzdGF0aWMgZGVidWc6Ym9vbGVhbiA9IHRydWU7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBTe1xyXG4gICAgcHVibGljIHN0YXRpYyBTY2VuZU1hbmFnZXIgPSBTY2VuZU1hbmFnZXIuSW5zdGFuY2UoU2NlbmVNYW5hZ2VyKTtcclxuICAgIHB1YmxpYyBzdGF0aWMgR2FtZU9iamVjdFBvb2wgPSBHYW1lT2JqZWN0UG9vbC5JbnN0YW5jZShHYW1lT2JqZWN0UG9vbCk7XHJcbiAgICBwdWJsaWMgc3RhdGljIFJlc01hbmFnZXIgPSBSZXNNYW5hZ2VyLkluc3RhbmNlKFJlc01hbmFnZXIpO1xyXG59XHJcbiIsInJlcXVpcmUoXCIuL2dhbWUvR2FtZU1haW5cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY3NoYXJwXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInB1ZXJ0c1wiKTsiXSwic291cmNlUm9vdCI6IiJ9