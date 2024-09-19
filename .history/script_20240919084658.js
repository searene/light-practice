const lightSwitch = {
    closed: '閉じる',
    positionLight: 'ポジションラーと',
    ロービーム: 'ロービーム',
}
const ヘッドライトレバー = {
    ハイビーム: 'ハイビーム',
    ロービーム: 'ロービーム',
    ハイビームとロービームの切り替え: 'ハイビームとロービームの切り替え',
}
const ハザードランプ = {
    オフ: 'オフ',
    オン: 'オン',
}
const 正しい状態 = {
    ロービーム: [lightSwitch.ロービーム, ヘッドライトレバー.ロービーム, ハザードランプ.オフ],
    ハイビーム: [lightSwitch.ロービーム, ヘッドライトレバー.ハイビーム, ハザードランプ.オフ],
    ハイビームとロービームの切り替え: [lightSwitch.ロービーム, ヘッドライトレバー.ハイビームとロービームの切り替え, ハザードランプ.オフ],
    ハザードランプ: [lightSwitch.positionLight, ヘッドライトレバー.ロービーム, ハザードランプ.オン],
}
const selectedStatus = [lightSwitch.closed, ヘッドライトレバー.ロービーム, ハザードランプ.オフ]
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
let 音 = new Audio();
let 間;

document.getElementById("閉じる").addEventListener('click', () => {
    selectedStatus[0] = lightSwitch.closed;
});
document.getElementById("ポジションラーと").addEventListener('click', () => {
    selectedStatus[0] = lightSwitch.positionLight;
});
document.getElementById("ロービーム").addEventListener('click', () => {
    selectedStatus[0] = lightSwitch.ロービーム;
});
document.getElementById("ハイビーム").addEventListener('click', () => {
    selectedStatus[1] = ヘッドライトレバー.ハイビーム;
});
document.getElementById("ロービーム").addEventListener('click', () => {
    selectedStatus[1] = ヘッドライトレバー.ロービーム;
});
document.getElementById("ハイビームとロービームの切り替え").addEventListener('click', () => {
    selectedStatus[1] = ヘッドライトレバー.ハイビームとロービームの切り替え;
});
document.getElementById("ハザードランプ").addEventListener('click', () => {
    if (selectedStatus[2] == ハザードランプ.オン) {
        selectedStatus[2] = ハザードランプ.オフ;
    } else if (selectedStatus[2] == ハザードランプ.オフ) {
        selectedStatus[2] = ハザードランプ.オン;
    } else {
        alert('Unrecognized state: ' + selectedStatus[2]);
    }
});

document.getElementById('start').addEventListener('click', () => {
    ランダム音を再生する();
});

document.getElementById('stop').addEventListener('click', () => {
    clearTimeout(間);
    音.pause();
});

function ランダム音を再生する() {
    const ラーダムな索引 = Math.floor(Math.random() * sounds.length);
    音.src = `/sounds/${sounds[ラーダムな索引][0]}`;
    音.play();
    音.onended = () => {
        間 = setTimeout(ランダム音を再生する, 5000);
    };
}