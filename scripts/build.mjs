import {execFileSync} from 'node:child_process';
import {mkdir,rm,cp,readFile,writeFile} from 'node:fs/promises';
import path from 'node:path';
const root=process.cwd();const base=process.env.SITE_BASE || '/miind-site/';
await rm('dist',{recursive:true,force:true});
for(const app of ['institucional','bu1lder']){const siteBase=base+(app==='bu1lder'?'bu1lder/':'');execFileSync('npm',['run','build'],{cwd:path.join(root,'apps',app),env:{...process.env,SITE_BASE:siteBase},stdio:'inherit'});}
await cp('apps/institucional/dist','dist',{recursive:true});await cp('apps/bu1lder/dist','dist/bu1lder',{recursive:true});
const niches=['beleza','odontologia','saude','oficinas','pet','restaurantes','imobiliarias','academias','contabilidade','varejo'];
const institution=await readFile('dist/index.html','utf8'),builder=await readFile('dist/bu1lder/index.html','utf8');
for(const route of ['arquivo','portfolio','gramado','tecnologias','blog','blog/admin','termos-de-servico','politica-de-privacidade','unsubscribe']){await mkdir('dist/'+route,{recursive:true});await writeFile('dist/'+route+'/index.html',institution);}
for(const route of ['parceiros',...niches]){await mkdir('dist/bu1lder/'+route,{recursive:true});await writeFile('dist/bu1lder/'+route+'/index.html',builder);}
// Preserve old institutional niche addresses as redirects to the canonical product hierarchy.
for(const prefix of ['builders','bu1lders'])for(const niche of niches){const target=base+'bu1lder/'+niche+'/';await mkdir('dist/'+prefix+'/'+niche,{recursive:true});await writeFile('dist/'+prefix+'/'+niche+'/index.html',`<!doctype html><meta charset="utf-8"><meta http-equiv="refresh" content="0;url=${target}"><a href="${target}">Abrir página</a>`);}
await writeFile('dist/404.html',institution);await writeFile('dist/.nojekyll','');await writeFile('dist/robots.txt','User-agent: *\nDisallow: /\n');
console.log('Static preview ready at '+base);
