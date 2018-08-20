Vue.component('skin',{
    methods:{
        setTheme(name){
            document.body.className=name
        }
    },
    template:`
        <div  class="skinSelect">
            <button v-on:click="setTheme('default')">默认</button>
            <button v-on:click="setTheme('dark')">暗黑</button>
        </div>
    `
})