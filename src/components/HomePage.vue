<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Home</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content padding>
      <ion-grid>
  <ion-row>
    <ion-col>
      <div>
        <div id="webrtc" style=""></div>
      </div>
    </ion-col>
  </ion-row>
   <ion-row>
    <ion-col>
      <div>
        <div id="openspace" style="width:100%;height:800px;background-color:gray;position:relative"></div>
      </div>
    </ion-col>
    <ion-col>
       <ion-col>
      <ion-item>
    <ion-label position="floating">workspace :</ion-label>
    <ion-input v-model="workspaceId" v-on:ionInput="workspaceId=$event.target.value" :value="workspaceId" placeholder="Enter workspace id"></ion-input>
</ion-item>
<ion-item>
    <ion-label position="floating">userId :</ion-label>
    <ion-input v-model="userId" v-on:ionInput="userId=$event.target.value" :value="userId" placeholder="Enter user id"></ion-input>
</ion-item>
<ion-item>
    <ion-label position="floating">name :</ion-label>
    <ion-input v-model="userName" v-on:ionInput="userName=$event.target.value" :value="userName" placeholder="Enter user name"></ion-input>
</ion-item>
<ion-item>
    <ion-label position="floating">avator :</ion-label>
    <ion-input v-model="avatar" v-on:ionInput="avatar=$event.target.value" :value="avatar"  placeholder="Enter avatr url"  id="avator"></ion-input>
</ion-item> 
<ion-button color="secondary" @click="setProfile()">setProfile</ion-button>
<ion-button color="secondary" @click="connect()">Connect</ion-button>
<ion-button color="secondary" @click="enterOpenspace()">EnterOpenspace</ion-button>
<ion-button color="secondary" @click="exit()">Exit</ion-button>
<ion-item>
    <ion-label position="floating">user id :</ion-label>
    <ion-input  v-model="userId"  v-on:ionInput="userId=$event.target.value" :value="userId"  placeholder="Enter user id"></ion-input>
</ion-item>
<ion-item>
    <ion-label position="floating">Chat :</ion-label>
    <ion-input v-model="message"  v-on:ionInput="message=$event.target.value" :value="message" placeholder="Enter message"></ion-input>
</ion-item>
<ion-button color="secondary" @click="sendMessage()">Chat</ion-button>
<ion-button color="secondary" @click="micChangeState()">mute/unmute</ion-button>
 <ion-item>
    <ion-checkbox v-model="isChecked"  @ionChange="isChecked = !isChecked"  slot="start" item-left  color="primary"></ion-checkbox>
    <ion-label item-right >megaphone</ion-label>
 </ion-item>
 <ion-button color="secondary" @click="call()">call</ion-button>
 <ion-button color="secondary" @click="pickup()">pickup</ion-button>
 <ion-button color="secondary" @click="hold()">hold</ion-button>
 <ion-button color="secondary" @click="hungup()">hungup</ion-button>
<br>
 <ion-button color="secondary" @click="dump()">dump</ion-button>
<br>
    </ion-col>
    </ion-col>
  </ion-row>
</ion-grid>
    </ion-content>
  </ion-page>
</template>

<script>
import { add } from "ionicons/icons";
import { addIcons } from "ionicons";
addIcons({
  "ios-add": add.ios,
  "md-add": add.md
});
export default {
  name: "HomePage",
  props: {
    msg: String
  },
  data(){
     return {
       workspaceId:"",
       userName:"",
       userId:"",
       avatar:"https://www.google.com/logos/doodles/2020/thank-you-packaging-shipping-and-delivery-workers-6753651837108760-s.png",
       message:"",
       calltoken:{},
       isChecked:false
     }
  },
  mounted(){
    ovice.init();
    ovice.onCall.subscribe(caller => {
    if (caller.status == 'offline') {
      caller_ = null
      return
    }
    console.log('onCall')
    this.calltoken = caller.userId
})


  },methods:{
    connect() {
        ovice.connect({
        workspaceId:this.workspaceId, 
        userId:this.userId, 
        online:{url:'http://www.google.com', method:'get', data:null},
        offline:{url:'http://www.google.com', method:'get', data:null}})

    },
    setProfile(){
      console.log(this.avatar)
      ovice.setProfile({name:this.userName,"avator":this.avatar, x:200, y:200})
    },
    enterOpenspace(){
      ovice.enter()
    },exit(){
      ovice.exit()
    },sendMessage(){
      ovice.chat(this.message)
    },call(){
      ovice.call({workspaceId:this.workspaceId.value,name:this.userName})
    },pickup(){
      ovice.pickUpCall(this.calltoken)
    },hold(){
      ovice.holdCall()
    },hungup(){
      ovice.hungUpCall(this.calltoken)
    },dump(){
      ovice.webrtc.dump()
    },
    micChangeState(){
      ovice.setMic(!ovice.mic())
    }
  },
  watch: {
    isChecked: function (val) {
     ovice.setMegaphone(val ? 1 : 0)
    },
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>