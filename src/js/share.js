Vue.component('share',{
    props:['share-link'],
    template:`
    <div class="share" v-cloak>
        <h2>复制以下链接分享</h2>
        <textarea readonly>{{shareLink}}</textarea>
        <span v-on:click="shareVisible=false">X</span>
    </div>
    `
})