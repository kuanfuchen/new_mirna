<template>
  <div>
    <h2>Workflow</h2>
    <h3> micro RNA-seq analysis method </h3>
    <p>
        
          We processed micro RNA-seq data using the Partek Flow analysis software. Initially, 
          we removed low-quality bases and sequencing adapters from the raw FASTQ files. 
          The trimmed reads were then aligned to the whole genome reference using Bowtie 2. 
          Next, we quantified reads assigned to the miRNA listed in the miRBase (v22) and 
          normalized them to CPM (Counts Per Million). Statistical analysis, hierarchical 
          clustering, and differential expression analysis were performed using the GSA (Gene 
          Specific Analysis) or DESeq2 function in Partek Flow. We further analyzed the results 
          using Qiagen IPA (Ingenuity Pathway Analysis) to acquire target genes of each 
          sequenced miRNA. The target genes derived from the differentially expressed 
          miRNAs can be further explored for their potential role in biological processes or 
          diseases
      </p>
      <div class="d-flex justify-center mt-5">
        <img src="../assets/img/CGMMRC miRNA-seq pipeline.png" alt="" srcset=""  style="width:40vw;">
      </div>
      
      <!-- <v-img
      :width="500"
     
      
      src="../assets/img/CGMMRC miRNA-seq pipeline.png">
      </v-img> -->
  </div>
</template>