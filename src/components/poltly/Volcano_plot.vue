<template>
  <div>
    <p class="ml-5" style="font-weight: 700;">{{ valcanoTitle }}</p>
    <div class="mt-3" id="displatVolcanoPlot"></div>
  </div>
</template>
<script setup>
  import Plotly from 'plotly.js-dist-min';
  import { dataService } from '@/service/data_service';
  import { takeUntil, debounceTime, Subject } from 'rxjs';
  import { ref, watch } from 'vue';
  const props = defineProps(['change_volcano_plot']);
  let log2Upper = 1;
  let log2Lower = -1;
  let log_SelectStyleNum = 0;
  const comSubject$ = new Subject();
  const storagedDE_folder = {
    info:[],
    headers:[]
  };
  const valcanoTitle = ref('');
  const volcano_plot_plotlyjs_data = {
    x: [],
    y: [],
    mode: 'markers',
    type: 'scatter',
    name: 'Team A',
    text: ['A-1', 'A-2', 'A-3', 'A-4', 'A-5'],
    marker: { 
      size: 6,
      color:'#1976D2',
    }
  };
  const negative_volcano_plot_plotlyjs_data = {
    x: [],
    y: [],
    mode: 'markers',
    type: 'scatter',
    name: 'Team B',
    text: ['A-1', 'A-2', 'A-3', 'A-4', 'A-5'],
    marker: { 
      size: 6,
      color:'#26A69A',

    }
  }
  const selected_volcano__plot_plotlyjs_data = {
    x: [],
    y: [],
    mode: 'markers',
    type: 'scatter',
    name: 'Team C',
    text: ['A-1', 'A-2', 'A-3', 'A-4', 'A-5'],
    marker: { 
      size: 6,
      color:'#B0BEC5'
    }
  }
  const layout = {
    xaxis: { range: [] },
    yaxis: { range: [] },
  };
  // 
  const positiveLine = {
    x: [1, 1],
    y: [0, 15],  // 在 y = 15 的地方畫一條水平線
    mode: 'lines',
    type: 'scatter',
    name: 'Additional Line',
    line:{
      color:'#FFD600',
      width:2
    }
  };
  const negativeLine = {
    x: [-1, -1],
    y: [0, 10],
    mode: 'lines',
    type: 'scatter',
    name: 'Additional Line',
    line:{
      color:'#FFD600',
      width:2
    }
  }
  const pvalue_line = {
    x: [-100, 100],
    y: [0, 0],
    mode: 'lines',
    type: 'scatter',
    name: 'Additional Line',
    line:{
      color:'#FFA726',
      width:2.5
    }
  }
  const DE_folder_data = [ volcano_plot_plotlyjs_data, selected_volcano__plot_plotlyjs_data, negative_volcano_plot_plotlyjs_data, positiveLine, negativeLine, pvalue_line];
  dataService.DE_Folder_Info$.pipe(takeUntil(comSubject$), debounceTime(300)).subscribe((deFolderData)=>{
    storagedDE_folder.info = deFolderData.info;
    storagedDE_folder.headers = deFolderData.title_Group;
    handleDE_data();
  });
  const reMark_DE_Plot = (num)=>{
    volcano_plot_plotlyjs_data.x.length = 0;
    volcano_plot_plotlyjs_data.y.length = 0;
    volcano_plot_plotlyjs_data.text.length = 0;
    negative_volcano_plot_plotlyjs_data.x.length = 0;
    negative_volcano_plot_plotlyjs_data.y.length = 0;
    negative_volcano_plot_plotlyjs_data.text.length = 0;
    selected_volcano__plot_plotlyjs_data.x.length = 0;
    selected_volcano__plot_plotlyjs_data.y.length = 0;
    selected_volcano__plot_plotlyjs_data.text.length = 0;
    layout.xaxis.range.length = 0;
    layout.yaxis.range.length = 0;
    positiveLine.x = [log2Upper, log2Upper];
    negativeLine.x = [log2Lower, log2Lower];
    handleDE_data(num);
  }
  const handleDE_data = (selectedDataNum = 0)=>{
    valcanoTitle.value = storagedDE_folder.headers[selectedDataNum];
    const selected_DE_pValue = [];
    const selected_DE_log2 = [];
    const selected_RNA_name = [];
    // console.log(storagedDE_folder.info[selectedDataNum].body,'storagedDE_folder.info[selectedDataNum].body')
    for(let i = 0 ; storagedDE_folder.info[selectedDataNum].body.length > i ; i++){
      const floatNum = parseFloat(storagedDE_folder.info[selectedDataNum].body[i][1]);
      const logCalu = - Math.log10(floatNum);
      // selected_DE_pValue.push(storagedDE_folder.info[selectedDataNum].body[i][1]);
      selected_RNA_name.push(storagedDE_folder.info[selectedDataNum].body[i][0]);
      selected_DE_pValue.push(logCalu);
      selected_DE_log2.push(storagedDE_folder.info[selectedDataNum].body[i][4]);
    }
    //calulate Math.log
    displatVolcano(selected_DE_pValue, selected_DE_log2, selected_RNA_name);
  }
  const displatVolcano = (p_value, log2, RNA_ID) => {
    Plotly.purge('displatVolcanoPlot');
    for(let i = 0 ; log2.length> i ; i++){
      const floatNum = parseFloat(log2[i]);
      if( log2Upper <= floatNum &&  p_value[i] >= log_SelectStyleNum){
        volcano_plot_plotlyjs_data.y.push(p_value[i]);
        volcano_plot_plotlyjs_data.x.push(log2[i]);
        volcano_plot_plotlyjs_data.text.push(RNA_ID[i]);
      }else if( log2Lower >= floatNum && p_value[i] >= log_SelectStyleNum ){
        negative_volcano_plot_plotlyjs_data.y.push(p_value[i]);
        negative_volcano_plot_plotlyjs_data.x.push(log2[i]);
        negative_volcano_plot_plotlyjs_data.text.push(RNA_ID[i]);
      }
      // else if( log2Lower < floatNum && floatNum < log2Upper  ){
      else{
        selected_volcano__plot_plotlyjs_data.y.push(p_value[i]);
        selected_volcano__plot_plotlyjs_data.x.push(log2[i]);
        selected_volcano__plot_plotlyjs_data.text.push(RNA_ID[i]);
      }
    };
    const maxValYaxis = Math.max(...p_value);
    const minValYaxis = Math.min(...p_value);
    const maxValXaxis = Math.max(...log2);
    const minValXaxis = Math.min(...log2);
    layout.xaxis = {
      range:[ minValXaxis, maxValXaxis ],
      title:'log2'
    };
    layout.yaxis = {
      range:[ minValYaxis, maxValYaxis ],
      title:'-log10'
    };
    const postitiveYMax = Math.ceil(maxValYaxis);
    positiveLine.y = [ 0, postitiveYMax ];
    setTimeout(()=>{
      Plotly.newPlot('displatVolcanoPlot', DE_folder_data, layout, { responsive: true })
    },100)
  }
  watch(props.change_volcano_plot, (change_Val)=>{
    const titleIndex = storagedDE_folder.headers.indexOf(change_Val.title);
    if(titleIndex === -1){
      console.log('dont index')
      return
    }
    valcanoTitle.value = change_Val.title;
    log2Upper = change_Val.log2_UpperBound;
    log2Lower = change_Val.log2_LowerBound;
    if(change_Val.selectStyleNum === '') return;
    // if(change_Val.selectStyleNum === '' || change_Val.selectStyleNum === Infinity )return;
    log_SelectStyleNum = - Math.log10(change_Val.selectStyleNum);
    if(log_SelectStyleNum === Infinity || log_SelectStyleNum === '') return;
    pvalue_line.y = [ log_SelectStyleNum, log_SelectStyleNum ];
    reMark_DE_Plot(titleIndex);
  });
</script>