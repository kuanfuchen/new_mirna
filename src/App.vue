<template>
  <div class="allContainer mx-auto">
    <router-view/>
  </div>
    
  
  <!-- <nav> -->
    <!-- <router-link to="/">Home</router-link> |
    <router-link :to="{name:'about'}">About</router-link> -->
    <!-- <a href="./views/AboutView.vue">home</a> -->
  <!-- </nav> -->
  <!-- <div class="">123456</div> -->
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  
</template>
<script setup>
  //
  import { onMounted } from 'vue';
  import { dataService } from '@/service/data_service.js';
// import data from './service/data_service';
// export default defineComponent({
//   name: 'App'
// })
// import Textraw from './assets/miRNA-seq/Bowtie2/00. QC (Trim adaptor & Trim base)/01. Raw reads/pre_alignment_qaqc.txt?raw';
onMounted(async() => {
  await dataService.handleProject();
  await dataService.handleQCReadAlignmentfolder();
  await dataService.handleRawReadsFolder();
  await dataService.handle_CPM_PCA();
  await dataService.handleDE_Folder();
});
</script>
<style lang="scss">
  .allContainer{
    width:97vw;
  }
</style>
