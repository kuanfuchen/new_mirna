<template>
  <div>
    <v-card class="px-3" width="100%" >
      <!--  -->
      <template v-slot:title>
        <p class="text-teal">Analysis</p> 
      </template>
      <v-card-text>
        <v-row no-gutters>
          <v-col cols="3">
            <v-sheet class="pa-2 ma-2">
              <p class="font-weight-bold text-right">Compare</p>
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
        <v-row no-gutters>
          <v-col cols="3">
            <v-sheet class="pa-2 ma-2"> 
              <p class="text-right font-weight-bold">P-value</p>
            </v-sheet>
          </v-col>
          <v-col cols="2">
            <v-sheet>
              <v-text-field density="compact" label="Number(0 ~ 1)" variant="outlined" v-model="select_value_Number"
              type="number" @update:modelValue="changed_miRNA_DataInfo"></v-text-field>
            </v-sheet>
          </v-col>
        </v-row>
      <!--  -->
        <v-row no-gutters>
          <v-col cols="3">
            <v-sheet class="pa-2 ma-2">
              <p class="font-weight-bold text-right">
                <!-- log2FC Lower bound(-10~0) / Upper bound(0~10) -->
                log2FC Lower bound (-{{ log2V_model_val }}~0) / Upper bound (0~{{ log2V_model_val }})
              </p>
            </v-sheet>
          </v-col>
          <v-col cols="2">
            <v-text-field :label="`Number(-${log2V_model_val} ~ 0)`" type="number" variant="outlined" v-model="log2_LowerBound" density="compact"
            @update:modelValue="changed_miRNA_DataInfo"></v-text-field>
          </v-col>
          <v-col class="ml-5" cols="2">
            <v-text-field :label="`Number(0 ~ ${log2V_model_val})`" type="number" variant="outlined" v-model="log2_UpperBound" density="compact" 
            @update:modelValue="changed_miRNA_DataInfo"></v-text-field>
          </v-col>
        </v-row>
        <hr>
      </v-card-text>
      <v-card-text>
        <v-card class="py-1 mb-2">
          <p class="text-h6 ml-3 text-teal" style="font-weight: 700;">Volcano Plot</p>
          <Volcano :change_volcano_plot="compare_de_Obj" @xaxisMaxValue="listenXxais_Max"></Volcano>
        </v-card>
        <div  v-if="handleDataIF">
            <v-card class="px-2 py-1">
            <p class="text-h6 my-2 text-teal" style="font-weight: 700;">DE Table</p>
            <div class="d-flex justify-space-between">
              <p class="mb-2" style="font-weight: 700;font-size: 18px;">
                {{ compare_de_title }}
              </p>
              <div class="" style="width:500px">
                <v-text-field  density="compact" label="FDR / Number(0 ~ 1)" variant="outlined" v-model="fdrVal" @update:modelValue="handle_table_Info"
                  type="number">
                </v-text-field>
              </div>
            </div>
          <DisplayTable :table="tableComponentInfo"></DisplayTable>
          </v-card>
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
  const select_P_Q_Style = ref('P-value');
  const select_value_Number = ref(1);
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
  const log2V_model_val = ref(0);
  const fdrVal = ref(1);
  // const volcano_plot_title = ref('')
  let compare_de_tables_info = [];
  dataService.DE_Folder_Info$.pipe(takeUntil(comSubject$), debounceTime(300)).subscribe((deFolderData)=>{
    sort_deFolderData(deFolderData);
  });
  const sort_deFolderData = async(de_data) => {
    if(Object.keys(de_data).length === 0)return;
    if(de_data.title_Group.length === 0){
      console.log("don't deData");
      return
    };
    compare_de_title_group.value = await de_data.title_Group;
    compare_de_title.value = await de_data.title_Group[0];
    compare_de_tables_info = await de_data.info;
    de_data.info.forEach((item) => compare_de_tables_info.push(item));
    await handle_table_Info();
  };
  const handle_table_Info = ()=>{
    const fdrVal_Number = Number(fdrVal.value);
    if(fdrVal_Number <= 0)return
    return new Promise((resolve, reject)=>{
      handleDataIF.value = false;
      let checkedUpDownIndex = -1; 
      let fdrIndex = -1;
      for(let i = 0 ; compare_de_tables_info.length > i ; i++){
        if(compare_de_tables_info[i].title === compare_de_title.value){
          const headers = [];
          for(let j = 0 ; compare_de_tables_info[i].headers.length > j; j++){
            let header = '';
            const headerIndex = compare_de_tables_info[i].headers[j].indexOf('LSMean');
            if(headerIndex > -1){
              header = compare_de_tables_info[i].headers[j];
            }else{
              header = compare_de_tables_info[i].headers[j].split(/\(/)[0];
            };
            const headerUpper = header.toUpperCase().trim();
            if(headerUpper === 'LOG2'){
              checkedUpDownIndex = j;
              headers.push('Log2Ratio', 'Up_Down');
            }else{
              headers.push(header);
            }
            if(headerUpper === 'FDR STEP UP'){
              fdrIndex = j;
            }
          }
          const headers_significant_index = headers.indexOf('significant');
          if(headers_significant_index === -1) headers.push('significant');
          for(let j = 0 ; compare_de_tables_info[i].body.length > j ; j++){
            const fdrNumber = Number(compare_de_tables_info[i].body[j][fdrIndex]);
            const significant_value = fdrVal_Number >= fdrNumber ? true : false;
            if(headers.length > compare_de_tables_info[i].body[j].length){
              compare_de_tables_info[i].body[j].forEach((item, index)=>{
                let changedStyle;
                if(index === checkedUpDownIndex) changedStyle = Number(compare_de_tables_info[i].body[j][checkedUpDownIndex]);
                if(changedStyle >= 0){
                  compare_de_tables_info[i].body[j].splice(checkedUpDownIndex + 1, 0, 'UP')
                }else if(changedStyle < 0){
                  compare_de_tables_info[i].body[j].splice(checkedUpDownIndex + 1, 0, 'Down')
                }
              })
            }
            if(compare_de_tables_info[i].body[j].length <= headers.length){
              compare_de_tables_info[i].body[j][headers.length - 1]= significant_value;
            }
          }
          resolve({
            body:compare_de_tables_info[i].body,
            headers,
          })
      }}
    }).then((response)=>{
      tableComponentInfo.value = response;
      handleDataIF.value = true;
    });
  };
  const changed_miRNA_DataInfo = () => {
    if(log2_UpperBound.value === '' || log2_LowerBound.value === '') return;
    for(let i = 0 ; compare_de_tables_info.length > i ; i++){
      if( compare_de_title.value === compare_de_tables_info[i].title ){
        handle_table_Info();
        compare_de_Obj.value.title = compare_de_tables_info[i].title;
        compare_de_Obj.value.selectStyle = select_P_Q_Style.value;
        compare_de_Obj.value.selectStyleNum = select_value_Number.value;
        compare_de_Obj.value.log2_LowerBound = log2_LowerBound.value;
        compare_de_Obj.value.log2_UpperBound = log2_UpperBound.value;
      }
    }
  };
  const listenXxais_Max = (emitValue)=>{
    // console.log(emitValue, 'emitValue')
    log2V_model_val.value = emitValue;
  }
</script>