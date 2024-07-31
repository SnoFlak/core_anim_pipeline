const fs = require('fs');
import {BoneData, ArtGroup} from './util/classes.js';
import convertArtGroupToPBTObject from './utils/ArtGroupPBT.js';
import convertBoneDataToPBTObject from './utils/BonePBT.js';

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

function cleanData(jsonBoneData) {
    let boneData = new BoneData();

    //TODO: revamp the convertJSON function into more modular parts.

    boneData.id = makeID();
    boneData.name = jsonBoneData.name;
    boneData.children = [];
}

async function convertJSON() {
    try {
        const jsonObject = await readJSONFile();
        const parentGroupID = makeID();
        const rigObject = {};

                // set up initial rigObject
                for (let i = 0; i < jsonObject.length; i++) {
                    let boneData = jsonObject[i];
                    let itemID = makeID();
        
                    // let customIdent = i + 1 < 10 ? `0${i + 1}` : `${i + 1}`;
        
                    rigObject[`${boneData.name}`] = {
                        "name": boneData.name,
                        "head": boneData.head,
                        "tail": boneData.tail,
                        "parent": boneData.parent,
                        // "itemID": (itemID + customIdent),
                        "itemID": itemID
                    }
        
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
        
                // console.log(rigObject);
        
                let listOfData = Object.values(rigObject);
    } catch(e) {
        console.error(e);
    }
}