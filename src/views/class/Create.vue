<template>
	<div class="background-color">
		<span class="md-subheading address">当前位置: 班课列表 > 创建班课</span>
		<div class="card">
			<div class="add-avatar" @click="avatarClick()">
				<i class="iconfont" style="size: 20px;">&#xe600;</i>
			</div>
			<input type="file" @change="changeAvatar($event)" style="display: none;" id="fileBox" />
			<span class="color-33 select-file-des">设置班课封面</span>
			<div class="required cc-mtop">
				班级
				<span style="color: red; margin-left: 10px;">*</span>
			</div>
			<div class="select-input"><input type="text" class="text-input check-input" value="" name="clazz_name" autocomplete="off" placeholder="请选择或填写班级" /></div>
			<div class="required cc-mtop">
				课程
				<span style="color: red; margin-left: 10px;">*</span>
			</div>
			<div class="select-input"><input type="text" class="text-input check-input" value="" name="clazz_name" autocomplete="off" placeholder="请选择或填写课程" /></div>
			<div class="required cc-mtop">
				学期
				<span style="color: red; margin-left: 10px;">*</span>
			</div>
			<div class="select-input"><input type="text" class="text-input check-input" value="" name="clazz_name" autocomplete="off" placeholder="请选择或填写时间" /></div>

			<div class="expand-more-box cc-mlltop cc-col-center" @click="expandchoose">
				<div class="horizontal-line"></div>
				<div class="expand-more" v-if="this.expandistrue">
					展开设置学校、院系等其他信息
					<i class="iconfont">&#xe629;</i>
				</div>
				<div class="fewer-more" v-if="!this.expandistrue">
					收起
					<i class="iconfont">&#xe628;</i>
				</div>
			</div>

			<div class="expand-content cc-mlltop" v-if="!this.expandistrue">
				<span>智能立体化教材</span>
				<div class="digital-textbooks">
					<img src="https://static.cdn.oss.mosoteach.cn/mosoteach2/common/images/book-cover-new.png" style="width: 100px;" alt="" />
					<button type="button" class="button-routine">设置云教材</button>
				</div>
				<div class="required cc-mtop">
					类型
					<span style="color: red; margin-left: 10px;">*</span>
				</div>
				<div class="cc-mtop">
					<input type="checkbox" name="my-checkbox" id="opt-in" />
					<label class="cc-mleft" for="opt-in">学校课表班课（学校课表班课就是学校安排课程表里的正式班课）</label>
				</div>
				<div class="required cc-mtop">
					学校
					<span style="color: red; margin-left: 10px;">*</span>
				</div>
				<div class="select-input"><input type="text" class="text-input check-input" value="" name="clazz_name" autocomplete="off" placeholder="请选择或填写学校" /></div>
				<div class="required cc-mtop">
					院系
					<span style="color: red; margin-left: 10px;">*</span>
				</div>
				<div class="select-input"><input type="text" class="text-input check-input" value="" name="clazz_name" autocomplete="off" placeholder="请选择或填写院系" /></div>
				<div class="required cc-mtop">
					学习要求
				</div>
				<textarea name="learning_requirements" maxlength="3000" id="requirement" class="check-input"></textarea>
				<div class="required cc-mtop">
					学习进度
				</div>
				<textarea name="learning_requirements" maxlength="3000" id="requirement" class="check-input"></textarea>
				<div class="required cc-mtop">
					考试安排
				</div>
				<textarea name="learning_requirements" maxlength="3000" id="requirement" class="check-input"></textarea>
			</div>
			<div class="fewer" v-if="this.expandistrue"></div>

			<div class="button-box">
				<button type="button" class="button-big button-create">确定</button>	
				<button type="button" class="button-big ordinary" onclick="">取消</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			user: JSON.parse(localStorage.getItem('user')),
			classes: [],
			expandistrue: true,
			url: '/nav/create'
		};
	},
	created() {
		this.axios({
			method: 'get',
			url: this.GLOBAL.baseUrl + '/class/all/' + this.user.id
		})
			.then(res => {
				this.classes = res.data.data;
				console.log(this.classes);
			})
			.catch(function(error) {
				console.log(error);
			});
	},
	methods: {
		expandchoose() {
			if (this.expandistrue == false) {
				this.expandistrue = true;
			} else {
				this.expandistrue = false;
			}
		},
		fewerchoose() {
			this.expandistrue = true;
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
					data: {
						
					}
				})
				.then(res => {
					// alert(JSON.stringify(res));
					// alert(res.data.msg);
				})
				.catch(function(error) {
					console.log(error);
				});
		},
	}
};
</script>

