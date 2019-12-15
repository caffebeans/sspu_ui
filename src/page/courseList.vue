<template>
    <div class="fillcontain">
        <router-view v-if="isRouterAlive"/>
        <head-top></head-top>
        <div class="table_container">
            <el-table
                :data="tableData"
                :fit="true"
                highlight-current-row
                style="width: 100%">
                <!--                <el-table-column-->
                <!--                    type="index">-->
                <!--                </el-table-column>-->

                <el-table-column
                    property="name"
                    label="课程名称">
                </el-table-column>
                <el-table-column
                    property="type"
                    label="类型">
                </el-table-column>
                <el-table-column
                    property="period"
                    label="时长">
                </el-table-column>
                <el-table-column
                property="des"
                label="课程描述">
               </el-table-column>
                <el-table-column
                    property="price"
                    label="课程价格">
                </el-table-column>
                <el-table-column
                    property="currentPrice"
                    label="优惠价格">
                </el-table-column>

                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">编辑
                        </el-button>
<!--                        <el-button-->
<!--                            size="mini"-->
<!--                            type="Success"-->
<!--                            @click="addTeacher(scope.$index, scope.row)">添加课程-->
<!--                        </el-button>-->
                        <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="Pagination" style="text-align: left;margin-top: 10px;">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="20"
                    layout="total, prev, pager, next"
                    :total="count">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
	import headTop from '../components/headTop'
    import {baseUrl} from "../config/path";

	const axios = require('axios');

	export default {
		data() {
			return {
				isRouterAlive:true,
				showView: true, // 用于点击当前页的router时，刷新当前页
				tableData: [],
				currentRow: null,
				offset: 0,
				limit: 20,
				count: 0,
				currentPage: 1,
			}
		},
		components: {
			headTop,
		},
		created() {
			this.initData();
		},
		methods: {
			refreshView () {
				this.showView = false // 通过v-if移除router-view节点
				this.$nextTick(() => {
					this.showView = true // DOM更新后再通过v-if添加router-view节点
				})
			},
			reload(){
				this.isRouterAlive = false
				this.$nextTick(() => (this.isRouterAlive = true))
			},
			async initData() {
				let that=this;
				axios({
					method: 'get',
					url: baseUrl+'/course/'
				})
					.then(function (response) {
						if (response.data.code == "200") {
							that.tableData=response.data.data;
							console.log(response.data)

						}
					});

			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				this.currentPage = val;
				this.offset = (val - 1) * this.limit;
				this.getUsers()
			},
			async addTeacher(index, row){
				this.$router.push('/teacherAdd');

			},
			async handleDelete(index,row){
				let that=this
				this.$confirm('此操作将永久删除该课程信息, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					axios({
						method: 'delete',
						url: baseUrl+'/course/'+row.id,
					}).then(function (response){
						if (response.data.code==200){
							that.$message({
								type: 'success',
								message: '删除成功'
							});
							that.$root.reload();
						}
						else{
							that.$message({
								type: 'warning',
								message: '删除失败'
							});
						}

					});





				}).catch(() => {
					console.log("-----------err");
				});
			}

		},
	}
</script>

<style lang="less">
    @import '../style/mixin';

    .table_container {
        padding: 20px;
    }
</style>
