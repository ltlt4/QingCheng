<template>
    <div class="app-sign">
        <div class="proregister">
            <div class="proregister_content">
                <div class="proregister_content_top">
                    <span>注册青橙账户</span>
                </div>
                <div class="proregister_content_foot">
                    <form method="POST" @keyup.13="signin">
                        <div class="content_foot_div">
                            <input type="text" placeholder="注册手机号" v-model="phone" @blur="measure(phone,0,/^1([38]\d|5[0-35-9]|7[3678])\d{8}$/)">
                            <p v-if="uphone">{{intr}}</p>
                        </div>
                        <div class="content_foot_div">
                            <input type="text" placeholder="注册邮箱" autocomplete='email' v-model="email" @blur="measure(email,1,/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/)">
                            <p v-if="uemail">{{intr2}}</p>
                        </div>
                        <div class="content_foot_div">
                            <input type="password" placeholder="登录密码(长度在8~16位之间)" autocomplete="new-password" v-model="password"
                                　>
                            <p v-if="upassword">{{intr3}}</p>
                        </div>
                        <div class="content_foot_div">
                            <input type="password" placeholder="确认密码" autocomplete="new-password" v-model="dbpassword">
                            <p v-if="udbpasssword">两次密码输入不一致</p>
                        </div>
                        <div class="content_foot_div">
                            <!-- <vue-vuecode style="text-align: center" :width="canwidth" ref="dm" v-on:verByValue="datapas"></vue-vuecode> -->
                            <input type="text" placeholder="请输入短信验证码" v-model="message" style="width: 49%">
                            <a href="javascript:;" class="content_foot_a" @click="msg" v-if='disa'>获取短信验证码</a>
                            <a href="javascript:;" class="content_foot_a tion" v-else='disa'>{{intr4}}</a>
                        </div>
                        <div class="content_foot_div">
                            <p v-if="code">验证码输入错误</p>
                        </div>
                        <div style="text-align: center"><input type="button" value="立即注册" class="btn-warning" @click="signin($event)"
                                style="margin:0 auto"></div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    // import abc from '../sub/vue-Verification'
    export default {
        // components: {
        //     "vue-vuecode": abc
        // },
        computed: {
            intr5: function () {

            }
        },
        data() {
            return {
                phone: "",
                uphone: false,
                email: "",
                uemail: false,
                password: "",
                upassword: false,
                dbpassword: "",
                udbpasssword: false,
                intr: "",
                intr2: "",
                intr3: "",
                intr4: "获取验证码",
                canwidth: "150",
                arr: { phone: false, email: false, password: false, dbpwd: false, msg: true },
                modal: false,
                message: "",
                disa: true,
                timer: null,
                count: ""
            }
        },
        methods: {
            measure(data, key, reg) {
                if (!data) {
                    return
                }
                if (key == 0) {
                    if (reg.test(data)) {
                        this.arr.phone = true
                        this.uphone = false;
                    } else {
                        this.uphone = true;
                        this.arr.phone = false
                        this.intr = "手机号格式错误"
                        return
                    }
                } else if (key == 1) {
                    if (reg.test(data)) {
                        this.arr.email = true
                        this.uemail = false;
                    } else {
                        this.arr.email = false
                        this.uemail = true;
                        this.intr2 = "注册邮箱格式错误"
                        return
                    }
                }
            },
            msg() {
                if (this.disa) {
                    if (this.arr.phone == true) {
                        this.axios.post(
                            "http://localhost:5050/user/phone",
                            `mobile=${this.phone}`
                        ).then(res => {
                            localStorage.setItem("timer", res.data.time)
                            this.time()
                            if (res.data.code == 200) {
                                this.Toast({
                                    message: '已发送',
                                    position: 'middle',
                                    duration: 2000
                                });
                                this.arr.msg = true
                            } else if (res.data.code != 200) {
                                this.Toast({
                                    message: '发送失败',
                                    position: 'middle',
                                    duration: 2000
                                });
                                this.arr.msg = false
                            }
                        })
                    } else {
                        this.Toast({
                            message: '请输入正确的手机号码',
                            position: 'middle',
                            duration: 2000
                        });
                    }
                } else {
                    return
                }
            },
            time() {
                let second = localStorage.getItem('timer')
                if (second != undefined) {
                    const TIME_COUNT = 60;
                    if (!this.timer) {
                        this.count = TIME_COUNT;
                        this.disa = false;
                        this.timer = setInterval(() => {
                            let second2 = new Date().getTime()
                            if ((second2 - second) < 60000) {
                                this.count = 60 - parseInt((second2 - second) / 1000)
                                this.intr4 = this.count + "秒后重新发送"
                            } else {
                                this.disa = true;
                                clearInterval(this.timer);
                                this.timer = null;
                                this.intr4 = "获取验证码"
                                localStorage.removeItem('timer')
                            }
                        }, 1000)
                    }
                } else {
                    return null
                }
            },
            signin($event) {
                var phone = this.phone
                var email = this.email
                var password = this.password
                var dbpassword = this.dbpassword
                var key = this.arr
                var msg = this.message
                var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/

                if (!key.phone == true || !key.email == true) {
                    return
                }
                if (!msg) {
                    this.Toast({
                        message: '短信验证码不能为空',
                        position: 'middle',
                        duration: 2000
                    });
                    return null
                }
                if (!password) return
                if (reg.test(password)) {
                    this.upassword = false
                    key.password = true
                } else {
                    this.intr3 = "密码格式错误，至少包含一位英文字母"
                    key.password = false;
                    this.upassword = true
                }
                if (!dbpassword) return
                if (password == dbpassword) {
                    this.udbpasssword = false
                    key.dbpwd = true
                } else if (password != dbpassword) {
                    this.udbpasssword = true
                    key.dbpwd = false
                    return
                }
                if(key.msg==false){
                    return
                }


                this.axios.post(
                    "http://localhost:5050/user/singin",
                    `phone=${phone}&email=${email}`
                ).then(res => {
                    if (res.data[0] == false) {
                        key.phone = true
                        key.email = true
                    } else {
                        var uise = res.data[1];
                        if (uise == 1) {
                            this.intr = "该手机号已被注册";
                            this.uphone = true;
                            key.phone = false;
                            return
                        } else if (uise == 2) {
                            this.intr2 = "该邮箱已被注册";
                            this.uemail = trues
                            key.email = false;
                            return
                        }
                    }
                })
                let a = 0
                for (var i in key) {
                    a += key[i]
                }
                if (a==5) {
                    let postData = this.qs.stringify({
                        phone: phone,
                        email: email,
                        password: password,
                        obj:msg
                    })
                    this.axios({
                        method: "post",
                        url: "http://localhost:5050/user/reg",
                        data: postData
                    }).then(res => {
                        if (res.data == 1) {
                            this.Toast({
                                message: '注册成功',
                                position: 'middle',
                                duration: 2000
                            });
                            localStorage.removeItem('timer')
                            this.$router.push('/');
                        }else if(res.data==404){
                            this.Toast({
                                message: '短信验证码输入错误',
                                position: 'middle',
                                duration: 2000
                            });
                        }
                    })
                } else {
                    this.Toast({
                        message: '注册失败,请重试',
                        position: 'middle',
                        duration: 2000
                    });
                }
            },
        },
        created() {
            this.time()
        },
    }

