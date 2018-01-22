var drawable = true;
var evolution_able = true;
var evolution2_able = false;

// 初期化
function initialize() {
	draw_board();
}

// ゲームのボードをつくる
function draw_board() {
	var board = document.getElementById('board');
	// 100 * 100マスのボードを作成
	for(var y = 0; y < 100; y++) {
		var tr = document.createElement('tr');
		for(var x = 0; x < 100; x++) {
			var td = document.createElement('td');
			td.id = "cell." + x + "." + y;
			// マスの高さ・幅を設定
			td.style.height = "1.5px";
			td.style.width = "1.5px";
			// 色を白(死亡)に設定
			td.style.backgroundColor = "white";
			// マウスオーバーイベントハンドラを設定
			td.addEventListener('mouseover', function(){
				if(drawable) {
					fill(this.id);
				}
			});
			tr.appendChild(td);
		}
		board.appendChild(tr);
	}
}

// マウスが置かれた場所を黒く塗りつぶす
function fill(placeId) {
	document.getElementById(placeId).style.backgroundColor = "black";
}

// ライフゲームスタート		
function start() {
	// drawable変数がtrueのときは、マウスオーバーでマスを濡れる。スタートすると、falseになるので入力できなくなる
	drawable = false;
	// この変数がtrueのときはevolution()が繰り返される
	evolution_able = true;
	// この変数がtrueのときはevolution2()が繰り返される
	evolution2_able = false;
	evolution();
}

// 遷移
function evolution() {
	// 次の状態で黒くするマスのidを保存する配列
	var beBlackCells = [];
	// 白
	var beWhiteCells = [];
	for(var y = 0; y < 100; y++) {
		for(var x = 0; x < 100; x++) {
			var Id = "cell." + x + "." + y;
			var td = document.getElementById(Id);
			// マスの周囲8方向に何個黒いマスがあるか数える
			var blackNum = 0;
			if(td.style.backgroundColor == "black") {
				// このアルゴリズムはリバーシのものを流用
				for(var cx = -1; cx <= 1; cx++) {
					for(var cy = -1; cy <= 1; cy++) {
						if(cx == 0 && cy == 0) { 
							continue; //クリックしたマスをスルー
						}
						var nx = x + cx; 	
						var ny = y + cy;
						var Id$ = "cell." + nx + "." + ny;
						// alert(Id$);
						var td$ = document.getElementById(Id$);
						if(td$ == null) {
							continue;
						}
						if(td$.style.backgroundColor == "black") {
							// alert(Id$);
							blackNum++;
						}
					}
				}
				// そのマスが黒かつ、周囲の黒の数が2または3のとき、黒。それ以外は白くする。
				if(blackNum == 2 || blackNum == 3) {
				} else {
					beWhiteCells.push(td);
				}
				// alert(blackNum);
			} else if(td.style.backgroundColor == "white") {
				for(var cx = -1; cx <= 1; cx++) {
					for(var cy = -1; cy <= 1; cy++) {
						if(cx == 0 && cy == 0) { 
							continue; //クリックしたマスをスルー
						}
						var nx = x + cx; 	
						var ny = y + cy;
						var Id$ = "cell." + nx + "." + ny;
						var td$ = document.getElementById(Id$);
						if(td$ == null) {
							continue;
						}
						if(td$.style.backgroundColor == "black") {
							blackNum++;
						}
					}
				}
				// そのマスが白のとき、周囲の黒の数が3ならそのマスを黒くする
				if(blackNum == 3) {
					beBlackCells.push(td);
				}
			}
		}
	}
	// 保存しておいた配列の情報に基づいて、マスの状態を変える。
	for(var i = 0; i < beBlackCells.length; i++) {
		beBlackCells[i].style.backgroundColor = "black";
	}
	for(var i = 0; i < beWhiteCells.length; i++) {
		beWhiteCells[i].style.backgroundColor = "white";
	}
	// 0.1秒に一度これを繰り返す
	if(!drawable && evolution_able) {
		setTimeout("evolution();", 100);
	}
}

// 一時停止
function stop() {
	drawable = true;
}

// ボードリセット
function reset() {
	// 全マスをfor文で触ってバックグラウンドカラーを白くする
	drawable = true;
	for(var y = 0; y < 100; y++) {
		for(var x = 0; x < 100; x++) {
			var Id = "cell." + x + "." + y;
			var td = document.getElementById(Id);
			td.style.backgroundColor = "white";
		}
	}
}

// 高速化(evolution2を作動)
function speedup() {
	if(!drawable) {
		evolution_able = false;
		evolution2_able = true;
		evolution2();
	}
}

