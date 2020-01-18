<template>
	<div class="background">
		<div class="header cc-df-between">
			<div class="header-left">
				<img src="https://niit-student.oss-cn-beijing.aliyuncs.com/cloud/9b696e64-868d-4f1e-ab5a-0ef828ec22b8%281%29.png"
					alt="云班课图标"
					class="mosoteach-icon"
				/>
			</div>
			<div class="cc-df ">
				<router-link to="/"><span class=" login-signin" :class="{'font-colour':fontColoristrue}" @mouseenter="fontColoristrue=true" @mouseleave="fontColoristrue=false">返回登录</span></router-link>
				<span class="cc-mleft">|</span>
				<router-link to="/ui-elements/typography"><span class="cc-mleft" :class="{'font-colour':fontColoristrue1}" @mouseenter="fontColoristrue1=true" @mouseleave="fontColoristrue1=false">帮助</span></router-link>
			</div>
		</div>
		<div class="body cc-col-center">
			<span class="md-title">注册蓝墨新账号</span>
			<div class="card">
				<p class="caveat address1" v-if="!mobileistrue||!phoneistrue">手机号输入错误！</p>
				<p class="caveat address2" v-if="passwordistrue">密码小于6位！</p>
				<p class="caveat address3" v-if="codeistrue">验证码错误！</p>
				<span class="md-caption font-size">使用手机号注册后，你可以通过手机号加密码登录，也可以使用短信验证码进行登录</span>
			    <el-input placeholder="账号仅支持中国大陆手机号" v-model="phoneInput" class="cc-mtop " clearable></el-input>
				<el-input placeholder="请输入密码" v-model="passwordInput" class="cc-mtop " show-password></el-input>
				<div class="cc-mltop cc-df">
					<span class="md-body-2">滑动验证</span>
					<div class="drag">
						<div class="drag_bg"></div>
						<div class="drag_text" :class="{'front-white':confirmWords!='拖动滑块验证'}">{{confirmWords}}</div>
						<div @mousedown="mousedownFn($event)" class="handler handler_bg" ></div>
					</div>
				</div>
				<el-input placeholder="请输入验证码" v-model="codeInput" class="cc-mtop " clearable></el-input>
				<div class="cc-df-between " style="margin-top: -40px;"> 
				 <p></p>
					<el-button type="primary" class="code-btn" @click="sendmsg"><span class="front-white">获取验证码</span></el-button>
				</div>
				<div class="cc-df">
					<md-checkbox v-model="boolean"></md-checkbox>
					<span class="md-body-1 cc-mtop">我已阅读并同意 <router-link to="/ui-elements/typography"><span class="font-colour">《用户协议》</span></router-link></span>
				</div>
				<md-button class="md-raised login-btn " @click="registered"><span class="font-colour">注册</span></md-button>
			</div>
			
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				fontColoristrue:false,
				fontColoristrue1:false,
				mobileistrue:true,
				phoneistrue:true,
				passwordistrue:false,
				codeistrue:false,
				phoneInput:'',
				passwordInput:'',
				codeInput:'',
				boolean: true,
				beginClientX: 0,
				/*距离屏幕左端距离*/
				mouseMoveStata: false,
				/*触发拖动状态 判断*/
				maxwidth: 290,
				/*拖动最大宽度，依据滑块宽度算出来的*/
				confirmWords: '拖动滑块验证',
				/*滑块文字*/
			}
		},
		methods: {
			wrong() {
				if (!/^1[3456789]\d{9}$/.test(this.phoneInput)) {
					this.mobileistrue = false;
				}else{
					this.mobileistrue=true;
				}
			},
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
			registered(){
				let that = this;
				this.axios({
					method: 'post',
					url: this.GLOBAL.baseUrl +'/user/register', //后端api
					data: {
						mobile: this.phoneInput,
						password:this.passwordInput,
						sms: this.codeInput
					}
				})
					.then(res => {
						this.wrong();
						alert(this.mobileistrue)
						if (res.data.msg == '成功'&&this.mobileistrue) {
							
							localStorage.setItem('user', JSON.stringify(res.data.data));
				            this.GLOBAL.user = res.data.data
							// this.$router.push('nav/myIndex' );
							this.$message({
							          message: '恭喜你，注册成功',
							          type: 'success'
							        });
							this.$router.push("/chooserole")
						}
						if (res.data.msg == '数据已存在') {
							this.phoneistrue = false;
						} else {
							this.phoneistrue = true;
						}
						if (res.data.msg == '验证码错误') {
							this.codeistrue = true;
						} else {
							this.codeistrue = false;
						}
						if(this.passwordInput.length<6){
							this.passwordistrue=true;
						}else{
							this.passwordistrue=false;
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
	}
</script>

<style scoped>
	.caveat{
		color: red;
		size: 15px;
	}
	.address1{
		position: absolute;
		top: 300px;
		right:430px;
	}
	.address2{
		position: absolute;
		top: 360px;
		right:452px;
	}
	.address3{
		position: absolute;
		top: 470px;
		right:459px;
	}
.background{
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
.body{
	width: 65%;
	margin: auto;
	background-color: white;
	height: 700px;
	padding-top: 90px;
}
.card{
	width: 40%;
	margin-top: 52px;
}
.font-size{
	font-size: 13.5px;
}
.code-btn{
	z-index: 99999999;
	background: #4dcfe7;
}
.front-white{
	color: white;
}
.login-btn {
	width: 100%;
	height: 50px;
	margin-left: -1px;
	margin-top: 15px;
	border: #13b1e5 solid 1px;
}
.drag {
				position: relative;
				background-color: #e8e8e8;
				width: 330px;
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
