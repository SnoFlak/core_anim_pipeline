export default function convertArtGroupToPBTObject(artGroup) {
    let result = "";
    let tabs = "      "; //3 by default to start off the PBT Object
    let newLine = "\n";

    result += tabs + "Objects {" + newLine;
    result += tabs + `  Id: ${artGroup.id}` + newLine;
    result += tabs + `  Name: "${artGroup.name}"` + newLine;
    //Transform
    result += tabs + "  Transform {" + newLine;
        // Location
    result += tabs + "    Location {" + newLine;
    result += tabs + "    }" + newLine;
        // Rotation
    result += tabs + "    Rotation {" + newLine;
    result += tabs + "    }" + newLine;
        // Scale
    result += tabs + "    Scale {" + newLine;
    result += tabs + "      X: 1" + newLine;
    result += tabs + "      Y: 1" + newLine;
    result += tabs + "      Z: 1" + newLine;
    result += tabs + "    }" + newLine;
    result += tabs + "  }" + newLine;
    
    // Parent
    artGroup.parentID == undefined ? () => {
        console.error('ERROR: Art Group parentID is undefined when trying to convert ArtGroup object to PBT Object.');
        process.exit(1)
    } 
    :
    result += tabs + `  ParentId: ${artGroup.parentID}` + newLine;

    for (let i = 0; i <= artGroup.children.length - 1; i++) {
        result += tabs + `  ChildIds: ${artGroup.children[i]}` + newLine;
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