// setTimeoutのスピードを上げる方法が思いつかなかったので。
function evolution2() {
	var beBlackCells = [];
	var beWhiteCells = [];
	for(var y = 0; y < 100; y++) {
		for(var x = 0; x < 100; x++) {
			var Id = "cell." + x + "." + y;
			var td = document.getElementById(Id);
			var blackNum = 0;
			if(td.style.backgroundColor == "black") {
				for(var cx = -1; cx <= 1; cx++) {
					for(var cy = -1; cy <= 1; cy++) {
						if(cx == 0 && cy == 0) { 
							continue; //クリックしたマスをスルー
						}
						var nx = x + cx; 	
						var ny = y + cy;
						var Id$ = "cell." + nx + "." + ny;
						// alert(Id$);
						var td$ = document.getElementById(Id$);
						if(td$ == null) {
							continue;
						}
						if(td$.style.backgroundColor == "black") {
							// alert(Id$);
							blackNum++;
						}
					}
				}
				if(blackNum == 2 || blackNum == 3) {
				} else {
					beWhiteCells.push(td);
				}
				// alert(blackNum);
			} else if(td.style.backgroundColor == "white") {
				for(var cx = -1; cx <= 1; cx++) {
					for(var cy = -1; cy <= 1; cy++) {
						if(cx == 0 && cy == 0) { 
							continue; //クリックしたマスをスルー
						}
						var nx = x + cx; 	
						var ny = y + cy;
						var Id$ = "cell." + nx + "." + ny;
						var td$ = document.getElementById(Id$);
						if(td$ == null) {
							continue;
						}
						if(td$.style.backgroundColor == "black") {
							blackNum++;
						}
					}
				}
				if(blackNum == 3) {
					beBlackCells.push(td);
				}
			}
		}
	}
	for(var i = 0; i < beBlackCells.length; i++) {
		beBlackCells[i].style.backgroundColor = "black";
	}
	for(var i = 0; i < beWhiteCells.length; i++) {
		beWhiteCells[i].style.backgroundColor = "white";
	}
	if(!drawable && evolution2_able) {
		setTimeout("evolution2();", 10);
	}
}

// パターン召喚(ライフゲームでは、初期値に特定の形を設定すると無限に存在したり、一定の動きを繰り返すことがある。それをパターンと呼ぶ)
function summon() {
	switch (document.form.selbox.selectedIndex){
      case 0: createSignal();break;
      case 1: createBlock();break;
      case 2: createBeacon();break;
      case 3: createHoneycomb();break;
      case 4: createAcorn();break;
      case 5: createPentomino();break;
      case 6: createGlider();break;
      case 7: createGliderGun();break;
    }
}

// パターンの一つ、信号を召喚
function createSignal() {
	var x = random(0, 99);
	var y = random(0, 99);
	for(var xx = x; xx < (x + 3); xx++) {
		var Id = "cell." + xx + "." + y;
		var td = document.getElementById(Id);
		td.style.backgroundColor = "black";
	}
}

// パターンの一つ、蜂の巣を召喚
function createHoneycomb() {
	// 座標をランダムで設定して、後は地道に書く。mujsライブラリからrandom関数を使う。
	var x = random(0, 99);
	var y = random(0, 99);
	var Id = "cell." + x + "." + y;
	var td = document.getElementById(Id);
	td.style.backgroundColor = "black";
	var Id = "cell." + (x - 1) + "." + (y - 1);
	var td = document.getElementById(Id);
	td.style.backgroundColor = "black";
	var Id = "cell." + (x - 1) + "." + (y - 2);
	var td = document.getElementById(Id);
	td.style.backgroundColor = "black";
	var Id = "cell." + x + "." + (y - 3);
	var td = document.getElementById(Id);
	td.style.backgroundColor = "black";
	var Id = "cell." + (x + 1) + "." + (y - 1);
	var td = document.getElementById(Id);
	td.style.backgroundColor = "black";
	var Id = "cell." + (x + 1) + "." + (y - 2);
	var td = document.getElementById(Id);
	td.style.backgroundColor = "black";
}

// パターンの一つ、グライダーを召喚
function createGlider() {
	var x = random(0, 99);
	var y = random(0, 99);
	var Id = "cell." + x + "." + y;
	var td = document.getElementById(Id);
	td.style.backgroundColor = "black";
	var Id = "cell." + (x - 1) + "." + (y + 1);
	var td = document.getElementById(Id);
	td.style.backgroundColor = "black";
	for(var xx = (x - 1); xx < (x + 2); xx++) {
		var Id = "cell." + xx + "." + (y + 2);
		var td = document.getElementById(Id);
		td.style.backgroundColor = "black";
	}
}

