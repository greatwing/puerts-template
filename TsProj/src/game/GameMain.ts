
import { JsManager ,GameLaunch } from 'csharp';
import { SceneDef } from '../framework/scene/SceneDef';
import { S } from '../global/GameConfig';
import { Logger } from '../framework/logger/Logger';

class GameMain{

    constructor() {
        JsManager.Instance.JsOnApplicationQuit = () => this.onApplicationQuit();
        JsManager.Instance.JsOnDispose = () => this.onDispose();
    }

    public async start() {
        
        try{
            Logger.log("Game start in JS....");

            // //进入登录模块
            // await S.SceneManager.loadScene(SceneDef.LoginScene);
            await S.SceneManager.loadScene(SceneDef.BattleScene);

            
            //JS启动完成，通知C#层
            GameLaunch.Instance.JsLuanchFinish();
        }catch(ex){
            Logger.error(ex);
        }

    }

    public onApplicationQuit():void {
        S.GameObjectPool.cleanup(true);
        Logger.log("Game onApplicationQuit in JS....");
    }

    public onDispose():void {
        
        Logger.log("Game onDispose in JS....");
    }
}

new GameMain().start();

