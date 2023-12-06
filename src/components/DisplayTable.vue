<template>
  <div>
    <v-data-table
      v-model:items-per-page="itemsPerPage" fixed-header
      :headers="headers"
      :items="tableBody"
      item-value="Sample name"
      :height="dataTable_height"
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
  const dataTable_height = ref('')
  const listenTable = async()=>{
    const tableInfo = definedprops.table;
    if(tableInfo.headers.length === 0) return;
    let bodyInfo = [];
    for(let j = 0 ; tableInfo.body.length > j ; j++){
      bodyInfo[j] = [];
      for(let k = 0 ; tableInfo.headers.length > k ; k++){
      // header
        if(j === 0){
          headers.value.push({
            title: tableInfo.headers[k],
            align:'center',
            sortable:true,
            key:tableInfo.headers[k],
          })
        }
        if(!bodyInfo[j][tableInfo.headers[k]]){
          bodyInfo[j][tableInfo.headers[k]] = tableInfo.body[j][k];
        }
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
    // const scientificNotation = "1.4714286285600474E-9";
    // const numericValue = parseFloat(scientificNotation);
    for(let i = 0 ; bodyInfo.length > i ; i++){
      const bodyInfoKeys = Object.keys(bodyInfo[i]);
      for( let j = 0 ; bodyInfoKeys.length > j ; j++ ){
        if(bodyInfoKeys[j] !== 'Sample name' && bodyInfoKeys[j] !== 'condition' && bodyInfoKeys[j] !== 'microRNA ID'){
          // const newVal = Number(bodyInfo[i][bodyInfoKeys[j]]);
          // bodyInfo[i][bodyInfoKeys[j]]= newVal.toExponential();
          // bodyInfo[i][bodyInfoKeys[j]] = Number(bodyInfo[i][bodyInfoKeys[j]]);
          // bodyInfo[i][bodyInfoKeys[j]] = parseFloat(bodyInfo[i][bodyInfoKeys[j]]);
          // const changeNumberType = bodyInfo[i][bodyInfoKeys[j]
          const [ base, exponent ] = bodyInfo[i][bodyInfoKeys[j]].split('E').map(Number);
          const fixed2Val = (Math.round(Number(base)*100) / 100).toLocaleString('en-US');
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
  }
  watch(definedprops.table,(/*newTble*/)=>{
    headers.value.length = 0;
    tableBody.value.length = 0;
    listenTable();
  })
  onMounted(()=>{
    listenTable()
  });

  
</script>