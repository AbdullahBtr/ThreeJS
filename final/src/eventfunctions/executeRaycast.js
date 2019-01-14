raycaster = new THREE.Raycaster();

function executeRaycast(event) {

    raycaster.setFromCamera(mousePosition, camera);

    var intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0) {

        var firstHit = intersects[0].object;

        if (firstHit.name === "Einschalter") {
            radioState.powerOn = !radioState.powerOn;
            if (radioState.powerOn && !animationMixer.existingAction("Einschalter_Action_aus").isRunning()) {
                animationMixer.existingAction("Einschalter_Action_aus").stop();
                animationMixer.existingAction("Einschalter_Action_ein").play();
            } else if (!radioState.powerOn && !animationMixer.existingAction("Einschalter_Action_ein").isRunning()) {
                animationMixer.existingAction("Einschalter_Action_ein").stop();
                animationMixer.existingAction("Einschalter_Action_aus").play();
            }
        } else if (firstHit.name === "Antenne") {
            radioState.antennaOut = !radioState.antennaOut;
            if (radioState.antennaOut && !animationMixer.existingAction("Antenne_Action_einfahren").isRunning()) {
                animationMixer.existingAction("Antenne_Action_einfahren").stop();
                animationMixer.existingAction("Antenne_Action_ausfahren").play();
            } else if (!radioState.antennaOut && !animationMixer.existingAction("Antenne_Action_ausfahren").isRunning()) {
                animationMixer.existingAction("Antenne_Action_ausfahren").stop();
                animationMixer.existingAction("Antenne_Action_einfahren").play();
            }
        } else if (firstHit.name === "Tuner") {
            radioState.markerRight = !radioState.markerRight;
            if (radioState.markerRight && !animationMixer.existingAction("Marker_Action_zurueck").isRunning()) {
                animationMixer.existingAction("Marker_Action_zurueck").stop();
                animationMixer.existingAction("Marker_Action_vor").play();
            } else if (!radioState.markerRight && !animationMixer.existingAction("Marker_Action_vor").isRunning()) {
                animationMixer.existingAction("Marker_Action_vor").stop();
                animationMixer.existingAction("Marker_Action_zurueck").play();
            }
        } else if (firstHit.name === "Volume") {
            radioState.volumeHigh = !radioState.volumeHigh;           
            window.dispatchEvent(new Event('radioStateChanged'));
        }
    }
}
