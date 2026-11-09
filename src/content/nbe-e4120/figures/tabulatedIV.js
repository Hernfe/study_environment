import { scaleLinear, line } from 'd3';
// Deterministic plot of explicitly supplied table values, never a simulated recording.
export function tabulatedIV({voltages, activation, availability, maximum, conditions, xLabel, yLabel, title}) {
 const w=640,h=330,m={l:70,r:22,t:36,b:52};
 const series=conditions.map(c=>({...c,values:voltages.map((v,i)=>({v,i:maximum*activation[i]**3*(c.noInactivation?1:availability[i])*(v-c.reversal)}))}));
 const values=series.flatMap(s=>s.values.map(p=>p.i));
 const x=scaleLinear().domain([Math.min(...voltages),Math.max(...voltages)]).range([m.l,w-m.r]);
 const y=scaleLinear().domain([Math.min(...values)*1.08,0]).range([h-m.b,m.t]);
 const path=line().x(d=>x(d.v)).y(d=>y(d.i));
 const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const curves=series.map((s,k)=>`<g fill="none" stroke="${k===0?'var(--c-accent)':'currentColor'}" stroke-width="1.5" ${k===2?'stroke-dasharray="5 4"':''}><path d="${path(s.values)}"/>${s.values.map(p=>`<circle cx="${x(p.v)}" cy="${y(p.i)}" r="2"/>`).join('')}</g>`).join('');
 return `<div class="plot" tabindex="0" aria-label="Scrollable table-current plot"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" role="img" aria-label="${escape(title)}" style="min-width:540px;color:var(--c-text)"><text x="${m.l}" y="20" fill="currentColor" font-size="13">${escape(title)}</text><g stroke="currentColor" stroke-width="1"><path d="M${m.l},${m.t}V${h-m.b}H${w-m.r}" fill="none"/></g>${[...new Set([voltages[0],0,voltages.at(-1)])].map(v=>`<text x="${x(v)}" y="${h-m.b+19}" text-anchor="middle" font-size="11" fill="currentColor">${v}</text>`).join('')}${[Math.min(...values),0].map(v=>`<text x="${m.l-7}" y="${y(v)+4}" text-anchor="end" font-size="11" fill="currentColor">${v.toPrecision(3)}</text>`).join('')}<text x="${w/2}" y="${h-10}" text-anchor="middle" font-size="12" fill="currentColor">${escape(xLabel)}</text><text transform="translate(18 ${h/2}) rotate(-90)" text-anchor="middle" font-size="12" fill="currentColor">${escape(yLabel)}</text>${curves}</svg></div>`;
}
