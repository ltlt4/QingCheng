<template>
    <div class="app-shop">
        <div class="waper">
            <div class="tail-top">
                <div class="prodetail_con">
                    <div class="shop-left">
                        <div class="left-content">
                            <div class="left_content-top">
                                <div style="top: 0px;z-index:900;position: relative;">
                                    <a href="javascript:void(0)">
                                        <img :src="imgShow" alt="">
                                    </a>
                                </div>
                            </div>
                            <div class="left_content-foot" @mouseover="ops" @mouseout="opts">
                                <div class="left_content-foot-left"><a href="javascript:void(0)"><img src="../../../static/zaxiang/sprite.png"
                                            alt="" :class="{'foot-img':astive}" @click="movement(1)"></a></div>
                                <div class="img-ul">
                                    <ul :style="{width:thumb+'px',left:move+'px'}">
                                        <li class="img-li" v-for="(item,i) of list_url" @click="switchImg(i)"><a href="javascript:void(0)"><img
                                                    :src="item" alt=""></a></li>
                                    </ul>
                                </div>
                                <div class="left_content-foot-right"><a href="javascript:void(0)"><img src="../../../static/zaxiang/sprite1.png"
                                            alt="" :class="{'foot-img':astive}" @click="movement(-1)"></a></div>
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
                            <div class="prodetail_top_right_line"></div>
                            <div class="right-price"><span>￥{{list.Price}}</span></div>
                            <div class="right-sales">
                                <span>总销售:<span>{{list.sales}}</span></span>
                                <span class="praise">好评:<span>{{list.Praise}}</span></span>
                                <div class="prodetail_top_right_line"></div>
                                <div class="right-color">
                                    <span>选择颜色</span>
                                    <ul>
                                        <li v-for="(key,i) of color" :class="{'right-border-li':i==showColor}">
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
                            </div>
                        </div>
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
                astive: false,
                showColor:-1,
                imgShow: "",
                list: [],
                list_url: [],
                list_urlmax: [],
                inrtmin: [],
                thumbNail: 0,
                move: 0,
                moveace: 0,
                color: [],
                colorClass: []
            }
        },
        computed: {
            thumb: function () {
                return this.list_url.length * 95
            }
        },
        created() {
            var pid = this.$route.params.pid;
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
                console.log(this.colorClass.length)
                
                if(this.colorClass.length==1){
                this.showColor=0
                }else if(this.colorClass.length>=2){
                    this.showColor=0
                }
            });
        },
        methods: {
            ops() {
                this.astive = true
            },
            opts() {
                this.astive = false
            },
            movement(num) {
                if (num == 1) {
                    if (this.moveace == 0) {
                        return
                    } else {
                        this.moveace--
                        this.move += 93
                    }
                }
                if (num == -1) {
                    if (this.list_url.length - 5 == this.moveace) {
                        return
                    } else {
                        this.moveace++
                        this.move += -93
                    }
                }
            },
            switchImg(i) {
                this.imgShow = this.list_url[i]
            }
        }
    }
