const ライトスイッチ = {
    閉じる: '閉じる',
    ポジションラーと: 'ポジションラーと',
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
    ロービーム: [ライトスイッチ.ロービーム, ヘッドライトレバー.ロービーム, ハザードランプ.オフ],
    ハイビーム: [ライトスイッチ.ロービーム, ヘッドライトレバー.ハイビーム, ハザードランプ.オフ],
    ハイビームとロービームの切り替え: [ライトスイッチ.ロービーム, ヘッドライトレバー.ハイビームとロービームの切り替え, ハザードランプ.オフ],
    ハザードランプ: [ライトスイッチ.ポジションラーと, ヘッドライトレバー.ロービーム, ハザードランプ.オン],
}
const 選ぶ状態 = [ライトスイッチ.閉じる, ヘッドライトレバー.ロービーム, ハザードランプ.オフ]
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
    選ぶ状態[0] = ライトスイッチ.閉じる;
});
document.getElementById("ポジションラーと").addEventListener('click', () => {
    選ぶ状態[0] = ライトスイッチ.ポジションラーと;
});
document.getElementById("ロービーム").addEventListener('click', () => {
    選ぶ状態[0] = ライトスイッチ.ロービーム;
});
document.getElementById("ハイビーム").addEventListener('click', () => {
    選ぶ状態[1] = ヘッドライトレバー.ハイビーム;
});
document.getElementById("ロービーム").addEventListener('click', () => {
    選ぶ状態[1] = ヘッドライトレバー.

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