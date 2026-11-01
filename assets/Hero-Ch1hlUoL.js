import{u as w,j as e,m as o,M as y,r as l,C as k,a as N,T as S,A as v,b as C}from"./index-HsYVoRms.js";import{M as I}from"./map-pin-Bd5EA49p.js";import{P as z}from"./phone-CswPacI1.js";import{C as T}from"./chevron-down-DUUNY9Pf.js";import{G as E}from"./github-XD95cR5c.js";import{L}from"./linkedin-CqB7ycFQ.js";import{u as f,a as b,D as M}from"./use-spring-Ce4lFz4p.js";import{L as $}from"./layers-CkmX_D9y.js";const D="/Portfolio/assets/logo1-DfW9syFW.png",h="/Portfolio/pdf/CV_Badie_Gmati_final-français.pdf",R=`
  @keyframes h-grad {
    0%,100% { background-position: 0% 50% }
    50%      { background-position: 100% 50% }
  }
  @keyframes h-spin-cw  { to { transform: rotate(360deg)  } }
  @keyframes h-spin-ccw { to { transform: rotate(-360deg) } }
  @keyframes h-pulse-dot {
    0%,100% { transform: scale(1);   opacity: .9 }
    50%     { transform: scale(1.35); opacity: .5 }
  }
  @keyframes h-float-a {
    0%,100% { transform: translateY(0) rotate(0deg)  }
    50%     { transform: translateY(-14px) rotate(3deg) }
  }
  @keyframes h-float-b {
    0%,100% { transform: translateY(0) rotate(0deg)  }
    50%     { transform: translateY(-18px) rotate(-3deg) }
  }
  @keyframes h-scan {
    0%   { transform: translateY(-100%) }
    100% { transform: translateY(500%)  }
  }
  @keyframes h-shimmer {
    0%   { transform: translateX(-100%) skewX(-12deg) }
    100% { transform: translateX(220%)  skewX(-12deg) }
  }
  @keyframes h-ping {
    0%   { transform: scale(1);   opacity: .55 }
    100% { transform: scale(2.2); opacity: 0   }
  }
  @keyframes h-orbit {
    to { transform: rotate(360deg) }
  }

  .h-grad {
    background-size: 280% 280%;
    animation: h-grad 5s ease infinite;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .h-spin-cw  { animation: h-spin-cw  18s linear infinite }
  .h-spin-ccw { animation: h-spin-ccw 12s linear infinite }
  .h-float-a  { animation: h-float-a  4s ease-in-out infinite }
  .h-float-b  { animation: h-float-b  5s ease-in-out infinite }
  .h-orbit    { animation: h-orbit    12s linear infinite }
  .h-ping     { animation: h-ping     2.4s ease-out infinite }
  .h-pulse-dot{ animation: h-pulse-dot 2s ease-in-out infinite }

  /* Download button shimmer */
  .h-btn-shimmer::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,.14), transparent);
    transform: translateX(-100%) skewX(-12deg);
    pointer-events: none;
  }
  .h-btn-shimmer:hover::after {
    animation: h-shimmer .65s ease forwards;
  }

  /* Stat card hover */
  .h-stat {
    transition: transform .28s cubic-bezier(.34,1.56,.64,1), box-shadow .28s ease;
    will-change: transform;
  }
  .h-stat:hover {
    transform: translateY(-5px) scale(1.04);
    box-shadow: 0 12px 28px rgba(0,0,0,.4);
  }

  /* Social icon */
  .h-social {
    transition: transform .24s cubic-bezier(.34,1.56,.64,1);
    will-change: transform;
  }
  .h-social:hover { transform: translateY(-4px) scale(1.18) }
  .h-social:active{ transform: scale(.9); transition-duration: .1s }

  /* Badge floating */
  .h-badge-a { animation: h-float-a 4.2s ease-in-out infinite }
  .h-badge-b { animation: h-float-b 5.1s ease-in-out infinite }
  .h-badge-c { animation: h-float-a 3.8s ease-in-out infinite }
  .h-badge-d { animation: h-float-b 4.6s ease-in-out infinite }

  /* Scroll indicator */
  .h-scroll-mouse {
    transition: border-color .3s ease;
  }
  .h-scroll-mouse:hover { border-color: rgba(99,102,241,.6) }

  @media (prefers-reduced-motion: reduce) {
    .h-grad, .h-spin-cw, .h-spin-ccw, .h-float-a, .h-float-b,
    .h-orbit, .h-ping, .h-pulse-dot, .h-badge-a, .h-badge-b,
    .h-badge-c, .h-badge-d, .h-stat, .h-social {
      animation: none !important;
      transition: none !important;
      transform: none !important;
    }
  }
`;function B(){return l.useEffect(()=>{const a="hero-styles-v2";if(document.getElementById(a))return;const r=document.createElement("style");return r.id=a,r.textContent=R,document.head.appendChild(r),()=>document.getElementById(a)?.remove()},[]),null}const j=[.16,1,.3,1],Y=[.34,1.56,.64,1],O=[{icon:k,label:"Full-Stack",cls:"h-badge-a",style:{top:"16%",left:"3%"},border:"rgba(59,130,246,.28)",bg:"rgba(59,130,246,.1)",color:"#60a5fa"},{icon:N,label:"Edge AI",cls:"h-badge-b",style:{top:"58%",left:"2%"},border:"rgba(139,92,246,.28)",bg:"rgba(139,92,246,.1)",color:"#a78bfa"},{icon:S,label:"DevOps",cls:"h-badge-c",style:{top:"16%",right:"3%"},border:"rgba(6,182,212,.28)",bg:"rgba(6,182,212,.1)",color:"#22d3ee"},{icon:$,label:"Microservices",cls:"h-badge-d",style:{top:"58%",right:"2%"},border:"rgba(16,185,129,.28)",bg:"rgba(16,185,129,.1)",color:"#34d399"}],A=[{href:"https://github.com/badiegmati",icon:E,label:"GitHub",hoverColor:"#f1f5f9"},{href:"https://www.linkedin.com/in/badie-gmati/",icon:L,label:"LinkedIn",hoverColor:"#60a5fa"},{href:"mailto:badiegmati11@gmail.com",icon:y,label:"Email",hoverColor:"#34d399"}],g=["Ingénieur Full-Stack","Développeur IA Embarquée","Architecte Microservices","Expert Edge AI · Raspberry Pi"],G=[{icon:I,text:"Bouargoub, Nabeul, Tunisie",color:"#f87171"},{icon:y,text:"badiegmati11@gmail.com",color:"#60a5fa"},{icon:z,text:"+216 58 294 838",color:"#4ade80"}],x={hidden:{opacity:0},visible:{opacity:1,transition:{staggerChildren:.09,delayChildren:.18}}},m={hidden:{opacity:0,y:20},visible:{opacity:1,y:0,transition:{duration:.65,ease:j}}};function P(){const a=f(0),r=f(0),t=b(a,{stiffness:75,damping:22}),i=b(r,{stiffness:75,damping:22});return l.useEffect(()=>{const n=s=>{a.set(s.clientX),r.set(s.clientY)};return window.addEventListener("mousemove",n,{passive:!0}),()=>window.removeEventListener("mousemove",n)},[a,r]),e.jsx(o.div,{"aria-hidden":!0,style:{x:t,y:i,translateX:"-50%",translateY:"-50%",position:"fixed",top:0,left:0,zIndex:0,pointerEvents:"none",width:"520px",height:"520px",borderRadius:"50%",filter:"blur(88px)",background:"radial-gradient(circle,rgba(99,102,241,.07),rgba(139,92,246,.04),transparent 70%)",willChange:"transform"}})}function F(){return e.jsxs("div",{className:"absolute inset-0 overflow-hidden pointer-events-none","aria-hidden":!0,children:[e.jsx("div",{className:"absolute inset-0",style:{backgroundImage:"radial-gradient(circle,rgba(148,163,184,.042) 1px,transparent 1px)",backgroundSize:"28px 28px"}}),e.jsx("div",{className:"absolute inset-0 opacity-[0.018]",style:{backgroundImage:`
            linear-gradient(45deg,  #6366f1 .5px, transparent .5px),
            linear-gradient(-45deg, #8b5cf6 .5px, transparent .5px)
          `,backgroundSize:"60px 60px"}})]})}function X({reduced:a}){const r=[{style:{top:"-12%",left:"-10%",width:520,height:520},colors:"#1e40af,#6d28d9",dur:20,dx:70,dy:50},{style:{bottom:"-12%",right:"-10%",width:440,height:440},colors:"#7c3aed,#0e7490",dur:26,dx:-65,dy:-55},{style:{top:"38%",left:"38%",width:260,height:260},colors:"#0891b2,#1e40af",dur:16,dx:35,dy:-35}];return e.jsx("div",{className:"absolute inset-0 pointer-events-none overflow-hidden","aria-hidden":!0,children:r.map((t,i)=>e.jsx(o.div,{animate:a?{}:{x:[0,t.dx,0],y:[0,t.dy,0],scale:[1,1.12,1]},transition:{duration:t.dur,repeat:1/0,ease:"easeInOut",repeatType:"mirror"},className:"absolute rounded-full",style:{...t.style,opacity:.065,filter:"blur(80px)",background:`linear-gradient(135deg,${t.colors})`,willChange:"transform"}},i))})}function V({reduced:a}){return a?null:e.jsx("div",{"aria-hidden":!0,className:"absolute inset-0 pointer-events-none overflow-hidden",style:{zIndex:1},children:e.jsx("div",{style:{position:"absolute",left:0,right:0,height:"120px",background:"linear-gradient(to bottom,transparent,rgba(99,102,241,.018),transparent)",animation:"h-scan 6s linear infinite",willChange:"transform"}})})}function _({reduced:a}){const r=l.useRef(null),t=l.useRef(0),i=l.useCallback(()=>{if(!r.current||t.current>30)return;const n=document.createElement("div"),s=Math.random()*2.5+1.2,c=Math.random()*4500+2800,d=["59,130,246","139,92,246","6,182,212","99,102,241"],p=d[Math.floor(Math.random()*d.length)];Object.assign(n.style,{position:"absolute",width:`${s}px`,height:`${s}px`,borderRadius:"50%",left:`${Math.random()*100}%`,top:`${Math.random()*100}%`,background:`rgba(${p},.72)`,boxShadow:`0 0 ${s*3}px rgba(${p},.55)`,opacity:"0",pointerEvents:"none",willChange:"transform, opacity"});const u=n.animate([{opacity:0,transform:"translateY(0) scale(0)"},{opacity:1,transform:`translateY(${-(Math.random()*70+35)}px) scale(1)`,offset:.38},{opacity:0,transform:`translateY(${-(Math.random()*160+90)}px) scale(.35)`}],{duration:c,easing:"cubic-bezier(.4,0,.2,1)"});r.current.appendChild(n),t.current++,u.onfinish=()=>{n.remove(),t.current--}},[]);return l.useEffect(()=>{if(a)return;const n=setInterval(i,110);return()=>clearInterval(n)},[a,i]),e.jsx("div",{ref:r,"aria-hidden":!0,className:"absolute inset-0 pointer-events-none z-0"})}function H({reduced:a}){return e.jsx(e.Fragment,{children:O.map((r,t)=>e.jsxs(o.div,{initial:{opacity:0,scale:.7},animate:{opacity:1,scale:1},transition:{delay:t*.18+.9,duration:.5,ease:Y},style:{...r.style,position:"absolute"},className:`hidden xl:flex items-center gap-2 px-3.5 py-2
                      rounded-2xl border backdrop-blur-md cursor-default select-none
                      ${a?"":r.cls}`,"aria-hidden":!0,children:[e.jsx("div",{className:"absolute inset-0 rounded-2xl",style:{background:r.bg,border:`1px solid ${r.border}`}}),e.jsx(r.icon,{size:13,style:{color:r.color,position:"relative",zIndex:1}}),e.jsx("span",{style:{color:r.color,fontSize:"11px",fontWeight:600,letterSpacing:".03em",position:"relative",zIndex:1},children:r.label})]},t))})}function W({reduced:a}){const[r,t]=l.useState(!1);return e.jsxs(o.div,{variants:m,className:"relative flex-shrink-0",onMouseEnter:()=>t(!0),onMouseLeave:()=>t(!1),children:[e.jsx("div",{className:`absolute -inset-8 rounded-full pointer-events-none ${a?"":"h-spin-cw"}`,style:{background:"conic-gradient(from 0deg,#3b82f6,#8b5cf6,#06b6d4,#6366f1,#3b82f6)",opacity:.22,filter:"blur(22px)"},"aria-hidden":!0}),e.jsx("div",{className:`absolute -inset-4 rounded-full border border-dashed
                    border-indigo-500/25 pointer-events-none ${a?"":"h-spin-ccw"}`,"aria-hidden":!0}),e.jsx("div",{className:`absolute -inset-2 rounded-full border border-blue-500/18
                    pointer-events-none ${a?"":"h-spin-cw"}`,style:{animationDuration:"22s"},"aria-hidden":!0}),!a&&[0,72,144,216,288].map((i,n)=>e.jsx("div",{"aria-hidden":!0,className:"h-orbit absolute inset-0 rounded-full pointer-events-none",style:{transformOrigin:"50% 50%",animationDelay:`${n*-2.4}s`},children:e.jsx("div",{style:{position:"absolute",top:"50%",left:"50%",width:7,height:7,borderRadius:"50%",background:n%2===0?"rgba(99,102,241,.65)":"rgba(139,92,246,.55)",boxShadow:"0 0 8px rgba(99,102,241,.5)",transform:`rotate(${i}deg) translateX(calc(50% + 142px)) translateY(-50%)`}})},n)),e.jsx(o.div,{whileHover:a?{}:{scale:1.04},transition:{type:"spring",stiffness:240,damping:20},className:"relative w-52 h-52 md:w-60 md:h-60 rounded-full p-[3px]",style:{background:"linear-gradient(135deg,#3b82f6,#8b5cf6,#06b6d4)",boxShadow:"0 0 48px rgba(99,102,241,.28), 0 20px 48px rgba(0,0,0,.45)"},children:e.jsxs("div",{className:"w-full h-full rounded-full overflow-hidden relative",style:{background:"#0a0f1e"},children:[e.jsx("img",{src:D,alt:"Badie Gmati — Ingénieur Logiciel",className:"w-full h-full object-cover",style:{transition:"transform .7s ease"}}),e.jsx(v,{children:r&&e.jsx(o.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.28},className:"absolute inset-0 flex items-end justify-center pb-4",style:{background:"linear-gradient(to top,rgba(10,15,40,.72),transparent)"},children:e.jsx("span",{style:{color:"#e2e8f0",fontSize:"10px",fontWeight:600,letterSpacing:".14em",textTransform:"uppercase"},children:"Badie Gmati"})})})]})}),e.jsx("div",{className:`absolute bottom-3 right-3 w-5 h-5 rounded-full\r
                   border-[2.5px] border-gray-950`,style:{background:"linear-gradient(135deg,#4ade80,#10b981)"},children:!a&&e.jsx("div",{className:"h-ping absolute inset-0 rounded-full",style:{borderColor:"rgba(74,222,128,.4)",border:"1px solid"},"aria-hidden":!0})}),e.jsx(o.div,{initial:{opacity:0,x:16},animate:{opacity:1,x:0},transition:{delay:1.3,duration:.5,ease:j},className:`absolute -right-3 top-5 backdrop-blur-md\r
                   rounded-xl px-3 py-1.5 shadow-xl border`,style:{background:"rgba(9,12,28,.88)",borderColor:"rgba(74,222,128,.22)",boxShadow:"0 4px 16px rgba(0,0,0,.4)"},children:e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("div",{className:`w-1.5 h-1.5 rounded-full ${a?"":"h-pulse-dot"}`,style:{background:"#4ade80"},"aria-hidden":!0}),e.jsx("span",{style:{color:"#4ade80",fontSize:"11px",fontWeight:600},children:"Disponible"})]})})]})}function U(){const[a,r]=l.useState(0),[t,i]=l.useState(""),[n,s]=l.useState(!1),[c,d]=l.useState(!1);return l.useEffect(()=>{const p=g[a];if(c){const u=setTimeout(()=>{s(!0),d(!1)},1800);return()=>clearTimeout(u)}if(!n&&t.length<p.length){const u=setTimeout(()=>i(p.slice(0,t.length+1)),52);return()=>clearTimeout(u)}if(!n&&t.length===p.length){d(!0);return}if(n&&t.length>0){const u=setTimeout(()=>i(t.slice(0,-1)),28);return()=>clearTimeout(u)}n&&t.length===0&&(s(!1),r(u=>(u+1)%g.length))},[t,n,c,a]),e.jsxs("span",{className:"h-grad",style:{backgroundImage:"linear-gradient(90deg,#60a5fa,#818cf8,#a78bfa,#60a5fa)"},children:[t,e.jsx(o.span,{animate:{opacity:[1,0,1]},transition:{duration:.75,repeat:1/0},style:{display:"inline-block",width:"2px",height:"1.1em",background:"#818cf8",borderRadius:"1px",marginLeft:"3px",verticalAlign:"middle"}})]})}function q({onDownload:a}){const[r,t]=l.useState(!1),[i,n]=l.useState(!1),s=async()=>{if(!r){t(!0);try{await a()}catch{}t(!1),n(!0),setTimeout(()=>n(!1),2400)}};return e.jsxs("button",{onClick:s,disabled:r,className:`h-btn-shimmer group relative flex items-center gap-3\r
                 px-7 py-3.5 rounded-2xl font-semibold text-sm\r
                 text-white overflow-hidden border`,style:{background:"linear-gradient(135deg,#2563eb,#4f46e5,#7c3aed)",borderColor:"rgba(255,255,255,.12)",boxShadow:"0 8px 28px rgba(99,102,241,.32), inset 0 1px 0 rgba(255,255,255,.1)",transition:"transform .24s cubic-bezier(.34,1.56,.64,1), box-shadow .24s ease"},onMouseEnter:c=>{c.currentTarget.style.transform="translateY(-3px) scale(1.04)",c.currentTarget.style.boxShadow="0 14px 36px rgba(99,102,241,.44), inset 0 1px 0 rgba(255,255,255,.12)"},onMouseLeave:c=>{c.currentTarget.style.transform="",c.currentTarget.style.boxShadow="0 8px 28px rgba(99,102,241,.32), inset 0 1px 0 rgba(255,255,255,.1)"},children:[e.jsx(v,{mode:"wait",children:r?e.jsx(o.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},className:"w-4 h-4 border-2 rounded-full animate-spin",style:{borderColor:"rgba(255,255,255,.3)",borderTopColor:"#fff"}},"spin"):i?e.jsx(o.span,{initial:{opacity:0,scale:.6},animate:{opacity:1,scale:1},exit:{opacity:0},style:{color:"#86efac",fontSize:"1rem"},children:"✓"},"done"):e.jsx(o.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},children:e.jsx(M,{size:17})},"icon")}),e.jsx("span",{children:i?"Téléchargé !":"Télécharger mon CV"}),e.jsx(C,{size:15,style:{opacity:.7,transition:"transform .28s ease"},className:"group-hover:translate-x-1"})]})}function ne(){const a=w(),r=async()=>{try{const t=await fetch(h);if(!t.ok)throw new Error(`HTTP ${t.status}`);const i=await t.blob(),n=URL.createObjectURL(i),s=document.createElement("a");s.href=n,s.download="CV-Badie-Gmati.pdf",s.style.display="none",document.body.appendChild(s),s.click(),setTimeout(()=>{URL.revokeObjectURL(n),s.remove()},300)}catch(t){console.warn("[Hero] fallback →",t.message),window.open(h,"_blank","noopener,noreferrer")}};return e.jsxs(e.Fragment,{children:[e.jsx(B,{}),e.jsxs("section",{id:"home",className:`relative min-h-screen flex items-center justify-center\r
                   overflow-hidden mt-16`,style:{background:"transparent"},children:[e.jsx(F,{}),e.jsx(X,{reduced:a}),e.jsx(V,{reduced:a}),e.jsx(_,{reduced:a}),e.jsx(P,{}),e.jsx(H,{reduced:a}),e.jsx("div",{className:"container mx-auto px-4 md:px-8 relative z-10 py-16",children:e.jsx(o.div,{variants:x,initial:"hidden",animate:"visible",className:"max-w-5xl mx-auto",children:e.jsxs("div",{className:`flex flex-col lg:flex-row items-center\r
                            gap-12 lg:gap-16 mb-10`,children:[e.jsx(W,{reduced:a}),e.jsxs(o.div,{variants:x,className:"flex-1 text-center lg:text-left",children:[e.jsx(o.div,{variants:m,className:"mb-3",children:e.jsx("h1",{className:"font-black tracking-tight leading-none text-white",style:{fontSize:"clamp(2.6rem,6vw,4.2rem)"},children:e.jsx("span",{className:"h-grad",style:{backgroundImage:"linear-gradient(90deg,#60a5fa 0%,#818cf8 30%,#a78bfa 55%,#f472b6 80%,#60a5fa 100%)"},children:"Badie Gmati"})})}),e.jsx(o.div,{variants:m,className:"mb-5 font-semibold",style:{height:"2.2rem",fontSize:"clamp(1rem,2.2vw,1.35rem)"},children:e.jsx(U,{})}),e.jsxs(o.p,{variants:m,className:"mb-6 mx-auto lg:mx-0 max-w-lg leading-relaxed",style:{color:"#94a3b8",fontSize:"14px"},children:["Diplômé"," ",e.jsx("span",{style:{color:"#a78bfa",fontWeight:600},children:"Génie Logiciel Sciences Informatiques"})," ","avec mention"," ",e.jsx("span",{style:{color:"#fbbf24",fontWeight:700},children:"Très Bien (17/20)"}),"."," ","Spécialisé en Full-Stack et IA embarquée."]}),e.jsx(o.div,{variants:m,className:"flex flex-wrap justify-center lg:justify-start gap-2 mb-7",children:G.map(({icon:t,text:i,color:n},s)=>e.jsxs("div",{className:"flex items-center gap-2 px-3 py-1.5 rounded-full",style:{background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.07)",color:"#94a3b8",fontSize:"11.5px",backdropFilter:"blur(8px)"},children:[e.jsx(t,{size:12,style:{color:n}}),e.jsx("span",{children:i})]},s))}),e.jsxs(o.div,{variants:m,className:`flex flex-col sm:flex-row justify-center\r
                             lg:justify-start gap-3 mb-7`,children:[e.jsx(q,{onDownload:r}),e.jsxs("button",{onClick:()=>document.getElementById("about")?.scrollIntoView({behavior:"smooth"}),className:`group flex items-center justify-center gap-2.5\r
                               px-7 py-3.5 rounded-2xl font-semibold text-sm border`,style:{background:"rgba(255,255,255,.04)",borderColor:"rgba(255,255,255,.09)",color:"#cbd5e1",backdropFilter:"blur(10px)",transition:"background .22s ease, border-color .22s ease, transform .24s cubic-bezier(.34,1.56,.64,1)"},onMouseEnter:t=>{t.currentTarget.style.background="rgba(255,255,255,.07)",t.currentTarget.style.transform="translateY(-2px) scale(1.03)"},onMouseLeave:t=>{t.currentTarget.style.background="rgba(255,255,255,.04)",t.currentTarget.style.transform=""},children:[e.jsx("span",{children:"Découvrir mon profil"}),e.jsx(T,{size:16,style:{opacity:.7},className:"group-hover:translate-y-1 transition-transform duration-300"})]})]}),e.jsxs(o.div,{variants:m,className:"flex justify-center lg:justify-start items-center gap-2.5",children:[e.jsx("span",{style:{color:"#475569",fontSize:"11.5px",marginRight:4},children:"Me retrouver sur"}),A.map(({href:t,icon:i,label:n,hoverColor:s},c)=>e.jsxs("a",{href:t,target:t.startsWith("http")?"_blank":void 0,rel:"noopener noreferrer","aria-label":n,className:"h-social group relative p-2.5 rounded-xl border",style:{background:"rgba(255,255,255,.035)",borderColor:"rgba(255,255,255,.07)",backdropFilter:"blur(8px)"},children:[e.jsx(i,{size:18,style:{color:"#64748b",transition:"color .22s ease"},onMouseEnter:d=>d.currentTarget.style.color=s,onMouseLeave:d=>d.currentTarget.style.color="#64748b"}),e.jsx("span",{className:`absolute -top-8 left-1/2 -translate-x-1/2\r
                                   opacity-0 group-hover:opacity-100\r
                                   transition-opacity duration-200 pointer-events-none\r
                                   text-xs text-white px-2 py-1 rounded-lg whitespace-nowrap`,style:{background:"rgba(9,12,28,.95)",border:"1px solid rgba(255,255,255,.08)"},children:n})]},c))]})]})]})})}),e.jsx(o.div,{initial:{opacity:0},animate:{opacity:1},transition:{delay:1.9,duration:.7},className:"absolute bottom-7 left-1/2 -translate-x-1/2 z-10",children:e.jsxs("div",{className:"h-scroll-mouse flex flex-col items-center gap-2 cursor-pointer group",onClick:()=>document.getElementById("about")?.scrollIntoView({behavior:"smooth"}),children:[e.jsx("div",{className:`w-5 h-9 rounded-full border-2 flex items-start\r
                         justify-center pt-1.5`,style:{borderColor:"rgba(99,102,241,.3)"},children:e.jsx(o.div,{animate:a?{}:{y:[0,10,0],opacity:[1,0,1]},transition:{duration:1.8,repeat:1/0,ease:"easeInOut"},className:"w-[2px] h-2 rounded-full",style:{background:"#818cf8"}})}),e.jsx("span",{style:{color:"#475569",fontSize:"9.5px",letterSpacing:".14em",textTransform:"uppercase",transition:"color .22s ease"},className:"group-hover:!text-slate-400",children:"Scroll"})]})})]})]})}export{ne as default};
