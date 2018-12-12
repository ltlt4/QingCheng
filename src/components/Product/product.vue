<template>
    <div class="app-product">
        <div class="warpe">
            <div class="warpe-d">
                <div>
                    <ul>
                        <li v-for="(item,i) of list" :key=i>
                            <div class="li-item">
                                <div class="item-container">
                                    <router-link :to="`/shop/${item.kid}`"><img :src="item.img_url" alt=""></router-link>
                                    <span><a href="" class="item-a">{{item.kname}}</a></span>
                                    <span class="item-s">{{item.mininrt}}</span>
                                    <a href="" class="item-red"><span>￥{{item.Price}}</span></a>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                list: []
            }
        },
        created() {
            this.axios.get(
                "http://127.0.0.1:3000/product/list"
            ).then(res => {
                this.list = res.data
            })
        },
    }
</script>
<style>
    .app-product {
        width: 100%;
        min-width: 1280px;
        padding-top: 140px;
        background-color: #f4f5f9;
        padding-bottom: 20px;
    }

    .warpe {
        width: 1190px;
        margin: 0 auto;
        padding-top: 0px;
    }

    .warpe-d {
        overflow: hidden;
        border-radius: 10px;
        box-shadow: 0 -1px 8px rgba(0, 0, 0, 0.03), 0 1px 8px rgba(0, 0, 0, 0.03);
    }

    .warpe-d:after {
        content: "";
        display: block;
        clear: both;
    }

    .warpe-d:before {
        content: "";
        display: table;
    }

    .warpe-d li {
        border: 1px solid #ddd;
        width: 33.3333333333333%;
        float: left;
    }

    .li-item {
        text-align: center;
        cursor: pointer;
        position: relative;
        background: #fff;
    }

    .item-container {
        border: 2px solid #fff;
        padding: 20px 10px;
    }

    .item-container>a {
        display: block;
        margin: 10px auto;
        width: 80%;
        overflow: hidden;
    }

    .item-container img {
        width: 210px;
        height: 210px;
    }

    .item-a {
        font-size: 16px;
        font-weight: normal;
        line-height: 30px;
        color: #505050;
        padding: 10px 10px 0px 10px;
    }

    .item-a:hover {
        color: #f36d6d
    }

    .item-s {
        font-size: 12px;
        color: #9fa0a0;
        height: 20px;
        line-height: 20px;
        overflow: hidden;
        display: block;
    }

    .item-red {
        font-weight: normal;
        font-size: 24px !important;
        line-height: 30px;
        color: #EB6118 !important;
        width: 180px;
        margin: 0px auto;
        margin-top: 27px;
        text-align: center;
    }
</style>