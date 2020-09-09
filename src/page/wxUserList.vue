<template>
    <div class="fillcontain">
<!--        <head-top></head-top>-->
        <div class="table_container">
            <el-table
                :data="tableData"
                :fit="true"
                highlight-current-row
                style="width: 100%">
                <el-table-column
                    type="index">
                </el-table-column>
                <el-table-column
                    property="nickname"
                    label="昵称">
                </el-table-column>
                <el-table-column
                    property="province"
                    label="省份">
                </el-table-column>
                <el-table-column
                    property="city"
                    label="城市">
                </el-table-column>
                <el-table-column :formatter="formatSex"
                    property="sex"
                    label="性别">
                </el-table-column>

                <el-table-column
                    prop="headImgUrl"
                    label="头像"
                    sortable
                    width="180">

                    <!--插入图片链接的代码-->
                    <template slot-scope="scope">
                        <img  :src="scope.row.headImgUrl" alt="" class="avator">
                    </template>

                </el-table-column>

                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">编辑
                        </el-button>
                        <el-button
                            size="mini"
                            type="Success"
                            @click="sendMessage(scope.$index, scope.row)">发送消息
                        </el-button>
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
            let that = this;
            axios({
                method: 'get',
                url: baseUrl + '/wx/user/list'
            })
                .then(function (response) {
                    if (response.data.code == "200") {
                        that.tableData = response.data.data;
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
        async handleEdit(index, row){
            this.$router.push('/messageEdit');

        },

        formatSex(){

        },


        async sendMessage(index, row){


             console.log(row)


           // this.$route.push('/wxUserMessage');


           this.$router.push({path: '/wxUserMessage', query: {messageTmeplate:row}})
          //  this.$router.push({path: '/wxUserMessage', query: {messageTmeplate:row}})



        },

    },
}
</script>

<style lang="less">
@import '../style/mixin';

.table_container {
    padding: 20px;
}
.avator{
    .wh(36px, 36px);
    border-radius: 50%;
    margin-right: 37px;
}
</style>
