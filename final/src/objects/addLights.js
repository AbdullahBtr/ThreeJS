function addLights() {
    
    scene.add( new THREE.AmbientLight( 0x666666 ) );
    var light = new THREE.DirectionalLight( 0xdfebff, 1 );
    light.position.set( 50, 200, 100 );
    light.position.multiplyScalar( 1.3 );
    light.castShadow = true;
    scene.add( light );

    var directionaLight = new THREE.DirectionalLight(0xffffff);
    directionaLight.position.set(-30, 200, 100);
    directionaLight.lookAt(scene.position);
    directionaLight.intensity = 0.5;
    directionaLight.castShadow = true;
    directionaLight.shadow.radius = 2;
    directionaLight.shadow.camera.top = 100;
    directionaLight.shadow.camera.bottom = -100;
    directionaLight.shadow.camera.left = -100;
    directionaLight.shadow.camera.right = 100;
    directionaLight.shadow.mapSize.width = 2048;
    directionaLight.shadow.mapSize.height = 2048;
    scene.add(directionaLight);
    //scene.add(new THREE.CameraHelper(directionaLight.shadow.camera)); 
}