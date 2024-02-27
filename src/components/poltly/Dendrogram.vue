<template>
  <div>
    <div class="d-flex justify-end">
      <div class="download_xlsx" @click="showHeatmap()">
        <v-icon icon="fa:fas fa-expand mr-5"></v-icon>
      </div>
    </div>
    <div>
      <img :src="getHeatmapImg()" :style="{ height:heatmapHight }" class="heatmapStyle">
    </div>
  </div>
  <v-dialog v-model="toggle_Heatmap"  width="100vw" >
      <v-card class="bg-white" style="height: 92vh;overflow: auto;">
        <v-card-text>
          <h5 class="text-h5" style="font-weight: 700;">
            Heatmap Plot
          </h5>  
          <div class="d-flex justify-end mb-3">
            <div class="d-flex">
              <!-- <v-icon icon="fa:fas fa-magnifying-glass-minus"></v-icon> -->
              <v-slider v-model="toggleZoom" style="width:200px"
              append-icon="fa:fas fa-magnifying-glass-plus"
              prepend-icon="fa:fas fa-magnifying-glass-minus"></v-slider>
              <!-- <v-icon icon="fa:fas fa-magnifying-glass-plus"></v-icon> -->
            </div>
            <v-btn density="comfortable" rounded="lg" color="red-darken-1" variant="outlined" @click="toggle_Heatmap = false"
            icon="$close">
            </v-btn>
          </div>
          <!-- <div class="heatmapBackground"> -->
            <!-- class="heatmapDialogStyle" -->
            <div :style="{width:`${dialogHeatmapWidth}%`,height:`${dialogHeatmapHight}vh`}">
              <img :src="getHeatmapImg()" style="width:100%;height: 100%;" >
            </div>
              
            <!-- <Dialog_plot :listen_plot_data="transfer_FullScreen_data" @toggle_tranfer_dialog_plot="close_dialog" ></Dialog_plot> -->
          <!-- </div> -->
        </v-card-text>
      </v-card>
    </v-dialog>
</template>
<style scope>
  .heatmapStyle{
    width:100%;
    /* height: 544.5px; */
    /* height:100%; */
  }
  .heatmapDialogStyle{
    width: 100%;
    height: 80vh;
  }
  /* .heatmapBackground{
    height: 80vh;
    background: url('../../assets/miRNA-seq/Bowtie2/heatmap.png');
    background-size:cover;
    background-repeat: no-repeat;
  } */
</style>
<script setup>
  import { ref, watch /*onMounted*/ } from 'vue';
  const toggle_Heatmap = ref(false);
  const definedProps = defineProps(['heatmapHeight']);
  const heatmapHight = ref('544.5px');
  const toggleZoom = ref(0);
  const dialogHeatmapHight = ref(80);
  const dialogHeatmapWidth = ref(100)
  const getHeatmapImg = ()=>{
    return new URL('../../assets/miRNA-seq/Bowtie2/heatmap.png', import.meta.url).href;
  }
  const showHeatmap = ()=>{
    toggle_Heatmap.value = true;
  }
  watch(definedProps.heatmapHeight, (newVal)=>{
    if(newVal.height === 550){
      heatmapHight.value = '544.5px';
    }else{
      heatmapHight.value = '100%'
    }
  });
  watch(toggleZoom, (newVal)=>{
    console.log(newVal, 'newVal')
    dialogHeatmapWidth.value = 100 + 1.5*newVal;
    dialogHeatmapHight.value = 80 + 0.8*1.5*newVal;
  })
  // import Plotly from 'plotly.js-dist-min';
  // onMounted(() => {
  //   const data = [{
  //     z: [
  //       [1, 2, 3],
  //       [4, 5, 6],
  //       [7, 8, 9]
  //     ],
  //     type: 'heatmap',
    
  //   }];
  //   Plotly.newPlot('myDiv', data, {height:550});
  // })
</script>
