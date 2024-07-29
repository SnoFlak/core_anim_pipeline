import bpy
import json
from datetime import datetime

def round_small_values(value, threshold=1e-6):
    return 0.0 if abs(value) < threshold else value

def radians_to_degrees(value):
    return value * 180 / math.pi

def get_bone_keyframe_data(action):
    keyframe_data = {}
    
    for fcurve in action.fcurves:
        if fcurve.data_path.startswith("pose.bones"):
            bone_name = fcurve.data_path.split('"')[1]
            property_name = fcurve.data_path.split('.')[-1]
            
            if bone_name not in keyframe_data:
                keyframe_data[bone_name] = {'location': {}, 'rotation_quaternion': {}, 'rotation_euler': {},}
            
            for keyframe in fcurve.keyframe_points:
                frame = keyframe.co.x
                value = round_small_values(keyframe.co.y)

                if property_name == 'location':
                    index = fcurve.array_index
                    if frame not in keyframe_data[bone_name]['location']:
                        keyframe_data[bone_name]['location'][frame] = [None, None, None]
                    keyframe_data[bone_name]['location'][frame][index] = value
                    
                elif property_name == 'rotation_euler':
                    value = radians_to_degrees(value)
                    index = fcurve.array_index
                    if frame not in keyframe_data[bone_name]['rotation_euler']:
                        keyframe_data[bone_name]['rotation_euler'][frame] = [None, None, None]
                    keyframe_data[bone_name]['rotation_euler'][frame][index] = value

    return keyframe_data

def export_bone_animation_to_json(filepath):
    data = {}
    for obj in bpy.context.scene.objects:
        if obj.type == 'ARMATURE' and obj.animation_data and obj.animation_data.action:
            action = obj.animation_data.action
            data[obj.name] = get_bone_keyframe_data(action)
    
    with open(filepath, 'w') as f:
        json.dump(data, f, indent=4)



export_bone_animation_to_json('C:\\"Core Animation Pipeline"\\"JSON Dumps"\\' + datetime.today().strftime('%m_%d_%Y__%H_%M_%S') + ".json")
