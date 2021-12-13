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
/* harmony import */ var _SceneDef__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SceneDef */ "./src/framework/scene/SceneDef.ts");

class SceneFactory {
    static createScene(sceneName) {
        let scene = null;
        switch (sceneName) {
            case _SceneDef__WEBPACK_IMPORTED_MODULE_0__["SceneDef"].BattleScene:
                // scene = new LoginScene();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL0dhbWVNYWluLnRzIiwid2VicGFjazovLy8uL3NyYy9mcmFtZXdvcmsvY29tbW9uL0dhbWVPYmplY3RQb29sLnRzIiwid2VicGFjazovLy8uL3NyYy9mcmFtZXdvcmsvY29tbW9uL1Jlc01hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZyYW1ld29yay9jb21tb24vU2luZ2xldG9uLnRzIiwid2VicGFjazovLy8uL3NyYy9mcmFtZXdvcmsvbG9nZ2VyL0xvZ2dlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZnJhbWV3b3JrL3NjZW5lL1NjZW5lRGVmLnRzIiwid2VicGFjazovLy8uL3NyYy9mcmFtZXdvcmsvc2NlbmUvU2NlbmVGYWN0b3J5LnRzIiwid2VicGFjazovLy8uL3NyYy9mcmFtZXdvcmsvc2NlbmUvU2NlbmVNYW5hZ2VyLnRzIiwid2VicGFjazovLy8uL3NyYy9nbG9iYWwvR2FtZUNvbmZpZy50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJjc2hhcnBcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJwdWVydHNcIiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFB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QUUsRUFBQztZQUNOLHFEQUFNLENBQUMsR0FBRyxDQUFDLG1CQUFtQixHQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ3RDO0lBRUwsQ0FBQztDQUtKOzs7Ozs7Ozs7Ozs7O0FDekVEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFvRTtBQUNSO0FBQzVELGdFQUFnRTtBQUNoRSw4RUFBOEU7QUFDOUUsOERBQThEO0FBQzlELDhEQUE4RDtBQUM5RCxvRUFBb0U7QUFDTDtBQUMvRCx5REFBeUQ7QUFDekQsb0VBQW9FO0FBRTdELE1BQU8sVUFBVTs7QUFFTixnQkFBSyxHQUFXLElBQUksQ0FBQztBQU9oQyxNQUFNLENBQUM7O0FBQ1YsMkRBQTJEO0FBQzNELDZFQUE2RTtBQUMvRCxjQUFZLEdBQUcsMEVBQVksQ0FBQyxRQUFRLENBQUMsMEVBQVksQ0FBQyxDQUFDO0FBQ25ELGdCQUFjLEdBQUcsK0VBQWMsQ0FBQyxRQUFRLENBQUMsK0VBQWMsQ0FBQyxDQUFDO0FBQ3pELFlBQVUsR0FBRyx1RUFBVSxDQUFDLFFBQVEsQ0FBQyx1RUFBVSxDQUFDLENBQUM7Ozs7Ozs7Ozs7OztBQ3pCL0QsbUM7Ozs7Ozs7Ozs7O0FDQUEsbUMiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvR2FtZU1haW4udHNcIik7XG4iLCJcbi8vIGltcG9ydCB7VW5pdFRlc3R9IGZyb20gJy4vdW5pdHRlc3QvVW5pdFRlc3QnO1xuaW1wb3J0IHsgSnNNYW5hZ2VyICxHYW1lTGF1bmNoIH0gZnJvbSAnY3NoYXJwJztcbmltcG9ydCB7IFNjZW5lRGVmIH0gZnJvbSAnLi9mcmFtZXdvcmsvc2NlbmUvU2NlbmVEZWYnO1xuaW1wb3J0IHsgUyB9IGZyb20gJy4vZ2xvYmFsL0dhbWVDb25maWcnO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSAnLi9mcmFtZXdvcmsvbG9nZ2VyL0xvZ2dlcic7XG4vLyBpbXBvcnQgeyBjb21tb25VSSB9IGZyb20gJy4vZGF0YS91aS9jb21tb24nO1xuLy8gaW1wb3J0IHsgVUlTZXJ2ZXJMaXN0SXRlbSB9IGZyb20gJy4vZ2FtZS9tb2R1bGUvbG9naW4vdWkvVUlTZXJ2ZXJMaXN0SXRlbSc7XG5cblxuXG5jbGFzcyBHYW1lTWFpbntcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBKc01hbmFnZXIuSW5zdGFuY2UuSnNPbkFwcGxpY2F0aW9uUXVpdCA9ICgpID0+IHRoaXMub25BcHBsaWNhdGlvblF1aXQoKTtcbiAgICAgICAgSnNNYW5hZ2VyLkluc3RhbmNlLkpzT25EaXNwb3NlID0gKCkgPT4gdGhpcy5vbkRpc3Bvc2UoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgc3RhcnQoKSB7XG4gICAgICAgIFxuICAgICAgICB0cnl7XG4gICAgICAgICAgICBMb2dnZXIubG9nKFwiR2FtZSBzdGFydCBpbiBKUy4uLi5cIik7XG5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gUy5TdG9yeU1hbmFnZXIuaW5pdGlhbGl6ZSgpO1xuXG4gICAgICBcbiAgICAgICAgICAgIC8vIC8v5Yqg6L296YCa55SoRmFpcnlHVUnotYTmupBcbiAgICAgICAgICAgIC8vIGF3YWl0IFMuUmVzTWFuYWdlci5sb2FkRmFpcnlHVUlQYWNrYWdlKGNvbW1vblVJLlBhY2thZ2VOYW1lKTtcblxuICAgICAgICAgICAgLy8gLy9kbyBVbml0IFRlc3RcbiAgICAgICAgICAgIC8vIFVuaXRUZXN0LmRvVGVzdCgpO1xuXG4gICAgICAgICAgICAvLyAvL+i/m+WFpeeZu+W9leaooeWdl1xuICAgICAgICAgICAgLy8gYXdhaXQgUy5TY2VuZU1hbmFnZXIubG9hZFNjZW5lKFNjZW5lRGVmLkxvZ2luU2NlbmUpO1xuICAgICAgICAgICAgYXdhaXQgUy5TY2VuZU1hbmFnZXIubG9hZFNjZW5lKFNjZW5lRGVmLkJhdHRsZVNjZW5lKTtcblxuICAgICAgICAgICAgXG4gICAgICAgICAgICAvL0pT5ZCv5Yqo5a6M5oiQ77yM6YCa55+lQyPlsYJcbiAgICAgICAgICAgIEdhbWVMYXVuY2guSW5zdGFuY2UuSnNMdWFuY2hGaW5pc2goKTtcblxuICAgICAgICAgICAgLy8gbGV0IGV4dEl0ZW0gPSAoKT0+e1xuICAgICAgICAgICAgICAgIC8vIGxldCBpdGVtID0gIG5ldyBVSVNlcnZlckxpc3RJdGVtKCk7XG4gICAgICAgICAgICAgICAvLyAvLyBwb29sLnB1c2goaXRlbSlcbiAgICAgICAgICAgICAgICAvLyByZXR1cm4gaXRlbTtcbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgIC8vIEZhaXJ5R1VJLlVJT2JqZWN0RmFjdG9yeS5TZXRQYWNrYWdlSXRlbUV4dGVuc2lvbihcInVpOi8vbDY0ZHVtazlmZWVnNTRcIixleHRJdGVtKVxuICAgICAgICAgICAgXG5cbiAgICAgICAgfWNhdGNoKGV4KXtcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihleCk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIHB1YmxpYyBvbkFwcGxpY2F0aW9uUXVpdCgpOnZvaWQge1xuXG4gICAgICAgIC8vIFMuR2FtZU9iamVjdFBvb2wuY2xlYW51cCh0cnVlKTtcbiAgICAgICAgTG9nZ2VyLmxvZyhcIkdhbWUgb25BcHBsaWNhdGlvblF1aXQgaW4gSlMuLi4uXCIpO1xuICAgIH1cblxuICAgIHB1YmxpYyBvbkRpc3Bvc2UoKTp2b2lkIHtcbiAgICAgICAgXG4gICAgICAgIExvZ2dlci5sb2coXCJHYW1lIG9uRGlzcG9zZSBpbiBKUy4uLi5cIik7XG4gICAgfVxuICAgIFxufVxuXG5uZXcgR2FtZU1haW4oKS5zdGFydCgpO1xuXG4iLCJcbmltcG9ydCB7IFNpbmdsZXRvbiB9IGZyb20gJy4vU2luZ2xldG9uJztcbmltcG9ydCB7IFJlc01hbmFnZXIgfSBmcm9tICcuL1Jlc01hbmFnZXInO1xuaW1wb3J0IHsgVW5pdHlFbmdpbmUgfSBmcm9tICdjc2hhcnAnO1xuXG5cblxuLy8gLS0gR2FtZU9iamVjdOe8k+WtmOaxoFxuLy8gLS0g5rOo5oSP77yaXG4vLyAtLSAx44CB5omA5pyJ6ZyA6KaB6aKE6K6+6YO95LuO6L+Z6YeM5Yqg6L2977yM5LiN6KaB55u05o6l5YiwUmVzb3VyY2VzTWFuYWdlcuWOu+WKoOi9ve+8jOeUsei/memHjOe7n+S4gOWBmue8k+WtmOeuoeeQhlxuLy8gLS0gMuOAgee8k+WtmOWIhuS4uuS4pOmDqOWIhu+8muS7jui1hOa6kOWxguWKoOi9veeahOWOn+Wni0dhbWVPYmplY3QoQXNzZXQp77yM5LuOR2FtZU9iamVjdOWunuS+i+WMluWHuuadpeeahOWkmuS4qkluc3RcbmV4cG9ydCBjbGFzcyBHYW1lT2JqZWN0UG9vbCBleHRlbmRzIFNpbmdsZXRvbjxHYW1lT2JqZWN0UG9vbD57XG5cbiAgICBwcml2YXRlIF9fY2FjaGVUcmFuc1Jvb3QgPSBudWxsO1xuICAgIHByaXZhdGUgX19nb1Bvb2wgPSBuZXcgTWFwKCk7XG4gICAgcHJpdmF0ZSBfX2luc3RDYWNoZTpNYXA8c3RyaW5nLEFycmF5PGFueT4+ID0gbmV3IE1hcDxzdHJpbmcsQXJyYXk8YW55Pj4oKTtcblxuXG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICBsZXQgZ28gPSBVbml0eUVuZ2luZS5HYW1lT2JqZWN0LkZpbmQoXCJHYW1lT2JqZWN0Q2FjaGVSb290XCIpO1xuXG4gICAgICAgIGlmKGdvID09IHVuZGVmaW5lZCl7XG4gICAgICAgICAgICBnbyA9IG5ldyBVbml0eUVuZ2luZS5HYW1lT2JqZWN0KFwiR2FtZU9iamVjdENhY2hlUm9vdFwiKTtcbiAgICAgICAgICAgIFVuaXR5RW5naW5lLk9iamVjdC5Eb250RGVzdHJveU9uTG9hZChnbyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9fY2FjaGVUcmFuc1Jvb3QgPSBnby50cmFuc2Zvcm07XG4gICAgfVxuXG4gICAgLy8tLSDmo4DmtYvmmK/lkKblt7Lnu4/ooqvnvJPlrZhcbiAgICBwdWJsaWMgY2hlY2tIYXNDYWNoZWQocGF0aDpzdHJpbmcpe1xuXG4gICAgICAgIGxldCBjYWNoZWRJbnN0OkFycmF5PGFueT4gPSB0aGlzLl9faW5zdENhY2hlLmdldChwYXRoKTtcbiAgICAgICAgaWYoY2FjaGVkSW5zdCAhPSB1bmRlZmluZWQgJiYgY2FjaGVkSW5zdC5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHBvb2xlZEdvID0gdGhpcy5fX2dvUG9vbC5nZXQocGF0aCk7XG4gICAgICAgIHJldHVybiBwb29sZWRHbyAhPSB1bmRlZmluZWQ7XG4gICAgfVxuXG5cbiAgICAvLy0tIOe8k+WtmOW5tuWunuS+i+WMlkdhbWVPYmplY3RcbiAgICBwdWJsaWMgY2FjaGVBbmRJbnN0R2FtZU9iamVjdChwYXRoOnN0cmluZywgZ286YW55LCBpbnN0X2NvdW50Om51bWJlciA9IDEpe1xuXG4gICAgICAgIHRoaXMuX19nb1Bvb2wuc2V0KHBhdGgsIGdvKTtcbiAgICAgICAgaWYoaW5zdF9jb3VudCA+IDApe1xuXG4gICAgICAgICAgICBsZXQgY2FjaGVkSW5zdDpBcnJheTxhbnk+ID0gdGhpcy5fX2luc3RDYWNoZS5nZXQocGF0aCk7XG4gICAgICAgICAgICBmb3IobGV0IGk6bnVtYmVyID0wOyBpIDwgaW5zdF9jb3VudDsgaSsrKXtcblxuICAgICAgICAgICAgICAgIGxldCBpbnN0ID0gVW5pdHlFbmdpbmUuR2FtZU9iamVjdC5JbnN0YW50aWF0ZShnbykgYXMgVW5pdHlFbmdpbmUuR2FtZU9iamVjdDtcbiAgICAgICAgICAgICAgICBpbnN0LnRyYW5zZm9ybS5TZXRQYXJlbnQodGhpcy5fX2NhY2hlVHJhbnNSb290KTtcbiAgICAgICAgICAgICAgICBpbnN0LlNldEFjdGl2ZShmYWxzZSk7XG5cbiAgICAgICAgICAgICAgICBjYWNoZWRJbnN0LnB1c2goaW5zdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLy0tIOWwneivleS7jue8k+WtmOS4reiOt+WPllxuICAgIHB1YmxpYyB0cnlHZXRGcm9tQ2FjaGUocGF0aDpzdHJpbmcpOmFueXtcblxuICAgICAgICBpZighdGhpcy5jaGVja0hhc0NhY2hlZChwYXRoKSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgY2FjaGVkSW5zdDpBcnJheTxvYmplY3Q+ICA9IHRoaXMuX19pbnN0Q2FjaGUuZ2V0KHBhdGgpO1xuICAgICAgICBpZihjYWNoZWRJbnN0ICE9IHVuZGVmaW5lZCAmJiBjYWNoZWRJbnN0Lmxlbmd0aD4wKXtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgbGV0IGluc3QgPSBjYWNoZWRJbnN0LnBvcCgpO1xuICAgICAgICAgICAgcmV0dXJuIGluc3Q7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcG9vbGVkR28gPSB0aGlzLl9fZ29Qb29sLmdldChwYXRoKTtcbiAgICAgICAgaWYocG9vbGVkR28gIT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICAgIGxldCBpbnN0ID0gVW5pdHlFbmdpbmUuR2FtZU9iamVjdC5JbnN0YW50aWF0ZShwb29sZWRHbyk7XG4gICAgICAgICAgICByZXR1cm4gaW5zdDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cblxuICAgIC8v6aKE5Yqg6L2977ya5Y+v5o+Q5L6b5Yid5aeL5a6e5L6L5YyW5Liq5pWwXG4gICAgcHVibGljIGFzeW5jIHByZUxvYWRHYW1lT2JqZWN0QXN5bmMocGF0aDpzdHJpbmcsIGluc3RfY291bnQ6bnVtYmVyLCBjYWxsYmFjazpGdW5jdGlvbiwuLi5wYXJhbXMpe1xuXG4gICAgICAgIGlmKHRoaXMuY2hlY2tIYXNDYWNoZWQocGF0aCkpe1xuICAgICAgICAgICAgaWYoY2FsbGJhY2shPW51bGwpe1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHBhcmFtcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZ28gPSBhd2FpdCBSZXNNYW5hZ2VyLkluc3RhbmNlKFJlc01hbmFnZXIpLmxvYWRQcmVmYWIocGF0aCk7XG4gICAgICAgIGlmKGdvIT11bmRlZmluZWQpe1xuICAgICAgICAgICAgdGhpcy5jYWNoZUFuZEluc3RHYW1lT2JqZWN0KHBhdGgsIGdvLGluc3RfY291bnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoY2FsbGJhY2shPW51bGwpe1xuICAgICAgICAgICAgY2FsbGJhY2socGFyYW1zKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLy8tLSDlvILmraXojrflj5bvvJrlv4XopoHml7bliqDovb1cbiAgICBwdWJsaWMgYXN5bmMgZ2V0R2FtZU9iamVjdEFzeW5jKHBhdGg6c3RyaW5nLCBjYWxsYmFjazpGdW5jdGlvbiwuLi5wYXJhbXMpe1xuXG4gICAgICAgIGxldCBpbnN0OmFueSA9IHRoaXMudHJ5R2V0RnJvbUNhY2hlKHBhdGgpO1xuICAgICAgICBpZihpbnN0ID09bnVsbCl7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnByZUxvYWRHYW1lT2JqZWN0QXN5bmMocGF0aCwgMSwgY2FsbGJhY2ssIHBhcmFtcyk7XG4gICAgICAgIH1cblxuICAgICAgICBpbnN0ID0gdGhpcy50cnlHZXRGcm9tQ2FjaGUocGF0aCk7XG4gICAgICAgIGluc3QuU2V0QWN0aXZlKHRydWUpO1xuXG4gICAgICAgIFxuICAgIH1cblxuXG4gICAgLy8tLSDlm57mlLZcbiAgICBwdWJsaWMgcmVjeWNsZUdhbWVPYmplY3QocGF0aDpzdHJpbmcsIGluc3Q6YW55KXtcblxuICAgICAgICBpbnN0LnRyYW5zZm9ybS5TZXRQYXJlbnQodGhpcy5fX2NhY2hlVHJhbnNSb290KTtcbiAgICAgICAgaW5zdC5TZXRBY3RpdmUoZmFsc2UpO1xuXG4gICAgICAgIGxldCBjYWNoZWRJbnN0ID0gdGhpcy5fX2luc3RDYWNoZS5nZXQocGF0aCkgfHwgbmV3IEFycmF5KCk7XG4gICAgICAgIGNhY2hlZEluc3QucHVzaChpbnN0KTtcblxuICAgICAgICB0aGlzLl9faW5zdENhY2hlLnNldChwYXRoLCBjYWNoZWRJbnN0KTtcblxuICAgIH1cblxuXG4gICAgLy8tLSDmuIXnkIbnvJPlrZhcbiAgICBwdWJsaWMgY2xlYW51cChpbmNsdWRlUG9vbGVkR286Ym9vbGVhbiA9IGZhbHNlKXtcblxuICAgICAgICB0aGlzLl9faW5zdENhY2hlLmZvckVhY2goKHZhbHVlcywga2V5KT0+e1xuXG4gICAgICAgICAgICBmb3IobGV0IGluc3Qgb2YgdmFsdWVzKXtcbiAgICAgICAgICAgICAgICBpZihpbnN0ICE9IG51bGwpe1xuICAgICAgICAgICAgICAgICAgICBVbml0eUVuZ2luZS5HYW1lT2JqZWN0LkRlc3Ryb3koaW5zdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5fX2luc3RDYWNoZS5jbGVhcigpOyBcblxuICAgICAgICBpZihpbmNsdWRlUG9vbGVkR28pe1xuICAgICAgICAgICAgdGhpcy5fX2dvUG9vbC5mb3JFYWNoKChnbywga2V5KT0+e1xuXG4gICAgICAgICAgICAgICAgaWYoZ28gIT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgICAgIFJlc01hbmFnZXIuSW5zdGFuY2UoUmVzTWFuYWdlcikucmVsZWFzZUFkZHJlc3NHTyhnbyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMuX19nb1Bvb2wuY2xlYXIoKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG5cbn0iLCJcbmltcG9ydCB7IFNpbmdsZXRvbiB9IGZyb20gJy4vU2luZ2xldG9uJztcbmltcG9ydCB7ICRwcm9taXNlIH0gZnJvbSAncHVlcnRzJztcbmltcG9ydCB7TmljZVRTLCBVbml0eUVuZ2luZX0gZnJvbSAnY3NoYXJwJztcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gJy4uL2xvZ2dlci9Mb2dnZXInO1xuXG5leHBvcnQgY2xhc3MgUmVzTWFuYWdlciBleHRlbmRzIFNpbmdsZXRvbjxSZXNNYW5hZ2VyPntcblxuICAgIHByaXZhdGUgX3BrZ01hcDpNYXA8c3RyaW5nLG51bWJlcj4gPSBuZXcgTWFwPHN0cmluZyxudW1iZXI+KCk7XG5cbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cblxuICAgIC8vIGFzeW5jIGxvYWRGYWlyeUdVSVBhY2thZ2UocGFja2FnZU5hbWU6c3RyaW5nKXtcblxuICAgIC8vICAgICB0cnl7XG4gICAgLy8gICAgICAgICBsZXQgY291bnQgPSB0aGlzLl9wa2dNYXAuZ2V0KHBhY2thZ2VOYW1lKTtcbiAgICAvLyAgICAgICAgIGlmKGNvdW50ID09IG51bGwgfHwgY291bnQgPCAxKXtcbiAgICAvLyAgICAgICAgICAgICAvL+ayoeaciee8k+WtmO+8jOWKoOi9vVxuICAgIC8vICAgICAgICAgICAgIGxldCBhZGRyZXNzID0gcGFja2FnZU5hbWUrXCJfZnVpLmJ5dGVzXCI7XG4gICAgLy8gICAgICAgICAgICAgbGV0IHRhc2sgPSBOaWNlVFMuUmVzb3VyY2VNYW5hZ2VyLkxvYWRGYWlyeUdVSVBhY2thZ2UoYWRkcmVzcyxwYWNrYWdlTmFtZSk7XG4gICAgLy8gICAgICAgICAgICAgYXdhaXQgJHByb21pc2UodGFzayk7XG4gICAgICAgICAgICAgICAgXG4gICAgLy8gICAgICAgICAgICAgdGhpcy5fcGtnTWFwLnNldChwYWNrYWdlTmFtZSwgMSk7XG4gICAgLy8gICAgICAgICB9XG4gICAgLy8gICAgICAgICBlbHNle1xuICAgIC8vICAgICAgICAgICAgIHRoaXMuX3BrZ01hcC5zZXQocGFja2FnZU5hbWUsIGNvdW50KzEpO1xuICAgIC8vICAgICAgICAgfVxuICAgIC8vICAgICB9Y2F0Y2goZXgpe1xuICAgIC8vICAgICAgICAgTG9nZ2VyLmVycm9yKGBMb2FkIGZhaXJ5R1VJIDoke3BhY2thZ2VOYW1lfSA6ICR7ZXh9YClcbiAgICAvLyAgICAgfVxuICAgIC8vIH1cbiAgICBcbiAgICAvLyBwdWJsaWMgcmVsZWFzZUZhaXJ5R1VJUGFja2FnZShwYWNrYWdlTmFtZSl7XG5cbiAgICAvLyAgICAgbGV0IGNvdW50ID0gdGhpcy5fcGtnTWFwLmdldChwYWNrYWdlTmFtZSk7XG4gICAgLy8gICAgIGlmKGNvdW50IT1udWxsICYmIGNvdW50PjEpe1xuICAgIC8vICAgICAgICAgdGhpcy5fcGtnTWFwLnNldChwYWNrYWdlTmFtZSwgY291bnQtMSk7XG4gICAgLy8gICAgIH1lbHNle1xuXG4gICAgLy8gICAgICAgICBMb2dnZXIubG9nKGByZWxlYXNlIGZhZ3VpIHBhY2thZ2U6JHtwYWNrYWdlTmFtZX1gKTtcbiAgICAvLyAgICAgICAgIHRoaXMuX3BrZ01hcC5kZWxldGUocGFja2FnZU5hbWUpO1xuICAgIC8vICAgICAgICAgTmljZVRTLlJlc291cmNlTWFuYWdlci5SZWxlYXNlRkdVSVBhY2thZ2UocGFja2FnZU5hbWUpO1xuICAgIC8vICAgICB9XG4gICAgLy8gfVxuXG4gICAgYXN5bmMgbG9hZFNjZW5lKHNjZW5lTmFtZTpzdHJpbmcsIG1vZGUgPSBVbml0eUVuZ2luZS5TY2VuZU1hbmFnZW1lbnQuTG9hZFNjZW5lTW9kZS5TaW5nbGUpe1xuICAgICAgICB0cnl7XG4gICAgICAgICAgXG4gICAgICAgICAgICBsZXQgdGFzayA9IE5pY2VUUy5SZXNvdXJjZU1hbmFnZXIuTG9hZFNjZW5lKHNjZW5lTmFtZSwgbW9kZSwocHJvZ3Jlc3M6TnVtYmVyKT0+e1xuICAgICAgICAgICAgICAgIExvZ2dlci5sb2coXCJsb2FkIHNjZW5lOiBcIitwcm9ncmVzcylcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBsZXQgc2Nlbkluc3RhbmNlID0gYXdhaXQgJHByb21pc2UodGFzaylcbiAgICAgICAgICAgIHJldHVybiBzY2VuSW5zdGFuY2VcblxuICAgICAgICB9Y2F0Y2goZXgpe1xuXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoYExvYWQgU2NlbmUgOiR7c2NlbmVOYW1lfSA6ICR7ZXh9YClcblxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIGFzeW5jIHVubG9hZFNjZW5lKHNjZW5lSW5zdGFuY2U6VW5pdHlFbmdpbmUuUmVzb3VyY2VNYW5hZ2VtZW50LlJlc291cmNlUHJvdmlkZXJzLlNjZW5lSW5zdGFuY2Upe1xuICAgICAgICB0cnl7XG4gICAgICAgICAgICBsZXQgdGFzaz0gTmljZVRTLlJlc291cmNlTWFuYWdlci5VbmxvYWRTY2VuZShzY2VuZUluc3RhbmNlKVxuICAgICAgICAgICAgbGV0IGdvID0gYXdhaXQgJHByb21pc2UodGFzayk7XG4gICAgICAgICAgICByZXR1cm4gZ287XG4gICAgICAgIH1jYXRjaChleCl7XG5cbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihgVW5sb2FkIHNjZW5lICA6ICR7ZXh9YClcblxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgdW5sb2FkU2NlbmVCeU5hbWUoc2NlbmVOYW1lOnN0cmluZyl7XG5cbiAgICAgICAgTmljZVRTLlJlc291cmNlTWFuYWdlci5VbmxvYWRTY2VuZUJ5TmFtZShzY2VuZU5hbWUpO1xuICAgIH1cblxuICAgIGFzeW5jIGxvYWRQcmVmYWIoYWRkcmVzczpzdHJpbmcpe1xuXG4gICAgICAgIHRyeXtcbiAgICAgICAgICAgIGxldCB0YXNrPSBOaWNlVFMuUmVzb3VyY2VNYW5hZ2VyLkxvYWRQcmVmYWIoYWRkcmVzcyk7XG4gICAgICAgICAgICBsZXQgZ28gPSBhd2FpdCAkcHJvbWlzZSh0YXNrKTtcbiAgICAgICAgICAgIHJldHVybiBnbztcbiAgICAgICAgfWNhdGNoKGV4KXtcblxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKGBMb2FkIHByZWZhYiA6JHthZGRyZXNzfSA6ICR7ZXh9YClcblxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGFzeW5jIGxvYWRUZXh0QXNzZXQoYWRkcmVzczpzdHJpbmcpe1xuXG4gICAgICAgIHRyeXtcbiAgICAgICAgICAgIGxldCB0YXNrID0gTmljZVRTLlJlc291cmNlTWFuYWdlci5Mb2FkVGV4dEFzc2V0KGFkZHJlc3MpO1xuICAgICAgICAgICAgbGV0IGdvID0gYXdhaXQgJHByb21pc2UodGFzayk7XG4gICAgICAgICAgICByZXR1cm4gZ287XG4gICAgICAgIH1jYXRjaChleCl7XG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoYExvYWQgdGV4dGFzc2V0IDoke2FkZHJlc3N9IDogJHtleH1gKVxuXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgYXN5bmMgbG9hZFRleHRCeXRlcyhhZGRyZXNzOnN0cmluZyl7XG5cbiAgICAgICAgdHJ5e1xuICAgICAgICAgICAgbGV0IHRhc2sgPSBOaWNlVFMuUmVzb3VyY2VNYW5hZ2VyLkxvYWRUZXh0Qnl0ZXMoYWRkcmVzcyk7XG4gICAgICAgICAgICBsZXQgYnl0ZXMgPSBhd2FpdCAkcHJvbWlzZSh0YXNrKTtcbiAgICAgICAgICAgIHJldHVybiBieXRlcztcbiAgICAgICAgfWNhdGNoKGV4KXtcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihgTG9hZFRleHRCeXRlcyA6JHthZGRyZXNzfSA6ICR7ZXh9YClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFzeW5jIGxvYWRTcHJpdGUoYWRkcmVzczpzdHJpbmcpe1xuXG4gICAgICAgIHRyeXtcbiAgICAgICAgICAgIGxldCB0YXNrID0gTmljZVRTLlJlc291cmNlTWFuYWdlci5Mb2FkU3ByaXRlKGFkZHJlc3MpO1xuICAgICAgICAgICAgbGV0IGdvID0gYXdhaXQgJHByb21pc2UodGFzayk7XG4gICAgICAgICAgICByZXR1cm4gZ287XG5cbiAgICAgICAgfWNhdGNoKGV4KXtcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihgTG9hZCBzcHJpdGUgOiR7YWRkcmVzc30gOiAke2V4fWApXG5cbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBwdWJsaWMgcmVsZWFzZUFkZHJlc3NHTyhnbzphbnkpe1xuXG4gICAgICAgIE5pY2VUUy5SZXNvdXJjZU1hbmFnZXIuUmVsZWFzZUFkZHJlc3NHTyhnbyk7XG4gICAgfVxuXG5cbiAgICBcbn0iLCJcblxuZXhwb3J0IGNsYXNzIFNpbmdsZXRvbjxUPntcblxuICAgIHByaXZhdGUgc3RhdGljIGluc3RhbmNlOmFueSA9IG51bGw7XG5cbiAgICBwdWJsaWMgc3RhdGljIEluc3RhbmNlPFQ+KCBjOiB7IG5ldygpOiBUIH0gKSA6IFR7XG5cbiAgICAgICAgaWYodGhpcy5pbnN0YW5jZSA9PSBudWxsKXtcbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2UgPSBuZXcgYygpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XG4gICAgfVxuXG59IiwiaW1wb3J0IHsgVW5pdHlFbmdpbmUgfSBmcm9tICdjc2hhcnAnO1xuaW1wb3J0IHsgR2FtZUNvbmZpZyB9IGZyb20gJy4uLy4uL2dsb2JhbC9HYW1lQ29uZmlnJztcbmVudW0gTG9nVHlwZSB7XG5cdEVycm9yID0gMCxcblx0QXNzZXJ0ID0gMSxcblx0V2FybmluZyA9IDIsXG5cdExvZyA9IDMsXG5cdEV4Y2VwdGlvbiA9IDRcbn1cblxuZXhwb3J0IGNsYXNzIExvZ2dlcntcbiAgICBwcml2YXRlICBzdGF0aWMgIHVuaXR5X2xvZ190YXJnZXQgPSBudWxsO1xuXG4gICAgc3RhdGljIGdldFByaW50U3RhY2sodHlwZTogTG9nVHlwZSwgc2hvd1N0YWNrIDogYm9vbGVhbiwgLi4uYXJncykge1xuICAgICAgICBsZXQgbWVzc2FnZSA9ICcnO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBhcmdzW2ldO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBlbGVtZW50ID09PSAnb2JqZWN0JyAmJiBMb2dnZXIuTE9HX09CSkVDVF9UT19KU09OKSB7XG4gICAgICAgICAgICAgICAgbWVzc2FnZSArPSBKU09OLnN0cmluZ2lmeShlbGVtZW50KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbWVzc2FnZSArPSBlbGVtZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGkgPCBhcmdzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlICs9ICcgJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIFxuICAgICAgICBpZiAoc2hvd1N0YWNrIHx8IFVuaXR5RW5naW5lLkFwcGxpY2F0aW9uLmlzRWRpdG9yKSB7XG4gICAgICAgICAgICB2YXIgc3RhY2tzID0gbmV3IEVycm9yKCkuc3RhY2suc3BsaXQoJ1xcbicpO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDM7IGkgPCBzdGFja3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBsaW5lID0gc3RhY2tzW2ldO1xuICAgICAgICAgICAgICAgIG1lc3NhZ2UgKz0gJ1xcbic7XG4gICAgICAgICAgICAgICAgbWVzc2FnZSArPSBsaW5lO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgXG4gICAgICAgIGlmICghTG9nZ2VyLnVuaXR5X2xvZ190YXJnZXQpIHtcbiAgICAgICAgICAgIExvZ2dlci51bml0eV9sb2dfdGFyZ2V0ID0gbmV3IFVuaXR5RW5naW5lLk9iamVjdCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG1lc3NhZ2U7XG4gICAgfVxuXG4gICAgXG5cblx0c3RhdGljIGxvZyguLi5hcmdzKTogdm9pZHtcbiAgICAgICAgaWYoIUdhbWVDb25maWcuZGVidWcpIHJldHVybjtcblxuICAgICAgICBsZXQgbXNnID0gTG9nZ2VyLmdldFByaW50U3RhY2soTG9nVHlwZS5Mb2csIHRydWUsIGFyZ3MpO1xuICAgICAgICBjb25zb2xlLmxvZyhtc2cpO1xuICAgIH1cblxuXHQvKipcblx0ICogT3V0cHV0cyBhIHdhcm5pbmcgbWVzc2FnZSB0byB0aGUgTG9nZ2VyLlxuXHQgKiBAcGFyYW0gbWVzc2FnZSAgbGlzdCBvZiBKYXZhU2NyaXB0IG9iamVjdHMgdG8gb3V0cHV0LiBUaGUgc3RyaW5nIHJlcHJlc2VudGF0aW9ucyBvZiBlYWNoIG9mIHRoZXNlIG9iamVjdHMgYXJlIGFwcGVuZGVkIHRvZ2V0aGVyIGluIHRoZSBvcmRlciBsaXN0ZWQgYW5kIG91dHB1dC5cblx0ICovXG5cdHN0YXRpYyB3YXJuKC4uLmFyZ3MpOiB2b2lke1xuICAgICAgICBpZighR2FtZUNvbmZpZy5kZWJ1ZykgcmV0dXJuO1xuXG4gICAgICAgIGxldCBtc2cgPSBMb2dnZXIuZ2V0UHJpbnRTdGFjayhMb2dUeXBlLldhcm5pbmcsIHRydWUsIGFyZ3MpO1xuICAgICAgICBjb25zb2xlLndhcm4obXNnKTtcbiAgICB9XG5cblx0LyoqXG5cdCAqIE91dHB1dHMgYW4gZXJyb3IgbWVzc2FnZSB0byB0aGUgTG9nZ2VyLlxuXHQgKiBAcGFyYW0gbWVzc2FnZSBBIGxpc3Qgb2YgSmF2YVNjcmlwdCBvYmplY3RzIHRvIG91dHB1dC4gVGhlIHN0cmluZyByZXByZXNlbnRhdGlvbnMgb2YgZWFjaCBvZiB0aGVzZSBvYmplY3RzIGFyZSBhcHBlbmRlZCB0b2dldGhlciBpbiB0aGUgb3JkZXIgbGlzdGVkIGFuZCBvdXRwdXQuXG5cdCAqL1xuXHRzdGF0aWMgZXJyb3IoLi4uYXJncyk6IHZvaWR7XG4gICAgICAgIGlmKCFHYW1lQ29uZmlnLmRlYnVnKSByZXR1cm47XG5cbiAgICAgICAgbGV0IG1zZyA9IExvZ2dlci5nZXRQcmludFN0YWNrKExvZ1R5cGUuRXJyb3IsIHRydWUsIGFyZ3MpO1xuICAgICAgICBjb25zb2xlLmVycm9yKG1zZyk7XG4gICAgfVxuXG5cdC8qKiBPdXRwdXRzIGEgc3RhY2sgdHJhY2UgdG8gdGhlIExvZ2dlci5cblx0ICogQHBhcmFtIG1lc3NhZ2UgQSBsaXN0IG9mIEphdmFTY3JpcHQgb2JqZWN0cyB0byBvdXRwdXQuIFRoZSBzdHJpbmcgcmVwcmVzZW50YXRpb25zIG9mIGVhY2ggb2YgdGhlc2Ugb2JqZWN0cyBhcmUgYXBwZW5kZWQgdG9nZXRoZXIgaW4gdGhlIG9yZGVyIGxpc3RlZCBhbmQgb3V0cHV0LlxuXHQqL1xuXHRzdGF0aWMgdHJhY2UoLi4uYXJncyk6IHZvaWR7XG4gICAgICAgIGlmKCFHYW1lQ29uZmlnLmRlYnVnKSByZXR1cm47XG4gICAgICAgIFxuICAgICAgICBsZXQgbXNnID0gTG9nZ2VyLmdldFByaW50U3RhY2soTG9nVHlwZS5Mb2csIHRydWUsIGFyZ3MpO1xuICAgICAgICBjb25zb2xlLmxvZyhtc2cpO1xuICAgIH1cblxuXHQvKiogTG9nIEphdmFTY3JpcHQgT2JqZWN0cyBhcyBKU09OIGZvcm1hdCAqL1xuXHRzdGF0aWMgTE9HX09CSkVDVF9UT19KU09OKC4uLmFyZ3MpOiBib29sZWFue1xuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbn0iLCJleHBvcnQgZW51bSBTY2VuZURlZiB7XG4gICAgQmF0dGxlU2NlbmUgPSBcIkJhdHRsZVNjZW5lXCIsXG59IiwiaW1wb3J0IHsgQmFzZVNjZW5lIH0gZnJvbSBcIi4vQmFzZVNjZW5lXCI7XG5pbXBvcnQgeyBTY2VuZURlZiB9IGZyb20gXCIuL1NjZW5lRGVmXCI7XG5cblxuXG5leHBvcnQgY2xhc3MgU2NlbmVGYWN0b3J5e1xuXG5cbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZVNjZW5lKHNjZW5lTmFtZTpzdHJpbmcpOkJhc2VTY2VuZXtcblxuICAgICAgICBsZXQgc2NlbmU6QmFzZVNjZW5lID0gbnVsbDtcblxuICAgICAgICBzd2l0Y2ggKHNjZW5lTmFtZSl7XG4gICAgICAgICAgICBjYXNlIFNjZW5lRGVmLkJhdHRsZVNjZW5lOlxuICAgICAgICAgICAgICAgIC8vIHNjZW5lID0gbmV3IExvZ2luU2NlbmUoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzY2VuZTtcbiAgICB9XG59IiwiLy8gaW1wb3J0IHsgY29tbW9uVUkgfSBmcm9tIFwiLi4vLi4vZGF0YS91aS9jb21tb25cIjtcbi8vIGltcG9ydCB7IFVJTWVzc2FnZSB9IGZyb20gXCIuLi8uLi9nYW1lL2V2ZW50L1VJTWVzc2FnZVwiO1xuaW1wb3J0IHsgUyB9IGZyb20gXCIuLi8uLi9nbG9iYWwvR2FtZUNvbmZpZ1wiO1xuaW1wb3J0IHsgU2luZ2xldG9uIH0gZnJvbSBcIi4uL2NvbW1vbi9TaW5nbGV0b25cIjtcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCIuLi9sb2dnZXIvTG9nZ2VyXCI7XG5pbXBvcnQgeyBCYXNlU2NlbmUgfSBmcm9tIFwiLi9CYXNlU2NlbmVcIjtcbmltcG9ydCB7IFNjZW5lRmFjdG9yeSB9IGZyb20gXCIuL1NjZW5lRmFjdG9yeVwiO1xuXG5cblxuXG5leHBvcnQgY2xhc3MgU2NlbmVNYW5hZ2VyIGV4dGVuZHMgU2luZ2xldG9uPFNjZW5lTWFuYWdlcj57XG5cbiAgICBwcml2YXRlIGN1cnJlbnRTY2VuZTpCYXNlU2NlbmUgPSBudWxsO1xuXG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgbG9hZFNjZW5lKHNjZW5lOnN0cmluZyl7XG4gICAgICAgIFxuICAgICAgICB0cnl7XG5cbiAgICAgICAgICAgIC8vIC8v5omT5byATG9hZGluZ+eVjOmdolxuICAgICAgICAgICAgLy8gUy5VSU1hbmFnZXIub3BlbkxvYWRpbmcoY29tbW9uVUkuUGFja2FnZU5hbWUsIGNvbW1vblVJLlVJTG9hZGluZ1BhZ2UpO1xuXG4gICAgICAgICAgICAvL+a4heeQhuaXp+WcuuaZr1xuICAgICAgICAgICAgaWYodGhpcy5jdXJyZW50U2NlbmUpe1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFNjZW5lLm9uTGVhdmUoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRTY2VuZS5vbkRlc3Ryb3koKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy/lvIDlp4vliqDovb3lnLrmma9cbiAgICAgICAgICAgIGxldCBzY2VuZUluc3RhbmNlID0gYXdhaXQgUy5SZXNNYW5hZ2VyLmxvYWRTY2VuZShzY2VuZSk7XG5cbiAgICAgICAgICAgIC8v5byA5aeL5Yqg6L296L+b5YWl5Zy65pmv55qE6LWE5rqQXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRTY2VuZSA9ICBTY2VuZUZhY3RvcnkuY3JlYXRlU2NlbmUoc2NlbmUpO1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50U2NlbmUuc2V0U2NlbmVJbnN0YW5jZShzY2VuZUluc3RhbmNlKTtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFNjZW5lLm9uRW50ZXIoKTtcblxuICAgICAgICAgICAgLy8gLy/orr7nva7lvZPliY3lnLrmma/liqDovb3ov5vluqZUaW1lclxuICAgICAgICAgICAgLy8gbGV0IHByb2dyZXNzSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKT0+e1xuXG4gICAgICAgICAgICAvLyAgICAgbGV0IHByb2dyZXNzID0gdGhpcy5jdXJyZW50U2NlbmUuZmluaXNoQ291bnQvdGhpcy5jdXJyZW50U2NlbmUudG90YWxDb3VudDtcbiAgICAgICAgICAgIC8vICAgICBMb2dnZXIubG9nKFwicHJvZ3Jlc3M6XCIrcHJvZ3Jlc3MgKyBcIiA9IFwiK3RoaXMuY3VycmVudFNjZW5lLmZpbmlzaENvdW50ICsgXCIgPSBcIit0aGlzLmN1cnJlbnRTY2VuZS50b3RhbENvdW50KTtcblxuICAgICAgICAgICAgLy8gICAgIFMuVUlNZXNzYWdlTWFuZ2VyLmJyb2FkY2FzdChcbiAgICAgICAgICAgIC8vICAgICAgICAgVUlNZXNzYWdlLk1TR19TQ0VORV9QUk9HUkVTUyxcbiAgICAgICAgICAgIC8vICAgICAgICAgcHJvZ3Jlc3MqMTAwKTtcblxuICAgICAgICAgICAgLy8gfSwgMTAwKTtcblxuICAgICAgICAgICAgLy/liqDovb3otYTmupBcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuY3VycmVudFNjZW5lLmxvYWRBc3NldHNBc3luYygpO1xuXG4gICAgICAgICAgICAvLyAvL+WKoOi9veWujOaIkFxuICAgICAgICAgICAgLy8gY2xlYXJJbnRlcnZhbChwcm9ncmVzc0ludGVydmFsKVxuXG4gICAgICAgICAgICAvLyAgLy/lhbPpl63miYDmnIlQYWdlXG4gICAgICAgICAgICAvLyAgUy5VSU1hbmFnZXIuY2xvc2VBbGxQYW5lbHMoKTtcblxuICAgICAgICAgICAgYXdhaXQgdGhpcy5jdXJyZW50U2NlbmUub25Db21wbGV0ZSgpXG4gICAgICAgICAgICAvLyBTLlVJTWFuYWdlci5jbG9zZUxvYWRpbmcoKTtcblxuICAgICAgICB9Y2F0Y2goZXgpe1xuICAgICAgICAgICAgTG9nZ2VyLmxvZyhcImxvYWQgc2NlbmUgZXhjZXA6XCIrZXgpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgIH1cblxuXG5cbiAgICBcbn0iLCJpbXBvcnQgeyBHYW1lT2JqZWN0UG9vbCB9IGZyb20gXCIuLi9mcmFtZXdvcmsvY29tbW9uL0dhbWVPYmplY3RQb29sXCI7XG5pbXBvcnQgeyBSZXNNYW5hZ2VyIH0gZnJvbSBcIi4uL2ZyYW1ld29yay9jb21tb24vUmVzTWFuYWdlclwiO1xuLy8gaW1wb3J0IHsgU3RvcnlNYW5hZ2VyIH0gZnJvbSBcIi4uL2ZyYW1ld29yay9pbmsvU3RvcnlNYW5hZ2VyXCI7XG4vLyBpbXBvcnQgeyBTdG9yeU1lc3NhZ2VNYW5hZ2VyIH0gZnJvbSBcIi4uL2ZyYW1ld29yay9pbmsvU3RvcnlNZXNzYWdlTWFuYWdlclwiO1xuLy8gaW1wb3J0IHsgR2FtZVNlc3Npb24gfSBmcm9tIFwiLi4vZnJhbWV3b3JrL25ldC9HYW1lU2Vzc2lvblwiO1xuLy8gaW1wb3J0IHsgSHR0cE1hbmFnZXIgfSBmcm9tIFwiLi4vZnJhbWV3b3JrL25ldC9IdHRwTWFuYWdlclwiO1xuLy8gaW1wb3J0IHsgU2Vzc2lvbk1hbmFnZXIgfSBmcm9tIFwiLi4vZnJhbWV3b3JrL25ldC9TZXNzaW9uTWFuYWdlclwiO1xuaW1wb3J0IHsgU2NlbmVNYW5hZ2VyIH0gZnJvbSBcIi4uL2ZyYW1ld29yay9zY2VuZS9TY2VuZU1hbmFnZXJcIjtcbi8vIGltcG9ydCB7IFVJTWFuYWdlciB9IGZyb20gXCIuLi9mcmFtZXdvcmsvdWkvVUlNYW5hZ2VyXCI7XG4vLyBpbXBvcnQgeyBVSU1lc3NhZ2VNYW5nZXIgfSBmcm9tIFwiLi4vZ2FtZS9ldmVudC9VSU1lc3NhZ2VNYW5hZ2VyXCI7XG5cbmV4cG9ydCAgY2xhc3MgR2FtZUNvbmZpZ3tcblxuICAgIHB1YmxpYyBzdGF0aWMgZGVidWc6Ym9vbGVhbiA9IHRydWU7XG5cbiAgICAvLyBwdWJsaWMgc3RhdGljIHJlYWxtU2VydmVySVA6c3RyaW5nID0gXCIxMjcuMC4wLjFcIjsgXG4gICAgLy8gcHVibGljIHN0YXRpYyByZWFsbVNlcnZlclBvcnQ6bnVtYmVyID0gOTAwMTtcblxufVxuXG5leHBvcnQgY2xhc3MgU3tcbiAgICAvLyBwdWJsaWMgc3RhdGljIFVJTWFuYWdlciA9IFVJTWFuYWdlci5JbnN0YW5jZShVSU1hbmFnZXIpO1xuICAgIC8vIHB1YmxpYyBzdGF0aWMgVUlNZXNzYWdlTWFuZ2VyID0gVUlNZXNzYWdlTWFuZ2VyLkluc3RhbmNlKFVJTWVzc2FnZU1hbmdlcik7XG4gICAgcHVibGljIHN0YXRpYyBTY2VuZU1hbmFnZXIgPSBTY2VuZU1hbmFnZXIuSW5zdGFuY2UoU2NlbmVNYW5hZ2VyKTtcbiAgICBwdWJsaWMgc3RhdGljIEdhbWVPYmplY3RQb29sID0gR2FtZU9iamVjdFBvb2wuSW5zdGFuY2UoR2FtZU9iamVjdFBvb2wpO1xuICAgIHB1YmxpYyBzdGF0aWMgUmVzTWFuYWdlciA9IFJlc01hbmFnZXIuSW5zdGFuY2UoUmVzTWFuYWdlcik7XG4gICAgLy8gcHVibGljIHN0YXRpYyBTdG9yeU1hbmFnZXIgPSBTdG9yeU1hbmFnZXIuSW5zdGFuY2UoU3RvcnlNYW5hZ2VyKTtcbiAgICAvLyBwdWJsaWMgc3RhdGljIFNlc3Npb25NYW5hZ2VyID0gU2Vzc2lvbk1hbmFnZXIuSW5zdGFuY2UoU2Vzc2lvbk1hbmFnZXIpO1xuICAgIC8vIHB1YmxpYyBzdGF0aWMgR2FtZVNlc3Npb24gPSBHYW1lU2Vzc2lvbi5JbnN0YW5jZShHYW1lU2Vzc2lvbik7XG4gICAgLy8gcHVibGljIHN0YXRpYyBTdG9yeU1lc3NhZ2VNYW5hZ2VyID0gU3RvcnlNZXNzYWdlTWFuYWdlci5JbnN0YW5jZShTdG9yeU1lc3NhZ2VNYW5hZ2VyKTtcbiAgICAvLyBwdWJsaWMgc3RhdGljIEh0dHBNYW5hZ2VyID0gSHR0cE1hbmFnZXIuSW5zdGFuY2UoSHR0cE1hbmFnZXIpO1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY3NoYXJwXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInB1ZXJ0c1wiKTsiXSwic291cmNlUm9vdCI6IiJ9