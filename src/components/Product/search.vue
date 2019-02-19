<template>
    <div class="app-product">
        <div class="warpe">
            <div class="warpe-d" v-show="show">
                <ul style="width:100%">
                    <li v-for="(item,i) of list" :key=i>
                        <div class="li-item">
                            <div class="item-container">
                                <router-link :to="`/shop/${item.kid}`"><img :src="item.img_url" alt=""></router-link>
                            </div>
                            <div class="item-describe">
                                <p><a href="javascript:;" class="item-a" v-html='ruleTitle(i)'></a></p>
                                <span class="item-s">{{item.mininrt}}</span>
                                <a href="javascript:;" class="item-c">
                                    <p>{{item.Price|capitalize}}</p>
                                </a>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div v-show="!show" class="warpe-s">
                <span>抱歉，未搜索到您输入的内容</span>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                list: [],
                show: false,
                information:""
            }
        },
        watch: {
            '$route': 'getParams'
        },
        created() {
            let self = this
            self.getParams()
        },
        methods: {
            getParams() {
                this.information = this.$route.query.site
                this.axios.get(
                    "http://qingcheng123.applinzi.com/search/shop?information=" + this.information
                ).then(res => {
                    if (res.data[0] == 1) {
                        this.show = true
                        this.list = res.data[1]
                    } else if (res.data[0] == 0) {
                        this.show = false
                    }
                })
            },
            ruleTitle(i) {
                var str = this.list[i].kname;
                if(!str){
                    return null
                }
                let reg = new RegExp(this.information, 'ig');
                let replaceString = '<span class="search-text">' + this.information + '</span>';
                str =str.replace(reg, replaceString);
                return str
            }
        },

    }
</script>
<style>
    .app-product {
        width: 100%;
        min-height: 600px;
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

    .warpe-s {
        padding-top: 1.5rem;
        text-align: center
    }

    .warpe-s span {
        color: black;
        font-size: 16px;
        font-family: "微软雅黑"
    }
    .search-text{
        color:red
    }
</style>