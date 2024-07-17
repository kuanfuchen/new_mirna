<template>
  <div>
    <v-card min-width="500">
      <template v-slot:title>
        <span class="font-weight-black">Regular label site</span>
      </template>
      <v-list lines="one">
        <v-list-item v-for="annotation in annotationsValue" :key="annotation.name"
        :title="annotation.name" :subtitle="annotation.ID">
          <template v-slot:append>
            <div class="ml-1">
              <v-text-field density="compact" label="x" v-model="annotation.x"></v-text-field>
            </div>
            <div class="ml-1">
              <v-text-field density="compact"  v-model="annotation.y" label="y"></v-text-field>
            </div>
          </template>
        </v-list-item>
        <div class="d-flex justify-space-around">
          <v-btn  width="80" class="text-none" color="blue-grey"
          @click="toggledPointSite">Close</v-btn>
          <v-btn  outlined width="80" @click="plotSettingChange" color="blue"> 
            <v-icon icon="fa:fas fa-image" style="font-size: 16px;"></v-icon>
          </v-btn> 
        </div>
      </v-list>
    </v-card>
  </div>
</template>
<style lang="scss" scope>

</style>
<script setup>
  import { reactive, onMounted } from 'vue';
  const props = defineProps(['control_annotation']);
  const emits = defineEmits(['returnPlotSetting','closeSettingMenu'])
  const annotationsValue = reactive([{
      x: 0,
      y: 0, 
      name:'',
      ID:''
    }])
  const toggledPointSite = ()=>{
    emits('closeSettingMenu', false)
  }
  const plotSettingChange = ()=>{
    emits('returnPlotSetting', annotationsValue);
  };
  const revicedPlotAnnotations = (annotations) => {
    annotationsValue.length = 0;
    for(let i = 0 ; annotations.length > i ; i ++){
      annotationsValue.push(annotations[i])
    }
  };
  onMounted(async() => {
    if(props.control_annotation.length === 0)return;
    const annotations = JSON.parse(JSON.stringify(props.control_annotation));
    await revicedPlotAnnotations(annotations);
  });
</script>