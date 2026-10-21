import React from 'react';
import {useParams} from 'react-router-dom';
export function routeHref(to:string,params:Record<string,string>={}) {
 for(const [key,value] of Object.entries(params))to=to.replace('$'+key,value);
 let suffix=to==='/'?'':to.replace(/^\/bu1lders\/?/,'/');
 if(to==='/bu1lders'||to==='/bu1lders/')suffix='/parceiros';
 return import.meta.env.BASE_URL.replace(/\/$/,'')+suffix;
}
export function Link({to,params,children,...props}:any){return <a {...props} href={routeHref(to,params)}>{children}</a>}
export function createFileRoute(_path:string){return (options:any)=>({...options,useParams,options})}
export function notFound(){return new Error('Página não encontrada')}
