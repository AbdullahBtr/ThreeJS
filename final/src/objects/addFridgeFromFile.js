function addFridgeFromFile() {

    fridge = new THREE.Group();

    var loadingManager= new THREE.LoadingManager();
    var fbxloader = new THREE.FBXLoader(loadingManager);


    fbxloader.load('src/models/ref.fbx', function(object) {
        fridge.add(object);

        
        object.traverse(function(child) {
            if (child.name === "Cube" || child.name === "Cube_2" ) {
                child.castShadow = true;
            }
        });
    });


    fridge.rotation.x =0 * Math.PI / 180
    fridge.rotation.y =1710 * Math.PI / 180
    fridge.rotation.z =0 * Math.PI / 180
    fridge.scale.set(0.1,0.1,0.1);
    fridge.position.set(10, 60, 0 );
    

//tür animieren
cubeAnimation=null;
loadingManager.onLoad=function(){
    fridge.traverse(function(child){
        console.log(child.name);
        if(child.name==="Cube_2"){
            cubeAnimation=new Animation(child,AnimationType.ROTATION,AnimationAxis.Y);
            cubeAnimation.setAmount(30 * Math.PI / 180);
            cubeAnimation.setSpeed(40 * Math.PI / 180);
            child.userData=cubeAnimation;
        }
    });
}

    scene.add(fridge);

    physics.addBox(fridge, 10, 120, 8, 3);


}
