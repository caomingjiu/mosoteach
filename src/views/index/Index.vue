<template>
	<div class="cc-container">
		<div class="cc-row option cc-df-between cc-pleft cc-pright">
			<div class="cc-row option-left ">
				<h3><router-link to="/index/create">我创建的</router-link></h3>
				<h3 style="margin-left: 20px;"><router-link to="/index/join">我加入的</router-link></h3>
			</div>
			<div>
				<button class="cc-btn cc-btn-round cc-btn-min">班课调序</button>
			</div>
		</div>
		<router-view class="router-content"/>
	</div>
</template>	

<script>
</script>

<style lang="scss" scoped>
	.cc-container{
		margin-top: 120px;
		background-color: #eee;
		.option{
			width: 100%;
			height: 40px;
		}
		
	}
	.router-content{
		background-color: #eee; 
		height: auto;
		padding: 20px;
		
	}
</style>
