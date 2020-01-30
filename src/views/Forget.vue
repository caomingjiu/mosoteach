<template>
	<div class="background">
		<div class="header cc-df-between">
			<div class="header-left">
				<img src="https://niit-student.oss-cn-beijing.aliyuncs.com/cloud/9b696e64-868d-4f1e-ab5a-0ef828ec22b8%281%29.png" alt="云班课图标" class="mosoteach-icon" />
			</div>
			<div class="cc-df ">
				<router-link to="/">
					<span class=" login-signin" :class="{ 'font-colour': fontColoristrue }" @mouseenter="fontColoristrue = true" @mouseleave="fontColoristrue = false">
						返回登录
					</span>
				</router-link>
				<span class="cc-mleft">|</span>
				<router-link to="/ui-elements/typography">
					<span class="cc-mleft" :class="{ 'font-colour': fontColoristrue1 }" @mouseenter="fontColoristrue1 = true" @mouseleave="fontColoristrue1 = false">帮助</span>
				</router-link>
			</div>
		</div>
		<div class="body cc-col cc-shadow">
			<div class="cc-df rule">
				<div class="blue-icon"></div>
				<div class="address"><p>重置密码</p></div>
			</div>
			<div class="cc-col-center" v-if="gointo==0">
				<el-input placeholder="账号仅支持中国大陆手机号" v-model="phoneInput" class="phone-input" clearable></el-input>
				<div class="cc-mltop cc-df">
					<span class="cc-mright">滑动验证</span>
					<div class="drag">
						<div class="drag_bg"></div>
						<div class="drag_text" :class="{ 'front-white': confirmWords != '拖动滑块验证' }">{{ confirmWords }}</div>
						<div @mousedown="mousedownFn($event)" class="handler handler_bg"></div>
					</div>
				</div>
				<div class="cc-mlltop">
					<el-button class="dis-btn" v-if="Istrue" disabled>下一步</el-button>
					<el-button class="ok-btn" v-if="!Istrue" @click="go()"><span class="font-colour">下一步</span></el-button>
				</div>
			</div>
			<div  v-if="gointo==1">
				<div class="address1 cc-df-between">
				    <div class="cc-df">
						<img src="https://niit-student.oss-cn-beijing.aliyuncs.com/cloud/f4012393-9197-4e21-8379-821edc6ebd68.png" alt="手机图标" class="phone-icon">
					    <p class="cc-mtop cc-mleft">通过手机{{phoneInput.substring(0,3)}}****{{phoneInput.substring(7,11)}}重置密码</p>
					</div>
				    <div>
						<button class="reset-btn" @click="gointo=2"><span class="font-colour">重置密码</span></button>
					</div>
				</div>
			</div>
			<div class="cc-col-center" v-if="gointo==2">
				<img src="https://niit-student.oss-cn-beijing.aliyuncs.com/cloud/f4012393-9197-4e21-8379-821edc6ebd68.png" alt="手机图标" class="phone-icon cc-mltop">
				<p class="cc-mltop">请进行短信验证</p>
				<div class="cc-df cc-mtop " >
					<el-input placeholder="验证码" v-model="codeInput" class="code-input" clearable></el-input>
					<el-button class="ok1-btn" @click="getCode"><span class="font-colour">{{msg}}</span></el-button>
				</div>
				<el-input placeholder="输入新密码" v-model="passwordInput" class="password-input" clearable></el-input>
				<div class="cc-mltop">
					<el-button class="dis-btn" v-if="codeInput.length!=6||passwordInput.length<6" disabled>下一步</el-button>
					<el-button class="ok-btn" v-if="codeInput.length==6&&passwordInput.length>=6" @click="go1()"><span class="font-colour">下一步</span></el-button>
				</div>
				
			</div>
		</div>
		
	</div>
</template>

