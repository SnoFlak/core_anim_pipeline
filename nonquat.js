import fs from 'fs';

const args = process.argv.slice(2);
if (args.length !== 2) {
    console.error('Usage: node nonquat.js <animationName> <jsonFilePath>');
    process.exit(1);
}

const animationName = args[0];
const jsonFilePath = args[1];

//Function to read JSON file and convert to JSON object
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

function sortArrayByNumber(arr) {
    return arr.sort((a,b) => a - b);
}

async function convertJSON() {

    try {
        const jsonObject = await readJSONFile();
        let keyframes = []
        let dataStore = Object.entries(jsonObject.Armature)

        // loop through bones in animdata
        for(let i = 0; i < dataStore.length; i++){
            //loop through keyframes
            let curBone = dataStore[i]
            let curBoneRotationFrames = Object.keys(curBone[1].rotation_euler)

            for(let j = 0; j < curBoneRotationFrames.length; j++) {
                keyframes.push(curBoneRotationFrames[j])
            }
        }

        // get all of the unique keyframes inside of the anim data
        let filteredKeyFrames = keyframes.filter((value, index, self) => self.indexOf(value) === index);
        keyframes = sortArrayByNumber(filteredKeyFrames);

        // open fileWriteStream
        let animationFile = fs.createWriteStream(`${animationName}.lua`, {
            flags: 'a' //appending
        })

        const writeLine = (line) => animationFile.write(`${line}\n`);
        selfStamp(writeLine, animationName);
        writeLine("\nlocal scaler = 1"); //internal lua script usage for playback speed inside of Core
        writeLine(`function ${animationName}()`);

        const frameScalar = 0.016667 // given the player is reaching 60fps

        // loop through keyframes
        for (let i = 0; i < keyframes.length; i++) {
            let keyframeRef = keyframes[i]
            // writeLine(`\t-- KEYFRAME: ${keyframeRef}`)

            //loop through bones
            for (let j = 0; j < dataStore.length; j++) {
                // selectedBoneRotations Format: 
                // - selectedBoneRotations[n]        => data under that bone that increments by keyframe
                // - selectedBoneRotations[0][n]     => grab keyframe @0 or position/rotation data at @1
                // - selectedBoneRotations[0][1][n]  => grab x,y,z,w at 0,1,2,3

                /*

                let i = 1.0;

                let ArmRotations = {
                    '1.0': [ 1, 0, 0, 0 ],
                    '40.0': [ 0.9238795638084412, 0, 0, 0.3826834261417389 ],
                    '80.0': [ 1.0000001192092896, 0, 0, 0 ],
                    '120.0': [ 0.9238796830177307, 0, 0, -0.38268348574638367 ],      
                    '160.0': [ 1.0000001192092896, 0, 0, 0 ]
                }

                on iteration of keyframe 1.0 for i, ArmRotations should use the next index of keyframe data for the BONE:
                main keyframe loop: frame 1 (i = 1.0)
                data to write: ARM:RotateTo(Quaternion.New(data from bone keyframedata 40.0), difference between 40.0 and 1.0, true)
                since Core has us place a time for the Rotations, we must call them on the last keyframe where something happens, so by the time the given time is up, it will be at the given rotation
                and from there, we are following suit with the rest of the animation. This is fine as long as the animations are LOOPABLE! 

                */

                let selectedBoneRotations = Object.entries(dataStore[j][1].rotation_euler);
                let listOfKeyframesForBone = Object.keys(dataStore[j][1].rotation_euler);
                let currentKeyFrameIndex = listOfKeyframesForBone.indexOf(keyframeRef);
                let nextKeyFrameRef = listOfKeyframesForBone[currentKeyFrameIndex + 1]
                if (currentKeyFrameIndex == -1) {
                    continue;
                }
                let selectedBoneName = dataStore[j][0];
                let rotationData = dataStore[j][1].rotation_euler[nextKeyFrameRef]

                if (selectedBoneRotations === undefined || rotationData === undefined) {
                    continue
                } else {
                    let timeDifference = ((parseInt(nextKeyFrameRef) - parseInt(keyframeRef)) * frameScalar).toFixed(6);
                    writeLine(`\t${selectedBoneName.toUpperCase()}:RotateTo(Rotation.New(${-rotationData[0]},${rotationData[2]},${rotationData[1]}), ${timeDifference} * scaler, true)`)    
                }

                if (selectedBoneName == "Pelvis") {
                    //add positional logic for Pelvis
                    // let selectedBoneLocations = Object.entries(dataStore[j][1].location);
                    let listOfKeyframesForBoneLocation = Object.keys(dataStore[j][1].location);
                    let currentKeyframeIndexForLocation = listOfKeyframesForBoneLocation.indexOf(keyframeRef);
                    let nextKeyFrameRefForLocation = listOfKeyframesForBoneLocation[currentKeyframeIndexForLocation + 1];
                    if (currentKeyframeIndexForLocation == -1) {
                        continue;
                    }
                    let locationData = dataStore[j][1].location[nextKeyFrameRefForLocation]

                    if (locationData == undefined) {
                        continue
                    } else {
                        let locationTimeDiff = ((parseInt(nextKeyFrameRefForLocation) - parseInt(keyframeRef)) * frameScalar).toFixed(6);
                        writeLine(`\t${selectedBoneName.toUpperCase()}:MoveTo(Vector3.New(${locationData[0] * 10},${locationData[2] * 10},${locationData[1] * 10}), ${locationTimeDiff} * scaler, true)`)
                    }

                }
            }

            //find difference in keyframes in keyframes array, and Task.Wait for difference in next call
            let nextKeyframe = 0;
            let timeDiff = 0;
            if (i !== keyframes.length - 1) {
                nextKeyframe = keyframes[i + 1];
                timeDiff = ((parseInt(nextKeyframe) - parseInt(keyframeRef)) * frameScalar).toFixed(6);
                writeLine(`\tTask.Wait(${timeDiff} * scaler)`);
            }
        }

        writeLine("\t");
        writeLine("\treturn true")
        writeLine("\t");
        writeLine("end");

        animationFile.end()
    } catch (e) {
        console.error(e);
    }
}

function selfStamp(writeLine, animationName) {
    writeLine("-- BLENDER TO CORE ANIMATION CONVERSION CREATED BY: MATHIAS SLETTEN (SnoFlak)");
    writeLine(`-- ANIMATION NAME: ${animationName}`);
    writeLine(`-- CREATED ON: ${new Date()}`);
}

convertJSON()