</script>
<style>
    .app-shop {
        width: 100%;
        min-width: 1280px;
        margin-bottom: 30px;
        padding-top: 90px;
    }

    .waper::before {
        content: "";
        display: table;
    }

    .waper:after {
        content: "";
        display: block;
        clear: both;
    }

    .tail-top {
        background-color: #fff;
        padding: 20px 0px;
        float: left;
        display: block;
        width: 100%;
    }

    .prodetail_con {
        background: url("./../../../static/zaxiang/detailbg.jpg") repeat;
        position: relative;
        background-position-x: -900px;
    }

    .prodetail_con:before {
        content: "";
        display: table;
    }

    .prodetail_con:after {
        content: "";
        display: block;
        clear: both;
    }

    .shop-left {
        float: left;
        width: 100%;
        min-height: 600px;
    }

    .left-content {
        margin-right: 600px;
        text-align: center
    }

    .left_content-top {
        width: 500px;
        height: 410px;
        margin: 10px auto 20px;
    }

    .left_content-top a {
        width: 400px;
        height: 400px;
        display: block;
        margin: 0px auto;
        position: relative;
    }

    .left_content-foot {
        width: 540px;
        margin: 0px auto;
        height: 83px;
    }

    .left_content-foot ul {
        display: block;
        float: left;
        position: relative;
        transition: all 0.5s ease-in-out;
    }

    .left_content-foot-left {
        float: left;
        margin-top: 10px;
        text-align: center;
    }

    .left_content-foot-right {
        float: left;
        margin-top: 10px;
        margin-left: 10px;
        text-align: center;
    }

    .left_content-foot-left a {
        float: left;
        background-position: -140px 0px;
        cursor: pointer;
        width: 30px;
        height: 40px;
    }

    .left_content-foot-right a {
        cursor: pointer;
        float: right;
        background-position: -140px 0px;
        cursor: pointer;
        width: 30px;
        height: 40px;
    }

    .left_content-foot-right img {
        height: 63px;
        opacity: 0;
        transition: opacity 1s ease-in-out;
        width: 28.5px;
    }

    .left_content-foot-left img {
        height: 63px;
        opacity: 0;
        transition: opacity 1s ease-in-out;
        width: 28.5px;
    }

    .foot-img {
        opacity: 0.5 !important;
    }

    .img-li {
        background-image: none;
        overflow: hidden;
        float: left;
        width: 83px;
        height: 83px;
        margin-left: 10px;
        text-align: center;
    }

    .img-li a {
        max-width: 100%;
        display: block;
        height: 60px;
        margin-top: 10px;
    }

    .img-li img {
        max-height: 100%;
        opacity: 0.7;
        height: 60px;
        vertical-align: middle;
        transition: opacity 0.5s ease;
    }

    .img-li img:hover {
        opacity: 1.0;
    }

    .img-ul {
        visibility: visible;
        overflow: hidden;
        position: relative;
        float: left;
        z-index: 2;
        width: 465px;
        left: 0;
    }

    .shop-right {
        float: right;
        width: 507px;
        margin-left: -507px;
        position: relative;
    }

    .right-content {
        padding-left: 40px;
        font-size: 12px;
        color: #7e7e7e;
    }

    .right-name span {
        display: block;
        line-height: 40px;
        font-size: 24px;
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
        margin-top: 10px;
        margin-bottom: 0px;
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
        padding-top: 10px;
        padding-bottom: 10px;
    }

    .right-price {
        height: 50px;
        line-height: 40px;
        font-size: 28px;
        color: #eb6118;
        font-weight: bold;
    }

    .right-sales {
        position: relative;
        height: 18px;
        border-top: 1px solid #eeeeee;
        padding-top: 10px;
        padding-bottom: 20px;
        font-size: 11px;
        margin-top: 10px;
    }

    .right-sales>span>span {
        font-size: 12px;
        color: #eb6118;
        font-weight: bold;
        margin-left: 2px;
    }

    .praise {
        margin-left: 60px
    }

    .right-color,.right-Memory{
        padding-top: 10px;
        width: 350px;
    }

    .right-color>span,.right-Memory>span {
        display: block;
        color: #7E7E7E;
        margin-bottom: 10px;
        font-size: 12px;
    }

    .right-border-li {
        position: relative;
        border: 1px solid #ed6c00 !important;
        transition: border 0.4s ease-in-out;
    }
    .right-color li,.right-Memory li {
        display: inline-block;
        width: 142px;
        height: 46px;
        text-align: center;
        margin-right: 10px;
        background-image: none;
        border: 1px solid #EEEEEE;
        line-height: 42px;
    }


    .right-color li a,.right-Memory li a {
        display: block;
        width: 134px;
        height: 34px;
        font-size: 12px;
    }

    .right-color li span{
        color: #7E7E7E;
        font-size: 14px;
        line-height: 44px;
        display: block;
        padding-bottom: 10px;
        float: left;
        margin-left: 20px;
    }
    .right-Memory li span{
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
</style>