<script>
export default {
	data() {
		return {
			phoneInput: '',
			beginClientX: 0,
			/*距离屏幕左端距离*/
			mouseMoveStata: false,
			/*触发拖动状态 判断*/
			maxwidth: 270,
			/*拖动最大宽度，依据滑块宽度算出来的*/
			confirmWords: '拖动滑块验证',
			/*滑块文字*/
			Istrue:true,
			gointo:0,
			codeInput:'',
			passwordInput:'',
			msg:'获取验证码',
			timer:null,
			countdown:10,
		};
	},
	methods: {
		sendmsg() {
			let that = this;
			this.axios({
				method: 'post',
				url: this.GLOBAL.baseUrl +'/user/sms', //后端api
				/* 	header: {
							"Content-Type": "application/x-www-form-urlencoded"
						}, */
				data: {
					mobile: this.phoneInput
				}
				/* headers: {
						'Access-Token': this.token //将token放在请求头带到后端
					} */
			}).then(res => {
				console.log(res);
			});
			},
		getCode() {
			if (this.phoneInput.length != 11) {
				this.msg = '验证失败';
				this.btnDisabled = true;
				this.codeDisabled = true;
				if (!this.timer1) {  
					this.timer1 = setInterval(() => {
						clearInterval(this.timer1);
						this.msg = '获取验证码';
						this.timer1 = null;
						this.codeDisabled = false;
						this.btnDisabled = false;
					}, 1000);
				}
			} else {
				
				if (!this.timer) {
					this.sendmsg();
					this.timer = setInterval(() => {
						if (this.countdown > 0 && this.countdown <= 10) {
							this.countdown--;
							if (this.countdown !== 0) {
								this.codeDisabled = false;
								this.btnDisabled = true;
								this.msg = '重新发送（' + this.countdown + ')';
							} else {
								clearInterval(this.timer);
								this.msg = '获取验证码';
								this.countdown = 10;
								this.timer = null;
								this.codeDisabled = false;
								this.btnDisabled = false;
							}
						}
					}, 1000);
				}
			}
		},
		go1(){
			let that = this;
			this.axios({
				method: 'put',
				url: this.GLOBAL.baseUrl +'/user/password', //后端api
				data: {
					code: this.codeInput,
					id: 0,
					mobile: this.phoneInput,
					password: this.passwordInput,
					status: 0
				}
			}).then(res => {
				console.log(res.data.msg);
				if(res.data.msg=='成功'){
			        this.$message({
			                  message: '恭喜你，修改密码成功',
			                  type: 'success'
			                });
					this.$router.push("/")
					}
				
			});
		},
		go(){
			let that = this;
			this.axios({
				method: 'post',
				url: this.GLOBAL.baseUrl +'/user/mobile', //后端api
				data: {
					equalsString: this.phoneInput
				}
			}).then(res => {
				console.log(res.data.msg);
				if(res.data.msg=='成功'){

					this.gointo=1
					}
				
			});
		},
		mousedownFn: function(e) {
			this.mouseMoveStata = true;
			this.beginClientX = e.clientX;
		}, //按下滑块函数
		successFunction() {
			this.Istrue = false;
			$('.handler')
				.removeClass('handler_bg')
				.addClass('handler_ok_bg');
			this.confirmWords = '验证通过';
			$('.drag').css({
				color: '#fff'
			});
			$('.drag').css({
				'background-color': '#13CE66'
			});
			$('.handler').css({
				left: this.maxwidth
			});
			$('.drag_bg').css({
				width: this.maxwidth
			});
			$('body').unbind('mousemove');
			$('body').unbind('mouseup');
			this.confirmSuccess = true;
		} //验证成功函数
	},
	mounted() {
		$('body').on('mousemove', e => {
			//拖动，这里需要用箭头函数，不然this的指向不会是vue对象
			if (this.mouseMoveStata) {
				var width = e.clientX - this.beginClientX;
				if (width > 0 && width <= this.maxwidth) {
					$('.handler').css({
						left: width
					});
					$('.drag_bg').css({
						width: width
					});
				} else if (width > this.maxwidth) {
					this.successFunction();
				}
			}
		});
		$('body').on('mouseup', e => {
			//鼠标放开
			this.mouseMoveStata = false;
			var width = e.clientX - this.beginClientX;
			if (width < this.maxwidth) {
				$('.handler').css({
					left: 0
				});
				$('.drag_bg').css({
					width: 0
				});
			}
		});
		
	}
};
</script>

<style scoped>
.caveat {
	color: red;
	size: 15px;
}
.address {
	margin-top: -5px;
	margin-left: 10px;
}
.address1{
	margin-top: 130px;
	margin-left: 80px;
}
.dis-btn{
	width: 400px;
	height: 40px;
}
.code-input{
	width: 190px;
}
.ok-btn{
	width: 400px;
	height: 40px;
	border: #13b1e5 solid 1px;
}
.ok1-btn{
	width: 140px;
	height: 40px;
	margin-left: 30px;
	border: #13b1e5 solid 1px;
}
.reset-btn{
	width: 100px;
	height: 30px;
	margin-right: 90px;
	border: #13b1e5 solid 1px;
	background-color: rgb(255, 255, 255);
}
.phone-input {
	width: 40%;
	margin-top: 70px;
}
.password-input{
	width: 40%;
	margin-top: 20px;
	}
