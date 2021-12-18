import { S } from "../../global/GameConfig";
import { Singleton } from "../common/Singleton";
import { Logger } from "../logger/Logger";
import { BaseScene } from "./BaseScene";
import { SceneFactory } from "./SceneFactory";

export class SceneManager extends Singleton<SceneManager>{

    private currentScene:BaseScene = null;

    constructor(){
        super();
    }

    public async loadScene(scene:string){
        
        try{
            //清理旧场景
            if(this.currentScene){
                this.currentScene.onLeave();
                this.currentScene.onDestroy();
            }

            //开始加载场景
            let sceneInstance = await S.ResManager.loadScene(scene);

            //开始加载进入场景的资源
            this.currentScene =  SceneFactory.createScene(scene);
            this.currentScene.setSceneInstance(sceneInstance);
            this.currentScene.onEnter();


            //加载资源
            await this.currentScene.loadAssetsAsync();

            await this.currentScene.onComplete()
        }catch(ex){
            Logger.log("load scene excep:"+ex);
        }
    }
}