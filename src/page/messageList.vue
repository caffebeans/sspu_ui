<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
            <el-table
                :data="tableData"
                :fit="true"s
                highlight-current-row
                style="width: 100%">
                <el-table-column
                    type="index">
                </el-table-column>
                <el-table-column
                    property="name"
                    label="模板名称">
                </el-table-column>
                <el-table-column
                    property="content"
                    label="内容">
                </el-table-column>
                <el-table-column
                    property="footer"
                    label="结束语">
                </el-table-column>
                <el-table-column
                    property="createUserName"
                    label="创建人员">
                </el-table-column>

                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="text"
                            @click="handleEdit(scope.$index, scope.row)">编辑
                        </el-button>
                        <el-button
                            size="mini"
                            type="text"
                            @click="messageAdd(scope.$index, scope.row)">添加
                        </el-button>
                        <el-button
                            size="mini"
                            type="text"
                            @click="handleDelete(scope.$index, scope.row)">查看
                        </el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            @click="messageDel(scope.$index, scope.row)">删除
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
	import {getwxUserList, getUserCount} from '@/api/getData'
	import {baseUrl} from "../config/path";

	const axios = require('axios');

	export default {
		data() {
			return {
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
			async initData() {
				let that=this;
				axios({
					method: 'get',
					url: baseUrl+'/messageTemplate/list'
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

            handleEdit(index, row) {
                console.log(index, row);
                this.$router.push({path: '/messageEdit', query: {messageTmeplate:"1233"}})

            },

            messageDel(index,row){

                var id=row.id;
                console.log(typeof(id));
                let that=this;
                axios({
                    method: 'get',
                    url: baseUrl+'/messageTemplate/del',
                    data:{"id":id}
                })
                    .then(function (response) {
                        if (response.data.code == "200") {
                            that.tableData=response.data.data;
                            console.log(response.data)

                        }
                    });

            },

            handleCurrentChange(val) {
				this.currentPage = val;
				this.offset = (val - 1) * this.limit;
				this.getUsers()
			},
			async messageAdd(index, row){
				this.$router.push('/messageAdd');
			},

		},
	}
</script>

<style lang="less">
    @import '../style/mixin';

    .table_container {
        padding: 20px;
    }
</style>