</script>
<style lang="">
    .app-sign {
        height: 700px;
        overflow: hidden;
        background: #f7f7f7
    }

    .proregister {
        width: 100%;
        margin: 0 auto;
    }

    .proregister_content {
        width: 100%;
        height: 1200px;
        border: 1px solid #DCDCDC;
        background-color: White;
    }

    .proregister_content_top {
        display: block;
        width: 100%;
        height: 60px;
        border-bottom: 1px dashed #DCDCDC;
        text-align: center;
    }

    .proregister_content_top span {
        display: block;
        height: 40px;
        line-height: 40px;
        color: #FF9630;
        font-size: 22px;
        margin: 20px;
    }

    .proregister_content_foot {
        width: 100%;
        height: 100%;
        margin-top: 30px;
        margin-bottom: 30px;
    }

    .content_foot_div {
        width: 100%;
        position: relative;
        text-align: center;
        margin-bottom: 15px;
        text-align: center
    }

    .content_foot_div input {
        width: 80%;
        height: 44px;
        font-size: 14px;
        box-sizing: border-box;
        padding-left: 12px;
        border: #d3d3d3 1px solid;
        outline: medium;
        border-radius: 4px;
    }

    .content_foot_div p,
    .proregister_content_foot p {
        color: #f90a0a;
        margin-top: 10px;
        font-size: 14px;
    }

    .content_foot_a {
        display: inline-block;
        width: 30%;
        height: 42px;
        border: 1px solid red;
        font-size: 14px;
        color: #f7f7f7;
        background: #f90a0a;
        line-height: 40px;
    }

    /*模态框*/
    .modal-bg {
        display: block;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 1070px;
        text-align: center;
        z-index: 990;
        background: #333;
        opacity: 0.7;
    }

    .modal-bg-data {
        width: 400px;
        height: 300px;
        background: white;
        position: absolute;
        left: 50%;
        top: 30%;
        margin-left: -200px;
        margin-top: -150px;
        z-index: 1000;
        text-align: center;
        border-radius: 2px;
    }

    .modal-bg-data p {
        font-size: 40px;
        font-weight: normal;
        color: #333;
        display: block;
        margin-top: 40px;
    }

    .modal-bg-data button {
        background-color: #ef8706;
        font-size: 18px;
        color: #ffffff;
        margin-top: 10px;
        margin-bottom: 20px;
        height: 50px;
        border: none;
        width: 100%;
        cursor: pointer;
        padding-left: 0;
    }

    .tion {
        color: #161515;
        border: 1px solid #fafafa;
        background: #d8cbcb
    }
</style>