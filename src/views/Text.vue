<template>
	<div >
		<div v-for="(item,index) in data" :key="index">
		<h1 v-if="index==0">1</h1>
		<h2 v-if="index==1">2</h2>
	    <h3 v-if="index==2">3</h3>
		<h4 v-if="index==3">4</h4>
		<h5 v-if="index==4">5</h5>
		</div>
		
	</div>
	
</template>

<script>
	export default {
		data() {
			return {
				data:[]
				}
			},
			created() {
				for(var i=1;i<6;i++){
					this.data[i-1]=i
				}
					console.log(this.data);
				
				}
		}
</script>

<style>
</style>
