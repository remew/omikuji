(function() {
	'use strict';
	window.addEventListener('DOMContentLoaded', function() {
		var button = document.getElementById('btn');
		var twtbtn = document.getElementById('tweet-button');
		var result = document.getElementById('result');
		var ranks = document.getElementById('ranks');
		var rankArray = '大吉,中吉,小吉,吉,末吉,凶,大凶'.split(',');
		var tweet;
		ranks.innerHTML = rankArray.join('&gt;');
		button.addEventListener('click', function() {
			var seed = getSeed();
			var random = new XorShift(seed);
			var index = random.next() % rankArray.length;
			if (index < 0) {
				index += rankArray.length;
			}
			var fortune = '＞' + rankArray[index] + '！！！＜';
			tweet = 'わたしの今年の運勢は・・・' + fortune + ' #SimpleOmikuji\nhttps://remew.net/omikuji.html';
			result.innerHTML = fortune;
			button.classList.add('hide');
			twtbtn.classList.remove('hide');
			twtbtn.addEventListener('click', function() {
				var url = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(tweet);
				window.open(url, '', 'width=480,height=240');
			});
		});
	});
	var storage = window.localStorage || {
		getItem: function() {
			return new Date().getTime();
		},
		setItem: function(){}
	};
	function getSeed() {
		var seed = storage.getItem('seed');
		if (!seed) {
			var tmp = new Date().getTime();
			seed = JSON.stringify({seed: tmp});
			storage.setItem('seed', seed);
		}
		return JSON.parse(seed).seed;
	}
	function XorShift(seed) {
		if (!(this instanceof XorShift)) {
			console.log('not new');
			return new XorShift(seed);
		}
		seed = seed || 1029384756;
		this.x = 1234567890;
		this.y = 9753197531;
		this.z = 8642086420;
		this.w = seed;
	}
	XorShift.prototype.next = function() {
		var t = this.x ^ (this.x << 11);
		this.x = this.y;
		this.y = this.z;
		this.z = this.w;
		return this.w = (this.w ^ (this.w >>> 19)) ^ (t ^ (t >>> 8));
	};
})();

