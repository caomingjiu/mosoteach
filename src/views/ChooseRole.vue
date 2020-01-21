<template>
	<div>
	<div class="cc-col-center" v-if="cardchoose==2">
		<span class="md-headline title-header">注册成功</span>
		<div class="cc-col-left card" >
			<span class="md-caption">请选择你的身份</span>
			<div class="cc-df-between card1 cc-btn" :class="{'card1-b':card1istrue1}" @mouseenter="card1istrue1=true" @mouseleave="card1istrue1=false" @click="change2">
				<div class="cc-coll-8 cc-col-center cc-col-center1">
					我是老师
				</div>
				<div class="cc-col-4">
					<img src="https://niit-student.oss-cn-beijing.aliyuncs.com/cloud/49bccf91-3338-4565-9e19-00788627716a.png" alt="老师">
				</div>
			</div>
			<div class="cc-df-between card1 cc-btn" :class="{'card1-b':card1istrue2}" @mouseenter="card1istrue2=true" @mouseleave="card1istrue2=false" @click="change1(1)">
				<div class="cc-coll-8 cc-col-center cc-col-center1">
					我是学生
				</div>
				<div class="cc-col-4">
					<img src="https://niit-student.oss-cn-beijing.aliyuncs.com/cloud/0b08620c-f5e3-4f37-968e-7eee2c041cd6.png" alt="老师">
				</div>
			</div>
		</div>
	</div>
	
	<div class="cc-col-center" v-if="cardchoose==true">
		<span class="md-headline title-header1">注册成功</span>
		<div class="cc-col-left card" >
			<div class="cc-df-between" style="width: 100%;">
				<div>
					<p>请选择你的身份</p>
				</div>
				<div >
					<p class=" font-colour cc-btn" @click="change1(1)">更换为学生</p>
				</div>		
			</div>
			<div class="cc-df-between card1 card1-b cc-btn" >
				<div class="cc-coll-8 cc-col-center cc-col-center1">
					我是老师
				</div>
				<div class="cc-col-4">
					<img src="https://niit-student.oss-cn-beijing.aliyuncs.com/cloud/49bccf91-3338-4565-9e19-00788627716a.png" alt="老师">
				</div>
			</div>
			<span class="md-caption cc-mlltop" >告诉我们你的基本信息吧～</span>
			<p class="cc-mtop">姓名</p>
			<el-input placeholder="姓名" v-model="nameInput" class="cc-mtop" clearable></el-input>
		    <md-button class=" login-btn " @click="chooseteacher"><span class="font-colour">登录</span></md-button>
		</div>
	</div>	
	    
		<div class="cc-col-center" v-if="cardchoose==false">
			<span class="md-headline title-header1">注册成功</span>
			<div class="cc-col-left card" >
				<div class="cc-df-between" style="width: 100%;">
					<div>
						<p>请选择你的身份</p>
					</div>
					<div>
						<p class=" font-colour cc-btn" @click="change1(2)">更换为老师</p>
					</div>		
				</div>
				<div class="cc-df-between card1 card1-b cc-btn">
					<div class="cc-coll-8 cc-col-center cc-col-center1">
						我是学生
					</div>
					<div class="cc-col-4">
						<img src="https://niit-student.oss-cn-beijing.aliyuncs.com/cloud/0b08620c-f5e3-4f37-968e-7eee2c041cd6.png" alt="老师">
					</div>
				</div>
				<span class="md-caption cc-mlltop" >告诉我们你的基本信息吧～</span>
				<p class="cc-mtop">姓名</p>
				<el-input placeholder="姓名" v-model="name1Input" class="cc-mtop" clearable></el-input>
				<p class="cc-mtop">学号</p>
				<el-input placeholder="学号" v-model="idInput" class="cc-mtop" clearable></el-input>
			    <md-button class=" login-btn " @click="choosestudent"><span class="font-colour">登录</span></md-button>
			</div>
		</div>	
	</div>
	
</template>

<script>
	export default {
		data() {
			return {
				card1istrue1:false,
				card1istrue2:false,
				cardchoose:2,
				cardchoose1:true,
				nameInput:'',
				name1Input:'',
				idInput:''
			}
		},
		methods: {
			change1(i){
				if(i==1){
					this.cardchoose=false
				}else if(i==2){
					this.cardchoose=true
				}
				
			},
			change2(){
				//alert(this.$route.params.id);
				this.cardchoose=true
			},
			chooseteacher(){
				let that = this;
				this.axios({
					method: 'post',
					url: this.GLOBAL.baseUrl +'/userMaster/register', //后端api
					data: {
						jobNumber: null,
						mobile: this.$route.params.id,
						name: this.nameInput,
						profession: "教师"
					}
				}).then(res => {
					this.$message({
					          message: '恭喜你，登录成功',
					          type: 'success'
					        });
					this.$router.push("/nav")
				});
			},
			choosestudent(){
				let that = this;
				this.axios({
					method: 'post',
					url: this.GLOBAL.baseUrl +'/userMaster/register', //后端api
					data: {
						jobNumber: this.idInput,
						mobile: this.$route.params.id,
						name: this.name1Input,
						profession: "学生"
					}
				}).then(res => {
					this.$message({
					          message: '恭喜你，登录成功',
					          type: 'success'
					        });
					this.$router.push("/nav")
				});
			}
			}
	}
</script>

<style scoped>
	.title-header{
		margin-top: 150px;
	}
	.title-header1{
		margin-top: 100px;
	}
	.font-colour {
		color: #13b1e5;
	}
	.card{
		width: 27%;
		margin-top: 50px;
	}
	.card1{
		box-shadow: 0 5px 20px rgba(0, 187, 221, .1);
		border-radius: 15px;
		width: 100%;
		height:100px;
		margin-top: 10px;
	}
	.card1-b{
		border: #13b1e5 solid 1px;
	}
.login-btn {
	width: 100%;
	height: 50px;
	border: #13b1e5 solid 1px;
	background-color: rgb(250, 250, 250);
	margin-top: 30px;
	margin-left: -3px;
}
</style>
