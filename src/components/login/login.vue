<template>
    <div class="app-logins">
        <div class="proregister">
            <div class="proregister_content">
                <!-- <div class="prologin_content_loadimage"></div> -->
                <div class="prologin_content_loginform_top">
                    <form method="POST" @keyup.13="login">
                        <div class="loginform_top_div">
                            <h4>欢迎登录青橙账户</h4>
                        </div>
                        <div class="loginform_top_input">
                            <input type="text" class="form-control" placeholder="请输入手机号" v-model="phone">
                        </div>
                        <div class="loginform_top_input">
                            <input type="password" autocomplete="new-password" class="form-control" placeholder="请输入密码"
                                v-model="password">
                        </div>
                        <div class="loginform_top_input">
                            <span v-show="uace">{{inrt3}}</span>
                            <input type="button" value="立即登录" class="btn-warning" style="width:100%" @click="login"
                                :disabled="but">
                        </div>
                    </form>
                </div>
                <div class="prologin_content_loginform_foot">
                    <div class="loginform_top_input">
                        <router-link to="/reg" class="foot_reg">去注册</router-link>
                    </div>
                    <div class="ultinput_login">
                        <router-link to="/">找回密码</router-link>
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
                canwidth: "70",
                phone: "",
                password: "",
                inrt1: "",
                inrt2: "",
                inrt3: "",
                uace: false,
                but: false,
                reg: /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/
            }
        },
        methods: {
            login() {
                var phone = this.phone
                var password = this.password
                if (!phone || !password) {
                    this.uace = true;
                    this.inrt3 = "手机或者密码不能为空"
                    return
                } else {
                    this.uace = false;
                }
                if (!this.reg.test(phone)) {
                    this.uace = true;
                    this.inrt3 = "手机号格式错误"
                    return
                } else {
                    this.uace = false
                }
                let postData = this.qs.stringify({
                    phone: phone,
                    password: password
                })
                this.but = true;
                this.axios({
                    method: "post",
                    url: "http://127.0.0.1:3000/user/login",
                    data: postData
                }).then(res => {
                    if (res.data[0] == 1) {
                        this.uace = false
                        this.$store.commit("signin", res.data[1])
                        localStorage.setItem("uid", res.data[1])
                        var curtime = new Date().getTime();
                        localStorage.setItem("time",curtime)
                         location.replace('/')
                    } else if (res.data[0] == 0) {
                        setTimeout(() => {
                            this.inrt3 = "用户名或者密码错误"
                            this.uace = true;
                            this.but = false
                        }, 3000);
                    }
                })
            }
        }
    }
</script>
<style lang="">
    .app-logins {
        padding: 50px 0 80px 0;
        overflow: hidden;
        background: #f7f7f7;
        height: 100%;
    }

    .app-logins .proregister {
        width: 100%;
        margin: 0 auto;
    }

    .app-logins .proregister_content {
        width: 100%;
        border: 1px solid #DCDCDC;
        background-color: White;
        display: flex;
        flex-wrap: wrap;
    }


    .prologin_content_loginform_top {
        float: left;
        width: 100%;
        height: 277px;
        border-bottom: 1px dashed #e7d7d7
    }

    .loginform_top_div {
        height: 52px;
        padding-top: 20px;
        text-align: center;
        margin: 10px 0 10px 0
    }

    .loginform_top_div h4 {
        color: #FF7E00;
        font: 22px/1.1 "微软雅黑", "宋体", "黑体", Arial;
    }

    .loginform_top_input {
        width: 75%;
        padding: 3px;
        text-align: center;
        margin: 10px auto;

    }

    .form-control {
        display: block;
        width: 100%;
        height: 34px;
        padding: 6px 12px;
        font-size: 14px;
        line-height: 1.42857143;
        color: #555;
        background-color: #fff;
        background-image: none;
        border: 1px solid #ccc;
        border-radius: 4px;
        -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
        box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
    }

    .ultinput_login {
        width: 75%;
        padding: 3px;
        text-align: center;
        margin: auto;
        text-align: left;
        padding-top: 10px;
        padding-bottom: 10px
    }

    .ultinput_login a {
        color: #5B5B5B;
        font-size: 12px;
    }

    .prologin_content_loginform_foot {
        float: left;
        padding-top: 30px;
        background-color: White;
        width: 100%;
        height: 150px;
    }

    .foot_reg {
        width: 100%;
        margin: auto;
        font-size: 14px;
        border: 1px solid #e7dbdb;
        color: #333;
        padding: 10px 16px;
        line-height: 1.3333333;
        background-color: #fff;
        display: inline-block;
        font-weight: normal;
        text-align: center;
        white-space: nowrap;
        vertical-align: middle;
        -ms-touch-action: manipulation;
        touch-action: manipulation;
        cursor: pointer;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        border-radius: 4px;
    }

    .foot_reg:hover {
        background: #d7d7d7;
    }

    form span {
        display: block;
        color: #f90a0a;
        margin-bottom: 7px;
        font-size: 14px;
    }
</style>