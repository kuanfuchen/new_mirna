import { BehaviorSubject, Subject } from 'rxjs';
const _ReadAlignmentSubject$ = new BehaviorSubject({});
const _handleRawReadsFolder$ = new BehaviorSubject({});
const _transferMeg$ = new Subject({});
const _visualization_Plot$ = new BehaviorSubject();
const _CPM_PCA_Info$ = new BehaviorSubject({});
const _DE_Folder_Info$ = new BehaviorSubject({});
const DE_folder_compare_name = [];
const DE_folder_Data = [];
// txt
import pre_alignment_qaqc from '../assets/miRNA-seq/Bowtie2/00. QC (Trim adaptor & Trim base)/01. Raw reads/pre_alignment_qaqc.txt';
import adaptor_trimming from '../assets/miRNA-seq/Bowtie2/00. QC (Trim adaptor & Trim base)/02. Adaptor Trimming/pre_alignment_qaqc.txt';
import base_trimming from '../assets/miRNA-seq/Bowtie2/00. QC (Trim adaptor & Trim base)/03. Base Trimming/pre_alignment_qaqc.txt'
import post_alignment from '../assets/miRNA-seq/Bowtie2/00. QC (Trim adaptor & Trim base)/04. post alignment/post_alignment_qaqc.txt';
import microRNA_counts from '../assets/miRNA-seq/Bowtie2/01. raw reads/microRNA_counts.txt';
import CPM_Normalized_counts from '../assets/miRNA-seq/Bowtie2/02. normalized reads/GSA (CPM)/CPM_Normalized_counts.txt';
import CPM_PCA from '../assets/miRNA-seq/Bowtie2/02. normalized reads/GSA (CPM)/CPM_Normalized_counts_for_PCA_plot.txt'; 


const handleQCReadAlignmentfolder = async() => {
  const readAlignmentTitle = ['Adaptor', 'Adaptor Trimmed','Base Trimming', 'Alignment'];
  const handleFinish_pre_alignment_qaqc = handleSplitTxt(pre_alignment_qaqc);
  const handleFinish_adaptor_trimming = handleSplitTxt(adaptor_trimming);
  const handleFinish_base_trimming = handleSplitTxt(base_trimming);
  const handleFinish_post_alignment = handleSplitTxt(post_alignment);
  const miRNATabs = {
    tabs: readAlignmentTitle,
    tabsTable: [handleFinish_pre_alignment_qaqc, handleFinish_adaptor_trimming, handleFinish_base_trimming, handleFinish_post_alignment]
  }
  await _ReadAlignmentSubject$.next(miRNATabs);
};
const handleRawReadsFolder = () => {
  const microRNA_countTitle = ['Raw_Reads','Normalized_Reads'];
  const handleFinish_microRNA_counts =  handleSplitTxt(microRNA_counts);
  const handleFinish_CPM_Normalized_counts = handleSplitTxt(CPM_Normalized_counts);
  const microRNA_countTab = {
    tabs: microRNA_countTitle,
    tabsTable:[handleFinish_microRNA_counts, handleFinish_CPM_Normalized_counts]
  }
  graphPlotVisualization(handleFinish_CPM_Normalized_counts, microRNA_countTab);
}
const graphPlotVisualization = async(normalized_count, microRNA_countTab)=>{
  if(!normalized_count.headers || !normalized_count.body) return;
  const headersSort = normalized_count.headers.filter((header, i)=> {if(i > 5)return header });
  const normalized_Info = [];
  const normalized_RNA_title = []

  for(let i = 0 ; normalized_count.body.length > i ; i++){
    normalized_Info[i] = [];
    normalized_count.body[i].forEach((body, index)=>{ 
      if(index === 5 ) normalized_RNA_title.push(body);
      if(index > 5){
        const numberBody = Number(body) + 1;
        // if(numberBody === 0){
        //   normalized_Info[i].push(numberBody)
        // }else{
          const log10Body = Math.log10(numberBody);
          normalized_Info[i].push(log10Body)
          // normalized_Info
        // }
    }});
  }
  const microRNA_Info = {
    tabs: microRNA_countTab.tabs,
    tabsTable: microRNA_countTab.tabsTable,
    log: normalized_Info
  };
  await _handleRawReadsFolder$.next(microRNA_Info);
  await _visualization_Plot$.next({headers: headersSort, info: normalized_Info,miRNA_title: normalized_RNA_title});
}
const handleSplitTxt = (tableInfo) => {
  const miRNATable = {
    headers:[],
    body:[]
  };
  const split_tableInfo = tableInfo.split(/\n/);
  for(let i = 0 ; split_tableInfo.length > i ; i++){
    const removeSpace_split_tableInfo = split_tableInfo[i].split(/\t/);
    if(removeSpace_split_tableInfo.length === 1) continue;
    if(i === 0) {
      miRNATable.headers = removeSpace_split_tableInfo;
    }else{
      miRNATable.body[i - 1] = [];
      miRNATable.body[i - 1] = removeSpace_split_tableInfo;
    }
  }
  return miRNATable
};
const handle_CPM_PCA = ()=>{
  const pca_data = handleSplitTxt(CPM_PCA);
  _CPM_PCA_Info$.next(pca_data);
}
const handleDE_Folder = async () => {
  //由於有未知元素命名，故特別命名
  const de_folder_name = '../assets/miRNA-seq/Bowtie2/03. DE miRNAs/';
  const assetContext = require.context( '../assets/miRNA-seq/Bowtie2/03. DE miRNAs/', true, /\.txt$/)
  assetContext.keys().forEach((key) => {
  // const key_index = key.indexOf(/\gene_list.txt/);
    const keySplit = key.split(/\//);
    const keySplitIndex = keySplit.indexOf('gene_list.txt');
    if(keySplitIndex > -1){
      const folderNameIndex = keySplit.length - 2;
      DE_folder_compare_name.push(keySplit[folderNameIndex])
    }
  });
  const DE_txtGroup = [];
  for(let i = 0 ; DE_folder_compare_name.length > i ; i++){
    // const path = de_folder_name + DE_folder_compare_name[i] + '/gene_list.txt';
    const readTxt = require(`../assets/miRNA-seq/Bowtie2/03. DE miRNAs/${DE_folder_compare_name[i]}/gene_list.txt`)
    DE_txtGroup.push(readTxt.default);
  }
  for(let i = 0 ; DE_txtGroup.length > i ; i++){
    const de_txtTableInfo = handleSplitTxt(DE_txtGroup[i]);
    // console.log(de_txtTableInfo, 'de_txtTableInfo');
    de_txtTableInfo.title = DE_folder_compare_name[i];
    DE_folder_Data.push(de_txtTableInfo);
    _DE_Folder_Info$.next({'title_Group': DE_folder_compare_name, 'info': DE_folder_Data});
  }
}
const transferHandleFinishMeg = (handleInfo) => _transferMeg$.next(handleInfo);
export const dataService = {
  handleQCReadAlignmentfolder,
  handleRawReadsFolder,
  handle_CPM_PCA,
  transferHandleFinishMeg,
  handleDE_Folder,
  ReadAlignmentSubject$: _ReadAlignmentSubject$.asObservable(),
  handleRawReadsFolder$: _handleRawReadsFolder$.asObservable(),
  visualization_Plot$: _visualization_Plot$.asObservable(),
  transferMeg$: _transferMeg$.asObservable(),
  CPM_PCA_Info$: _CPM_PCA_Info$.asObservable(),
  DE_Folder_Info$: _DE_Folder_Info$.asObservable(),
} 