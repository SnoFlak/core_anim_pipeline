class BoneData {
    constructor(id, name, lx = 0, ly = 0, lz = 0, rx = 0, ry = 0, rz = 0, parentID, children = []){
        this.id = id;
        this.name = name;
        this.lx = lx;
        this.ly = ly;
        this.lz = lz;
        this.rx = rx;
        this.ry = ry;
        this.rz = rz;
        this.parentID = parentID;
        this.children = children;
    }
}

class ArtGroup {
    constructor(id, name = "Art", parentID, children = []) {
        this.id = id;
        this.name = name;
        this.parentID = parentID;
        this.children = children;
    }
}