<template>
    <div class="app-home">
        <div class="home-lun"  >
            <mt-swipe :auto="3000" class="swipe">
                        <mt-swipe-item v-for="(item,i) in listL" :key="i">
                            <img :src="item" >
                        </mt-swipe-item>
            </mt-swipe>
        </div>
         <div class="home-d">
            <div class="home-div">
                <div class="home-gs" v-for="(key,i) of list" @mouseover="isActive=i" @mouseout="isActive=-1">
                    <a href="#" class="home-gs-a" >
                        <h2>{{key.name}}</h2>
                        <h4>{{key.uname}}</h4>
                        <img :src="key.img">
                    </a>
                    <span  :class="{none:!(isActive==i)}"></span>
                </div>
            </div>
       </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
            list:[
                {name:'VOGA 携手 ICC 足坛五大豪门',
                 uname:'强强联手 共享巅峰时刻',
                 img:'static/zaxiang/img4.png'
                },
                {name:'智能世界从此开启',
                 uname:'青橙VOGA 2 AI激光投影手机盛大发布',
                 img:'static/zaxiang/img1.png'
                },
                {name:'WAIVS全球人工智能视觉高峰论坛 ',
                 uname:'主题演讲精华纪录',
                 img:'static/zaxiang/img3.png'
                },                
                {name:'智能大屏投影 与你同行 ',
                 uname:'更多优惠 尽在青橙手机官方商城',
                 img:'static/zaxiang/img2.png'
                }],
            listL:[],
            isActive:-1,
            }
        },
        methods:{
        },
        created() {
            this.axios.get(
                "http://127.0.0.1:3000/home/swipe"
            ).then(res=>{
                for(var i=0;i<res.data.length;i++){
                    this.listL.push(res.data[i].img_url)
                }    
            })
        },
    }
</script>
<style>
    .app-home{
        overflow: hidden;
        background:#f7f7f7;
        width: 100%;
    }
    .home-lun {
        position: relative;
        z-index: 1;
    }
    .swipe img{
        width: 100%;
        height: 100%;
    }
    .swipe {
        height:225px;
    }
    .home-d {
        padding: 0 20px;
        width: 100%;
        margin: 0 auto;
        margin-bottom: 80px;
        margin-top: 30px;
    }

    .home-d::after {
        content: "";
        display: block;
        clear: both;
    }

    .home-div {
        background-color: #fff;
        max-width: 1400px;
        overflow: hidden;
        border-radius: 5px;
        box-shadow: 0 -1px 8px rgba(0, 0, 0, 0.03), 0 1px 8px rgba(0, 0, 0, 0.03);
        display: flex;
        flex-wrap: wrap;
    }

    .home-gs {
        position: relative;
        border-right: solid 1px #eee;
        display: block;
        width: 50%;
    }

    .home-gs-a {
        padding: 20px 0 0 0;
        color: #434343;
        display: block;
    }

    .home-gs-a>h2 {
        font-size: 13px;
        line-height: 35px;
        text-align: center;
        font-weight: normal;
    }

    .home-gs-a>h4 {
        font-size: 12px;
        line-height: 29px;
        text-align: center;
        font-weight: normal;
    }

    .home-gs-a>img {
        width: 100%;
        margin-top: 20px;
        display: block;
        margin: 0 auto;
    }
    .home-gs>span{
    box-shadow: 0 0 38px rgba(0,0,0,0.08) inset;
    -webkit-transition: all .15s ease;
    transition: all .15s ease;
    top: 0;
    left: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 9;
    overflow: hidden;
    pointer-events: none;
    }
    .none{
        display: none;
    }
</style>