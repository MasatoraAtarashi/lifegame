// // javascriptの使いづらいやつを簡単にするライブラリ

// min以上max以下の整数をランダムで返す関数
function random(min, max) {
	var num = Math.floor(Math.random() * (max + 1 - min) + min);
	return num;
}