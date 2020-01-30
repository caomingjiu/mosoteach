<template>
	<div class="container-main">
		<div class="header cc-shadow ">
			<div class="header-content cc-df-between">
				<div class="logo">
					<img
						src="
				https://niit-student.oss-cn-beijing.aliyuncs.com/cloud/logo.png
				"
						alt=""
					/>
				</div>
				<div class="cc-df-between navigate-right">
					<!-- 导航栏 -->
					<div class=" cc-df-end navigate">
						<ul class="navigate-sun">
							<i class="iconfont font-colour" :class="{'font-colour1':coloristrue1}" @mouseenter="coloristrue1=false" @mouseleave="coloristrue1=true">&#xe601;</i>
							<li><router-link to="/"><span class="font-colour" :class="{'font-colour1':coloristrue1}" @mouseenter="coloristrue1=false" @mouseleave="coloristrue1=true">任务中心</span></router-link></li>
							<div class=" vertical-bar"></div>
							<i class="iconfont font-colour" :class="{'font-colour1':coloristrue2}" @mouseenter="coloristrue2=false" @mouseleave="coloristrue2=true">&#xe67f;</i>
							<li><router-link to="/"><span class="font-colour" :class="{'font-colour1':coloristrue2}" @mouseenter="coloristrue2=false" @mouseleave="coloristrue2=true">教学包</span></router-link></li>
							<div class=" vertical-bar"></div>
							<i class="iconfont font-colour" :class="{'font-colour1':coloristrue3}" @mouseenter="coloristrue3=false" @mouseleave="coloristrue3=true">&#xe641;</i>
							<li><router-link to="/"><span class="font-colour" :class="{'font-colour1':coloristrue3}" @mouseenter="coloristrue3=false" @mouseleave="coloristrue3=true">库管理</span></router-link></li>
							<div class=" vertical-bar"></div>
							<i class="iconfont font-colour" :class="{'font-colour1':coloristrue4}" @mouseenter="coloristrue4=false" @mouseleave="coloristrue4=true">&#xe62d;</i>
							<li><router-link to="/"><span class="font-colour" :class="{'font-colour1':coloristrue4}" @mouseenter="coloristrue4=false" @mouseleave="coloristrue4=true">我的题库</span></router-link></li>
							<div class=" vertical-bar"></div>
							<i class="iconfont font-colour" :class="{'font-colour1':coloristrue5}" @mouseenter="coloristrue5=false" @mouseleave="coloristrue5=true">&#xe60b;</i>
							<li><router-link to="/"><span class="font-colour" :class="{'font-colour1':coloristrue5}" @mouseenter="coloristrue5=false" @mouseleave="coloristrue5=true">手机投屏</span></router-link></li>
							<div class=" vertical-bar"></div>
						</ul>
					</div>
					<div class="cc-df cc-mleft cc-df-center">
						<img class="cc-sm-avatar" :src="user.avatar" alt="" />
						<li class="cc-mleft">{{user.name}}</li>
						<li class="cc-mleft">退出</li>
						<li class="cc-mleft">帮助</li>
					</div>
				</div>
			</div>
		</div>
		<div class="center-content"><router-view class="" /></div>

		<div class="footer cc-center">
			<div><span>©2012 - 2020 北京智启蓝墨信息技术有限公司 京ICP备12041916号-4</span></div>
			<div class="">
				<a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010802020877"><p style=" font-size: 12px; color: #333;">京公网安备 11010802020877号</p></a>
			</div>
			<div><span>地址：北京市海淀区上地东路 35 号颐泉汇写字楼 516 室联系电话：400-008-1078</span></div>
		</div>
	</div>
</template>

<script>
export default {
		data() {
			return {
				coloristrue1:true,
				coloristrue2:true,
				coloristrue3:true,
				coloristrue4:true,
				coloristrue5:true,
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
.center-content {
	width: 100%;
	height: 500px;
}
.logo {
	height: 100%;
	width: 130px;
	display: flex;
	align-items: center;
}
.font-colour {
	color: #13b1e5;
}
.font-colour1 {
	color: black;
}
.header {
	display: flex;
	list-style: none;
	flex-direction: row;
	align-items: center;
}
.header-content {
	display: flex;
	list-style: none;
	flex-direction: row;
	align-items: center;
	height: 60px;
	width: 64%;
	margin: 0 auto;
}
.navigate {
	height: 100%;
	width: 500px;
	padding-top: 20px;
	padding-bottom: 20px;
}
.navigate-sun {
	display: flex;
	list-style: none;
	flex-direction: row;

	align-items: center;
	height: 100%;
	width: 1500px;
	justify-content: space-around;
}

.vertical-bar {
	width: 1px;
	height: 14px;
	background: #e1e1e1;
}
.cc-df-right {
	list-style: none;
	flex-direction: row;
	height: 60px;
	width: 200px;
	justify-content: space-around;
	margin-left: 200px;
}
a {
	text-decoration: none;
	font: 20px;
	color: #333;
}
.footer {
	padding-top: 20px;
	align-content: flex-end;
	background-color: #ffffff;
	margin-top: 50px;
	height: 100px;
}
</style>
