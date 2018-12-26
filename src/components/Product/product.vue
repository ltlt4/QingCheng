<template>
    <div class="app-product">
        <div class="warpe">
            <div class="warpe-d">
                <ul style="width:100%">
                    <li v-for="(item,i) of list" :key=i>
                        <div class="li-item">
                            <div class="item-container">
                                <router-link :to="`/shop/${item.kid}`"><img :src="item.img_url" alt=""></router-link>
                            </div>
                            <div class="item-describe">
                                <p><a href="javascript:;" class="item-a">{{item.kname}}</a></p>
                                <span class="item-s">{{item.mininrt}}</span>
                                <a href="javascript:;" class="item-c">
                                    <p>{{item.Price|capitalize}}</p>
                                </a>
                            </div>
                        </div>
                    </li>
                </ul>
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
        background-color: #f4f5f9;
        padding-bottom: 60px;
    }

    .warpe {
        width: 100%;
        margin: 0 auto;
        padding-top: 0px;
    }

    .warpe-d {
        overflow: hidden;
        border-radius: 10px;
        display: flex;
        flex-wrap: wrap;
        box-shadow: 0 -1px 8px rgba(0, 0, 0, 0.03), 0 1px 8px rgba(0, 0, 0, 0.03);
    }

    .warpe-d li {
        border: 1px solid #ddd;
        width: 100%;
    }

    .item-container img {
        width: 180px;
        height: 180px;
    }

    .li-item {
        text-align: center;
        cursor: pointer;
        position: relative;
        background: #fff;
        display: flex;
    }

    .item-container {
        width: 50%;
        padding: 10px 10px
    }

    .item-container>a {
        display: block;
        margin: 10px auto;
        overflow: hidden;
    }

    .item-describe {
        padding-top: 62px;
        width: 50%;
    }

    .item-c {
        font-weight: normal;
        font-size: 20px !important;
        line-height: 30px;
        color: #EB6118 !important;
        width: 180px;
        margin: 0px auto;
        margin-top: 27px;
        text-align: center;
    }

    .item-s {
        font-size: 12px;
        color: #9fa0a0;
        height: 20px;
        line-height: 20px;
        overflow: hidden;
        display: block;
    }

    .item-a {
        font-size: 14px;
        font-weight: normal;
        line-height: 30px;
        color: #505050;
        padding: 10px 10px 0px 10px;
    }

</style>