<template>
	<div>
	<div class="cc-col-center" v-if="cardchoose==0">
		<span class="md-headline title-header">注册成功</span>
		<div class="cc-col-left card" >
			<span class="md-caption">请选择你的身份</span>
			<div class="cc-df-between card1 cc-btn" :class="{'card1-b':card1istrue1}" @mouseenter="card1istrue1=true" @mouseleave="card1istrue1=false" @click="cardchoose=1">
				<div class="cc-coll-8 cc-col-center cc-col-center1">
					我是老师
				</div>
				<div class="cc-col-4">
					<img src="https://niit-student.oss-cn-beijing.aliyuncs.com/cloud/49bccf91-3338-4565-9e19-00788627716a.png" alt="老师">
				</div>
			</div>
			<div class="cc-df-between card1 cc-btn" :class="{'card1-b':card1istrue2}" @mouseenter="card1istrue2=true" @mouseleave="card1istrue2=false">
				<div class="cc-coll-8 cc-col-center cc-col-center1">
					我是老师
				</div>
				<div class="cc-col-4">
					<img src="https://niit-student.oss-cn-beijing.aliyuncs.com/cloud/0b08620c-f5e3-4f37-968e-7eee2c041cd6.png" alt="老师">
				</div>
			</div>
		</div>
	</div>
	
	<div class="cc-col-center" v-if="cardchoose==1">
		<span class="md-headline title-header1">注册成功</span>
		<div class="cc-col-left card" >
			<div class="cc-df-between" style="width: 100%;">
				<div>
					<p class="font-colour1">请选择你的身份</p>
				</div>
				<div>
					<p class=" font-colour" >更换为学生</p>
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
				card1istrue1:false,
				card1istrue2:false,
				cardchoose:0
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
</style>
