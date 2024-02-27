<template>
  <v-container class="">
    <v-responsive class="align-center fill-height">
      <v-card class="mx-auto ">
      <!-- prepend-icon="mdi-home" -->
        <template v-slot:title>
          <div class="text-h4 text-teal text-bold mb-6">Project Information</div>
        </template>
        <v-card-text class="d-flex tableBackground" v-for="( userInfo, index ) in projectUsrInfo.userInfoOrder" :key="index">
          <div class="v-row mt-1">
            <p class="v-col-md-4 v-col-xl-3 text-h6">{{ userInfo }}</p>
            <p class="v-col-md-8 v-col-xl-9 text-h6">{{ projectUsrInfo[userInfo] }}</p>
          </div>
          <!-- <q-separator v-if="index < projectUsrInfo.userInfoOrder.length - 1" /> -->
        </v-card-text>
      </v-card>
    </v-responsive>
  </v-container>
</template>
<script setup>
/* eslint-disable */
import { ref } from 'vue';
import { Subject, takeUntil } from 'rxjs';
import { dataService } from '@/service/data_service';
const comSubject$ = new Subject();
const projectUsrInfo = ref({
  'userInfoOrder': ['Project ID', 'Date', 'Institute', 'Customer',/*'Tel',*/'Organism', 'Library Kit', 'Genome', 'miRNA DB'],
  'Organism':'',
  'Project ID':'',
  'Institute':'',
  'Customer':'',
  'Library Kit':'',
  'Genome':'',
  'miRNA DB': '',
  'Date':''
})
const handleProjectInfo = (projectInfo)=>{
  const objInfo = Object.entries(projectInfo);
  for(let i = 0 ; objInfo.length > i ; i++){
    projectUsrInfo.value[objInfo[i][0]] = objInfo[i][1]
  }
}
dataService.Project_info_Subject$.pipe(takeUntil(comSubject$)).subscribe(async(projectInfo)=>{
  await handleProjectInfo(projectInfo);
});
</script>
<style scoped>
  .tableBackground{
    background:#eceff1;
  }
</style>
