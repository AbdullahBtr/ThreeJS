
function setSound(){
 listener = new THREE.AudioListener();
 sound = new THREE.Audio( listener );
 

// load a sound and set it as the Audio object's buffer
 audioLoader = new THREE.AudioLoader();
audioLoader.load( 'src/audiofiles/gate.mp3', function( buffer ) {
	sound.setBuffer( buffer );
	sound.setLoop( true );
	sound.setVolume( 0.5 );
	sound.play();
});
}