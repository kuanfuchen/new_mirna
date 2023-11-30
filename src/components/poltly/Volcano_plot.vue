<template>
  <div>
    <p class="ml-5">{{ valcanoTitle }}</p>
    <div class="mt-3" id="displatVolcanoPlot"></div>
  </div>
</template>
<script setup>
  import Plotly from 'plotly.js-dist-min';
  import { dataService } from '@/service/data_service';
  import { takeUntil, debounceTime, Subject } from 'rxjs';
  import { ref } from 'vue';
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
    marker: { size: 6 }
  };

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
    name: 'Additional Line'
  };
  const negativeLine = {
    x:[-1, -1],
    y:[0, 10],
    mode: 'lines',
    type: 'scatter',
    name: 'Additional Line'
  }
  // 
  const DE_folder_data = [ volcano_plot_plotlyjs_data, positiveLine, negativeLine];
  dataService.DE_Folder_Info$.pipe(takeUntil(comSubject$), debounceTime(300)).subscribe((deFolderData)=>{
    // sort_deFolderData(deFolderData);
    storagedDE_folder.info = deFolderData.info;
    storagedDE_folder.headers = deFolderData.title_Group;
    handleDE_data();
    // console.log(storagedDE_folder, 'storagedDE_folder');
  });
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
  const displatVolcano = (p_value, log2, RNA_ID)=>{
    volcano_plot_plotlyjs_data.y = p_value;
    volcano_plot_plotlyjs_data.x = log2;
    volcano_plot_plotlyjs_data.text = RNA_ID;
    const maxValYaxis = Math.max(...p_value);
    const minValYaxis = Math.min(...p_value);
    const maxValXaxis = Math.max(...log2);
    const minValXaxis = Math.min(...log2);
    layout.xaxis = {
      range:[ minValXaxis, maxValXaxis ],
      title:'log2'
    };
    layout.yaxis = {
      range:[minValYaxis, maxValYaxis ],
      title:'-log10'
    }
    const postitiveYMax = Math.ceil(maxValYaxis);
    positiveLine.y = [ 0, postitiveYMax ];
    setTimeout(()=>{
      Plotly.newPlot('displatVolcanoPlot',DE_folder_data, layout, {responsive:true})
      // const xValues = [1, 2, 3, 4, 5];
      // const yValues = [10, 14, 18, 24, 30];
      // const trace1 = {
      //   x: xValues,
      //   y: yValues,
      //   mode: 'markers',
      //   type: 'scatter',
      //   name: 'Data Points'
      // };
      // const trace2 = {
      //   x: xValues,
      //   y: [8, 12, 16, 20, 26],
      //   fill: 'tonexty',  // 將線條與 x 軸之間的區域填充
      //   type: 'scatter',
      //   fillcolor: 'rgba(0,100,80,0.2)',  // 區域填充的顏色
      //   line: { color: '#black' }  // 隱藏區域線條
      // };
      // const exlayout = {
      //   title: 'Scatter Plot with Shaded Area',
      //   xaxis: { title: 'X Axis' },
      //   yaxis: { title: 'Y Axis' }
      // };
      // Plotly.newPlot('displatVolcanoPlot', [trace1, trace2], exlayout);
    },100)
  }
</script>