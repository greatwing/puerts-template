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

/***/ "./src/framework/table/table.ts":
/*!**************************************!*\
  !*** ./src/framework/table/table.ts ***!
  \**************************************/
/*! exports provided: LoadTable */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoadTable", function() { return LoadTable; });
/* harmony import */ var _table_gen__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./table_gen */ "./src/framework/table/table_gen.ts");
/* harmony import */ var csharp__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! csharp */ "csharp");
/* harmony import */ var csharp__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(csharp__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var puerts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! puerts */ "puerts");
/* harmony import */ var puerts__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(puerts__WEBPACK_IMPORTED_MODULE_2__);



async function LoadTable() {
    try {
        let task = csharp__WEBPACK_IMPORTED_MODULE_1__["NiceTS"].ResourceManager.LoadTextAsset('Json/table_gen.json');
        let textAsset = await Object(puerts__WEBPACK_IMPORTED_MODULE_2__["$promise"])(task);
        _table_gen__WEBPACK_IMPORTED_MODULE_0__["tab"].InitData(textAsset.text);
        csharp__WEBPACK_IMPORTED_MODULE_1__["NiceTS"].ResourceManager.ReleaseAddressGO(textAsset);
    }
    catch (e) {
        console.error(`LoadTable: ${e}`);
    }
}


/***/ }),

/***/ "./src/framework/table/table_gen.ts":
/*!******************************************!*\
  !*** ./src/framework/table/table_gen.ts ***!
  \******************************************/
/*! exports provided: tab */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tab", function() { return tab; });
// Generated by github.com/greatwing/tabtoy
// DO NOT EDIT!!
// Version: 
var tab;
(function (tab) {
    tab.Data = null;
    function InitData(json) {
        tab.Data = Table.FromJSON(json);
    }
    tab.InitData = InitData;
    let ItemType;
    (function (ItemType) {
        ItemType[ItemType["ItemType_Tower"] = 0] = "ItemType_Tower";
        ItemType[ItemType["ItemType_GiftBag"] = 1] = "ItemType_GiftBag";
        ItemType[ItemType["ItemType_Money"] = 2] = "ItemType_Money";
    })(ItemType = tab.ItemType || (tab.ItemType = {}));
    let ItemQuality;
    (function (ItemQuality) {
        ItemQuality[ItemQuality["ItemQuality_White"] = 0] = "ItemQuality_White";
        ItemQuality[ItemQuality["ItemQuality_Blue"] = 1] = "ItemQuality_Blue";
        ItemQuality[ItemQuality["ItemQuality_Violet"] = 2] = "ItemQuality_Violet";
        ItemQuality[ItemQuality["ItemQuality_Golden"] = 3] = "ItemQuality_Golden";
    })(ItemQuality = tab.ItemQuality || (tab.ItemQuality = {}));
    class ItemTable {
    }
    tab.ItemTable = ItemTable;
    class ConfigTable {
    }
    tab.ConfigTable = ConfigTable;
    // Combine struct
    class Table {
        // table: ConfigTable
        GetKeyValue_ConfigTable() {
            return this.ConfigTable[0];
        }
        //根据json创建Table
        static FromJSON(json) {
            let result;
            if (typeof json === 'string') {
                // if it's a string, parse it first
                result = JSON.parse(json, Table.reviver);
            }
            else {
                // create an instance of the Table class
                let tbl = new Table();
                // copy all the fields from the json object
                result = Object.assign(tbl, json);
            }
            result.BuildData();
            return result;
        }
        static reviver(key, value) {
            return key === "" ? Table.FromJSON(value) : value;
        }
        // 清除索引和数据
        ResetData() {
            this.ItemTable = [];
            this.ConfigTable = [];
            this.ItemTableByID = new Dictionary();
        }
        // 构建索引
        BuildData() {
            this.ItemTableByID = new Dictionary();
            if (this.ItemTable) {
                for (let v of this.ItemTable) {
                    this.ItemTableByID.setValue(v.ID, v);
                }
            }
        }
    }
    tab.Table = Table;
    class Dictionary {
        /**
         * Creates an empty dictionary.
         * @class <p>Dictionaries map keys to values; each key can map to at most one value.
         * This implementation accepts any kind of objects as keys.</p>
         *
         * <p>If the keys are custom objects a function which converts keys to unique
         * strings must be provided. Example:</p>
         * <pre>
         * function petToString(pet) {
         *  return pet.name;
         * }
         * </pre>
         * @constructor
         * @param {function(Object):string=} toStrFunction optional function used
         * to convert keys to strings. If the keys aren't strings or if toString()
         * is not appropriate, a custom function which receives a key and returns a
         * unique string must be provided.
         */
        constructor(toStrFunction) {
            this.table = {};
            this.nElements = 0;
            this.toStr = toStrFunction || defaultToString;
        }
        /**
         * Returns the value to which this dictionary maps the specified key.
         * Returns undefined if this dictionary contains no mapping for this key.
         * @param {Object} key key whose associated value is to be returned.
         * @return {*} the value to which this dictionary maps the specified key or
         * undefined if the map contains no mapping for this key.
         */
        getValue(key) {
            const pair = this.table['$' + this.toStr(key)];
            if (isUndefined(pair)) {
                return undefined;
            }
            return pair.value;
        }
        /**
         * Associates the specified value with the specified key in this dictionary.
         * If the dictionary previously contained a mapping for this key, the old
         * value is replaced by the specified value.
         * @param {Object} key key with which the specified value is to be
         * associated.
         * @param {Object} value value to be associated with the specified key.
         * @return {*} previous value associated with the specified key, or undefined if
         * there was no mapping for the key or if the key/value are undefined.
         */
        setValue(key, value) {
            if (isUndefined(key) || isUndefined(value)) {
                return undefined;
            }
            let ret;
            const k = '$' + this.toStr(key);
            const previousElement = this.table[k];
            if (isUndefined(previousElement)) {
                this.nElements++;
                ret = undefined;
            }
            else {
                ret = previousElement.value;
            }
            this.table[k] = {
                key: key,
                value: value
            };
            return ret;
        }
        /**
         * Removes the mapping for this key from this dictionary if it is present.
         * @param {Object} key key whose mapping is to be removed from the
         * dictionary.
         * @return {*} previous value associated with specified key, or undefined if
         * there was no mapping for key.
         */
        remove(key) {
            const k = '$' + this.toStr(key);
            const previousElement = this.table[k];
            if (!isUndefined(previousElement)) {
                delete this.table[k];
                this.nElements--;
                return previousElement.value;
            }
            return undefined;
        }
        /**
         * Returns an array containing all of the keys in this dictionary.
         * @return {Array} an array containing all of the keys in this dictionary.
         */
        keys() {
            const array = [];
            for (const name in this.table) {
                if (has(this.table, name)) {
                    const pair = this.table[name];
                    array.push(pair.key);
                }
            }
            return array;
        }
        /**
         * Returns an array containing all of the values in this dictionary.
         * @return {Array} an array containing all of the values in this dictionary.
         */
        values() {
            const array = [];
            for (const name in this.table) {
                if (has(this.table, name)) {
                    const pair = this.table[name];
                    array.push(pair.value);
                }
            }
            return array;
        }
        /**
         * Executes the provided function once for each key-value pair
         * present in this dictionary.
         * @param {function(Object,Object):*} callback function to execute, it is
         * invoked with two arguments: key and value. To break the iteration you can
         * optionally return false.
         */
        forEach(callback) {
            for (const name in this.table) {
                if (has(this.table, name)) {
                    const pair = this.table[name];
                    const ret = callback(pair.key, pair.value);
                    if (ret === false) {
                        return;
                    }
                }
            }
        }
        /**
         * Returns true if this dictionary contains a mapping for the specified key.
         * @param {Object} key key whose presence in this dictionary is to be
         * tested.
         * @return {boolean} true if this dictionary contains a mapping for the
         * specified key.
         */
        containsKey(key) {
            return !isUndefined(this.getValue(key));
        }
        /**
         * Removes all mappings from this dictionary.
         * @this {collections.Dictionary}
         */
        clear() {
            this.table = {};
            this.nElements = 0;
        }
        /**
         * Returns the number of keys in this dictionary.
         * @return {number} the number of key-value mappings in this dictionary.
         */
        size() {
            return this.nElements;
        }
        /**
         * Returns true if this dictionary contains no mappings.
         * @return {boolean} true if this dictionary contains no mappings.
         */
        isEmpty() {
            return this.nElements <= 0;
        }
        toString() {
            let toret = '{';
            this.forEach((k, v) => {
                toret += "\n\t" + k.toString() + " : " + v.toString();
            });
            return toret + '\n}';
        }
    } // End of dictionary
    tab.Dictionary = Dictionary;
    function defaultToString(item) {
        if (item === null) {
            return 'COLLECTION_NULL';
        }
        else if (isUndefined(item)) {
            return 'COLLECTION_UNDEFINED';
        }
        else if (isString(item)) {
            return '$s' + item;
        }
        else {
            return '$o' + item.toString();
        }
    }
    const _hasOwnProperty = Object.prototype.hasOwnProperty;
    const has = function (obj, prop) {
        return _hasOwnProperty.call(obj, prop);
    };
    function isUndefined(obj) {
        return (typeof obj) === 'undefined';
    }
    function isString(obj) {
        return Object.prototype.toString.call(obj) === '[object String]';
    }
    //Polyfill
    if (typeof Object.assign !== 'function') {
        // Must be writable: true, enumerable: false, configurable: true
        Object.defineProperty(Object, "assign", {
            value: function assign(target, varArgs) {
                'use strict';
                if (target === null || target === undefined) {
                    throw new TypeError('Cannot convert undefined or null to object');
                }
                var to = Object(target);
                for (var index = 1; index < arguments.length; index++) {
                    var nextSource = arguments[index];
                    if (nextSource !== null && nextSource !== undefined) {
                        for (var nextKey in nextSource) {
                            // Avoid bugs when hasOwnProperty is shadowed
                            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                                to[nextKey] = nextSource[nextKey];
                            }
                        }
                    }
                }
                return to;
            },
            writable: true,
            configurable: true
        });
    }
})(tab || (tab = {}));


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
/* harmony import */ var _framework_table_table__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../framework/table/table */ "./src/framework/table/table.ts");





