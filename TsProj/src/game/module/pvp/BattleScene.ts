import { UnityEngine } from "csharp";
import { $typeof } from "puerts";
import { Logger } from "../../../framework/logger/Logger";
import { BaseScene } from "../../../framework/scene/BaseScene";

export default class BattleScene extends BaseScene {

    public onEnter() {
        Logger.log("BattleScene onEnter ~");
        let objCW = UnityEngine.GameObject.Find("Team1/CubeWhite");
        let objCB = UnityEngine.GameObject.Find("Team2/CubeBlue");
        if(objCW && objCB) {
            Logger.log(`objCW = ${objCW.name}`)
            
            let agent = objCW.GetComponent($typeof(UnityEngine.AI.NavMeshAgent)) as UnityEngine.AI.NavMeshAgent;
            if(!agent.IsNull()) {
                Logger.log(`find agent!!`)
                // agent.SetDestination(objCB.transform.position);
            }
        }
    }
    public onComplete():Promise<any> {
        Logger.log("BattleScene onComplete ~");
        return Promise.resolve()
    }
    public onLeave() {
        Logger.log("BattleScene onLeave ~");
    }

}