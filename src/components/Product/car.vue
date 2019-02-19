<template>
    <div class="app-car">
        <div class="car-top">
            <h3>购物车</h3>
        </div>
        <div class="car-body">
            <div class="car-shop" v-for="(item,i) of list" :key="i">
                <div class="shop-icon" @click="culling(i)"><i class="iconfont" :class="{'icon-red':!show[i],'icon-yuanquanweixuanfuben':show[i],'icon-gou':!show[i]}"></i></div>
                <v-touch v-on:press="strike(i)" style="width: 90%">
                    <div class="warp">
                        <div class="shop-picture"><img :src="item.img" alt=""></div>
                        <div class="shop-information">
                            <span>{{item.kname}}</span>
                            <p>{{item.color}} {{item.memory}}G {{item.setMeal}}</p>
                            <p class="item-red">{{item.price|capitalize}}</p>
                            <div class="right-pres">
                                <a href="javascript:;" @click="total(i)">-</a>
                                <input type="text" v-model="pres[i]" @focus="buy(i)">
                                <a href="javascript:;" @click="_total(i)">+</a>
                            </div>
                        </div>
                    </div>
                </v-touch>
            </div>
            <div class="allele">
                <div class="all_icon" @click="addUp">
                    <i class="iconfont" :class="{'icon-red':!ismt,'icon-yuanquanweixuanfuben':ismt,'icon-gou':!ismt}"></i>
                </div>
                <div class="all_span">
                    <span>全选</span>
                </div>
                <div class="all_total">
                    <span>合计：{{add|capitalize}}</span>
                </div>
                <div class="all_settlement">
                    <button>去结算</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        computed: {
            add: function () {
                var total = 0
                for (var i = 0; i < this.show.length; i++) {
                    if (!this.show[i]) {
                        total += this.list[i].price * this.pres[i]
                    }
                }
                return total
            }
        },
        data() {
            return {
                pres: [],
                list: [],
                show: [],
                isactive: true,
                icon: -1,
                ismt: true
            }
        },
        methods: {
            strike(i) {
                this.MessageBox.confirm("", {
                    message: '确定要删除么',
                    title: '',
                    showConfirmButton: true,
                    showCancelButton: true,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then((action) => {
                    if (action == 'confirm') {
                        this.axios.post(
                            "http://localhost:5050/product/delete",
                            `pid=${this.list[i].pid}&color=${this.list[i].color}`
                        ).then(res => {
                            if (res.data == 1) {
                                this.Toast({
                                    message: '删除成功',
                                    position: 'middle',
                                    duration: 2000
                                });
                                this.readcar()
                            }else if(res.data==0){
                                this.Toast({
                                    message: '删除失败，请重试',
                                    position: 'middle',
                                    duration: 2000
                                });
                            }
                        })
                    }
                }).catch(err => {
                    if (err == 'cancel') {
                        return null
                    }
                });
            },
            total(i) {
                if (this.pres[i] <= 1) {
                    this.$set(this.pres, i, 1)
                    this.Toast({
                        message: '最少购买一件哦',
                        position: 'bottom',
                        duration: 2000
                    });
                } else {
                    this.$set(this.pres, i, this.pres[i] - 1)
                }
            },
            _total(i) {
                this.$set(this.pres, i, this.pres[i] + 1)
            },
            culling(i) {
                this.show[i] ? this.$set(this.show, i, false) : this.$set(this.show, i, true)

            },
            addUp() {
                if (this.ismt) {
                    this.ismt = false;
                    for (var i = 0; i < this.show.length; i++) {
                        this.$set(this.show, i, false)
                    }
                } else if (!this.ismt) {
                    this.ismt = true;
                    for (var i = 0; i < this.show.length; i++) {
                        this.$set(this.show, i, true)
                    }
                }
            },
            checkAdult(arr) {
                return arr == false
            },
            buy(i) {
                this.MessageBox.prompt("", {
                    message: '购买数量',
                    title: '',
                    showConfirmButton: true,
                    showCancelButton: true,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputPlaceholder: this.pres[i]
                }).then(({ value, action }) => {
                    if (action == 'confirm') {
                        this.$set(this.pres, i, value)
                    }
                }).catch(err => {
                    if (err == 'cancel') {
                        return null
                    }
                });
            },
            readcar() {
                this.axios.get(
                    "http://localhost:5050/product/readcar"
                ).then(res => {
                    this.list = res.data
                    for (var i = 0; i < this.list.length; i++) {
                        var a = i
                        this.pres.push(this.list[i].pres)
                        this.show.push(true)
                    }
                })
            }
        },
        created() {
            this.readcar()
            if (!localStorage.getItem("uid")) {
                this.Toast({
                    message: '请先登录',
                    position: 'middle',
                    duration: 2000
                });
                this.$router.push('login');
            }
        },
        updated() {
            if (this.show.length > 0) {
                if (this.show.every(this.checkAdult)) {
                    this.ismt = false;
                } else {
                    this.ismt = true;
                }
            }
        },
    }
</script>
<style lang="">
    .app-car {
        background: #fefefe;
    }

    .car-top {
        text-align: center;
        background: #ff6243;
    }

    .car-top h3 {
        font-weight: 400;
        font-size: 16px;
        font-family: "Microsoft YaHei";
        color: aliceblue;
    }

    .car-body {
        width: 100%;
        margin-bottom: 100px;
    }

    .car-shop {
        margin-top: 10px;
        width: 100%;
        display: flex;
    }

    .shop-icon {
        width: 10%;
        text-align: center
    }

    .warp {
        width: 100%;
        display: flex;
        box-shadow: 0px 1px 6px #f6ecec;
        height: 120px;
    }

    .shop-icon i {
        font-size: 20px;
        line-height: 120px;
        font-weight: normal;
        color: #b3a7a7;
    }

    .icon-red {
        color: #ff6243 !important;
    }

    .shop-picture {
        width: 40%;
        text-align: center;
        margin-top: 10px;
    }

    .shop-picture img {
        width: 100px;
        height: 100px;
    }

    .shop-information {
        margin-top: 10px;
        width: 60%;
    }

    .shop-information span {
        font-size: 14px;
        font-weight: normal;
        line-height: 30px;
        color: #505050;
    }

    .shop-information p {
        margin-top: 5px;
        font-size: 12px;
        color: #9fa0a0;
        font-weight: "微软雅黑"
    }

    .shop-picture,
    .shop-information {
        background: #ffffff;
    }

    .item-red {
        font-weight: normal;
        font-size: 16px !important;
        line-height: 30px;
        color: #EB6118 !important;
        text-align: left;
        margin-top: 5px;
        font-family: "微软雅黑";
        display: inline-block
    }

    .right-pres {
        margin-top: 10px;
        height: 30px;
        float: right;
    }

    .right-pres>a {
        display: block;
        width: 25px;
        height: 25px;
        text-align: center;
        float: left;
        margin-right: 10px;
        color: #7e7e7e;
        background-color: #eeeeee;
        line-height: 22px;
    }

    .right-pres>a:hover {
        color: red !important;
    }

    .right-pres input {
        display: block;
        float: left;
        width: 20px;
        height: 22px;
        border: 1px solid #E1E1E1;
        text-align: center;
        font-size: small;
        margin-top: 1px;
        margin-right: 10px
    }

    .allele {
        width: 100%;
        height: 2.3rem;
        display: flex;
        background: #fffcfc;
        border: 1px solid #ffffff;
        position: fixed;
        z-index: 900;
        top: 100%;
        left: 0px;
        margin-top: -6rem;
    }

    .all_icon {
        width: 10%;
        text-align: center;
    }

    .all_span {
        width: 15%;
    }

    .all_span span {
        color: #645555;
        font-size: 16px;
        line-height: 2.2rem;
    }

    .all_total {
        width: 40%;
        text-align: center;
    }

    .all_total span {
        font-size: 16px;
        font-family: "微软雅黑";
        font-weight: normal;
        line-height: 2.2rem;
    }

    .all_settlement {
        width: 35%;
    }

    .all_settlement button {
        width: 100%;
        height: 2.2rem;
        background: #fe2818;
        color: #ffffff;
        border: 1px solid #ff3d00;
    }

    .allele i {
        font-size: 20px;
        font-weight: normal;
        color: #b3a7a7;
        line-height: 2.2rem;
    }

    .mint-msgbox {
        width: 65%;
    }
</style>