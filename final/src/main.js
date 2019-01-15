// External Libraries
document.write('<script type="text/javascript" src="lib/three.js-master/build/three.js"></script>');
document.write('<script type="text/javascript" src="lib/dat.gui-master/build/dat.gui.js"></script>');
document.write('<script type="text/javascript" src="lib/three.js-master/examples/js/controls/OrbitControls.js"></script>');
document.write('<script type="text/javascript" src="lib/three.js-master/examples/js/libs/tween.min.js"></script>');
document.write('<script type="text/javascript" src="lib/three.js-master/examples/js/libs/inflate.min.js"></script>');
document.write('<script type="text/javascript" src="lib/three.js-master/examples/js/libs/stats.min.js"></script>');
document.write('<script type="text/javascript" src="lib/three.js-master/examples/js/loaders/FBXLoader_r90.js"></script>');
document.write('<script type="text/javascript" src="lib/ThreeCSG-master_oldVersion/ThreeCSG.js"></script>');
document.write('<script type="text/javascript" src="lib/cannon.js-master/build/cannon.js"></script>');
document.write('<script type="text/javascript" src="lib/howler.js-master/src/howler.core.js"></script>');

// Own Code
document.write('<script type="text/javascript" src="src/objects/addFridgeFromFile.js"></script>');
document.write('<script type="text/javascript" src="src/eventfunctions/updateAspectRatio.js"></script>');
document.write('<script type="text/javascript" src="src/eventfunctions/calculateMousePosition.js"></script>');
document.write('<script type="text/javascript" src="src/eventfunctions/executeRaycast.js"></script>');
document.write('<script type="text/javascript" src="src/eventfunctions/executeKeyAction.js"></script>');
document.write('<script type="text/javascript" src="src/eventfunctions/setSound.js"></script>');
document.write('<script type="text/javascript" src="src/animation/Animation.js"></script>');
document.write('<script type="text/javascript" src="src/physics/Physics.js"></script>');
document.write('<script type="text/javascript" src="src/objects/addLights.js"></script>');
document.write('<script type="text/javascript" src="src/audiofiles/gate.mp3"></script>');

const DEG_TO_RAD = Math.PI / 180;

function main() {

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xcce0ff );
    scene.fog = new THREE.Fog( 0xcce0ff, 500, 10000 );

    physics = new Physics();
    physics.initialize(0, -200, 0, 1/120, true);



    addFridgeFromFile();

    var texture = new THREE.TextureLoader().load( 'src/crate.png' );            
    var geometry = new THREE.BoxBufferGeometry( 150, 100, 50 );
	var material = new THREE.MeshBasicMaterial( { map: texture } );
    var sphere = new THREE.Mesh( geometry, material );
    sphere.position.set(0,-40,0);
    sphere.receiveShadow=true;
    scene.add( sphere );

    // lights
    addLights();

    //Flur
    var groundTexture = new THREE.TextureLoader().load( 'src/beispiel.jpg' );
    groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
    groundTexture.repeat.set( 50, 50 );
    groundTexture.anisotropy = 16;
    var groundMaterial = new THREE.MeshLambertMaterial( { map: groundTexture } );
    var mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 20000, 20000 ), groundMaterial );
    mesh.position.y = - 250;
    mesh.rotation.x = - Math.PI / 2;
    mesh.receiveShadow = true;
    scene.add(mesh);

    //Sound
    setSound();
    //Kamera
    camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,0.1,1000);
    camera.position.set(0, 150, 350);
    camera.lookAt(0, 83, 0);
    camera.add( listener );


    var orbitControls = new THREE.OrbitControls(camera);
    orbitControls.target = new THREE.Vector3(0,83,0);
    orbitControls.update();

    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(new THREE.Color(0x000000));
    renderer.shadowMap.enabled = true;
    document.getElementById("3d_content").appendChild(renderer.domElement);

    var stats = new Stats();
    stats.showPanel(0);
    document.body.appendChild(stats.dom);    

    var clock = new THREE.Clock();

    function mainLoop() {

        stats.begin();
        var delta = clock.getDelta();
        physics.update(delta);
        if(cubeAnimation!=null){
            cubeAnimation.update(delta)
        }
        renderer.render(scene, camera);
        stats.end();
        requestAnimationFrame(mainLoop);
    }

    mainLoop();

    window.onresize = updateAspectRatio;
    window.onmousemove = calculateMousePosition;
    window.onclick = executeRaycast;
    window.onkeydown = keyDownAction;
    window.onkeyup = keyUpAction;
}

window.onload = main;
