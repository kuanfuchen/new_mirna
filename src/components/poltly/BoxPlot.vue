<template>
  <div class="">
    <div id="Boxplot_visualization" ></div>
  </div>
</template>
<script setup>
  import Plotly from 'plotly.js-dist-min';
  import { dataService } from '../../service/data_service.js';
  import { takeUntil, Subject, debounceTime } from 'rxjs';
  const comSubject$ = new Subject();
  let boxPlot_Info = {
    headers:[],
    info:[]
  };
  const y0 = [];
  const y1 = [];
  for (let i = 0; i < 50; i ++) {
    y0[i] = Math.random();
    y1[i] = Math.random() + 1;
  }
  const layout = { };
  // const boxdata = [trace1, trace2];
  // const drawGraphBoxplot_visualization = () =>{
  // const boxplot_visualization = document.getElementById('Boxplot_visualization');
  //   Plotly.newPlot(boxplot_visualization, boxdata, layout);
  // }
  const handleBoxPlotInfo = () => {
    if(boxPlot_Info.headers.length === 0 && boxPlot_Info.info.length === 0) return;
    const Boxplot_visualization = document.getElementById('Boxplot_visualization');
    Plotly.purge(Boxplot_visualization);
    const traceData = [];
    for(let i = 0 ; boxPlot_Info.headers.length > i ; i++){
      traceData[i] = {
        name:boxPlot_Info.headers[i],
        boxpoints: 'Outliers',
        type: 'box',
        y:[]
      };
      for( let j = 0 ; boxPlot_Info.info.length > j ; j++){
        traceData[i].y.push(boxPlot_Info.info[j][i])
      }
    }
    
    // traceData.sort((a, b)=>{ 
    //   const bName = b.name.toLowerCase();
    //   const aName = a.name.toLowerCase();
    //   if(aName < bName){return - 1}
    // });
    const dataOrder = [];
    for(let i = 0 ; boxPlot_Info.sortOrder.length > i ; i++){
      const orderIndex = traceData.filter((item)=>{if( boxPlot_Info.sortOrder[i].name === item.name)return item})[0];
      dataOrder.push(orderIndex)
    }
    // Plotly.newPlot(Boxplot_visualization, sortTraceData, layout, { responsive: true });
    // drawGraphBoxplot_visualization(Boxplot_visualization, traceData)
    Plotly.newPlot(Boxplot_visualization, dataOrder, layout, { responsive: true });
  };
  dataService.visualization_Plot$.pipe(takeUntil(comSubject$),debounceTime(300)).subscribe(async(visualization_info)=>{
    if(visualization_info.info.length === 0) return;
    boxPlot_Info = visualization_info;
    await handleBoxPlotInfo();
  });
</script>