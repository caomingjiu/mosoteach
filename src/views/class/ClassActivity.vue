<template>
	<div class="card ">
		<div class="cc-coll-12 head">
			<div class="cc-col">
				<img src="https://niit-student.oss-cn-beijing.aliyuncs.com/cloud/629aaee9-c520-49ac-9df8-0d47580d66b3.png" alt="课堂表现" class="class-icon">
				<p class="class-front">课堂表现</p>
			</div>
		</div>
		    <div>
				<input type="text"  placeholder="根据活动名称搜索" v-model="searchInput" class="search-input">
			</div>
			<div class="cc-mlleft cc-mtop">
			<template >
			  <el-radio v-model="radio" label="1">全部活动</el-radio>
			  <el-radio v-model="radio" label="2">进行中</el-radio>
			  <el-radio v-model="radio" label="3">已结束</el-radio>
			</template>
			</div>
			<div class="cc-col cc-mlleft cc-mtop">
				<div v-for="(item,index) in groups" :key="index">
					<div class="title cc-df-between cc-btn">
						<div class="cc-df">
							<p class="group-font">{{item.name}}({{item.activity_number}})</p>
						</div>
						<div  @click="changestyle(item.id,item.activity_style)">
							<img src="https://niit-student.oss-cn-beijing.aliyuncs.com/cloud/7eaece23-0003-4d00-bafe-32b5c84293c7.png" alt="向上" class="address-icon cc-mright"   v-if="item.activity_style==1">
							<img src="https://niit-student.oss-cn-beijing.aliyuncs.com/cloud/3397ff22-fa14-41dc-98ab-2ae938c901b7.png" alt="向下" class="address-icon cc-mright" v-if="item.activity_style==0">
						</div>
					</div>
					<div class="cc-col" v-for="(item1,index1) in item.activityList" :key="index1" v-if="item.activity_style==1">
						<div class="act-card cc-df" >
							<div>
								<img src="https://niit-student.oss-cn-beijing.aliyuncs.com/cloud/c683565d-31bd-4384-bdf3-12621f2e0528.png" alt="活动样式" class="activity-style">
							</div>
							<div class="cc-col">
								<div class="cc-df">
									<div class="begin" v-if="item1.status==1||item1.status==2">
										<p>进行中</p>
									</div>
									<div class="end" v-if="item1.status==0">
										<p>未开始</p>
									</div>
									<div class="end" v-if="item1.status==3">
										<p>已结束</p>
									</div>
									<div class="cc-mtop cc-mleft">
										<p>{{item1.activity_name}}</p>
									</div>
								</div>
								<div class="cc-df cc-mleft cc-mltop">
									<p class="act-font">共{{item1.join_person_number}}人参与</p>
									<div class="cc-mleft cc-mright">
										<p class="act-font">|</p>
									</div>
									<p class="act-font">2000-03-09 </p>
									<div class="cc-mleft cc-mright">
										<p class="act-font">|</p>
									</div>
									<p class="act-font" style="color: red;" v-if="item1.join_status==0">
										{{item1.experience}}   经验
									</p>
									<p class="act-font" style="color: greenyellow;" v-if="item1.join_status==1">
										已参与   {{item1.experience}}   经验
									</p>
								</div>
							</div>
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
				radio:'1',
				user: JSON.parse(localStorage.getItem('user')),
				groups:[],
				x:0
			};
		},
		created() {
			console.log(this.$route.params.id);
			this.axios({
					method:'get',
					url:this.GLOBAL.baseUrl+ '/group/activity/'+this.$route.params.id+'/'+this.user.id,
				})
				.then(res =>{
					this.groups = res.data.data;
					console.log(this.groups)
				})
				.catch(function(error){
					console.log(error)
			});
		},
		methods: {
			fesh(){
				this.axios({
						method:'get',
						url:this.GLOBAL.baseUrl+ '/group/activity/'+this.$route.params.id+'/'+this.user.id,
					})
					.then(res =>{
						this.groups = res.data.data;
						console.log(this.groups)
					})
					.catch(function(error){
						console.log(error)
				});
			},
			changestyle(index,index1){
				if(index1==0){
					this.x=1
				}else{
					this.x=0
				}
				this.axios({
						method:'post',
						url:this.GLOBAL.baseUrl+ '/group/style',
						data: {
							"activityStyle":this.x,
							"id": index
						}
					})
					.then(res =>{
						this.groups = res.data.data;
						console.log(this.groups)
						this.fesh();
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
		background-color: white;
		margin-top: 30px;
	}
	.head{
		height: 80px;
		border-bottom: lightgray 1px solid;
		padding-top: 20px;
		padding-left: 40px;
		padding-bottom: 20px;
	}
	.class-icon{
		width: 22px;
		height: 22px;
		margin-left:15px;
	}
	.class-front{
		font-size: 13px;
	}
	.group-font{
		font-size: 13px;
		margin-left: 20px;
	}
	.search-input{
		width: 900px;
		height: 30px;
		border: 1px lightgray solid;
		margin-top: 40px;
		margin-left: 20px;
	}
	.title{
		background-color:whitesmoke;
		width: 97%;
		height: 30px;
		margin-top: 30px;
		animation: myfirst 2s;
	}
	.address-icon{
	    width: 10px;
			height: 10px;
	}
	@keyframes myfirst {
			from {
				opacity: 0;
			}
	
			to {
				opacity: 1;
			}
		}
    .act-card{
		width: 97%;
		height: 100px;
		border-bottom: lightgray 1px solid;
		animation: mysecound 2s;
	}
	@keyframes mysecound {
			from {
				margin-top: 100px;
			}
	
			to {
			}
		}
	.activity-style{
		width: 65px;
		height: 65px;
		margin-top: 15px;
		margin-left: 15px;
	}
	.begin{
		width: 50px;
		height: 20px;
		border: 1px solid rgb(0, 187, 221);
		border-radius: 5px;
		padding-left:8px;
		margin-left: 15px;
		margin-top: 15px;
	}
	.begin p{
		color: rgb(0, 187, 221);
		font-size: 10px;

	}
	.end{
		width: 50px;
		height: 20px;
		border: 1px solid lightgray;
		border-radius: 5px;
		padding-left:8px;
		margin-left: 15px;
		margin-top: 15px;
	}
	.end p{
		color: lightgray;
		font-size: 10px;
	}
	.act-font{
		color: lightslategrey;
		font-size: 12px;
	}
</style>
