export default function convertBoneDataToPBTObject(boneData) {
    let result = "";
    let tabs = "\t\t\t"; //3 by default to start off the PBT Object
    let newLine = "\n";

    result += tabs + "Objects {" + newLine;
    result += tabs + `\tId: ${parseInt(boneData.id)}` + newLine;
    result += tabs + `\tName: ${boneData.name}` + newLine;
    //Transform
    result += tabs + "\tTransform {" + newLine;
        // Location
    result += tabs + "\t\tLocation {" + newLine;
    result += tabs + `\t\t\tX: ${boneData.lx}` + newLine;
    result += tabs + `\t\t\tY: ${boneData.ly}` + newLine;
    result += tabs + `\t\t\tZ: ${boneData.lz}` + newLine;
    result += tabs + "\t\t}" + newLine;
        // Rotation
    result += tabs + "\t\tRotation {" + newLine;
    result += tabs + `\t\t\tPitch: ${boneData.rx}` + newLine;
    result += tabs + `\t\t\tYaw: ${boneData.ry}` + newLine;
    result += tabs + `\t\t\tRoll: ${boneData.rz}` + newLine;
    result += tabs + "\t\t}" + newLine;
        // Scale
    result += tabs + "\t\tScale{" + newLine;
    result += tabs + "\t\t\tX: 1" + newLine;
    result += tabs + "\t\t\tY: 1" + newLine;
    result += tabs + "\t\t\tZ: 1" + newLine;
    result += tabs + "\t\t}" + newLine;
    result += tabs + "\t}" + newLine;
    
    // Parent and Children
    result += tabs + `\tParentId: ${boneData.parentID == undefined ? "" : parseInt(boneData.parentID)}` + newLine;

    for (let i = 0; i < boneData.children.length - 1; i++) {
        result += tabs + `\tChildIds: ${parseInt(boneData.children[i])}` + newLine;
    }

    // Extra Settings
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
    result += tabs + "}" + newLine;

    return result;
}