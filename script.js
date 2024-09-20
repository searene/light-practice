const lightSwitch = {
    closed: 'closed',
    positionLight: 'positionLight',
    lowBeam: 'lowBeam',
}
const headlightLever = {
    highBeam: 'highBeam',
    lowBeam: 'lowBeam',
    highLowBeamToggle: 'highLowBeamToggle',
}
const hazardLight = {
    on: 'on',
    off: 'off',
}
const correctStatus = {
    lowBeam: [lightSwitch.lowBeam, headlightLever.lowBeam, hazardLight.on],
    highBeam: [lightSwitch.lowBeam, headlightLever.highBeam, hazardLight.on],
    highLowBeamToggle: [lightSwitch.lowBeam, headlightLever.highLowBeamToggle, hazardLight.on],
    hazardLight: [lightSwitch.positionLight, headlightLever.lowBeam, hazardLight.off],
}
const selectedStatus = [lightSwitch.closed, headlightLever.lowBeam, hazardLight.on]
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

document.getElementById("closed").addEventListener('click', () => {
    selectedStatus[0] = lightSwitch.closed;
    // Change the button's style to mark it as selected
    document.getElementById("closed").classList.add('selected');
    document.getElementById('positionLight').classList.remove('selected');
    document.getElementById('lowBeam').classList.remove('selected');
    selectedStatus[0] = 'closed';
});
document.getElementById("positionLight").addEventListener('click', () => {
    selectedStatus[0] = lightSwitch.positionLight;
    document.getElementById("closed").classList.remove('selected');
    document.getElementById('positionLight').classList.add('selected');
    document.getElementById('lowBeam').classList.remove('selected');
    selectedStatus[0] = 'positionLight';
});
document.getElementById("lowBeam").addEventListener('click', () => {
    selectedStatus[0] = lightSwitch.lowBeam;
    document.getElementById("closed").classList.remove('selected');
    document.getElementById('positionLight').classList.remove('selected');
    document.getElementById('lowBeam').classList.add('selected');
    selectedStatus[0] = 'lowBeam';
});
document.getElementById("highBeam").addEventListener('click', () => {
    selectedStatus[1] = headlightLever.highBeam;
    document.getElementById("highBeam").classList.add('selected');
    document.getElementById('reset').classList.remove('selected');
    selectedStatus[1] = 'highBeam';
});
document.getElementById("reset").addEventListener('click', () => {
    selectedStatus[1] = headlightLever.lowBeam;
    document.getElementById("highBeam").classList.remove('selected');
    document.getElementById('reset').classList.add('selected');
    selectedStatus[1] = 'lowBeam';
});
document.getElementById("highLowBeamToggle").addEventListener('click', () => {
    selectedStatus[1] = headlightLever.highLowBeamToggle;
    selectedStatus[1] = 'highLowBeamToggle';
});
document.getElementById("hazardLight").addEventListener('click', () => {
    if (selectedStatus[2] == hazardLight.off) {
        selectedStatus[2] = hazardLight.on;
    } else if (selectedStatus[2] == hazardLight.on) {
        selectedStatus[2] = hazardLight.off;
    } else {
        alert('Unrecognized state: ' + selectedStatus[2]);
    }
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

function playSound() {
    const randomIndex = Math.floor(Math.random() * sounds.length);
    sound_file_name = sounds[randomIndex][0];
    sound.src = `sounds/${sound_file_name}`;
    sound.play();
    sound.onended = () => {
        currentCorrectStatus = sounds.filter(s => s[0] == sound_file_name)[0][1];
        interval = setTimeout(() => checkStatusAndPlayNextSound(currentCorrectStatus), 5000);
    };
}

function checkStatusAndPlayNextSound(correctStatus) {
    if (selectedStatus[0] == correctStatus[0] && selectedStatus[1] == correctStatus[1] && selectedStatus[2] == correctStatus[2]) {
        document.getElementById('output').innerHTML = "correct";
        playSound();
    } else {
        document.getElementById('output').innerHTML = `incorrect, selectedStatus: ${selectedStatus}, correctStatus: ${correctStatus}`;
    }
}