import fs from 'fs';
import {BoneData, ArtGroup, Sphere} from './utils/classes.js';
import convertArtGroupToPBTObject from './utils/ArtGroupPBT.js';
import convertBoneDataToPBTObject from './utils/BonePBT.js';
import {convertSphereDataToPBTObject, addSphereAssetToPBT} from './utils/SpherePBT.js';
import {initializePBTFile, closePBTFile} from './utils/pbtInit.js';

const args = process.argv.slice(2);
if (args.length !== 2) {
    console.error('Usage: node rigify.js <rigName> <jsonFilePath>');
    process.exit(1);
}

const rigName = args[0];
const jsonFilePath = args[1];

function readJSONFile() {
    return new Promise((resolve, reject) => {
        fs.readFile(jsonFilePath, 'utf8', (err, data) => {
            if (err) {
                return reject(err);
            }
            try {
                const jsonObject = JSON.parse(data);
                resolve(jsonObject);
            } catch (parseErr) {
                reject(parseErr);
            }
        });
    });
}

function makeID() {
    const chars = "0123456789";
    let result = "13370000";
    let counter = 0;
    while (counter < 11) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
        counter += 1;
    }
    return result;
}

// const writeBoneDataByIndex = (writeLine, bones, index) => {
//     let selectedBone = bones[index];
//     let data = convertBoneDataToPBTObject(selectedBone);
//     writeLine(data);
// }

// const writeArtGroupDataByIndex = (writeLine, artGroups, index) => {
//         let selectedArtGroup = artGroups[index];
//         let data = convertArtGroupToPBTObject(selectedArtGroup);
//         writeLine(data);
// }

// const writeSphereDataByIndex = (writeLine, spheres, index) => {
//     for(let i = 0; i <= spheres.length - 1; i++) {
//         let selectedSphere = spheres[index];
//         let data = convertSphereDataToPBTObject(selectedSphere);
//         writeLine(data);
//     }
// }

const writeBoneData = (writeLine, bones) => {
    for(let i = 0; i <= bones.length - 1; i++) {
        // console.log("COUNT: " + i + " / TOTAL SIZE OF bones[]: " + bones.length);
        let selectedBone = bones[i];
        let data = convertBoneDataToPBTObject(selectedBone);
        writeLine(data);
    }
}

const writeArtGroupData = (writeLine, artGroups) => {
    for(let i = 0; i <= artGroups.length - 1; i++) {
        // console.log("COUNT: " + i + " / TOTAL SIZE OF artGroups[]: " + artGroups.length);
        let selectedArtGroup = artGroups[i];
        let data = convertArtGroupToPBTObject(selectedArtGroup);
        writeLine(data);
    }
}

const writeSphereData = (writeLine, spheres) => {
    for(let i = 0; i <= spheres.length - 1; i++) {
        // console.log("COUNT: " + i + " / TOTAL SIZE OF spheres[]: " + spheres.length);
        let selectedSphere = spheres[i];
        let data = convertSphereDataToPBTObject(selectedSphere);
        writeLine(data);
    }
}

async function convertJSON() {
    try {
        const jsonObject = await readJSONFile();
        const rigObject = {};

        let bones = [];
        let artGroups = [];
        let spheres = [];

        // set up initial rigObject
        for (let i = 0; i < jsonObject.length; i++) {
            let boneData = jsonObject[i];
            let itemID = makeID();

            rigObject[`${boneData.name}`] = {
                "name": boneData.name,
                "head": boneData.head,
                "tail": boneData.tail,
                "parent": boneData.parent,
                "itemID": itemID
            }

            let locationDiffs = {"x": 0, "y": 0, "z": 0};

            locationDiffs.x = (boneData.tail.x - boneData.head.x) * 10;
            locationDiffs.y = (boneData.tail.y - boneData.head.y) * 10;
            locationDiffs.z = (boneData.tail.z - boneData.head.z) * 10;

            rigObject[`${boneData.name}`].locs = locationDiffs;
        }

        //loop through jsonObject again to grab children id's since its properly set up now
        for (let i = 0; i < jsonObject.length; i++) {
            let currentBone = jsonObject[i];
            let childrenIDs = [];
            let parentID = 0;
            for (let j = 0; j < jsonObject.length; j++) {
                let searchedBone = jsonObject[j];

                if (searchedBone.parent == currentBone.name) {
                    childrenIDs.push(rigObject[`${searchedBone.name}`].itemID);
                }

                if (currentBone.parent == searchedBone.name) {
                    parentID = rigObject[`${searchedBone.name}`].itemID;
                }
            }

            //calculate rotations
            let theta_y = Math.atan2(currentBone.tail.z - currentBone.head.z, 1);
            let degrees_y = (theta_y * 180) / Math.PI;

            let theta_z = Math.atan2(currentBone.tail.y - currentBone.head.y, 1);
            let degrees_z = (theta_z * 180) / Math.PI;

            rigObject[`${currentBone.name}`].yRotation = degrees_z;
            rigObject[`${currentBone.name}`].zRotation = degrees_y;
            rigObject[`${currentBone.name}`].childrenIDs = childrenIDs;
            rigObject[`${currentBone.name}`].parentID = parentID;
        }

        let rigObjectValues = Object.values(rigObject);

        //loop through each value in rigObject and set up the Bone Objects
        for (let i = 0; i < rigObjectValues.length; i++) {
            let selectedBone = rigObjectValues[i]; //selectedBone
            let rigBone = rigObject[`${selectedBone.name}`];

            let newBoneObject = new BoneData(rigBone.itemID, rigBone.name, rigBone.locs.x, rigBone.locs.y, rigBone.locs.z, 0,0,0, rigBone.parentID, rigBone.childrenIDs)
            
            //create art group
            let artGroupID = makeID();
            let artGroupChildren = [];
            let newArtGroup = new ArtGroup(artGroupID, "Art", newBoneObject.id, artGroupChildren);

            //create sphere
            let sphereID = makeID();
            let newSphere = new Sphere(sphereID, artGroupID);

            //add sphere to art group children
            newArtGroup.children.push(sphereID);

            //add art group to children
            newBoneObject.children.push(artGroupID);
            
            //add all objects to their arrays
            bones.push(newBoneObject);
            artGroups.push(newArtGroup);
            spheres.push(newSphere);
        }

        //create ROOT container group folder
        let parentGroup = new BoneData(makeID(), rigName, 0,0,0,0,0,0, "4781671109827199097", [bones[0].id])
        bones[0].parentID = parentGroup.id;

        CreateFile(parentGroup, bones, artGroups, spheres);

    } catch(e) {
        console.error(e);
    }
}

async function CreateFile(parentGroup, bones, artGroups, spheres) {
    try {

        let rigPBTFile = fs.createWriteStream(`${rigName}.pbt`, {
            flags: 'a'
        });

        const writeLine = (line) => rigPBTFile.write(`${line}`);

        let pbtInit = initializePBTFile(makeID(), parentGroup)
        writeLine(pbtInit);

        //loop through bones and add to file
        writeBoneData(writeLine, bones);

        //loop through art groups and add to file
        writeArtGroupData(writeLine, artGroups);

        //loop through spheres and add to file
        writeSphereData(writeLine, spheres);

        writeLine("    }\n"); // Close the ObjectBlock off

        let sphereAsset = addSphereAssetToPBT();
        writeLine(sphereAsset);

        let closing = closePBTFile();
        writeLine(closing);
    } catch(e) {
        console.error(e);
    }
}

convertJSON();