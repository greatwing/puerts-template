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
/* harmony import */ var _framework_scene_SceneDef__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./framework/scene/SceneDef */ "./src/framework/scene/SceneDef.ts");
/* harmony import */ var _global_GameConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./global/GameConfig */ "./src/global/GameConfig.ts");
/* harmony import */ var _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./framework/logger/Logger */ "./src/framework/logger/Logger.ts");
// import {UnitTest} from './unittest/UnitTest';




// import { commonUI } from './data/ui/common';
// import { UIServerListItem } from './game/module/login/ui/UIServerListItem';
class GameMain {
    constructor() {
        csharp__WEBPACK_IMPORTED_MODULE_0__["JsManager"].Instance.JsOnApplicationQuit = () => this.onApplicationQuit();
        csharp__WEBPACK_IMPORTED_MODULE_0__["JsManager"].Instance.JsOnDispose = () => this.onDispose();
    }
    async start() {
        try {
            _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_3__["Logger"].log("Game start in JS....");
            // S.StoryManager.initialize();
            // //加载通用FairyGUI资源
            // await S.ResManager.loadFairyGUIPackage(commonUI.PackageName);
            // //do Unit Test
            // UnitTest.doTest();
            // //进入登录模块
            // await S.SceneManager.loadScene(SceneDef.LoginScene);
            await _global_GameConfig__WEBPACK_IMPORTED_MODULE_2__["S"].SceneManager.loadScene(_framework_scene_SceneDef__WEBPACK_IMPORTED_MODULE_1__["SceneDef"].BattleScene);
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
            _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_3__["Logger"].error(ex);
        }
    }
    onApplicationQuit() {
        // S.GameObjectPool.cleanup(true);
        _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_3__["Logger"].log("Game onApplicationQuit in JS....");
    }
    onDispose() {
        _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_3__["Logger"].log("Game onDispose in JS....");
    }
}
new GameMain().start();


/***/ }),

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
    // async loadFairyGUIPackage(packageName:string){
    //     try{
    //         let count = this._pkgMap.get(packageName);
    //         if(count == null || count < 1){
    //             //没有缓存，加载
    //             let address = packageName+"_fui.bytes";
    //             let task = NiceTS.ResourceManager.LoadFairyGUIPackage(address,packageName);
    //             await $promise(task);
    //             this._pkgMap.set(packageName, 1);
    //         }
    //         else{
    //             this._pkgMap.set(packageName, count+1);
    //         }
    //     }catch(ex){
    //         Logger.error(`Load fairyGUI :${packageName} : ${ex}`)
    //     }
    // }
    // public releaseFairyGUIPackage(packageName){
    //     let count = this._pkgMap.get(packageName);
    //     if(count!=null && count>1){
    //         this._pkgMap.set(packageName, count-1);
    //     }else{
    //         Logger.log(`release fagui package:${packageName}`);
    //         this._pkgMap.delete(packageName);
    //         NiceTS.ResourceManager.ReleaseFGUIPackage(packageName);
    //     }
    // }
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
// import { commonUI } from "../../data/ui/common";
// import { UIMessage } from "../../game/event/UIMessage";




