import Papa from 'papaparse';
// import axios from 'axios';
import { Subject, BehaviorSubject } from 'rxjs';
const _papaFun_enrichment$ = new BehaviorSubject({});
const _name_Fun_enrichment$ = new BehaviorSubject([]);
let bio_Process = {name:'Bio_Process',arr:{}};
let cellular = {name:'Cellular', arr:{}};
let KEGG = {name:'KEGG', arr:{}};
let mole_Fun = {name:'Mole_Fun', arr:{}};
let reference_Pub = {name:'Reference_Pub', arr:{}};
const function_Enrichment_file = [];
let bio_Process_site = [], cellular_site=[], KEGG_site=[], mole_Fun_site=[], reference_Pub_site = [];
const handlePapaParse = async (arr, data)=>{
  arr.forEach(async(arrItem)=>{
    const fileName = arrItem.fileName;
    const papaItem = await Papa.parse(arrItem.data.default,{
      delimiter:"\t",
      worker:false,
      header:true,
    });
    if(!data.arr[fileName])data.arr[fileName] = papaItem;
  })
}
const handleHeaders = (arr) => {
  if(!arr) return;
  const headerskey = Object.keys(arr.data[0]);
  return headerskey
};
const searchFunction_enrichment_file = async()=>{
  const assetContent = require.context('../assets/miRNA-seq/Bowtie2/05. target genes functional analysis by STRING',true,/\.tsv$/);
  assetContent.keys().forEach((key)=>{
    const keySplit = key.split(/\//);
    const index = function_Enrichment_file.indexOf(keySplit[1]);
    if(index === -1)function_Enrichment_file.push(keySplit[1]);
  });
  await handle_FE_file(function_Enrichment_file);
  await _name_Fun_enrichment$.next(function_Enrichment_file)
  
}
const handle_FE_file = (saveFilesName)=>{
  saveFilesName.forEach((fileName)=>{
    bio_Process_site.push({
      data:require(`../assets/miRNA-seq/Bowtie2/05. target genes functional analysis by STRING/${fileName}/Biological Process (Gene Ontology).tsv`),
      fileName
    });
    cellular_site.push({
      data:require(`../assets/miRNA-seq/Bowtie2/05. target genes functional analysis by STRING/${fileName}/Cellular Component (Gene Ontology).tsv`),
      fileName
    });
    KEGG_site.push({
      data:require(`../assets/miRNA-seq/Bowtie2/05. target genes functional analysis by STRING/${fileName}/KEGG Pathways.tsv`),
      fileName
    });
    mole_Fun_site.push({
      data:require(`../assets/miRNA-seq/Bowtie2/05. target genes functional analysis by STRING/${fileName}/Molecular Function (Gene Ontology).tsv`),
      fileName
    });
    reference_Pub_site.push({
      data:require(`../assets/miRNA-seq/Bowtie2/05. target genes functional analysis by STRING/${fileName}/Reference publications (PubMed).tsv`),
      fileName
    });
  });
  handleFunctionalAnalysis()
}

const handleFunctionalAnalysis = async() => {
  new Promise(async(resolve, rej)=>{
    await handlePapaParse(bio_Process_site, bio_Process);
    await handlePapaParse(cellular_site, cellular);
    await handlePapaParse(KEGG_site, KEGG);
    await handlePapaParse(mole_Fun_site, mole_Fun);
    await handlePapaParse(reference_Pub_site, reference_Pub);
    const arrObjectKey0 = Object.keys(bio_Process.arr)[0];
    const headers = await handleHeaders(bio_Process.arr[arrObjectKey0]);
    const data = {
        BP:bio_Process.arr,
        MF:mole_Fun.arr,
        CC:cellular.arr,
        KEGG:KEGG.arr,
        pubMed:reference_Pub.arr,
    }
    resolve({headers, data});
    rej('err')
  }).then(async(info)=>{
    await _papaFun_enrichment$.next(info)
  })
}
export const papaDate = {
  searchFunction_enrichment_file,
  name_Fun_enrichment$:_name_Fun_enrichment$.asObservable(),
  papaFun_enrichment$:_papaFun_enrichment$.asObservable(),

}


