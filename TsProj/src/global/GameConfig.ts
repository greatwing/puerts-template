import { GameObjectPool } from "../framework/common/GameObjectPool";
import { ResManager } from "../framework/common/ResManager";
import { SceneManager } from "../framework/scene/SceneManager";

export  class GameConfig{
    public static debug:boolean = true;
}

export class S{
    public static SceneManager = SceneManager.Instance(SceneManager);
    public static GameObjectPool = GameObjectPool.Instance(GameObjectPool);
    public static ResManager = ResManager.Instance(ResManager);
}
