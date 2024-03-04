<template>
  <div style="display: block;">
    <div class="d-flex justify-end" style="height:21px">
      <div class="pr-5 btn-icon" @click="downloadHeatmapImage">
        <!-- <a class="pr-5" :href="downloadHeatmapImage" download="heatmap.png"> -->
          <v-icon icon="fa:fas fa-download"></v-icon>
        <!-- </a> -->
      </div>
      <div class="btn-icon"  @click="showHeatmap()">
        <v-icon icon="fa:fas fa-expand mr-5"></v-icon>
      </div>
    </div>
    <!-- zoomist-container -->
    <div class="zoomist-container" >
      <div class="zoomist-wrapper">
        <div class="zoomist-image">
          <img :src="getHeatmapImg()" class="heatmapPicture" :style="{ height:heatmapHight }" />
        </div>
      </div>
    </div>
  </div>
  <v-dialog v-model="toggle_Heatmap"  width="95vw" >
    <v-card class="bg-white" style="height: 92vh;">
      <v-card-text>
        <div class="d-flex justify-space-between align-center py-2">
        <h5 class="text-h5 ml-2" style="font-weight: 700;">
          Heatmap Plot
        </h5>  
        <div class="d-flex align-center mr-3">
          <v-btn density="comfortable" rounded="lg" color="red-darken-1" variant="outlined" @click="toggle_Heatmap = false"
            icon="$close">
          </v-btn>
        </div>
      </div>
      </v-card-text>
      <v-card-text>
        <div class="zoomist-dialogContainer" >
          <div class="zoomist-wrapper">
            <div class="zoomist-image">
              <img :src="getHeatmapImg()" :style="{width:`${dialogHeatmapWidth}%`,height:`${dialogHeatmapHight}vh`}" />
            </div>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<style scope>
 @import "zoomist/css";
  .heatmapStyle{
    width:100%;
    /* height: 544.5px; */
    /* height:100%; */
  }
  .btn-icon{
    cursor: pointer;
  }
  .heatmapDialogStyle{
    width: 100%;
    height: 80vh;
  }
.v-input .v-input__details{
  display: none;
}
.zoomist-container {
  width: 100%;
}

.zoomist-image {
  width: 100%;
  /* aspect-ratio: 16 / 9; */
}

.zoomist-image img {
  width: 100%;
  /* height: 544.5px; */
  /* object-fit: cover;
  object-position: center; */
}
</style>
<script setup>
  import { ref, watch, onMounted } from 'vue';
  import Zoomist from 'zoomist'; 
  const toggle_Heatmap = ref(false);
  const definedProps = defineProps(['heatmapHeight']);
  const heatmapHight = ref('544.5px');
  const dialogHeatmapHight = ref(80);
  const dialogHeatmapWidth = ref(100);
  let href;
  const getHeatmapImg = ()=> new URL('@/assets/miRNA-seq/Bowtie2/heatmap.png', import.meta.url).href;
  const downloadHeatmapImage = () => {
    try{
    const href = new URL('@/assets/miRNA-seq/Bowtie2/heatmap.png', import.meta.url).href;
    fetch(href).then(async(res)=>{
      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link =document.createElement('a');
      link.href = blobUrl;
      link.download = 'heatmap';
      link.innerHTML = '下載文件';
      link.click()
      
    })
    }catch(err){
      console.log(err)
    }
  };
  const showHeatmap = async()=>{
    toggle_Heatmap.value = true;
    setTimeout(() => {
      new Zoomist('.zoomist-dialogContainer', {
        maxScale: 5,
        bounds: true,
        slider: true,
        zoomer: true
      })
    },50);
  }
  watch(definedProps.heatmapHeight, (newVal)=>{
    if(newVal.height === 550){
      heatmapHight.value = '544.5px';
    }else{
      heatmapHight.value = '100%'
    }
  });
  const openZoomist = ()=>{
    new Zoomist('.zoomist-container', {
      maxScale: 5,
      bounds: true,
      slider: true,
      zoomer: true
    })
  }
  onMounted(async() => {
    await openZoomist()
  })
</script>