.rule {
	border-bottom: lightgrey solid 1px;
	padding-bottom: 13px;
	margin-right: 20px;
}
.phone-icon{
	width: 60px;
	height: 60px;
}
.background {
	background-color: #f4f4f4;
	height: 900px;
	padding-top: 15px;
}
.header {
	width: 65%;
	margin: auto;
	margin-bottom: 15px;
}
.mosoteach-icon {
	width: 170px;
	height: 40px;
}
.font-colour {
	color: #13b1e5;
}
.body {
	width: 65%;
	margin: auto;
	background-color: white;
	border-radius: 5px;
	height: 500px;
	padding-top: 20px;
	padding-left: 20px;
}
.blue-icon {
	background-color: rgb(0, 187, 221);
	width: 10px;
	height: 10px;
}
.drag {
	position: relative;
	background-color: #e8e8e8;
	width: 310px;
	height: 34px;
	margin-left: 5px;
	margin-top: -5px;
	line-height: 34px;
	text-align: center;
}

.handler {
	position: absolute;
	top: 0px;
	left: 0px;
	width: 40px;
	height: 32px;
	border: 1px solid #ccc;
	cursor: move;
}

.handler_bg {
	background: #fff
		url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ZDhlNWY5My05NmI0LTRlNWQtOGFjYi03ZTY4OGYyMTU2ZTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NTEyNTVEMURGMkVFMTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NTEyNTVEMUNGMkVFMTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2MTc5NzNmZS02OTQxLTQyOTYtYTIwNi02NDI2YTNkOWU5YmUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NGQ4ZTVmOTMtOTZiNC00ZTVkLThhY2ItN2U2ODhmMjE1NmU2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+YiRG4AAAALFJREFUeNpi/P//PwMlgImBQkA9A+bOnfsIiBOxKcInh+yCaCDuByoswaIOpxwjciACFegBqZ1AvBSIS5OTk/8TkmNEjwWgQiUgtQuIjwAxUF3yX3xyGIEIFLwHpKyAWB+I1xGSwxULIGf9A7mQkBwTlhBXAFLHgPgqEAcTkmNCU6AL9d8WII4HOvk3ITkWJAXWUMlOoGQHmsE45ViQ2KuBuASoYC4Wf+OUYxz6mQkgwAAN9mIrUReCXgAAAABJRU5ErkJggg==')
		no-repeat center;
}

.handler_ok_bg {
	background: #fff
		url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ZDhlNWY5My05NmI0LTRlNWQtOGFjYi03ZTY4OGYyMTU2ZTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDlBRDI3NjVGMkQ2MTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDlBRDI3NjRGMkQ2MTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDphNWEzMWNhMC1hYmViLTQxNWEtYTEwZS04Y2U5NzRlN2Q4YTEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NGQ4ZTVmOTMtOTZiNC00ZTVkLThhY2ItN2U2ODhmMjE1NmU2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+k+sHwwAAASZJREFUeNpi/P//PwMyKD8uZw+kUoDYEYgloMIvgHg/EM/ptHx0EFk9I8wAoEZ+IDUPiIMY8IN1QJwENOgj3ACo5gNAbMBAHLgAxA4gQ5igAnNJ0MwAVTsX7IKyY7L2UNuJAf+AmAmJ78AEDTBiwGYg5gbifCSxFCZoaBMCy4A4GOjnH0D6DpK4IxNSVIHAfSDOAeLraJrjgJp/AwPbHMhejiQnwYRmUzNQ4VQgDQqXK0ia/0I17wJiPmQNTNBEAgMlQIWiQA2vgWw7QppBekGxsAjIiEUSBNnsBDWEAY9mEFgMMgBk00E0iZtA7AHEctDQ58MRuA6wlLgGFMoMpIG1QFeGwAIxGZo8GUhIysmwQGSAZgwHaEZhICIzOaBkJkqyM0CAAQDGx279Jf50AAAAAABJRU5ErkJggg==')
		no-repeat center;
}

.drag_bg {
	background-color: #7ac23c;
	height: 34px;
	width: 0px;
}

.drag_text {
	position: absolute;
	top: 0px;
	width: 270px;
	-moz-user-select: none;
	-webkit-user-select: none;
	user-select: none;
	-o-user-select: none;
	-ms-user-select: none;
}
</style>
