<template>
    <div>
        <head-top></head-top>
        <el-row style="margin-top: 20px;">
            <el-col :span="14" :offset="4">

                <header class="form_header">老师添加</header>
                <el-form :model="teacherForm" :rules="teacherrules" ref="teacherForm" label-width="110px" class="form food_form">
                    <el-form-item label="老师姓名" prop="name">
                        <el-input v-model="teacherForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="老师工号" prop="name">
                        <el-input v-model="teacherForm.id"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号码" prop="phone">
                        <el-input v-model="teacherForm.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="家庭住址" prop="city">
                        <el-input v-model="teacherForm.city"></el-input>
                    </el-form-item>

                    <el-form-item label="简介" prop="des">
                        <el-input v-model="teacherForm.des"></el-input>
                    </el-form-item>
<!--                    <el-form-item label="上传图片">-->
<!--                        <el-upload-->
<!--                            class="avatar-uploader"-->
<!--                            :action="baseUrl + '/v1/addimg/food'"-->
<!--                            :show-file-list="false"-->
<!--                            :on-success="uploadImg"-->
<!--                            :before-upload="beforeImgUpload">-->
<!--                            <img v-if="teacherForm.image_path" :src="baseImgPath + teacherForm.image_path" class="avatar">-->
<!--                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
<!--                        </el-upload>-->
<!--                    </el-form-item>-->
                    <el-form-item label="姓别">
                        <el-radio v-model="teacherForm.gender" label="男">男</el-radio>
                        <el-radio v-model="teacherForm.gender" label="女">女</el-radio>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="addTeacher('teacherForm')">确认添加</el-button>
                    </el-form-item>
                </el-form>

            </el-col>
        </el-row>
    </div>
</template>

<script>

	import headTop from '@/components/headTop'
	import {getCategory, addCategory, addTeacher} from '@/api/getData'
	import {baseUrl, baseImgPath} from '@/config/env'
	const axios = require('axios');
	export default {
		data(){
			return {
				baseUrl,
				baseImgPath,
				restaurant_id: 1,
				categoryForm: {
					categoryList: [],
					categorySelect: '',
					name: '',
					description: '',
				},
				teacherForm: {
					id:'',
					name: '',
					des: '',
					image_path: '',
					city: '',
                    gender:'',
					radio: ''
				},
				teacherrules: {
					name: [
						{ required: true, message: '请输入老师姓名', trigger: 'blur' },

					],
				},
				showAddCategory: false,
				foodSpecs: 'one',
				dialogFormVisible: false,
				specsForm: {
					specs: '',
					packing_fee: 0,
					price: 20,
				},
				specsFormrules: {
					specs: [
						{ required: true, message: '请输入规格', trigger: 'blur' },
					],
				}
			}
		},
		components: {
			headTop,
		},
		created(){
			if (this.$route.query.restaurant_id) {
				this.restaurant_id = this.$route.query.restaurant_id;
			}else{
				this.restaurant_id = Math.ceil(Math.random()*10);
			}
			this.initData();
		},
		computed: {
			selectValue: function (){
				return this.categoryForm.categoryList[this.categoryForm.categorySelect]||{}
			}
		},
		methods: {
			async initData(){
				try{
					const result = await getCategory(this.restaurant_id);
					if (result.status == 1) {
						result.category_list.map((item, index) => {
							item.value = index;
							item.label = item.name;
						})
						this.categoryForm.categoryList = result.category_list;
					}else{
						console.log(result)
					}
				}catch(err){
					console.log(err)
				}
			},
			addCategoryFun(){
				this.showAddCategory = !this.showAddCategory;
			},
			submitcategoryForm(categoryForm) {
				this.$refs[categoryForm].validate(async (valid) => {
					if (valid) {
						const params = {
							name: this.categoryForm.name,
							description: this.categoryForm.description,
							restaurant_id: this.restaurant_id,
						}
						try{
							const result = await addCategory(params);
							if (result.status == 1) {
								this.initData();
								this.categoryForm.name = '';
								this.categoryForm.description = '';
								this.showAddCategory = false;
								this.$message({
									type: 'success',
									message: '添加成功'
								});
							}
						}catch(err){
							console.log(err)
						}
					} else {
						this.$notify.error({
							title: '错误',
							message: '请检查输入是否正确',
							offset: 100
						});
						return false;
					}
				});
			},
			uploadImg(res, file) {
				if (res.status == 1) {
					this.teacherForm.image_path = res.image_path;
				}else{
					this.$message.error('上传图片失败！');
				}
			},
			beforeImgUpload(file) {
				const isRightType = (file.type === 'image/jpeg') || (file.type === 'image/png');
				const isLt2M = file.size / 1024 / 1024 < 2;

				if (!isRightType) {
					this.$message.error('上传头像图片只能是 JPG 格式!');
				}
				if (!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isRightType && isLt2M;
			},
			addspecs(){
				this.teacherForm.specs.push({...this.specsForm});
				this.specsForm.specs = '';
				this.specsForm.packing_fee = 0;
				this.specsForm.price = 20;
				this.dialogFormVisible = false;
			},
			handleDelete(index){
				this.teacherForm.specs.splice(index, 1);
			},
			tableRowClassName(row, index) {
				if (index === 1) {
					return 'info-row';
				} else if (index === 3) {
					return 'positive-row';
				}
				return '';
			},
			async addTeacher(teacherForm){
				    let that=this;
					axios({
						method: 'post',
						url: 'http://localhost:8888/teacher/insert',
						data: that.teacherForm
					}).then(function (response){



                    });



			}





		}
	}
</script>

<style lang="less">
    @import '../style/mixin';
    .form{
        min-width: 400px;
        margin-bottom: 30px;
        &:hover{
            box-shadow: 0 0 8px 0 rgba(232,237,250,.6), 0 2px 4px 0 rgba(232,237,250,.5);
            border-radius: 6px;
            transition: all 400ms;
        }
    }
    .food_form{
        border: 1px solid #eaeefb;
        padding: 10px 10px 0;
    }
    .form_header{
        text-align: center;
        margin-bottom: 10px;
    }
    .category_select{
        border: 1px solid #eaeefb;
        padding: 10px 30px 10px 10px;
        border-top-right-radius: 6px;
        border-top-left-radius: 6px;
    }
    .add_category_row{
        height: 0;
        overflow: hidden;
        transition: all 400ms;
        background: #f9fafc;
    }
    .showEdit{
        height: 185px;
    }
    .add_category{
        background: #f9fafc;
        padding: 10px 30px 0px 10px;
        border: 1px solid #eaeefb;
        border-top: none;
    }
    .add_category_button{
        text-align: center;
        line-height: 40px;
        border-bottom-right-radius: 6px;
        border-bottom-left-radius: 6px;
        border: 1px solid #eaeefb;
        border-top: none;
        transition: all 400ms;
        &:hover{
            background: #f9fafc;
            span, .edit_icon{
                color: #20a0ff;
            }
        }
        span{
            .sc(14px, #999);
            transition: all 400ms;
        }
        .edit_icon{
            color: #ccc;
            transition: all 400ms;
        }
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #20a0ff;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 120px;
        height: 120px;
        line-height: 120px;
        text-align: center;
    }
    .avatar {
        width: 120px;
        height: 120px;
        display: block;
    }
    .cell{
        text-align: center;
    }
</style>
