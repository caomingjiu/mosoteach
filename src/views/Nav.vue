<template>
	<div>
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
						<ul class="navigate-sun" >
							<i class="iconfont">&#xe601;</i>
							<li><router-link to="/">任务中心</router-link></li>
							<div class=" vertical-bar"></div>
							<i class="iconfont">&#xe67f;</i>
							<li><router-link to="/">教学包</router-link></li>
							<div class=" vertical-bar"></div>
							<i class="iconfont">&#xe641;</i>
							<li><router-link to="/">库管理</router-link></li>
							<div class=" vertical-bar"></div>
							<i class="iconfont">&#xe62d;</i>
							<li><router-link to="/">我的题库</router-link></li>
							<div class=" vertical-bar"></div>
							<i class="iconfont">&#xe60b;</i>
							<li><router-link to="/">手机投屏</router-link></li>
							<div class=" vertical-bar"></div>
						</ul>
					</div>
					<div class="cc-df cc-mleft cc-df-center">
						<img class="cc-sm-avatar" src="../assets/image/avatar.png"alt=""/>
						<li class="cc-mleft">姓名</li>
						<li class="cc-mleft">退出</li>
						<li class="cc-mleft">帮助</li>
					</div>

				</div>
			</div>
		</div>
		<div><router-view class="" style="background-color: #C9C9D3;"/></div>
	</div>
</template>

<script></script>

<style scoped>
	button, input, select, textarea {
	    font-family: inherit;
	    font-size: inherit;
	    line-height: inherit;
	}
.logo {
	height: 100%;
	width: 130px;
	display: flex;
	align-items: center;
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
    background: #E1E1E1;
   
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
</style>
