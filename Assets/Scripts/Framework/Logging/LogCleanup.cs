using UnityEngine;

namespace Framework{
	public class LogCleanup : MonoBehaviour
	{
		private void OnDestroy()
		{
			Log.Shutdown();
		}
	}
}
