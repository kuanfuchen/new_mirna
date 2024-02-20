<template>
  <div>
    <div class="d-flex justify-end">
      <div class="download_xlsx">
        <v-icon icon="fa:fas fa-expand mr-5"></v-icon>
      </div>
    </div>
    <div id="myDiv" ></div>
  </div>
</template>
<script setup>
  import { onMounted } from 'vue';
  import Plotly from 'plotly.js-dist-min';
  onMounted(() => {
    const data = [{
      z: [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
      ],
      type: 'heatmap',
      // dendrogram: {
      //   side: 'bottom', // 设置 dendrogram 的位置，可以是 'top' 或 'bottom'
      //   width: 300,    // 设置 dendrogram 的宽度
      // }
    }];

    Plotly.newPlot('myDiv', data, {height:550});
    // const dendrogramData = {
    //   // type: 'dendrogram',
    //   type:'heatmap',
    //   orientation: 'bottom',
    //   ids: ['root', 'A', 'B', 'C', 'D', 'E'],
    //   labels: ['Root', 'A', 'B', 'C', 'D', 'E'],
    //   parentIds: ['', 'root', 'root', 'root', 'A', 'A'],
    //   marker: {
    //     color: ['rgba(0, 0, 0, 0)', 'rgba(255, 0, 0, 1)', 'rgba(0, 255, 0, 1)', 'rgba(0, 0, 255, 1)', 'rgba(255, 0, 0, 1)', 'rgba(0, 255, 0, 1)'],
    //   },
    // };

    // // 設定 Scatter Plot 的屬性
    // const trace = {
    //   type: 'scatter',
    //   x: [1, 2, 3, 4, 5],
    //   y: [10, 15, 13, 17, 10],
    //   mode: 'markers',
    // };

    // // 創建佈局
    // const layout = {
    //   title: 'Dendrogram with Scatter Plot',
    //   xaxis: {
    //     title: 'X-axis',
    //   },
    //   yaxis: {
    //     title: 'Y-axis',
    //   },
    //   showlegend: false, // 隱藏圖例
    //   width: 800,        // 圖表寬度
    //   height: 500,       // 圖表高度
    //   margin: { t: 0 },  // 設置頂部邊緣為 0，以容納樹狀圖
    //   annotations: [
    //     {
    //       x: 0.5,
    //       y: -0.15,
    //       xref: 'paper',
    //       yref: 'paper',
    //       showarrow: false,
    //       text: 'Dendrogram',
    //     },
    //   ],
    // };
    // Plotly.newPlot('myDiv', [dendrogramData,/* trace */], layout);
  })
</script>