<template>
	<div class="card ">
		<div><input type="text" placeholder="根据资源名称搜索" v-model="searchInput" class="search-input" /></div>
		<div class="cc-mlleft cc-mtop">
			<template>
				<el-radio v-model="radio" label="1">按分组名称显示</el-radio>
			</template>
		</div>
		<div class="cc-col cc-mlleft cc-mtop">
			<div v-for="(item, index) in groups" :key="index">
				<div class="title cc-df-between cc-btn">
					<div class="cc-df">
						<p class="group-font">{{ item.name }}({{ item.overResourceNumbers }}/{{ item.resource_number }})</p>
					</div>
					<div @click="changestyle(item.id, item.resource_style)">
						<img
							src="https://niit-student.oss-cn-beijing.aliyuncs.com/cloud/7eaece23-0003-4d00-bafe-32b5c84293c7.png"
							alt="向上"
							class="address-icon cc-mright"
							v-if="item.resource_style == 1"
						/>
						<img
							src="https://niit-student.oss-cn-beijing.aliyuncs.com/cloud/3397ff22-fa14-41dc-98ab-2ae938c901b7.png"
							alt="向下"
							class="address-icon cc-mright"
							v-if="item.resource_style == 0"
						/>
					</div>
				</div>
				<div class="cc-col" v-for="(item1, index1) in item.resourceList" :key="index1" v-if="item.resource_style == 1">
					<a :href="item1.url">
						<div class="act-card cc-df">
							<div>
								<img
									src="https://niit-student.oss-cn-beijing.aliyuncs.com/cloud/dc05129b-3127-4dd2-bc1a-0967280892aa.png"
									alt="超链接样式"
									class="activity-style"
									v-if="item1.type == 'a'"
								/>
								<img
									src="https://niit-student.oss-cn-beijing.aliyuncs.com/cloud/18e59926-8408-4d43-a4fa-2af492a535c3.png"
									alt="pdf样式"
									class="activity-style"
									v-if="item1.type == 'pdf'"
								/>
								<img
									src="https://niit-student.oss-cn-beijing.aliyuncs.com/cloud/0338bf2f-99fc-4b9e-9592-31df34061cd8.png"
									alt="zip样式"
									class="activity-style"
									v-if="item1.type == 'zip'"
								/>
								<img
									src="https://niit-student.oss-cn-beijing.aliyuncs.com/cloud/3f8daf11-84d1-4e08-8d31-04ec0342225f.png"
									alt="MP4样式"
									class="activity-style"
									v-if="item1.type == 'mp4'"
								/>
								<img :src="item1.url" alt="jpg" class="activity-style" v-if="item1.type == 'jpg'" />
							</div>
							<div class="cc-col">
								<div class="cc-df">
									<div class="cc-mtop cc-mleft">
										<p>{{ item1.name }}</p>
									</div>
								</div>
								<div class="cc-df cc-mleft cc-mltop">
									<p class="act-font">{{ item1.storage_size }} MB</p>
									<div class="cc-mleft cc-mright"><p class="act-font">|</p></div>
									<p class="act-font">{{ item1.create_time }}</p>
									<div class="cc-mleft cc-mright"><p class="act-font">|</p></div>
									<p class="act-font" style="color: red;" v-if="item1.view_status == 0">{{ item1.experience }} 经验</p>
									<p class="act-font" style="color: greenyellow;" v-if="item1.view_status == 1">已参与 {{ item1.experience }} 经验</p>
									<div class="cc-mleft cc-mright"><p class="act-font">|</p></div>
									<p class="act-font">已参与 {{ item1.viewers }} 人</p>
								</div>
							</div>
						</div>
					</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			radio: '1',
			user: JSON.parse(localStorage.getItem('user')),
			groups: [],
			x: 0
		};
	},
	created() {
		console.log(this.$route.params.id);
		this.axios({
			method: 'get',
			url: this.GLOBAL.baseUrl + '/group/resource/' + this.user.id + '/' + this.$route.params.id
		})
			.then(res => {
				this.groups = res.data.data;
				console.log(this.groups);
			})
			.catch(function(error) {
				console.log(error);
			});
	},
	methods: {
		fesh() {
			this.axios({
				method: 'get',
				url: this.GLOBAL.baseUrl + '/group/resource/' + this.user.id + '/' + this.$route.params.id
			})
				.then(res => {
					this.groups = res.data.data;
					console.log(this.groups);
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		changestyle(index, index1) {
			if (index1 == 0) {
				this.x = 1;
			} else {
				this.x = 0;
			}
			this.axios({
				method: 'post',
				url: this.GLOBAL.baseUrl + '/group/style',
				data: {
					resourceStyle: this.x,
					id: index
				}
			})
				.then(res => {
					this.groups = res.data.data;
					console.log(this.groups);
					this.fesh();
				})
				.catch(function(error) {
					console.log(error);
				});
		}
	}
};
</script>

<style scoped>
.card {
	width: 63%;
	margin: auto;
	background-color: white;
	margin-top: 30px;
}
.group-font {
	font-size: 13px;
	margin-left: 20px;
}
.search-input {
	width: 900px;
	height: 30px;
	border: 1px lightgray solid;
	margin-top: 40px;
	margin-left: 20px;
}
.title {
	background-color: whitesmoke;
	width: 97%;
	height: 30px;
	margin-top: 30px;
	animation: myfirst 2s;
}
.address-icon {
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
.act-card {
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
.activity-style {
	width: 65px;
	height: 65px;
	margin-top: 15px;
	margin-left: 15px;
}
.begin {
	width: 50px;
	height: 20px;
	border: 1px solid rgb(0, 187, 221);
	border-radius: 5px;
	padding-left: 8px;
	margin-left: 15px;
	margin-top: 15px;
}
.begin p {
	color: rgb(0, 187, 221);
	font-size: 10px;
}
.end {
	width: 50px;
	height: 20px;
	border: 1px solid lightgray;
	border-radius: 5px;
	padding-left: 8px;
	margin-left: 15px;
	margin-top: 15px;
}
.end p {
	color: lightgray;
	font-size: 10px;
}
.act-font {
	color: lightslategrey;
	font-size: 12px;
}
</style>
