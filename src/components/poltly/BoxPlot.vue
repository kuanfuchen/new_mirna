<template>
  <div class="">
    <div class="d-flex justify-end">
      <div class="download_xlsx" @click="toogle_Plot_Screen = true">
        <v-icon icon="fa:fas fa-expand mr-5"></v-icon>
      </div>
    </div>
    <div id="Boxplot_visualization" ></div>
    <!--  -->
    <v-dialog v-model="toogle_Plot_Screen"  width="90vw" >
      <v-card class="bg-white" style="overflow-y: hidden;">
        <v-card-text >
          <h5 class="text-h5" style="font-weight: 700;">
            Box Plot
          </h5>  
          <div class="mt-3 ml-auto mr-5">
            <Dialog_plot :listen_plot_data="transfer_FullScreen_data" @toggle_tranfer_dialog_plot="close_dialog" ></Dialog_plot>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script setup>
  import Plotly from 'plotly.js-dist-min';
  import { dataService } from '../../service/data_service.js';
  import { takeUntil, Subject, debounceTime } from 'rxjs';
  import { ref } from 'vue';
  import Dialog_plot from '../Dialog_Plot.vue';
  const transfer_FullScreen_data = ref([]);
  const comSubject$ = new Subject();
  const toogle_Plot_Screen = ref(false)
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
    // 
    const dataOrder = [];
    for(let i = 0 ; boxPlot_Info.sortOrder.length > i ; i++){
      const orderIndex = traceData.filter((item)=>{if( boxPlot_Info.sortOrder[i].name === item.name)return item})[0];
      dataOrder.push(orderIndex)
    }
    // 
    // Plotly.newPlot(Boxplot_visualization, sortTraceData, layout, { responsive: true });
    // drawGraphBoxplot_visualization(Boxplot_visualization, traceData)
    transfer_FullScreen_data.value = {
      data:dataOrder,
      layout
    }
    Plotly.newPlot(Boxplot_visualization, dataOrder, layout, { responsive: true });
  };
  dataService.visualization_Plot$.pipe(takeUntil(comSubject$),debounceTime(300)).subscribe(async(visualization_info)=>{
    if(visualization_info.info.length === 0) return;
    boxPlot_Info = visualization_info;
    await handleBoxPlotInfo();
  });
  const close_dialog = (val) => toogle_Plot_Screen.value = val;
</script>