const lightSwitch = {
    closed: 'closed',
    positionLight: 'positionLight',
    lowBeam: 'lowBeam',
}
const headlightLever = {
    highBeam: 'highBeam',
    lowBeam: 'lowBeam',
}
const hazardLight = {
    on: 'on',
    off: 'off',
}
const correctStatus = {
    lowBeam: new Status(lightSwitch.lowBeam, headlightLever.lowBeam, hazardLight.off, false),
    highBeam: new Status(lightSwitch.lowBeam, headlightLever.highBeam, hazardLight.off, false),
    highLowBeamToggle: new Status(lightSwitch.lowBeam, headlightLever.lowBeam, hazardLight.off, true),
    hazardLight: new Status(lightSwitch.positionLight, headlightLever.lowBeam, hazardLight.on, false),
}
const selectedStatus = new Status(lightSwitch.lowBeam, headlightLever.lowBeam, hazardLight.off, false)
const sounds = [
    ['夜间通过坡路.mp3', correctStatus.highLowBeamToggle],
    ['夜间通过急弯.mp3', correctStatus.highLowBeamToggle],
    ['夜间通过拱桥.mp3', correctStatus.highLowBeamToggle],
    ['路边临时停车.mp3', correctStatus.hazardLight],
    ['夜间与机动车会车.mp3', correctStatus.lowBeam],
    ['夜间直行通过路口.mp3', correctStatus.lowBeam],
    ['夜间超越前方车辆.mp3', correctStatus.highLowBeamToggle],
    ['夜间通过人行横道.mp3', correctStatus.highLowBeamToggle],
    ['夜间同方向近距离跟车行驶.mp3', correctStatus.lowBeam],
    ['夜间在有路灯的道路上行驶.mp3', correctStatus.lowBeam],
    ['夜间在没有路灯的条件下行驶.mp3', correctStatus.highBeam],
    ['夜间在照明不良的条件下行驶.mp3', correctStatus.highBeam],
    ['夜间在照明良好的道路上行驶.mp3', correctStatus.lowBeam],
    ['夜间通过没有交通信号灯控制的路口.mp3', correctStatus.highLowBeamToggle],
    ['夜间在道路上发生故障妨碍交通又难以移动.mp3', correctStatus.hazardLight],
];
let sound = new Audio();
let interval;
let soundCount = 0;

document.getElementById("closed").addEventListener('click', () => {
    selectedStatus.lightSwitchPos = lightSwitch.closed;
    // Change the button's style to mark it as selected
    document.getElementById("closed").classList.add('selected');
    document.getElementById('positionLight').classList.remove('selected');
    document.getElementById('lowBeam').classList.remove('selected');
});
document.getElementById("positionLight").addEventListener('click', () => {
    selectedStatus.lightSwitchPos = lightSwitch.positionLight;
    document.getElementById("closed").classList.remove('selected');
    document.getElementById('positionLight').classList.add('selected');
    document.getElementById('lowBeam').classList.remove('selected');
});
document.getElementById("lowBeam").addEventListener('click', () => {
    selectedStatus.lightSwitchPos = lightSwitch.lowBeam;
    document.getElementById("closed").classList.remove('selected');
    document.getElementById('positionLight').classList.remove('selected');
    document.getElementById('lowBeam').classList.add('selected');
});
document.getElementById("highBeam").addEventListener('click', () => {
    selectedStatus.headlightLeverPos = headlightLever.highBeam;
});
document.getElementById("reset").addEventListener('click', () => {
    selectedStatus.headlightLeverPos = headlightLever.lowBeam;
});
document.getElementById("highLowBeamToggle").addEventListener('click', () => {
    selectedStatus.headlightLeverPos = headlightLever.lowBeam;
    selectedStatus.isHighLowBeamToggled = true;
});
document.getElementById("hazardLight").addEventListener('click', () => {
    selectedStatus.toggleHazardLight();
    elem = document.getElementById('hazardLight');
    if (elem.classList.contains('selected')) {
        elem.classList.remove('selected');
    } else {
        elem.classList.add('selected');
    }
});

document.getElementById('start').addEventListener('click', () => {
    playSound();
});

document.getElementById('stop').addEventListener('click', () => {
    clearTimeout(interval);
    sound.pause();
});

const randomNumberGenerator = new RandomNumberGenerator(sounds.length);

function playSound() {
    const soundIndex = randomNumberGenerator.generate();
    sound_file_name = sounds[soundIndex][0];
    sound.src = `sounds/${sound_file_name}`;
    sound.play();
    sound.onended = () => {
        currentCorrectStatus = sounds.filter(s => s[0] == sound_file_name)[0][1];
        interval = setTimeout(() => checkStatusAndPlayNextSound(currentCorrectStatus), 5000);
    };
}

function checkStatusAndPlayNextSound(correctStatus) {
    if (selectedStatus.isEqual(correctStatus)) {
        document.getElementById('output').innerHTML = "correct";
        playSound();
    } else {
        document.getElementById('output').innerHTML = `incorrect<br/>selectedStatus: ${selectedStatus}<br/>correctStatus: ${correctStatus}`;
    }
    selectedStatus.isHighLowBeamToggled = false;
}