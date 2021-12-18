import { tab } from "./table_gen";
import { NiceTS } from 'csharp';
import { $promise } from "puerts";

export async function LoadTable() {
    try {
        let task = NiceTS.ResourceManager.LoadTextAsset('Json/table_gen.json')
        let textAsset = await $promise(task);
        tab.InitData(textAsset.text);
        NiceTS.ResourceManager.ReleaseAddressGO(textAsset);
    } catch(e) {
        console.error(`LoadTable: ${e}`)
    }
}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   