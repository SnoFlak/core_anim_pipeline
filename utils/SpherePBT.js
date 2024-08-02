export default function convertSphereDataToPBTObject(sphereData) {
    let result = "";
    let tabs = "\t\t\t"; //3 by default to start off the PBT Object
    let newLine = "\n";

    result += tabs + "Objects {" + newLine;
    result += tabs + `\tId: ${parseInt(sphereData.id)}` + newLine;
    result += tabs + 'Name: "Sphere"' + newLine;
    //Transform
    result += tabs + "\tTransform {" + newLine;
        // Location
    result += tabs + "\t\tLocation {" + newLine;
    result += tabs + "\t\t}" + newLine;
        // Rotation
    result += tabs + "\t\tRotation {" + newLine;
    result += tabs + "\t\t}" + newLine;
        // Scale
    result += tabs + "\t\tScale{" + newLine;
    result += tabs + "\t\t\tX: 0.15" + newLine;
    result += tabs + "\t\t\tY: 0.15" + newLine;
    result += tabs + "\t\t\tZ: 0.15" + newLine;
    result += tabs + "\t\t}" + newLine;
    result += tabs + "\t}" + newLine;
    // Parent
    result += tabs + `\tParentId: ${sphereData.parentID}` + newLine;
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
    result += tabs + "\tCoreMesh {" + newLine;
    result += tabs + "\t\tMeshAsset {" + newLine;
    result += tabs + "\t\t\tId: 17995620016234935586" + newLine;
    result += tabs + "\t\t}" + newLine;
    result += tabs + "\t\tTeams {" + newLine;
    result += tabs + "\t\t\tIsTeamCollisionEnabled: true" + newLine;
    result += tabs + "\t\t\tIsEnemyCollisionEnabled: true" + newLine;
    result += tabs + "\t\t}" + newLine;
    result += tabs + "\t\tStaticMesh {" + newLine;
    result += tabs + "\t\t\tPhysics {" + newLine;
    result += tabs + "\t\t\t\tMass: 100" + newLine;
    result += tabs + "\t\t\t\tLinearDamping: 0.01" + newLine;
    result += tabs + "\t\t\t}" + newLine;
    result += tabs + "\t\t\tBoundsScale: 1" + newLine;
    result += tabs + "\t\t}" + newLine;
    result += tabs + "\t}" + newLine;
    result += tabs + "\tRelevance {" + newLine;
    result += tabs + '\t\tValue: "mc:edistancerelevance:critical"' + newLine;
    result += tabs + "\t}" + newLine;
    result += tabs + "\tNetworkRelevanceDistance {" + newLine;
    result += tabs + '\t\tValue: "mc:eproxyrelevance:critical"' + newLine;
    result += tabs + "\t}" + newLine;
    result += tabs + "\tIsReplicationEnabledByDefault: true" + newLine;
    result += tabs + "}" + newLine;

    return result;
}

export default function addSphereAssetToPBT() {
    let result = "";
    let tabs = "\t\t" //2 for where assets need to sit outside of the Object Block
    let newLine = "\n";

    result += tabs + "Assets {" + newLine;
    result += tabs + "\tId: 17995620016234935586" + newLine;
    result += tabs + '\tName: "Sphere"' + newLine;
    result += tabs + "\tPlatformAsssetType: 1" + newLine;
    result += tabs + "\tPrimaryAsset {" + newLine;
    result += tabs + '\t\tAssetType: "StaticMeshAssetRef"' + newLine;
    result += tabs + '\t\tAssetId: "sm_sphere_002"' + newLine;
    result += tabs + "\t}" + newLine;
    result += tabs + "}" + newLine;

    return result;
}