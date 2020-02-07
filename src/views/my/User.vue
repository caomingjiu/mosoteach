<template>
	<div class="container">
		<div class="tabs cc-col-center">
			<div class="tab"><span class="font-colour" :class="{'font-colour1':coloristrue1}" @mouseenter="coloristrue1=false" @mouseleave="coloristrue1=true"><router-link to="/nav/user/account_information">我的信息</router-link></span></div>
			<div class="horizontal-line"></div>
			<div class="tab"><span class="font-colour" :class="{'font-colour1':coloristrue2}" @mouseenter="coloristrue2=false" @mouseleave="coloristrue2=true"><router-link to="/nav/user/profile">用户信息</router-link></span></div>
			<div class="horizontal-line"></div>
			<div class="tab"><span class="font-colour" :class="{'font-colour1':coloristrue3}" @mouseenter="coloristrue3=false" @mouseleave="coloristrue3=true"><router-link to="/nav/user/account_security">账户安全</router-link></span></div>
		</div>
		<router-view class="right" />
	</div>
	
</template>

<script>
	export default {
			data() {
				return {
					coloristrue1:true,
					coloristrue2:true,
					coloristrue3:true,
					user: JSON.parse(localStorage.getItem('user'))
				}
			},
			created() {
	
			},
			methods: {
	
		}
	};
</script>

<style scoped>
	button,
	input,
	select,
	textarea {
		font-family: inherit;
		font-size: inherit;
		line-height: inherit;
	}
	.container{
		width: 65%;
		margin: auto;
		margin-top: 30px;
		padding-bottom: 30px;
		display: flex;

	}
	.horizontal-line {
		width: 100%;
		height: 1px;
		background-color: #ccc;
	}
	.tabs{
		height: 120px;
		width: 120px;
		background-color: #fff;
	}
	.tab{
		width: 100%;
		display: block;
		text-align: center;
		padding-top: 7px;	
		flex: 1 1 33%;
		
	}
	.right{
		width: 840px;
		height: auto;
		background-color: #fff;
		margin-left: 30px;
	}
	.font-colour {
		color: #13b1e5;
	}
	.font-colour1 {
		color: black;
	}
</style>
