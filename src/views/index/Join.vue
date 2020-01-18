<template>
	<div class="container">
		<div class="class-box">
			<div class="box-top">
				<img src="../../assets/image/avatar.png" alt="" style="border-radius:10px 10px 0 0;">
			</div>
			<div class="box-bottom">
				<div class="cc-row">
					<div class="box-avatar">
					<img class="cc-avatar" src="../../assets/image/avatar.png" alt="">
					</div>
					<div style=" margin-left: 10px;">许莫淇</div>
				</div>
				<div class="cc-mleft margin-t" >Web开发</div>
				<div class=" cc-df-between cc-mleft cc-mright margin-t">
					<div>软件1851</div>
					<div class="cc-row">
						<div>进入</div>
						<i class="iconfont">&#xe637;</i>
					</div>
					
				</div>
				
				
			</div>
		</div>
	</div>
	
</template>

<script>
	export default{
		name:'join',
		data(){
			return{};
		},
		created() {	}
	};
</script>

<style lang="scss" scoped>
	.margin-t{
		margin-top: 7px;
	}
	.container{
		.class-box{
			width: 220px;
			height: 316px;
			border-radius:10px;
			border:1px solid;
			border-radius:10px;
			.box-top{
				height: 220px;
				width: 100%;
			}
			.box-bottom{
				padding-top: 10px;
				.box-avatar{
					margin-left: 15px;
					margin-top: -40px;
				}
			}
			
		}
	}
</style>
