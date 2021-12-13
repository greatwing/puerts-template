import { BaseScene } from "./BaseScene";
import { SceneDef } from "./SceneDef";



export class SceneFactory{


    public static createScene(sceneName:string):BaseScene{

        let scene:BaseScene = null;

        switch (sceneName){
            case SceneDef.BattleScene:
                // scene = new LoginScene();
                break;
        }

        return scene;
    }
}