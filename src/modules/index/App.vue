<template>
  <div class="app">
    <h2>首页</h2>
    <a href="###">喵喵喵！咪咪咪咪咪咪？~o( =∩ω∩= )m</a>
    <TextElement></TextElement>
  </div>
</template>

<script type="text/ecmascript-6">
    import axios from "axios"
  import TextElement from "./components/text";
    export default {
      data(){
        return {

        }
      },
      methods:{
        request(){
            let t = this;
            axios({
                url: '/mcall/cms/course/getBannerList/',
                method: "POST",
                data: {"isValid":1,"channelId":149},
                transformRequest: [function(data) {
                    return "paramJson=" + JSON.stringify(data);
                }],
                headers: {
                    'X-Requested-With': 'XMLHttpRequest'
                },
                timeout: 30000
            }).then(function(res){

            });
        }
      },
      mounted(){
        let t = this;
        t.request();
      },
      components:{
          TextElement
      }
    };
</script>

<style></style>
