export function convertSphereDataToPBTObject(sphereData) {
    let result = "";
    let tabs = "      "; //3 by default to start off the PBT Object
    let newLine = "\n";

    result += tabs + "Objects {" + newLine;
    result += tabs + `  Id: ${sphereData.id}` + newLine;
    result += tabs + '  Name: "Sphere"' + newLine;
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
    result += tabs + "      X: 0.15" + newLine;
    result += tabs + "      Y: 0.15" + newLine;
    result += tabs + "      Z: 0.15" + newLine;
    result += tabs + "    }" + newLine;
    result += tabs + "  }" + newLine;
    // Parent
    result += tabs + `  ParentId: ${sphereData.parentID}` + newLine;
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
    result += tabs + "  CoreMesh {" + newLine;
    result += tabs + "    MeshAsset {" + newLine;
    result += tabs + "      Id: 17995620016234935586" + newLine;
    result += tabs + "    }" + newLine;
    result += tabs + "    Teams {" + newLine;
    result += tabs + "      IsTeamCollisionEnabled: true" + newLine;
    result += tabs + "      IsEnemyCollisionEnabled: true" + newLine;
    result += tabs + "    }" + newLine;
    result += tabs + "    StaticMesh {" + newLine;
    result += tabs + "      Physics {" + newLine;
    result += tabs + "        Mass: 100" + newLine;
    result += tabs + "        LinearDamping: 0.01" + newLine;
    result += tabs + "      }" + newLine;
    result += tabs + "      BoundsScale: 1" + newLine;
    result += tabs + "    }" + newLine;
    result += tabs + "  }" + newLine;
    result += tabs + "  Relevance {" + newLine;
    result += tabs + '    Value: "mc:edistancerelevance:critical"' + newLine;
    result += tabs + "  }" + newLine;
    result += tabs + "  NetworkRelevanceDistance {" + newLine;
    result += tabs + '    Value: "mc:eproxyrelevance:critical"' + newLine;
    result += tabs + "  }" + newLine;
    result += tabs + "  IsReplicationEnabledByDefault: true" + newLine;
    result += tabs + "}" + newLine;

    return result;
}

export function addSphereAssetToPBT() {
    let result = "";
    let tabs = "    " //2 for where assets need to sit outside of the Object Block
    let newLine = "\n";

    result += tabs + "Assets {" + newLine;
    result += tabs + "  Id: 17995620016234935586" + newLine;
    result += tabs + '  Name: "Sphere"' + newLine;
    result += tabs + "  PlatformAssetType: 1" + newLine;
    result += tabs + "  PrimaryAsset {" + newLine;
    result += tabs + '    AssetType: "StaticMeshAssetRef"' + newLine;
    result += tabs + '    AssetId: "sm_sphere_002"' + newLine;
    result += tabs + "  }" + newLine;
    result += tabs + "}" + newLine;

    return result;
}