class GameMain {
    constructor() {
        csharp__WEBPACK_IMPORTED_MODULE_0__["JsManager"].Instance.JsOnApplicationQuit = () => this.onApplicationQuit();
        csharp__WEBPACK_IMPORTED_MODULE_0__["JsManager"].Instance.JsOnDispose = () => this.onDispose();
    }
    async start() {
        try {
            _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_3__["Logger"].log("Game start in JS....");
            //加载数据表
            await Object(_framework_table_table__WEBPACK_IMPORTED_MODULE_4__["LoadTable"])();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZyYW1ld29yay9jb21tb24vR2FtZU9iamVjdFBvb2wudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZyYW1ld29yay9jb21tb24vUmVzTWFuYWdlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZnJhbWV3b3JrL2NvbW1vbi9TaW5nbGV0b24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZyYW1ld29yay9sb2dnZXIvTG9nZ2VyLnRzIiwid2VicGFjazovLy8uL3NyYy9mcmFtZXdvcmsvc2NlbmUvQmFzZVNjZW5lLnRzIiwid2VicGFjazovLy8uL3NyYy9mcmFtZXdvcmsvc2NlbmUvU2NlbmVEZWYudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZyYW1ld29yay9zY2VuZS9TY2VuZUZhY3RvcnkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZyYW1ld29yay9zY2VuZS9TY2VuZU1hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZyYW1ld29yay90YWJsZS90YWJsZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZnJhbWV3b3JrL3RhYmxlL3RhYmxlX2dlbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZ2FtZS9HYW1lTWFpbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZ2FtZS9tb2R1bGUvcHZwL0JhdHRsZVNjZW5lLnRzIiwid2VicGFjazovLy8uL3NyYy9nbG9iYWwvR2FtZUNvbmZpZy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiY3NoYXJwXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicHVlcnRzXCIiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7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SjtJQUNMLENBQUM7SUFDTSxVQUFVO1FBQ2IsK0RBQU0sQ0FBQyxHQUFHLENBQUMsMEJBQTBCLENBQUMsQ0FBQztRQUN2QyxPQUFPLE9BQU8sQ0FBQyxPQUFPLEVBQUU7SUFDNUIsQ0FBQztJQUNNLE9BQU87UUFDViwrREFBTSxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7Q0FFSjs7Ozs7Ozs7Ozs7OztBQ2pDRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBb0U7QUFDUjtBQUNHO0FBRXhELE1BQU8sVUFBVTs7QUFDTixnQkFBSyxHQUFXLElBQUksQ0FBQztBQUdoQyxNQUFNLENBQUM7O0FBQ0ksY0FBWSxHQUFHLDBFQUFZLENBQUMsUUFBUSxDQUFDLDBFQUFZLENBQUMsQ0FBQztBQUNuRCxnQkFBYyxHQUFHLCtFQUFjLENBQUMsUUFBUSxDQUFDLCtFQUFjLENBQUMsQ0FBQztBQUN6RCxZQUFVLEdBQUcsdUVBQVUsQ0FBQyxRQUFRLENBQUMsdUVBQVUsQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7QUNYL0QsbUJBQU8sQ0FBQywrQ0FBaUIsRTs7Ozs7Ozs7Ozs7QUNBekIsbUM7Ozs7Ozs7Ozs7O0FDQUEsbUMiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCJcclxuaW1wb3J0IHsgU2luZ2xldG9uIH0gZnJvbSAnLi9TaW5nbGV0b24nO1xyXG5pbXBvcnQgeyBSZXNNYW5hZ2VyIH0gZnJvbSAnLi9SZXNNYW5hZ2VyJztcclxuaW1wb3J0IHsgVW5pdHlFbmdpbmUgfSBmcm9tICdjc2hhcnAnO1xyXG5cclxuXHJcblxyXG4vLyAtLSBHYW1lT2JqZWN057yT5a2Y5rGgXHJcbi8vIC0tIOazqOaEj++8mlxyXG4vLyAtLSAx44CB5omA5pyJ6ZyA6KaB6aKE6K6+6YO95LuO6L+Z6YeM5Yqg6L2977yM5LiN6KaB55u05o6l5YiwUmVzb3VyY2VzTWFuYWdlcuWOu+WKoOi9ve+8jOeUsei/memHjOe7n+S4gOWBmue8k+WtmOeuoeeQhlxyXG4vLyAtLSAy44CB57yT5a2Y5YiG5Li65Lik6YOo5YiG77ya5LuO6LWE5rqQ5bGC5Yqg6L2955qE5Y6f5aeLR2FtZU9iamVjdChBc3NldCnvvIzku45HYW1lT2JqZWN05a6e5L6L5YyW5Ye65p2l55qE5aSa5LiqSW5zdFxyXG5leHBvcnQgY2xhc3MgR2FtZU9iamVjdFBvb2wgZXh0ZW5kcyBTaW5nbGV0b248R2FtZU9iamVjdFBvb2w+e1xyXG5cclxuICAgIHByaXZhdGUgX19jYWNoZVRyYW5zUm9vdCA9IG51bGw7XHJcbiAgICBwcml2YXRlIF9fZ29Qb29sID0gbmV3IE1hcCgpO1xyXG4gICAgcHJpdmF0ZSBfX2luc3RDYWNoZTpNYXA8c3RyaW5nLEFycmF5PGFueT4+ID0gbmV3IE1hcDxzdHJpbmcsQXJyYXk8YW55Pj4oKTtcclxuXHJcblxyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcigpO1xyXG5cclxuICAgICAgICBsZXQgZ28gPSBVbml0eUVuZ2luZS5HYW1lT2JqZWN0LkZpbmQoXCJHYW1lT2JqZWN0Q2FjaGVSb290XCIpO1xyXG5cclxuICAgICAgICBpZihnbyA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBnbyA9IG5ldyBVbml0eUVuZ2luZS5HYW1lT2JqZWN0KFwiR2FtZU9iamVjdENhY2hlUm9vdFwiKTtcclxuICAgICAgICAgICAgVW5pdHlFbmdpbmUuT2JqZWN0LkRvbnREZXN0cm95T25Mb2FkKGdvKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX19jYWNoZVRyYW5zUm9vdCA9IGdvLnRyYW5zZm9ybTtcclxuICAgIH1cclxuXHJcbiAgICAvLy0tIOajgOa1i+aYr+WQpuW3sue7j+iiq+e8k+WtmFxyXG4gICAgcHVibGljIGNoZWNrSGFzQ2FjaGVkKHBhdGg6c3RyaW5nKXtcclxuXHJcbiAgICAgICAgbGV0IGNhY2hlZEluc3Q6QXJyYXk8YW55PiA9IHRoaXMuX19pbnN0Q2FjaGUuZ2V0KHBhdGgpO1xyXG4gICAgICAgIGlmKGNhY2hlZEluc3QgIT0gdW5kZWZpbmVkICYmIGNhY2hlZEluc3QubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHBvb2xlZEdvID0gdGhpcy5fX2dvUG9vbC5nZXQocGF0aCk7XHJcbiAgICAgICAgcmV0dXJuIHBvb2xlZEdvICE9IHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLy8tLSDnvJPlrZjlubblrp7kvovljJZHYW1lT2JqZWN0XHJcbiAgICBwdWJsaWMgY2FjaGVBbmRJbnN0R2FtZU9iamVjdChwYXRoOnN0cmluZywgZ286YW55LCBpbnN0X2NvdW50Om51bWJlciA9IDEpe1xyXG5cclxuICAgICAgICB0aGlzLl9fZ29Qb29sLnNldChwYXRoLCBnbyk7XHJcbiAgICAgICAgaWYoaW5zdF9jb3VudCA+IDApe1xyXG5cclxuICAgICAgICAgICAgbGV0IGNhY2hlZEluc3Q6QXJyYXk8YW55PiA9IHRoaXMuX19pbnN0Q2FjaGUuZ2V0KHBhdGgpO1xyXG4gICAgICAgICAgICBmb3IobGV0IGk6bnVtYmVyID0wOyBpIDwgaW5zdF9jb3VudDsgaSsrKXtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgaW5zdCA9IFVuaXR5RW5naW5lLkdhbWVPYmplY3QuSW5zdGFudGlhdGUoZ28pIGFzIFVuaXR5RW5naW5lLkdhbWVPYmplY3Q7XHJcbiAgICAgICAgICAgICAgICBpbnN0LnRyYW5zZm9ybS5TZXRQYXJlbnQodGhpcy5fX2NhY2hlVHJhbnNSb290KTtcclxuICAgICAgICAgICAgICAgIGluc3QuU2V0QWN0aXZlKGZhbHNlKTtcclxuXHJcbiAgICAgICAgICAgICAgICBjYWNoZWRJbnN0LnB1c2goaW5zdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8tLSDlsJ3or5Xku47nvJPlrZjkuK3ojrflj5ZcclxuICAgIHB1YmxpYyB0cnlHZXRGcm9tQ2FjaGUocGF0aDpzdHJpbmcpOmFueXtcclxuXHJcbiAgICAgICAgaWYoIXRoaXMuY2hlY2tIYXNDYWNoZWQocGF0aCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgY2FjaGVkSW5zdDpBcnJheTxvYmplY3Q+ICA9IHRoaXMuX19pbnN0Q2FjaGUuZ2V0KHBhdGgpO1xyXG4gICAgICAgIGlmKGNhY2hlZEluc3QgIT0gdW5kZWZpbmVkICYmIGNhY2hlZEluc3QubGVuZ3RoPjApe1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IGluc3QgPSBjYWNoZWRJbnN0LnBvcCgpO1xyXG4gICAgICAgICAgICByZXR1cm4gaW5zdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBwb29sZWRHbyA9IHRoaXMuX19nb1Bvb2wuZ2V0KHBhdGgpO1xyXG4gICAgICAgIGlmKHBvb2xlZEdvICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGxldCBpbnN0ID0gVW5pdHlFbmdpbmUuR2FtZU9iamVjdC5JbnN0YW50aWF0ZShwb29sZWRHbyk7XHJcbiAgICAgICAgICAgIHJldHVybiBpbnN0O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLy/pooTliqDovb3vvJrlj6/mj5DkvpvliJ3lp4vlrp7kvovljJbkuKrmlbBcclxuICAgIHB1YmxpYyBhc3luYyBwcmVMb2FkR2FtZU9iamVjdEFzeW5jKHBhdGg6c3RyaW5nLCBpbnN0X2NvdW50Om51bWJlciwgY2FsbGJhY2s6RnVuY3Rpb24sLi4ucGFyYW1zKXtcclxuXHJcbiAgICAgICAgaWYodGhpcy5jaGVja0hhc0NhY2hlZChwYXRoKSl7XHJcbiAgICAgICAgICAgIGlmKGNhbGxiYWNrIT1udWxsKXtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHBhcmFtcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGdvID0gYXdhaXQgUmVzTWFuYWdlci5JbnN0YW5jZShSZXNNYW5hZ2VyKS5sb2FkUHJlZmFiKHBhdGgpO1xyXG4gICAgICAgIGlmKGdvIT11bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLmNhY2hlQW5kSW5zdEdhbWVPYmplY3QocGF0aCwgZ28saW5zdF9jb3VudCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihjYWxsYmFjayE9bnVsbCl7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrKHBhcmFtcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvLy0tIOW8guatpeiOt+WPlu+8muW/heimgeaXtuWKoOi9vVxyXG4gICAgcHVibGljIGFzeW5jIGdldEdhbWVPYmplY3RBc3luYyhwYXRoOnN0cmluZywgY2FsbGJhY2s6RnVuY3Rpb24sLi4ucGFyYW1zKXtcclxuXHJcbiAgICAgICAgbGV0IGluc3Q6YW55ID0gdGhpcy50cnlHZXRGcm9tQ2FjaGUocGF0aCk7XHJcbiAgICAgICAgaWYoaW5zdCA9PW51bGwpe1xyXG4gICAgICAgICAgICBhd2FpdCB0aGlzLnByZUxvYWRHYW1lT2JqZWN0QXN5bmMocGF0aCwgMSwgY2FsbGJhY2ssIHBhcmFtcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnN0ID0gdGhpcy50cnlHZXRGcm9tQ2FjaGUocGF0aCk7XHJcbiAgICAgICAgaW5zdC5TZXRBY3RpdmUodHJ1ZSk7XHJcblxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvLy0tIOWbnuaUtlxyXG4gICAgcHVibGljIHJlY3ljbGVHYW1lT2JqZWN0KHBhdGg6c3RyaW5nLCBpbnN0OmFueSl7XHJcblxyXG4gICAgICAgIGluc3QudHJhbnNmb3JtLlNldFBhcmVudCh0aGlzLl9fY2FjaGVUcmFuc1Jvb3QpO1xyXG4gICAgICAgIGluc3QuU2V0QWN0aXZlKGZhbHNlKTtcclxuXHJcbiAgICAgICAgbGV0IGNhY2hlZEluc3QgPSB0aGlzLl9faW5zdENhY2hlLmdldChwYXRoKSB8fCBuZXcgQXJyYXkoKTtcclxuICAgICAgICBjYWNoZWRJbnN0LnB1c2goaW5zdCk7XHJcblxyXG4gICAgICAgIHRoaXMuX19pbnN0Q2FjaGUuc2V0KHBhdGgsIGNhY2hlZEluc3QpO1xyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgLy8tLSDmuIXnkIbnvJPlrZhcclxuICAgIHB1YmxpYyBjbGVhbnVwKGluY2x1ZGVQb29sZWRHbzpib29sZWFuID0gZmFsc2Upe1xyXG5cclxuICAgICAgICB0aGlzLl9faW5zdENhY2hlLmZvckVhY2goKHZhbHVlcywga2V5KT0+e1xyXG5cclxuICAgICAgICAgICAgZm9yKGxldCBpbnN0IG9mIHZhbHVlcyl7XHJcbiAgICAgICAgICAgICAgICBpZihpbnN0ICE9IG51bGwpe1xyXG4gICAgICAgICAgICAgICAgICAgIFVuaXR5RW5naW5lLkdhbWVPYmplY3QuRGVzdHJveShpbnN0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuX19pbnN0Q2FjaGUuY2xlYXIoKTsgXHJcblxyXG4gICAgICAgIGlmKGluY2x1ZGVQb29sZWRHbyl7XHJcbiAgICAgICAgICAgIHRoaXMuX19nb1Bvb2wuZm9yRWFjaCgoZ28sIGtleSk9PntcclxuXHJcbiAgICAgICAgICAgICAgICBpZihnbyAhPSBudWxsKXtcclxuICAgICAgICAgICAgICAgICAgICBSZXNNYW5hZ2VyLkluc3RhbmNlKFJlc01hbmFnZXIpLnJlbGVhc2VBZGRyZXNzR08oZ28pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX19nb1Bvb2wuY2xlYXIoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuXHJcbn0iLCJcclxuaW1wb3J0IHsgU2luZ2xldG9uIH0gZnJvbSAnLi9TaW5nbGV0b24nO1xyXG5pbXBvcnQgeyAkcHJvbWlzZSB9IGZyb20gJ3B1ZXJ0cyc7XHJcbmltcG9ydCB7TmljZVRTLCBVbml0eUVuZ2luZX0gZnJvbSAnY3NoYXJwJztcclxuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSAnLi4vbG9nZ2VyL0xvZ2dlcic7XHJcblxyXG5leHBvcnQgY2xhc3MgUmVzTWFuYWdlciBleHRlbmRzIFNpbmdsZXRvbjxSZXNNYW5hZ2VyPntcclxuXHJcbiAgICBwcml2YXRlIF9wa2dNYXA6TWFwPHN0cmluZyxudW1iZXI+ID0gbmV3IE1hcDxzdHJpbmcsbnVtYmVyPigpO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgYXN5bmMgbG9hZFNjZW5lKHNjZW5lTmFtZTpzdHJpbmcsIG1vZGUgPSBVbml0eUVuZ2luZS5TY2VuZU1hbmFnZW1lbnQuTG9hZFNjZW5lTW9kZS5TaW5nbGUpe1xyXG4gICAgICAgIHRyeXtcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgdGFzayA9IE5pY2VUUy5SZXNvdXJjZU1hbmFnZXIuTG9hZFNjZW5lKHNjZW5lTmFtZSwgbW9kZSwocHJvZ3Jlc3M6TnVtYmVyKT0+e1xyXG4gICAgICAgICAgICAgICAgTG9nZ2VyLmxvZyhcImxvYWQgc2NlbmU6IFwiK3Byb2dyZXNzKVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGxldCBzY2VuSW5zdGFuY2UgPSBhd2FpdCAkcHJvbWlzZSh0YXNrKVxyXG4gICAgICAgICAgICByZXR1cm4gc2Nlbkluc3RhbmNlXHJcblxyXG4gICAgICAgIH1jYXRjaChleCl7XHJcblxyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoYExvYWQgU2NlbmUgOiR7c2NlbmVOYW1lfSA6ICR7ZXh9YClcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgYXN5bmMgdW5sb2FkU2NlbmUoc2NlbmVJbnN0YW5jZTpVbml0eUVuZ2luZS5SZXNvdXJjZU1hbmFnZW1lbnQuUmVzb3VyY2VQcm92aWRlcnMuU2NlbmVJbnN0YW5jZSl7XHJcbiAgICAgICAgdHJ5e1xyXG4gICAgICAgICAgICBsZXQgdGFzaz0gTmljZVRTLlJlc291cmNlTWFuYWdlci5VbmxvYWRTY2VuZShzY2VuZUluc3RhbmNlKVxyXG4gICAgICAgICAgICBsZXQgZ28gPSBhd2FpdCAkcHJvbWlzZSh0YXNrKTtcclxuICAgICAgICAgICAgcmV0dXJuIGdvO1xyXG4gICAgICAgIH1jYXRjaChleCl7XHJcblxyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoYFVubG9hZCBzY2VuZSAgOiAke2V4fWApXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVubG9hZFNjZW5lQnlOYW1lKHNjZW5lTmFtZTpzdHJpbmcpe1xyXG5cclxuICAgICAgICBOaWNlVFMuUmVzb3VyY2VNYW5hZ2VyLlVubG9hZFNjZW5lQnlOYW1lKHNjZW5lTmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgbG9hZFByZWZhYihhZGRyZXNzOnN0cmluZyl7XHJcblxyXG4gICAgICAgIHRyeXtcclxuICAgICAgICAgICAgbGV0IHRhc2s9IE5pY2VUUy5SZXNvdXJjZU1hbmFnZXIuTG9hZFByZWZhYihhZGRyZXNzKTtcclxuICAgICAgICAgICAgbGV0IGdvID0gYXdhaXQgJHByb21pc2UodGFzayk7XHJcbiAgICAgICAgICAgIHJldHVybiBnbztcclxuICAgICAgICB9Y2F0Y2goZXgpe1xyXG5cclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKGBMb2FkIHByZWZhYiA6JHthZGRyZXNzfSA6ICR7ZXh9YClcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgbG9hZFRleHRBc3NldChhZGRyZXNzOnN0cmluZyl7XHJcblxyXG4gICAgICAgIHRyeXtcclxuICAgICAgICAgICAgbGV0IHRhc2sgPSBOaWNlVFMuUmVzb3VyY2VNYW5hZ2VyLkxvYWRUZXh0QXNzZXQoYWRkcmVzcyk7XHJcbiAgICAgICAgICAgIGxldCBnbyA9IGF3YWl0ICRwcm9taXNlKHRhc2spO1xyXG4gICAgICAgICAgICByZXR1cm4gZ287XHJcbiAgICAgICAgfWNhdGNoKGV4KXtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKGBMb2FkIHRleHRhc3NldCA6JHthZGRyZXNzfSA6ICR7ZXh9YClcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgYXN5bmMgbG9hZFRleHRCeXRlcyhhZGRyZXNzOnN0cmluZyl7XHJcblxyXG4gICAgICAgIHRyeXtcclxuICAgICAgICAgICAgbGV0IHRhc2sgPSBOaWNlVFMuUmVzb3VyY2VNYW5hZ2VyLkxvYWRUZXh0Qnl0ZXMoYWRkcmVzcyk7XHJcbiAgICAgICAgICAgIGxldCBieXRlcyA9IGF3YWl0ICRwcm9taXNlKHRhc2spO1xyXG4gICAgICAgICAgICByZXR1cm4gYnl0ZXM7XHJcbiAgICAgICAgfWNhdGNoKGV4KXtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKGBMb2FkVGV4dEJ5dGVzIDoke2FkZHJlc3N9IDogJHtleH1gKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBsb2FkU3ByaXRlKGFkZHJlc3M6c3RyaW5nKXtcclxuXHJcbiAgICAgICAgdHJ5e1xyXG4gICAgICAgICAgICBsZXQgdGFzayA9IE5pY2VUUy5SZXNvdXJjZU1hbmFnZXIuTG9hZFNwcml0ZShhZGRyZXNzKTtcclxuICAgICAgICAgICAgbGV0IGdvID0gYXdhaXQgJHByb21pc2UodGFzayk7XHJcbiAgICAgICAgICAgIHJldHVybiBnbztcclxuXHJcbiAgICAgICAgfWNhdGNoKGV4KXtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKGBMb2FkIHNwcml0ZSA6JHthZGRyZXNzfSA6ICR7ZXh9YClcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIHJlbGVhc2VBZGRyZXNzR08oZ286YW55KXtcclxuXHJcbiAgICAgICAgTmljZVRTLlJlc291cmNlTWFuYWdlci5SZWxlYXNlQWRkcmVzc0dPKGdvKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgXHJcbn0iLCJcclxuXHJcbmV4cG9ydCBjbGFzcyBTaW5nbGV0b248VD57XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2U6YW55ID0gbnVsbDtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIEluc3RhbmNlPFQ+KCBjOiB7IG5ldygpOiBUIH0gKSA6IFR7XHJcblxyXG4gICAgICAgIGlmKHRoaXMuaW5zdGFuY2UgPT0gbnVsbCl7XHJcbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2UgPSBuZXcgYygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IHsgVW5pdHlFbmdpbmUgfSBmcm9tICdjc2hhcnAnO1xyXG5pbXBvcnQgeyBHYW1lQ29uZmlnIH0gZnJvbSAnLi4vLi4vZ2xvYmFsL0dhbWVDb25maWcnO1xyXG5lbnVtIExvZ1R5cGUge1xyXG5cdEVycm9yID0gMCxcclxuXHRBc3NlcnQgPSAxLFxyXG5cdFdhcm5pbmcgPSAyLFxyXG5cdExvZyA9IDMsXHJcblx0RXhjZXB0aW9uID0gNFxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTG9nZ2Vye1xyXG4gICAgcHJpdmF0ZSAgc3RhdGljICB1bml0eV9sb2dfdGFyZ2V0ID0gbnVsbDtcclxuXHJcbiAgICBzdGF0aWMgZ2V0UHJpbnRTdGFjayh0eXBlOiBMb2dUeXBlLCBzaG93U3RhY2sgOiBib29sZWFuLCAuLi5hcmdzKSB7XHJcbiAgICAgICAgbGV0IG1lc3NhZ2UgPSAnJztcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IGFyZ3NbaV07XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZWxlbWVudCA9PT0gJ29iamVjdCcgJiYgTG9nZ2VyLkxPR19PQkpFQ1RfVE9fSlNPTikge1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZSArPSBKU09OLnN0cmluZ2lmeShlbGVtZW50KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2UgKz0gZWxlbWVudDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoaSA8IGFyZ3MubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZSArPSAnICc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBpZiAoc2hvd1N0YWNrIHx8IFVuaXR5RW5naW5lLkFwcGxpY2F0aW9uLmlzRWRpdG9yKSB7XHJcbiAgICAgICAgICAgIHZhciBzdGFja3MgPSBuZXcgRXJyb3IoKS5zdGFjay5zcGxpdCgnXFxuJyk7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAzOyBpIDwgc3RhY2tzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBsaW5lID0gc3RhY2tzW2ldO1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZSArPSAnXFxuJztcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2UgKz0gbGluZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIGlmICghTG9nZ2VyLnVuaXR5X2xvZ190YXJnZXQpIHtcclxuICAgICAgICAgICAgTG9nZ2VyLnVuaXR5X2xvZ190YXJnZXQgPSBuZXcgVW5pdHlFbmdpbmUuT2JqZWN0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbWVzc2FnZTtcclxuICAgIH1cclxuXHJcbiAgICBcclxuXHJcblx0c3RhdGljIGxvZyguLi5hcmdzKTogdm9pZHtcclxuICAgICAgICBpZighR2FtZUNvbmZpZy5kZWJ1ZykgcmV0dXJuO1xyXG5cclxuICAgICAgICBsZXQgbXNnID0gTG9nZ2VyLmdldFByaW50U3RhY2soTG9nVHlwZS5Mb2csIHRydWUsIGFyZ3MpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKG1zZyk7XHJcbiAgICB9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE91dHB1dHMgYSB3YXJuaW5nIG1lc3NhZ2UgdG8gdGhlIExvZ2dlci5cclxuXHQgKiBAcGFyYW0gbWVzc2FnZSAgbGlzdCBvZiBKYXZhU2NyaXB0IG9iamVjdHMgdG8gb3V0cHV0LiBUaGUgc3RyaW5nIHJlcHJlc2VudGF0aW9ucyBvZiBlYWNoIG9mIHRoZXNlIG9iamVjdHMgYXJlIGFwcGVuZGVkIHRvZ2V0aGVyIGluIHRoZSBvcmRlciBsaXN0ZWQgYW5kIG91dHB1dC5cclxuXHQgKi9cclxuXHRzdGF0aWMgd2FybiguLi5hcmdzKTogdm9pZHtcclxuICAgICAgICBpZighR2FtZUNvbmZpZy5kZWJ1ZykgcmV0dXJuO1xyXG5cclxuICAgICAgICBsZXQgbXNnID0gTG9nZ2VyLmdldFByaW50U3RhY2soTG9nVHlwZS5XYXJuaW5nLCB0cnVlLCBhcmdzKTtcclxuICAgICAgICBjb25zb2xlLndhcm4obXNnKTtcclxuICAgIH1cclxuXHJcblx0LyoqXHJcblx0ICogT3V0cHV0cyBhbiBlcnJvciBtZXNzYWdlIHRvIHRoZSBMb2dnZXIuXHJcblx0ICogQHBhcmFtIG1lc3NhZ2UgQSBsaXN0IG9mIEphdmFTY3JpcHQgb2JqZWN0cyB0byBvdXRwdXQuIFRoZSBzdHJpbmcgcmVwcmVzZW50YXRpb25zIG9mIGVhY2ggb2YgdGhlc2Ugb2JqZWN0cyBhcmUgYXBwZW5kZWQgdG9nZXRoZXIgaW4gdGhlIG9yZGVyIGxpc3RlZCBhbmQgb3V0cHV0LlxyXG5cdCAqL1xyXG5cdHN0YXRpYyBlcnJvciguLi5hcmdzKTogdm9pZHtcclxuICAgICAgICBpZighR2FtZUNvbmZpZy5kZWJ1ZykgcmV0dXJuO1xyXG5cclxuICAgICAgICBsZXQgbXNnID0gTG9nZ2VyLmdldFByaW50U3RhY2soTG9nVHlwZS5FcnJvciwgdHJ1ZSwgYXJncyk7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihtc2cpO1xyXG4gICAgfVxyXG5cclxuXHQvKiogT3V0cHV0cyBhIHN0YWNrIHRyYWNlIHRvIHRoZSBMb2dnZXIuXHJcblx0ICogQHBhcmFtIG1lc3NhZ2UgQSBsaXN0IG9mIEphdmFTY3JpcHQgb2JqZWN0cyB0byBvdXRwdXQuIFRoZSBzdHJpbmcgcmVwcmVzZW50YXRpb25zIG9mIGVhY2ggb2YgdGhlc2Ugb2JqZWN0cyBhcmUgYXBwZW5kZWQgdG9nZXRoZXIgaW4gdGhlIG9yZGVyIGxpc3RlZCBhbmQgb3V0cHV0LlxyXG5cdCovXHJcblx0c3RhdGljIHRyYWNlKC4uLmFyZ3MpOiB2b2lke1xyXG4gICAgICAgIGlmKCFHYW1lQ29uZmlnLmRlYnVnKSByZXR1cm47XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IG1zZyA9IExvZ2dlci5nZXRQcmludFN0YWNrKExvZ1R5cGUuTG9nLCB0cnVlLCBhcmdzKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhtc2cpO1xyXG4gICAgfVxyXG5cclxuXHQvKiogTG9nIEphdmFTY3JpcHQgT2JqZWN0cyBhcyBKU09OIGZvcm1hdCAqL1xyXG5cdHN0YXRpYyBMT0dfT0JKRUNUX1RPX0pTT04oLi4uYXJncyk6IGJvb2xlYW57XHJcblxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbn0iLCJpbXBvcnQgeyBVbml0eUVuZ2luZSB9IGZyb20gXCJjc2hhcnBcIjtcclxuaW1wb3J0IHsgUyB9IGZyb20gXCIuLi8uLi9nbG9iYWwvR2FtZUNvbmZpZ1wiO1xyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEJhc2VTY2VuZXtcclxuXHJcbiAgICBwcml2YXRlIHByZWxvYWRQcmVmYWI6TWFwPHN0cmluZyxudW1iZXI+O1xyXG4gICAgcHJpdmF0ZSBzY2VuZUluc3RhbmNlOlVuaXR5RW5naW5lLlJlc291cmNlTWFuYWdlbWVudC5SZXNvdXJjZVByb3ZpZGVycy5TY2VuZUluc3RhbmNlXHJcblxyXG4gICAgcHVibGljIGZpbmlzaENvdW50ID0gMDtcclxuICAgIHB1YmxpYyB0b3RhbENvdW50ID0gMDtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHRoaXMucHJlbG9hZFByZWZhYiA9IG5ldyBNYXA8c3RyaW5nLG51bWJlcj4oKTtcclxuICAgICAgICB0aGlzLmZpbmlzaENvdW50ID0gMDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWRkUHJlbG9hZFByZWZhYihhZGRyZXNzOnN0cmluZywgaW5zdENvdW50KXtcclxuICAgICAgICBpZighdGhpcy5wcmVsb2FkUHJlZmFiLmhhcyhhZGRyZXNzKSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMucHJlbG9hZFByZWZhYi5zZXQoYWRkcmVzcywgaW5zdENvdW50KTtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucHJlbG9hZFByZWZhYi5zZXQoYWRkcmVzcywgdGhpcy5wcmVsb2FkUHJlZmFiLmdldChhZGRyZXNzKSArIGluc3RDb3VudCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldFNjZW5lSW5zdGFuY2Uoc2NlbmVJbnN0YW5jZTpVbml0eUVuZ2luZS5SZXNvdXJjZU1hbmFnZW1lbnQuUmVzb3VyY2VQcm92aWRlcnMuU2NlbmVJbnN0YW5jZSl7XHJcbiAgICAgICAgdGhpcy5zY2VuZUluc3RhbmNlID0gc2NlbmVJbnN0YW5jZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWJzdHJhY3Qgb25FbnRlcigpO1xyXG4gICAgcHVibGljIGFic3RyYWN0IG9uQ29tcGxldGUoKTpQcm9taXNlPGFueT47XHJcbiAgICBwdWJsaWMgYWJzdHJhY3Qgb25MZWF2ZSgpO1xyXG5cclxuICAgIHB1YmxpYyBhc3luYyBsb2FkQXNzZXRzQXN5bmMoKXtcclxuXHJcbiAgICAgICAgdGhpcy50b3RhbENvdW50ID0gdGhpcy5wcmVsb2FkUHJlZmFiLnNpemU7XHJcblxyXG4gICAgICAgIGxldCBwcmVtaXNlcyA9IFtdO1xyXG5cclxuICAgICAgICB0aGlzLnByZWxvYWRQcmVmYWIuZm9yRWFjaCgodmFsdWUsIGtleSk9PntcclxuICAgICAgICAgICAgbGV0IHByZW1pc2UgPSBTLkdhbWVPYmplY3RQb29sLnByZUxvYWRHYW1lT2JqZWN0QXN5bmMoa2V5LCB2YWx1ZSwoKT0+e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5maW5pc2hDb3VudCsrO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBwcmVtaXNlcy5wdXNoKHByZW1pc2UpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBhd2FpdCBQcm9taXNlLmFsbChwcmVtaXNlcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uRGVzdHJveSgpe1xyXG4gXHJcbiAgICAgICAgLy/muIXnkIbotYTmupDnvJPlrZhcclxuICAgICAgICBTLkdhbWVPYmplY3RQb29sLmNsZWFudXAodHJ1ZSk7XHJcblxyXG4gICAgICAgIC8v5Y246L295Zy65pmvXHJcbiAgICAgICAgUy5SZXNNYW5hZ2VyLnVubG9hZFNjZW5lKHRoaXMuc2NlbmVJbnN0YW5jZSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5wcmVsb2FkUHJlZmFiLmNsZWFyKCk7XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgZW51bSBTY2VuZURlZiB7XHJcbiAgICBCYXR0bGVTY2VuZSA9IFwiQmF0dGxlU2NlbmVcIixcclxufSIsImltcG9ydCBCYXR0bGVTY2VuZSBmcm9tIFwiLi4vLi4vZ2FtZS9tb2R1bGUvcHZwL0JhdHRsZVNjZW5lXCI7XHJcbmltcG9ydCB7IEJhc2VTY2VuZSB9IGZyb20gXCIuL0Jhc2VTY2VuZVwiO1xyXG5pbXBvcnQgeyBTY2VuZURlZiB9IGZyb20gXCIuL1NjZW5lRGVmXCI7XHJcblxyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBTY2VuZUZhY3Rvcnl7XHJcblxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlU2NlbmUoc2NlbmVOYW1lOnN0cmluZyk6QmFzZVNjZW5le1xyXG5cclxuICAgICAgICBsZXQgc2NlbmU6QmFzZVNjZW5lID0gbnVsbDtcclxuXHJcbiAgICAgICAgc3dpdGNoIChzY2VuZU5hbWUpe1xyXG4gICAgICAgICAgICBjYXNlIFNjZW5lRGVmLkJhdHRsZVNjZW5lOlxyXG4gICAgICAgICAgICAgICAgc2NlbmUgPSBuZXcgQmF0dGxlU2NlbmUoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHNjZW5lO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgUyB9IGZyb20gXCIuLi8uLi9nbG9iYWwvR2FtZUNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBTaW5nbGV0b24gfSBmcm9tIFwiLi4vY29tbW9uL1NpbmdsZXRvblwiO1xyXG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiLi4vbG9nZ2VyL0xvZ2dlclwiO1xyXG5pbXBvcnQgeyBCYXNlU2NlbmUgfSBmcm9tIFwiLi9CYXNlU2NlbmVcIjtcclxuaW1wb3J0IHsgU2NlbmVGYWN0b3J5IH0gZnJvbSBcIi4vU2NlbmVGYWN0b3J5XCI7XHJcblxyXG5leHBvcnQgY2xhc3MgU2NlbmVNYW5hZ2VyIGV4dGVuZHMgU2luZ2xldG9uPFNjZW5lTWFuYWdlcj57XHJcblxyXG4gICAgcHJpdmF0ZSBjdXJyZW50U2NlbmU6QmFzZVNjZW5lID0gbnVsbDtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIGxvYWRTY2VuZShzY2VuZTpzdHJpbmcpe1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRyeXtcclxuICAgICAgICAgICAgLy/muIXnkIbml6flnLrmma9cclxuICAgICAgICAgICAgaWYodGhpcy5jdXJyZW50U2NlbmUpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50U2NlbmUub25MZWF2ZSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50U2NlbmUub25EZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8v5byA5aeL5Yqg6L295Zy65pmvXHJcbiAgICAgICAgICAgIGxldCBzY2VuZUluc3RhbmNlID0gYXdhaXQgUy5SZXNNYW5hZ2VyLmxvYWRTY2VuZShzY2VuZSk7XHJcblxyXG4gICAgICAgICAgICAvL+W8gOWni+WKoOi9vei/m+WFpeWcuuaZr+eahOi1hOa6kFxyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRTY2VuZSA9ICBTY2VuZUZhY3RvcnkuY3JlYXRlU2NlbmUoc2NlbmUpO1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRTY2VuZS5zZXRTY2VuZUluc3RhbmNlKHNjZW5lSW5zdGFuY2UpO1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRTY2VuZS5vbkVudGVyKCk7XHJcblxyXG5cclxuICAgICAgICAgICAgLy/liqDovb3otYTmupBcclxuICAgICAgICAgICAgYXdhaXQgdGhpcy5jdXJyZW50U2NlbmUubG9hZEFzc2V0c0FzeW5jKCk7XHJcblxyXG4gICAgICAgICAgICBhd2FpdCB0aGlzLmN1cnJlbnRTY2VuZS5vbkNvbXBsZXRlKClcclxuICAgICAgICB9Y2F0Y2goZXgpe1xyXG4gICAgICAgICAgICBMb2dnZXIubG9nKFwibG9hZCBzY2VuZSBleGNlcDpcIitleCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgdGFiIH0gZnJvbSBcIi4vdGFibGVfZ2VuXCI7XHJcbmltcG9ydCB7IE5pY2VUUyB9IGZyb20gJ2NzaGFycCc7XHJcbmltcG9ydCB7ICRwcm9taXNlIH0gZnJvbSBcInB1ZXJ0c1wiO1xyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIExvYWRUYWJsZSgpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgbGV0IHRhc2sgPSBOaWNlVFMuUmVzb3VyY2VNYW5hZ2VyLkxvYWRUZXh0QXNzZXQoJ0pzb24vdGFibGVfZ2VuLmpzb24nKVxyXG4gICAgICAgIGxldCB0ZXh0QXNzZXQgPSBhd2FpdCAkcHJvbWlzZSh0YXNrKTtcclxuICAgICAgICB0YWIuSW5pdERhdGEodGV4dEFzc2V0LnRleHQpO1xyXG4gICAgICAgIE5pY2VUUy5SZXNvdXJjZU1hbmFnZXIuUmVsZWFzZUFkZHJlc3NHTyh0ZXh0QXNzZXQpO1xyXG4gICAgfSBjYXRjaChlKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihgTG9hZFRhYmxlOiAke2V9YClcclxuICAgIH1cclxufSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICIsIi8vIEdlbmVyYXRlZCBieSBnaXRodWIuY29tL2dyZWF0d2luZy90YWJ0b3lcbi8vIERPIE5PVCBFRElUISFcbi8vIFZlcnNpb246IFxuZXhwb3J0IG5hbWVzcGFjZSB0YWIge1xuXHRleHBvcnQgdmFyIERhdGE6VGFibGUgPSBudWxsO1xuXG5cdGV4cG9ydCBmdW5jdGlvbiBJbml0RGF0YShqc29uOiBPYmplY3R8c3RyaW5nKSB7XG5cdFx0RGF0YSA9IFRhYmxlLkZyb21KU09OKGpzb24pO1xuXHR9XG5cblx0XG5cdGV4cG9ydCBlbnVtIEl0ZW1UeXBlIHsgXG5cdFx0SXRlbVR5cGVfVG93ZXIgPSAwLCAvLyDljaHniYwgXG5cdFx0SXRlbVR5cGVfR2lmdEJhZyA9IDEsIC8vIOekvOWMhSBcblx0XHRJdGVtVHlwZV9Nb25leSA9IDIsIC8vIOi0p+W4gSBcblx0fVxuXHRleHBvcnQgZW51bSBJdGVtUXVhbGl0eSB7IFxuXHRcdEl0ZW1RdWFsaXR5X1doaXRlID0gMCwgLy8g55m9IFxuXHRcdEl0ZW1RdWFsaXR5X0JsdWUgPSAxLCAvLyDok50gXG5cdFx0SXRlbVF1YWxpdHlfVmlvbGV0ID0gMiwgLy8g57SrIFxuXHRcdEl0ZW1RdWFsaXR5X0dvbGRlbiA9IDMsIC8vIOmHkSBcblx0fVxuXG5cdFxuXHRleHBvcnQgY2xhc3MgSXRlbVRhYmxlIHsgXG5cdFx0SUQgOiBudW1iZXIgLy8gSUQgXG5cdFx0TmFtZSA6IHN0cmluZyAvLyDlkI3np7AgXG5cdFx0VHlwZSA6IEl0ZW1UeXBlIC8vIOmBk+WFt+exu+WeiyBcblx0XHRJY29uIDogc3RyaW5nIC8vIOWbvuaghyBcblx0XHREZXNjIDogc3RyaW5nIC8vIOaPj+i/sCBcblx0XHRRdWFsaXR5IDogSXRlbVF1YWxpdHkgLy8g5ZOB6LSoIFxuXHR9XG5cdFxuXHRleHBvcnQgY2xhc3MgQ29uZmlnVGFibGUgeyBcblx0XHRub3RpY2V2ZXJzaW9uIDogc3RyaW5nIC8vICBcblx0XHRJbml0aWFsQ2FyZHMgOiBudW1iZXJbXSAvLyAgXG5cdFx0SW5pdERpYW1vbmQgOiBudW1iZXIgLy8gIFxuXHR9XG5cdFxuXG5cdC8vIENvbWJpbmUgc3RydWN0XG5cdGV4cG9ydCBjbGFzcyBUYWJsZSB7IFxuXHRcdEl0ZW1UYWJsZSA6IEl0ZW1UYWJsZVtdIC8vIHRhYmxlOiBJdGVtVGFibGUgXG5cdFx0Q29uZmlnVGFibGUgOiBDb25maWdUYWJsZVtdIC8vIHRhYmxlOiBDb25maWdUYWJsZSBcblxuXHRcdC8vIEluZGljZXMgXG5cdFx0SXRlbVRhYmxlQnlJRCA6IERpY3Rpb25hcnk8bnVtYmVyLCBJdGVtVGFibGU+IC8vIHRhYmxlOiBJdGVtVGFibGUgXG5cblx0XHRcblx0XHQvLyB0YWJsZTogQ29uZmlnVGFibGVcblx0XHRHZXRLZXlWYWx1ZV9Db25maWdUYWJsZSgpOiBDb25maWdUYWJsZXtcblx0XHRcdHJldHVybiB0aGlzLkNvbmZpZ1RhYmxlWzBdXG5cdFx0fVxuXHRcdFxuXG5cdFx0Ly/moLnmja5qc29u5Yib5bu6VGFibGVcblx0XHRzdGF0aWMgRnJvbUpTT04oanNvbjogT2JqZWN0fHN0cmluZyk6IFRhYmxlIHtcblx0XHRcdGxldCByZXN1bHQ6IFRhYmxlO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBqc29uID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIC8vIGlmIGl0J3MgYSBzdHJpbmcsIHBhcnNlIGl0IGZpcnN0XG4gICAgICAgICAgICAgICAgcmVzdWx0PSBKU09OLnBhcnNlKGpzb24sIFRhYmxlLnJldml2ZXIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBjcmVhdGUgYW4gaW5zdGFuY2Ugb2YgdGhlIFRhYmxlIGNsYXNzXG4gICAgICAgICAgICAgICAgbGV0IHRibCA9IG5ldyBUYWJsZSgpXG4gICAgICAgICAgICAgICAgLy8gY29weSBhbGwgdGhlIGZpZWxkcyBmcm9tIHRoZSBqc29uIG9iamVjdFxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IE9iamVjdC5hc3NpZ24odGJsLCBqc29uKTtcbiAgICAgICAgICAgIH1cblx0XHRcdHJlc3VsdC5CdWlsZERhdGEoKTtcblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fVxuXG4gICAgICAgIHN0YXRpYyByZXZpdmVyKGtleTogc3RyaW5nLCB2YWx1ZTogYW55KTogYW55IHtcbiAgICAgICAgICAgIHJldHVybiBrZXkgPT09IFwiXCIgPyBUYWJsZS5Gcm9tSlNPTih2YWx1ZSkgOiB2YWx1ZTtcbiAgICAgICAgfVxuXG5cdFx0Ly8g5riF6Zmk57Si5byV5ZKM5pWw5o2uXG5cdFx0UmVzZXREYXRhKCkge1xuXHRcdFx0XG5cdFx0XHR0aGlzLkl0ZW1UYWJsZSA9IFtdIFxuXHRcdFx0dGhpcy5Db25maWdUYWJsZSA9IFtdIFxuXHRcdFx0XG5cdFx0XHR0aGlzLkl0ZW1UYWJsZUJ5SUQgPSBuZXcgRGljdGlvbmFyeTxudW1iZXIsIEl0ZW1UYWJsZT4oKSBcblx0XHR9XG5cblx0XHQvLyDmnoTlu7rntKLlvJVcblx0XHRCdWlsZERhdGEoKSB7XG5cdFx0XHRcblx0XHRcdHRoaXMuSXRlbVRhYmxlQnlJRCA9IG5ldyBEaWN0aW9uYXJ5PG51bWJlciwgSXRlbVRhYmxlPigpXG5cdFx0XHRpZih0aGlzLkl0ZW1UYWJsZSkge1xuXHRcdFx0XHRmb3IobGV0IHYgb2YgdGhpcy5JdGVtVGFibGUpIHtcblx0XHRcdFx0XHR0aGlzLkl0ZW1UYWJsZUJ5SUQuc2V0VmFsdWUodi5JRCwgdilcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8vIFVzZWQgaW50ZXJuYWxseSBieSBkaWN0aW9uYXJ5XG5cdGV4cG9ydCBpbnRlcmZhY2UgSURpY3Rpb25hcnlQYWlyPEssIFY+IHtcblx0XHRrZXk6IEs7XG5cdFx0dmFsdWU6IFY7XG5cdH1cblx0XG5cdGV4cG9ydCBjbGFzcyBEaWN0aW9uYXJ5PEssIFY+IHtcblx0XG5cdFx0LyoqXG5cdFx0ICogT2JqZWN0IGhvbGRpbmcgdGhlIGtleS12YWx1ZSBwYWlycy5cblx0XHQgKiBAdHlwZSB7T2JqZWN0fVxuXHRcdCAqIEBwcml2YXRlXG5cdFx0ICovXG5cdFx0cHJvdGVjdGVkIHRhYmxlOiB7IFtrZXk6IHN0cmluZ106IElEaWN0aW9uYXJ5UGFpcjxLLCBWPiB9O1xuXHRcdC8vOiBba2V5OiBLXSB3aWxsIG5vdCB3b3JrIHNpbmNlIGluZGljZXMgY2FuIG9ubHkgYnkgc3RyaW5ncyBpbiBqYXZhc2NyaXB0IGFuZCB0eXBlc2NyaXB0IGVuZm9yY2VzIHRoaXMuXG5cdFxuXHRcdC8qKlxuXHRcdCAqIE51bWJlciBvZiBlbGVtZW50cyBpbiB0aGUgbGlzdC5cblx0XHQgKiBAdHlwZSB7bnVtYmVyfVxuXHRcdCAqIEBwcml2YXRlXG5cdFx0ICovXG5cdFx0cHJvdGVjdGVkIG5FbGVtZW50czogbnVtYmVyO1xuXHRcblx0XHQvKipcblx0XHQgKiBGdW5jdGlvbiB1c2VkIHRvIGNvbnZlcnQga2V5cyB0byBzdHJpbmdzLlxuXHRcdCAqIEB0eXBlIHtmdW5jdGlvbihPYmplY3QpOnN0cmluZ31cblx0XHQgKiBAcHJvdGVjdGVkXG5cdFx0ICovXG5cdFx0cHJvdGVjdGVkIHRvU3RyOiAoa2V5OiBLKSA9PiBzdHJpbmc7XG5cdFxuXHRcblx0XHQvKipcblx0XHQgKiBDcmVhdGVzIGFuIGVtcHR5IGRpY3Rpb25hcnkuXG5cdFx0ICogQGNsYXNzIDxwPkRpY3Rpb25hcmllcyBtYXAga2V5cyB0byB2YWx1ZXM7IGVhY2gga2V5IGNhbiBtYXAgdG8gYXQgbW9zdCBvbmUgdmFsdWUuXG5cdFx0ICogVGhpcyBpbXBsZW1lbnRhdGlvbiBhY2NlcHRzIGFueSBraW5kIG9mIG9iamVjdHMgYXMga2V5cy48L3A+XG5cdFx0ICpcblx0XHQgKiA8cD5JZiB0aGUga2V5cyBhcmUgY3VzdG9tIG9iamVjdHMgYSBmdW5jdGlvbiB3aGljaCBjb252ZXJ0cyBrZXlzIHRvIHVuaXF1ZVxuXHRcdCAqIHN0cmluZ3MgbXVzdCBiZSBwcm92aWRlZC4gRXhhbXBsZTo8L3A+XG5cdFx0ICogPHByZT5cblx0XHQgKiBmdW5jdGlvbiBwZXRUb1N0cmluZyhwZXQpIHtcblx0XHQgKiAgcmV0dXJuIHBldC5uYW1lO1xuXHRcdCAqIH1cblx0XHQgKiA8L3ByZT5cblx0XHQgKiBAY29uc3RydWN0b3Jcblx0XHQgKiBAcGFyYW0ge2Z1bmN0aW9uKE9iamVjdCk6c3RyaW5nPX0gdG9TdHJGdW5jdGlvbiBvcHRpb25hbCBmdW5jdGlvbiB1c2VkXG5cdFx0ICogdG8gY29udmVydCBrZXlzIHRvIHN0cmluZ3MuIElmIHRoZSBrZXlzIGFyZW4ndCBzdHJpbmdzIG9yIGlmIHRvU3RyaW5nKClcblx0XHQgKiBpcyBub3QgYXBwcm9wcmlhdGUsIGEgY3VzdG9tIGZ1bmN0aW9uIHdoaWNoIHJlY2VpdmVzIGEga2V5IGFuZCByZXR1cm5zIGFcblx0XHQgKiB1bmlxdWUgc3RyaW5nIG11c3QgYmUgcHJvdmlkZWQuXG5cdFx0ICovXG5cdFx0Y29uc3RydWN0b3IodG9TdHJGdW5jdGlvbj86IChrZXk6IEspID0+IHN0cmluZykge1xuXHRcdFx0dGhpcy50YWJsZSA9IHt9O1xuXHRcdFx0dGhpcy5uRWxlbWVudHMgPSAwO1xuXHRcdFx0dGhpcy50b1N0ciA9IHRvU3RyRnVuY3Rpb24gfHwgZGVmYXVsdFRvU3RyaW5nO1xuXHRcdH1cblx0XG5cdFxuXHRcdC8qKlxuXHRcdCAqIFJldHVybnMgdGhlIHZhbHVlIHRvIHdoaWNoIHRoaXMgZGljdGlvbmFyeSBtYXBzIHRoZSBzcGVjaWZpZWQga2V5LlxuXHRcdCAqIFJldHVybnMgdW5kZWZpbmVkIGlmIHRoaXMgZGljdGlvbmFyeSBjb250YWlucyBubyBtYXBwaW5nIGZvciB0aGlzIGtleS5cblx0XHQgKiBAcGFyYW0ge09iamVjdH0ga2V5IGtleSB3aG9zZSBhc3NvY2lhdGVkIHZhbHVlIGlzIHRvIGJlIHJldHVybmVkLlxuXHRcdCAqIEByZXR1cm4geyp9IHRoZSB2YWx1ZSB0byB3aGljaCB0aGlzIGRpY3Rpb25hcnkgbWFwcyB0aGUgc3BlY2lmaWVkIGtleSBvclxuXHRcdCAqIHVuZGVmaW5lZCBpZiB0aGUgbWFwIGNvbnRhaW5zIG5vIG1hcHBpbmcgZm9yIHRoaXMga2V5LlxuXHRcdCAqL1xuXHRcdGdldFZhbHVlKGtleTogSyk6IFYgfCB1bmRlZmluZWQge1xuXHRcdFx0Y29uc3QgcGFpcjogSURpY3Rpb25hcnlQYWlyPEssIFY+ID0gdGhpcy50YWJsZVsnJCcgKyB0aGlzLnRvU3RyKGtleSldO1xuXHRcdFx0aWYgKGlzVW5kZWZpbmVkKHBhaXIpKSB7XG5cdFx0XHRcdHJldHVybiB1bmRlZmluZWQ7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gcGFpci52YWx1ZTtcblx0XHR9XG5cdFxuXHRcblx0XHQvKipcblx0XHQgKiBBc3NvY2lhdGVzIHRoZSBzcGVjaWZpZWQgdmFsdWUgd2l0aCB0aGUgc3BlY2lmaWVkIGtleSBpbiB0aGlzIGRpY3Rpb25hcnkuXG5cdFx0ICogSWYgdGhlIGRpY3Rpb25hcnkgcHJldmlvdXNseSBjb250YWluZWQgYSBtYXBwaW5nIGZvciB0aGlzIGtleSwgdGhlIG9sZFxuXHRcdCAqIHZhbHVlIGlzIHJlcGxhY2VkIGJ5IHRoZSBzcGVjaWZpZWQgdmFsdWUuXG5cdFx0ICogQHBhcmFtIHtPYmplY3R9IGtleSBrZXkgd2l0aCB3aGljaCB0aGUgc3BlY2lmaWVkIHZhbHVlIGlzIHRvIGJlXG5cdFx0ICogYXNzb2NpYXRlZC5cblx0XHQgKiBAcGFyYW0ge09iamVjdH0gdmFsdWUgdmFsdWUgdG8gYmUgYXNzb2NpYXRlZCB3aXRoIHRoZSBzcGVjaWZpZWQga2V5LlxuXHRcdCAqIEByZXR1cm4geyp9IHByZXZpb3VzIHZhbHVlIGFzc29jaWF0ZWQgd2l0aCB0aGUgc3BlY2lmaWVkIGtleSwgb3IgdW5kZWZpbmVkIGlmXG5cdFx0ICogdGhlcmUgd2FzIG5vIG1hcHBpbmcgZm9yIHRoZSBrZXkgb3IgaWYgdGhlIGtleS92YWx1ZSBhcmUgdW5kZWZpbmVkLlxuXHRcdCAqL1xuXHRcdHNldFZhbHVlKGtleTogSywgdmFsdWU6IFYpOiBWIHwgdW5kZWZpbmVkIHtcblx0XG5cdFx0XHRpZiAoaXNVbmRlZmluZWQoa2V5KSB8fCBpc1VuZGVmaW5lZCh2YWx1ZSkpIHtcblx0XHRcdFx0cmV0dXJuIHVuZGVmaW5lZDtcblx0XHRcdH1cblx0XG5cdFx0XHRsZXQgcmV0OiBWIHwgdW5kZWZpbmVkO1xuXHRcdFx0Y29uc3QgayA9ICckJyArIHRoaXMudG9TdHIoa2V5KTtcblx0XHRcdGNvbnN0IHByZXZpb3VzRWxlbWVudDogSURpY3Rpb25hcnlQYWlyPEssIFY+ID0gdGhpcy50YWJsZVtrXTtcblx0XHRcdGlmIChpc1VuZGVmaW5lZChwcmV2aW91c0VsZW1lbnQpKSB7XG5cdFx0XHRcdHRoaXMubkVsZW1lbnRzKys7XG5cdFx0XHRcdHJldCA9IHVuZGVmaW5lZDtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldCA9IHByZXZpb3VzRWxlbWVudC52YWx1ZTtcblx0XHRcdH1cblx0XHRcdHRoaXMudGFibGVba10gPSB7XG5cdFx0XHRcdGtleToga2V5LFxuXHRcdFx0XHR2YWx1ZTogdmFsdWVcblx0XHRcdH07XG5cdFx0XHRyZXR1cm4gcmV0O1xuXHRcdH1cblx0XG5cdFx0LyoqXG5cdFx0ICogUmVtb3ZlcyB0aGUgbWFwcGluZyBmb3IgdGhpcyBrZXkgZnJvbSB0aGlzIGRpY3Rpb25hcnkgaWYgaXQgaXMgcHJlc2VudC5cblx0XHQgKiBAcGFyYW0ge09iamVjdH0ga2V5IGtleSB3aG9zZSBtYXBwaW5nIGlzIHRvIGJlIHJlbW92ZWQgZnJvbSB0aGVcblx0XHQgKiBkaWN0aW9uYXJ5LlxuXHRcdCAqIEByZXR1cm4geyp9IHByZXZpb3VzIHZhbHVlIGFzc29jaWF0ZWQgd2l0aCBzcGVjaWZpZWQga2V5LCBvciB1bmRlZmluZWQgaWZcblx0XHQgKiB0aGVyZSB3YXMgbm8gbWFwcGluZyBmb3Iga2V5LlxuXHRcdCAqL1xuXHRcdHJlbW92ZShrZXk6IEspOiBWIHwgdW5kZWZpbmVkIHtcblx0XHRcdGNvbnN0IGsgPSAnJCcgKyB0aGlzLnRvU3RyKGtleSk7XG5cdFx0XHRjb25zdCBwcmV2aW91c0VsZW1lbnQ6IElEaWN0aW9uYXJ5UGFpcjxLLCBWPiA9IHRoaXMudGFibGVba107XG5cdFx0XHRpZiAoIWlzVW5kZWZpbmVkKHByZXZpb3VzRWxlbWVudCkpIHtcblx0XHRcdFx0ZGVsZXRlIHRoaXMudGFibGVba107XG5cdFx0XHRcdHRoaXMubkVsZW1lbnRzLS07XG5cdFx0XHRcdHJldHVybiBwcmV2aW91c0VsZW1lbnQudmFsdWU7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdW5kZWZpbmVkO1xuXHRcdH1cblx0XG5cdFx0LyoqXG5cdFx0ICogUmV0dXJucyBhbiBhcnJheSBjb250YWluaW5nIGFsbCBvZiB0aGUga2V5cyBpbiB0aGlzIGRpY3Rpb25hcnkuXG5cdFx0ICogQHJldHVybiB7QXJyYXl9IGFuIGFycmF5IGNvbnRhaW5pbmcgYWxsIG9mIHRoZSBrZXlzIGluIHRoaXMgZGljdGlvbmFyeS5cblx0XHQgKi9cblx0XHRrZXlzKCk6IEtbXSB7XG5cdFx0XHRjb25zdCBhcnJheTogS1tdID0gW107XG5cdFx0XHRmb3IgKGNvbnN0IG5hbWUgaW4gdGhpcy50YWJsZSkge1xuXHRcdFx0XHRpZiAoaGFzKHRoaXMudGFibGUsIG5hbWUpKSB7XG5cdFx0XHRcdFx0Y29uc3QgcGFpcjogSURpY3Rpb25hcnlQYWlyPEssIFY+ID0gdGhpcy50YWJsZVtuYW1lXTtcblx0XHRcdFx0XHRhcnJheS5wdXNoKHBhaXIua2V5KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGFycmF5O1xuXHRcdH1cblx0XG5cdFx0LyoqXG5cdFx0ICogUmV0dXJucyBhbiBhcnJheSBjb250YWluaW5nIGFsbCBvZiB0aGUgdmFsdWVzIGluIHRoaXMgZGljdGlvbmFyeS5cblx0XHQgKiBAcmV0dXJuIHtBcnJheX0gYW4gYXJyYXkgY29udGFpbmluZyBhbGwgb2YgdGhlIHZhbHVlcyBpbiB0aGlzIGRpY3Rpb25hcnkuXG5cdFx0ICovXG5cdFx0dmFsdWVzKCk6IFZbXSB7XG5cdFx0XHRjb25zdCBhcnJheTogVltdID0gW107XG5cdFx0XHRmb3IgKGNvbnN0IG5hbWUgaW4gdGhpcy50YWJsZSkge1xuXHRcdFx0XHRpZiAoaGFzKHRoaXMudGFibGUsIG5hbWUpKSB7XG5cdFx0XHRcdFx0Y29uc3QgcGFpcjogSURpY3Rpb25hcnlQYWlyPEssIFY+ID0gdGhpcy50YWJsZVtuYW1lXTtcblx0XHRcdFx0XHRhcnJheS5wdXNoKHBhaXIudmFsdWUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gYXJyYXk7XG5cdFx0fVxuXHRcblx0XHQvKipcblx0XHQgKiBFeGVjdXRlcyB0aGUgcHJvdmlkZWQgZnVuY3Rpb24gb25jZSBmb3IgZWFjaCBrZXktdmFsdWUgcGFpclxuXHRcdCAqIHByZXNlbnQgaW4gdGhpcyBkaWN0aW9uYXJ5LlxuXHRcdCAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0LE9iamVjdCk6Kn0gY2FsbGJhY2sgZnVuY3Rpb24gdG8gZXhlY3V0ZSwgaXQgaXNcblx0XHQgKiBpbnZva2VkIHdpdGggdHdvIGFyZ3VtZW50czoga2V5IGFuZCB2YWx1ZS4gVG8gYnJlYWsgdGhlIGl0ZXJhdGlvbiB5b3UgY2FuXG5cdFx0ICogb3B0aW9uYWxseSByZXR1cm4gZmFsc2UuXG5cdFx0ICovXG5cdFx0Zm9yRWFjaChjYWxsYmFjazogKGtleTogSywgdmFsdWU6IFYpID0+IGFueSk6IHZvaWQge1xuXHRcdFx0Zm9yIChjb25zdCBuYW1lIGluIHRoaXMudGFibGUpIHtcblx0XHRcdFx0aWYgKGhhcyh0aGlzLnRhYmxlLCBuYW1lKSkge1xuXHRcdFx0XHRcdGNvbnN0IHBhaXI6IElEaWN0aW9uYXJ5UGFpcjxLLCBWPiA9IHRoaXMudGFibGVbbmFtZV07XG5cdFx0XHRcdFx0Y29uc3QgcmV0ID0gY2FsbGJhY2socGFpci5rZXksIHBhaXIudmFsdWUpO1xuXHRcdFx0XHRcdGlmIChyZXQgPT09IGZhbHNlKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcblx0XHQvKipcblx0XHQgKiBSZXR1cm5zIHRydWUgaWYgdGhpcyBkaWN0aW9uYXJ5IGNvbnRhaW5zIGEgbWFwcGluZyBmb3IgdGhlIHNwZWNpZmllZCBrZXkuXG5cdFx0ICogQHBhcmFtIHtPYmplY3R9IGtleSBrZXkgd2hvc2UgcHJlc2VuY2UgaW4gdGhpcyBkaWN0aW9uYXJ5IGlzIHRvIGJlXG5cdFx0ICogdGVzdGVkLlxuXHRcdCAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGhpcyBkaWN0aW9uYXJ5IGNvbnRhaW5zIGEgbWFwcGluZyBmb3IgdGhlXG5cdFx0ICogc3BlY2lmaWVkIGtleS5cblx0XHQgKi9cblx0XHRjb250YWluc0tleShrZXk6IEspOiBib29sZWFuIHtcblx0XHRcdHJldHVybiAhaXNVbmRlZmluZWQodGhpcy5nZXRWYWx1ZShrZXkpKTtcblx0XHR9XG5cdFxuXHRcdC8qKlxuXHRcdCAqIFJlbW92ZXMgYWxsIG1hcHBpbmdzIGZyb20gdGhpcyBkaWN0aW9uYXJ5LlxuXHRcdCAqIEB0aGlzIHtjb2xsZWN0aW9ucy5EaWN0aW9uYXJ5fVxuXHRcdCAqL1xuXHRcdGNsZWFyKCkge1xuXHRcdFx0dGhpcy50YWJsZSA9IHt9O1xuXHRcdFx0dGhpcy5uRWxlbWVudHMgPSAwO1xuXHRcdH1cblx0XG5cdFx0LyoqXG5cdFx0ICogUmV0dXJucyB0aGUgbnVtYmVyIG9mIGtleXMgaW4gdGhpcyBkaWN0aW9uYXJ5LlxuXHRcdCAqIEByZXR1cm4ge251bWJlcn0gdGhlIG51bWJlciBvZiBrZXktdmFsdWUgbWFwcGluZ3MgaW4gdGhpcyBkaWN0aW9uYXJ5LlxuXHRcdCAqL1xuXHRcdHNpemUoKTogbnVtYmVyIHtcblx0XHRcdHJldHVybiB0aGlzLm5FbGVtZW50cztcblx0XHR9XG5cdFxuXHRcdC8qKlxuXHRcdCAqIFJldHVybnMgdHJ1ZSBpZiB0aGlzIGRpY3Rpb25hcnkgY29udGFpbnMgbm8gbWFwcGluZ3MuXG5cdFx0ICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGlzIGRpY3Rpb25hcnkgY29udGFpbnMgbm8gbWFwcGluZ3MuXG5cdFx0ICovXG5cdFx0aXNFbXB0eSgpOiBib29sZWFuIHtcblx0XHRcdHJldHVybiB0aGlzLm5FbGVtZW50cyA8PSAwO1xuXHRcdH1cblx0XG5cdFx0dG9TdHJpbmcoKTogc3RyaW5nIHtcblx0XHRcdGxldCB0b3JldCA9ICd7Jztcblx0XHRcdHRoaXMuZm9yRWFjaCgoaywgdikgPT4ge1xuXHRcdFx0XHR0b3JldCArPSBcIlxcblxcdFwiICsgay50b1N0cmluZygpICsgXCIgOiBcIiArIHYudG9TdHJpbmcoKTtcblx0XHRcdH0pO1xuXHRcdFx0cmV0dXJuIHRvcmV0ICsgJ1xcbn0nO1xuXHRcdH1cblx0fSAvLyBFbmQgb2YgZGljdGlvbmFyeVxuXG5cdGZ1bmN0aW9uIGRlZmF1bHRUb1N0cmluZyhpdGVtOiBhbnkpOiBzdHJpbmcge1xuXHRcdGlmIChpdGVtID09PSBudWxsKSB7XG5cdFx0XHRyZXR1cm4gJ0NPTExFQ1RJT05fTlVMTCc7XG5cdFx0fSBlbHNlIGlmIChpc1VuZGVmaW5lZChpdGVtKSkge1xuXHRcdFx0cmV0dXJuICdDT0xMRUNUSU9OX1VOREVGSU5FRCc7XG5cdFx0fSBlbHNlIGlmIChpc1N0cmluZyhpdGVtKSkge1xuXHRcdFx0cmV0dXJuICckcycgKyBpdGVtO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gJyRvJyArIGl0ZW0udG9TdHJpbmcoKTtcblx0XHR9XG5cdH1cblxuXHRjb25zdCBfaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXHRjb25zdCBoYXMgPSBmdW5jdGlvbihvYmo6IGFueSwgcHJvcDogYW55KSB7XG5cdFx0cmV0dXJuIF9oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7XG5cdH07XG5cblx0ZnVuY3Rpb24gaXNVbmRlZmluZWQob2JqOiBhbnkpOiBvYmogaXMgdW5kZWZpbmVkIHtcblx0XHRyZXR1cm4gKHR5cGVvZiBvYmopID09PSAndW5kZWZpbmVkJztcblx0fVxuXG5cdGZ1bmN0aW9uIGlzU3RyaW5nKG9iajogYW55KTogYm9vbGVhbiB7XG5cdFx0cmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBTdHJpbmddJztcblx0fVxuXG5cdC8vUG9seWZpbGxcbiAgICBpZiAodHlwZW9mIE9iamVjdC5hc3NpZ24gIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgLy8gTXVzdCBiZSB3cml0YWJsZTogdHJ1ZSwgZW51bWVyYWJsZTogZmFsc2UsIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShPYmplY3QsIFwiYXNzaWduXCIsIHtcblx0XHRcdHZhbHVlOiBmdW5jdGlvbiBhc3NpZ24odGFyZ2V0LCB2YXJBcmdzKSB7IC8vIC5sZW5ndGggb2YgZnVuY3Rpb24gaXMgMlxuICAgICAgICAgICAgXHQndXNlIHN0cmljdCc7XG4gICAgICAgICAgICBcdGlmICh0YXJnZXQgPT09IG51bGwgfHwgdGFyZ2V0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjb252ZXJ0IHVuZGVmaW5lZCBvciBudWxsIHRvIG9iamVjdCcpO1xuICAgICAgICAgICAgXHR9XG4gICAgICBcbiAgICAgICAgICAgIFx0dmFyIHRvID0gT2JqZWN0KHRhcmdldCk7XG4gICAgICBcbiAgICAgICAgICAgIFx0Zm9yICh2YXIgaW5kZXggPSAxOyBpbmRleCA8IGFyZ3VtZW50cy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgICAgICAgXHRcdHZhciBuZXh0U291cmNlID0gYXJndW1lbnRzW2luZGV4XTtcbiAgICAgIFxuICAgICAgICAgICAgICBcdFx0aWYgKG5leHRTb3VyY2UgIT09IG51bGwgJiYgbmV4dFNvdXJjZSAhPT0gdW5kZWZpbmVkKSB7IFxuICAgICAgICAgICAgICAgIFx0XHRmb3IgKHZhciBuZXh0S2V5IGluIG5leHRTb3VyY2UpIHtcbiAgICAgICAgICAgICAgICAgIFx0XHRcdC8vIEF2b2lkIGJ1Z3Mgd2hlbiBoYXNPd25Qcm9wZXJ0eSBpcyBzaGFkb3dlZFxuICAgICAgICAgICAgICAgICAgXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChuZXh0U291cmNlLCBuZXh0S2V5KSkge1xuICAgICAgICAgICAgICAgICAgICBcdFx0XHR0b1tuZXh0S2V5XSA9IG5leHRTb3VyY2VbbmV4dEtleV07XG4gICAgICAgICAgICAgICAgICBcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG4gICAgICAgICAgICAgIFx0XHR9XG4gICAgICAgICAgICBcdH1cbiAgICAgICAgICAgIFx0cmV0dXJuIHRvO1xuXHRcdFx0fSxcblx0XHRcdHdyaXRhYmxlOiB0cnVlLFxuXHRcdFx0Y29uZmlndXJhYmxlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsIlxyXG5pbXBvcnQgeyBKc01hbmFnZXIgLEdhbWVMYXVuY2ggfSBmcm9tICdjc2hhcnAnO1xyXG5pbXBvcnQgeyBTY2VuZURlZiB9IGZyb20gJy4uL2ZyYW1ld29yay9zY2VuZS9TY2VuZURlZic7XHJcbmltcG9ydCB7IFMgfSBmcm9tICcuLi9nbG9iYWwvR2FtZUNvbmZpZyc7XHJcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gJy4uL2ZyYW1ld29yay9sb2dnZXIvTG9nZ2VyJztcclxuaW1wb3J0IHsgTG9hZFRhYmxlIH0gZnJvbSAnLi4vZnJhbWV3b3JrL3RhYmxlL3RhYmxlJztcclxuaW1wb3J0IHsgdGFiIH0gZnJvbSAnLi4vZnJhbWV3b3JrL3RhYmxlL3RhYmxlX2dlbic7XHJcblxyXG5jbGFzcyBHYW1lTWFpbntcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBKc01hbmFnZXIuSW5zdGFuY2UuSnNPbkFwcGxpY2F0aW9uUXVpdCA9ICgpID0+IHRoaXMub25BcHBsaWNhdGlvblF1aXQoKTtcclxuICAgICAgICBKc01hbmFnZXIuSW5zdGFuY2UuSnNPbkRpc3Bvc2UgPSAoKSA9PiB0aGlzLm9uRGlzcG9zZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhc3luYyBzdGFydCgpIHtcclxuICAgICAgICBcclxuICAgICAgICB0cnl7XHJcbiAgICAgICAgICAgIExvZ2dlci5sb2coXCJHYW1lIHN0YXJ0IGluIEpTLi4uLlwiKTtcclxuXHJcbiAgICAgICAgICAgIC8v5Yqg6L295pWw5o2u6KGoXHJcbiAgICAgICAgICAgIGF3YWl0IExvYWRUYWJsZSgpO1xyXG5cclxuICAgICAgICAgICAgLy8gLy/ov5vlhaXnmbvlvZXmqKHlnZdcclxuICAgICAgICAgICAgLy8gYXdhaXQgUy5TY2VuZU1hbmFnZXIubG9hZFNjZW5lKFNjZW5lRGVmLkxvZ2luU2NlbmUpO1xyXG4gICAgICAgICAgICBhd2FpdCBTLlNjZW5lTWFuYWdlci5sb2FkU2NlbmUoU2NlbmVEZWYuQmF0dGxlU2NlbmUpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy9KU+WQr+WKqOWujOaIkO+8jOmAmuefpUMj5bGCXHJcbiAgICAgICAgICAgIEdhbWVMYXVuY2guSW5zdGFuY2UuSnNMdWFuY2hGaW5pc2goKTtcclxuICAgICAgICB9Y2F0Y2goZXgpe1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoZXgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25BcHBsaWNhdGlvblF1aXQoKTp2b2lkIHtcclxuICAgICAgICBTLkdhbWVPYmplY3RQb29sLmNsZWFudXAodHJ1ZSk7XHJcbiAgICAgICAgTG9nZ2VyLmxvZyhcIkdhbWUgb25BcHBsaWNhdGlvblF1aXQgaW4gSlMuLi4uXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbkRpc3Bvc2UoKTp2b2lkIHtcclxuICAgICAgICBcclxuICAgICAgICBMb2dnZXIubG9nKFwiR2FtZSBvbkRpc3Bvc2UgaW4gSlMuLi4uXCIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5uZXcgR2FtZU1haW4oKS5zdGFydCgpO1xyXG5cclxuIiwiaW1wb3J0IHsgVW5pdHlFbmdpbmUgfSBmcm9tIFwiY3NoYXJwXCI7XHJcbmltcG9ydCB7ICR0eXBlb2YgfSBmcm9tIFwicHVlcnRzXCI7XHJcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvbG9nZ2VyL0xvZ2dlclwiO1xyXG5pbXBvcnQgeyBCYXNlU2NlbmUgfSBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL3NjZW5lL0Jhc2VTY2VuZVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmF0dGxlU2NlbmUgZXh0ZW5kcyBCYXNlU2NlbmUge1xyXG5cclxuICAgIHB1YmxpYyBvbkVudGVyKCkge1xyXG4gICAgICAgIExvZ2dlci5sb2coXCJCYXR0bGVTY2VuZSBvbkVudGVyIH5cIik7XHJcbiAgICAgICAgbGV0IG9iakNXID0gVW5pdHlFbmdpbmUuR2FtZU9iamVjdC5GaW5kKFwiVGVhbTEvQ3ViZVdoaXRlXCIpO1xyXG4gICAgICAgIGxldCBvYmpDQiA9IFVuaXR5RW5naW5lLkdhbWVPYmplY3QuRmluZChcIlRlYW0yL0N1YmVCbHVlXCIpO1xyXG4gICAgICAgIGlmKG9iakNXICYmIG9iakNCKSB7XHJcbiAgICAgICAgICAgIGxldCBhZ2VudENXID0gb2JqQ1cuR2V0Q29tcG9uZW50KCR0eXBlb2YoVW5pdHlFbmdpbmUuQUkuTmF2TWVzaEFnZW50KSkgYXMgVW5pdHlFbmdpbmUuQUkuTmF2TWVzaEFnZW50O1xyXG4gICAgICAgICAgICBpZighYWdlbnRDVy5Jc051bGwoKSkge1xyXG4gICAgICAgICAgICAgICAgLy8gYWdlbnQuU2V0RGVzdGluYXRpb24ob2JqQ0IudHJhbnNmb3JtLnBvc2l0aW9uKTtcclxuICAgICAgICAgICAgICAgIGFnZW50Q1cuU2V0RGVzdGluYXRpb24obmV3IFVuaXR5RW5naW5lLlZlY3RvcjMoMCwwLC0yKSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBhZ2VudENCID0gb2JqQ0IuR2V0Q29tcG9uZW50KCR0eXBlb2YoVW5pdHlFbmdpbmUuQUkuTmF2TWVzaEFnZW50KSkgYXMgVW5pdHlFbmdpbmUuQUkuTmF2TWVzaEFnZW50O1xyXG4gICAgICAgICAgICBpZighYWdlbnRDQi5Jc051bGwoKSkge1xyXG4gICAgICAgICAgICAgICAgLy8gYWdlbnQuU2V0RGVzdGluYXRpb24ob2JqQ0IudHJhbnNmb3JtLnBvc2l0aW9uKTtcclxuICAgICAgICAgICAgICAgIGFnZW50Q0IuU2V0RGVzdGluYXRpb24obmV3IFVuaXR5RW5naW5lLlZlY3RvcjMoMCwwLDIpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBvbkNvbXBsZXRlKCk6UHJvbWlzZTxhbnk+IHtcclxuICAgICAgICBMb2dnZXIubG9nKFwiQmF0dGxlU2NlbmUgb25Db21wbGV0ZSB+XCIpO1xyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKVxyXG4gICAgfVxyXG4gICAgcHVibGljIG9uTGVhdmUoKSB7XHJcbiAgICAgICAgTG9nZ2VyLmxvZyhcIkJhdHRsZVNjZW5lIG9uTGVhdmUgflwiKTtcclxuICAgIH1cclxuXHJcbn0iLCJpbXBvcnQgeyBHYW1lT2JqZWN0UG9vbCB9IGZyb20gXCIuLi9mcmFtZXdvcmsvY29tbW9uL0dhbWVPYmplY3RQb29sXCI7XHJcbmltcG9ydCB7IFJlc01hbmFnZXIgfSBmcm9tIFwiLi4vZnJhbWV3b3JrL2NvbW1vbi9SZXNNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFNjZW5lTWFuYWdlciB9IGZyb20gXCIuLi9mcmFtZXdvcmsvc2NlbmUvU2NlbmVNYW5hZ2VyXCI7XHJcblxyXG5leHBvcnQgIGNsYXNzIEdhbWVDb25maWd7XHJcbiAgICBwdWJsaWMgc3RhdGljIGRlYnVnOmJvb2xlYW4gPSB0cnVlO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU3tcclxuICAgIHB1YmxpYyBzdGF0aWMgU2NlbmVNYW5hZ2VyID0gU2NlbmVNYW5hZ2VyLkluc3RhbmNlKFNjZW5lTWFuYWdlcik7XHJcbiAgICBwdWJsaWMgc3RhdGljIEdhbWVPYmplY3RQb29sID0gR2FtZU9iamVjdFBvb2wuSW5zdGFuY2UoR2FtZU9iamVjdFBvb2wpO1xyXG4gICAgcHVibGljIHN0YXRpYyBSZXNNYW5hZ2VyID0gUmVzTWFuYWdlci5JbnN0YW5jZShSZXNNYW5hZ2VyKTtcclxufVxyXG4iLCJyZXF1aXJlKFwiLi9nYW1lL0dhbWVNYWluXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNzaGFycFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwdWVydHNcIik7Il0sInNvdXJjZVJvb3QiOiIifQ==