// パターンの一つ、r-ペントミノを召喚
function createPentomino() {
	var x = random(0, 99);
	var y = random(0, 99);
	var Id = "cell." + x + "." + y;
	var td = document.getElementById(Id);
	td.style.backgroundColor = "black";
	var Id = "cell." + (x + 1) + "." + (y - 1);
	var td = document.getElementById(Id);
	td.style.backgroundColor = "black";
	var Id = "cell." + (x + 1) + "." + y;
	var td = document.getElementById(Id);
	td.style.backgroundColor = "black";
	var Id = "cell." + (x + 1) + "." + (y + 1);
	var td = document.getElementById(Id);
	td.style.backgroundColor = "black";
	var Id = "cell." + (x + 2) + "." + (y - 1);
	var td = document.getElementById(Id);
	td.style.backgroundColor = "black";
}

// パターンの一つ、どんぐりを召喚
function createAcorn() {
	var x = random(0, 99);
	var y = random(0, 99);
	var Id = "cell." + x + "." + y;
	var td = document.getElementById(Id);
	td.style.backgroundColor = "black";
	var Id = "cell." + (x + 1) + "." + y;
	var td = document.getElementById(Id);
	td.style.backgroundColor = "black";
	var Id = "cell." + (x + 1) + "." + (y - 2);
	var td = document.getElementById(Id);
	td.style.backgroundColor = "black";
	var Id = "cell." + (x + 3) + "." + (y - 1);
	var td = document.getElementById(Id);
	td.style.backgroundColor = "black";
	var Id = "cell." + (x + 4) + "." + y;
	var td = document.getElementById(Id);
	td.style.backgroundColor = "black";
	var Id = "cell." + (x + 5) + "." + y;
	var td = document.getElementById(Id);
	td.style.backgroundColor = "black";
	var Id = "cell." + (x + 6) + "." + y;
	var td = document.getElementById(Id);
	td.style.backgroundColor = "black";
}

// パターンの一つ、ビーコンを召喚
function createBeacon() {
	var x = random(0, 99);
	var y = random(0, 99);
	var Id = "cell." + x + "." + y;
	var td = document.getElementById(Id);
	td.style.backgroundColor = "black";
	var Id = "cell." + (x + 1) + "." + y;
	var td = document.getElementById(Id);
	td.style.backgroundColor = "black";
	var Id = "cell." + x + "." + (y + 1);
	var td = document.getElementById(Id);
	td.style.backgroundColor = "black";
	var Id = "cell." + (x + 1) + "." + (y + 1);
	var td = document.getElementById(Id);
	td.style.backgroundColor = "black";

	var Id = "cell." + (x - 2) + "." + (y + 2);
	var td = document.getElementById(Id);
	td.style.backgroundColor = "black";
	var Id = "cell." + (x - 2) + "." + (y + 3);
	var td = document.getElementById(Id);
	td.style.backgroundColor = "black";
	var Id = "cell." + (x - 1) + "." + (y + 2);
	var td = document.getElementById(Id);
	td.style.backgroundColor = "black";
	var Id = "cell." + (x - 1) + "." + (y + 3);
	var td = document.getElementById(Id);
	td.style.backgroundColor = "black";
}

