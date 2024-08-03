export default function initializePBTFile(id, name, parentID, childID) {
    let result = "";
    let tabs = "\t\t\t";
    let newLine = "\n";
    
    result += "Assets {" + newLine;
    result += `\tId: ${id}` + newLine;
    result += `\tName: ${name}` + newLine;
    result += "\tPlatformAssetType: 5" + newLine;
    result += "\tTemplateAsset {" + newLine;
    //Objects
    result += "\t\tObjectBlock {" + newLine;
    result += `\t\t\tRootId: ${parentID}` + newLine;
    //Object
    result += "\t\t\tObjects {" + newLine;
    result += `\t\t\t\tId: ${parentID}` + newLine;
    result += `\t\t\t\tName: ${name}` + newLine;
    //Transform
    result += "\t\t\t\tTransform {" + newLine;
    result += "\t\t\t\t\tScale {" + newLine;
    result += "\t\t\t\t\t\tX: 1" + newLine;
    result += "\t\t\t\t\t\tY: 1" + newLine;
    result += "\t\t\t\t\t\tZ: 1" + newLine;
    result += "\t\t\t\t\t}" + newLine;
    result += "\t\t\t\t}" + newLine;
    result += "\t\t\t\tParentId: 4781671109827199097" + newLine;
    result += `\t\t\t\tChildIds: ${parseInt(childID)}` + newLine;
    //Extra Settings
    result += tabs + "\tCollidable_v2 {" + newLine;
    result += tabs + '\t\tValue: "mc:ecollisionsetting:inheritfromparent"' + newLine;
    result += tabs + "\t}" + newLine;
    result += tabs + "\tVisible_v2 {" + newLine;
    result += tabs + '\t\tValue: "mc:evisibilitysetting:inheritfromparent"' + newLine;
    result += tabs + "\t}" + newLine;
    result += tabs + "\tCameraCollidable {" + newLine;
    result += tabs + '\t\tValue: "mc:ecollisionsetting:inheritfromparent"' + newLine;
    result += tabs + "\t}" + newLine;
    result += tabs + "\tEditorIndicatorVisibility {" + newLine;
    result += tabs + '\t\tValue: "mc:eindicatorvisibility:visiblewhenselected"' + newLine;
    result += tabs + "\t}" + newLine;
    result += tabs + "\tFolder {" + newLine;
    result += tabs + '\t\tIsGroup: true' + newLine;
    result += tabs + "\t}" + newLine;
    result += tabs + "\tNetworkRelevanceDistance {" + newLine;
    result += tabs + '\t\tValue: "mc:eproxyrelevance:critical"' + newLine;
    result += tabs + "\t}" + newLine;
    result += tabs + "\tIsReplicationEnabledByDefault: true" + newLine;
    result += tabs + "}" + newLine;

    return result;
}

export default function closePBTFile() {
    let result = "";
    let newLine = "\n";

    result += "\t\tPrimaryAssetId {" + newLine;
    result += '\t\t\tAssetType: "None"' + newLine;
    result += '\t\t\tAssetId: "None"' + newLine;
    result += "\t\t}" + newLine;
    result += "\t}" + newLine;
    result += "\tSerializationVersion: 125" + newLine;
    result += "}";

    return result;
}