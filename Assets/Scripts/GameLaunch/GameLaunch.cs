using Framework;
using System.Threading.Tasks;
using UnityEngine;

public class GameLaunch : MonoSingleton<GameLaunch>
{

    public GameObject launchPageGO;

    async Task Start()
    {
        JsManager.Instance.Startup();

        // 开始更新
        var launchPage = launchPageGO.GetComponent<LaunchPage>();
        if (launchPage != null)
        {
            await launchPage.CheckUpdate();
        }
    }

    //private void Update() => ThreadSynchronizationContext.Instance.Update();

    public void JsLuanchFinish()
    {

    }
}
