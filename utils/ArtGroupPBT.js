export default function convertArtGroupToPBTObject(artGroup) {
    let result = "";
    let tabs = "\t\t\t"; //3 by default to start off the PBT Object
    let newLine = "\n";

    result += tabs + "Objects {" + newLine;
    result += tabs + `\tId: ${parseInt(artGroup.id)}` + newLine;
    result += tabs + `\tName: ${artGroup.name}` + newLine;
    //Transform
    result += tabs + "\tTransform {" + newLine;
        // Scale
    result += tabs + "\t\tScale{" + newLine;
    result += tabs + "\t\t\tX: 1" + newLine;
    result += tabs + "\t\t\tY: 1" + newLine;
    result += tabs + "\t\t\tZ: 1" + newLine;
    result += tabs + "\t\t}" + newLine;
    result += tabs + "\t}" + newLine;
    
    // Parent
    artGroup.parentID == undefined ? () => {
        console.error('ERROR: Art Group parentID is undefined when trying to convert ArtGroup object to PBT Object.');
        process.exit(1)
    } 
    :
    result += tabs + `\tParentId: ${parseInt(artGroup.parentID)}` + newLine;

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