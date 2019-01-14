var sound_noise = new Howl({
    src: ['src/audiofiles/rauschen.mp3'],
    html5: true,
    loop: true
});

var sound_left = new Howl({
    src: ['src/audiofiles/sound_01.mp3'],
    html5: true,
    loop: true
});

var sound_right = new Howl({
    src: ['src/audiofiles/sound_02.mp3'],
    html5: true,
    loop: true
});

function setRadioSound(event) {

    sound_noise.pause();
    sound_left.pause();
    sound_right.pause();

    if (radioState.powerOn) {
        if (radioState.volumeHigh) {
            Howler.volume(0.5);
        } else {
            Howler.volume(0.1);
        }
        if (radioState.antennaOut) {
            if (radioState.markerRight) {
                sound_right.play();
            } else {
                sound_left.play();
            }
        } else {
            sound_noise.play();
        }
    } else {
        Howler.volume(0);
    }
}
