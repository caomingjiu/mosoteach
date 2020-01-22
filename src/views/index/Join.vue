<template>
	<div class="container cc-row">
		<div class="class-box" v-for="(item, index) in classes" :key="index">
			<div class="box-top"><img :src="item.thumbnail" style="border-radius:10px 10px 0 0;" /></div>
			<div class="box-bottom">
				<div class="cc-row">
					<div class="box-avatar"><img class="cc-avatar" :src=item.avatar /></div>
					<div style=" margin-left: 10px;">{{item.name2}}</div>
				</div>
				<div class="cc-mleft margin-t">{{item.name1}}开发</div>
				<div class=" cc-df-between cc-mleft cc-mright margin-t">
					<div>{{item.class_type}}</div>
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
export default {
	name: 'join',
	data() {
		return {
			userId:1,
			classes:[]
		};
	},
	created() {
			this.axios({
				method:'get',
				url:this.GLOBAL.baseUrl+ '/class/all/'+this.userId,
			})
			.then(res =>{
				this.classes = res.data.data;
				console.log(this.classes)
			})
			.catch(function(error){
				console.log(error)
		});
	}
};
</script>

<style lang="scss" scoped>
.margin-t {
	margin-top: 7px;
}
.container {
	
	.class-box {
		margin-left: 20px;
		width: 220px;
		height: 316px;
		border-radius: 10px;
		// border:1px solid;
		box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.2);
		.box-top {
			height: 220px;
			width: 100%;
		}
		.box-bottom {
			padding-top: 10px;
			.box-avatar {
				margin-left: 15px;
				margin-top: -40px;
			}
		}
	}
}
</style>
