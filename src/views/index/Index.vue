<template>
	<div class="container">
		<div class=" cc-row cc-mlltop">
			<div ><i class="iconfont add">&#xe635;</i></div>
			<div class=" cc-row address" >
				<div class="address1 cc-row">
					<span class="md-subheading">我加入的</span>
				<i class="iconfont address2">&#xe6e4;</i> 
				</div>
				
				<input type="text" name="search" placeholder="搜索我加入的班课" class="search-input" />
			</div>
		</div>
		<div class="card">
			<div class="cc-df-between cc-pleft cc-pright " style="border-bottom: 1px solid black; ">
			<div class="cc-row cc-mtop ">
				<h3 @click="createchoose" class="cc-btn" :class="{'btn-bor':!joinistrue}">我创建的</h3>
				<h3 class="cc-mleft cc-btn" @click="joinchoose"  :class="{'btn-bor':joinistrue}">我加入的</h3>
			</div>
			<div><button class="cc-btn cc-btn-round cc-btn-min" style="background-color: white; border: 1px solid #000000; margin-top: 12px;">班课调序</button></div>
		    </div>
			
			<div class="  cc-row" v-for="(item, index) in classes" :key="index" v-if="joinistrue&&user.profession=='学生'">
				<div class="class-box cc-shadow">
					<div class="box-top"><img src="../../assets/image/logo.png" /></div>
				<div class="box-bottom">
					<div class="cc-row">
						<div class="box-avatar"><img class="cc-avatar" :src="item.avatar" /></div>
						<div class="md-body-1 address2"> {{item.name2}}</div>
					</div>
					<div class="address3 ">{{item.name1}}</div>
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
			
			<div v-if="!joinistrue&&user.profession=='学生'">
				<div class="nothing-content  cc-col-center">
					<img src="https://niit-student.oss-cn-beijing.aliyuncs.com/cloud/IMG_1664.PNG
" alt="" />
					<span class="md-title">还没有创建的班课</span>
				</div>
			</div>
			
			<div class="  cc-row" v-for="(item, index) in classes" :key="index" v-if="joinistrue&&user.profession=='老师'">
				<div class="class-box cc-shadow">
					<div class="box-top"><img src="../../assets/image/logo.png" /></div>
				<div class="box-bottom">
					<div class="cc-row">
						<div class="box-avatar"><img class="cc-avatar" :src="item.avatar" /></div>
						<div class="md-body-1 address2"> {{item.name2}}</div>
					</div>
					<div class="address3 ">{{item.name1}}</div>
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
			
			<div v-if="!joinistrue&&user.profession=='老师'">
				<div class="nothing-content  cc-col-center">
					<img src="https://niit-student.oss-cn-beijing.aliyuncs.com/cloud/IMG_1665.PNG
" alt="" />
					<span class="md-title">还没有已创建的班课，快去创建一个吧～</span>
					<span class="md-caption cc-mtop">创建班课后可以在班课内上传各种学习资源、创建多样化的教学活动等</span>
				    <md-button class="md-raised login-btn " ><router-link to="/nav/create"><span class="font-colour">创建班课</span></router-link></md-button>
				</div>
			</div>
		</div>
		
       
	</div>
</template>

<script>
export default {
	data() {
		return {
			user: JSON.parse(localStorage.getItem('user')),
			classes:[],
			joinistrue:true,
			joinistrue1:true
		};
	},
	created() {
			this.axios({
				method:'get',
				url:this.GLOBAL.baseUrl+ '/class/all/'+this.user.id,
			})
			.then(res =>{
				this.classes = res.data.data;
				console.log(this.classes)
			})
			.catch(function(error){
				console.log(error)
		});
	},
	methods: {
	    createchoose(){
			this.joinistrue=false
		},
		joinchoose(){
			this.joinistrue=true
		}
	}
};	
</script>

<style  scoped>
	.nothing-content img{
		margin-top: 50px;
		width: 200px;
		height: 200px;
	}
	.container{
		width: 65%;
		margin: auto;
	}
	.add{
		font-size: 50px;
		color: rgb(12, 189, 221);
	}
    .address{
		margin-left: 200px;
	}
	.address1{
		margin-right: -100px;
		margin-top: 7px;
		z-index: 10000;
	}
	.address2{
		margin-left: 10px;
		margin-top: 3px;
	}
	.address3{
		margin-top: 10px;
		margin-left: 15px;
	}
	.login-btn {
	width: 95px;
	border: #13b1e5 solid 1px;
	border-radius: 100px;
}
	.search-input{
		width: 450px;
		height: 37px;
		border: #13B1E5 1px solid;
		border-radius: 7px;
		padding-left: 110px;
	}
	.card{
		margin-top: 40px;
		background-color: white;
	}
	.class-box{
		width: 220px;
		height: 320px;
		background-color: white;
		border-radius: 10px;
		margin-top: 10px;
		margin-left: 20px;
		}
	.box-top{
		width: 100%;
		height:67%;
	}
	.box-top img{
		width: 100%%;
		height: 100%;
	}
	.btn-bor{
		border-bottom: 2px rgb(0, 187, 221) solid;
		padding-bottom: 10px;
		color: rgb(0, 187, 221);
	}
	.font-colour {
		color: #13b1e5;
	}
	.box-avatar{
		margin-top: -20px;
		margin-left: 10px;
	}

</style>