<style scoped>
.address {
	margin-left: 277px;
}
.background-color {
	background-color: rgb(244, 244, 244);
	padding-top: 10px;
	height: auto;
	padding-bottom: 30px;
}
.card {
	background-color: white;
	width: 64%;
	margin: auto;
	margin-top: 10px;
	height: auto;
	padding-top: 50px;
	padding-left: 200px;
	padding-right: 200px;
	padding-bottom: 40px;
}
.add-avatar {
	cursor: pointer;
	width: 96px;
	height: 96px;
	border: dashed 2px #ccc;
	margin: 0 auto 5px;
	text-align: center;
	line-height: 100px;
}
.add-avatar .iconfont {
	color: #ccc;
	font-size: 30px;
	line-height: inherit;
	margin-right: 0px;
}
.select-file-des {
	display: block;
	text-align: center;
	margin-bottom: 40px;
	color: #666666;
}
.select-input {
	margin-top: 10px;
}
.select-input input {
	border: none;
	width: 98%;
	height: 28px;
	line-height: 30px;
	padding-left: 10px;
	padding-right: 20px;
	box-sizing: border-box;
	margin: 0px;
	background-color: rgba(0, 0, 0, 0);
	word-break: break-all;
	background: none;
	border: 1px solid #e1e1e1;
}

.horizontal-line {
	width: 100%;
	height: 1px;
	background-color: #ccc;
}
.expand-more-box {
}
.expand-more {
	display: flex;
	/* position: relative; */
	background-color: #fff;
	color: #00bbdd;
	font-size: 12px;
	padding: 3px 10px;
	margin-top: -11px;
	cursor: pointer;
	height: 20px;
	width: 212px;
}
.fewer-more {
	display: flex;
	/* position: relative; */
	background-color: #fff;
	color: #00bbdd;
	font-size: 12px;
	padding: 3px 10px;
	margin-top: -11px;
	cursor: pointer;
	height: 20px;
	width: 70px;
}

.fewer-more .iconfont {
	margin-left: 5px;
	size: 3px;
	color: #00bbdd;
}
.expand-more .iconfont {
	margin-left: 5px;
	size: 3px;
	color: #00bbdd;
}
.button-box {
	text-align: center;
	margin-top: 50px;
}
.ordinary {
	font-size: 14px;
	height: 32px;
	border: 1px solid #666;
	color: #666;
	background-color: #fff;
	padding: 0 32px;
}
.button-create {
	margin-right: 10px;
	font-size: 14px;
	height: 32px;
	border: 1px solid #0bd;
	color: #0bd;
	background-color: #fff;
	padding: 0 32px;
}

.digital-textbooks {
	height: 100px;
	margin-top: 8px;
	margin-bottom: 25px;
	display: flex;
	align-items: flex-end;
}

button.button-routine {
	height: 28px;
	border: 1px solid #0bd;
	color: #0bd;
	padding: 0 22px;
	background-color: #fff;
	margin-left: 20px;
}
input[type='checkbox']:checked {
	box-shadow: 0 0 0 3px hotpink;
}
form textarea {
    width: 98%;
    height: 98px;
    padding-top: 5px;
    border-color: #CCC;
}
.check-input{
	width: 100%;
	height: 106px;
}
	
</style>
