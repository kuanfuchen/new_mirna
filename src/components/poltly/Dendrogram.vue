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
  <v-dialog v-model="toggle_Heatmap"  width="90vw" >
      <v-card class="bg-white" style="overflow: auto;">
        <v-card-text>
          <h5 class="text-h5" style="font-weight: 700;">
            Heatmap Plot
          </h5>  
          <div class="d-flex justify-end mb-3">
            <v-btn density="comfortable" rounded="lg" color="red-darken-1" variant="outlined" @click="toggle_Heatmap = false"
            icon="$close">
            </v-btn>
          </div>
          <div class="heatmapBackground" >
            <!-- <img :src="getHeatmapImg()" class="heatmapDialogStyle"> -->
            <!-- <Dialog_plot :listen_plot_data="transfer_FullScreen_data" @toggle_tranfer_dialog_plot="close_dialog" ></Dialog_plot> -->
          </div>
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
  /* .heatmapDialogStyle{
    width: 100%;
    height: 80vh;
  } */
  .heatmapBackground{
    /* width:100%; */
    height: 80vh;
    background: url('../../assets/miRNA-seq/Bowtie2/heatmap.png');
    background-size:cover;
    background-repeat: no-repeat;
  }
</style>
<script setup>
  import { ref, watch /*onMounted*/ } from 'vue';
  let heatmapBackground = null;
  let zoomArea = null
  let showZoomArea = false;
  const toggle_Heatmap = ref(false);
  const definedProps = defineProps(['heatmapHeight']);
  const heatmapHight = ref('544.5px')
  const getHeatmapImg = ()=>{
    return new URL('../../assets/miRNA-seq/Bowtie2/heatmap.png', import.meta.url).href;
  }
  const zoomImgMouseMove = (e)=>{
    return { offsetX:e.offsetX, offsetY:e.offsetY }
  }
  const zoomImgMouseEnter = () => showZoomArea = true;
  const zoomImgMouseLeave = () => showZoomArea = false;
  const showHeatmap = ()=>{
    toggle_Heatmap.value = true;
    heatmapBackground = document.querySelector('.heatmapBackground');
    zoomArea = document.querySelector('.zoomArea');
    heatmapBackground.addEventListener('mousemove', zoomImgMouseMove, false);
    heatmapBackground.addEventListener('mouseenter', zoomImgMouseEnter, false);
    heatmapBackground.addEventListener('mouseleave', zoomImgMouseLeave, false);
  }
  watch(definedProps.heatmapHeight, (newVal)=>{
    if(newVal.height === 550){
      heatmapHight.value = '544.5px';
    }else{
      heatmapHight.value = '100%'
    }
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
