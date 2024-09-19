const ライトスイッチ = {
    閉じる,
    ポジションラーと
}
const sounds = [
    '夜间通过坡路.mp3',
    '夜间通过急弯.mp3',
    '夜间通过拱桥.mp3',
    '路边临时停车.mp3',
    '夜间与机动车会车.mp3',
    '夜间直行通过路口.mp3',
    '夜间超越前方车辆.mp3',
    '夜间通过人行横道.mp3',
    '夜间同方向近距离跟车行驶.mp3',
    '夜间在有路灯的道路上行驶.mp3',
    '夜间在没有路灯的条件下行驶.mp3',
    '夜间在照明不良的条件下行驶.mp3',
    '夜间在照明良好的道路上行驶.mp3',
    '夜间通过没有交通信号灯控制的路口.mp3',
    '夜间在道路上发生故障妨碍交通又难以移动.mp3',
];
let audio = new Audio();
let interval;

document.getElementById('start').addEventListener('click', () => {
    playRandomSound();
});

document.getElementById('stop').addEventListener('click', () => {
    clearTimeout(interval);
    audio.pause();
});

function playRandomSound() {
    const randomIndex = Math.floor(Math.random() * sounds.length);
    audio.src = `/sounds/${sounds[randomIndex]}`;
    audio.play();
    audio.onended = () => {
        interval = setTimeout(playRandomSound, 5000);
    };
}