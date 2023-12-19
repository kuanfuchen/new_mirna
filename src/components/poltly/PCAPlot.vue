<template>
  <div>
    <div class="d-flex justify-end">
      <div class="download_xlsx" @click="toogle_Plot_Screen = true">
        <v-icon icon="fa:fas fa-expand mr-5"></v-icon>
      </div>
    </div>
    <div id="PCA_plot"></div>
    <!--  -->
    <v-dialog v-model="toogle_Plot_Screen"  width="90vw" >
      <v-card class="bg-white" style="overflow-y: hidden;">
        <v-card-text>
          <h5 class="text-h5" style="font-weight: 700;">
            PCA Plot
          </h5>  
          <div class="mt-3 ml-auto mr-5">
            <Dialog_plot :listen_plot_data="transfer_FullScreen_data" @toggle_tranfer_dialog_plot="close_dialog" ></Dialog_plot>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
  <!--  -->
  <!-- <div>
    <div id="PCA_plot"></div>
  </div> -->
</template>
<script setup>
  import Plotly from 'plotly.js-dist-min';
  import { dataService } from '../../service/data_service';
  import Dialog_plot from '../Dialog_Plot.vue';
  import { takeUntil, Subject } from 'rxjs';
  import { ref, watch } from 'vue';
  const comSubject$ = new Subject();
  const transfer_FullScreen_data = ref([]);
  const toogle_Plot_Screen = ref(false);
  const definedProps = defineProps(['plot_size']);
  const PCA_Data = {
    body:[],
    headers:[],
    sortOrder:[]
  };
  const layout = {
    xaxis: { title: 'PCA1', },
    yaxis: { title: 'PCA2', },
    height:500
    // title: 'Quadrant Plot',
  };
  const settingColor = ['#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3', '#03A9F4',
    '#00BCD4', '#009688', '#4CAF50', '#8BC34A' , '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800','#FF5722'
    ,'#795548', '#607D8B'];
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
      const drawMarkerColor = PCA_Data.sortOrder.filter((item)=>{ if(item.name === PCA_Data.headers[ i + 1 ])return item.color})[0];
      pca_plot_data.push({
        x:[ tempData[i][0] ],
        y:[ tempData[i][1] ],
        mode: 'markers',
        type: 'scatter',
        hoverlabel:{
          namelength:50
        },
        marker:{
          size: 32,
          color: drawMarkerColor.color,
          line:{
            width:1,
            color:'black'
          }
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
    const pca_plot_data_order = [];
    for(let i = 0 ; PCA_Data.sortOrder.length > i ; i++){
      const orderIndex = pca_plot_data.filter((item)=>{if(item.name === PCA_Data.sortOrder[i].name) return item})[0];
      pca_plot_data_order.push(orderIndex)
    }
    const full_screen_layout = {
      xaxis:{
        title:layout.xaxis.title,
      },
      
      yaxis:{
        title:layout.yaxis.title
      }
    }
    setTimeout(() => {
      transfer_FullScreen_data.value = {
        data:pca_plot_data_order,
        layout:full_screen_layout
      };
      Plotly.newPlot('PCA_plot', pca_plot_data_order, layout,{ responsive: true });
    }, 200);
  }
  dataService.CPM_PCA_Info$.pipe(takeUntil(comSubject$)).subscribe(async(data)=>{
    if(!data.body)return;
    for(let i = 0; data.body.length > i ; i++){
      PCA_Data.body.push(data.body[i])
    };
    const conditionColor = [];
    const orderNameOrder = [];
    for(let i = 0 ; data.sortOrder.length > i ; i++){
      const orderNumIndex = orderNameOrder.indexOf(data.sortOrder[i].order);
      if(orderNumIndex === -1){
        orderNameOrder.push(data.sortOrder[i].order);
        const reminder = orderNameOrder.length % 18;//color number
        conditionColor.push({
          condition:data.sortOrder[i].order,
          color: settingColor[reminder]
        })
      };
    }
    PCA_Data.headers = data.headers;
    PCA_Data.sortOrder = data.sortOrder;
    for(let i = 0 ; PCA_Data.sortOrder.length > i ; i++){
      conditionColor.forEach((item)=>{
        if(item.condition === PCA_Data.sortOrder[i].order){
          PCA_Data.sortOrder[i].color = item.color;
        }
      })
    }
    await madePCA_plot();
  });
  const close_dialog = (val) => toogle_Plot_Screen.value = val;
  watch(definedProps.plot_size, (newVal)=>{
    layout.height = newVal.height;
    madePCA_plot()
  })
</script>