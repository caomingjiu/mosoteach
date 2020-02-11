<!-- 用户信息界面 -->
<template>
	<div class="card">
		<div class="card-top cc-df cc-df-between">
			<div class="cc-df cc-df-between">
				<div class="square"></div>
				<span style="margin-left: 15px;">用户信息</span>
			</div>
			<div class="head-btn-edit" style="display: block;" @click="Compile" v-if="CompileBoolean"><span class="userinfo-edit">编辑</span></div>
			<div class="cc-df" v-if="!CompileBoolean">
				<div class="head-btn-edit" style="display: block;" @click="Compile"><span class="cancel">取消</span></div>
				<div class="head-btn-edit" style="display: block;" @click="finishComile"><span class="userinfo-edit">保存</span></div>
			</div>
		</div>
		<div class="horizontal-line "></div>
		<div class="information-content cc-df">
			<div class="information-left cc-col-center">
				<div class="picture-box"><img :src="user.avatar" alt="" class="show-image" /></div>
				<button type="button" class="button-routine" name="button" style="display: block;" v-if="!CompileBoolean" @click="avatarClick()">设置头像</button>
			</div>
			<div class="information-right">
				<div class="position-box">
					<!-- 账号 -->
					<div class="info-item">
						<label class="info-label">账号</label>
						<span class="account-number" title="18852017973">{{ user.mobile }}</span>
					</div>

					<!-- 姓名 -->
					<div class="info-item">
						<label class="info-label">姓名</label>

						<div class="state-show" v-if="CompileBoolean">{{ this.NewName }}</div>

						<div class="state-edit" v-if="!CompileBoolean">
							<el-input
								class="user-name form-item"
								type="text"
								v-model="NewName"
								name="name"
								:value="user.name"
								placeholder="请输入你的姓名"
								maxlength="20"
							></el-input>
						</div>
					</div>

					<!-- 昵称 -->
					<div class="info-item info-item-nickname">
						<div class="info-label">昵称</div>

						<div class="state-show" v-if="CompileBoolean">{{ this.NewNickname }}</div>

						<div class="state-edit" v-if="!CompileBoolean">
							<div class="info-con">
								<el-input
									class="user-nick form-item"
									v-model="NewNickname"
									type="text"
									name="nick_name"
									:value="this.userDetails.nickname"
									placeholder="请输入昵称"
									maxlength="20"
								></el-input>
							</div>
						</div>
					</div>

					<p class="info-item-plus nick-name-describe" v-if="!CompileBoolean">昵称只用于课程圈中用户名的显示，班课中只显示你的姓名</p>

					<!-- 性别 -->
					<div class="info-item info-item-sex">
						<div class="info-label">性别</div>
						<div class="state-show" v-if="CompileBoolean">{{ this.NewGender }}</div>

						<div class="state-edit" v-if="!CompileBoolean">
							<label class="bui-radios-label bui-radios-anim">
								<input type="radio" checked="" value="男" name="sex" />
								<i class="bui-radios"></i>
								男
							</label>
							<label class="bui-radios-label bui-radios-anim">
								<input type="radio" value="女" name="sex" />
								<i class="bui-radios"></i>
								女
							</label>
						</div>
					</div>

					<!-- 出生年月 -->
					<div class="info-item">
						<div class="info-label">出生年份</div>

						<div class="state-show" v-if="CompileBoolean">{{ this.NewBirthday }}</div>
						<div class="state-edit" v-if="!CompileBoolean">
							<el-input
								class="birthday form-item"
								v-model="NewBirthday"
								type="text"
								name="birthday"
								:value="this.userDetails.birthday"
								placeholder="请输入你的出生年份，如“1991”"
								maxlength="4"
							></el-input>
						</div>
					</div>

					<!-- 身份 -->
					<div class="info-item info-item-usertype">
						<div class="info-label">身份</div>

						<div class="state-show" v-if="CompileBoolean">{{ this.NewProfession }}</div>
						<div class="state-edit" v-if="!CompileBoolean">
							<label class="bui-radios-label bui-radios-anim">
								<input type="radio" checked="NewProfession" value="老师" name="job" />
								<i class="bui-radios"></i>
								老师
							</label>
							<label class="bui-radios-label bui-radios-anim">
								<input type="radio" value="学生" name="job" />
								<i class="bui-radios"></i>
								学生
							</label>
							<label class="bui-radios-label bui-radios-anim">
								<input type="radio" value="其他" name="job" />
								<i class="bui-radios"></i>
								其他
							</label>
						</div>
					</div>

					<!-- 学号 -->
					<div class="info-item">
						<div class="info-label">工号/学号</div>

						<div class="state-show" v-if="CompileBoolean">{{ this.NewJobNumber }}</div>

						<div class="state-edit" v-if="!CompileBoolean">
							<el-input
								class="student-no form-item"
								maxlength="20"
								v-model="NewJobNumber"
								type="text"
								name="number"
								:value="this.userDetails.jobNumber"
								placeholder="请输入你的学号/工号"
							></el-input>
						</div>
					</div>

					<!-- 所在的学校 -->
					<div class="info-item info-item-school">
						<div class="info-label">所在的学校</div>

						<div class="state-show" v-if="CompileBoolean">{{ this.NewSchool }}</div>

						<div class="state-edit" v-if="!CompileBoolean">
							<div class="select-school-info">
								<el-input
									type="text"
									class="department-name form-item"
									v-model="NewSchool"
									name="department_name"
									:value="this.userDetails.school"
									placeholder="请输入或选择院系"
								></el-input>
							</div>
						</div>
					</div>

					<!-- 所在的院系 -->
					<div class="info-item">
						<div class="info-label">所在的院系</div>

						<div class="state-show" v-if="CompileBoolean">{{ this.NewFaculty }}</div>

						<div class="state-edit" v-if="!CompileBoolean">
							<div class="select-school-info">
								<el-input
									type="text"
									class="department-name form-item"
									v-model="NewFaculty"
									name="department_name"
									:value="this.userDetails.faculty"
									placeholder="请输入或选择院系"
								></el-input>
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
			user: JSON.parse(localStorage.getItem('user')),
			id: JSON.parse(localStorage.getItem('user')).id,
			mobile:JSON.parse(localStorage.getItem('user')).mobile,
			userDetails: [],
			CompileBoolean: true,
			url: '/nav/create',
			NewName: '',
			NewNickname: '',
			NewGender: '',
			NewBirthday: '',
			NewProfession: '',
			NewJobNumber: '',
			NewSchool: '',
			NewFaculty: ''
		};
	},
	created() {
		user: JSON.parse(localStorage.getItem('user')),
		console.log('用户信息' + this.user);
		console.log(this.user.mobile);
		this.axios({
			method: 'post',
			url: this.GLOBAL.baseUrl + '/userMaster/mobile/',
			data: {
				mobile: this.user.mobile
			}
		})
			.then(res => {
				this.userDetails = res.data.data;
				console.log('用户详细信息' + this.userDetails);
				this.NewName = this.userDetails.name;
				this.NewNickname = this.userDetails.nickname;
				this.NewGender = this.userDetails.gender;
				this.NewBirthday = this.userDetails.birthday;
				this.NewProfession = this.userDetails.profession;
				this.NewJobNumber = this.userDetails.jobNumber;
				this.NewSchool = this.userDetails.school;
				this.NewFaculty = this.userDetails.faculty;
			})
			.catch(function(error) {
				console.log(error);
			});
	},
	methods: {
		Compile() {
			if (this.CompileBoolean == false) {
				this.CompileBoolean = true;
			} else {
				this.CompileBoolean = false;
			}
		},

		Cancel() {
			this.CompileBoolean = true;
		},

		finishComile() {
			var sex = null;
			var obj = document.getElementsByName('sex');
			for (var i = 0; i < obj.length; i++) {
				//遍历Radio
				if (obj[i].checked) {
					sex = obj[i].value;
				}
			}
			var job = null;
			var obj = document.getElementsByName('job');
			for (var i = 0; i < obj.length; i++) {
				//遍历Radio
				if (obj[i].checked) {
					job = obj[i].value;
				}
			}
			// alert(this.mobile)
			// alert(sex);
			// alert(job);
			this.axios({
				method: 'put',
				url: this.GLOBAL.baseUrl + '/userMaster/update',
				data: {
					mobile:this.mobile,
					name: this.NewName,
					nickname: this.NewNickname,
					gender: sex,
					birthday: this.NewBirthday,
					profession: job,
					jobNumber: this.NewJobNumber,
					school: this.NewSchool,
					faculty: this.NewFaculty
				},
			})
				.then(res => {
					alert('修改成功');
					this.NewGender = sex;
					this.NewProfession =job;
				})
				.catch(function(error) {
					console.log(error);
				});

			if (this.CompileBoolean == false) {
				this.CompileBoolean = true;
			} else {
				this.CompileBoolean = false;
			}
		},
		// 换头像
		avatarClick: function() {
			document.getElementById('fileBox').click();
		},
		changeAvatar: function() {
			var _this = this;
			let formData = new FormData();
			formData.append('file', event.target.files[0]);
			this.axios({
				method: 'post',
				url: this.GLOBAL.baseUrl + '/upload/single',
				headers: {
					'Content-Type': 'multipart/form-data'
				},
				data: formData,
				processData: false,
				contentType: false
			}).then(uploadFileRes => {
				this.avatar = uploadFileRes.data.data;
				this.updateAvatar();
			});
		},
		updateAvatar() {
			this.axios({
				method: 'post',
				url: this.GLOBAL.baseUrl + '',
				data: {}
			})
				.then(res => {
					// alert(JSON.stringify(res));
					// alert(res.data.msg);
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
	display: flex;
	flex-direction: column;
}
.card-top {
	padding: 20px;
}
.square {
	width: 8px;
	height: 8px;
	background-color: #00bbdd;
}

.userinfo-edit {
	background: #00bbdd;
	border-radius: 15px;
	font-size: 14px;
	color: #ffffff;
	width: 80px;
	height: 30px;
	line-height: 30px;
	display: inline-block;
	text-align: center;
	cursor: pointer;
}

.cancel {
	border-radius: 15px;
	font-size: 14px;
	width: 80px;
	height: 30px;
	line-height: 30px;
	display: inline-block;
	text-align: center;
	cursor: pointer;
	margin-right: 20px;
	background-color: #fff;
	border: 1px solid #999999;
	color: #666;
}
.horizontal-line {
	margin-left: 20px;
	width: 95%;
	height: 1px;
	background-color: #ccc;
}
.picture-box .show-image {
	width: 150px;
	height: 150px;
	vertical-align: bottom;
}
.information-content {
	margin-top: 30px;
}
.information-left {
	width: 190px;
	border-right: 1px dashed #e1e1e1;
}
.info-item .info-label {
	font-family: PingFangSC-Regular;
	font-size: 14px;
	color: #666666;
	display: inline-block;
	width: 150px;
	text-align: right;
	margin-right: 30px;
}
.info-item {
	font-size: 14px;
	color: #333333;
	display: flex;
	margin-bottom: 20px;
	align-items: center;
}
.button-routine {
	height: 28px;
	border: 1px solid #0bd;
	color: #0bd;
	padding: 0 22px;
	background-color: #ffffff;
	margin-top: 20px;
}
.info-item-plus {
	padding-left: 180px;
	margin-bottom: 20px;
}
.position-box input {
	font-size: 14px;
	text-indent: 8px;
	padding: 0px;
	height: 36px;
	width: 300px;
	border: 1px solid #bebdbe;
	border-radius: 4px;
}

/* radio */
label.bui-radios-label input {
	position: absolute;
	opacity: 0;
	visibility: hidden;
}

label.bui-radios-label .bui-radios {
	display: inline-block;
	position: relative;
	width: 13px;
	height: 13px;
	background: #ffffff;
	border: 1px solid #979797;
	border-radius: 50%;
	vertical-align: -2px;
}

label.bui-radios-label input:checked + .bui-radios:after {
	position: absolute;
	content: '';
	width: 7px;
	height: 7px;
	background-color: #fff;
	border-radius: 50%;
	top: 3px;
	left: 3px;
}

label.bui-radios-label input:checked + .bui-radios {
	background: #00b066;
	border: 1px solid #00b066;
}

label.bui-radios-label input:disabled + .bui-radios {
	background-color: #e8e8e8;
	border: solid 1px #979797;
}

label.bui-radios-label input:disabled:checked + .bui-radios:after {
	background-color: #c1c1c1;
}

label.bui-radios-label.bui-radios-anim .bui-radios {
	-webkit-transition: background-color ease-out 0.3s;
	transition: background-color ease-out 0.3s;
}
</style>
