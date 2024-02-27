<template>
  <div>
    <div class="d-flex justify-end">
      <div class="download_xlsx" @click="showHeatmap()">
        <v-icon icon="fa:fas fa-expand mr-5"></v-icon>
      </div>
    </div>
    <div class="zoom-wrap">
      <img id=" target" :src="getHeatmapImg()" :style="{ height:heatmapHight }" class="heatmapStyle magnifying_glassStyle">
      <div class="zoom-area showBox"></div>
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
            <div  :style="{width:`${dialogHeatmapWidth}%`,height:`${dialogHeatmapHight}vh`}">
              <img :src="getHeatmapImg()"  style="width:100%;height: 100%;" >
              
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
  .zoom-wrap{
  position: relative;
  display: inline-block;
  
}

.target{
  position: relative;
  width: 100%;
}

.zoom-area{
  position: absolute;
  left: 0px;
  top: 0px;
  display: block;
  width: 200px;
  height: 200px;
  border-radius: 100%;
  box-shadow: 0 0 5px rgba(255,255,255,.3), inset 0 0 5px rgba(0,0,0,.3);
  background-repeat: no-repeat;
  pointer-events: none;
  transition: .3s ease-out;
}

.zoom-area::before {
  content: ' ';
  display: block;
  position: relative;
  top: -40px;
  left: -40px;
  width: 80px;
  height: 80px;
  border-radius: 100%;
  background-color: #2f2f2f54;
}
</style>
<script setup>
  import { ref, watch, onMounted } from 'vue';
  import $ from 'jquery';
  // import {mangificant_glass} from '../../utils/mangificant_glass.js';
  const toggle_Heatmap = ref(false);
  const definedProps = defineProps(['heatmapHeight']);
  const heatmapHight = ref('544.5px');
  const toggleZoom = ref(0);
  const dialogHeatmapHight = ref(80);
  const dialogHeatmapWidth = ref(100)
  const magnifying_glassStyle = ref(null);
  const showBox = ref(null);
  const getHeatmapImg = ()=>{
    return new URL('../../assets/miRNA-seq/Bowtie2/heatmap.png', import.meta.url).href;
  }
  
  const showHeatmap = ()=>{
    toggle_Heatmap.value = true;
    // const blow = blowupJS.blowup();
    // setTimeout(() => {
      // console.log(magnifying_glassStyle, 'magnifying_glassStyle')
      // let target = document.querySelector('#magnifying_glassStyle');
      // console.log(target, 'target')
      // let zoomArea = document.querySelector('#showBox');
      mangificant_glass(magnifying_glassStyle.value, showBox.value);
    // },1000);
    
  }
  watch(definedProps.heatmapHeight, (newVal)=>{
    if(newVal.height === 550){
      heatmapHight.value = '544.5px';
    }else{
      heatmapHight.value = '100%'
    }
  });
  watch(toggleZoom, (newVal)=>{
    dialogHeatmapWidth.value = 100 + 1.5*newVal;
    dialogHeatmapHight.value = 80 + 0.8*1.5*newVal;
  })
  onMounted(()=>{
    magnifying_glassStyle.value = document.querySelector('.magnifying_glassStyle');
    showBox.value = document.querySelector('.showBox');
    console.log(magnifying_glassStyle.value, showBox.value);
  });
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
