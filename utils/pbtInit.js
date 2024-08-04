export function initializePBTFile(templateID, parentGroup) {
    let result = "";
    let tabs = "      ";
    let newLine = "\n";
    
    result += "Assets {" + newLine;
    result += `  Id: ${templateID}` + newLine;
    result += `  Name: "${parentGroup.name}"` + newLine;
    result += "  PlatformAssetType: 5" + newLine;
    result += "  TemplateAsset {" + newLine;
    //Objects
    result += "    ObjectBlock {" + newLine;
    result += `      RootId: ${parentGroup.id}` + newLine;
    //Object
    result += "      Objects {" + newLine;
    result += `        Id: ${parentGroup.id}` + newLine;
    result += `        Name: "${parentGroup.name}"` + newLine;
    //Transform
    result += "        Transform {" + newLine;
    result += "          Scale {" + newLine;
    result += "            X: 1" + newLine;
    result += "            Y: 1" + newLine;
    result += "            Z: 1" + newLine;
    result += "          }" + newLine;
    result += "        }" + newLine;
    result += "        ParentId: 4781671109827199097" + newLine;
    result += `        ChildIds: ${parentGroup.children[0]}` + newLine;
    //Extra Settings
    result += tabs + "  Collidable_v2 {" + newLine;
    result += tabs + '    Value: "mc:ecollisionsetting:inheritfromparent"' + newLine;
    result += tabs + "  }" + newLine;
    result += tabs + "  Visible_v2 {" + newLine;
    result += tabs + '    Value: "mc:evisibilitysetting:inheritfromparent"' + newLine;
    result += tabs + "  }" + newLine;
    result += tabs + "  CameraCollidable {" + newLine;
    result += tabs + '    Value: "mc:ecollisionsetting:inheritfromparent"' + newLine;
    result += tabs + "  }" + newLine;
    result += tabs + "  EditorIndicatorVisibility {" + newLine;
    result += tabs + '    Value: "mc:eindicatorvisibility:visiblewhenselected"' + newLine;
    result += tabs + "  }" + newLine;
    result += tabs + "  Folder {" + newLine;
    result += tabs + '    IsGroup: true' + newLine;
    result += tabs + "  }" + newLine;
    result += tabs + "  NetworkRelevanceDistance {" + newLine;
    result += tabs + '    Value: "mc:eproxyrelevance:critical"' + newLine;
    result += tabs + "  }" + newLine;
    result += tabs + "  IsReplicationEnabledByDefault: true" + newLine;
    result += tabs + "}" + newLine;

    return result;
}

export function closePBTFile() {
    let result = "";
    let newLine = "\n";

    result += "    PrimaryAssetId {" + newLine;
    result += '      AssetType: "None"' + newLine;
    result += '      AssetId: "None"' + newLine;
    result += "    }" + newLine;
    result += "  }" + newLine;
    result += "  SerializationVersion: 125" + newLine;
    result += "}" + newLine;
    result += "IncludesAllDependencies: true" + newLine;

    return result;
}