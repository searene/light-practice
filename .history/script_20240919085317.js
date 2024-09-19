const lightSwitch = {
    closed: '閉じる',
    positionLight: 'ポジションラーと',
    lowBeam: 'ロービーム',
}
const headlightLever = {
    highBeam: 'ハイビーム',
    lowBeam: 'ロービーム',
    highLowBeamToggle: 'ハイビームとロービームの切り替え',
}
const hazardLight = {
    on: 'オフ',
    off: 'オン',
}
const 正しい状態 = {
    ロービーム: [lightSwitch.lowBeam, headlightLever.lowBeam, hazardLight.on],
    ハイビーム: [lightSwitch.lowBeam, headlightLever.highBeam, hazardLight.on],
    ハイビームとロービームの切り替え: [lightSwitch.lowBeam, headlightLever.highLowBeamToggle, hazardLight.on],
    ハザードランプ: [lightSwitch.positionLight, headlightLever.lowBeam, hazardLight.off],
}
const selectedStatus = [lightSwitch.closed, headlightLever.lowBeam, hazardLight.on]
const sounds = [
    ['夜间通过坡路.mp3', 正しい状態.ハイビームとロービームの切り替え],
    ['夜间通过急弯.mp3', 正しい状態.ハイビームとロービームの切り替え],
    ['夜间通过拱桥.mp3', 正しい状態.ハイビームとロービームの切り替え],
    ['路边临时停车.mp3', 正しい状態.ハザードランプ],
    ['夜间与机动车会车.mp3', 正しい状態.ロービーム],
    ['夜间直行通过路口.mp3', 正しい状態.ロービーム],
    ['夜间超越前方车辆.mp3', 正しい状態.ハイビームとロービームの切り替え],
    ['夜间通过人行横道.mp3', 正しい状態.ハイビームとロービームの切り替え],
    ['夜间同方向近距离跟车行驶.mp3', 正しい状態.ロービーム],
    ['夜间在有路灯的道路上行驶.mp3', 正しい状態.ロービーム],
    ['夜间在没有路灯的条件下行驶.mp3', 正しい状態.ハイビーム],
    ['夜间在照明不良的条件下行驶.mp3', 正しい状態.ハイビーム],
    ['夜间在照明良好的道路上行驶.mp3', 正しい状態.ロービーム],
    ['夜间通过没有交通信号灯控制的路口.mp3', 正しい状態.ハイビームとロービームの切り替え],
    ['夜间在道路上发生故障妨碍交通又难以移动.mp3', 正しい状態.ハザードランプ],
];
let sound = new Audio();
let interval;

document.getElementById("閉じる").addEventListener('click', () => {
    selectedStatus[0] = lightSwitch.closed;
    // Change the button's style to mark it as selected
    document.getElementById("閉じる").classList.add('selected');
    document.getElementById('ポジションラーと').classList.remove('selected');
    document.getElementById('ロービーム').classList.remove('selected');
});
document.getElementById("ポジションラーと").addEventListener('click', () => {
    selectedStatus[0] = lightSwitch.positionLight;
    document.getElementById("閉じる").classList.remove('selected');
    document.getElementById('ポジションラーと').classList.add('selected');
    document.getElementById('ロービーム').classList.remove('selected');
});
document.getElementById("ロービーム").addEventListener('click', () => {
    selectedStatus[0] = lightSwitch.lowBeam;
    document.getElementById("閉じる").classList.remove('selected');
    document.getElementById('ポジションラーと').classList.remove('selected');
    document.getElementById('ロービーム').classList.add('selected');
});
document.getElementById("ハイビーム").addEventListener('click', () => {
    selectedStatus[1] = headlightLever.highBeam;
    document.getElementById("ハイビーム").classList.add('selected');
    document.getElementById('ロービーム').classList.remove('selected');
});
document.getElementById("ロービーム").addEventListener('click', () => {
    selectedStatus[1] = headlightLever.lowBeam;
    document.getElementById("ハイビーム").classList.add('selected');
    document.getElementById('ロービーム').classList.remove('selected');
});
document.getElementById("ハイビームとロービームの切り替え").addEventListener('click', () => {
    selectedStatus[1] = headlightLever.highLowBeamToggle;
});
document.getElementById("ハザードランプ").addEventListener('click', () => {
    if (selectedStatus[2] == hazardLight.off) {
        selectedStatus[2] = hazardLight.on;
    } else if (selectedStatus[2] == hazardLight.on) {
        selectedStatus[2] = hazardLight.off;
    } else {
        alert('Unrecognized state: ' + selectedStatus[2]);
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
    sound.src = `/sounds/${sounds[randomIndex][0]}`;
    sound.play();
    sound.onended = () => {
        interval = setTimeout(playSound, 5000);
    };
}