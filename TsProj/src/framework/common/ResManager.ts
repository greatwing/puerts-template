
import { Singleton } from './Singleton';
import { $promise } from 'puerts';
import {Framework, UnityEngine} from 'csharp';
import { Logger } from '../logger/Logger';

export class ResManager extends Singleton<ResManager>{

    private _pkgMap:Map<string,number> = new Map<string,number>();

    constructor(){
        super();
    }
    
    async loadScene(sceneName:string, mode = UnityEngine.SceneManagement.LoadSceneMode.Single){
        try{
          
            let task = Framework.ResourceManager.LoadScene(sceneName, mode,(progress:Number)=>{
                Logger.log("load scene: "+progress)
            });

            let scenInstance = await $promise(task)
            return scenInstance

        }catch(ex){

            Logger.error(`Load Scene :${sceneName} : ${ex}`)

            return null;
        }
    }


    async unloadScene(sceneInstance:UnityEngine.ResourceManagement.ResourceProviders.SceneInstance){
        try{
            let task= Framework.ResourceManager.UnloadScene(sceneInstance)
            let go = await $promise(task);
            return go;
        }catch(ex){

            Logger.error(`Unload scene  : ${ex}`)

            return null;
        }
    }

    public unloadSceneByName(sceneName:string){

        Framework.ResourceManager.UnloadSceneByName(sceneName);
    }

    async loadPrefab(address:string){

        try{
            let task= Framework.ResourceManager.LoadPrefab(address);
            let go = await $promise(task);
            return go;
        }catch(ex){

            Logger.error(`Load prefab :${address} : ${ex}`)

            return null;
        }

    }

    async loadTextAsset(address:string){

        try{
            let task = Framework.ResourceManager.LoadTextAsset(address);
            let go = await $promise(task);
            return go;
        }catch(ex){
            Logger.error(`Load textasset :${address} : ${ex}`)

            return null;
        }
    }


    async loadTextBytes(address:string){

        try{
            let task = Framework.ResourceManager.LoadTextBytes(address);
            let bytes = await $promise(task);
            return bytes;
        }catch(ex){
            Logger.error(`LoadTextBytes :${address} : ${ex}`)
        }
    }

    async loadSprite(address:string){

        try{
            let task = Framework.ResourceManager.LoadSprite(address);
            let go = await $promise(task);
            return go;

        }catch(ex){
            Logger.error(`Load sprite :${address} : ${ex}`)

            return null;
        }
    }


    public releaseAddressGO(go:any){

        Framework.ResourceManager.ReleaseAddressGO(go);
    }


    
}