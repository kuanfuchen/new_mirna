<template>
  <div>
    <div id="PCA_plot"></div>
  </div>
</template>
<script setup>
import Plotly from 'plotly.js-dist-min';
import { dataService } from '../../service/data_service';
import { takeUntil, Subject } from 'rxjs';
const comSubject$ = new Subject();
  const layout = {
    xaxis: { title: 'PCA1' },
    yaxis: { title: 'PCA2' },
    // title: 'Quadrant Plot',
  };
  
  const madePCA_plot = async(PCA_Data) => {
    const tempData = [];
    const title = [];
    for(let i = 0 ; PCA_Data.body.length > i ; i++){
      const spliceTitle = PCA_Data.body[i].splice(0, 1);
      title.push(spliceTitle);
      if(i < 2){
        // data[i] = [];
        for(let j = 0; PCA_Data.body[i].length > j ; j++){
          if(!tempData[j]) tempData[j] = [];
          const pca_data_number = Number(PCA_Data.body[i][j])
          tempData[j].push(pca_data_number)
        }
      }
    }
    const pca_plot_data = [];
    for(let i=0 ; tempData.length > i ; i++){
      pca_plot_data.push({
        x:[tempData[i][0]],
        y:[tempData[i][1]],
        mode: 'markers',
        type: 'scatter',
        marker:{
          size:32
        },
        name:PCA_Data.headers[i + 1],
      }) 
    }
    setTimeout(() => {
      const PCA_plot = document.getElementById('PCA_plot');
      Plotly.newPlot(PCA_plot, pca_plot_data, layout,{responsive: true});
    }, 200);
  }
  dataService.CPM_PCA_Info$.pipe(takeUntil(comSubject$)).subscribe(async(PCA_Data)=>{
    await madePCA_plot(PCA_Data);
    
  });
</script>