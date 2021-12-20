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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
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
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return GameMain; });
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

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _game_GameMain__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game/GameMain */ "./src/game/GameMain.ts");

new _game_GameMain__WEBPACK_IMPORTED_MODULE_0__["default"]().start();


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZyYW1ld29yay9jb21tb24vR2FtZU9iamVjdFBvb2wudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZyYW1ld29yay9jb21tb24vUmVzTWFuYWdlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZnJhbWV3b3JrL2NvbW1vbi9TaW5nbGV0b24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZyYW1ld29yay9sb2dnZXIvTG9nZ2VyLnRzIiwid2VicGFjazovLy8uL3NyYy9mcmFtZXdvcmsvc2NlbmUvQmFzZVNjZW5lLnRzIiwid2VicGFjazovLy8uL3NyYy9mcmFtZXdvcmsvc2NlbmUvU2NlbmVEZWYudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZyYW1ld29yay9zY2VuZS9TY2VuZUZhY3RvcnkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZyYW1ld29yay9zY2VuZS9TY2VuZU1hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZyYW1ld29yay90YWJsZS90YWJsZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZnJhbWV3b3JrL3RhYmxlL3RhYmxlX2dlbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZ2FtZS9HYW1lTWFpbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZ2FtZS9tb2R1bGUvcHZwL0JhdHRsZVNjZW5lLnRzIiwid2VicGFjazovLy8uL3NyYy9nbG9iYWwvR2FtZUNvbmZpZy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiY3NoYXJwXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicHVlcnRzXCIiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7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QUMsR0FBRyxDQUFDLDBCQUEwQixDQUFDLENBQUM7UUFDdkMsT0FBTyxPQUFPLENBQUMsT0FBTyxFQUFFO0lBQzVCLENBQUM7SUFDTSxPQUFPO1FBQ1YsK0RBQU0sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsQ0FBQztJQUN4QyxDQUFDO0NBRUo7Ozs7Ozs7Ozs7Ozs7QUNqQ0Q7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQW9FO0FBQ1I7QUFDRztBQUV4RCxNQUFPLFVBQVU7O0FBQ04sZ0JBQUssR0FBVyxJQUFJLENBQUM7QUFHaEMsTUFBTSxDQUFDOztBQUNJLGNBQVksR0FBRywwRUFBWSxDQUFDLFFBQVEsQ0FBQywwRUFBWSxDQUFDLENBQUM7QUFDbkQsZ0JBQWMsR0FBRywrRUFBYyxDQUFDLFFBQVEsQ0FBQywrRUFBYyxDQUFDLENBQUM7QUFDekQsWUFBVSxHQUFHLHVFQUFVLENBQUMsUUFBUSxDQUFDLHVFQUFVLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7OztBQ1gvRDtBQUFBO0FBQXVDO0FBRXZDLElBQUksc0RBQVEsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7QUNGdkIsbUM7Ozs7Ozs7Ozs7O0FDQUEsbUMiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXgudHNcIik7XG4iLCJcbmltcG9ydCB7IFNpbmdsZXRvbiB9IGZyb20gJy4vU2luZ2xldG9uJztcbmltcG9ydCB7IFJlc01hbmFnZXIgfSBmcm9tICcuL1Jlc01hbmFnZXInO1xuaW1wb3J0IHsgVW5pdHlFbmdpbmUgfSBmcm9tICdjc2hhcnAnO1xuXG5cblxuLy8gLS0gR2FtZU9iamVjdOe8k+WtmOaxoFxuLy8gLS0g5rOo5oSP77yaXG4vLyAtLSAx44CB5omA5pyJ6ZyA6KaB6aKE6K6+6YO95LuO6L+Z6YeM5Yqg6L2977yM5LiN6KaB55u05o6l5YiwUmVzb3VyY2VzTWFuYWdlcuWOu+WKoOi9ve+8jOeUsei/memHjOe7n+S4gOWBmue8k+WtmOeuoeeQhlxuLy8gLS0gMuOAgee8k+WtmOWIhuS4uuS4pOmDqOWIhu+8muS7jui1hOa6kOWxguWKoOi9veeahOWOn+Wni0dhbWVPYmplY3QoQXNzZXQp77yM5LuOR2FtZU9iamVjdOWunuS+i+WMluWHuuadpeeahOWkmuS4qkluc3RcbmV4cG9ydCBjbGFzcyBHYW1lT2JqZWN0UG9vbCBleHRlbmRzIFNpbmdsZXRvbjxHYW1lT2JqZWN0UG9vbD57XG5cbiAgICBwcml2YXRlIF9fY2FjaGVUcmFuc1Jvb3QgPSBudWxsO1xuICAgIHByaXZhdGUgX19nb1Bvb2wgPSBuZXcgTWFwKCk7XG4gICAgcHJpdmF0ZSBfX2luc3RDYWNoZTpNYXA8c3RyaW5nLEFycmF5PGFueT4+ID0gbmV3IE1hcDxzdHJpbmcsQXJyYXk8YW55Pj4oKTtcblxuXG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICBsZXQgZ28gPSBVbml0eUVuZ2luZS5HYW1lT2JqZWN0LkZpbmQoXCJHYW1lT2JqZWN0Q2FjaGVSb290XCIpO1xuXG4gICAgICAgIGlmKGdvID09IHVuZGVmaW5lZCl7XG4gICAgICAgICAgICBnbyA9IG5ldyBVbml0eUVuZ2luZS5HYW1lT2JqZWN0KFwiR2FtZU9iamVjdENhY2hlUm9vdFwiKTtcbiAgICAgICAgICAgIFVuaXR5RW5naW5lLk9iamVjdC5Eb250RGVzdHJveU9uTG9hZChnbyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9fY2FjaGVUcmFuc1Jvb3QgPSBnby50cmFuc2Zvcm07XG4gICAgfVxuXG4gICAgLy8tLSDmo4DmtYvmmK/lkKblt7Lnu4/ooqvnvJPlrZhcbiAgICBwdWJsaWMgY2hlY2tIYXNDYWNoZWQocGF0aDpzdHJpbmcpe1xuXG4gICAgICAgIGxldCBjYWNoZWRJbnN0OkFycmF5PGFueT4gPSB0aGlzLl9faW5zdENhY2hlLmdldChwYXRoKTtcbiAgICAgICAgaWYoY2FjaGVkSW5zdCAhPSB1bmRlZmluZWQgJiYgY2FjaGVkSW5zdC5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHBvb2xlZEdvID0gdGhpcy5fX2dvUG9vbC5nZXQocGF0aCk7XG4gICAgICAgIHJldHVybiBwb29sZWRHbyAhPSB1bmRlZmluZWQ7XG4gICAgfVxuXG5cbiAgICAvLy0tIOe8k+WtmOW5tuWunuS+i+WMlkdhbWVPYmplY3RcbiAgICBwdWJsaWMgY2FjaGVBbmRJbnN0R2FtZU9iamVjdChwYXRoOnN0cmluZywgZ286YW55LCBpbnN0X2NvdW50Om51bWJlciA9IDEpe1xuXG4gICAgICAgIHRoaXMuX19nb1Bvb2wuc2V0KHBhdGgsIGdvKTtcbiAgICAgICAgaWYoaW5zdF9jb3VudCA+IDApe1xuXG4gICAgICAgICAgICBsZXQgY2FjaGVkSW5zdDpBcnJheTxhbnk+ID0gdGhpcy5fX2luc3RDYWNoZS5nZXQocGF0aCk7XG4gICAgICAgICAgICBmb3IobGV0IGk6bnVtYmVyID0wOyBpIDwgaW5zdF9jb3VudDsgaSsrKXtcblxuICAgICAgICAgICAgICAgIGxldCBpbnN0ID0gVW5pdHlFbmdpbmUuR2FtZU9iamVjdC5JbnN0YW50aWF0ZShnbykgYXMgVW5pdHlFbmdpbmUuR2FtZU9iamVjdDtcbiAgICAgICAgICAgICAgICBpbnN0LnRyYW5zZm9ybS5TZXRQYXJlbnQodGhpcy5fX2NhY2hlVHJhbnNSb290KTtcbiAgICAgICAgICAgICAgICBpbnN0LlNldEFjdGl2ZShmYWxzZSk7XG5cbiAgICAgICAgICAgICAgICBjYWNoZWRJbnN0LnB1c2goaW5zdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLy0tIOWwneivleS7jue8k+WtmOS4reiOt+WPllxuICAgIHB1YmxpYyB0cnlHZXRGcm9tQ2FjaGUocGF0aDpzdHJpbmcpOmFueXtcblxuICAgICAgICBpZighdGhpcy5jaGVja0hhc0NhY2hlZChwYXRoKSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgY2FjaGVkSW5zdDpBcnJheTxvYmplY3Q+ICA9IHRoaXMuX19pbnN0Q2FjaGUuZ2V0KHBhdGgpO1xuICAgICAgICBpZihjYWNoZWRJbnN0ICE9IHVuZGVmaW5lZCAmJiBjYWNoZWRJbnN0Lmxlbmd0aD4wKXtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgbGV0IGluc3QgPSBjYWNoZWRJbnN0LnBvcCgpO1xuICAgICAgICAgICAgcmV0dXJuIGluc3Q7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcG9vbGVkR28gPSB0aGlzLl9fZ29Qb29sLmdldChwYXRoKTtcbiAgICAgICAgaWYocG9vbGVkR28gIT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICAgIGxldCBpbnN0ID0gVW5pdHlFbmdpbmUuR2FtZU9iamVjdC5JbnN0YW50aWF0ZShwb29sZWRHbyk7XG4gICAgICAgICAgICByZXR1cm4gaW5zdDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cblxuICAgIC8v6aKE5Yqg6L2977ya5Y+v5o+Q5L6b5Yid5aeL5a6e5L6L5YyW5Liq5pWwXG4gICAgcHVibGljIGFzeW5jIHByZUxvYWRHYW1lT2JqZWN0QXN5bmMocGF0aDpzdHJpbmcsIGluc3RfY291bnQ6bnVtYmVyLCBjYWxsYmFjazpGdW5jdGlvbiwuLi5wYXJhbXMpe1xuXG4gICAgICAgIGlmKHRoaXMuY2hlY2tIYXNDYWNoZWQocGF0aCkpe1xuICAgICAgICAgICAgaWYoY2FsbGJhY2shPW51bGwpe1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHBhcmFtcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZ28gPSBhd2FpdCBSZXNNYW5hZ2VyLkluc3RhbmNlKFJlc01hbmFnZXIpLmxvYWRQcmVmYWIocGF0aCk7XG4gICAgICAgIGlmKGdvIT11bmRlZmluZWQpe1xuICAgICAgICAgICAgdGhpcy5jYWNoZUFuZEluc3RHYW1lT2JqZWN0KHBhdGgsIGdvLGluc3RfY291bnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoY2FsbGJhY2shPW51bGwpe1xuICAgICAgICAgICAgY2FsbGJhY2socGFyYW1zKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLy8tLSDlvILmraXojrflj5bvvJrlv4XopoHml7bliqDovb1cbiAgICBwdWJsaWMgYXN5bmMgZ2V0R2FtZU9iamVjdEFzeW5jKHBhdGg6c3RyaW5nLCBjYWxsYmFjazpGdW5jdGlvbiwuLi5wYXJhbXMpe1xuXG4gICAgICAgIGxldCBpbnN0OmFueSA9IHRoaXMudHJ5R2V0RnJvbUNhY2hlKHBhdGgpO1xuICAgICAgICBpZihpbnN0ID09bnVsbCl7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnByZUxvYWRHYW1lT2JqZWN0QXN5bmMocGF0aCwgMSwgY2FsbGJhY2ssIHBhcmFtcyk7XG4gICAgICAgIH1cblxuICAgICAgICBpbnN0ID0gdGhpcy50cnlHZXRGcm9tQ2FjaGUocGF0aCk7XG4gICAgICAgIGluc3QuU2V0QWN0aXZlKHRydWUpO1xuXG4gICAgICAgIFxuICAgIH1cblxuXG4gICAgLy8tLSDlm57mlLZcbiAgICBwdWJsaWMgcmVjeWNsZUdhbWVPYmplY3QocGF0aDpzdHJpbmcsIGluc3Q6YW55KXtcblxuICAgICAgICBpbnN0LnRyYW5zZm9ybS5TZXRQYXJlbnQodGhpcy5fX2NhY2hlVHJhbnNSb290KTtcbiAgICAgICAgaW5zdC5TZXRBY3RpdmUoZmFsc2UpO1xuXG4gICAgICAgIGxldCBjYWNoZWRJbnN0ID0gdGhpcy5fX2luc3RDYWNoZS5nZXQocGF0aCkgfHwgbmV3IEFycmF5KCk7XG4gICAgICAgIGNhY2hlZEluc3QucHVzaChpbnN0KTtcblxuICAgICAgICB0aGlzLl9faW5zdENhY2hlLnNldChwYXRoLCBjYWNoZWRJbnN0KTtcblxuICAgIH1cblxuXG4gICAgLy8tLSDmuIXnkIbnvJPlrZhcbiAgICBwdWJsaWMgY2xlYW51cChpbmNsdWRlUG9vbGVkR286Ym9vbGVhbiA9IGZhbHNlKXtcblxuICAgICAgICB0aGlzLl9faW5zdENhY2hlLmZvckVhY2goKHZhbHVlcywga2V5KT0+e1xuXG4gICAgICAgICAgICBmb3IobGV0IGluc3Qgb2YgdmFsdWVzKXtcbiAgICAgICAgICAgICAgICBpZihpbnN0ICE9IG51bGwpe1xuICAgICAgICAgICAgICAgICAgICBVbml0eUVuZ2luZS5HYW1lT2JqZWN0LkRlc3Ryb3koaW5zdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5fX2luc3RDYWNoZS5jbGVhcigpOyBcblxuICAgICAgICBpZihpbmNsdWRlUG9vbGVkR28pe1xuICAgICAgICAgICAgdGhpcy5fX2dvUG9vbC5mb3JFYWNoKChnbywga2V5KT0+e1xuXG4gICAgICAgICAgICAgICAgaWYoZ28gIT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgICAgIFJlc01hbmFnZXIuSW5zdGFuY2UoUmVzTWFuYWdlcikucmVsZWFzZUFkZHJlc3NHTyhnbyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMuX19nb1Bvb2wuY2xlYXIoKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG5cbn0iLCJcbmltcG9ydCB7IFNpbmdsZXRvbiB9IGZyb20gJy4vU2luZ2xldG9uJztcbmltcG9ydCB7ICRwcm9taXNlIH0gZnJvbSAncHVlcnRzJztcbmltcG9ydCB7TmljZVRTLCBVbml0eUVuZ2luZX0gZnJvbSAnY3NoYXJwJztcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gJy4uL2xvZ2dlci9Mb2dnZXInO1xuXG5leHBvcnQgY2xhc3MgUmVzTWFuYWdlciBleHRlbmRzIFNpbmdsZXRvbjxSZXNNYW5hZ2VyPntcblxuICAgIHByaXZhdGUgX3BrZ01hcDpNYXA8c3RyaW5nLG51bWJlcj4gPSBuZXcgTWFwPHN0cmluZyxudW1iZXI+KCk7XG5cbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cbiAgICBcbiAgICBhc3luYyBsb2FkU2NlbmUoc2NlbmVOYW1lOnN0cmluZywgbW9kZSA9IFVuaXR5RW5naW5lLlNjZW5lTWFuYWdlbWVudC5Mb2FkU2NlbmVNb2RlLlNpbmdsZSl7XG4gICAgICAgIHRyeXtcbiAgICAgICAgICBcbiAgICAgICAgICAgIGxldCB0YXNrID0gTmljZVRTLlJlc291cmNlTWFuYWdlci5Mb2FkU2NlbmUoc2NlbmVOYW1lLCBtb2RlLChwcm9ncmVzczpOdW1iZXIpPT57XG4gICAgICAgICAgICAgICAgTG9nZ2VyLmxvZyhcImxvYWQgc2NlbmU6IFwiK3Byb2dyZXNzKVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGxldCBzY2VuSW5zdGFuY2UgPSBhd2FpdCAkcHJvbWlzZSh0YXNrKVxuICAgICAgICAgICAgcmV0dXJuIHNjZW5JbnN0YW5jZVxuXG4gICAgICAgIH1jYXRjaChleCl7XG5cbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihgTG9hZCBTY2VuZSA6JHtzY2VuZU5hbWV9IDogJHtleH1gKVxuXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgYXN5bmMgdW5sb2FkU2NlbmUoc2NlbmVJbnN0YW5jZTpVbml0eUVuZ2luZS5SZXNvdXJjZU1hbmFnZW1lbnQuUmVzb3VyY2VQcm92aWRlcnMuU2NlbmVJbnN0YW5jZSl7XG4gICAgICAgIHRyeXtcbiAgICAgICAgICAgIGxldCB0YXNrPSBOaWNlVFMuUmVzb3VyY2VNYW5hZ2VyLlVubG9hZFNjZW5lKHNjZW5lSW5zdGFuY2UpXG4gICAgICAgICAgICBsZXQgZ28gPSBhd2FpdCAkcHJvbWlzZSh0YXNrKTtcbiAgICAgICAgICAgIHJldHVybiBnbztcbiAgICAgICAgfWNhdGNoKGV4KXtcblxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKGBVbmxvYWQgc2NlbmUgIDogJHtleH1gKVxuXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyB1bmxvYWRTY2VuZUJ5TmFtZShzY2VuZU5hbWU6c3RyaW5nKXtcblxuICAgICAgICBOaWNlVFMuUmVzb3VyY2VNYW5hZ2VyLlVubG9hZFNjZW5lQnlOYW1lKHNjZW5lTmFtZSk7XG4gICAgfVxuXG4gICAgYXN5bmMgbG9hZFByZWZhYihhZGRyZXNzOnN0cmluZyl7XG5cbiAgICAgICAgdHJ5e1xuICAgICAgICAgICAgbGV0IHRhc2s9IE5pY2VUUy5SZXNvdXJjZU1hbmFnZXIuTG9hZFByZWZhYihhZGRyZXNzKTtcbiAgICAgICAgICAgIGxldCBnbyA9IGF3YWl0ICRwcm9taXNlKHRhc2spO1xuICAgICAgICAgICAgcmV0dXJuIGdvO1xuICAgICAgICB9Y2F0Y2goZXgpe1xuXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoYExvYWQgcHJlZmFiIDoke2FkZHJlc3N9IDogJHtleH1gKVxuXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgYXN5bmMgbG9hZFRleHRBc3NldChhZGRyZXNzOnN0cmluZyl7XG5cbiAgICAgICAgdHJ5e1xuICAgICAgICAgICAgbGV0IHRhc2sgPSBOaWNlVFMuUmVzb3VyY2VNYW5hZ2VyLkxvYWRUZXh0QXNzZXQoYWRkcmVzcyk7XG4gICAgICAgICAgICBsZXQgZ28gPSBhd2FpdCAkcHJvbWlzZSh0YXNrKTtcbiAgICAgICAgICAgIHJldHVybiBnbztcbiAgICAgICAgfWNhdGNoKGV4KXtcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihgTG9hZCB0ZXh0YXNzZXQgOiR7YWRkcmVzc30gOiAke2V4fWApXG5cbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBhc3luYyBsb2FkVGV4dEJ5dGVzKGFkZHJlc3M6c3RyaW5nKXtcblxuICAgICAgICB0cnl7XG4gICAgICAgICAgICBsZXQgdGFzayA9IE5pY2VUUy5SZXNvdXJjZU1hbmFnZXIuTG9hZFRleHRCeXRlcyhhZGRyZXNzKTtcbiAgICAgICAgICAgIGxldCBieXRlcyA9IGF3YWl0ICRwcm9taXNlKHRhc2spO1xuICAgICAgICAgICAgcmV0dXJuIGJ5dGVzO1xuICAgICAgICB9Y2F0Y2goZXgpe1xuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKGBMb2FkVGV4dEJ5dGVzIDoke2FkZHJlc3N9IDogJHtleH1gKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXN5bmMgbG9hZFNwcml0ZShhZGRyZXNzOnN0cmluZyl7XG5cbiAgICAgICAgdHJ5e1xuICAgICAgICAgICAgbGV0IHRhc2sgPSBOaWNlVFMuUmVzb3VyY2VNYW5hZ2VyLkxvYWRTcHJpdGUoYWRkcmVzcyk7XG4gICAgICAgICAgICBsZXQgZ28gPSBhd2FpdCAkcHJvbWlzZSh0YXNrKTtcbiAgICAgICAgICAgIHJldHVybiBnbztcblxuICAgICAgICB9Y2F0Y2goZXgpe1xuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKGBMb2FkIHNwcml0ZSA6JHthZGRyZXNzfSA6ICR7ZXh9YClcblxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIHB1YmxpYyByZWxlYXNlQWRkcmVzc0dPKGdvOmFueSl7XG5cbiAgICAgICAgTmljZVRTLlJlc291cmNlTWFuYWdlci5SZWxlYXNlQWRkcmVzc0dPKGdvKTtcbiAgICB9XG5cblxuICAgIFxufSIsIlxuXG5leHBvcnQgY2xhc3MgU2luZ2xldG9uPFQ+e1xuXG4gICAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2U6YW55ID0gbnVsbDtcblxuICAgIHB1YmxpYyBzdGF0aWMgSW5zdGFuY2U8VD4oIGM6IHsgbmV3KCk6IFQgfSApIDogVHtcblxuICAgICAgICBpZih0aGlzLmluc3RhbmNlID09IG51bGwpe1xuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZSA9IG5ldyBjKCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcbiAgICB9XG5cbn0iLCJpbXBvcnQgeyBVbml0eUVuZ2luZSB9IGZyb20gJ2NzaGFycCc7XG5pbXBvcnQgeyBHYW1lQ29uZmlnIH0gZnJvbSAnLi4vLi4vZ2xvYmFsL0dhbWVDb25maWcnO1xuZW51bSBMb2dUeXBlIHtcblx0RXJyb3IgPSAwLFxuXHRBc3NlcnQgPSAxLFxuXHRXYXJuaW5nID0gMixcblx0TG9nID0gMyxcblx0RXhjZXB0aW9uID0gNFxufVxuXG5leHBvcnQgY2xhc3MgTG9nZ2Vye1xuICAgIHByaXZhdGUgIHN0YXRpYyAgdW5pdHlfbG9nX3RhcmdldCA9IG51bGw7XG5cbiAgICBzdGF0aWMgZ2V0UHJpbnRTdGFjayh0eXBlOiBMb2dUeXBlLCBzaG93U3RhY2sgOiBib29sZWFuLCAuLi5hcmdzKSB7XG4gICAgICAgIGxldCBtZXNzYWdlID0gJyc7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IGFyZ3NbaV07XG4gICAgICAgICAgICBpZiAodHlwZW9mIGVsZW1lbnQgPT09ICdvYmplY3QnICYmIExvZ2dlci5MT0dfT0JKRUNUX1RPX0pTT04pIHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlICs9IEpTT04uc3RyaW5naWZ5KGVsZW1lbnQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlICs9IGVsZW1lbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaSA8IGFyZ3MubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgICAgIG1lc3NhZ2UgKz0gJyAnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgXG4gICAgICAgIGlmIChzaG93U3RhY2sgfHwgVW5pdHlFbmdpbmUuQXBwbGljYXRpb24uaXNFZGl0b3IpIHtcbiAgICAgICAgICAgIHZhciBzdGFja3MgPSBuZXcgRXJyb3IoKS5zdGFjay5zcGxpdCgnXFxuJyk7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMzsgaSA8IHN0YWNrcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGxpbmUgPSBzdGFja3NbaV07XG4gICAgICAgICAgICAgICAgbWVzc2FnZSArPSAnXFxuJztcbiAgICAgICAgICAgICAgICBtZXNzYWdlICs9IGxpbmU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgaWYgKCFMb2dnZXIudW5pdHlfbG9nX3RhcmdldCkge1xuICAgICAgICAgICAgTG9nZ2VyLnVuaXR5X2xvZ190YXJnZXQgPSBuZXcgVW5pdHlFbmdpbmUuT2JqZWN0KCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbWVzc2FnZTtcbiAgICB9XG5cbiAgICBcblxuXHRzdGF0aWMgbG9nKC4uLmFyZ3MpOiB2b2lke1xuICAgICAgICBpZighR2FtZUNvbmZpZy5kZWJ1ZykgcmV0dXJuO1xuXG4gICAgICAgIGxldCBtc2cgPSBMb2dnZXIuZ2V0UHJpbnRTdGFjayhMb2dUeXBlLkxvZywgdHJ1ZSwgYXJncyk7XG4gICAgICAgIGNvbnNvbGUubG9nKG1zZyk7XG4gICAgfVxuXG5cdC8qKlxuXHQgKiBPdXRwdXRzIGEgd2FybmluZyBtZXNzYWdlIHRvIHRoZSBMb2dnZXIuXG5cdCAqIEBwYXJhbSBtZXNzYWdlICBsaXN0IG9mIEphdmFTY3JpcHQgb2JqZWN0cyB0byBvdXRwdXQuIFRoZSBzdHJpbmcgcmVwcmVzZW50YXRpb25zIG9mIGVhY2ggb2YgdGhlc2Ugb2JqZWN0cyBhcmUgYXBwZW5kZWQgdG9nZXRoZXIgaW4gdGhlIG9yZGVyIGxpc3RlZCBhbmQgb3V0cHV0LlxuXHQgKi9cblx0c3RhdGljIHdhcm4oLi4uYXJncyk6IHZvaWR7XG4gICAgICAgIGlmKCFHYW1lQ29uZmlnLmRlYnVnKSByZXR1cm47XG5cbiAgICAgICAgbGV0IG1zZyA9IExvZ2dlci5nZXRQcmludFN0YWNrKExvZ1R5cGUuV2FybmluZywgdHJ1ZSwgYXJncyk7XG4gICAgICAgIGNvbnNvbGUud2Fybihtc2cpO1xuICAgIH1cblxuXHQvKipcblx0ICogT3V0cHV0cyBhbiBlcnJvciBtZXNzYWdlIHRvIHRoZSBMb2dnZXIuXG5cdCAqIEBwYXJhbSBtZXNzYWdlIEEgbGlzdCBvZiBKYXZhU2NyaXB0IG9iamVjdHMgdG8gb3V0cHV0LiBUaGUgc3RyaW5nIHJlcHJlc2VudGF0aW9ucyBvZiBlYWNoIG9mIHRoZXNlIG9iamVjdHMgYXJlIGFwcGVuZGVkIHRvZ2V0aGVyIGluIHRoZSBvcmRlciBsaXN0ZWQgYW5kIG91dHB1dC5cblx0ICovXG5cdHN0YXRpYyBlcnJvciguLi5hcmdzKTogdm9pZHtcbiAgICAgICAgaWYoIUdhbWVDb25maWcuZGVidWcpIHJldHVybjtcblxuICAgICAgICBsZXQgbXNnID0gTG9nZ2VyLmdldFByaW50U3RhY2soTG9nVHlwZS5FcnJvciwgdHJ1ZSwgYXJncyk7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IobXNnKTtcbiAgICB9XG5cblx0LyoqIE91dHB1dHMgYSBzdGFjayB0cmFjZSB0byB0aGUgTG9nZ2VyLlxuXHQgKiBAcGFyYW0gbWVzc2FnZSBBIGxpc3Qgb2YgSmF2YVNjcmlwdCBvYmplY3RzIHRvIG91dHB1dC4gVGhlIHN0cmluZyByZXByZXNlbnRhdGlvbnMgb2YgZWFjaCBvZiB0aGVzZSBvYmplY3RzIGFyZSBhcHBlbmRlZCB0b2dldGhlciBpbiB0aGUgb3JkZXIgbGlzdGVkIGFuZCBvdXRwdXQuXG5cdCovXG5cdHN0YXRpYyB0cmFjZSguLi5hcmdzKTogdm9pZHtcbiAgICAgICAgaWYoIUdhbWVDb25maWcuZGVidWcpIHJldHVybjtcbiAgICAgICAgXG4gICAgICAgIGxldCBtc2cgPSBMb2dnZXIuZ2V0UHJpbnRTdGFjayhMb2dUeXBlLkxvZywgdHJ1ZSwgYXJncyk7XG4gICAgICAgIGNvbnNvbGUubG9nKG1zZyk7XG4gICAgfVxuXG5cdC8qKiBMb2cgSmF2YVNjcmlwdCBPYmplY3RzIGFzIEpTT04gZm9ybWF0ICovXG5cdHN0YXRpYyBMT0dfT0JKRUNUX1RPX0pTT04oLi4uYXJncyk6IGJvb2xlYW57XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxufSIsImltcG9ydCB7IFVuaXR5RW5naW5lIH0gZnJvbSBcImNzaGFycFwiO1xuaW1wb3J0IHsgUyB9IGZyb20gXCIuLi8uLi9nbG9iYWwvR2FtZUNvbmZpZ1wiO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQmFzZVNjZW5le1xuXG4gICAgcHJpdmF0ZSBwcmVsb2FkUHJlZmFiOk1hcDxzdHJpbmcsbnVtYmVyPjtcbiAgICBwcml2YXRlIHNjZW5lSW5zdGFuY2U6VW5pdHlFbmdpbmUuUmVzb3VyY2VNYW5hZ2VtZW50LlJlc291cmNlUHJvdmlkZXJzLlNjZW5lSW5zdGFuY2VcblxuICAgIHB1YmxpYyBmaW5pc2hDb3VudCA9IDA7XG4gICAgcHVibGljIHRvdGFsQ291bnQgPSAwO1xuXG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgdGhpcy5wcmVsb2FkUHJlZmFiID0gbmV3IE1hcDxzdHJpbmcsbnVtYmVyPigpO1xuICAgICAgICB0aGlzLmZpbmlzaENvdW50ID0gMDtcbiAgICB9XG5cbiAgICBwdWJsaWMgYWRkUHJlbG9hZFByZWZhYihhZGRyZXNzOnN0cmluZywgaW5zdENvdW50KXtcbiAgICAgICAgaWYoIXRoaXMucHJlbG9hZFByZWZhYi5oYXMoYWRkcmVzcykpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMucHJlbG9hZFByZWZhYi5zZXQoYWRkcmVzcywgaW5zdENvdW50KTtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIHRoaXMucHJlbG9hZFByZWZhYi5zZXQoYWRkcmVzcywgdGhpcy5wcmVsb2FkUHJlZmFiLmdldChhZGRyZXNzKSArIGluc3RDb3VudCk7XG4gICAgfVxuXG4gICAgcHVibGljIHNldFNjZW5lSW5zdGFuY2Uoc2NlbmVJbnN0YW5jZTpVbml0eUVuZ2luZS5SZXNvdXJjZU1hbmFnZW1lbnQuUmVzb3VyY2VQcm92aWRlcnMuU2NlbmVJbnN0YW5jZSl7XG4gICAgICAgIHRoaXMuc2NlbmVJbnN0YW5jZSA9IHNjZW5lSW5zdGFuY2U7XG4gICAgfVxuXG4gICAgcHVibGljIGFic3RyYWN0IG9uRW50ZXIoKTtcbiAgICBwdWJsaWMgYWJzdHJhY3Qgb25Db21wbGV0ZSgpOlByb21pc2U8YW55PjtcbiAgICBwdWJsaWMgYWJzdHJhY3Qgb25MZWF2ZSgpO1xuXG4gICAgcHVibGljIGFzeW5jIGxvYWRBc3NldHNBc3luYygpe1xuXG4gICAgICAgIHRoaXMudG90YWxDb3VudCA9IHRoaXMucHJlbG9hZFByZWZhYi5zaXplO1xuXG4gICAgICAgIGxldCBwcmVtaXNlcyA9IFtdO1xuXG4gICAgICAgIHRoaXMucHJlbG9hZFByZWZhYi5mb3JFYWNoKCh2YWx1ZSwga2V5KT0+e1xuICAgICAgICAgICAgbGV0IHByZW1pc2UgPSBTLkdhbWVPYmplY3RQb29sLnByZUxvYWRHYW1lT2JqZWN0QXN5bmMoa2V5LCB2YWx1ZSwoKT0+e1xuICAgICAgICAgICAgICAgIHRoaXMuZmluaXNoQ291bnQrKztcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBwcmVtaXNlcy5wdXNoKHByZW1pc2UpO1xuICAgICAgICB9KTtcblxuICAgICAgICBhd2FpdCBQcm9taXNlLmFsbChwcmVtaXNlcyk7XG4gICAgfVxuXG4gICAgcHVibGljIG9uRGVzdHJveSgpe1xuIFxuICAgICAgICAvL+a4heeQhui1hOa6kOe8k+WtmFxuICAgICAgICBTLkdhbWVPYmplY3RQb29sLmNsZWFudXAodHJ1ZSk7XG5cbiAgICAgICAgLy/ljbjovb3lnLrmma9cbiAgICAgICAgUy5SZXNNYW5hZ2VyLnVubG9hZFNjZW5lKHRoaXMuc2NlbmVJbnN0YW5jZSk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLnByZWxvYWRQcmVmYWIuY2xlYXIoKTtcbiAgICB9XG59IiwiZXhwb3J0IGVudW0gU2NlbmVEZWYge1xuICAgIEJhdHRsZVNjZW5lID0gXCJCYXR0bGVTY2VuZVwiLFxufSIsImltcG9ydCBCYXR0bGVTY2VuZSBmcm9tIFwiLi4vLi4vZ2FtZS9tb2R1bGUvcHZwL0JhdHRsZVNjZW5lXCI7XG5pbXBvcnQgeyBCYXNlU2NlbmUgfSBmcm9tIFwiLi9CYXNlU2NlbmVcIjtcbmltcG9ydCB7IFNjZW5lRGVmIH0gZnJvbSBcIi4vU2NlbmVEZWZcIjtcblxuXG5cbmV4cG9ydCBjbGFzcyBTY2VuZUZhY3Rvcnl7XG5cblxuICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlU2NlbmUoc2NlbmVOYW1lOnN0cmluZyk6QmFzZVNjZW5le1xuXG4gICAgICAgIGxldCBzY2VuZTpCYXNlU2NlbmUgPSBudWxsO1xuXG4gICAgICAgIHN3aXRjaCAoc2NlbmVOYW1lKXtcbiAgICAgICAgICAgIGNhc2UgU2NlbmVEZWYuQmF0dGxlU2NlbmU6XG4gICAgICAgICAgICAgICAgc2NlbmUgPSBuZXcgQmF0dGxlU2NlbmUoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzY2VuZTtcbiAgICB9XG59IiwiaW1wb3J0IHsgUyB9IGZyb20gXCIuLi8uLi9nbG9iYWwvR2FtZUNvbmZpZ1wiO1xuaW1wb3J0IHsgU2luZ2xldG9uIH0gZnJvbSBcIi4uL2NvbW1vbi9TaW5nbGV0b25cIjtcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCIuLi9sb2dnZXIvTG9nZ2VyXCI7XG5pbXBvcnQgeyBCYXNlU2NlbmUgfSBmcm9tIFwiLi9CYXNlU2NlbmVcIjtcbmltcG9ydCB7IFNjZW5lRmFjdG9yeSB9IGZyb20gXCIuL1NjZW5lRmFjdG9yeVwiO1xuXG5leHBvcnQgY2xhc3MgU2NlbmVNYW5hZ2VyIGV4dGVuZHMgU2luZ2xldG9uPFNjZW5lTWFuYWdlcj57XG5cbiAgICBwcml2YXRlIGN1cnJlbnRTY2VuZTpCYXNlU2NlbmUgPSBudWxsO1xuXG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgbG9hZFNjZW5lKHNjZW5lOnN0cmluZyl7XG4gICAgICAgIFxuICAgICAgICB0cnl7XG4gICAgICAgICAgICAvL+a4heeQhuaXp+WcuuaZr1xuICAgICAgICAgICAgaWYodGhpcy5jdXJyZW50U2NlbmUpe1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFNjZW5lLm9uTGVhdmUoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRTY2VuZS5vbkRlc3Ryb3koKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy/lvIDlp4vliqDovb3lnLrmma9cbiAgICAgICAgICAgIGxldCBzY2VuZUluc3RhbmNlID0gYXdhaXQgUy5SZXNNYW5hZ2VyLmxvYWRTY2VuZShzY2VuZSk7XG5cbiAgICAgICAgICAgIC8v5byA5aeL5Yqg6L296L+b5YWl5Zy65pmv55qE6LWE5rqQXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRTY2VuZSA9ICBTY2VuZUZhY3RvcnkuY3JlYXRlU2NlbmUoc2NlbmUpO1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50U2NlbmUuc2V0U2NlbmVJbnN0YW5jZShzY2VuZUluc3RhbmNlKTtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFNjZW5lLm9uRW50ZXIoKTtcblxuXG4gICAgICAgICAgICAvL+WKoOi9vei1hOa6kFxuICAgICAgICAgICAgYXdhaXQgdGhpcy5jdXJyZW50U2NlbmUubG9hZEFzc2V0c0FzeW5jKCk7XG5cbiAgICAgICAgICAgIGF3YWl0IHRoaXMuY3VycmVudFNjZW5lLm9uQ29tcGxldGUoKVxuICAgICAgICB9Y2F0Y2goZXgpe1xuICAgICAgICAgICAgTG9nZ2VyLmxvZyhcImxvYWQgc2NlbmUgZXhjZXA6XCIrZXgpO1xuICAgICAgICB9XG4gICAgfVxufSIsImltcG9ydCB7IHRhYiB9IGZyb20gXCIuL3RhYmxlX2dlblwiO1xuaW1wb3J0IHsgTmljZVRTIH0gZnJvbSAnY3NoYXJwJztcbmltcG9ydCB7ICRwcm9taXNlIH0gZnJvbSBcInB1ZXJ0c1wiO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gTG9hZFRhYmxlKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGxldCB0YXNrID0gTmljZVRTLlJlc291cmNlTWFuYWdlci5Mb2FkVGV4dEFzc2V0KCdKc29uL3RhYmxlX2dlbi5qc29uJylcbiAgICAgICAgbGV0IHRleHRBc3NldCA9IGF3YWl0ICRwcm9taXNlKHRhc2spO1xuICAgICAgICB0YWIuSW5pdERhdGEodGV4dEFzc2V0LnRleHQpO1xuICAgICAgICBOaWNlVFMuUmVzb3VyY2VNYW5hZ2VyLlJlbGVhc2VBZGRyZXNzR08odGV4dEFzc2V0KTtcbiAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihgTG9hZFRhYmxlOiAke2V9YClcbiAgICB9XG59ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIiwiLy8gR2VuZXJhdGVkIGJ5IGdpdGh1Yi5jb20vZ3JlYXR3aW5nL3RhYnRveVxuLy8gRE8gTk9UIEVESVQhIVxuLy8gVmVyc2lvbjogXG5leHBvcnQgbmFtZXNwYWNlIHRhYiB7XG5cdGV4cG9ydCB2YXIgRGF0YTpUYWJsZSA9IG51bGw7XG5cblx0ZXhwb3J0IGZ1bmN0aW9uIEluaXREYXRhKGpzb246IE9iamVjdHxzdHJpbmcpIHtcblx0XHREYXRhID0gVGFibGUuRnJvbUpTT04oanNvbik7XG5cdH1cblxuXHRcblx0ZXhwb3J0IGVudW0gSXRlbVR5cGUgeyBcblx0XHRJdGVtVHlwZV9Ub3dlciA9IDAsIC8vIOWNoeeJjCBcblx0XHRJdGVtVHlwZV9HaWZ0QmFnID0gMSwgLy8g56S85YyFIFxuXHRcdEl0ZW1UeXBlX01vbmV5ID0gMiwgLy8g6LSn5biBIFxuXHR9XG5cdGV4cG9ydCBlbnVtIEl0ZW1RdWFsaXR5IHsgXG5cdFx0SXRlbVF1YWxpdHlfV2hpdGUgPSAwLCAvLyDnmb0gXG5cdFx0SXRlbVF1YWxpdHlfQmx1ZSA9IDEsIC8vIOiTnSBcblx0XHRJdGVtUXVhbGl0eV9WaW9sZXQgPSAyLCAvLyDntKsgXG5cdFx0SXRlbVF1YWxpdHlfR29sZGVuID0gMywgLy8g6YeRIFxuXHR9XG5cblx0XG5cdGV4cG9ydCBjbGFzcyBJdGVtVGFibGUgeyBcblx0XHRJRCA6IG51bWJlciAvLyBJRCBcblx0XHROYW1lIDogc3RyaW5nIC8vIOWQjeensCBcblx0XHRUeXBlIDogSXRlbVR5cGUgLy8g6YGT5YW357G75Z6LIFxuXHRcdEljb24gOiBzdHJpbmcgLy8g5Zu+5qCHIFxuXHRcdERlc2MgOiBzdHJpbmcgLy8g5o+P6L+wIFxuXHRcdFF1YWxpdHkgOiBJdGVtUXVhbGl0eSAvLyDlk4HotKggXG5cdH1cblx0XG5cdGV4cG9ydCBjbGFzcyBDb25maWdUYWJsZSB7IFxuXHRcdG5vdGljZXZlcnNpb24gOiBzdHJpbmcgLy8gIFxuXHRcdEluaXRpYWxDYXJkcyA6IG51bWJlcltdIC8vICBcblx0XHRJbml0RGlhbW9uZCA6IG51bWJlciAvLyAgXG5cdH1cblx0XG5cblx0Ly8gQ29tYmluZSBzdHJ1Y3Rcblx0ZXhwb3J0IGNsYXNzIFRhYmxlIHsgXG5cdFx0SXRlbVRhYmxlIDogSXRlbVRhYmxlW10gLy8gdGFibGU6IEl0ZW1UYWJsZSBcblx0XHRDb25maWdUYWJsZSA6IENvbmZpZ1RhYmxlW10gLy8gdGFibGU6IENvbmZpZ1RhYmxlIFxuXG5cdFx0Ly8gSW5kaWNlcyBcblx0XHRJdGVtVGFibGVCeUlEIDogRGljdGlvbmFyeTxudW1iZXIsIEl0ZW1UYWJsZT4gLy8gdGFibGU6IEl0ZW1UYWJsZSBcblxuXHRcdFxuXHRcdC8vIHRhYmxlOiBDb25maWdUYWJsZVxuXHRcdEdldEtleVZhbHVlX0NvbmZpZ1RhYmxlKCk6IENvbmZpZ1RhYmxle1xuXHRcdFx0cmV0dXJuIHRoaXMuQ29uZmlnVGFibGVbMF1cblx0XHR9XG5cdFx0XG5cblx0XHQvL+agueaNrmpzb27liJvlu7pUYWJsZVxuXHRcdHN0YXRpYyBGcm9tSlNPTihqc29uOiBPYmplY3R8c3RyaW5nKTogVGFibGUge1xuXHRcdFx0bGV0IHJlc3VsdDogVGFibGU7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGpzb24gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgLy8gaWYgaXQncyBhIHN0cmluZywgcGFyc2UgaXQgZmlyc3RcbiAgICAgICAgICAgICAgICByZXN1bHQ9IEpTT04ucGFyc2UoanNvbiwgVGFibGUucmV2aXZlcik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIGNyZWF0ZSBhbiBpbnN0YW5jZSBvZiB0aGUgVGFibGUgY2xhc3NcbiAgICAgICAgICAgICAgICBsZXQgdGJsID0gbmV3IFRhYmxlKClcbiAgICAgICAgICAgICAgICAvLyBjb3B5IGFsbCB0aGUgZmllbGRzIGZyb20gdGhlIGpzb24gb2JqZWN0XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gT2JqZWN0LmFzc2lnbih0YmwsIGpzb24pO1xuICAgICAgICAgICAgfVxuXHRcdFx0cmVzdWx0LkJ1aWxkRGF0YSgpO1xuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9XG5cbiAgICAgICAgc3RhdGljIHJldml2ZXIoa2V5OiBzdHJpbmcsIHZhbHVlOiBhbnkpOiBhbnkge1xuICAgICAgICAgICAgcmV0dXJuIGtleSA9PT0gXCJcIiA/IFRhYmxlLkZyb21KU09OKHZhbHVlKSA6IHZhbHVlO1xuICAgICAgICB9XG5cblx0XHQvLyDmuIXpmaTntKLlvJXlkozmlbDmja5cblx0XHRSZXNldERhdGEoKSB7XG5cdFx0XHRcblx0XHRcdHRoaXMuSXRlbVRhYmxlID0gW10gXG5cdFx0XHR0aGlzLkNvbmZpZ1RhYmxlID0gW10gXG5cdFx0XHRcblx0XHRcdHRoaXMuSXRlbVRhYmxlQnlJRCA9IG5ldyBEaWN0aW9uYXJ5PG51bWJlciwgSXRlbVRhYmxlPigpIFxuXHRcdH1cblxuXHRcdC8vIOaehOW7uue0ouW8lVxuXHRcdEJ1aWxkRGF0YSgpIHtcblx0XHRcdFxuXHRcdFx0dGhpcy5JdGVtVGFibGVCeUlEID0gbmV3IERpY3Rpb25hcnk8bnVtYmVyLCBJdGVtVGFibGU+KClcblx0XHRcdGlmKHRoaXMuSXRlbVRhYmxlKSB7XG5cdFx0XHRcdGZvcihsZXQgdiBvZiB0aGlzLkl0ZW1UYWJsZSkge1xuXHRcdFx0XHRcdHRoaXMuSXRlbVRhYmxlQnlJRC5zZXRWYWx1ZSh2LklELCB2KVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Ly8gVXNlZCBpbnRlcm5hbGx5IGJ5IGRpY3Rpb25hcnlcblx0ZXhwb3J0IGludGVyZmFjZSBJRGljdGlvbmFyeVBhaXI8SywgVj4ge1xuXHRcdGtleTogSztcblx0XHR2YWx1ZTogVjtcblx0fVxuXHRcblx0ZXhwb3J0IGNsYXNzIERpY3Rpb25hcnk8SywgVj4ge1xuXHRcblx0XHQvKipcblx0XHQgKiBPYmplY3QgaG9sZGluZyB0aGUga2V5LXZhbHVlIHBhaXJzLlxuXHRcdCAqIEB0eXBlIHtPYmplY3R9XG5cdFx0ICogQHByaXZhdGVcblx0XHQgKi9cblx0XHRwcm90ZWN0ZWQgdGFibGU6IHsgW2tleTogc3RyaW5nXTogSURpY3Rpb25hcnlQYWlyPEssIFY+IH07XG5cdFx0Ly86IFtrZXk6IEtdIHdpbGwgbm90IHdvcmsgc2luY2UgaW5kaWNlcyBjYW4gb25seSBieSBzdHJpbmdzIGluIGphdmFzY3JpcHQgYW5kIHR5cGVzY3JpcHQgZW5mb3JjZXMgdGhpcy5cblx0XG5cdFx0LyoqXG5cdFx0ICogTnVtYmVyIG9mIGVsZW1lbnRzIGluIHRoZSBsaXN0LlxuXHRcdCAqIEB0eXBlIHtudW1iZXJ9XG5cdFx0ICogQHByaXZhdGVcblx0XHQgKi9cblx0XHRwcm90ZWN0ZWQgbkVsZW1lbnRzOiBudW1iZXI7XG5cdFxuXHRcdC8qKlxuXHRcdCAqIEZ1bmN0aW9uIHVzZWQgdG8gY29udmVydCBrZXlzIHRvIHN0cmluZ3MuXG5cdFx0ICogQHR5cGUge2Z1bmN0aW9uKE9iamVjdCk6c3RyaW5nfVxuXHRcdCAqIEBwcm90ZWN0ZWRcblx0XHQgKi9cblx0XHRwcm90ZWN0ZWQgdG9TdHI6IChrZXk6IEspID0+IHN0cmluZztcblx0XG5cdFxuXHRcdC8qKlxuXHRcdCAqIENyZWF0ZXMgYW4gZW1wdHkgZGljdGlvbmFyeS5cblx0XHQgKiBAY2xhc3MgPHA+RGljdGlvbmFyaWVzIG1hcCBrZXlzIHRvIHZhbHVlczsgZWFjaCBrZXkgY2FuIG1hcCB0byBhdCBtb3N0IG9uZSB2YWx1ZS5cblx0XHQgKiBUaGlzIGltcGxlbWVudGF0aW9uIGFjY2VwdHMgYW55IGtpbmQgb2Ygb2JqZWN0cyBhcyBrZXlzLjwvcD5cblx0XHQgKlxuXHRcdCAqIDxwPklmIHRoZSBrZXlzIGFyZSBjdXN0b20gb2JqZWN0cyBhIGZ1bmN0aW9uIHdoaWNoIGNvbnZlcnRzIGtleXMgdG8gdW5pcXVlXG5cdFx0ICogc3RyaW5ncyBtdXN0IGJlIHByb3ZpZGVkLiBFeGFtcGxlOjwvcD5cblx0XHQgKiA8cHJlPlxuXHRcdCAqIGZ1bmN0aW9uIHBldFRvU3RyaW5nKHBldCkge1xuXHRcdCAqICByZXR1cm4gcGV0Lm5hbWU7XG5cdFx0ICogfVxuXHRcdCAqIDwvcHJlPlxuXHRcdCAqIEBjb25zdHJ1Y3RvclxuXHRcdCAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0KTpzdHJpbmc9fSB0b1N0ckZ1bmN0aW9uIG9wdGlvbmFsIGZ1bmN0aW9uIHVzZWRcblx0XHQgKiB0byBjb252ZXJ0IGtleXMgdG8gc3RyaW5ncy4gSWYgdGhlIGtleXMgYXJlbid0IHN0cmluZ3Mgb3IgaWYgdG9TdHJpbmcoKVxuXHRcdCAqIGlzIG5vdCBhcHByb3ByaWF0ZSwgYSBjdXN0b20gZnVuY3Rpb24gd2hpY2ggcmVjZWl2ZXMgYSBrZXkgYW5kIHJldHVybnMgYVxuXHRcdCAqIHVuaXF1ZSBzdHJpbmcgbXVzdCBiZSBwcm92aWRlZC5cblx0XHQgKi9cblx0XHRjb25zdHJ1Y3Rvcih0b1N0ckZ1bmN0aW9uPzogKGtleTogSykgPT4gc3RyaW5nKSB7XG5cdFx0XHR0aGlzLnRhYmxlID0ge307XG5cdFx0XHR0aGlzLm5FbGVtZW50cyA9IDA7XG5cdFx0XHR0aGlzLnRvU3RyID0gdG9TdHJGdW5jdGlvbiB8fCBkZWZhdWx0VG9TdHJpbmc7XG5cdFx0fVxuXHRcblx0XG5cdFx0LyoqXG5cdFx0ICogUmV0dXJucyB0aGUgdmFsdWUgdG8gd2hpY2ggdGhpcyBkaWN0aW9uYXJ5IG1hcHMgdGhlIHNwZWNpZmllZCBrZXkuXG5cdFx0ICogUmV0dXJucyB1bmRlZmluZWQgaWYgdGhpcyBkaWN0aW9uYXJ5IGNvbnRhaW5zIG5vIG1hcHBpbmcgZm9yIHRoaXMga2V5LlxuXHRcdCAqIEBwYXJhbSB7T2JqZWN0fSBrZXkga2V5IHdob3NlIGFzc29jaWF0ZWQgdmFsdWUgaXMgdG8gYmUgcmV0dXJuZWQuXG5cdFx0ICogQHJldHVybiB7Kn0gdGhlIHZhbHVlIHRvIHdoaWNoIHRoaXMgZGljdGlvbmFyeSBtYXBzIHRoZSBzcGVjaWZpZWQga2V5IG9yXG5cdFx0ICogdW5kZWZpbmVkIGlmIHRoZSBtYXAgY29udGFpbnMgbm8gbWFwcGluZyBmb3IgdGhpcyBrZXkuXG5cdFx0ICovXG5cdFx0Z2V0VmFsdWUoa2V5OiBLKTogViB8IHVuZGVmaW5lZCB7XG5cdFx0XHRjb25zdCBwYWlyOiBJRGljdGlvbmFyeVBhaXI8SywgVj4gPSB0aGlzLnRhYmxlWyckJyArIHRoaXMudG9TdHIoa2V5KV07XG5cdFx0XHRpZiAoaXNVbmRlZmluZWQocGFpcikpIHtcblx0XHRcdFx0cmV0dXJuIHVuZGVmaW5lZDtcblx0XHRcdH1cblx0XHRcdHJldHVybiBwYWlyLnZhbHVlO1xuXHRcdH1cblx0XG5cdFxuXHRcdC8qKlxuXHRcdCAqIEFzc29jaWF0ZXMgdGhlIHNwZWNpZmllZCB2YWx1ZSB3aXRoIHRoZSBzcGVjaWZpZWQga2V5IGluIHRoaXMgZGljdGlvbmFyeS5cblx0XHQgKiBJZiB0aGUgZGljdGlvbmFyeSBwcmV2aW91c2x5IGNvbnRhaW5lZCBhIG1hcHBpbmcgZm9yIHRoaXMga2V5LCB0aGUgb2xkXG5cdFx0ICogdmFsdWUgaXMgcmVwbGFjZWQgYnkgdGhlIHNwZWNpZmllZCB2YWx1ZS5cblx0XHQgKiBAcGFyYW0ge09iamVjdH0ga2V5IGtleSB3aXRoIHdoaWNoIHRoZSBzcGVjaWZpZWQgdmFsdWUgaXMgdG8gYmVcblx0XHQgKiBhc3NvY2lhdGVkLlxuXHRcdCAqIEBwYXJhbSB7T2JqZWN0fSB2YWx1ZSB2YWx1ZSB0byBiZSBhc3NvY2lhdGVkIHdpdGggdGhlIHNwZWNpZmllZCBrZXkuXG5cdFx0ICogQHJldHVybiB7Kn0gcHJldmlvdXMgdmFsdWUgYXNzb2NpYXRlZCB3aXRoIHRoZSBzcGVjaWZpZWQga2V5LCBvciB1bmRlZmluZWQgaWZcblx0XHQgKiB0aGVyZSB3YXMgbm8gbWFwcGluZyBmb3IgdGhlIGtleSBvciBpZiB0aGUga2V5L3ZhbHVlIGFyZSB1bmRlZmluZWQuXG5cdFx0ICovXG5cdFx0c2V0VmFsdWUoa2V5OiBLLCB2YWx1ZTogVik6IFYgfCB1bmRlZmluZWQge1xuXHRcblx0XHRcdGlmIChpc1VuZGVmaW5lZChrZXkpIHx8IGlzVW5kZWZpbmVkKHZhbHVlKSkge1xuXHRcdFx0XHRyZXR1cm4gdW5kZWZpbmVkO1xuXHRcdFx0fVxuXHRcblx0XHRcdGxldCByZXQ6IFYgfCB1bmRlZmluZWQ7XG5cdFx0XHRjb25zdCBrID0gJyQnICsgdGhpcy50b1N0cihrZXkpO1xuXHRcdFx0Y29uc3QgcHJldmlvdXNFbGVtZW50OiBJRGljdGlvbmFyeVBhaXI8SywgVj4gPSB0aGlzLnRhYmxlW2tdO1xuXHRcdFx0aWYgKGlzVW5kZWZpbmVkKHByZXZpb3VzRWxlbWVudCkpIHtcblx0XHRcdFx0dGhpcy5uRWxlbWVudHMrKztcblx0XHRcdFx0cmV0ID0gdW5kZWZpbmVkO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmV0ID0gcHJldmlvdXNFbGVtZW50LnZhbHVlO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy50YWJsZVtrXSA9IHtcblx0XHRcdFx0a2V5OiBrZXksXG5cdFx0XHRcdHZhbHVlOiB2YWx1ZVxuXHRcdFx0fTtcblx0XHRcdHJldHVybiByZXQ7XG5cdFx0fVxuXHRcblx0XHQvKipcblx0XHQgKiBSZW1vdmVzIHRoZSBtYXBwaW5nIGZvciB0aGlzIGtleSBmcm9tIHRoaXMgZGljdGlvbmFyeSBpZiBpdCBpcyBwcmVzZW50LlxuXHRcdCAqIEBwYXJhbSB7T2JqZWN0fSBrZXkga2V5IHdob3NlIG1hcHBpbmcgaXMgdG8gYmUgcmVtb3ZlZCBmcm9tIHRoZVxuXHRcdCAqIGRpY3Rpb25hcnkuXG5cdFx0ICogQHJldHVybiB7Kn0gcHJldmlvdXMgdmFsdWUgYXNzb2NpYXRlZCB3aXRoIHNwZWNpZmllZCBrZXksIG9yIHVuZGVmaW5lZCBpZlxuXHRcdCAqIHRoZXJlIHdhcyBubyBtYXBwaW5nIGZvciBrZXkuXG5cdFx0ICovXG5cdFx0cmVtb3ZlKGtleTogSyk6IFYgfCB1bmRlZmluZWQge1xuXHRcdFx0Y29uc3QgayA9ICckJyArIHRoaXMudG9TdHIoa2V5KTtcblx0XHRcdGNvbnN0IHByZXZpb3VzRWxlbWVudDogSURpY3Rpb25hcnlQYWlyPEssIFY+ID0gdGhpcy50YWJsZVtrXTtcblx0XHRcdGlmICghaXNVbmRlZmluZWQocHJldmlvdXNFbGVtZW50KSkge1xuXHRcdFx0XHRkZWxldGUgdGhpcy50YWJsZVtrXTtcblx0XHRcdFx0dGhpcy5uRWxlbWVudHMtLTtcblx0XHRcdFx0cmV0dXJuIHByZXZpb3VzRWxlbWVudC52YWx1ZTtcblx0XHRcdH1cblx0XHRcdHJldHVybiB1bmRlZmluZWQ7XG5cdFx0fVxuXHRcblx0XHQvKipcblx0XHQgKiBSZXR1cm5zIGFuIGFycmF5IGNvbnRhaW5pbmcgYWxsIG9mIHRoZSBrZXlzIGluIHRoaXMgZGljdGlvbmFyeS5cblx0XHQgKiBAcmV0dXJuIHtBcnJheX0gYW4gYXJyYXkgY29udGFpbmluZyBhbGwgb2YgdGhlIGtleXMgaW4gdGhpcyBkaWN0aW9uYXJ5LlxuXHRcdCAqL1xuXHRcdGtleXMoKTogS1tdIHtcblx0XHRcdGNvbnN0IGFycmF5OiBLW10gPSBbXTtcblx0XHRcdGZvciAoY29uc3QgbmFtZSBpbiB0aGlzLnRhYmxlKSB7XG5cdFx0XHRcdGlmIChoYXModGhpcy50YWJsZSwgbmFtZSkpIHtcblx0XHRcdFx0XHRjb25zdCBwYWlyOiBJRGljdGlvbmFyeVBhaXI8SywgVj4gPSB0aGlzLnRhYmxlW25hbWVdO1xuXHRcdFx0XHRcdGFycmF5LnB1c2gocGFpci5rZXkpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gYXJyYXk7XG5cdFx0fVxuXHRcblx0XHQvKipcblx0XHQgKiBSZXR1cm5zIGFuIGFycmF5IGNvbnRhaW5pbmcgYWxsIG9mIHRoZSB2YWx1ZXMgaW4gdGhpcyBkaWN0aW9uYXJ5LlxuXHRcdCAqIEByZXR1cm4ge0FycmF5fSBhbiBhcnJheSBjb250YWluaW5nIGFsbCBvZiB0aGUgdmFsdWVzIGluIHRoaXMgZGljdGlvbmFyeS5cblx0XHQgKi9cblx0XHR2YWx1ZXMoKTogVltdIHtcblx0XHRcdGNvbnN0IGFycmF5OiBWW10gPSBbXTtcblx0XHRcdGZvciAoY29uc3QgbmFtZSBpbiB0aGlzLnRhYmxlKSB7XG5cdFx0XHRcdGlmIChoYXModGhpcy50YWJsZSwgbmFtZSkpIHtcblx0XHRcdFx0XHRjb25zdCBwYWlyOiBJRGljdGlvbmFyeVBhaXI8SywgVj4gPSB0aGlzLnRhYmxlW25hbWVdO1xuXHRcdFx0XHRcdGFycmF5LnB1c2gocGFpci52YWx1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiBhcnJheTtcblx0XHR9XG5cdFxuXHRcdC8qKlxuXHRcdCAqIEV4ZWN1dGVzIHRoZSBwcm92aWRlZCBmdW5jdGlvbiBvbmNlIGZvciBlYWNoIGtleS12YWx1ZSBwYWlyXG5cdFx0ICogcHJlc2VudCBpbiB0aGlzIGRpY3Rpb25hcnkuXG5cdFx0ICogQHBhcmFtIHtmdW5jdGlvbihPYmplY3QsT2JqZWN0KToqfSBjYWxsYmFjayBmdW5jdGlvbiB0byBleGVjdXRlLCBpdCBpc1xuXHRcdCAqIGludm9rZWQgd2l0aCB0d28gYXJndW1lbnRzOiBrZXkgYW5kIHZhbHVlLiBUbyBicmVhayB0aGUgaXRlcmF0aW9uIHlvdSBjYW5cblx0XHQgKiBvcHRpb25hbGx5IHJldHVybiBmYWxzZS5cblx0XHQgKi9cblx0XHRmb3JFYWNoKGNhbGxiYWNrOiAoa2V5OiBLLCB2YWx1ZTogVikgPT4gYW55KTogdm9pZCB7XG5cdFx0XHRmb3IgKGNvbnN0IG5hbWUgaW4gdGhpcy50YWJsZSkge1xuXHRcdFx0XHRpZiAoaGFzKHRoaXMudGFibGUsIG5hbWUpKSB7XG5cdFx0XHRcdFx0Y29uc3QgcGFpcjogSURpY3Rpb25hcnlQYWlyPEssIFY+ID0gdGhpcy50YWJsZVtuYW1lXTtcblx0XHRcdFx0XHRjb25zdCByZXQgPSBjYWxsYmFjayhwYWlyLmtleSwgcGFpci52YWx1ZSk7XG5cdFx0XHRcdFx0aWYgKHJldCA9PT0gZmFsc2UpIHtcblx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFxuXHRcdC8qKlxuXHRcdCAqIFJldHVybnMgdHJ1ZSBpZiB0aGlzIGRpY3Rpb25hcnkgY29udGFpbnMgYSBtYXBwaW5nIGZvciB0aGUgc3BlY2lmaWVkIGtleS5cblx0XHQgKiBAcGFyYW0ge09iamVjdH0ga2V5IGtleSB3aG9zZSBwcmVzZW5jZSBpbiB0aGlzIGRpY3Rpb25hcnkgaXMgdG8gYmVcblx0XHQgKiB0ZXN0ZWQuXG5cdFx0ICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGlzIGRpY3Rpb25hcnkgY29udGFpbnMgYSBtYXBwaW5nIGZvciB0aGVcblx0XHQgKiBzcGVjaWZpZWQga2V5LlxuXHRcdCAqL1xuXHRcdGNvbnRhaW5zS2V5KGtleTogSyk6IGJvb2xlYW4ge1xuXHRcdFx0cmV0dXJuICFpc1VuZGVmaW5lZCh0aGlzLmdldFZhbHVlKGtleSkpO1xuXHRcdH1cblx0XG5cdFx0LyoqXG5cdFx0ICogUmVtb3ZlcyBhbGwgbWFwcGluZ3MgZnJvbSB0aGlzIGRpY3Rpb25hcnkuXG5cdFx0ICogQHRoaXMge2NvbGxlY3Rpb25zLkRpY3Rpb25hcnl9XG5cdFx0ICovXG5cdFx0Y2xlYXIoKSB7XG5cdFx0XHR0aGlzLnRhYmxlID0ge307XG5cdFx0XHR0aGlzLm5FbGVtZW50cyA9IDA7XG5cdFx0fVxuXHRcblx0XHQvKipcblx0XHQgKiBSZXR1cm5zIHRoZSBudW1iZXIgb2Yga2V5cyBpbiB0aGlzIGRpY3Rpb25hcnkuXG5cdFx0ICogQHJldHVybiB7bnVtYmVyfSB0aGUgbnVtYmVyIG9mIGtleS12YWx1ZSBtYXBwaW5ncyBpbiB0aGlzIGRpY3Rpb25hcnkuXG5cdFx0ICovXG5cdFx0c2l6ZSgpOiBudW1iZXIge1xuXHRcdFx0cmV0dXJuIHRoaXMubkVsZW1lbnRzO1xuXHRcdH1cblx0XG5cdFx0LyoqXG5cdFx0ICogUmV0dXJucyB0cnVlIGlmIHRoaXMgZGljdGlvbmFyeSBjb250YWlucyBubyBtYXBwaW5ncy5cblx0XHQgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRoaXMgZGljdGlvbmFyeSBjb250YWlucyBubyBtYXBwaW5ncy5cblx0XHQgKi9cblx0XHRpc0VtcHR5KCk6IGJvb2xlYW4ge1xuXHRcdFx0cmV0dXJuIHRoaXMubkVsZW1lbnRzIDw9IDA7XG5cdFx0fVxuXHRcblx0XHR0b1N0cmluZygpOiBzdHJpbmcge1xuXHRcdFx0bGV0IHRvcmV0ID0gJ3snO1xuXHRcdFx0dGhpcy5mb3JFYWNoKChrLCB2KSA9PiB7XG5cdFx0XHRcdHRvcmV0ICs9IFwiXFxuXFx0XCIgKyBrLnRvU3RyaW5nKCkgKyBcIiA6IFwiICsgdi50b1N0cmluZygpO1xuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gdG9yZXQgKyAnXFxufSc7XG5cdFx0fVxuXHR9IC8vIEVuZCBvZiBkaWN0aW9uYXJ5XG5cblx0ZnVuY3Rpb24gZGVmYXVsdFRvU3RyaW5nKGl0ZW06IGFueSk6IHN0cmluZyB7XG5cdFx0aWYgKGl0ZW0gPT09IG51bGwpIHtcblx0XHRcdHJldHVybiAnQ09MTEVDVElPTl9OVUxMJztcblx0XHR9IGVsc2UgaWYgKGlzVW5kZWZpbmVkKGl0ZW0pKSB7XG5cdFx0XHRyZXR1cm4gJ0NPTExFQ1RJT05fVU5ERUZJTkVEJztcblx0XHR9IGVsc2UgaWYgKGlzU3RyaW5nKGl0ZW0pKSB7XG5cdFx0XHRyZXR1cm4gJyRzJyArIGl0ZW07XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiAnJG8nICsgaXRlbS50b1N0cmluZygpO1xuXHRcdH1cblx0fVxuXG5cdGNvbnN0IF9oYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cdGNvbnN0IGhhcyA9IGZ1bmN0aW9uKG9iajogYW55LCBwcm9wOiBhbnkpIHtcblx0XHRyZXR1cm4gX2hhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTtcblx0fTtcblxuXHRmdW5jdGlvbiBpc1VuZGVmaW5lZChvYmo6IGFueSk6IG9iaiBpcyB1bmRlZmluZWQge1xuXHRcdHJldHVybiAodHlwZW9mIG9iaikgPT09ICd1bmRlZmluZWQnO1xuXHR9XG5cblx0ZnVuY3Rpb24gaXNTdHJpbmcob2JqOiBhbnkpOiBib29sZWFuIHtcblx0XHRyZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IFN0cmluZ10nO1xuXHR9XG5cblx0Ly9Qb2x5ZmlsbFxuICAgIGlmICh0eXBlb2YgT2JqZWN0LmFzc2lnbiAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAvLyBNdXN0IGJlIHdyaXRhYmxlOiB0cnVlLCBlbnVtZXJhYmxlOiBmYWxzZSwgY29uZmlndXJhYmxlOiB0cnVlXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KE9iamVjdCwgXCJhc3NpZ25cIiwge1xuXHRcdFx0dmFsdWU6IGZ1bmN0aW9uIGFzc2lnbih0YXJnZXQsIHZhckFyZ3MpIHsgLy8gLmxlbmd0aCBvZiBmdW5jdGlvbiBpcyAyXG4gICAgICAgICAgICBcdCd1c2Ugc3RyaWN0JztcbiAgICAgICAgICAgIFx0aWYgKHRhcmdldCA9PT0gbnVsbCB8fCB0YXJnZXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICBcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNvbnZlcnQgdW5kZWZpbmVkIG9yIG51bGwgdG8gb2JqZWN0Jyk7XG4gICAgICAgICAgICBcdH1cbiAgICAgIFxuICAgICAgICAgICAgXHR2YXIgdG8gPSBPYmplY3QodGFyZ2V0KTtcbiAgICAgIFxuICAgICAgICAgICAgXHRmb3IgKHZhciBpbmRleCA9IDE7IGluZGV4IDwgYXJndW1lbnRzLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICAgICAgICBcdFx0dmFyIG5leHRTb3VyY2UgPSBhcmd1bWVudHNbaW5kZXhdO1xuICAgICAgXG4gICAgICAgICAgICAgIFx0XHRpZiAobmV4dFNvdXJjZSAhPT0gbnVsbCAmJiBuZXh0U291cmNlICE9PSB1bmRlZmluZWQpIHsgXG4gICAgICAgICAgICAgICAgXHRcdGZvciAodmFyIG5leHRLZXkgaW4gbmV4dFNvdXJjZSkge1xuICAgICAgICAgICAgICAgICAgXHRcdFx0Ly8gQXZvaWQgYnVncyB3aGVuIGhhc093blByb3BlcnR5IGlzIHNoYWRvd2VkXG4gICAgICAgICAgICAgICAgICBcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG5leHRTb3VyY2UsIG5leHRLZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgIFx0XHRcdHRvW25leHRLZXldID0gbmV4dFNvdXJjZVtuZXh0S2V5XTtcbiAgICAgICAgICAgICAgICAgIFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cbiAgICAgICAgICAgICAgXHRcdH1cbiAgICAgICAgICAgIFx0fVxuICAgICAgICAgICAgXHRyZXR1cm4gdG87XG5cdFx0XHR9LFxuXHRcdFx0d3JpdGFibGU6IHRydWUsXG5cdFx0XHRjb25maWd1cmFibGU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIiwiXG5pbXBvcnQgeyBKc01hbmFnZXIgLEdhbWVMYXVuY2ggfSBmcm9tICdjc2hhcnAnO1xuaW1wb3J0IHsgU2NlbmVEZWYgfSBmcm9tICcuLi9mcmFtZXdvcmsvc2NlbmUvU2NlbmVEZWYnO1xuaW1wb3J0IHsgUyB9IGZyb20gJy4uL2dsb2JhbC9HYW1lQ29uZmlnJztcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gJy4uL2ZyYW1ld29yay9sb2dnZXIvTG9nZ2VyJztcbmltcG9ydCB7IExvYWRUYWJsZSB9IGZyb20gJy4uL2ZyYW1ld29yay90YWJsZS90YWJsZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVNYWlue1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIEpzTWFuYWdlci5JbnN0YW5jZS5Kc09uQXBwbGljYXRpb25RdWl0ID0gKCkgPT4gdGhpcy5vbkFwcGxpY2F0aW9uUXVpdCgpO1xuICAgICAgICBKc01hbmFnZXIuSW5zdGFuY2UuSnNPbkRpc3Bvc2UgPSAoKSA9PiB0aGlzLm9uRGlzcG9zZSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyBzdGFydCgpIHtcbiAgICAgICAgXG4gICAgICAgIHRyeXtcbiAgICAgICAgICAgIExvZ2dlci5sb2coXCJHYW1lIHN0YXJ0IGluIEpTLi4uLlwiKTtcblxuICAgICAgICAgICAgLy/liqDovb3mlbDmja7ooahcbiAgICAgICAgICAgIGF3YWl0IExvYWRUYWJsZSgpO1xuXG4gICAgICAgICAgICAvLyAvL+i/m+WFpeeZu+W9leaooeWdl1xuICAgICAgICAgICAgLy8gYXdhaXQgUy5TY2VuZU1hbmFnZXIubG9hZFNjZW5lKFNjZW5lRGVmLkxvZ2luU2NlbmUpO1xuICAgICAgICAgICAgYXdhaXQgUy5TY2VuZU1hbmFnZXIubG9hZFNjZW5lKFNjZW5lRGVmLkJhdHRsZVNjZW5lKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy9KU+WQr+WKqOWujOaIkO+8jOmAmuefpUMj5bGCXG4gICAgICAgICAgICBHYW1lTGF1bmNoLkluc3RhbmNlLkpzTHVhbmNoRmluaXNoKCk7XG4gICAgICAgIH1jYXRjaChleCl7XG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoZXgpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgIH1cblxuICAgIHB1YmxpYyBvbkFwcGxpY2F0aW9uUXVpdCgpOnZvaWQge1xuICAgICAgICBTLkdhbWVPYmplY3RQb29sLmNsZWFudXAodHJ1ZSk7XG4gICAgICAgIExvZ2dlci5sb2coXCJHYW1lIG9uQXBwbGljYXRpb25RdWl0IGluIEpTLi4uLlwiKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25EaXNwb3NlKCk6dm9pZCB7XG4gICAgICAgIFxuICAgICAgICBMb2dnZXIubG9nKFwiR2FtZSBvbkRpc3Bvc2UgaW4gSlMuLi4uXCIpO1xuICAgIH1cbn1cblxuIiwiaW1wb3J0IHsgVW5pdHlFbmdpbmUgfSBmcm9tIFwiY3NoYXJwXCI7XHJcbmltcG9ydCB7ICR0eXBlb2YgfSBmcm9tIFwicHVlcnRzXCI7XHJcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvbG9nZ2VyL0xvZ2dlclwiO1xyXG5pbXBvcnQgeyBCYXNlU2NlbmUgfSBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL3NjZW5lL0Jhc2VTY2VuZVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmF0dGxlU2NlbmUgZXh0ZW5kcyBCYXNlU2NlbmUge1xyXG5cclxuICAgIHB1YmxpYyBvbkVudGVyKCkge1xyXG4gICAgICAgIExvZ2dlci5sb2coXCJCYXR0bGVTY2VuZSBvbkVudGVyIH5cIik7XHJcbiAgICAgICAgbGV0IG9iakNXID0gVW5pdHlFbmdpbmUuR2FtZU9iamVjdC5GaW5kKFwiVGVhbTEvQ3ViZVdoaXRlXCIpO1xyXG4gICAgICAgIGxldCBvYmpDQiA9IFVuaXR5RW5naW5lLkdhbWVPYmplY3QuRmluZChcIlRlYW0yL0N1YmVCbHVlXCIpO1xyXG4gICAgICAgIGlmKG9iakNXICYmIG9iakNCKSB7XHJcbiAgICAgICAgICAgIGxldCBhZ2VudENXID0gb2JqQ1cuR2V0Q29tcG9uZW50KCR0eXBlb2YoVW5pdHlFbmdpbmUuQUkuTmF2TWVzaEFnZW50KSkgYXMgVW5pdHlFbmdpbmUuQUkuTmF2TWVzaEFnZW50O1xyXG4gICAgICAgICAgICBpZighYWdlbnRDVy5Jc051bGwoKSkge1xyXG4gICAgICAgICAgICAgICAgLy8gYWdlbnQuU2V0RGVzdGluYXRpb24ob2JqQ0IudHJhbnNmb3JtLnBvc2l0aW9uKTtcclxuICAgICAgICAgICAgICAgIGFnZW50Q1cuU2V0RGVzdGluYXRpb24obmV3IFVuaXR5RW5naW5lLlZlY3RvcjMoMCwwLC0yKSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBhZ2VudENCID0gb2JqQ0IuR2V0Q29tcG9uZW50KCR0eXBlb2YoVW5pdHlFbmdpbmUuQUkuTmF2TWVzaEFnZW50KSkgYXMgVW5pdHlFbmdpbmUuQUkuTmF2TWVzaEFnZW50O1xyXG4gICAgICAgICAgICBpZighYWdlbnRDQi5Jc051bGwoKSkge1xyXG4gICAgICAgICAgICAgICAgLy8gYWdlbnQuU2V0RGVzdGluYXRpb24ob2JqQ0IudHJhbnNmb3JtLnBvc2l0aW9uKTtcclxuICAgICAgICAgICAgICAgIGFnZW50Q0IuU2V0RGVzdGluYXRpb24obmV3IFVuaXR5RW5naW5lLlZlY3RvcjMoMCwwLDIpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBvbkNvbXBsZXRlKCk6UHJvbWlzZTxhbnk+IHtcclxuICAgICAgICBMb2dnZXIubG9nKFwiQmF0dGxlU2NlbmUgb25Db21wbGV0ZSB+XCIpO1xyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKVxyXG4gICAgfVxyXG4gICAgcHVibGljIG9uTGVhdmUoKSB7XHJcbiAgICAgICAgTG9nZ2VyLmxvZyhcIkJhdHRsZVNjZW5lIG9uTGVhdmUgflwiKTtcclxuICAgIH1cclxuXHJcbn0iLCJpbXBvcnQgeyBHYW1lT2JqZWN0UG9vbCB9IGZyb20gXCIuLi9mcmFtZXdvcmsvY29tbW9uL0dhbWVPYmplY3RQb29sXCI7XG5pbXBvcnQgeyBSZXNNYW5hZ2VyIH0gZnJvbSBcIi4uL2ZyYW1ld29yay9jb21tb24vUmVzTWFuYWdlclwiO1xuaW1wb3J0IHsgU2NlbmVNYW5hZ2VyIH0gZnJvbSBcIi4uL2ZyYW1ld29yay9zY2VuZS9TY2VuZU1hbmFnZXJcIjtcblxuZXhwb3J0ICBjbGFzcyBHYW1lQ29uZmlne1xuICAgIHB1YmxpYyBzdGF0aWMgZGVidWc6Ym9vbGVhbiA9IHRydWU7XG59XG5cbmV4cG9ydCBjbGFzcyBTe1xuICAgIHB1YmxpYyBzdGF0aWMgU2NlbmVNYW5hZ2VyID0gU2NlbmVNYW5hZ2VyLkluc3RhbmNlKFNjZW5lTWFuYWdlcik7XG4gICAgcHVibGljIHN0YXRpYyBHYW1lT2JqZWN0UG9vbCA9IEdhbWVPYmplY3RQb29sLkluc3RhbmNlKEdhbWVPYmplY3RQb29sKTtcbiAgICBwdWJsaWMgc3RhdGljIFJlc01hbmFnZXIgPSBSZXNNYW5hZ2VyLkluc3RhbmNlKFJlc01hbmFnZXIpO1xufVxuIiwiaW1wb3J0IEdhbWVNYWluIGZyb20gXCIuL2dhbWUvR2FtZU1haW5cIjtcclxuXHJcbm5ldyBHYW1lTWFpbigpLnN0YXJ0KCk7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY3NoYXJwXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInB1ZXJ0c1wiKTsiXSwic291cmNlUm9vdCI6IiJ9