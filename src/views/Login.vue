<template>
	<div class="mosoteach">
		<div class="cc-coll-12">
			<div class="cc-df-between header">
				<div class="header-left">
					<img src="https://niit-student.oss-cn-beijing.aliyuncs.com/cloud/9b696e64-868d-4f1e-ab5a-0ef828ec22b8%281%29.png"
						alt="云班课图标"
						class="mosoteach-icon"
					/>
				</div>
				<div class="header-right "><i class="iconfont">&#xe60b;</i></div>
			</div>
		</div>
		<div class="cc-coll-12 container">
			<img src="https://niit-student.oss-cn-beijing.aliyuncs.com/cloud/81710452-d36c-4fd7-a9c3-f3490027b377.png" alt="登录背景" class="login-background" />
			<div class="cc-row">
				<img src="https://niit-student.oss-cn-beijing.aliyuncs.com/cloud/9c584d55-0ae8-4b0e-8b35-272bef811edc.png" alt="云班课语言" class="login-front" />
				<div class="login-card">
					<div class="login-card-header">
						<button class="cc-btn loginbtn" @click="loginIstrue=!loginIstrue" :class="{'change-loginbtn':loginIstrue}"><span class="md-body-2">账号密码登录</span></button>
						<button class="cc-btn loginbtn cc-mlleft" @click="loginIstrue=!loginIstrue" :class="{'change-loginbtn':!loginIstrue}"><span class="md-body-2">短信验证码登录</span></button>
					</div>
					<div class="login-card-body cc-pltop" v-if="loginIstrue">
						<div>
							<p class="caveat" v-if="mobileistrue">手机号输入错误！</p>
							<p class="caveat" v-if="passwordistrue">密码错误！</p>
							<el-input placeholder="手机/邮箱" v-model="loginInput" class="login-input" clearable></el-input>
							<el-input placeholder="请输入密码" v-model="passwordInput" class="login-input" show-password></el-input>
						
						</div>
						<p class="cc-pleft cc-pright cc-df-between">
							<md-switch v-model="boolean" class="md-primary ">30 天自动登录</md-switch>
							<router-link to="/forget"><span class="font-colour cc-mright">忘记密码？</span></router-link>
						</p>
							
						<div class="cc-pleft cc-pright login">
							<md-button class="md-raised login-btn " @click="signin"><span class="font-colour">登录</span></md-button>
						</div>
						<div class="cc-df cc-mtop">
							<router-link to="/registered"><span class="font-colour login-signin">注册蓝墨云账号</span></router-link>
							<span class="font-colour cc-mleft">|</span>
							<router-link to="/ui-elements/typography"><span class="font-colour cc-mleft">学校账号密码登录</span></router-link>
						</div>
					</div>
					<div class="login-card-body cc-pltop" v-if="!loginIstrue">
						<div>
							<p class="caveat" v-if="phoneistrue">手机号输入错误！</p>
							<p class="caveat" v-if="codeistrue">验证码错误！</p>
							<el-input placeholder="手机号" v-model="LoginInput" class="login-input" clearable></el-input>
						</div>
							<div class="drag">
								<div class="drag_bg"></div>
								<div class="drag_text" :class="{'front-white':confirmWords!='拖动滑块验证'}">{{confirmWords}}</div>
								<div @mousedown="mousedownFn($event)" class="handler handler_bg" ></div>
							</div>
							<div class="cc-df">
								<el-input placeholder="验证码" v-model="codeInput" class="code-input" clearable></el-input>
							    <el-button class="dis-btn" v-if="codeIstrue" disabled>获取验证码</el-button>
							    <el-button class="ok-btn" v-if="!codeIstrue" @click="getCode"><span class="font-colour">{{msg}}</span></el-button>
							</div>
							<p class="cc-pleft  cc-df-between">
								<md-switch v-model="boolean" class="md-primary ">30 天自动登录</md-switch>
								<router-link to="/ui-elements/typography"><span class="font-colour cc-mright">忘记密码？</span></router-link>
							</p>
						<div class="cc-pleft cc-pright cc-mtop">
							<md-button class="md-raised login-btn " @click="smslogin"><span class="font-colour">登录</span></md-button>
						</div>
						<div class="cc-df cc-mtop">
							<router-link to="/registered"><span class="font-colour login-signin">注册蓝墨云账号</span></router-link>
							<span class="font-colour cc-mleft">|</span>
							<router-link to="/ui-elements/typography"><span class="font-colour cc-mleft">学校账号密码登录</span></router-link>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			istrue: false,
			loginInput: '',
			LoginInput:'',
			codeInput:'',
			passwordInput: '',
			boolean: false,
			loginIstrue: true,
			codeIstrue:true,
			beginClientX: 0,
			/*距离屏幕左端距离*/
			mouseMoveStata: false,
			/*触发拖动状态 判断*/
			maxwidth: 230,
			/*拖动最大宽度，依据滑块宽度算出来的*/
			confirmWords: '拖动滑块验证',
			/*滑块文字*/
			confirmSuccess: false,
			mobileistrue:false,
			passwordistrue:false,
			msg:'获取验证码',
			timer:null,
			countdown:10,
			phoneistrue:false,
			codeistrue:false
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
					mobile: this.LoginInput
				}
				/* headers: {
						'Access-Token': this.token //将token放在请求头带到后端
					} */
			}).then(res => {
				console.log(res);
			});
			},
		getCode() {
			if (this.LoginInput.length != 11) {
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
		smslogin(){
			let that = this;
			this.axios({
				method: 'post',
				url: this.GLOBAL.baseUrl +'/user/sign', //后端api
				data: {
					mobile: this.LoginInput,
					sms: this.codeInput
				}
			})
				.then(res => {
					if (res.data.msg == '成功') {
						localStorage.setItem('user', JSON.stringify(res.data.data));
			            this.GLOBAL.user = res.data.data
						// this.$router.push('nav/myIndex' );
						this.$message({
						          message: '恭喜你，登录成功',
						          type: 'success'
						        });
						this.$router.push("/nav")
					}
					if (res.data.msg == '数据未找到') {
						this.phoneistrue = true;
					} else {
						this.phoneistrue = false;
					}
					if (res.data.msg == '验证码错误') {
						this.codeistrue = true;
					} else {
						this.codeistrue = false;
					}
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		signin() {
			let that = this;
			this.axios({
				method: 'post',
				url: this.GLOBAL.baseUrl +'/user/login', //后端api
				data: {
					mobile: this.loginInput,
					password: this.passwordInput
				}
			})
				.then(res => {
					console.log(res.data.data);
					if (res.data.msg == '成功') { 
		                this.GLOBAL.user = res.data.data
						localStorage.setItem('user', JSON.stringify(res.data.data));
						this.$message({
						          message: '恭喜你，登录成功',
						          type: 'success'
						        });
						this.$router.push("/nav")
					}
					if (res.data.msg == '账号错误') {
						this.mobileistrue = true;
					} else {
						this.mobileistrue = false;
					}
					if (res.data.msg == '密码错误') {
						this.passwordistrue = true;
					} else {
						this.passwordistrue = false;
					}
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		mousedownFn: function(e) {
			this.mouseMoveStata = true;
			this.beginClientX = e.clientX;
		}, //按下滑块函数 
		successFunction() {
			this.codeIstrue=false;
			$(".handler").removeClass('handler_bg').addClass('handler_ok_bg');
			this.confirmWords = '验证通过'
			$(".drag").css({
				'color': '#fff'
			});
			$(".drag").css({
				'background-color': '#13CE66'
			});
			$(".handler").css({
				'left': this.maxwidth
			});
			$(".drag_bg").css({
				'width': this.maxwidth
			});
			$('body').unbind('mousemove');
			$('body').unbind('mouseup');
			this.confirmSuccess = true;
			
		} //验证成功函数 
	},
	mounted() {
		$('body').on('mousemove', (e) => {
			//拖动，这里需要用箭头函数，不然this的指向不会是vue对象 
			if(this.mouseMoveStata) {
				var width = e.clientX - this.beginClientX;
				if(width > 0 && width <= this.maxwidth) {
					$(".handler").css({
						'left': width
					});
					$(".drag_bg").css({
						'width': width
					});
				} else if(width > this.maxwidth) {
					this.successFunction();
				}
			}
		});
		$('body').on('mouseup', (e) => {
			//鼠标放开 
			this.mouseMoveStata = false;
			var width = e.clientX - this.beginClientX;
			if(width < this.maxwidth) {
				$(".handler").css({
					'left': 0
				});
				$(".drag_bg").css({
					'width': 0
				});
			}
		})
	}
};
</script>

<style scoped>
	.caveat{
		color: red;
		size: 15px;
		margin-left: 30px;
		margin-top: -20px;
	}
	.drag_bg-white{
		background-color: white;
	}
	.front-white{
		color: white;
	}
.mosoteach {
	background: #ffffff;
}
.header {
	width: 60%;
	margin: auto;
	margin-top: 15px;
	margin-bottom: 15px;
}
.mosoteach-icon {
	width: 200px;
	height: 40px;
}
.container {
	height: 700px;
}
.login-background {
	width: 100%;
	height: 100%;
}
.login-front {
	width: 400px;
	height: 160px;
	margin-top: -520px;
	margin-left: 18%;
}
.login-card {
	width: 330px;
	height: 400px;
	margin-top: -570px;
	margin-left: 190px;
	background-color: white;
	z-index: 99999999;
}
.loginbtn {
	background-color: white;
}
.login-card-header {
	padding-left: 60px;
	margin-top: 10px;
}
.login-input {
	width: 80%;
	margin-top: 15px;
	margin-left: 30px;
}
.code-input{
	width: 50%;
	margin-top: 15px;
	margin-left: 30px;
	margin-right: 5px;
}
.login-btn {
	width: 270px;
	border: #13b1e5 solid 1px;
}
.font-colour {
	color: #13b1e5;
}
.login-signin {
	margin-left: 40px;
}
.login {
	margin-top: 70px;
}
.dis-btn{
	height: 40px;
	margin-top: 15px;
}
.ok-btn{
	height: 40px;
	margin-top: 15px;
	border: #13b1e5 solid 1px;
}
.change-loginbtn{
	border-bottom:#13b1e5 solid 1px;
	padding-bottom: 8px;
}
			.drag {
				position: relative;
				background-color: #e8e8e8;
				width: 270px;
				height: 34px;
				margin-left: 30px;
				margin-top: 20px;
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
				background: #fff url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ZDhlNWY5My05NmI0LTRlNWQtOGFjYi03ZTY4OGYyMTU2ZTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NTEyNTVEMURGMkVFMTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NTEyNTVEMUNGMkVFMTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2MTc5NzNmZS02OTQxLTQyOTYtYTIwNi02NDI2YTNkOWU5YmUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NGQ4ZTVmOTMtOTZiNC00ZTVkLThhY2ItN2U2ODhmMjE1NmU2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+YiRG4AAAALFJREFUeNpi/P//PwMlgImBQkA9A+bOnfsIiBOxKcInh+yCaCDuByoswaIOpxwjciACFegBqZ1AvBSIS5OTk/8TkmNEjwWgQiUgtQuIjwAxUF3yX3xyGIEIFLwHpKyAWB+I1xGSwxULIGf9A7mQkBwTlhBXAFLHgPgqEAcTkmNCU6AL9d8WII4HOvk3ITkWJAXWUMlOoGQHmsE45ViQ2KuBuASoYC4Wf+OUYxz6mQkgwAAN9mIrUReCXgAAAABJRU5ErkJggg==") no-repeat center;
			}
			
			.handler_ok_bg {
				background: #fff url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ZDhlNWY5My05NmI0LTRlNWQtOGFjYi03ZTY4OGYyMTU2ZTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDlBRDI3NjVGMkQ2MTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDlBRDI3NjRGMkQ2MTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDphNWEzMWNhMC1hYmViLTQxNWEtYTEwZS04Y2U5NzRlN2Q4YTEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NGQ4ZTVmOTMtOTZiNC00ZTVkLThhY2ItN2U2ODhmMjE1NmU2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+k+sHwwAAASZJREFUeNpi/P//PwMyKD8uZw+kUoDYEYgloMIvgHg/EM/ptHx0EFk9I8wAoEZ+IDUPiIMY8IN1QJwENOgj3ACo5gNAbMBAHLgAxA4gQ5igAnNJ0MwAVTsX7IKyY7L2UNuJAf+AmAmJ78AEDTBiwGYg5gbifCSxFCZoaBMCy4A4GOjnH0D6DpK4IxNSVIHAfSDOAeLraJrjgJp/AwPbHMhejiQnwYRmUzNQ4VQgDQqXK0ia/0I17wJiPmQNTNBEAgMlQIWiQA2vgWw7QppBekGxsAjIiEUSBNnsBDWEAY9mEFgMMgBk00E0iZtA7AHEctDQ58MRuA6wlLgGFMoMpIG1QFeGwAIxGZo8GUhIysmwQGSAZgwHaEZhICIzOaBkJkqyM0CAAQDGx279Jf50AAAAAABJRU5ErkJggg==") no-repeat center;
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
