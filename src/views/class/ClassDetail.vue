<template>
	<div class="cc-col">
			<img src="https://niit-student.oss-cn-beijing.aliyuncs.com/cloud/%E5%9B%BE%E5%B1%82%200.png
" alt="登陆者头像" style="height: 110px;">
             <div class="cc-row head">
				 <div class="head-img cc-shadow">
					  <img src="../../assets/image/logo.png" alt="班课头像">
				 </div>
			   
				<div class="cc-mleft cc-col address"> 
				<span class="md-subheading">工业软件班</span>
				<span class="md-caption address1">Web开发</span>
				</div>
			 </div>
			 <div class="cc-row head-nav cc-shadow">
				<div><router-link to="/nav/classdetail/classresources"><h3 class="cc-btn"  @click="navchoose1" :class="{'btn-bor':navistrue1}">资源(3)</h3></router-link></div>
				<div  class="cc-mlleft"><router-link to="/nav/classdetail/classclub"><h3 class="cc-btn"  @click="navchoose2" :class="{'btn-bor':navistrue2}">成员(5)</h3></router-link></div>
				<div  class="cc-mlleft"><router-link to="/nav/classdetail/classactivity"><h3 class="cc-btn"  @click="navchoose3" :class="{'btn-bor':navistrue3}">活动(2)</h3></router-link></div>
				<div  class="cc-mlleft"><router-link to="/nav/classdetail/classmessage"><h3 class="cc-btn"  @click="navchoose4" :class="{'btn-bor':navistrue4}">消息(2)</h3></router-link></div>
				<div  class="cc-mlleft"><router-link to="/nav/classdetail/classdetails"><h3 class="cc-btn"  @click="navchoose5" :class="{'btn-bor':navistrue5}">详情</h3></router-link></div>
			 </div>
			 		<router-view/>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				navistrue1:true,
				navistrue2:false,
				navistrue3:false,
				navistrue4:false,
				navistrue5:false
			};
		},
		created() {
			
		},
		methods: {
		    navchoose1(){
				this.navistrue1=true
				this.navistrue2=false
				this.navistrue3=false
				this.navistrue4=false
				this.navistrue5=false
			},
			navchoose2(){
				this.navistrue1=false
				this.navistrue2=true
				this.navistrue3=false
				this.navistrue4=false
				this.navistrue5=false
			},
			navchoose3(){
				this.navistrue1=false
				this.navistrue2=false
				this.navistrue3=true
				this.navistrue4=false
				this.navistrue5=false
			},
			navchoose4(){
				this.navistrue1=false
				this.navistrue2=false
				this.navistrue3=false
				this.navistrue4=true
				this.navistrue5=false
			},
			navchoose5(){
				this.navistrue1=false
				this.navistrue2=false
				this.navistrue3=false
				this.navistrue4=false
				this.navistrue5=true
			}
		}
	};	
</script>

<style scoped>
	.head{
		width: 63%;
		margin: auto;
		margin-top: -90px;
	}
	.head-img{
		width: 140px;height: 140px;z-index: 9999;padding: 5px 5px 5px 5px;
		background-color: white;
		/* border: #000000 1px solid; */
		border-radius: 5px;
	}
	.head img{
		width: 100%;height: 100%;z-index: 9999;
		
	}
	.address{
		margin-top: 25px;
		margin-left: 15px;
	}
	.address1{
		margin-top: 7px;
	}
	.head-nav{
		height: 50px;
		background-color: white;
		margin-top: -50px;
		padding-top: 15px;
		padding-left: 460px;
	}
	.btn-bor{
		border-bottom: 3px rgb(0, 187, 221) solid;		
		padding-bottom: 13px;		
		color: rgb(0, 187, 221);
	}
</style>
