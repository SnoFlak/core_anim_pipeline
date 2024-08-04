import bpy
import json

# Get the active object (assumed to be an armature)
obj = bpy.context.object

if obj.type != 'ARMATURE':
    raise ValueError("Selected object is not an armature")

# Get the armature data
armature = obj.data

# Prepare a list to hold bone data
bone_data = []

# Iterate through each bone in the armature
for bone in armature.bones:
    bone_info = {
        "name": bone.name,
        "head": {"x": bone.head_local[0], "y": bone.head_local[1], "z": bone.head_local[2]},
        "tail": {"x": bone.tail_local[0], "y": bone.tail_local[1], "z": bone.tail_local[2]},
        "parent": bone.parent.name if bone.parent else None
    }
    bone_data.append(bone_info)

# Convert the bone data to JSON
json_data = json.dumps(bone_data, indent=4)

# Define the output file path
output_file_path = bpy.path.abspath("//bone_structure.json")

# Write the JSON data to a file
with open(output_file_path, 'w') as outfile:
    outfile.write(json_data)

print(f"Bone structure data has been written to {output_file_path}")
