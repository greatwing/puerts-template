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
            let agentCW = objCW.GetComponent($typeof(UnityEngine.AI.NavMeshAgent)) as UnityEngine.AI.NavMeshAgent;
            if(!agentCW.IsNull()) {
                // agent.SetDestination(objCB.transform.position);
                agentCW.SetDestination(new UnityEngine.Vector3(0,0,-2));
            }

            let agentCB = objCB.GetComponent($typeof(UnityEngine.AI.NavMeshAgent)) as UnityEngine.AI.NavMeshAgent;
            if(!agentCB.IsNull()) {
                // agent.SetDestination(objCB.transform.position);
                agentCB.SetDestination(new UnityEngine.Vector3(0,0,2));
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