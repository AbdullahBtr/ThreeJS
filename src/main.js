//eigener Code
document.write('<script type="text/javascript" src="src/object/fridge.js"></script>');
document.write('<script type="text/javascript" src="lib/three.js-master/examples/js/loaders/FBXLoader_r90.js"></script>');
document.write('<script type="text/javascript" src="lib/three.js-master/examples/js/libs/inflate.min.js"></script>');
function main() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xcce0ff );
    scene.fog = new THREE.Fog( 0xcce0ff, 500, 10000 );
 



    // lights
    scene.add( new THREE.AmbientLight( 0x666666 ) );
    var light = new THREE.DirectionalLight( 0xdfebff, 1 );
    light.position.set( 50, 200, 100 );
    light.position.multiplyScalar( 1.3 );
    light.castShadow = true;
    scene.add( light );


    //Der boden
    
    var groundTexture = new THREE.TextureLoader().load( '/src/beispiel.jpg' );
    groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
    groundTexture.repeat.set( 50, 50 );
    groundTexture.anisotropy = 16;
    var groundMaterial = new THREE.MeshLambertMaterial( { map: groundTexture } );
    var mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 20000, 20000 ), groundMaterial );
    mesh.position.y = - 250;
    mesh.rotation.x = - Math.PI / 2;
    mesh.receiveShadow = true;
    scene.add(mesh);

    //die Kiste
    var texture = new THREE.TextureLoader().load( '/src/crate.png' );            
    var geometry = new THREE.BoxBufferGeometry( 400, 200, 200 );
	var material = new THREE.MeshBasicMaterial( { map: texture } );
    var sphere = new THREE.Mesh( geometry, material );
    sphere.position.set(1000,-150,800);
    sphere.receiveShadow=true;
    scene.add( sphere );


    //der Kühlschrank

    addFridgeFromFile();
    //GUI
    gui = new dat.GUI();
    gui.add(sphere.position, "x", -50, 1000).step(5);
    gui.add(sphere.position, "y", -150, 50).step(5);
    gui.add(sphere.position, "z", -50, 800).step(5);
    gui.add(fridge.rotation,"x",-100,200).step(10);
    gui.add(fridge.rotation,"y",-100,200).step(10);
    gui.add(fridge.rotation,"z",-100,200).step(10);
    

    camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.set( 1000, 50, 1500 );

    var orbitControls=new THREE.OrbitControls(camera);
    orbitControls.target=new THREE.Vector3(1000,0,600);
    orbitControls.update();

    gui.domElement.onmouseenter = function() {
        orbitControls.enabled = false;
    }
    gui.domElement.onmouseleave = function() {
        orbitControls.enabled = true;
    }


    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(new THREE.Color(0xffffff));//background color
    document.getElementById("3d_content").appendChild(renderer.domElement);

    function mainLoop() {

        renderer.render(scene, camera);
        requestAnimationFrame(mainLoop);
        
    }

    mainLoop();
}

window.onload = main;