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
  const PCA_Data = {
    body:[],
    headers:[]
  };
  const layout = {
    xaxis: { title: 'PCA1' },
    yaxis: { title: 'PCA2' },
    // title: 'Quadrant Plot',
  };
  const madePCA_plot = async() => {
    const tempData = [];
    const title = [];
    for(let i = 0 ; PCA_Data.body.length > i ; i++){
      if( i < 2 ){
        title.push(PCA_Data.body[i][0]);
        // 
        for(let j = 0; PCA_Data.body[i].length > j ; j++){
          if(j > 0){
            if(!tempData[ j - 1 ]) tempData[ j - 1 ] = [];
            const pca_data_number = Number(PCA_Data.body[i][j]);
            tempData[ j - 1 ].push(pca_data_number)
          }
        }
      }
    }
    const pca_plot_data = [];
    for(let i = 0 ; tempData.length > i ; i++){
      pca_plot_data.push({
        x:[ tempData[i][0] ],
        y:[ tempData[i][1] ],
        mode: 'markers',
        type: 'scatter',
        marker:{
          size: 32
        },
        name: PCA_Data.headers[ i + 1 ],
      }) 
    }
    for( let i = 0 ; title.length > i ; i++ ){
      const layoutTextSplit = title[i].split(/^([^\s]+)\s*\(([\d.]+%)\)$/);
      const layoutAxisTitle = layoutTextSplit[2].substring(0,5);
      if(i === 0){
        layout.xaxis.title = `${layoutTextSplit[1]} (${layoutAxisTitle}%)`
      }else if(i === 1){
        layout.yaxis.title = `${layoutTextSplit[1]} (${layoutAxisTitle}%)`
      }
      
    }
    setTimeout(() => {
      const PCA_plot = document.getElementById('PCA_plot');
      Plotly.newPlot(PCA_plot, pca_plot_data, layout,{ responsive: true });
    }, 200);
  }
  dataService.CPM_PCA_Info$.pipe(takeUntil(comSubject$)).subscribe(async(data)=>{
    if(!data.body)return;
    for(let i = 0; data.body.length > i ; i++){
        PCA_Data.body.push(data.body[i])
      }
    PCA_Data.headers = data.headers;
    await madePCA_plot();
  });
</script>