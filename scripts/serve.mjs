import http from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import path from 'node:path';
const root=path.resolve('dist'),prefix='/miind-site';
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp','.avif':'image/avif','.woff2':'font/woff2'};
http.createServer(async(req,res)=>{try{let url=new URL(req.url,'http://localhost');if(url.pathname==='/'){res.writeHead(302,{Location:prefix+'/'});return res.end();}if(!url.pathname.startsWith(prefix+'/')){res.writeHead(404);return res.end();}let f=path.resolve(root,decodeURIComponent(url.pathname.slice(prefix.length+1)));if(f!==root&&!f.startsWith(root+path.sep)){res.writeHead(403);return res.end();}let s=await stat(f);if(s.isDirectory())f=path.join(f,'index.html');res.setHeader('Content-Type',types[path.extname(f)]||'application/octet-stream');res.end(await readFile(f));}catch{res.writeHead(404);res.end('Not found');}}).listen(4173,'127.0.0.1',()=>console.log('http://127.0.0.1:4173/miind-site/'));
