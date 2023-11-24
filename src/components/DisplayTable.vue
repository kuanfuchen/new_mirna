<template>
  <div>
    <v-data-table
      v-model:items-per-page="itemsPerPage"
      :headers="headers"
      :items="tableBody"
      item-value="Sample name"
      class="elevation-1">
    </v-data-table>
  </div>
</template>
<script setup>
  import { ref, onMounted, watch } from 'vue';
  const itemsPerPage = ref(20)
  const definedprops = defineProps (['table']);
  const headers = ref([]);
  const tableBody = ref([]);
  const listenTable = ()=>{
    const tableInfo = definedprops.table;
    if(tableInfo.headers.length === 0) return;
    const bodyInfo = [];
    for(let j = 0 ; tableInfo.body.length > j ; j++){
      bodyInfo[j] = [];
      for(let i = 0 ; tableInfo.headers.length > i ; i++){
      // header
        if(j === 0){
          headers.value.push({
            title: tableInfo.headers[i],
            align:'center',
            sortable:true,
            key:tableInfo.headers[i],
          })
        }
        if(!bodyInfo[j][tableInfo.headers[i]]){
          bodyInfo[j][tableInfo.headers[i]] = tableInfo.body[j][i]
        }
      }
    }
    
    tableBody.value = bodyInfo;
  }
  watch(definedprops.table,(newTble)=>{
    console.log(newTble,'newTble')
    listenTable();
  })
  onMounted(()=>{
    listenTable()
  });

  
</script>