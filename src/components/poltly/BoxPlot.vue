<template>
  <div class="py-10">
    <div id="Boxplot_visualization" ></div>
  </div>
</template>
<script setup>
  import Plotly from 'plotly.js-dist-min';
  import { dataService } from '../../service/data_service.js';
  import { takeUntil, Subject, debounceTime } from 'rxjs';
  const comSubject$ = new Subject();
  let scatter_Info = {
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
    if(scatter_Info.headers.length === 0 && scatter_Info.info.length === 0) return;
    const Boxplot_visualization = document.getElementById('Boxplot_visualization');
    Plotly.purge(Boxplot_visualization);
    const traceData = [];
    for(let i = 0 ; scatter_Info.headers.length > i ; i++){
      traceData[i] = {
        name:scatter_Info.headers[i],
        boxpoints: 'Outliers',
        type: 'box',
        y:[]
      };
      for( let j = 0 ; scatter_Info.info.length > j ; j++){
        traceData[i].y.push(scatter_Info.info[j][i])
      }
    }
    // drawGraphBoxplot_visualization(Boxplot_visualization, traceData)
    Plotly.newPlot(Boxplot_visualization, traceData, layout, { responsive: true });
  };
  dataService.visualization_Plot$.pipe(takeUntil(comSubject$),debounceTime(300)).subscribe(async(visualization_info)=>{
    if(visualization_info.info.length === 0) return;
    scatter_Info = visualization_info;
    await handleBoxPlotInfo();
  });
</script>