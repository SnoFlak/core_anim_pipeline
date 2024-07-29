# core_anim_pipeline

Convert rigs/animations made in blender to files usable in Core Games.
## What is core_anim_pipeline
**core_anim_pipeline** allows you to build a rig inside of blender, animate it, and export the rig and animation into files usable within the Manticore Games [Core Game Engine](https://www.coregames.com/games).

## Using core_anim_pipeline

**core_anim_pipeline** relies on these technologies: 
- [Blender](https://www.blender.org/) (for building/dumping your rigs and animations)
- [Node.js](https://nodejs.org/en) (running the conversions to lua)

## Usage:

Using core_anim_pipeline, at the moment, requires some manual setup. Below is the general process for converting your blender rig.

1. Place [jsonDump.py](https://github.com/SnoFlak/core_anim_pipeline/blob/dev/jsonDump.py) into your scripting window inside of blender and run the script.
2. To get the animation data using the exported .json file, open a terminal to the location of **core_anim_pipeline** and run the command: `node nonquat.js <animationName> <jsonFilePath>`.
3. Copy/Paste the exported lua script into your Core Games Project.

## Understanding the files
- Files created from [jsonDump.py](https://github.com/SnoFlak/core_anim_pipeline/blob/dev/jsonDump.py) are strictly used for Data storage, to convert over to lua with the [nonquat.js](https://github.com/SnoFlak/core_anim_pipeline/blob/dev/nonquat.js) script.
- Lua Files created from the  [nonquat.js](https://github.com/SnoFlak/core_anim_pipeline/blob/dev/nonquat.js) script are set up to expect a script with custom references to the body parts of your rig inside of core already configured. However, the exported script uses the bone names of the rig in blender to identify which bones need to move where. You will want to make sure these match, otherwise the references wont match and your animations will not work inside of Core. 
- The exported lua files export a series of `MoveTo()` and `RotateTo()` methods. These are all housed within a function for accessibility, and returns true. Allowing the function to `return true`, adds the capability of state management within Core for these custom animations. Although the responsibility of the state management is up to you, once the animation is complete, the function will `return true`.