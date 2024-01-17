<template>
  <div class="">
      <v-navigation-drawer v-model="definedProp.leftDrawer" location="left">
        <v-list>
          <v-list-item to="/" :active="activeItem === 'projectInfo'" @click="activeItem = 'projectInfo'">
            <v-list-item-title v-text="'Project Info'" class="titleStyle"></v-list-item-title>
          </v-list-item>
        </v-list>
        <v-list>
          <v-list-item to="workflowInfo" :active="activeItem === 'workflowInfo'" @click="activeItem = 'workflowInfo'">
            <v-list-item-title v-text="'WorkFlow Info'"  class="titleStyle"></v-list-item-title>
          </v-list-item>
        </v-list>
        <v-list>
          <v-list-subheader class="titleStyle">Quality Control</v-list-subheader>
          <v-list-item v-for="(item, i) in sideBarGroupA" :key="i" :to="item.to"
            @click="activeItem = item.value"  :active="activeItem === item.value" >
              <v-list-item-title v-text="item.title" class="subTitleStyle pl-3">
              </v-list-item-title>
          </v-list-item>
        </v-list>
        <v-list>
          <v-list-subheader class="titleStyle">Analysis</v-list-subheader>
          <v-list-item v-for="(item, i) in sideBarGroupB" :key="i" :to="item.to"
            @click="activeItem = item.value"  :active="activeItem === item.value">
              <v-list-item-title v-text="item.title" class="subTitleStyle pl-3">
              </v-list-item-title>
              
          </v-list-item>
          <v-list-item   class="subTitleStyle">
            <!-- <v-list-item-title v-text="'Download'"  class="subTitleStyle pl-3">
            </v-list-item-title> -->
            <template v-slot:append>
              <v-btn class="text-none mt-3" color="grey-lighten-3" @click="toggleExportRawData"
              variant="flat">
                <v-icon icon="fa:fas fa-file-arrow-down" class=" text-teal mr-1" style="font-size: 24px;"></v-icon>
                None filter raw table
              </v-btn>
            </template>
          </v-list-item>
        </v-list>
        
    </v-navigation-drawer>
  </div>
</template>
<style lang="scss">
  .titleStyle{
    font-size: 18px;
    font-weight: 700;
    color: #00000099;
  }
  .subTitleStyle{
      font-size: 16px;
      color: #546E7A;
    }
</style>
<script setup>
  import { defineProps } from 'vue';
  import { dataService } from '../service/data_service.js';
  const definedProp = defineProps({
    'leftDrawer':{
      type:Boolean,
    }
  });
  import { ref } from 'vue';
  const activeItem = ref('projectInfo');
  const sideBarGroupA = [
  {
    value:"readAlignment",
    title:'Read & Alignment',
    to:'/readAlignment'
  },{
    value:'visualization',
    title:'Visualization',
    to:'/visualization'
  }];
  const sideBarGroupB = [
  {
    value:'differenceExpression',
    title:'Difference Expression',
    to:'differenceExpression'
  }];
  const toggleExportRawData =  ()=>{
    dataService.exportRawTable_different_expression();
  }
  
</script>
