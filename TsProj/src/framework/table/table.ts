import { tab } from "./table_gen";
import { Framework } from 'csharp';
import { $promise } from "puerts";

export async function LoadTable() {
    try {
        let task = Framework.ResourceManager.LoadTextAsset('Json/table_gen.json')
        let textAsset = await $promise(task);
        tab.InitData(textAsset.text);
        Framework.ResourceManager.ReleaseAddressGO(textAsset);
    } catch(e) {
        console.error(`LoadTable: ${e}`)
    }
}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   