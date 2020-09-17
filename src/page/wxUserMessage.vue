<template>
    <div>
        <head-top></head-top>
        <el-row style="margin-top: 20px;">
            <el-col :span="14" :offset="4">
                <header class="form_header">发送消息</header>
                <el-form :model="messageForm" :rules="teacherrules" ref="messageForm" label-width="110px" class="form food_form">
                    <el-form-item label="发送用户" prop="nickname">
                        <el-input v-model="messageForm.nickname"></el-input>
                    </el-form-item>


                    <el-form-item label="发送内容" prop="content">
                        <el-input v-model="messageForm.content"></el-input>
                    </el-form-item>

                    <el-form-item label="结束语" prop="footer">
                        <el-input v-model="messageForm.footer"></el-input>
                    </el-form-item>


                    <el-form-item>
                        <el-button type="primary" @click="send('messageForm')">确认发送</el-button>
                    </el-form-item>
                </el-form>

            </el-col>
        </el-row>
    </div>
</template>



<script>
import headTop from '@/components/headTop'
import {baseUrl,imgUrl} from '@/config/path'
const axios = require('axios');

export default {
    data(){
        return {
            messageForm: {
                footer:'第二工业大学工学部',
                nickname: '张三',
                content: '同学，请及时上报你每天的安全信息'
            }
        }
    },
    components: {
        headTop,
    },

    created(){
        console.log('created')
        this.initData();
    },
    methods: {
        async initData(){


            if (this.$route.query.messageTmeplate!=null){

                this.messageForm=this.$route.query.messageTmeplate;
                this.messageForm.content='同学，请及时上报你每天的安全信息';
                this.messageForm.footer='第二工业大学工学部';
            }


        },

        async send(messageForm){
            let that=this;
            console.log(baseUrl+'/wxx/portal/sendText')
            axios({
                method: 'post',
                url:  baseUrl+'/wxx/portal/sendText',
                data: that.messageForm
            }).then(function (response){
                if (response.data.code==200){
                    that.$message({
                        type: 'success',
                        message: '发送成功'
                    });
                }
                else{
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
