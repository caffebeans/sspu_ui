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
    import {baseUrl} from "../config/path";
	const axios = require('axios');
	export default {
		data() {
			return {
				courseForm: {
					period: '',
					name: '',
					type: '',
					des: '',
					price: 99,
					currentPrice: 49

				},
				foodrules: {
					name: [
						{required: true, message: '请输入课程名称', trigger: 'blur'},
					],
				},
				showAddCategory: false,
				foodSpecs: 'one',
				dialogFormVisible: false,
			}
		},
		created() {

		},
		computed: {

		},
		methods: {

		addcourse(courseForm) {

				let that = this;
				axios({
					method: 'post',
					url: baseUrl+"/course/",
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
