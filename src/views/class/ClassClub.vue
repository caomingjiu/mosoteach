<template>
	<div class="card cc-col">
		<div class="head cc-df-between">
			<div class="cc-mtop cc-mleft">
				<span class="md-subheading">班课成员(92)</span>
			</div>
			<div class="cc-mtop cc-mright">
				<i class="iconfont people-icon">&#xe7e6;</i>
				<span class="people-font">成员小组方案</span>
			</div>
		</div>
		<div class="cc-df">
			<div class="cc-coll-4 left cc-col">
				<div>
					<input type="text"  placeholder="搜索" v-model="searchInput" class="search-input">
				</div>
				<div v-for="(item,index) in people" :key="index" >
					<div class="cc-df-between small-card small-card-back cc-mltop" v-if="index==1">
						<div class="card-left cc-df ">
							<div class="address"><p>{{item.ranking}}</p></div>
							<div><img :src="item.avatar" alt="用户头像" class="avatar"></div>
							<div class="cc-col">
								<div>
									<p class="front">{{item.name}}</p>
								</div>
								<div>
									<p class="front">{{item.job_number}}</p>
								</div>
							</div>
						</div>
						<div class="card-right cc-col">
						    <div class="cc-df">
								<div><p class="num-experience">{{item.experience}}</p></div>
								<div><p class="font-experience">经验值</p></div>
							</div>
						    <div class="cc-df">
								<img src="https://niit-student.oss-cn-beijing.aliyuncs.com/cloud/e49af6a0-78a2-4b20-ab7d-bb4a83986a7a.png" alt="书籍" class="book-icon">
							    <p class="font">0%</p>
							</div>	
						</div>
					</div>
				</div>
				<div v-for="(item,index) in people" :key="index" >
					<div class="cc-df-between small-card ">
						<div class="card-left cc-df ">
							<div class="address"><p>{{item.ranking}}</p></div>
							<div><img :src="item.avatar" alt="用户头像" class="avatar"></div>
							<div class="cc-col">
								<div>
									<p class="front">{{item.name}}</p>
								</div>
								<div>
									<p class="front">{{item.job_number}}</p>
								</div>
							</div>
						</div>
						<div class="card-right cc-col">
						    <div class="cc-df">
								<div><p class="num-experience">{{item.experience}}</p></div>
								<div><p class="font-experience">经验值</p></div>
							</div>
						    <div class="cc-df">
								<img src="https://niit-student.oss-cn-beijing.aliyuncs.com/cloud/e49af6a0-78a2-4b20-ab7d-bb4a83986a7a.png" alt="书籍" class="book-icon">
							    <p class="font">0%</p>
							</div>	
						</div>
					</div>
				</div>
				<div class=" small-card cc-df-center">
					<img src="https://niit-student.oss-cn-beijing.aliyuncs.com/cloud/7eaece23-0003-4d00-bafe-32b5c84293c7.png" alt="向上" class="address-icon cc-mright" @click="up">
					<img src="https://niit-student.oss-cn-beijing.aliyuncs.com/cloud/3397ff22-fa14-41dc-98ab-2ae938c901b7.png" alt="向下" class="address-icon" @click="down">
				</div>
			</div>
			<div class="cc-coll-8 right">
				
			</div>
		</div>
		
	</div>
	
</template>

<script>
	export default {
		data() {
			return {
				searchInput:'',
				people:[],
				page:1
			};
		},
		created() {
			this.axios({
					method:'post',
					url:this.GLOBAL.baseUrl+ '/userClass/userClass',
					data: {
						currentPage:this.page,
						field: 1,
						pageSize: 2
					}
				})
				.then(res =>{
					this.people = res.data.data;
					console.log(res.data.data)
				})
				.catch(function(error){
					console.log(error)
			});
		},
		methods: {
		up(){
			if(this.page>=1){
				this.page--
				this.axios({
						method:'post',
						url:this.GLOBAL.baseUrl+ '/userClass/userClass',
						data: {
							currentPage:this.page,
							field: 1,
							pageSize: 2
						}
					})
					.then(res =>{
						this.people = res.data.data;
						console.log(res.data.data)
					})
					.catch(function(error){
						console.log(error)
				});
			}
		},
		down(){
			this.page++
			this.axios({
					method:'post',
					url:this.GLOBAL.baseUrl+ '/userClass/userClass',
					data: {
						currentPage:this.page,
						field: 1,
						pageSize: 2
					}
				})
				.then(res =>{
					this.people = res.data.data;
					console.log(res.data.data)
				})
				.catch(function(error){
					console.log(error)
			});
		}
		}
	};	
</script>

<style scoped>
	.card{
		width: 63%;
		margin: auto;
		height: 500px;
		background-color: white;
		margin-top: 30px;
	}
	.address{
		margin-left: 10px;
		margin-top: 10px;
		margin-right: 10px;
	}
	.small-card{
		height: 60px;
		border:lightgray 1px solid ;
	}
	.small-card-back{
	background-color: rgb(240, 240, 240);
	}
	.head{
		border-bottom: lightgray 1px solid;
		padding-bottom: 15px;
	}
	.people-icon{
		color: rgb(0, 187, 221);
		font-size: 23px;
	}
	.people-font{
		color: rgb(0, 187, 221);
		font-size: 15px;
	}
	.left{
		border-right: lightgray 1px solid;
	}
	.right{
		
	}
	.search-input{
		width: 200px;
		height: 30px;
		border: 1px lightgray solid;
		margin-top: 40px;
		margin-left: 20px;
	}
	.avatar{
		width: 40px;
		height: 40px;
		border-radius: 50%;
		margin-right: 10px;
	}
	.front{
		font-size: 13px;
	}
	.book-icon{
		width: 15px;
		height: 15px;
		margin-right: 5px;
		margin-top:2px;
	}
	.num-experience{
		color: rgb(255, 162, 70);
		font-size: 20px;
		margin-bottom: 5px;
		margin-right: 3px;
	}
	.font-experience{
        font-size: 13px;		
		margin-bottom: 5px;
		margin-right: 10px;
	}
	.address-icon{
		width: 15px;
		height: 15px;
	}
</style>
