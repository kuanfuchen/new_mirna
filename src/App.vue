<template>
  <div class="allContainer mx-auto">
    <router-view/>
  </div>
</template>
<script setup>
  //
  import { onMounted } from 'vue';
  import { dataService } from '@/service/data_service.js';
  import { papaDate } from './service/papaResolve_getData.js';
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
  await papaDate.searchFunction_enrichment_file();
});
</script>
<style lang="scss">
  .allContainer{
    width:97vw;
  }
</style>
