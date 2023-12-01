<template>
  <div>
    <v-card class="px-3 mt-3" width="100%" >
      <!--  -->
      <template v-slot:title>
        <p class="text-teal">Analysis</p> 
      </template>
      <v-card-text>
        <v-row no-gutters>
          <v-col cols="2">
            <v-sheet class="pa-2 ma-2">
              <p class="font-weight-bold ml-2">Compare</p>
            </v-sheet>
          </v-col>
          <v-col cols="4">
            <v-sheet>
              <v-select label="Select compare" :items="compare_de_title_group" v-model="compare_de_title" @update:modelValue="changed_miRNA_DataInfo"
                variant="outlined" density="compact"></v-select>
            </v-sheet>
          </v-col>
        </v-row>
      <!--  -->
        <v-row>
          <v-col cols="2">
            <v-sheet class="pa-2 ma-2"> 
              <p class="font-weight-bold ml-2">Select Style</p>
            </v-sheet>
          </v-col>
          <v-col cols="2">
            <v-sheet>
              <v-select density="compact" label="Select P-value or Q-value" :items="select_P_val_or_Q_value" v-model="select_P_Q_Style"
                variant="outlined" >
              </v-select>
            </v-sheet>
          </v-col>
          <v-col cols="2">
            <v-sheet>
              <v-text-field density="compact" label="Number(0 ~ 1)" variant="outlined" v-model="select_value_Number"></v-text-field>
            </v-sheet>
          </v-col>
        </v-row>
      <!--  -->
        <v-row>
          <v-col cols="4">
            <v-sheet class="pa-2 ma-2">
              <p class="font-weight-bold ml-2">
                log2FC Lower bound(-10~0) / Upper bound(0~10):
              </p>
            </v-sheet>
          </v-col>
          <v-col cols="2">
            <v-text-field label="Number(-10 ~ 0)" variant="outlined" v-model="log2_LowerBound" density="compact"
            @update:modelValue="changed_miRNA_DataInfo"></v-text-field>
          </v-col>
          <v-col cols="2">
            <v-text-field label="Number(0 ~ 10)" variant="outlined" v-model="log2_UpperBound" density="compact" 
            @update:modelValue="changed_miRNA_DataInfo"></v-text-field>
          </v-col>
        </v-row>
        <hr>
      </v-card-text>
      <v-card-text>
        <p class="text-h6 ml-3 text-teal">Volcano Plot</p>
        <Volcano :change_volcano_plot="compare_de_Obj"></Volcano>
        <div class="" v-if="handleDataIF">
          <DisplayTable :table="tableComponentInfo"></DisplayTable>
        </div>
        <!-- <v-img width="100%" aspect-ratio="16/9" cover
          src="../assets/miRNA-seq/Bowtie2/03. DE miRNAs/Volcano plot - EV CL1-5 vs EV CL1-0 - EV CL1-5 vs EV CL1-0.png"
        ></v-img> -->
      </v-card-text>
    </v-card>
  </div>
</template>
<script setup>
  import { ref } from 'vue';
  import {dataService} from '../service/data_service.js';
  import { takeUntil, debounceTime,Subject } from 'rxjs';
  import DisplayTable from '../components/DisplayTable.vue';
  import Volcano from '../components/poltly/Volcano_plot.vue';
  const comSubject$ = new Subject();
  const compare_de_title_group = ref([]);
  const compare_de_title = ref('');
  const select_P_val_or_Q_value = ref(['P-value', 'Q-value']);
  const select_P_Q_Style = ref('P-value');
  const select_value_Number = ref(0);
  const log2_LowerBound = ref(-1);
  const log2_UpperBound = ref(1);
  const handleDataIF = ref(false);
  const tableComponentInfo = ref({
    headers:[],
    body:[]
  });
  const compare_de_Obj = ref({
    title:'',
  });
  // const volcano_plot_title = ref('')
  let compare_de_tables_info = [];
  dataService.DE_Folder_Info$.pipe(takeUntil(comSubject$), debounceTime(300)).subscribe((deFolderData)=>{
    sort_deFolderData(deFolderData);
  });
  const sort_deFolderData = async(de_data)=>{
    if(Object.keys(de_data).length === 0)return;
    if(de_data.title_Group.length === 0){
      console.log("don't deData");
      return
    };
    compare_de_title_group.value = await de_data.title_Group;
    compare_de_title.value = await de_data.title_Group[0];
    compare_de_tables_info = await de_data.info;
    await handle_table_Info();
    
  };
  const handle_table_Info = ()=>{
    return new Promise((resolve, reject)=>{
      handleDataIF.value = false;
      for(let i = 0 ; compare_de_tables_info.length > i ; i++){
      if(compare_de_tables_info[i].title === compare_de_title.value){
        const headers = [];
        for(let j = 0 ; compare_de_tables_info[i].headers.length > j; j++){
          const header = compare_de_tables_info[i].headers[j].split(/\(/);
          headers.push(header[0]);
        }
        resolve({
          body:compare_de_tables_info[i].body,
          headers
        })
      }}
    }).then((response)=>{
      tableComponentInfo.value = response;
      handleDataIF.value = true;
    })
  };
  const changed_miRNA_DataInfo = () => {
    if(log2_UpperBound.value === '' || log2_LowerBound.value === '')return;
    console.log(log2_UpperBound.value, 'log2_UpperBound')

    // if(log2_LowerBound.value || log2_UpperBound.value)
    for(let i = 0; compare_de_tables_info.length > i ; i++){
      if( compare_de_title.value === compare_de_tables_info[i].title){
        handle_table_Info();
        compare_de_Obj.value.title = compare_de_tables_info[i].title;
        compare_de_Obj.value.selectStyle = select_P_Q_Style.value;
        compare_de_Obj.value.selectStyleNum = select_value_Number.value;
        compare_de_Obj.value.log2_LowerBound = log2_LowerBound.value;
        compare_de_Obj.value.log2_UpperBound = log2_UpperBound.value;
      }
    }
  };
</script>