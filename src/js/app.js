var app = new Vue({
    el: '#app',
    data: {
        editingName:false,
        loginVisible:false,
        registerVisible:false,
        shareVisible:false,
        skinVisible:false,
        shareLink:"unknown",
        mode:'edit',//'preview',
        currentUser:{email:undefined,objectId:undefined},
        previewUser:{previewUserId:undefined},
        resume:{
            name:"姓名",
            jobIntention:"求职意向",
            birthday:"年龄",
            gender:"性别",
            email:"邮箱",
            phone:"手机",
            skills:[
                {name:"1",description:"11"},
                {name:"2",description:"22"},
                {name:"3",description:"33"},
                {name:"4",description:"44"},
            ],
            projects:[
                {name:"项目名称",keywords:"关键字",link:"项目链接",description:"项目描述"},
                {name:"项目名称",keywords:"关键字",link:"项目链接",description:"项目描述"},
            ]
        },
        previewResume:{
            name:"姓名",
            jobIntention:"求职意向",
            birthday:"年龄",
            gender:"性别",
            email:"邮箱",
            phone:"手机",
            skills:[
                {name:"1",description:"11"},
                {name:"2",description:"22"},
                {name:"3",description:"33"},
                {name:"4",description:"44"},
            ],
            projects:[
                {name:"项目名称",keywords:"关键字",link:"项目链接",description:"项目描述"},
                {name:"项目名称",keywords:"关键字",link:"项目链接",description:"项目描述"},
            ] 
        },
        login:{
            email:'',
            password:''
        },
        register:{
            email:'',
            password:''
        },
        

    },
    computed:{
        displayResume(){
            return this.mode==="preview" ? this.previewResume : this.resume
        }
    },
    watch:{
        'currentUser.objectId':function(newValue,oldValue){
            if(newValue){
                this.getResume(this.currentUser).then((resume)=>{
                    this.resume=resume
                })
            }
        }
    },
    methods:{
        onlogin(user){
            this.currentUser.objectId=user.objectId
            this.currentUser.email=user.email
            this.loginVisible=false
        },
        onRegister(user){
            this.currentUser.objectId=user.objectId
            this.currentUser.email=user.email
            this.registerVisible=false
        },
        hasShare(){
            if(this.hasLogin()){
                shareVisible=true
            }else{
                alert('请先登录哦')
                this.loginVisible=true
            }
        },
        edit(key,value){
            this.resume[key]=value
        },
        editSkill(index,key,value){
            this.resume.skills[index][key]=value
        },
        editProject(index,key,value){
            this.resume.projects[index][key]=value
        },
        hasLogin(){
            return !!this.currentUser.objectId
            
        },
        
        
        handleSave(){
            var currentUser = AV.User.current();
            if (currentUser) {
                this.saveResume()
            }else {
               this.showLogin()
            }
        },
        showLogin(){
            this.loginVisible=true;
        },
        saveResume(){
           
            let objectId=AV.User.current().toJSON().objectId;
            var user = AV.Object.createWithoutData('User', objectId);
            // 修改属性
            user.set('resume', this.resume);
            // 保存到云端
            user.save().then(()=>{
                alert('保存成功')
            },(error)=>{
                consol.log(error)
                alert('保存失败')
            });
        },
        getResume(user){
            var query = new AV.Query('User');
            return query.get(user.objectId).then( (loginedUser)=> {
                loginedUser=loginedUser.toJSON()
                let resume= loginedUser.resume 
                return resume
                // Object.assign(this.resume,logined.resume)
                // console.log(this.resume)
            }, function (error) {
                // 异常处理
            });

        },
        logout(){
            AV.User.logOut();
            // 现在的 currentUser 是 null 了
            var currentUser = AV.User.current();
            this.currentUser={email:undefined,objectId:undefined}
            alert("退出成功")
        },
        addSkill(){
            this.resume.skills.push({name:"技能名称",description:"技能描述"})
        },
        deleteSkill(index){
            this.resume.skills.splice(index,1)
        },
        addProject(){
            this.resume.projects.push( {name:"项目名称",keywords:"关键字",link:"项目链接",description:"项目描述"})
        },
        deleteProject(index){
            this.resume.projects.splice(index,1)
        },
        print(){
            window.print()
        },
        

    },
   
})


//获取当前用户
let currentUser=AV.User.current()
if (currentUser){
    app.currentUser=currentUser.toJSON() 
    app.shareLink=location.origin+location.pathname+'?user_id='+app.currentUser.objectId
    app.getResume(app.currentUser).then(resume =>{
        app.resume=resume
    })
    console.log(app.currentUser)
}

//获取预览用户Id
let search=location.search
let pattern=/user_id=([^&]+)/
let matches=search.match(pattern)
let userId


if(matches){
    userId=matches[1]
    app.mode="preview"
    app.getResume({objectId:userId}).then(resume=>{
        app.previewResume=resume
    })
    console.log('预览模式')
    console.log(app.mode)
}else{
    console.log('登录模式')
}

