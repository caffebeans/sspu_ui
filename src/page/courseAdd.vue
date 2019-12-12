<template>
    <div>
        <!--        <head-top></head-top>-->
        <el-row style="margin-top: 20px;">
            <el-col :span="14" :offset="4">
                <header class="form_header">添加课程</header>
                <el-form :model="courseForm" :rules="foodrules" ref="courseForm" label-width="110px"
                         class="form food_form">
                    <el-form-item label="课程名称" prop="name">
                        <el-input v-model="courseForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="课程类型" prop="activity">
                        <el-input placeholder="科学 文学 动脑 社会" v-model="courseForm.type"></el-input>
                    </el-form-item>
                    <el-form-item label="课程描述" prop="description">
                        <el-input v-model="courseForm.des"></el-input>
                    </el-form-item>
                    <el-form-item label="课程时长" prop="description">
                        <el-input v-model="courseForm.period"></el-input>
                    </el-form-item>
                    <!--                    <el-form-item label="上传老师图片">-->
                    <!--                        <el-upload-->
                    <!--                            class="avatar-uploader"-->
                    <!--                            :action="url"-->
                    <!--                            :show-file-list="false"-->
                    <!--                            :on-success="uploadImg"-->
                    <!--                            :before-upload="beforeImgUpload">-->
                    <!--                            <img v-if="courseForm.image_path" :src="baseImgPath + courseForm.image_path" class="avatar">-->
                    <!--                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
                    <!--                        </el-upload>-->
                    <!--                    </el-form-item>-->

                    <el-row v-if="foodSpecs == 'one'">
                        <el-form-item label="课程价格">
                            <el-input-number v-model="courseForm.price" :min="0" :max="100"></el-input-number>
                        </el-form-item>
                        <el-form-item label="优惠价格">
                            <el-input-number v-model="courseForm.currentPrice" :min="0" :max="10000"></el-input-number>
                        </el-form-item>
                    </el-row>
                    <el-form-item>
                        <el-button type="primary" @click="addcourse('courseForm')">确认添加课程</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
	import headTop from '@/components/headTop'
	import {baseUrl, baseImgPath} from '@/config/env'
	import pathUrl from '@/config/path'

	const axios = require('axios');

	export default {
		data() {
			return {
				url: "http://localhost:8888/upload",
				baseUrl,
				baseImgPath,
				restaurant_id: 1,
				categoryForm: {
					categoryList: [],
					categorySelect: '',
					name: '',
					description: '',
				},
				courseForm: {
					period: '',
					name: '',
					//	image_path: '',
					type: '',
					des: '',
					price: 99,
					currentPrice: 87

				},
				foodrules: {
					name: [
						{required: true, message: '请输入课程名称', trigger: 'blur'},
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
						{required: true, message: '请输入规格', trigger: 'blur'},
					],
				}
			}
		},
		components: {
			headTop,
		},
		created() {


			if (this.$route.query.restaurant_id) {
				this.restaurant_id = this.$route.query.restaurant_id;
			} else {
				this.restaurant_id = Math.ceil(Math.random() * 10);

			}
			this.initData();
		},
		computed: {
			selectValue: function () {
				return this.categoryForm.categoryList[this.categoryForm.categorySelect] || {}
			}
		},
		methods: {
			async initData() {
				try {
					const result = await getCategory(this.restaurant_id);
					if (result.status == 1) {
						result.category_list.map((item, index) => {
							item.value = index;
							item.label = item.name;
						})
						this.categoryForm.categoryList = result.category_list;
					} else {
						console.log(result)
					}
				} catch (err) {
					console.log(err)
				}
			},
			uploadImg(res, file) {
				if (res.status == 200) {
					this.courseForm.image_path = res.image_path;
				} else {
					//	this.$message.error('上传图片失败！');
					this.$message.error('有问题！');
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
			addspecs() {
				this.courseForm.specs.push({...this.specsForm});
				this.specsForm.specs = '';
				this.specsForm.packing_fee = 0;
				this.specsForm.price = 20;
				this.dialogFormVisible = false;
			},
			handleDelete(index) {
				this.courseForm.specs.splice(index, 1);
			},
			tableRowClassName(row, index) {
				if (index === 1) {
					return 'info-row';
				} else if (index === 3) {
					return 'positive-row';
				}
				return '';
			}, addcourse(courseForm) {

				let that = this;
				axios({
					method: 'post',
					url: 'http://localhost:8888/course/insertCourse',
					data: that.courseForm
				}).then(function (response) {
					console.log(response.data.code);
					if (response.data.code == 200) {
						that.$message({
							type: 'success',
							message: '添加成功'
						});
					} else {
						that.$message({
							type: 'warning',
							message: '添加失败'
						});
					}

				});


			}

		}

	}
</script>

<style lang="less">
    @import '../style/mixin';

    .form {
        min-width: 400px;
        margin-bottom: 30px;

        &:hover {
            box-shadow: 0 0 8px 0 rgba(232, 237, 250, .6), 0 2px 4px 0 rgba(232, 237, 250, .5);
            border-radius: 6px;
            transition: all 400ms;
        }
    }

    .food_form {
        border: 1px solid #eaeefb;
        padding: 10px 10px 0;
    }

    .form_header {
        text-align: center;
        margin-bottom: 10px;
    }

    .category_select {
        border: 1px solid #eaeefb;
        padding: 10px 30px 10px 10px;
        border-top-right-radius: 6px;
        border-top-left-radius: 6px;
    }

    .add_category_row {
        height: 0;
        overflow: hidden;
        transition: all 400ms;
        background: #f9fafc;
    }

    .showEdit {
        height: 185px;
    }

    .add_category {
        background: #f9fafc;
        padding: 10px 30px 0px 10px;
        border: 1px solid #eaeefb;
        border-top: none;
    }

    .add_category_button {
        text-align: center;
        line-height: 40px;
        border-bottom-right-radius: 6px;
        border-bottom-left-radius: 6px;
        border: 1px solid #eaeefb;
        border-top: none;
        transition: all 400ms;

        &:hover {
            background: #f9fafc;

            span, .edit_icon {
                color: #20a0ff;
            }
        }

        span {
            .sc(14px, #999);
            transition: all 400ms;
        }

        .edit_icon {
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

    .cell {
        text-align: center;
    }
</style>