class SceneManager extends _common_Singleton__WEBPACK_IMPORTED_MODULE_1__["Singleton"] {
    constructor() {
        super();
        this.currentScene = null;
    }
    async loadScene(scene) {
        try {
            // //打开Loading界面
            // S.UIManager.openLoading(commonUI.PackageName, commonUI.UILoadingPage);
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
            // //设置当前场景加载进度Timer
            // let progressInterval = setInterval(()=>{
            //     let progress = this.currentScene.finishCount/this.currentScene.totalCount;
            //     Logger.log("progress:"+progress + " = "+this.currentScene.finishCount + " = "+this.currentScene.totalCount);
            //     S.UIMessageManger.broadcast(
            //         UIMessage.MSG_SCENE_PROGRESS,
            //         progress*100);
            // }, 100);
            //加载资源
            await this.currentScene.loadAssetsAsync();
            // //加载完成
            // clearInterval(progressInterval)
            //  //关闭所有Page
            //  S.UIManager.closeAllPanels();
            await this.currentScene.onComplete();
            // S.UIManager.closeLoading();
        }
        catch (ex) {
            _logger_Logger__WEBPACK_IMPORTED_MODULE_2__["Logger"].log("load scene excep:" + ex);
        }
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
            _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_2__["Logger"].log(`objCW = ${objCW.name}`);
            let agent = objCW.GetComponent(Object(puerts__WEBPACK_IMPORTED_MODULE_1__["$typeof"])(csharp__WEBPACK_IMPORTED_MODULE_0__["UnityEngine"].AI.NavMeshAgent));
            if (!agent.IsNull()) {
                _framework_logger_Logger__WEBPACK_IMPORTED_MODULE_2__["Logger"].log(`find agent!!`);
                // agent.SetDestination(objCB.transform.position);
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


// import { StoryManager } from "../framework/ink/StoryManager";
// import { StoryMessageManager } from "../framework/ink/StoryMessageManager";
// import { GameSession } from "../framework/net/GameSession";
// import { HttpManager } from "../framework/net/HttpManager";
// import { SessionManager } from "../framework/net/SessionManager";

// import { UIManager } from "../framework/ui/UIManager";
// import { UIMessageManger } from "../game/event/UIMessageManager";
class GameConfig {
}
GameConfig.debug = true;
class S {
}
// public static UIManager = UIManager.Instance(UIManager);
// public static UIMessageManger = UIMessageManger.Instance(UIMessageManger);
S.SceneManager = _framework_scene_SceneManager__WEBPACK_IMPORTED_MODULE_2__["SceneManager"].Instance(_framework_scene_SceneManager__WEBPACK_IMPORTED_MODULE_2__["SceneManager"]);
S.GameObjectPool = _framework_common_GameObjectPool__WEBPACK_IMPORTED_MODULE_0__["GameObjectPool"].Instance(_framework_common_GameObjectPool__WEBPACK_IMPORTED_MODULE_0__["GameObjectPool"]);
S.ResManager = _framework_common_ResManager__WEBPACK_IMPORTED_MODULE_1__["ResManager"].Instance(_framework_common_ResManager__WEBPACK_IMPORTED_MODULE_1__["ResManager"]);


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL0dhbWVNYWluLnRzIiwid2VicGFjazovLy8uL3NyYy9mcmFtZXdvcmsvY29tbW9uL0dhbWVPYmplY3RQb29sLnRzIiwid2VicGFjazovLy8uL3NyYy9mcmFtZXdvcmsvY29tbW9uL1Jlc01hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZyYW1ld29yay9jb21tb24vU2luZ2xldG9uLnRzIiwid2VicGFjazovLy8uL3NyYy9mcmFtZXdvcmsvbG9nZ2VyL0xvZ2dlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZnJhbWV3b3JrL3NjZW5lL0Jhc2VTY2VuZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZnJhbWV3b3JrL3NjZW5lL1NjZW5lRGVmLnRzIiwid2VicGFjazovLy8uL3NyYy9mcmFtZXdvcmsvc2NlbmUvU2NlbmVGYWN0b3J5LnRzIiwid2VicGFjazovLy8uL3NyYy9mcmFtZXdvcmsvc2NlbmUvU2NlbmVNYW5hZ2VyLnRzIiwid2VicGFjazovLy8uL3NyYy9nYW1lL21vZHVsZS9wdnAvQmF0dGxlU2NlbmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dsb2JhbC9HYW1lQ29uZmlnLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcImNzaGFycFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInB1ZXJ0c1wiIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7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SyxDQUFDLFlBQVksQ0FBQyxzREFBTyxDQUFDLGtEQUFXLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxDQUFnQyxDQUFDO1lBQ3BHLElBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLEVBQUU7Z0JBQ2hCLCtEQUFNLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQztnQkFDMUIsa0RBQWtEO2FBQ3JEO1NBQ0o7SUFDTCxDQUFDO0lBQ00sVUFBVTtRQUNiLCtEQUFNLENBQUMsR0FBRyxDQUFDLDBCQUEwQixDQUFDLENBQUM7UUFDdkMsT0FBTyxPQUFPLENBQUMsT0FBTyxFQUFFO0lBQzVCLENBQUM7SUFDTSxPQUFPO1FBQ1YsK0RBQU0sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsQ0FBQztJQUN4QyxDQUFDO0NBRUo7Ozs7Ozs7Ozs7Ozs7QUM3QkQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQW9FO0FBQ1I7QUFDNUQsZ0VBQWdFO0FBQ2hFLDhFQUE4RTtBQUM5RSw4REFBOEQ7QUFDOUQsOERBQThEO0FBQzlELG9FQUFvRTtBQUNMO0FBQy9ELHlEQUF5RDtBQUN6RCxvRUFBb0U7QUFFN0QsTUFBTyxVQUFVOztBQUVOLGdCQUFLLEdBQVcsSUFBSSxDQUFDO0FBT2hDLE1BQU0sQ0FBQzs7QUFDViwyREFBMkQ7QUFDM0QsNkVBQTZFO0FBQy9ELGNBQVksR0FBRywwRUFBWSxDQUFDLFFBQVEsQ0FBQywwRUFBWSxDQUFDLENBQUM7QUFDbkQsZ0JBQWMsR0FBRywrRUFBYyxDQUFDLFFBQVEsQ0FBQywrRUFBYyxDQUFDLENBQUM7QUFDekQsWUFBVSxHQUFHLHVFQUFVLENBQUMsUUFBUSxDQUFDLHVFQUFVLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7O0FDekIvRCxtQzs7Ozs7Ozs7Ozs7QUNBQSxtQyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9HYW1lTWFpbi50c1wiKTtcbiIsIlxuLy8gaW1wb3J0IHtVbml0VGVzdH0gZnJvbSAnLi91bml0dGVzdC9Vbml0VGVzdCc7XG5pbXBvcnQgeyBKc01hbmFnZXIgLEdhbWVMYXVuY2ggfSBmcm9tICdjc2hhcnAnO1xuaW1wb3J0IHsgU2NlbmVEZWYgfSBmcm9tICcuL2ZyYW1ld29yay9zY2VuZS9TY2VuZURlZic7XG5pbXBvcnQgeyBTIH0gZnJvbSAnLi9nbG9iYWwvR2FtZUNvbmZpZyc7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tICcuL2ZyYW1ld29yay9sb2dnZXIvTG9nZ2VyJztcbi8vIGltcG9ydCB7IGNvbW1vblVJIH0gZnJvbSAnLi9kYXRhL3VpL2NvbW1vbic7XG4vLyBpbXBvcnQgeyBVSVNlcnZlckxpc3RJdGVtIH0gZnJvbSAnLi9nYW1lL21vZHVsZS9sb2dpbi91aS9VSVNlcnZlckxpc3RJdGVtJztcblxuXG5cbmNsYXNzIEdhbWVNYWlue1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIEpzTWFuYWdlci5JbnN0YW5jZS5Kc09uQXBwbGljYXRpb25RdWl0ID0gKCkgPT4gdGhpcy5vbkFwcGxpY2F0aW9uUXVpdCgpO1xuICAgICAgICBKc01hbmFnZXIuSW5zdGFuY2UuSnNPbkRpc3Bvc2UgPSAoKSA9PiB0aGlzLm9uRGlzcG9zZSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyBzdGFydCgpIHtcbiAgICAgICAgXG4gICAgICAgIHRyeXtcbiAgICAgICAgICAgIExvZ2dlci5sb2coXCJHYW1lIHN0YXJ0IGluIEpTLi4uLlwiKTtcblxuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBTLlN0b3J5TWFuYWdlci5pbml0aWFsaXplKCk7XG5cbiAgICAgIFxuICAgICAgICAgICAgLy8gLy/liqDovb3pgJrnlKhGYWlyeUdVSei1hOa6kFxuICAgICAgICAgICAgLy8gYXdhaXQgUy5SZXNNYW5hZ2VyLmxvYWRGYWlyeUdVSVBhY2thZ2UoY29tbW9uVUkuUGFja2FnZU5hbWUpO1xuXG4gICAgICAgICAgICAvLyAvL2RvIFVuaXQgVGVzdFxuICAgICAgICAgICAgLy8gVW5pdFRlc3QuZG9UZXN0KCk7XG5cbiAgICAgICAgICAgIC8vIC8v6L+b5YWl55m75b2V5qih5Z2XXG4gICAgICAgICAgICAvLyBhd2FpdCBTLlNjZW5lTWFuYWdlci5sb2FkU2NlbmUoU2NlbmVEZWYuTG9naW5TY2VuZSk7XG4gICAgICAgICAgICBhd2FpdCBTLlNjZW5lTWFuYWdlci5sb2FkU2NlbmUoU2NlbmVEZWYuQmF0dGxlU2NlbmUpO1xuXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vSlPlkK/liqjlrozmiJDvvIzpgJrnn6VDI+WxglxuICAgICAgICAgICAgR2FtZUxhdW5jaC5JbnN0YW5jZS5Kc0x1YW5jaEZpbmlzaCgpO1xuXG4gICAgICAgICAgICAvLyBsZXQgZXh0SXRlbSA9ICgpPT57XG4gICAgICAgICAgICAgICAgLy8gbGV0IGl0ZW0gPSAgbmV3IFVJU2VydmVyTGlzdEl0ZW0oKTtcbiAgICAgICAgICAgICAgIC8vIC8vIHBvb2wucHVzaChpdGVtKVxuICAgICAgICAgICAgICAgIC8vIHJldHVybiBpdGVtO1xuICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgLy8gRmFpcnlHVUkuVUlPYmplY3RGYWN0b3J5LlNldFBhY2thZ2VJdGVtRXh0ZW5zaW9uKFwidWk6Ly9sNjRkdW1rOWZlZWc1NFwiLGV4dEl0ZW0pXG4gICAgICAgICAgICBcblxuICAgICAgICB9Y2F0Y2goZXgpe1xuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKGV4KTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgcHVibGljIG9uQXBwbGljYXRpb25RdWl0KCk6dm9pZCB7XG5cbiAgICAgICAgLy8gUy5HYW1lT2JqZWN0UG9vbC5jbGVhbnVwKHRydWUpO1xuICAgICAgICBMb2dnZXIubG9nKFwiR2FtZSBvbkFwcGxpY2F0aW9uUXVpdCBpbiBKUy4uLi5cIik7XG4gICAgfVxuXG4gICAgcHVibGljIG9uRGlzcG9zZSgpOnZvaWQge1xuICAgICAgICBcbiAgICAgICAgTG9nZ2VyLmxvZyhcIkdhbWUgb25EaXNwb3NlIGluIEpTLi4uLlwiKTtcbiAgICB9XG4gICAgXG59XG5cbm5ldyBHYW1lTWFpbigpLnN0YXJ0KCk7XG5cbiIsIlxuaW1wb3J0IHsgU2luZ2xldG9uIH0gZnJvbSAnLi9TaW5nbGV0b24nO1xuaW1wb3J0IHsgUmVzTWFuYWdlciB9IGZyb20gJy4vUmVzTWFuYWdlcic7XG5pbXBvcnQgeyBVbml0eUVuZ2luZSB9IGZyb20gJ2NzaGFycCc7XG5cblxuXG4vLyAtLSBHYW1lT2JqZWN057yT5a2Y5rGgXG4vLyAtLSDms6jmhI/vvJpcbi8vIC0tIDHjgIHmiYDmnInpnIDopoHpooTorr7pg73ku47ov5nph4zliqDovb3vvIzkuI3opoHnm7TmjqXliLBSZXNvdXJjZXNNYW5hZ2Vy5Y675Yqg6L2977yM55Sx6L+Z6YeM57uf5LiA5YGa57yT5a2Y566h55CGXG4vLyAtLSAy44CB57yT5a2Y5YiG5Li65Lik6YOo5YiG77ya5LuO6LWE5rqQ5bGC5Yqg6L2955qE5Y6f5aeLR2FtZU9iamVjdChBc3NldCnvvIzku45HYW1lT2JqZWN05a6e5L6L5YyW5Ye65p2l55qE5aSa5LiqSW5zdFxuZXhwb3J0IGNsYXNzIEdhbWVPYmplY3RQb29sIGV4dGVuZHMgU2luZ2xldG9uPEdhbWVPYmplY3RQb29sPntcblxuICAgIHByaXZhdGUgX19jYWNoZVRyYW5zUm9vdCA9IG51bGw7XG4gICAgcHJpdmF0ZSBfX2dvUG9vbCA9IG5ldyBNYXAoKTtcbiAgICBwcml2YXRlIF9faW5zdENhY2hlOk1hcDxzdHJpbmcsQXJyYXk8YW55Pj4gPSBuZXcgTWFwPHN0cmluZyxBcnJheTxhbnk+PigpO1xuXG5cbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIGxldCBnbyA9IFVuaXR5RW5naW5lLkdhbWVPYmplY3QuRmluZChcIkdhbWVPYmplY3RDYWNoZVJvb3RcIik7XG5cbiAgICAgICAgaWYoZ28gPT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICAgIGdvID0gbmV3IFVuaXR5RW5naW5lLkdhbWVPYmplY3QoXCJHYW1lT2JqZWN0Q2FjaGVSb290XCIpO1xuICAgICAgICAgICAgVW5pdHlFbmdpbmUuT2JqZWN0LkRvbnREZXN0cm95T25Mb2FkKGdvKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX19jYWNoZVRyYW5zUm9vdCA9IGdvLnRyYW5zZm9ybTtcbiAgICB9XG5cbiAgICAvLy0tIOajgOa1i+aYr+WQpuW3sue7j+iiq+e8k+WtmFxuICAgIHB1YmxpYyBjaGVja0hhc0NhY2hlZChwYXRoOnN0cmluZyl7XG5cbiAgICAgICAgbGV0IGNhY2hlZEluc3Q6QXJyYXk8YW55PiA9IHRoaXMuX19pbnN0Q2FjaGUuZ2V0KHBhdGgpO1xuICAgICAgICBpZihjYWNoZWRJbnN0ICE9IHVuZGVmaW5lZCAmJiBjYWNoZWRJbnN0Lmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcG9vbGVkR28gPSB0aGlzLl9fZ29Qb29sLmdldChwYXRoKTtcbiAgICAgICAgcmV0dXJuIHBvb2xlZEdvICE9IHVuZGVmaW5lZDtcbiAgICB9XG5cblxuICAgIC8vLS0g57yT5a2Y5bm25a6e5L6L5YyWR2FtZU9iamVjdFxuICAgIHB1YmxpYyBjYWNoZUFuZEluc3RHYW1lT2JqZWN0KHBhdGg6c3RyaW5nLCBnbzphbnksIGluc3RfY291bnQ6bnVtYmVyID0gMSl7XG5cbiAgICAgICAgdGhpcy5fX2dvUG9vbC5zZXQocGF0aCwgZ28pO1xuICAgICAgICBpZihpbnN0X2NvdW50ID4gMCl7XG5cbiAgICAgICAgICAgIGxldCBjYWNoZWRJbnN0OkFycmF5PGFueT4gPSB0aGlzLl9faW5zdENhY2hlLmdldChwYXRoKTtcbiAgICAgICAgICAgIGZvcihsZXQgaTpudW1iZXIgPTA7IGkgPCBpbnN0X2NvdW50OyBpKyspe1xuXG4gICAgICAgICAgICAgICAgbGV0IGluc3QgPSBVbml0eUVuZ2luZS5HYW1lT2JqZWN0Lkluc3RhbnRpYXRlKGdvKSBhcyBVbml0eUVuZ2luZS5HYW1lT2JqZWN0O1xuICAgICAgICAgICAgICAgIGluc3QudHJhbnNmb3JtLlNldFBhcmVudCh0aGlzLl9fY2FjaGVUcmFuc1Jvb3QpO1xuICAgICAgICAgICAgICAgIGluc3QuU2V0QWN0aXZlKGZhbHNlKTtcblxuICAgICAgICAgICAgICAgIGNhY2hlZEluc3QucHVzaChpbnN0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vLS0g5bCd6K+V5LuO57yT5a2Y5Lit6I635Y+WXG4gICAgcHVibGljIHRyeUdldEZyb21DYWNoZShwYXRoOnN0cmluZyk6YW55e1xuXG4gICAgICAgIGlmKCF0aGlzLmNoZWNrSGFzQ2FjaGVkKHBhdGgpKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBjYWNoZWRJbnN0OkFycmF5PG9iamVjdD4gID0gdGhpcy5fX2luc3RDYWNoZS5nZXQocGF0aCk7XG4gICAgICAgIGlmKGNhY2hlZEluc3QgIT0gdW5kZWZpbmVkICYmIGNhY2hlZEluc3QubGVuZ3RoPjApe1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBsZXQgaW5zdCA9IGNhY2hlZEluc3QucG9wKCk7XG4gICAgICAgICAgICByZXR1cm4gaW5zdDtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBwb29sZWRHbyA9IHRoaXMuX19nb1Bvb2wuZ2V0KHBhdGgpO1xuICAgICAgICBpZihwb29sZWRHbyAhPSB1bmRlZmluZWQpe1xuICAgICAgICAgICAgbGV0IGluc3QgPSBVbml0eUVuZ2luZS5HYW1lT2JqZWN0Lkluc3RhbnRpYXRlKHBvb2xlZEdvKTtcbiAgICAgICAgICAgIHJldHVybiBpbnN0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuXG4gICAgLy/pooTliqDovb3vvJrlj6/mj5DkvpvliJ3lp4vlrp7kvovljJbkuKrmlbBcbiAgICBwdWJsaWMgYXN5bmMgcHJlTG9hZEdhbWVPYmplY3RBc3luYyhwYXRoOnN0cmluZywgaW5zdF9jb3VudDpudW1iZXIsIGNhbGxiYWNrOkZ1bmN0aW9uLC4uLnBhcmFtcyl7XG5cbiAgICAgICAgaWYodGhpcy5jaGVja0hhc0NhY2hlZChwYXRoKSl7XG4gICAgICAgICAgICBpZihjYWxsYmFjayE9bnVsbCl7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2socGFyYW1zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBnbyA9IGF3YWl0IFJlc01hbmFnZXIuSW5zdGFuY2UoUmVzTWFuYWdlcikubG9hZFByZWZhYihwYXRoKTtcbiAgICAgICAgaWYoZ28hPXVuZGVmaW5lZCl7XG4gICAgICAgICAgICB0aGlzLmNhY2hlQW5kSW5zdEdhbWVPYmplY3QocGF0aCwgZ28saW5zdF9jb3VudCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZihjYWxsYmFjayE9bnVsbCl7XG4gICAgICAgICAgICBjYWxsYmFjayhwYXJhbXMpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvLy0tIOW8guatpeiOt+WPlu+8muW/heimgeaXtuWKoOi9vVxuICAgIHB1YmxpYyBhc3luYyBnZXRHYW1lT2JqZWN0QXN5bmMocGF0aDpzdHJpbmcsIGNhbGxiYWNrOkZ1bmN0aW9uLC4uLnBhcmFtcyl7XG5cbiAgICAgICAgbGV0IGluc3Q6YW55ID0gdGhpcy50cnlHZXRGcm9tQ2FjaGUocGF0aCk7XG4gICAgICAgIGlmKGluc3QgPT1udWxsKXtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMucHJlTG9hZEdhbWVPYmplY3RBc3luYyhwYXRoLCAxLCBjYWxsYmFjaywgcGFyYW1zKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGluc3QgPSB0aGlzLnRyeUdldEZyb21DYWNoZShwYXRoKTtcbiAgICAgICAgaW5zdC5TZXRBY3RpdmUodHJ1ZSk7XG5cbiAgICAgICAgXG4gICAgfVxuXG5cbiAgICAvLy0tIOWbnuaUtlxuICAgIHB1YmxpYyByZWN5Y2xlR2FtZU9iamVjdChwYXRoOnN0cmluZywgaW5zdDphbnkpe1xuXG4gICAgICAgIGluc3QudHJhbnNmb3JtLlNldFBhcmVudCh0aGlzLl9fY2FjaGVUcmFuc1Jvb3QpO1xuICAgICAgICBpbnN0LlNldEFjdGl2ZShmYWxzZSk7XG5cbiAgICAgICAgbGV0IGNhY2hlZEluc3QgPSB0aGlzLl9faW5zdENhY2hlLmdldChwYXRoKSB8fCBuZXcgQXJyYXkoKTtcbiAgICAgICAgY2FjaGVkSW5zdC5wdXNoKGluc3QpO1xuXG4gICAgICAgIHRoaXMuX19pbnN0Q2FjaGUuc2V0KHBhdGgsIGNhY2hlZEluc3QpO1xuXG4gICAgfVxuXG5cbiAgICAvLy0tIOa4heeQhue8k+WtmFxuICAgIHB1YmxpYyBjbGVhbnVwKGluY2x1ZGVQb29sZWRHbzpib29sZWFuID0gZmFsc2Upe1xuXG4gICAgICAgIHRoaXMuX19pbnN0Q2FjaGUuZm9yRWFjaCgodmFsdWVzLCBrZXkpPT57XG5cbiAgICAgICAgICAgIGZvcihsZXQgaW5zdCBvZiB2YWx1ZXMpe1xuICAgICAgICAgICAgICAgIGlmKGluc3QgIT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgICAgIFVuaXR5RW5naW5lLkdhbWVPYmplY3QuRGVzdHJveShpbnN0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9faW5zdENhY2hlLmNsZWFyKCk7IFxuXG4gICAgICAgIGlmKGluY2x1ZGVQb29sZWRHbyl7XG4gICAgICAgICAgICB0aGlzLl9fZ29Qb29sLmZvckVhY2goKGdvLCBrZXkpPT57XG5cbiAgICAgICAgICAgICAgICBpZihnbyAhPSBudWxsKXtcbiAgICAgICAgICAgICAgICAgICAgUmVzTWFuYWdlci5JbnN0YW5jZShSZXNNYW5hZ2VyKS5yZWxlYXNlQWRkcmVzc0dPKGdvKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy5fX2dvUG9vbC5jbGVhcigpO1xuICAgICAgICB9XG5cbiAgICB9XG5cblxufSIsIlxuaW1wb3J0IHsgU2luZ2xldG9uIH0gZnJvbSAnLi9TaW5nbGV0b24nO1xuaW1wb3J0IHsgJHByb21pc2UgfSBmcm9tICdwdWVydHMnO1xuaW1wb3J0IHtOaWNlVFMsIFVuaXR5RW5naW5lfSBmcm9tICdjc2hhcnAnO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSAnLi4vbG9nZ2VyL0xvZ2dlcic7XG5cbmV4cG9ydCBjbGFzcyBSZXNNYW5hZ2VyIGV4dGVuZHMgU2luZ2xldG9uPFJlc01hbmFnZXI+e1xuXG4gICAgcHJpdmF0ZSBfcGtnTWFwOk1hcDxzdHJpbmcsbnVtYmVyPiA9IG5ldyBNYXA8c3RyaW5nLG51bWJlcj4oKTtcblxuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgLy8gYXN5bmMgbG9hZEZhaXJ5R1VJUGFja2FnZShwYWNrYWdlTmFtZTpzdHJpbmcpe1xuXG4gICAgLy8gICAgIHRyeXtcbiAgICAvLyAgICAgICAgIGxldCBjb3VudCA9IHRoaXMuX3BrZ01hcC5nZXQocGFja2FnZU5hbWUpO1xuICAgIC8vICAgICAgICAgaWYoY291bnQgPT0gbnVsbCB8fCBjb3VudCA8IDEpe1xuICAgIC8vICAgICAgICAgICAgIC8v5rKh5pyJ57yT5a2Y77yM5Yqg6L29XG4gICAgLy8gICAgICAgICAgICAgbGV0IGFkZHJlc3MgPSBwYWNrYWdlTmFtZStcIl9mdWkuYnl0ZXNcIjtcbiAgICAvLyAgICAgICAgICAgICBsZXQgdGFzayA9IE5pY2VUUy5SZXNvdXJjZU1hbmFnZXIuTG9hZEZhaXJ5R1VJUGFja2FnZShhZGRyZXNzLHBhY2thZ2VOYW1lKTtcbiAgICAvLyAgICAgICAgICAgICBhd2FpdCAkcHJvbWlzZSh0YXNrKTtcbiAgICAgICAgICAgICAgICBcbiAgICAvLyAgICAgICAgICAgICB0aGlzLl9wa2dNYXAuc2V0KHBhY2thZ2VOYW1lLCAxKTtcbiAgICAvLyAgICAgICAgIH1cbiAgICAvLyAgICAgICAgIGVsc2V7XG4gICAgLy8gICAgICAgICAgICAgdGhpcy5fcGtnTWFwLnNldChwYWNrYWdlTmFtZSwgY291bnQrMSk7XG4gICAgLy8gICAgICAgICB9XG4gICAgLy8gICAgIH1jYXRjaChleCl7XG4gICAgLy8gICAgICAgICBMb2dnZXIuZXJyb3IoYExvYWQgZmFpcnlHVUkgOiR7cGFja2FnZU5hbWV9IDogJHtleH1gKVxuICAgIC8vICAgICB9XG4gICAgLy8gfVxuICAgIFxuICAgIC8vIHB1YmxpYyByZWxlYXNlRmFpcnlHVUlQYWNrYWdlKHBhY2thZ2VOYW1lKXtcblxuICAgIC8vICAgICBsZXQgY291bnQgPSB0aGlzLl9wa2dNYXAuZ2V0KHBhY2thZ2VOYW1lKTtcbiAgICAvLyAgICAgaWYoY291bnQhPW51bGwgJiYgY291bnQ+MSl7XG4gICAgLy8gICAgICAgICB0aGlzLl9wa2dNYXAuc2V0KHBhY2thZ2VOYW1lLCBjb3VudC0xKTtcbiAgICAvLyAgICAgfWVsc2V7XG5cbiAgICAvLyAgICAgICAgIExvZ2dlci5sb2coYHJlbGVhc2UgZmFndWkgcGFja2FnZToke3BhY2thZ2VOYW1lfWApO1xuICAgIC8vICAgICAgICAgdGhpcy5fcGtnTWFwLmRlbGV0ZShwYWNrYWdlTmFtZSk7XG4gICAgLy8gICAgICAgICBOaWNlVFMuUmVzb3VyY2VNYW5hZ2VyLlJlbGVhc2VGR1VJUGFja2FnZShwYWNrYWdlTmFtZSk7XG4gICAgLy8gICAgIH1cbiAgICAvLyB9XG5cbiAgICBhc3luYyBsb2FkU2NlbmUoc2NlbmVOYW1lOnN0cmluZywgbW9kZSA9IFVuaXR5RW5naW5lLlNjZW5lTWFuYWdlbWVudC5Mb2FkU2NlbmVNb2RlLlNpbmdsZSl7XG4gICAgICAgIHRyeXtcbiAgICAgICAgICBcbiAgICAgICAgICAgIGxldCB0YXNrID0gTmljZVRTLlJlc291cmNlTWFuYWdlci5Mb2FkU2NlbmUoc2NlbmVOYW1lLCBtb2RlLChwcm9ncmVzczpOdW1iZXIpPT57XG4gICAgICAgICAgICAgICAgTG9nZ2VyLmxvZyhcImxvYWQgc2NlbmU6IFwiK3Byb2dyZXNzKVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGxldCBzY2VuSW5zdGFuY2UgPSBhd2FpdCAkcHJvbWlzZSh0YXNrKVxuICAgICAgICAgICAgcmV0dXJuIHNjZW5JbnN0YW5jZVxuXG4gICAgICAgIH1jYXRjaChleCl7XG5cbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihgTG9hZCBTY2VuZSA6JHtzY2VuZU5hbWV9IDogJHtleH1gKVxuXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgYXN5bmMgdW5sb2FkU2NlbmUoc2NlbmVJbnN0YW5jZTpVbml0eUVuZ2luZS5SZXNvdXJjZU1hbmFnZW1lbnQuUmVzb3VyY2VQcm92aWRlcnMuU2NlbmVJbnN0YW5jZSl7XG4gICAgICAgIHRyeXtcbiAgICAgICAgICAgIGxldCB0YXNrPSBOaWNlVFMuUmVzb3VyY2VNYW5hZ2VyLlVubG9hZFNjZW5lKHNjZW5lSW5zdGFuY2UpXG4gICAgICAgICAgICBsZXQgZ28gPSBhd2FpdCAkcHJvbWlzZSh0YXNrKTtcbiAgICAgICAgICAgIHJldHVybiBnbztcbiAgICAgICAgfWNhdGNoKGV4KXtcblxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKGBVbmxvYWQgc2NlbmUgIDogJHtleH1gKVxuXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyB1bmxvYWRTY2VuZUJ5TmFtZShzY2VuZU5hbWU6c3RyaW5nKXtcblxuICAgICAgICBOaWNlVFMuUmVzb3VyY2VNYW5hZ2VyLlVubG9hZFNjZW5lQnlOYW1lKHNjZW5lTmFtZSk7XG4gICAgfVxuXG4gICAgYXN5bmMgbG9hZFByZWZhYihhZGRyZXNzOnN0cmluZyl7XG5cbiAgICAgICAgdHJ5e1xuICAgICAgICAgICAgbGV0IHRhc2s9IE5pY2VUUy5SZXNvdXJjZU1hbmFnZXIuTG9hZFByZWZhYihhZGRyZXNzKTtcbiAgICAgICAgICAgIGxldCBnbyA9IGF3YWl0ICRwcm9taXNlKHRhc2spO1xuICAgICAgICAgICAgcmV0dXJuIGdvO1xuICAgICAgICB9Y2F0Y2goZXgpe1xuXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoYExvYWQgcHJlZmFiIDoke2FkZHJlc3N9IDogJHtleH1gKVxuXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgYXN5bmMgbG9hZFRleHRBc3NldChhZGRyZXNzOnN0cmluZyl7XG5cbiAgICAgICAgdHJ5e1xuICAgICAgICAgICAgbGV0IHRhc2sgPSBOaWNlVFMuUmVzb3VyY2VNYW5hZ2VyLkxvYWRUZXh0QXNzZXQoYWRkcmVzcyk7XG4gICAgICAgICAgICBsZXQgZ28gPSBhd2FpdCAkcHJvbWlzZSh0YXNrKTtcbiAgICAgICAgICAgIHJldHVybiBnbztcbiAgICAgICAgfWNhdGNoKGV4KXtcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihgTG9hZCB0ZXh0YXNzZXQgOiR7YWRkcmVzc30gOiAke2V4fWApXG5cbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBhc3luYyBsb2FkVGV4dEJ5dGVzKGFkZHJlc3M6c3RyaW5nKXtcblxuICAgICAgICB0cnl7XG4gICAgICAgICAgICBsZXQgdGFzayA9IE5pY2VUUy5SZXNvdXJjZU1hbmFnZXIuTG9hZFRleHRCeXRlcyhhZGRyZXNzKTtcbiAgICAgICAgICAgIGxldCBieXRlcyA9IGF3YWl0ICRwcm9taXNlKHRhc2spO1xuICAgICAgICAgICAgcmV0dXJuIGJ5dGVzO1xuICAgICAgICB9Y2F0Y2goZXgpe1xuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKGBMb2FkVGV4dEJ5dGVzIDoke2FkZHJlc3N9IDogJHtleH1gKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXN5bmMgbG9hZFNwcml0ZShhZGRyZXNzOnN0cmluZyl7XG5cbiAgICAgICAgdHJ5e1xuICAgICAgICAgICAgbGV0IHRhc2sgPSBOaWNlVFMuUmVzb3VyY2VNYW5hZ2VyLkxvYWRTcHJpdGUoYWRkcmVzcyk7XG4gICAgICAgICAgICBsZXQgZ28gPSBhd2FpdCAkcHJvbWlzZSh0YXNrKTtcbiAgICAgICAgICAgIHJldHVybiBnbztcblxuICAgICAgICB9Y2F0Y2goZXgpe1xuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKGBMb2FkIHNwcml0ZSA6JHthZGRyZXNzfSA6ICR7ZXh9YClcblxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIHB1YmxpYyByZWxlYXNlQWRkcmVzc0dPKGdvOmFueSl7XG5cbiAgICAgICAgTmljZVRTLlJlc291cmNlTWFuYWdlci5SZWxlYXNlQWRkcmVzc0dPKGdvKTtcbiAgICB9XG5cblxuICAgIFxufSIsIlxuXG5leHBvcnQgY2xhc3MgU2luZ2xldG9uPFQ+e1xuXG4gICAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2U6YW55ID0gbnVsbDtcblxuICAgIHB1YmxpYyBzdGF0aWMgSW5zdGFuY2U8VD4oIGM6IHsgbmV3KCk6IFQgfSApIDogVHtcblxuICAgICAgICBpZih0aGlzLmluc3RhbmNlID09IG51bGwpe1xuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZSA9IG5ldyBjKCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcbiAgICB9XG5cbn0iLCJpbXBvcnQgeyBVbml0eUVuZ2luZSB9IGZyb20gJ2NzaGFycCc7XG5pbXBvcnQgeyBHYW1lQ29uZmlnIH0gZnJvbSAnLi4vLi4vZ2xvYmFsL0dhbWVDb25maWcnO1xuZW51bSBMb2dUeXBlIHtcblx0RXJyb3IgPSAwLFxuXHRBc3NlcnQgPSAxLFxuXHRXYXJuaW5nID0gMixcblx0TG9nID0gMyxcblx0RXhjZXB0aW9uID0gNFxufVxuXG5leHBvcnQgY2xhc3MgTG9nZ2Vye1xuICAgIHByaXZhdGUgIHN0YXRpYyAgdW5pdHlfbG9nX3RhcmdldCA9IG51bGw7XG5cbiAgICBzdGF0aWMgZ2V0UHJpbnRTdGFjayh0eXBlOiBMb2dUeXBlLCBzaG93U3RhY2sgOiBib29sZWFuLCAuLi5hcmdzKSB7XG4gICAgICAgIGxldCBtZXNzYWdlID0gJyc7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IGFyZ3NbaV07XG4gICAgICAgICAgICBpZiAodHlwZW9mIGVsZW1lbnQgPT09ICdvYmplY3QnICYmIExvZ2dlci5MT0dfT0JKRUNUX1RPX0pTT04pIHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlICs9IEpTT04uc3RyaW5naWZ5KGVsZW1lbnQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlICs9IGVsZW1lbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaSA8IGFyZ3MubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgICAgIG1lc3NhZ2UgKz0gJyAnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgXG4gICAgICAgIGlmIChzaG93U3RhY2sgfHwgVW5pdHlFbmdpbmUuQXBwbGljYXRpb24uaXNFZGl0b3IpIHtcbiAgICAgICAgICAgIHZhciBzdGFja3MgPSBuZXcgRXJyb3IoKS5zdGFjay5zcGxpdCgnXFxuJyk7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMzsgaSA8IHN0YWNrcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGxpbmUgPSBzdGFja3NbaV07XG4gICAgICAgICAgICAgICAgbWVzc2FnZSArPSAnXFxuJztcbiAgICAgICAgICAgICAgICBtZXNzYWdlICs9IGxpbmU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgaWYgKCFMb2dnZXIudW5pdHlfbG9nX3RhcmdldCkge1xuICAgICAgICAgICAgTG9nZ2VyLnVuaXR5X2xvZ190YXJnZXQgPSBuZXcgVW5pdHlFbmdpbmUuT2JqZWN0KCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbWVzc2FnZTtcbiAgICB9XG5cbiAgICBcblxuXHRzdGF0aWMgbG9nKC4uLmFyZ3MpOiB2b2lke1xuICAgICAgICBpZighR2FtZUNvbmZpZy5kZWJ1ZykgcmV0dXJuO1xuXG4gICAgICAgIGxldCBtc2cgPSBMb2dnZXIuZ2V0UHJpbnRTdGFjayhMb2dUeXBlLkxvZywgdHJ1ZSwgYXJncyk7XG4gICAgICAgIGNvbnNvbGUubG9nKG1zZyk7XG4gICAgfVxuXG5cdC8qKlxuXHQgKiBPdXRwdXRzIGEgd2FybmluZyBtZXNzYWdlIHRvIHRoZSBMb2dnZXIuXG5cdCAqIEBwYXJhbSBtZXNzYWdlICBsaXN0IG9mIEphdmFTY3JpcHQgb2JqZWN0cyB0byBvdXRwdXQuIFRoZSBzdHJpbmcgcmVwcmVzZW50YXRpb25zIG9mIGVhY2ggb2YgdGhlc2Ugb2JqZWN0cyBhcmUgYXBwZW5kZWQgdG9nZXRoZXIgaW4gdGhlIG9yZGVyIGxpc3RlZCBhbmQgb3V0cHV0LlxuXHQgKi9cblx0c3RhdGljIHdhcm4oLi4uYXJncyk6IHZvaWR7XG4gICAgICAgIGlmKCFHYW1lQ29uZmlnLmRlYnVnKSByZXR1cm47XG5cbiAgICAgICAgbGV0IG1zZyA9IExvZ2dlci5nZXRQcmludFN0YWNrKExvZ1R5cGUuV2FybmluZywgdHJ1ZSwgYXJncyk7XG4gICAgICAgIGNvbnNvbGUud2Fybihtc2cpO1xuICAgIH1cblxuXHQvKipcblx0ICogT3V0cHV0cyBhbiBlcnJvciBtZXNzYWdlIHRvIHRoZSBMb2dnZXIuXG5cdCAqIEBwYXJhbSBtZXNzYWdlIEEgbGlzdCBvZiBKYXZhU2NyaXB0IG9iamVjdHMgdG8gb3V0cHV0LiBUaGUgc3RyaW5nIHJlcHJlc2VudGF0aW9ucyBvZiBlYWNoIG9mIHRoZXNlIG9iamVjdHMgYXJlIGFwcGVuZGVkIHRvZ2V0aGVyIGluIHRoZSBvcmRlciBsaXN0ZWQgYW5kIG91dHB1dC5cblx0ICovXG5cdHN0YXRpYyBlcnJvciguLi5hcmdzKTogdm9pZHtcbiAgICAgICAgaWYoIUdhbWVDb25maWcuZGVidWcpIHJldHVybjtcblxuICAgICAgICBsZXQgbXNnID0gTG9nZ2VyLmdldFByaW50U3RhY2soTG9nVHlwZS5FcnJvciwgdHJ1ZSwgYXJncyk7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IobXNnKTtcbiAgICB9XG5cblx0LyoqIE91dHB1dHMgYSBzdGFjayB0cmFjZSB0byB0aGUgTG9nZ2VyLlxuXHQgKiBAcGFyYW0gbWVzc2FnZSBBIGxpc3Qgb2YgSmF2YVNjcmlwdCBvYmplY3RzIHRvIG91dHB1dC4gVGhlIHN0cmluZyByZXByZXNlbnRhdGlvbnMgb2YgZWFjaCBvZiB0aGVzZSBvYmplY3RzIGFyZSBhcHBlbmRlZCB0b2dldGhlciBpbiB0aGUgb3JkZXIgbGlzdGVkIGFuZCBvdXRwdXQuXG5cdCovXG5cdHN0YXRpYyB0cmFjZSguLi5hcmdzKTogdm9pZHtcbiAgICAgICAgaWYoIUdhbWVDb25maWcuZGVidWcpIHJldHVybjtcbiAgICAgICAgXG4gICAgICAgIGxldCBtc2cgPSBMb2dnZXIuZ2V0UHJpbnRTdGFjayhMb2dUeXBlLkxvZywgdHJ1ZSwgYXJncyk7XG4gICAgICAgIGNvbnNvbGUubG9nKG1zZyk7XG4gICAgfVxuXG5cdC8qKiBMb2cgSmF2YVNjcmlwdCBPYmplY3RzIGFzIEpTT04gZm9ybWF0ICovXG5cdHN0YXRpYyBMT0dfT0JKRUNUX1RPX0pTT04oLi4uYXJncyk6IGJvb2xlYW57XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxufSIsImltcG9ydCB7IFVuaXR5RW5naW5lIH0gZnJvbSBcImNzaGFycFwiO1xuaW1wb3J0IHsgUyB9IGZyb20gXCIuLi8uLi9nbG9iYWwvR2FtZUNvbmZpZ1wiO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQmFzZVNjZW5le1xuXG4gICAgcHJpdmF0ZSBwcmVsb2FkUHJlZmFiOk1hcDxzdHJpbmcsbnVtYmVyPjtcbiAgICBwcml2YXRlIHNjZW5lSW5zdGFuY2U6VW5pdHlFbmdpbmUuUmVzb3VyY2VNYW5hZ2VtZW50LlJlc291cmNlUHJvdmlkZXJzLlNjZW5lSW5zdGFuY2VcblxuICAgIHB1YmxpYyBmaW5pc2hDb3VudCA9IDA7XG4gICAgcHVibGljIHRvdGFsQ291bnQgPSAwO1xuXG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgdGhpcy5wcmVsb2FkUHJlZmFiID0gbmV3IE1hcDxzdHJpbmcsbnVtYmVyPigpO1xuICAgICAgICB0aGlzLmZpbmlzaENvdW50ID0gMDtcbiAgICB9XG5cbiAgICBwdWJsaWMgYWRkUHJlbG9hZFByZWZhYihhZGRyZXNzOnN0cmluZywgaW5zdENvdW50KXtcbiAgICAgICAgaWYoIXRoaXMucHJlbG9hZFByZWZhYi5oYXMoYWRkcmVzcykpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMucHJlbG9hZFByZWZhYi5zZXQoYWRkcmVzcywgaW5zdENvdW50KTtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIHRoaXMucHJlbG9hZFByZWZhYi5zZXQoYWRkcmVzcywgdGhpcy5wcmVsb2FkUHJlZmFiLmdldChhZGRyZXNzKSArIGluc3RDb3VudCk7XG4gICAgfVxuXG4gICAgcHVibGljIHNldFNjZW5lSW5zdGFuY2Uoc2NlbmVJbnN0YW5jZTpVbml0eUVuZ2luZS5SZXNvdXJjZU1hbmFnZW1lbnQuUmVzb3VyY2VQcm92aWRlcnMuU2NlbmVJbnN0YW5jZSl7XG4gICAgICAgIHRoaXMuc2NlbmVJbnN0YW5jZSA9IHNjZW5lSW5zdGFuY2U7XG4gICAgfVxuXG4gICAgcHVibGljIGFic3RyYWN0IG9uRW50ZXIoKTtcbiAgICBwdWJsaWMgYWJzdHJhY3Qgb25Db21wbGV0ZSgpOlByb21pc2U8YW55PjtcbiAgICBwdWJsaWMgYWJzdHJhY3Qgb25MZWF2ZSgpO1xuXG4gICAgcHVibGljIGFzeW5jIGxvYWRBc3NldHNBc3luYygpe1xuXG4gICAgICAgIHRoaXMudG90YWxDb3VudCA9IHRoaXMucHJlbG9hZFByZWZhYi5zaXplO1xuXG4gICAgICAgIGxldCBwcmVtaXNlcyA9IFtdO1xuXG4gICAgICAgIHRoaXMucHJlbG9hZFByZWZhYi5mb3JFYWNoKCh2YWx1ZSwga2V5KT0+e1xuICAgICAgICAgICAgbGV0IHByZW1pc2UgPSBTLkdhbWVPYmplY3RQb29sLnByZUxvYWRHYW1lT2JqZWN0QXN5bmMoa2V5LCB2YWx1ZSwoKT0+e1xuICAgICAgICAgICAgICAgIHRoaXMuZmluaXNoQ291bnQrKztcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBwcmVtaXNlcy5wdXNoKHByZW1pc2UpO1xuICAgICAgICB9KTtcblxuICAgICAgICBhd2FpdCBQcm9taXNlLmFsbChwcmVtaXNlcyk7XG4gICAgfVxuXG4gICAgcHVibGljIG9uRGVzdHJveSgpe1xuIFxuICAgICAgICAvL+a4heeQhui1hOa6kOe8k+WtmFxuICAgICAgICBTLkdhbWVPYmplY3RQb29sLmNsZWFudXAodHJ1ZSk7XG5cbiAgICAgICAgLy/ljbjovb3lnLrmma9cbiAgICAgICAgUy5SZXNNYW5hZ2VyLnVubG9hZFNjZW5lKHRoaXMuc2NlbmVJbnN0YW5jZSk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLnByZWxvYWRQcmVmYWIuY2xlYXIoKTtcbiAgICB9XG59IiwiZXhwb3J0IGVudW0gU2NlbmVEZWYge1xuICAgIEJhdHRsZVNjZW5lID0gXCJCYXR0bGVTY2VuZVwiLFxufSIsImltcG9ydCBCYXR0bGVTY2VuZSBmcm9tIFwiLi4vLi4vZ2FtZS9tb2R1bGUvcHZwL0JhdHRsZVNjZW5lXCI7XG5pbXBvcnQgeyBCYXNlU2NlbmUgfSBmcm9tIFwiLi9CYXNlU2NlbmVcIjtcbmltcG9ydCB7IFNjZW5lRGVmIH0gZnJvbSBcIi4vU2NlbmVEZWZcIjtcblxuXG5cbmV4cG9ydCBjbGFzcyBTY2VuZUZhY3Rvcnl7XG5cblxuICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlU2NlbmUoc2NlbmVOYW1lOnN0cmluZyk6QmFzZVNjZW5le1xuXG4gICAgICAgIGxldCBzY2VuZTpCYXNlU2NlbmUgPSBudWxsO1xuXG4gICAgICAgIHN3aXRjaCAoc2NlbmVOYW1lKXtcbiAgICAgICAgICAgIGNhc2UgU2NlbmVEZWYuQmF0dGxlU2NlbmU6XG4gICAgICAgICAgICAgICAgc2NlbmUgPSBuZXcgQmF0dGxlU2NlbmUoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzY2VuZTtcbiAgICB9XG59IiwiLy8gaW1wb3J0IHsgY29tbW9uVUkgfSBmcm9tIFwiLi4vLi4vZGF0YS91aS9jb21tb25cIjtcbi8vIGltcG9ydCB7IFVJTWVzc2FnZSB9IGZyb20gXCIuLi8uLi9nYW1lL2V2ZW50L1VJTWVzc2FnZVwiO1xuaW1wb3J0IHsgUyB9IGZyb20gXCIuLi8uLi9nbG9iYWwvR2FtZUNvbmZpZ1wiO1xuaW1wb3J0IHsgU2luZ2xldG9uIH0gZnJvbSBcIi4uL2NvbW1vbi9TaW5nbGV0b25cIjtcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCIuLi9sb2dnZXIvTG9nZ2VyXCI7XG5pbXBvcnQgeyBCYXNlU2NlbmUgfSBmcm9tIFwiLi9CYXNlU2NlbmVcIjtcbmltcG9ydCB7IFNjZW5lRmFjdG9yeSB9IGZyb20gXCIuL1NjZW5lRmFjdG9yeVwiO1xuXG5cblxuXG5leHBvcnQgY2xhc3MgU2NlbmVNYW5hZ2VyIGV4dGVuZHMgU2luZ2xldG9uPFNjZW5lTWFuYWdlcj57XG5cbiAgICBwcml2YXRlIGN1cnJlbnRTY2VuZTpCYXNlU2NlbmUgPSBudWxsO1xuXG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgbG9hZFNjZW5lKHNjZW5lOnN0cmluZyl7XG4gICAgICAgIFxuICAgICAgICB0cnl7XG5cbiAgICAgICAgICAgIC8vIC8v5omT5byATG9hZGluZ+eVjOmdolxuICAgICAgICAgICAgLy8gUy5VSU1hbmFnZXIub3BlbkxvYWRpbmcoY29tbW9uVUkuUGFja2FnZU5hbWUsIGNvbW1vblVJLlVJTG9hZGluZ1BhZ2UpO1xuXG4gICAgICAgICAgICAvL+a4heeQhuaXp+WcuuaZr1xuICAgICAgICAgICAgaWYodGhpcy5jdXJyZW50U2NlbmUpe1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFNjZW5lLm9uTGVhdmUoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRTY2VuZS5vbkRlc3Ryb3koKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy/lvIDlp4vliqDovb3lnLrmma9cbiAgICAgICAgICAgIGxldCBzY2VuZUluc3RhbmNlID0gYXdhaXQgUy5SZXNNYW5hZ2VyLmxvYWRTY2VuZShzY2VuZSk7XG5cbiAgICAgICAgICAgIC8v5byA5aeL5Yqg6L296L+b5YWl5Zy65pmv55qE6LWE5rqQXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRTY2VuZSA9ICBTY2VuZUZhY3RvcnkuY3JlYXRlU2NlbmUoc2NlbmUpO1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50U2NlbmUuc2V0U2NlbmVJbnN0YW5jZShzY2VuZUluc3RhbmNlKTtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFNjZW5lLm9uRW50ZXIoKTtcblxuICAgICAgICAgICAgLy8gLy/orr7nva7lvZPliY3lnLrmma/liqDovb3ov5vluqZUaW1lclxuICAgICAgICAgICAgLy8gbGV0IHByb2dyZXNzSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKT0+e1xuXG4gICAgICAgICAgICAvLyAgICAgbGV0IHByb2dyZXNzID0gdGhpcy5jdXJyZW50U2NlbmUuZmluaXNoQ291bnQvdGhpcy5jdXJyZW50U2NlbmUudG90YWxDb3VudDtcbiAgICAgICAgICAgIC8vICAgICBMb2dnZXIubG9nKFwicHJvZ3Jlc3M6XCIrcHJvZ3Jlc3MgKyBcIiA9IFwiK3RoaXMuY3VycmVudFNjZW5lLmZpbmlzaENvdW50ICsgXCIgPSBcIit0aGlzLmN1cnJlbnRTY2VuZS50b3RhbENvdW50KTtcblxuICAgICAgICAgICAgLy8gICAgIFMuVUlNZXNzYWdlTWFuZ2VyLmJyb2FkY2FzdChcbiAgICAgICAgICAgIC8vICAgICAgICAgVUlNZXNzYWdlLk1TR19TQ0VORV9QUk9HUkVTUyxcbiAgICAgICAgICAgIC8vICAgICAgICAgcHJvZ3Jlc3MqMTAwKTtcblxuICAgICAgICAgICAgLy8gfSwgMTAwKTtcblxuICAgICAgICAgICAgLy/liqDovb3otYTmupBcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuY3VycmVudFNjZW5lLmxvYWRBc3NldHNBc3luYygpO1xuXG4gICAgICAgICAgICAvLyAvL+WKoOi9veWujOaIkFxuICAgICAgICAgICAgLy8gY2xlYXJJbnRlcnZhbChwcm9ncmVzc0ludGVydmFsKVxuXG4gICAgICAgICAgICAvLyAgLy/lhbPpl63miYDmnIlQYWdlXG4gICAgICAgICAgICAvLyAgUy5VSU1hbmFnZXIuY2xvc2VBbGxQYW5lbHMoKTtcblxuICAgICAgICAgICAgYXdhaXQgdGhpcy5jdXJyZW50U2NlbmUub25Db21wbGV0ZSgpXG4gICAgICAgICAgICAvLyBTLlVJTWFuYWdlci5jbG9zZUxvYWRpbmcoKTtcblxuICAgICAgICB9Y2F0Y2goZXgpe1xuICAgICAgICAgICAgTG9nZ2VyLmxvZyhcImxvYWQgc2NlbmUgZXhjZXA6XCIrZXgpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgIH1cblxuXG5cbiAgICBcbn0iLCJpbXBvcnQgeyBVbml0eUVuZ2luZSB9IGZyb20gXCJjc2hhcnBcIjtcclxuaW1wb3J0IHsgJHR5cGVvZiB9IGZyb20gXCJwdWVydHNcIjtcclxuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9sb2dnZXIvTG9nZ2VyXCI7XHJcbmltcG9ydCB7IEJhc2VTY2VuZSB9IGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvc2NlbmUvQmFzZVNjZW5lXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCYXR0bGVTY2VuZSBleHRlbmRzIEJhc2VTY2VuZSB7XHJcblxyXG4gICAgcHVibGljIG9uRW50ZXIoKSB7XHJcbiAgICAgICAgTG9nZ2VyLmxvZyhcIkJhdHRsZVNjZW5lIG9uRW50ZXIgflwiKTtcclxuICAgICAgICBsZXQgb2JqQ1cgPSBVbml0eUVuZ2luZS5HYW1lT2JqZWN0LkZpbmQoXCJUZWFtMS9DdWJlV2hpdGVcIik7XHJcbiAgICAgICAgbGV0IG9iakNCID0gVW5pdHlFbmdpbmUuR2FtZU9iamVjdC5GaW5kKFwiVGVhbTIvQ3ViZUJsdWVcIik7XHJcbiAgICAgICAgaWYob2JqQ1cgJiYgb2JqQ0IpIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmxvZyhgb2JqQ1cgPSAke29iakNXLm5hbWV9YClcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBhZ2VudCA9IG9iakNXLkdldENvbXBvbmVudCgkdHlwZW9mKFVuaXR5RW5naW5lLkFJLk5hdk1lc2hBZ2VudCkpIGFzIFVuaXR5RW5naW5lLkFJLk5hdk1lc2hBZ2VudDtcclxuICAgICAgICAgICAgaWYoIWFnZW50LklzTnVsbCgpKSB7XHJcbiAgICAgICAgICAgICAgICBMb2dnZXIubG9nKGBmaW5kIGFnZW50ISFgKVxyXG4gICAgICAgICAgICAgICAgLy8gYWdlbnQuU2V0RGVzdGluYXRpb24ob2JqQ0IudHJhbnNmb3JtLnBvc2l0aW9uKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBvbkNvbXBsZXRlKCk6UHJvbWlzZTxhbnk+IHtcclxuICAgICAgICBMb2dnZXIubG9nKFwiQmF0dGxlU2NlbmUgb25Db21wbGV0ZSB+XCIpO1xyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKVxyXG4gICAgfVxyXG4gICAgcHVibGljIG9uTGVhdmUoKSB7XHJcbiAgICAgICAgTG9nZ2VyLmxvZyhcIkJhdHRsZVNjZW5lIG9uTGVhdmUgflwiKTtcclxuICAgIH1cclxuXHJcbn0iLCJpbXBvcnQgeyBHYW1lT2JqZWN0UG9vbCB9IGZyb20gXCIuLi9mcmFtZXdvcmsvY29tbW9uL0dhbWVPYmplY3RQb29sXCI7XG5pbXBvcnQgeyBSZXNNYW5hZ2VyIH0gZnJvbSBcIi4uL2ZyYW1ld29yay9jb21tb24vUmVzTWFuYWdlclwiO1xuLy8gaW1wb3J0IHsgU3RvcnlNYW5hZ2VyIH0gZnJvbSBcIi4uL2ZyYW1ld29yay9pbmsvU3RvcnlNYW5hZ2VyXCI7XG4vLyBpbXBvcnQgeyBTdG9yeU1lc3NhZ2VNYW5hZ2VyIH0gZnJvbSBcIi4uL2ZyYW1ld29yay9pbmsvU3RvcnlNZXNzYWdlTWFuYWdlclwiO1xuLy8gaW1wb3J0IHsgR2FtZVNlc3Npb24gfSBmcm9tIFwiLi4vZnJhbWV3b3JrL25ldC9HYW1lU2Vzc2lvblwiO1xuLy8gaW1wb3J0IHsgSHR0cE1hbmFnZXIgfSBmcm9tIFwiLi4vZnJhbWV3b3JrL25ldC9IdHRwTWFuYWdlclwiO1xuLy8gaW1wb3J0IHsgU2Vzc2lvbk1hbmFnZXIgfSBmcm9tIFwiLi4vZnJhbWV3b3JrL25ldC9TZXNzaW9uTWFuYWdlclwiO1xuaW1wb3J0IHsgU2NlbmVNYW5hZ2VyIH0gZnJvbSBcIi4uL2ZyYW1ld29yay9zY2VuZS9TY2VuZU1hbmFnZXJcIjtcbi8vIGltcG9ydCB7IFVJTWFuYWdlciB9IGZyb20gXCIuLi9mcmFtZXdvcmsvdWkvVUlNYW5hZ2VyXCI7XG4vLyBpbXBvcnQgeyBVSU1lc3NhZ2VNYW5nZXIgfSBmcm9tIFwiLi4vZ2FtZS9ldmVudC9VSU1lc3NhZ2VNYW5hZ2VyXCI7XG5cbmV4cG9ydCAgY2xhc3MgR2FtZUNvbmZpZ3tcblxuICAgIHB1YmxpYyBzdGF0aWMgZGVidWc6Ym9vbGVhbiA9IHRydWU7XG5cbiAgICAvLyBwdWJsaWMgc3RhdGljIHJlYWxtU2VydmVySVA6c3RyaW5nID0gXCIxMjcuMC4wLjFcIjsgXG4gICAgLy8gcHVibGljIHN0YXRpYyByZWFsbVNlcnZlclBvcnQ6bnVtYmVyID0gOTAwMTtcblxufVxuXG5leHBvcnQgY2xhc3MgU3tcbiAgICAvLyBwdWJsaWMgc3RhdGljIFVJTWFuYWdlciA9IFVJTWFuYWdlci5JbnN0YW5jZShVSU1hbmFnZXIpO1xuICAgIC8vIHB1YmxpYyBzdGF0aWMgVUlNZXNzYWdlTWFuZ2VyID0gVUlNZXNzYWdlTWFuZ2VyLkluc3RhbmNlKFVJTWVzc2FnZU1hbmdlcik7XG4gICAgcHVibGljIHN0YXRpYyBTY2VuZU1hbmFnZXIgPSBTY2VuZU1hbmFnZXIuSW5zdGFuY2UoU2NlbmVNYW5hZ2VyKTtcbiAgICBwdWJsaWMgc3RhdGljIEdhbWVPYmplY3RQb29sID0gR2FtZU9iamVjdFBvb2wuSW5zdGFuY2UoR2FtZU9iamVjdFBvb2wpO1xuICAgIHB1YmxpYyBzdGF0aWMgUmVzTWFuYWdlciA9IFJlc01hbmFnZXIuSW5zdGFuY2UoUmVzTWFuYWdlcik7XG4gICAgLy8gcHVibGljIHN0YXRpYyBTdG9yeU1hbmFnZXIgPSBTdG9yeU1hbmFnZXIuSW5zdGFuY2UoU3RvcnlNYW5hZ2VyKTtcbiAgICAvLyBwdWJsaWMgc3RhdGljIFNlc3Npb25NYW5hZ2VyID0gU2Vzc2lvbk1hbmFnZXIuSW5zdGFuY2UoU2Vzc2lvbk1hbmFnZXIpO1xuICAgIC8vIHB1YmxpYyBzdGF0aWMgR2FtZVNlc3Npb24gPSBHYW1lU2Vzc2lvbi5JbnN0YW5jZShHYW1lU2Vzc2lvbik7XG4gICAgLy8gcHVibGljIHN0YXRpYyBTdG9yeU1lc3NhZ2VNYW5hZ2VyID0gU3RvcnlNZXNzYWdlTWFuYWdlci5JbnN0YW5jZShTdG9yeU1lc3NhZ2VNYW5hZ2VyKTtcbiAgICAvLyBwdWJsaWMgc3RhdGljIEh0dHBNYW5hZ2VyID0gSHR0cE1hbmFnZXIuSW5zdGFuY2UoSHR0cE1hbmFnZXIpO1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY3NoYXJwXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInB1ZXJ0c1wiKTsiXSwic291cmNlUm9vdCI6IiJ9