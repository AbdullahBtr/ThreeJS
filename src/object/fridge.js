function addFridgeFromFile() {

    fridge = new THREE.Group();
   
    var fbxloader = new THREE.FBXLoader();

    fbxloader.load('/src/modules/ref.fbx', function(object) {
        fridge.add(object);

        object.traverse(function(child) {
            if (child.isMesh) {
               if(child.name==="Cube_2"){
                cubeAnimation = new Animation(child, AnimationType.ROTATION, AnimationAxis.Y);
                cubeAnimation.setAmount(-20 * Math.PI / 180);
                cubeAnimation.set
               }

                child.material.side = THREE.DoubleSide;
                child.castShadow = true;
                
               //console.log(child.name);
            }


        });
    });

    //kühlschrank position, rotation und größe festlegen
    fridge.rotation.set(0,0,30)
    fridge.rotation.x =0 * Math.PI / 180
    fridge.rotation.y =1710 * Math.PI / 180
    fridge.rotation.z =0 * Math.PI / 180
    fridge.scale.set(0.3,0.3,0.3);
    fridge.position.set(900, 100, 800 );
    
    physics.addBox(fridge, 950, 900 , 900 ,0);
    // //die animation bestimmen
    fridgeAnimation = new Animation(fridge, AnimationType.ROTATION, AnimationAxis.Y);
    fridgeAnimation.setAmount(-20 * Math.PI / 180);
    fridgeAnimation.setSpeed(40 * Math.PI / 180);
    fridge.userData = fridgeAnimation;

    scene.add(fridge);


}