/*
26个字母letter=[a-z]
取出的字母存放的空数组letterArr=[]
去出字母个数num=5；
等级leve=1
速度speed=5
分数score=0
生命life=10

getLerrer(num)   获取指定数量的字母

play()  落下字母的动画函数
    挡字幕超过屏幕是要消除，并在原数组中增加字母
    自动补充---->setInterval

key() 消除字幕

*/
function game(sence){
   this.sence=sence;
   this.letter=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
   this.num=4;
   this.letterArr=[];
   this.speed=1;
   this.leve=10;
   this.score=0;
   this.t=null;
   this.cw=document.documentElement.clientWidth;
   this.ch=document.documentElement.clientHeight;
   this.getLetter(4)
}
game.prototype.getLetter=function(num){//取图片
	var that=this;
	function check(let){
		for (var i = 0; i < that.letter.length; i++) {
			if (let==that.letter[i]) {
				return true;
				alert(1)
			};
			return false;
		};
	}
	for(var i=0;i<num;i++){
		var img=document.createElement('img');//随机取图片
		var let=this.letter[Math.floor(Math.random()*this.letter.length)];//随机取字母
		while(check(let)){
			let=this.letter[Math.floor(Math.random()*this.letter.length)];
		}
		img.className=let;
		img.src="images/"+let+".png";
		img.style.cssText="position:absolute;left:"+Math.random()*(this.cw-200)+50+"px;width:100px;height:100px;top:"+Math.random()*(-500)+"px" //左右各有50像素
        this.sence.appendChild(img);//插入场景 插入字母中
        this.letterArr.push(let);
	}
}
game.prototype.play=function(){
    var that=this;
	this.t=setInterval(function(){
		var letters=document.getElementsByTagName('img');
		for(var i=0;i<letters.length;i++){
			var ltop=letters[i].offsetTop
			letters[i].style.top=ltop+that.speed+"px";
			if(ltop>that.ch){//判断是否超出浏览器下端
				var shengming=document.getElementsByClassName("leve")[0];
			    shengming.innerHTML=that.leve;
				that.leve--;
				console.log(that.leve)
				if (that.leve<=0) {
					alert("GAME OVER")
					that.Stop()
					var cx=document.createElement('div');
					cx.style.width="200px";
					cx.style.height="50px";
					cx.style.background="red";
					cx.style.borderRadius="25px";
					cx.style.position="fixed";
					cx.style.right="50%";
					cx.style.bottom="50px";
					cx.style.marginRight="-100px";
					cx.style.bottom="50px";
					cx.style.fontSize="40px";
					cx.style.textAlign="center";
					cx.style.lineHeight="50px";
					cx.style.color="#fff";
					cx.style.cursor="pointer";
					cx.innerHTML="重新游戏";
					this.sence.appendChild(cx);
					end.style.display="none"
					cx.onclick=function(){
						location.reload();//重新加载游戏
                        end.style.display="block"
                        cx.style.display="none"
					}
				};
                var cn = letters[i].className;
                for(var j=0;j<that.letterArr.length;j++){
                	if(that.letterArr[j]==cn){
                		that.letterArr=that.letterArr.splice(j,1)
                	}
                }
				that.sence.removeChild(letters[i]);
				that.getLetter(1);//调用新的字母
				letters[i]=null;
			}
		};
	},10)
}
game.prototype.key=function(){
	var that=this;
	document.onkeydown=function(e){
		var ev=e||window.event;
		var k=String.fromCharCode(ev.keyCode);
		var now=that.sence.getElementsByClassName(k);
		if(now.length>0){
			var fenshu=document.getElementsByClassName("score")[0];
	        fenshu.innerHTML=that.score;
			that.score+=10;//分数自加
			if (that.leve<10) {
				that.leve++
				if (that.leve>=10) {
					that.leve=10
				};
				console.dir(that.leve)
			};

			console.dir(that.score)
			if (that.score>=100) {
				alert("进入下一关")
				that.score=0//清空分数
				location.reload();//重新加载游戏
			};
			that.sence.removeChild(now[0]);
			that.getLetter(1);
	        for(var i=0;i<that.letterArr.length;i++){
	        	if(that.letterArr[i]==k){
	                that.letterArr=that.letterArr.splice(i,1);
	        	}
	        }
		}
	}
}
game.prototype.Stop=function(){
	var that=this;
	clearInterval(that.t)
}