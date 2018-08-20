Vue.component('editable-span',{
    props:['value','disabled'],
    data:function(){
        return{
            editing:false,
        }
    },
    methods:{
        triggerEdit(e){
            this.$emit('edit',e.target.value)
        }
    },
    template:`
    <span>
        <span  v-show="!eidting">{{value}}</span>
        <input v-show="editing"  type="text" v-bind:value='value'  v-on:input='triggerEdit'>
        <button v-on:click="editing=!editing" v-if="!disabled">编辑</button>
    </span>
    `,
    
   
})