# core_anim_pipeline

Convert rigs/animations made in blender to files usable in Core Games.

## What is core_anim_pipeline
**core_anim_pipeline** allows you to build a rig inside of blender, animate it, and export the rig and animation into files usable within the Manticore Games [Core Game Engine](https://www.coregames.com/games).


## Requirements:

**core_anim_pipeline** relies on these technologies: 
- [Blender](https://www.blender.org/) (for building/dumping your rigs and animations)
- [Node.js](https://nodejs.org/en) (running the conversions to lua)

## Using core_anim_pipeline:

Using core_anim_pipeline, at the moment, requires some manual setup. Below is the general process for converting your blender rig.

### Getting the Rig:

1. Place [jsonDumpRig.py](https://github.com/SnoFlak/core_anim_pipeline/blob/dev/jsonDumpRig.py) into your scripting window inside of your blender project and run the script.
2. Open the directory for core_anim_pipeline in a terminal and run the command: `node rigify.js <rigName> <jsonFilePath>`.

### Getting Animations from your Rig:

1. Place [jsonDumpAnim.py](https://github.com/SnoFlak/core_anim_pipeline/blob/dev/jsonDumpAnim.py) into your scripting window inside of your blender project and run the script.
2. To get the animation data using the exported .json file, open a terminal to the location of **core_anim_pipeline** and run the command: `node nonquat.js <animationName> <jsonFilePath>`.
3. Copy/Paste the exported lua script into your Core Games Project.

> [!NOTE]
> At the moment, the pipeline works off of whichever action is viewed in the keyframe editing window

> [!IMPORTANT]
> When handeling your animations, it might seem counter-intuitive, but you'll want *LESS* keyframes. Having a large rig with new instructions every frame will cause core to behave poorly, so limit yourself on keyframes as much as possible. That being said, you may find yourself needing to force keyframes inbetween others if your rig rotates incorrectly. Core ultimately decides how to rotate the objects at runtime, and you may need to give it a nudge in the right direction if your animations are too vague.

## Understanding the files
- Lua Files created from the  [nonquat.js](https://github.com/SnoFlak/core_anim_pipeline/blob/dev/nonquat.js) script are set up to expect a script with custom references to the body parts of your rig inside of core already configured. However, the exported script uses the bone names of the rig in blender to identify which bones need to move where. You will want to make sure these match, otherwise the references wont match and your animations will not work inside of Core. 
- The exported lua files export a series of `MoveTo()` and `RotateTo()` methods. These are all housed within a function for accessibility, and returns true. Allowing the function to `return true` adds the capability of state management within Core for these custom animations.
