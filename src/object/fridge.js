function addFridgeFromFile() {

    fridge = new THREE.Group();

    var fbxloader = new THREE.FBXLoader();

    fbxloader.load('/src/modules/ref.fbx', function(object) {
        fridge.add(object);

        object.traverse(function(child) {
            if (child.isMesh) {
                
                child.material.side = THREE.DoubleSide;
                child.castShadow = true;
                
               console.log(child.name);
            }
        });
    });
    fridge.rotation.set(0,0,30)
    fridge.rotation.x =0 * Math.PI / 180
    fridge.rotation.y =1700 * Math.PI / 180
    fridge.rotation.z =0 * Math.PI / 180
    fridge.scale.set(0.3,0.3,0.3);
    fridge.position.set(950, 100, 800);

   scene.add(fridge);


}