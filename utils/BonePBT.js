export default function convertBoneDataToPBTObject(boneData) {
    let result = "";
    let tabs = "      "; //3 by default to start off the PBT Object
    let newLine = "\n";

    result += tabs + "Objects {" + newLine;
    result += tabs + `  Id: ${boneData.id}` + newLine;
    result += tabs + `  Name: "${boneData.name}"` + newLine;
    //Transform
    result += tabs + "  Transform {" + newLine;
        // Location
    result += tabs + "    Location {" + newLine;
    result += tabs + `      X: ${boneData.lx}` + newLine;
    result += tabs + `      Y: ${boneData.ly}` + newLine;
    result += tabs + `      Z: ${boneData.lz}` + newLine;
    result += tabs + "    }" + newLine;
        // Rotation
    result += tabs + "    Rotation {" + newLine;
    // result += tabs + `\t\t\tPitch: ${boneData.rx}` + newLine;
    // result += tabs + `\t\t\tYaw: ${boneData.ry}` + newLine;
    // result += tabs + `\t\t\tRoll: ${boneData.rz}` + newLine;
    result += tabs + "    }" + newLine;
        // Scale
    result += tabs + "    Scale{" + newLine;
    result += tabs + "      X: 1" + newLine;
    result += tabs + "      Y: 1" + newLine;
    result += tabs + "      Z: 1" + newLine;
    result += tabs + "    }" + newLine;
    result += tabs + "  }" + newLine;
    
    // Parent and Children
    result += tabs + `  ParentId: ${boneData.parentID == undefined || 0 ? "4781671109827199097" : boneData.parentID}` + newLine;

    for (let i = 0; i <= boneData.children.length - 1; i++) {
        result += tabs + `  ChildIds: ${boneData.children[i]}` + newLine;
    }

    // Extra Settings
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