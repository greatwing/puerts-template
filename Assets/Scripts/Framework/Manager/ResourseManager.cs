//using FairyGUI;
//using fb;
using System;
using System.Threading.Tasks;
using UnityEngine;
using UnityEngine.AddressableAssets;
using UnityEngine.ResourceManagement.ResourceProviders;
using UnityEngine.SceneManagement;

namespace Framework
{
    public class ResourceManager
    {
        public static Action<string, byte[]> OnFBLoadedHandle = null;

        public static async Task<bool> PreloadJS(string jsLabel)
        {
            var list = await Addressables.LoadAssetsAsync<TextAsset>(jsLabel, null).Task;
            if (list != null)
            {
                JsManager.Instance.jscache.Clear();
                foreach (var txt in list)
                {
                    JsManager.Instance.jscache.Add($"{txt.name}.js", txt.text);
                }
                return true;
            }
            else
            {
                Log.Error(LogGroups.Engine, "加载JS失败......");
                return false;
            }
        }

        public static async Task<SceneInstance> LoadScene(string sceneName, LoadSceneMode mode, Action<float> update, bool isActiveOnLoaded = true, int priority = 100)
        {
            var handle = Addressables.LoadSceneAsync(sceneName, mode, isActiveOnLoaded, priority);

            var _update = GlobalMonoBehavior.Instance.AddUpdate(e: () =>
            {
                update?.Invoke(handle.PercentComplete);
            });

            var res = await handle.Task;

            GlobalMonoBehavior.Instance.RemoveUpdate(_update);

            return res;
        }

        public static async Task<SceneInstance> UnloadScene(SceneInstance sceneInstance, bool autoReleaseHandler = true)
        {
            var res = await Addressables.UnloadSceneAsync(sceneInstance, autoReleaseHandler).Task;
            return res;
        }

        public static void UnloadSceneByName(string sceneName)
        {
            SceneManager.UnloadSceneAsync(sceneName);
        }

        public static async Task<GameObject> LoadPrefab(string address)
        {
            var res = await Addressables.LoadAssetAsync<GameObject>(address).Task;

            return res;
        }


        public static async Task<TextAsset> LoadTextAsset(string address)
        {
            var res = await Addressables.LoadAssetAsync<TextAsset>(address).Task;

            return res;
        }

        public static async Task<Puerts.ArrayBuffer> LoadTextBytes(string address)
        {
            var res = await Addressables.LoadAssetAsync<TextAsset>(address).Task;

            return new Puerts.ArrayBuffer(res.bytes);
        }

        public static async Task<Sprite> LoadSprite(string address)
        {
            var res = await Addressables.LoadAssetAsync<Sprite>(address).Task;

            return res;
        }

        public static void ReleaseAddressGO(UnityEngine.Object go)
        {
            Addressables.Release(go);
        }


        public static string GetStatusSummary()
        {
            return "";
        }
    }
}