// パターンの一つ、グライダー銃を召喚
function createGliderGun() {
	// １個目のブロック
	var x = random(0, 99);
	var y = random(0, 99);
	var Id = "cell." + x + "." + y;
	var td = document.getElementById(Id);
	td.style.backgroundColor = "black";
	var Id = "cell." + (x + 1) + "." + y;
	var td = document.getElementById(Id);
	td.style.backgroundColor = "black";
	var Id = "cell." + x + "." + (y + 1);
	var td = document.getElementById(Id);
	td.style.backgroundColor = "black";
	var Id = "cell." + (x + 1) + "." + (y + 1);
	var td = document.getElementById(Id);
	td.style.backgroundColor = "black";

	// 変なの1
	var Id = "cell." + (x + 10) + "." + y;
	var td = document.getElementById(Id);
	td.style.backgroundColor = "black";
	var Id = "cell." + (x + 10) + "." + (y + 1);
	var td = document.getElementById(Id);
	td.style.backgroundColor = "black";
	var Id = "cell." + (x + 10) + "." + (y + 2);
	var td = document.getElementById(Id);
	td.style.backgroundColor = "black";

	var Id = "cell." + (x + 11) + "." + (y - 1);
	var td = document.getElementById(Id);
	td.style.backgroundColor = "black";
	var Id = "cell." + (x + 11) + "." + (y + 3);
	var td = document.getElementById(Id);
	td.style.backgroundColor = "black";

	var Id = "cell." + (x + 12) + "." + (y - 2);
	var td = document.getElementById(Id);
	td.style.backgroundColor = "black";
	var Id = "cell." + (x + 12) + "." + (y + 4);
	var td = document.getElementById(Id);
	td.style.backgroundColor = "black";

	var Id = "cell." + (x + 13) + "." + (y - 2);
	var td = document.getElementById(Id);
	td.style.backgroundColor = "black";
	var Id = "cell." + (x + 13) + "." + (y + 4);
	var td = document.getElementById(Id);
	td.style.backgroundColor = "black";

	var Id = "cell." + (x + 14) + "." + (y + 1);
	var td = document.getElementById(Id);
	td.style.backgroundColor = "black";

	var Id = "cell." + (x + 15) + "." + (y - 1);
	var td = document.getElementById(Id);
	td.style.backgroundColor = "black";
	var Id = "cell." + (x + 15) + "." + (y + 3);
	var td = document.getElementById(Id);
	td.style.backgroundColor = "black";

	var Id = "cell." + (x + 16) + "." + y;
	var td = document.getElementById(Id);
	td.style.backgroundColor = "black";
	var Id = "cell." + (x + 16) + "." + (y + 1);
	var td = document.getElementById(Id);
	td.style.backgroundColor = "black";
	var Id = "cell." + (x + 16) + "." + (y + 2);
	var td = document.getElementById(Id);
	td.style.backgroundColor = "black";

	var Id = "cell." + (x + 17) + "." + (y + 1);
	var td = document.getElementById(Id);
	td.style.backgroundColor = "black";

	// 変なの2
	var Id = "cell." + (x + 20) + "." + y;
	var td = document.getElementById(Id);
	td.style.backgroundColor = "black";
	var Id = "cell." + (x + 20) + "." + (y - 1);
	var td = document.getElementById(Id);
	td.style.backgroundColor = "black";
	var Id = "cell." + (x + 20) + "." + (y - 2);
	var td = document.getElementById(Id);
	td.style.backgroundColor = "black";

	var Id = "cell." + (x + 21) + "." + y;
	var td = document.getElementById(Id);
	td.style.backgroundColor = "black";
	var Id = "cell." + (x + 21) + "." + (y - 1);
	var td = document.getElementById(Id);
	td.style.backgroundColor = "black";
	var Id = "cell." + (x + 21) + "." + (y - 2);
	var td = document.getElementById(Id);
	td.style.backgroundColor = "black";

	var Id = "cell." + (x + 22) + "." + (y - 3);
	var td = document.getElementById(Id);
	td.style.backgroundColor = "black";
	var Id = "cell." + (x + 22) + "." + (y + 1);
	var td = document.getElementById(Id);
	td.style.backgroundColor = "black";

	var Id = "cell." + (x + 24) + "." + (y - 3);
	var td = document.getElementById(Id);
	td.style.backgroundColor = "black";
	var Id = "cell." + (x + 24) + "." + (y + 1);
	var td = document.getElementById(Id);
	td.style.backgroundColor = "black";
	var Id = "cell." + (x + 24) + "." + (y - 4);
	var td = document.getElementById(Id);
	td.style.backgroundColor = "black";
	var Id = "cell." + (x + 24) + "." + (y + 2);
	var td = document.getElementById(Id);
	td.style.backgroundColor = "black";

	// 二個目のブロック
	var Id = "cell." + (x + 34) + "." + (y - 1);
	var td = document.getElementById(Id);
	td.style.backgroundColor = "black";
	var Id = "cell." + (x + 35) + "." + (y - 1);
	var td = document.getElementById(Id);
	td.style.backgroundColor = "black";
	var Id = "cell." + (x + 34) + "." + (y - 2);
	var td = document.getElementById(Id);
	td.style.backgroundColor = "black";
	var Id = "cell." + (x + 35) + "." + (y - 2);
	var td = document.getElementById(Id);
	td.style.backgroundColor = "black";
}

// パターンの一つ、ブロックを召喚
function createBlock() {
	var x = random(0, 99);
	var y = random(0, 99);
	var Id = "cell." + x + "." + y;
	var td = document.getElementById(Id);
	td.style.backgroundColor = "black";
	var Id = "cell." + (x + 1) + "." + y;
	var td = document.getElementById(Id);
	td.style.backgroundColor = "black";
	var Id = "cell." + x + "." + (y + 1);
	var td = document.getElementById(Id);
	td.style.backgroundColor = "black";
	var Id = "cell." + (x + 1) + "." + (y + 1);
	var td = document.getElementById(Id);
	td.style.backgroundColor = "black";
}