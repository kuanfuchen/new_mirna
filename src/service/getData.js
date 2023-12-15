import pre_alignment_qaqc from '../assets/miRNA-seq/Bowtie2/00. QC (Trim adaptor & Trim base)/01. Raw reads/pre_alignment_qaqc.txt';
import adaptor_trimming from '../assets/miRNA-seq/Bowtie2/00. QC (Trim adaptor & Trim base)/02. Adaptor Trimming/pre_alignment_qaqc.txt';
import base_trimming from '../assets/miRNA-seq/Bowtie2/00. QC (Trim adaptor & Trim base)/03. Base Trimming/pre_alignment_qaqc.txt'
import post_alignment from '../assets/miRNA-seq/Bowtie2/00. QC (Trim adaptor & Trim base)/04. post alignment/post_alignment_qaqc.txt';
import microRNA_counts from '../assets/miRNA-seq/Bowtie2/01. raw reads/microRNA_counts.txt';
import CPM_Normalized_counts from '../assets/miRNA-seq/Bowtie2/02. normalized reads/GSA (CPM)/CPM_Normalized_counts.txt';
import CPM_PCA from '../assets/miRNA-seq/Bowtie2/02. normalized reads/GSA (CPM)/CPM_Normalized_counts_for_PCA_plot.txt'; 

export {
  pre_alignment_qaqc,
  adaptor_trimming,
  base_trimming,
  post_alignment,
  microRNA_counts,
  CPM_Normalized_counts,
  CPM_PCA
}