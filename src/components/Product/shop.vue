<template>
    <div class="app-shop">
        <div class="modal-bg" v-if="modal"></div>
        <div class="modal-bg-data" :class="{'animated fadeInUp':modal,'animated fadeOutDown':his}" v-if="modal" v style="animation-duration: 300ms">
            <div class="right-sales">
                <i class="iconfont x" @click="hidden()">&#xe67a;</i>
                <div class="right-color">
                    <span>选择颜色</span>
                    <ul>
                        <li v-for="(key,i) of color" :class="{'right-border-li':i==showColor}" @click="selectColor(i)">
                            <a href="javascript:void(0)">
                                <div class="chamber" :style="{background:colorClass[i]}"></div>
                                <span>{{key}}</span>
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="right-Memory">
                    <span>选择系统</span>
                    <ul>
                        <li class="right-border-li">
                            <a href="javascript:void(0)">
                                <span>{{list.Memory}}</span>
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="right-Memory">
                    <span>选择套餐</span>
                    <ul>
                        <li class="right-border-li">
                            <a href="javascript:void(0)">
                                <span>{{list.SetMeal}}</span>
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="prodetail_top_right_line"></div>
                <div class="right-number">
                    <div class="number-div"><span>购买数量:</span></div>
                    <a href="javascript:;" @click="total">-</a>
                    <input type="text" v-model="pres">
                    <a href="javascript:;" @click="_total">+</a>
                </div>
                <div class="prodetail_top_right_line"></div>
                <div class="right-total">
                    <span>总价: <span class="total-span">￥{{totalPrice}}.00</span></span>
                    <button class="intbot" type="button" style="width:40%;border-radius:30px;" @click="skip">确定</button>
                </div>
            </div>
        </div>
        <div class="waper">
            <div class="tail-top">
                <div class="prodetail_con">
                    <div class="shop-left">
                        <div class="left-content">
                            <div class="left_content-top">
                                <div>
                                    <mt-swipe :auto="0" class="swipetwo" :continuous="false" :showIndicators="false">
                                        <mt-swipe-item v-for="(item,i) of list_url" :key="i">
                                            <img :src="item">
                                        </mt-swipe-item>
                                    </mt-swipe>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="shop-right">
                        <div class="right-content">
                            <div class="right-name"><span>{{list.kname}}</span></div>
                            <div class="right_proDescription"><span>{{list.inrt}}</span></div>
                            <ul class="pro_sepcdesc">
                                <li><span v-for="(inrt,i) of inrtmin">{{inrt}}</span></li>
                            </ul>
                            <div>
                                <span class="right-price">￥{{list.Price}}.00</span>
                                <span class="praise">总销售:<span>{{list.sales}}</span></span>
                                <span class="praise">好评:<span>{{list.Praise}}</span></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="prodetail_foot">
                <div class="content">
                    <div style="position: static; z-index: 100; background-color: rgb(255, 255, 255); width: auto;">
                        <ul class="myTab">
                            <li :class="{'li-but':useat}" @click="useat=true">产品详情</li>
                            <li :class="{'li-but':!useat}" @click="useat=false">规格参数</li>
                        </ul>
                    </div>
                    <div class="foot-content" v-show="useat">
                        <img :src="item" alt="" v-for="item of csimg">
                    </div>
                    <div class="foot-content1" v-show="!useat">
                        <div>
                            <p class="foot-pwors">主体</p>
                            <div>
                                <p v-for="item of csksubject" class="foot-pwors">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp{{item}}</p>
                            </div>
                        </div>
                        <div>
                            <p class="foot-pwors">网络</p>
                            <div>
                                <p v-for="item of csnetwork" class="foot-pwors">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp{{item}}</p>
                            </div>
                        </div>
                        <div>
                            <p class="foot-pwors">3G网络</p>
                            <div>
                                <p v-for="item of cs3Gnetword" class="foot-pwors">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp{{item}}</p>
                            </div>
                        </div>
                        <div>
                            <p class="foot-pwors">2G网络</p>
                            <div>
                                <p v-for="item of cs2Gnetword" class="foot-pwors">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp{{item}}</p>
                            </div>
                        </div>
                        <div>
                            <p class="foot-pwors">功能</p>
                            <div>
                                <p v-for="item of csufunction" class="foot-pwors">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp{{item}}</p>
                            </div>
                        </div>
                        <div>
                            <p class="foot-pwors">其他</p>
                            <div>
                                <p v-for="item of csother" class="foot-pwors">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp{{item}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="foot_tab">
                <div class="wipe">
                    <router-link to="/">
                        <div class="tab_icon"><i class="iconfont">&#xe64f;</i></div>
                        <div><span>主页</span></div>
                    </router-link>
                </div>
                <div class="wipe">
                    <router-link to="/car">
                        <div class="tab_icon"><i class="iconfont">&#xe63f;</i></div>
                        <div><span>购物车</span></div>
                    </router-link>
                </div>
                <div class="shop_but">
                    <a class="btn-warning btn-left" >立即购买</a>
                    <a class="btn-warning btn-right" @click="shopcar">加入购物车</a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { Toast } from 'mint-ui';
    export default {
        data() {
            return {
                pid: "",
                useat: true,
                showColor: -1,
                imgShow: "",
                pres: 1,
                list: [],
                list_url: [],
                list_urlmax: [],
                inrtmin: [],
                move: 0,
                moveace: 0,
                colorAtive: "",
                color: [],
                colorClass: [],
                canshu: [],
                csimg: [],
                csksubject: [],
                csnetwork: [],
                cs3Gnetword: [],
                cs2Gnetword: [],
                csufunction: [],
                csother: [],
                modal: false,
                his: false
            }
        },
        computed: {
            thumb: function () {
                return this.list_url.length * 95
            },
            totalPrice: function () {
                return this.pres * this.list.Price
            }
        },
        created() {
            var pid = this.$route.params.pid;
            this.pid = this.$route.params.pid
            this.axios.get(
                `http://127.0.0.1:3000/product/shop?pid=${pid}`
            ).then(res => {
                this.list = res.data[0]
                this.list_url = this.list.img_url.split(",")
                this.list_urlmax = this.list.img_urlmax.split(",")
                this.imgShow = this.list_urlmax[0]
                this.inrtmin = this.list.inrtmin.split(" ")
                this.color = this.list.color.split(",")
                this.colorClass = this.list.colorCode.split(",")
                if (this.colorClass.length == 1) {
                    this.showColor = 0
                    this.colorAtive = this.color[0]
                } else if (this.colorClass.length >= 2) {
                    this.showColor = 0
                    this.colorAtive = this.color[0]
                }
            });
            this.axios.get(
                `http://127.0.0.1:3000/product/shopch?pid=${pid}`
            ).then(res => {
                this.canshu = res.data[0]
                let h = this.canshu
                this.csimg = h.img_url.split(",")
                this.csksubject = h.ksubject.split(",")
                this.csnetwork = h.network.split(",")
                this.cs3Gnetword = h.u3Gnetword.split(",")
                this.cs2Gnetword = h.u2Gnetword.split(",")
                this.csufunction = h.ufunction.split(",")
                this.csother = h.other.split(",")
            })
        },
        methods: {
            selectColor(i) {
                this.showColor = i
                this.colorAtive = this.color[i]
                this.imgShow = this.list_urlmax[i]
            },
            total() {
                if (this.pres <= 1) {
                    this.pres = 1
                    Toast({
                        message: '最少购买一件哦',
                        position: 'bottom',
                        duration: 2000
                    });
                } else {
                    this.pres -= 1
                }
            },
            _total() {
                this.pres = this.pres + 1
            },
            skip() {
                let postData = this.qs.stringify({
                    pid: this.pid,
                    color: this.colorAtive,
                    memory: this.list.Memory,
                    setMeal: this.list.SetMeal,
                    pres: this.pres,
                    price: this.list.Price,
                    kname: this.list.kname,
                    img: this.imgShow
                })
                this.axios({
                    method: "post",
                    url: "http://127.0.0.1:3000/product/shopcar",
                    data: postData
                }).then(res => {
                    if (res.data == 1) {
                        Toast({
                            message: '加入成功',
                            position: 'middle',
                            duration: 2000
                        });
                        this.hidden()
                    } else if (res.data == 0) {
                        Toast({
                            message: '加入失败，请重试',
                            position: 'middle',
                            duration: 2000
                        });
                    }
                })


            },
            hidden() {
                this.his = true
                var self = this
                setTimeout(function () { self.modal = false, self.his = false }, 200);
            },
            shopcar() {
                if (!this.$store.state.islogin) {
                    this.modal = false
                    Toast({
                        message: '请先登录',
                        position: 'middle',
                        duration: 2000
                    });
                } else if (this.$store.state.islogin) {
                    this.modal = true
                }
            },
        }
    }
</script>
<style>
    .app-shop {
        width: 100%;
        margin-bottom: 30px;
    }

    .tail-top {
        background-color: #fff;
        padding: 20px 0px;
        width: 100%;
    }

    .prodetail_con {
        display: flex;
        flex-wrap: wrap;
    }

    .x {
        font-size: 18px;
        color: #5d5858;
        float: right;
        margin-right: 10px;
    }

    .shop-left {
        width: 100%;
    }

    .left-content {
        text-align: center
    }


    .left_content-top {
        margin: 10px auto 20px;
        position: relative;
    }


    .left_content-top a {
        display: block;
        margin: 0px auto;
        position: relative;
    }


    .shop-right {
        width: 100%;
        position: relative;
    }

    .right-content {
        padding-left: 20px;
        color: #7e7e7e;
    }

    .right-name span {
        display: block;
        line-height: 40px;
        font-size: 20px;
        font-weight: bold;
        color: #323232;
    }

    .right_proDescription span {
        line-height: 20px;
        font-size: 11px;
        margin: 0 10px 0 0px;
        color: #7e7e7e;
        font-weight: normal
    }

    .pro_sepcdesc {
        list-style-position: inside;
        font-size: 11px;
        line-height: 20px;
        margin-top: 5px;
    }

    .pro_sepcdesc span {
        padding-right: 5px;
    }

    .prodetail_top_right_line {
        height: 1px;
        border-bottom: 1px solid #EEEEEE;
        /* margin-right: 10px; */
        padding-top: 10px;
        width: 100%;
    }

    .right-price {
        padding-top: 5px;
        padding-bottom: 5px;
    }

    .right-price {
        height: 50px;
        line-height: 40px;
        font-size: 20px;
        color: #eb6118;
        font-weight: bold;
    }

    .shop_but {
        width: 60% !important;
        height: 60px;
        display: flex;
        margin: 0 auto
    }

    .wipe {
        width: 20% !important;
    }

    .right-sales {
        position: relative;
        height: 18px;
        padding-bottom: 20px;
        font-size: 11px;
        margin-top: 10px;
    }

    .right-sales>div {
        margin-left: 10px;
    }

    .shop-right span>span {
        font-size: 16px;
        color: #eb6118;
        font-weight: bold;
        margin-left: 2px;
    }

    .praise {
        margin-left: 50px
    }

    .right-color,
    .right-Memory {
        padding-top: 10px;
        width: 350px;
    }

    .right-color>span,
    .right-Memory>span {
        display: block;
        color: #7E7E7E;
        margin-bottom: 10px;
        font-size: 12px;
    }

    .right-border-li {
        position: relative;
        border: 1px solid #ed6c00 !important;
        transition: border 0.4s ease-in-out;
        border-radius: 4px;
    }

    .right-color li,
    .right-Memory li {
        display: inline-block;
        width: 142px;
        height: 46px;
        text-align: center;
        margin-right: 10px;
        background-image: none;
        border: 1px solid #EEEEEE;
        line-height: 42px;
    }


    .right-color li a,
    .right-Memory li a {
        display: block;
        width: 134px;
        height: 34px;
        font-size: 12px;
    }

    .right-color li span {
        color: #7E7E7E;
        font-size: 14px;
        line-height: 44px;
        display: block;
        padding-bottom: 10px;
        float: left;
        margin-left: 20px;
    }

    .right-Memory li span {
        color: #7E7E7E;
        font-size: 14px;
        line-height: 44px;
        display: block;
        padding-bottom: 10px;
    }

    .chamber {
        width: 30px;
        height: 30px;
        margin-top: 8px;
        float: left;
        margin-left: 20px;
        border-radius: 4px;
    }

    .right-number {
        margin-top: 15px;
        height: 30px;
    }

    .right-number>a {
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

    .right-number>a:hover {
        color: red !important;
    }

    .right-number input {
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

    .number-div {
        float: left;
        line-height: 22px;
        margin-right: 10px;
    }

    .right-total {
        margin-top: 10px;
    }

    .right-total>span {
        font-size: 20px;
        font-weight: normal;
        color: #000
    }

    .total-span {
        color: #eb6118;
        font-size: 20px;
    }

    .right-shopcar>a {
        display: block;
        color: #fff;
        background: #eb6118;
        width: 150px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        font-size: 22px;
        margin-top: 20px;
        font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    }

    .prodetail_foot {
        margin-top: 10px
    }

    .myTab {
        border-bottom: 1px solid #E1E1E1;
        height: 40px;
    }

    .myTab>li {
        display: block;
        float: left;
        height: 40px;
        line-height: 40px;
        font-size: 14px/40px;
        text-align: left;
        color: #7E7E7E;
        position: relative;
        width: 150px;
        cursor: pointer;
        transition: border 0.5s ease-in-out;
    }

    .li-but {
        border-bottom: #eb6118 2px solid;
    }

    .foot-content {
        position: relative;
        padding-top: 50px;
        text-align: center
    }

    .foot-content img {
        width: 100%;
        height: 100%;
    }

    .foot-content1 {
        position: relative;
        padding-top: 50px;
    }

    .foot-pwors {
        font-size: 14px;
        font-weight: 400;
        color: #7E7E7E;
        margin-bottom: 10px;
        font-family: "FZYouHJW", "PingFang SC", "Helvetica Neue", Helvetica, Arial, "Hiragino Sans GB", "Microsoft Yahei", "微软雅黑", "STHeiti", "华文细黑", sans-serif !important;
    }

    .foot-content1>div {
        margin-bottom: 30px;
    }

    .modal-bg {
        display: block;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        text-align: center;
        z-index: 990;
        background: #333;
        opacity: 0.7;
    }

    .modal-bg-data {
        width: 100%;
        height: 398px;
        background: #ffffff;
        position: fixed;
        top: 100%;
        margin-top: -398px;
        z-index: 1000;
        border-radius: 5px;
    }

    .modal-bg-data p {
        font-size: 25px;
        font-weight: normal;
        color: #333;
        display: block;
        margin-top: 40px;
    }

    .modal-bg-data button {
        background-color: #ed623b;
        font-size: 18px;
        color: #ffffff;
        height: 33px;
        border: none;
        cursor: pointer;
        padding-left: 0;
        margin-left: 60px;
    }

    .swipetwo {
        height: 275px;
    }

    .left_content-top img {
        width: 275px;
        height: 275px;
    }
</style>