import BattleScene from "../../game/module/pvp/BattleScene";
import { BaseScene } from "./BaseScene";
import { SceneDef } from "./SceneDef";



export class SceneFactory{


    public static createScene(sceneName:string):BaseScene{

        let scene:BaseScene = null;

        switch (sceneName){
            case SceneDef.BattleScene:
                scene = new BattleScene();
                break;
        }

        return scene;
    }
}