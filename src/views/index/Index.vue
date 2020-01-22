<template>
	<div class="cc-container">
		<div class="top cc-row ">
			<div class="add"><i class="iconfont">&#xe635;</i></div>
			<div class="search-box cc-row " >
				<span class="search-menu">我加入的</span>
				<i class="iconfont">&#xe6e4;</i>
				<input type="text" name="search" placeholder="搜索我加入的班课" class="search-input" />
			</div>
		</div>
		<div class="cc-row option cc-df-between cc-pleft cc-pright">
			<div class="cc-row option-left ">
				<h3><router-link to="create">我创建的</router-link></h3>
				<h3 style="margin-left: 20px;"><router-link to="join">我加入的</router-link></h3>
			</div>
			<div><button class="cc-btn cc-btn-round cc-btn-min">班课调序</button></div>
		</div>
		<router-view class="router-content" />
	</div>
</template>

<script></script>

<style lang="scss" scoped>
.cc-container {
	.top {
		margin-top: 50px;
		.add{
			.iconfont {
				font-size: 40px;
				color: #30c6e1;
			}
		}
		.search-box {
			height: 36px;
			width: 400px;
		    float: left;
			background-color: #FFFFFF;
		    margin-left: 300px;
			border:1.2px solid;
			border-color: #30c6e1;
			border-radius: 10px;
			.iconfont {
				margin-left: 8px;
				margin-top: 6px;
				color: #757575;
			}
			.search-menu{
				margin-left: 10px;
				margin-top: 6px;
				
			}
			.search-input{
				margin: 1px 1px 1px 1px;
				border:none;outline:medium;
			}

		}
	}

	.option {
		margin-top: 50px;
		background-color: #fff;
		width: 100%;
		height: 50px;
		border-bottom-style: solid;
		border-width: 1px;
		border-color: #ededed;
	}
}
.router-content {
	background-color: #fff;
	height: auto;
	// padding: 20px;
	padding-top: 20px;
	padding-bottom: 20px;
}
</style>
