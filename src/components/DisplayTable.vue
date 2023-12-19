<template>
  <div>
    <div class="d-flex justify-end">
      <div class="d-flex align-center" >
        <!-- <div class="download_xlsx" @click="exportFile">
          <v-icon icon="fa:fas fa-file-excel mr-5"></v-icon>
        </div> -->
        <v-icon icon="fa:fas fa-magnifying-glass mr-3"></v-icon>
        <v-text-field
          v-model="search_RNAname"
          label=""
          prepend-inner-icon="mdi-magnify"
          single-line
          variant="outlined"
          hide-details
          density="compact"
          style="width:300px"
        ></v-text-field>
      </div>
    </div>
    <v-data-table
      v-model:items-per-page="itemsPerPage" fixed-header
      :headers="headers" :search="search_RNAname"
      :items="tableBody"
      item-value="Sample name"
      :height="dataTable_height"
      class="elevation-1">
      <template v-slot:item.Ratio="{item}">
        <div>
          <p :style="{ 'color': Number(item.Log2Ratio) >=0 ? '#D32F2F' : '#2962FF' }">{{ item.Ratio }}</p>
        </div>
      </template>
      <template v-slot:item.Log2Ratio="{item}">
        <div>
          <p :style="{ 'color': Number(item.Log2Ratio) >=0 ? '#D32F2F' : '#2962FF' }">{{ item.Log2Ratio }}</p>
        </div>
      </template>
      <!-- <template v-slot:item.Up_Down = "{item}">
        <div>
          <p :style="{ 'color':item.Up_Down === 'UP'? '#2962FF':'#D32F2F' }">{{ item.Up_Down }}</p>
        </div>
      </template> -->
    </v-data-table>
    <!-- density="compact" -->
  </div>
</template>
<script setup>
  import { ref, onMounted, watch } from 'vue';
  const itemsPerPage = ref(25);
  const definedprops = defineProps (['table', 'exportName']);
  import { dataService } from '../service/data_service.js'; 
  const headers = ref([]);
  const tableBody = ref([]);
  const dataTable_height = ref('');
  const search_RNAname = ref('');
  const listenTable = async()=>{
    const tableInfo = definedprops.table;
    if(tableInfo.headers.length === 0) return;
    let bodyInfo = [];
    for(let j = 0 ; tableInfo.body.length > j ; j++){
      bodyInfo[j] = [];
      for(let k = 0 ; tableInfo.headers.length > k ; k++){
      // header
        const headerSplitWord = tableInfo.headers[k].split(/\s/).join('').trim();
        if(j === 0){
          // headers.value.push({
          //   title: tableInfo.headers[k],
          //   align:'center',
          //   sortable:true,
          //   key:tableInfo.headers[k],
          // })
          headers.value.push({
            title: tableInfo.headers[k],
            align: 'center',
            sortable: true,
            key: headerSplitWord
          })
        }
        if(!bodyInfo[j][headerSplitWord]){
          bodyInfo[j][headerSplitWord] = tableInfo.body[j][k];
        }
        // if(!bodyInfo[j][tableInfo.headers[k]]){
        //   bodyInfo[j][tableInfo.headers[k]] = tableInfo.body[j][k];
        // }
      }
    }
    for(let i = 0; headers.value.length > i ; i++){
      if(headers.value[i].key === 'condition'){
        bodyInfo =  bodyInfo.sort((a, b)=>{
          const conditionA = a['condition'].toLowerCase();
          const conditionB = b['condition'].toLowerCase();
          if(conditionA < conditionB){ return -1 }
        });
      }
    }
    for(let i = 0 ; bodyInfo.length > i ; i++){
      const bodyInfoKeys = Object.keys(bodyInfo[i]);
      for( let j = 0 ; bodyInfoKeys.length > j ; j++ ){
        if(bodyInfoKeys[j] !== 'Samplename' && bodyInfoKeys[j] !== 'condition' && bodyInfoKeys[j] !== 'microRNAID' && bodyInfoKeys[j]!== 'Up_Down' && bodyInfoKeys[j] !== 'significant'){
          const [ base, exponent ] = bodyInfo[i][bodyInfoKeys[j]].split('E').map(Number);
          const fixed2Val = (Math.round(Number(base)*1000) / 1000).toLocaleString('en-US');
          if(exponent !== undefined && exponent !== 0){
            bodyInfo[i][bodyInfoKeys[j]] = `${fixed2Val}e${exponent}`;
          }else{
            bodyInfo[i][bodyInfoKeys[j]] = fixed2Val;
          };
        }
      }
    }

    if(bodyInfo.length >= 20){
      const windowInnerheight = window.innerHeight;
      dataTable_height.value =  Math.ceil((windowInnerheight - 330)/ windowInnerheight * 100) + 'vh';
    }
    tableBody.value = bodyInfo;
  };
  // const exportFile = () =>{
  //   const tableInfo = definedprops.table;
  //   console.log(tableInfo, 'tableInfo');
  //   dataService.exportXlsx(definedprops.exportName);
  // } 
  watch(definedprops.table,(/*newTble*/)=>{
    headers.value.length = 0;
    tableBody.value.length = 0;
    listenTable();
  })
  onMounted(()=>{
    listenTable()
  })
</script>
<style lang="scss">
  .v-table .v-data-table__th,  .v-table .v-data-table__td{
    font-weight: 600 !important;
  }
  // .download_xlsx{
  //   cursor: pointer;
  // }
</style>