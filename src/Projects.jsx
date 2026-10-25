// Projects.jsx — fusion finale : design d'origine (cube 3D, néon, rubans, images) + FleetDesk (calendrier animé) + CryptoPredict AI (signal animé) + ADAS-DMS Lite (score de risque animé) + Galerie PFE (filtres rôle + lightbox)
// Palette: #3b82f6 · #8b5cf6 · #06b6d4 · #6366f1 · #14b8a6 · Animations: transform + opacité · prefers-reduced-motion respecté

import React, { useState, useRef, useEffect, useMemo } from 'react'
import {
  Github, Database, Globe, GamepadIcon, Cpu, Download, Sparkles, Zap, Terminal, Eye, Camera, Shield,
  X, Car, Server, Smartphone, Gauge, Star, ArrowUpRight, Trophy, Box, Hand, ScanEye, Layers, Brain,
  Fingerprint, Move3d, RotateCcw, CalendarRange, Lock, MousePointer2, Activity,
  TrendingUp, Target, Coins, Signal,
  ChevronLeft, ChevronRight, Maximize2, UserCog, Users2, UserCircle2,
} from 'lucide-react'
import { motion, AnimatePresence, useReducedMotion, useInView } from 'framer-motion'
import image1 from './assets/image1.png'
import image3 from './assets/image4.png'
import cryptoHome from './assets/crypto-home.png'
import cryptoDashboard from './assets/crypto-dashboard.png'
import adasLogin from './assets/adas-login.png'
import adasDashboardGestionnaire from './assets/adas-dashboard-gestionnaire.png'
import adasDashboardConducteur from './assets/adas-dashboard-conducteur.png'

// Captures d'écran du projet PFE (place les fichiers dans src/assets/pfe/)
import alerteConducteur from './assets/pfe/alerte conducteur.jpeg'
import carteGPS from './assets/pfe/Carte GPS.png'
import dashboardAdministrateur from './assets/pfe/Dashboard Administrateur.jpeg'
import dashboardConducteur from './assets/pfe/Dashboard conducteur.jpeg'
import dashboardGestionnaire from './assets/pfe/Dashboard Gestionnaire.png'
import historiqueConducteurA from './assets/pfe/Historique conducteur a.png'
import historiqueConducteurB from './assets/pfe/Historique conducteur b.png'
import interfaceMessagerie from './assets/pfe/Interface de gestion de messagerie.png'
import interfaceGestionConducteurs from './assets/pfe/Interface de gestion des conducteurs.png'
import messageConducteur from './assets/pfe/message conducteur.png'
import profilConducteur from './assets/pfe/Profil conducteur.png'

/* ═══ CSS injecté ═══ */
const STYLES = `
  @keyframes pj-grad{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
  @keyframes pj-spin{to{transform:rotate(360deg)}}
  @keyframes pj-spin-r{to{transform:rotate(-360deg)}}
  @keyframes pj-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
  @keyframes pj-cube{from{transform:rotateX(-20deg) rotateY(0)}to{transform:rotateX(-20deg) rotateY(360deg)}}
  @keyframes pj-neon{0%,100%{box-shadow:0 0 18px var(--nc,rgba(99,102,241,.18)),0 0 36px rgba(139,92,246,.10)}50%{box-shadow:0 0 32px var(--nc,rgba(99,102,241,.32)),0 0 64px rgba(139,92,246,.18)}}
  .pj-gt{background-size:300% 100%;animation:pj-grad 6s ease infinite;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
  .pj-spin{animation:pj-spin 18s linear infinite}.pj-spin-r{animation:pj-spin-r 18s linear infinite}
  .pj-neon{animation:pj-neon 3s ease-in-out infinite}
  .rk-scene{perspective:900px}.rk-rig{animation:pj-bob 4s ease-in-out infinite}
  .rk-cube{position:relative;width:var(--s);height:var(--s);transform-style:preserve-3d;animation:pj-cube 9s linear infinite}
  .rk-f{position:absolute;inset:0;border-radius:calc(var(--s)/10);box-shadow:inset 0 0 0 calc(var(--s)/12) rgba(10,10,20,.55),inset 0 0 0 calc(var(--s)/11) rgba(255,255,255,.09)}
  .rk-f1{background:#e63946;transform:translateZ(calc(var(--s)/2))}
  .rk-f2{background:#f4a300;transform:rotateY(180deg) translateZ(calc(var(--s)/2))}
  .rk-f3{background:#2563eb;transform:rotateY(90deg) translateZ(calc(var(--s)/2))}
  .rk-f4{background:#16a34a;transform:rotateY(-90deg) translateZ(calc(var(--s)/2))}
  .rk-f5{background:#f8fafc;transform:rotateX(90deg) translateZ(calc(var(--s)/2))}
  .rk-f6{background:#facc15;transform:rotateX(-90deg) translateZ(calc(var(--s)/2))}
  @media (prefers-reduced-motion:reduce){.pj-gt,.pj-spin,.pj-spin-r,.pj-neon,.rk-rig,.rk-cube{animation:none!important}}
`
function StyleInject() {
  useEffect(() => {
    if (document.getElementById('pj-pro-v3')) return
    const el = document.createElement('style')
    el.id = 'pj-pro-v3'
    el.textContent = STYLES
    document.head.appendChild(el)
    return () => document.getElementById('pj-pro-v3')?.remove()
  }, [])
  return null
}

const EASE = [0.16, 1, 0.3, 1]
const BACK = [0.34, 1.56, 0.64, 1]
const fadeUp = {
  hidden: { opacity: 0, y: 28, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.65, ease: EASE } },
}
const stagger = (d = 0, c = 0.1) => ({ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: c, delayChildren: d } } })

/* Cube de Rubik 3D (taille en px) */
function Cube({ s = 64 }) {
  return (
    <div className="rk-scene"><div className="rk-rig"><div className="rk-cube" style={{ '--s': `${s}px` }}>
      {[1, 2, 3, 4, 5, 6].map((n) => <div key={n} className={`rk-f rk-f${n}`} />)}
    </div></div></div>
  )
}

/* ═══ Données ═══ */
const FACES = [['#e63946', 'Avant'], ['#f4a300', 'Arrière'], ['#2563eb', 'Droite'], ['#16a34a', 'Gauche'], ['#f8fafc', 'Haut'], ['#facc15', 'Bas']]

const PROJECTS = [
  {
    id: 0, kind: 'pfe', wide: true, featured: true, icon: Car,
    title: 'Système ADAS/DMS Embarqué — PFE',
    description: 'Plateforme embarquée Edge AI sur Raspberry Pi 4 : détection temps réel de 12 comportements dangereux (fatigue, distraction, FCW, LDW), scoring comportemental ML et supervision flotte via web React et mobile Flutter.',
    tech: ['Python', 'YOLOv8n', 'MediaPipe', 'OpenCV', 'Raspberry Pi 4', 'Spring Boot', 'Java 17', 'Supabase', 'PostgreSQL', 'React 18', 'Flutter'],
    features: ['DMS : fatigue (EAR/MAR), distraction, téléphone, ceinture', 'ADAS : anti-collision (FCW) et sortie de voie (LDW)', 'Scoring comportemental par décroissance exponentielle', 'Dashboards React 18 + app Flutter conducteur'],
    side: [['91,6 %', 'Détection'], ['≤130 ms', 'Latence'], ['52/52', 'Endpoints'], ['74/74', 'Tests C10']],
    gradient: 'from-violet-600 via-purple-500 to-indigo-600', color: '#8b5cf6', ribbon: 'Projet PFE', status: 'Alpha Technology · Binôme',
    demo: 'https://badiegmati.github.io/Projet_pfe/', code: 'https://github.com/badiegmati/Projet_pfe',
    modal: {
      sub: 'Edge AI · YOLOv8n · MediaPipe · Spring Boot · React 18 · Flutter',
      intro: "Réalisé en binôme (avec Ahmed Arfaoui) au sein d'Alpha Technology (Ben Arous). Architecture à trois couches : détection embarquée, scoring backend et applications clientes.",
      title1: 'Architecture Edge-to-Cloud',
      screenshots: [
        [dashboardAdministrateur, 'Tableau de bord Administrateur', 'admin'],
        [dashboardGestionnaire, 'Tableau de bord Gestionnaire', 'gestionnaire'],
        [interfaceGestionConducteurs, 'Gestion des conducteurs', 'gestionnaire'],
        [interfaceMessagerie, 'Messagerie (vue gestionnaire)', 'gestionnaire'],
        [dashboardConducteur, 'Tableau de bord Conducteur', 'conducteur'],
        [profilConducteur, 'Profil du conducteur', 'conducteur'],
        [carteGPS, 'Carte GPS des alertes géolocalisées', 'conducteur'],
        [historiqueConducteurA, 'Historique des événements (1/2)', 'conducteur'],
        [historiqueConducteurB, 'Historique des événements (2/2)', 'conducteur'],
        [alerteConducteur, 'Alerte de risque critique', 'conducteur'],
        [messageConducteur, 'Messagerie (vue conducteur)', 'conducteur'],
      ],
      blocks: [
        ['Couche 1 — Embarquée', Camera, '#a78bfa', 'Raspberry Pi 4 · CAM DMS + ADAS · YOLOv8n · MediaPipe FaceMesh · SQLite (store-and-forward)'],
        ['Couche 2 — Backend & scoring', Server, '#60a5fa', 'Spring Boot (JWT) · Edge Function Supabase (score-drivers, pg_cron 02h00)'],
        ['Couche 3 — Applications', Smartphone, '#34d399', 'Dashboard gestionnaire React 18 · application conducteur Flutter 3.22+'],
        ['DMS — Fatigue & distraction', Eye, '#a78bfa', 'EAR/MAR adaptatifs, pose de tête, session téléphone, ceinture (HSV + Hough)'],
        ['ADAS — Collision & voie', Car, '#fbbf24', 'FCW (distance monoculaire + taux de rapprochement) et LDW (Canny + Hough)'],
        ['Scoring comportemental', Gauge, '#34d399', 'Décroissance exponentielle (0,9), 4 niveaux de risque, calcul nocturne'],
      ],
      metrics: [['91,6 %', 'Détection (190 scénarios)'], ['≤130 ms', 'Latence embarquée'], ['52/52', 'Endpoints API validés'], ['74/74', 'Événements test C10']],
      note: "Projet de Fin d'Études (2025–2026), ISIGK. Encadrement académique : M. Abdelbasset Trad. Encadrement professionnel : M. Wassim Smati (Alpha Technology).",
      links: [],
    },
  },
  {
    id: 7, kind: 'fleet', highlight: true, featured: true, neon: 'rgba(59,130,246,.30)', icon: Car,
    title: 'FleetDesk — SaaS Multi-Agences de Gestion de Flotte',
    description: "Plateforme SaaS de location de véhicules : isolation stricte par société (RLS), 4 rôles appliqués par la base, anti double-réservation garanti par PostgreSQL, facturation PDF automatique avec relances, IA optionnelle (Gemini). Déployée sur Vercel + Render + Supabase, sans Docker.",
    tech: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind 4', 'Framer Motion', 'Supabase', 'PostgreSQL', 'RLS', 'Edge Functions', 'Node/Express', 'PDFKit', 'GitHub Actions', 'Vercel', 'Render', 'Gemini'],
    features: ['Calendrier de réservation en temps réel, conflits refusés par la base', 'Contrats signés, états des lieux avec photos, clôture en un clic', 'Facture + PDF automatiques, paiements, relances des retards', 'Assistant IA, prévision de la demande, contrôle des dommages'],
    kpis: [['18', 'tables SQL'], ['36', 'politiques RLS'], ['17', 'tests SQL'], ['3', 'services']],
    chips: [[Shield, 'RLS multi-tenant', '#3b82f6'], [Layers, 'RBAC 4 rôles', '#8b5cf6'], [Zap, 'Facturation auto', '#06b6d4'], [Brain, 'IA Gemini optionnelle', '#6366f1']],
    gradient: 'from-blue-600 via-indigo-500 to-cyan-500', color: '#3b82f6', ribbon: 'SaaS · Production', status: 'Déployé · En ligne',
    demo: 'https://fleetdesk-five.vercel.app/login', code: 'https://github.com/badiegmati/fleetdesk',
    modal: {
      sub: 'Next.js 16 · Supabase/PostgreSQL · Node.js/Express · Vercel · Render',
      intro: "Projet personnel complet : conception, développement full-stack, sécurisation (RLS/RBAC), CI/CD et mise en production. La règle la plus critique — jamais deux réservations qui se chevauchent — est garantie par la base de données, pas seulement par l'interface.",
      title1: 'Architecture et points forts',
      blocks: [
        ['Couche 1 — Frontend', Globe, '#3b82f6', 'Next.js 16 · React 19 · Server Actions · Tailwind 4 · Framer Motion · Vercel'],
        ['Couche 2 — Billing service', Server, '#6366f1', 'Node.js · Express · PDFKit · Nodemailer · node-cron · contrôle JWT et société · Render'],
        ['Couche 3 — Base de données', Database, '#06b6d4', 'Supabase / PostgreSQL 15 · RLS sur toutes les tables · Auth · Storage · Realtime'],
        ['Couche 4 — IA optionnelle', Brain, '#8b5cf6', 'Edge Functions Deno + Gemini : assistant (brouillons à valider), prévision Holt-Winters, dommages'],
        ['Zéro double réservation', CalendarRange, '#06b6d4', "Contrainte EXCLUDE USING gist : deux requêtes simultanées, l'une est refusée (23P01), traduite en message clair."],
        ['Multi-sociétés sécurisé', Lock, '#8b5cf6', '36 politiques RLS, 4 rôles (admin, gestionnaire, agent, comptable), anti-élévation de privilèges, audit.'],
      ],
      metrics: [['17/17', 'Tests SQL réussis'], ['8', 'Migrations'], ['5', 'Jobs CI GitHub Actions'], ['0', 'Docker requis']],
      steps: ['git clone https://github.com/badiegmati/fleetdesk.git', 'cd fleetdesk/web && npm install && npm run dev', 'cd ../billing-service && npm install && npm run dev'],
      note: "Pour tester la démo : crée un compte (confirmation par e-mail), puis clique sur « Charger la démo » sur le tableau de bord. Chaque société est isolée par la RLS.",
      links: [['Résumé détaillé', 'https://github.com/badiegmati/fleetdesk/blob/main/resume.md']],
    },
  },
  {
    id: 3, cube: true, featured: true, neon: 'rgba(99,102,241,.30)', icon: Box,
    title: "Rubik's Cube AR — Contrôle Gestuel",
    description: "Application de réalité augmentée Python : un Rubik's Cube 3×3 flotte devant la caméra et se manipule à la main grâce à MediaPipe Hands. Pincement pour tourner une face, poing pour orbiter, pouce levé pour mélanger.",
    tech: ['Python', 'OpenCV', 'MediaPipe', 'NumPy', 'Kociemba', 'Vision par ordi'],
    features: ['Détection 21 landmarks main (MediaPipe)', 'Pincement pouce+index → tourne la face', 'Poing fermé + déplacement → orbite vue', 'Solveur Kociemba optimal (≤20 moves)', 'Moteur facelets WCA complet validé', 'Rendu 3D + particules + effets visuels'],
    chips: [[Fingerprint, 'Pincement → Face', '#06b6d4'], [Move3d, 'Poing → Orbite', '#8b5cf6'], [Hand, 'Pouce → Mélange', '#3b82f6'], [RotateCcw, 'V → Résolution auto', '#6366f1']],
    ribbon: 'AR · Vision par ordi', gradient: 'from-indigo-500 via-violet-500 to-cyan-500', color: '#6366f1', status: 'AR · Vision',
    code: 'https://github.com/badiegmati/-Rubik-Cube',
    modal: {
      sub: 'Python · OpenCV · MediaPipe · NumPy · Kociemba', hero: 'cube', title1: 'Contrôle gestuel et architecture',
      intro: 'Le moteur reproduit fidèlement les 54 facelets WCA, tous les moves valides (U/D/R/L/F/B + tranches M/E/S + rotations globales) et intègre un solveur Kociemba optimal.',
      blocks: [
        ['Pincement', Fingerprint, '#06b6d4', 'Pouce + index : attrape et tourne une face'],
        ['Poing', Move3d, '#8b5cf6', 'Poing fermé + déplacement : orbite caméra'],
        ['Pouce levé', Hand, '#3b82f6', 'Maintenu ~1 s : mélange aléatoire du cube'],
        ['Vision', Camera, '#06b6d4', 'MediaPipe Hands 21 pts · pipeline OpenCV · YOLOv8 compatible'],
        ['Moteur Cube', Box, '#3b82f6', 'Facelets WCA validées · 26 moves + rotations · solveur Kociemba'],
        ['Rendu 3D', ScanEye, '#6366f1', 'Projection 3D OpenCV · particules et effets · éclairage dynamique'],
      ],
      keys: [['Q / Esc', 'Quitter'], ['S', 'Mélanger'], ['R', 'Réinitialiser'], ['V', 'Résoudre'], ['+/-', 'Zoom'], ['Flèches', 'Orbiter']],
      metrics: [['21', 'Landmarks main'], ['54', 'Facelets WCA'], ['26', 'Moves validés'], ['≤20', 'Moves solution']],
      steps: ['git clone https://github.com/badiegmati/-Rubik-Cube.git', 'pip install -r requirements.txt', 'python main.py'],
      links: [['Télécharger', 'https://github.com/badiegmati/-Rubik-Cube/archive/refs/heads/main.zip']],
    },
  },
  {
    id: 8, kind: 'crypto', highlight: true, featured: false, neon: 'rgba(6,182,212,.30)', icon: TrendingUp,
    title: 'CryptoPredict AI — Prédiction de Prix Crypto Multi-Paires',
    description: "Plateforme de prédiction de prix crypto en temps réel : recherche libre parmi 511 paires Binance USDT actives, ensemble de 3 modèles ML (RandomForest, XGBoost, LightGBM) sur 4 horizons temporels, signal ACHAT/VENTE/ATTENTE avec score de confiance calibré. Edge statistique validé par walk-forward et réplication hors échantillon.",
    tech: ['Python', 'FastAPI', 'SQLAlchemy', 'scikit-learn', 'XGBoost', 'LightGBM', 'pandas', 'Next.js 14', 'TypeScript', 'TailwindCSS', 'Recharts', 'PostgreSQL', 'Supabase', 'Vercel', 'Render'],
    features: ['Recherche libre parmi 511 paires Binance USDT actives', '4 horizons simultanés : 15m, 1h, 1d, 7d', 'Vote pondéré de 3 modèles ML indépendants', 'Dashboard pro : accuracy, backtest P&L, win rate, Sharpe ratio'],
    kpis: [['511', 'paires suivies'], ['3', 'modèles ML'], ['4', 'horizons'], ['38-48%', 'win rate filtré']],
    chips: [[Brain, 'Ensemble ML pondéré', '#06b6d4'], [Target, 'Confiance calibrée', '#3b82f6'], [Activity, 'Backtest walk-forward', '#8b5cf6'], [Shield, 'Rigueur scientifique (CI)', '#10b981']],
    gradient: 'from-cyan-500 via-blue-500 to-indigo-600', color: '#06b6d4', ribbon: 'ML · Full-Stack', status: 'Déployé · En ligne',
    demo: 'https://crypto-predict-ai.vercel.app', code: 'https://github.com/badiegmati/crypto-predict-ai',
    modal: {
      sub: 'FastAPI · scikit-learn/XGBoost/LightGBM · Next.js 14 · Supabase',
      intro: "Projet personnel complet, de la recherche d'edge statistique jusqu'au déploiement : validation rigoureuse (walk-forward, intervalles de confiance, réplication hors échantillon) avant toute mise en production. Aucune donnée de compte Binance requise — API publique uniquement.",
      title1: 'Architecture et pipeline ML',
      blocks: [
        ['Couche 1 — Données', Database, '#06b6d4', 'Binance API publique · 511 paires USDT synchronisées · PostgreSQL via Supabase'],
        ['Couche 2 — Modèles ML', Brain, '#3b82f6', 'RandomForest + XGBoost + LightGBM · vote pondéré · calibration isotonic conditionnelle'],
        ['Couche 3 — API Backend', Server, '#8b5cf6', 'FastAPI · SQLAlchemy · scheduler automatique · déployé sur Render'],
        ['Couche 4 — Frontend', Globe, '#6366f1', 'Next.js 14 · TypeScript · Recharts · recherche libre temps réel · déployé sur Vercel'],
        ['Validation scientifique', Activity, '#10b981', 'Walk-forward 3 folds, intervalles de confiance, réplication 2024-2025 hors échantillon'],
        ['Signal de sortie', Signal, '#f59e0b', "ACHAT / VENTE / ATTENTE + score de confiance, jamais d'accuracy trompeuse affichée"],
      ],
      images: [[cryptoHome, "Page d'accueil — recherche de paires"], [cryptoDashboard, 'Dashboard — signal et métriques']],
      metrics: [['511', 'Paires USDT suivies'], ['38-48%', 'Win rate (vs 33,3% hasard)'], ['4', 'Horizons de prédiction'], ['24', 'Modèles .pkl en production']],
      note: "Edge réel confirmé : 38-48% de win rate sur trades filtrés DOGEUSDT/1h (hasard = 33,3% sur 3 classes), validé par walk-forward et répliqué sur données 2024-2025 hors échantillon. Communiqué sans enjoliver — aucune accuracy trompeuse jamais affichée sans intervalle de confiance complet.",
      links: [],
    },
  },
  {
    id: 9, kind: 'adas', featured: false, neon: 'rgba(20,184,166,.28)', icon: Eye,
    title: 'ADAS-DMS Lite — Supervision du Comportement du Conducteur',
    description: "Projet académique : supervision du comportement du conducteur par vision par ordinateur. Détection de la somnolence et du bâillement par webcam (EAR/MAR), détection du téléphone au volant (YOLOv8n), score de risque calculé par décroissance exponentielle, et trois tableaux de bord par rôle (admin, gestionnaire, conducteur) déployés en production.",
    tech: ['Python', 'OpenCV', 'MediaPipe', 'YOLOv8n', 'Spring Boot 3', 'Java 17', 'Supabase', 'PostgreSQL', 'React 18', 'Vite', 'TailwindCSS', 'Render', 'Vercel'],
    features: [
      'Détection EAR/MAR (somnolence, bâillement) via webcam',
      "Détection du téléphone au volant (YOLOv8n)",
      'Score de risque par décroissance exponentielle',
      'Authentification JWT (cookie httpOnly) et 3 rôles distincts',
    ],
    kpis: [['3', 'Rôles utilisateurs'], ['JWT', 'Cookie httpOnly sécurisé'], ['2', 'Signaux (EAR + MAR)'], ['3', 'Services cloud déployés']],
    chips: [[Shield, 'Isolation par gestionnaire', '#14b8a6'], [Lock, 'JWT httpOnly', '#06b6d4'], [Eye, 'Détection webcam', '#10b981'], [Gauge, 'Score exponentiel', '#22c55e']],
    gradient: 'from-teal-500 via-emerald-500 to-green-600', color: '#14b8a6',
    ribbon: 'Projet académique', status: 'Déployé · En ligne',
    demo: 'https://adas-dms-lite.vercel.app',
    modal: {
      sub: 'Python · MediaPipe · YOLOv8n · Spring Boot 3 · React 18 · Supabase',
      intro: "Projet universitaire autonome (version simplifiée, sans matériel embarqué ni machine learning avancé) : un client de détection en Python écrit directement les alertes dans Supabase, un backend Spring Boot sécurise l'accès aux données par rôle, et un frontend React affiche trois tableaux de bord distincts.",
      title1: 'Architecture et captures du projet',
      images: [
        [adasLogin, 'Page de connexion'],
        [adasDashboardGestionnaire, 'Dashboard gestionnaire — carte Leaflet'],
        [adasDashboardConducteur, 'Dashboard conducteur'],
      ],
      blocks: [
        ['Client de détection', Camera, '#14b8a6', 'Python + OpenCV + MediaPipe Face Mesh : calcul EAR/MAR, YOLOv8n pour la détection du téléphone, écriture directe des alertes dans Supabase'],
        ['Backend API', Server, '#06b6d4', 'Spring Boot 3 / Java 17 : authentification JWT (cookie httpOnly), routes par rôle, calcul du score de risque en SQL'],
        ['Base de données', Database, '#10b981', 'Supabase / PostgreSQL managé, source unique de vérité partagée entre le client Python et le backend'],
        ['Frontend', Globe, '#22c55e', 'React 18 + Vite + TailwindCSS : 3 tableaux de bord par rôle, carte Leaflet/OpenStreetMap'],
        ['Sécurité', Shield, '#06b6d4', 'Isolation stricte des données entre gestionnaires, vérifiée par tests manuels (accès refusé 401/403)'],
        ['Déploiement', Zap, '#14b8a6', 'Backend conteneurisé (Docker) sur Render, frontend statique sur Vercel, cookie cross-domain SameSite=None'],
      ],
      metrics: [],
      note: "Projet académique réalisé en complément du PFE, dans une version volontairement simplifiée : pas de matériel embarqué, pas de modèle de machine learning entraîné, pas d'application mobile. L'objectif était de maîtriser l'ensemble de la chaîne (détection, backend, frontend, déploiement cloud) sur un périmètre réduit.",
      links: [],
    },
  },
  {
    id: 1, icon: Globe,
    title: 'Réservation Hôtelière Full-Stack',
    description: "Plateforme web complète de réservation d'hôtels — interface SSR/SSG moderne, auth, PostgreSQL et score Lighthouse > 90.",
    tech: ['Next.js', 'React', 'TailwindCSS', 'Supabase', 'PostgreSQL', 'JavaScript'],
    features: ['Responsive Design', 'REST API', 'Authentification', 'Temps réel'],
    gradient: 'from-blue-500 via-cyan-500 to-purple-600', color: '#3b82f6', status: 'Complet',
    demo: 'https://badiegmati.github.io/Chi5a/', code: 'https://github.com/badiegmati/Chi5a',
  },
  {
    id: 2, icon: GamepadIcon,
    title: 'Tic-Tac-Toe AI — Jeu Python',
    description: 'Jeu de morpion avec IA avancée (Minimax). Interface Kivy professionnelle, 3 niveaux de difficulté.',
    tech: ['Python', 'Kivy', 'IA Minimax', 'Algorithmes', 'OOP', 'AI/ML'],
    features: ['Interface Kivy moderne', "3 niveaux d'IA", 'Algorithme Minimax optimisé', 'Système de score persistant'],
    gradient: 'from-green-500 via-emerald-500 to-cyan-600', color: '#10b981', status: 'Actif',
    code: 'https://github.com/badiegmati/TicTacToe-AI',
    modal: {
      sub: 'Python · Kivy · Minimax', intro: 'Ce jeu Python nécessite une installation locale. Voici comment le tester :', title1: 'Fonctionnalités',
      images: [[image1, 'Interface du jeu'], [image3, 'Écran de victoire']],
      blocks: [
        ['Interface Kivy', GamepadIcon, '#10b981', 'Interface moderne, animations fluides, choix du symbole X/O'],
        ['IA Minimax', Brain, '#06b6d4', "3 niveaux d'IA, algorithme Minimax optimisé"],
        ['Score persistant', Trophy, '#f59e0b', 'Sauvegarde des scores entre les parties'],
      ],
      metrics: [], steps: ['git clone https://github.com/badiegmati/TicTacToe-AI.git', 'pip install kivy', 'python main.py'],
      links: [['Télécharger', 'https://github.com/badiegmati/TicTacToe-AI/archive/refs/heads/main.zip']],
    },
  },
  {
    id: 4, icon: Trophy,
    title: 'Quiz Interactif — Corsair',
    description: 'Application de quiz gamifiée sur la marque Corsair : inscription utilisateur, timer 11s par question, scoring en temps réel, résultats détaillés et persistance via Supabase.',
    tech: ['React', 'TypeScript', 'Supabase', 'PostgreSQL', 'TailwindCSS', 'Vite'],
    features: ['Timer 11s avec compte à rebours visuel', '10 questions aléatoires sur Corsair Gaming', 'Résultats détaillés avec correction et grade', 'Persistance des scores via Supabase'],
    gradient: 'from-amber-500 via-orange-500 to-red-500', color: '#f59e0b', status: 'Complet',
    demo: 'https://badiegmati.github.io/quiz-with-timer/', code: 'https://github.com/badiegmati/quiz-with-timer',
  },
  {
    id: 5, icon: Smartphone,
    title: 'Application Mobile Angular',
    description: 'Application mobile cross-platform Angular avec fonctionnalités avancées et design responsive.',
    tech: ['Angular', 'TypeScript', 'CSS3', 'API REST', 'RxJS', 'NgRx'],
    features: ['PWA', 'Offline Support', 'Push Notifications', 'Material Design'],
    gradient: 'from-purple-500 via-pink-500 to-rose-600', color: '#a855f7', status: 'En développement',
  },
  {
    id: 6, icon: Database,
    title: 'Plateforme Data Python',
    description: "Dashboard d'analyse de données Flask + MongoDB + D3.js. Visualisations interactives et export multi-format.",
    tech: ['Python', 'MongoDB', 'Flask', 'HTML/CSS', 'D3.js', 'Pandas'],
    features: ['Dashboard interactif', 'Analyse temps réel', 'Export données', 'Visualisations'],
    gradient: 'from-orange-500 via-red-500 to-amber-600', color: '#f97316', status: 'En développement',
  },
]

/* ═══ Calendrier animé (FleetDesk) ═══ */
const DAYS = 14
const pct = (n) => `${(n / DAYS) * 100}%`
const ROWS = [
  { p: '201 TN 4521', b: [[1, 5, 'Ben Salah', '#3b82f6'], [7, 11, 'Dupont', '#8b5cf6']] },
  { p: '202 TN 7733', b: [[2, 7, 'Trabelsi', '#8b5cf6']], x: [5, 9] },
  { p: '301 TN 6610', b: [[4, 8, 'Rossi', '#06b6d4'], [10, 14, 'Gharbi', '#3b82f6']] },
]
function Timeline({ inView, reduced }) {
  const cyc = { duration: 4.8, repeat: Infinity, repeatDelay: 0.8, delay: 1.8 }
  return (
    <div>
      <div className="overflow-hidden rounded-xl border border-white/[0.07]" style={{ background: 'rgba(4,8,22,.72)' }}
        role="img" aria-label="Calendrier : trois véhicules sur quatorze jours, une réservation en conflit refusée par la base">
        <div className="grid grid-cols-[88px_1fr] border-b border-white/[0.06] text-[9px] text-gray-500">
          <span className="px-2 py-1.5">Véhicule</span>
          <div className="grid" style={{ gridTemplateColumns: `repeat(${DAYS},1fr)` }}>
            {Array.from({ length: DAYS }, (_, i) => <span key={i} className="border-l border-white/[0.05] py-1.5 text-center">{i + 1}</span>)}
          </div>
        </div>
        {ROWS.map((r, ri) => (
          <div key={r.p} className="grid grid-cols-[88px_1fr] border-b border-white/[0.05] last:border-b-0">
            <span className="flex items-center px-2 font-mono text-[10px] text-gray-400">{r.p}</span>
            <div className="relative h-10">
              {r.b.map(([s, e, n, c], i) => (
                <motion.div key={i} initial={reduced ? false : { opacity: 0, scaleX: 0 }}
                  animate={inView || reduced ? { opacity: 1, scaleX: 1 } : {}}
                  transition={{ delay: 0.25 + ri * 0.18 + i * 0.2, duration: 0.55, ease: EASE }}
                  className="absolute bottom-1.5 top-1.5 flex items-center overflow-hidden whitespace-nowrap rounded-md px-1.5 text-[10px] font-semibold text-white shadow-md"
                  style={{ left: pct(s - 1), width: pct(e - s + 1), background: c, originX: 0 }}>{n}</motion.div>
              ))}
              {r.x && (
                <motion.div className="absolute bottom-1 top-1 z-[5] overflow-hidden whitespace-nowrap rounded-md border-[1.5px] border-dashed text-[10px] font-bold"
                  style={{ left: pct(r.x[0] - 1), width: pct(r.x[1] - r.x[0] + 1), borderColor: '#f59e0b', color: '#fbbf24', background: 'repeating-linear-gradient(45deg,rgba(245,158,11,.1),rgba(245,158,11,.1) 6px,rgba(245,158,11,.22) 6px,rgba(245,158,11,.22) 12px)' }}
                  initial={{ opacity: reduced ? 1 : 0 }}
                  animate={reduced ? {} : inView ? { opacity: [0, 1, 1, 0] } : {}}
                  transition={{ ...cyc, times: [0, 0.12, 0.85, 1] }}>
                  <motion.span className="flex h-full items-center px-1.5"
                    animate={reduced || !inView ? {} : { x: [0, 0, -6, 6, -4, 4, 0, 0] }}
                    transition={{ ...cyc, times: [0, 0.14, 0.18, 0.22, 0.26, 0.3, 0.34, 1] }}>Refusé · 23P01</motion.span>
                </motion.div>
              )}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-2.5 text-[11px] leading-relaxed text-gray-500">Deux agents réservent le même véhicule : PostgreSQL accepte la première demande et refuse la seconde.</p>
    </div>
  )
}

/* ═══ Démo signal animée (CryptoPredict AI) ═══ */
const HORIZONS = ['15m', '1h', '1d', '7d']
const SIGNALS = [
  { label: 'ACHAT', color: '#10b981', conf: 0.62 },
  { label: 'ATTENTE', color: '#f59e0b', conf: 0.38 },
  { label: 'VENTE', color: '#ef4444', conf: 0.54 },
  { label: 'ATTENTE', color: '#f59e0b', conf: 0.41 },
]
function SignalTicker({ inView, reduced }) {
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    if (reduced) return
    const t = setInterval(() => setIdx((i) => (i + 1) % SIGNALS.length), 2600)
    return () => clearInterval(t)
  }, [reduced])
  const s = SIGNALS[idx]
  return (
    <div className="overflow-hidden rounded-xl border border-white/[0.07] p-5" style={{ background: 'rgba(4,8,22,.72)' }}
      role="img" aria-label="Demonstration animee d'un signal de prediction avec score de confiance">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Coins size={15} className="text-cyan-400" />
          <span className="font-mono text-sm font-bold text-white">DOGEUSDT</span>
        </div>
        <div className="flex gap-1">
          {HORIZONS.map((h, i) => (
            <span key={h} className="rounded-md px-2 py-0.5 text-[10px] font-semibold transition-colors"
              style={{ background: i === idx % 4 ? 'rgba(6,182,212,.18)' : 'rgba(255,255,255,.04)', color: i === idx % 4 ? '#22d3ee' : '#6b7280' }}>{h}</span>
          ))}
        </div>
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={idx} initial={reduced ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.4 }}
          className="mb-3 flex items-center gap-3">
          <span className="rounded-lg px-3 py-1.5 text-sm font-black tracking-wide" style={{ background: `${s.color}22`, color: s.color, border: `1px solid ${s.color}55` }}>{s.label}</span>
          <span className="text-xs text-gray-500">Signal ensemble (RF + XGBoost + LightGBM)</span>
        </motion.div>
      </AnimatePresence>
      <div className="mb-1.5 flex items-center justify-between text-[11px] text-gray-500">
        <span>Score de confiance</span><span className="font-mono font-semibold text-gray-300">{Math.round(s.conf * 100)}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-white/[0.06]">
        <motion.div className="h-full rounded-full" style={{ background: s.color }}
          initial={reduced ? false : { width: '0%' }} animate={{ width: `${s.conf * 100}%` }} transition={{ duration: 0.9, ease: EASE }} />
      </div>
      <p className="mt-3 text-[11px] leading-relaxed text-gray-500">Simulation illustrative du cycle de signal (le site en production affiche les vraies predictions calculees par les modeles).</p>
    </div>
  )
}

/* ═══ Démo score de risque animée (ADAS-DMS Lite) ═══ */
const ALERTES_ADAS = [
  { label: 'RAS — conduite normale', color: '#10b981', score: 94 },
  { label: 'Bâillement détecté', color: '#f59e0b', score: 76 },
  { label: 'Somnolence (EAR bas)', color: '#ef4444', score: 52 },
  { label: 'Téléphone au volant', color: '#ef4444', score: 61 },
]
function RiskScoreDemo({ inView, reduced }) {
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    if (reduced) return
    const t = setInterval(() => setIdx((i) => (i + 1) % ALERTES_ADAS.length), 2600)
    return () => clearInterval(t)
  }, [reduced])
  const a = ALERTES_ADAS[idx]
  return (
    <div className="overflow-hidden rounded-xl border border-white/[0.07] p-5" style={{ background: 'rgba(4,8,22,.72)' }}
      role="img" aria-label="Démonstration animée du score de risque et des alertes de supervision">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Eye size={15} className="text-teal-400" />
          <span className="font-mono text-sm font-bold text-white">Conducteur C10</span>
        </div>
        <span className="rounded-md px-2 py-0.5 text-[10px] font-semibold" style={{ background: 'rgba(20,184,166,.15)', color: '#2dd4bf' }}>webcam active</span>
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={idx} initial={reduced ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.4 }}
          className="mb-3 flex items-center gap-3">
          <span className="rounded-lg px-3 py-1.5 text-sm font-black tracking-wide" style={{ background: `${a.color}22`, color: a.color, border: `1px solid ${a.color}55` }}>{a.label}</span>
        </motion.div>
      </AnimatePresence>
      <div className="mb-1.5 flex items-center justify-between text-[11px] text-gray-500">
        <span>Score de risque</span><span className="font-mono font-semibold text-gray-300">{a.score}/100</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-white/[0.06]">
        <motion.div className="h-full rounded-full" style={{ background: a.color }}
          initial={reduced ? false : { width: '0%' }} animate={{ width: `${a.score}%` }} transition={{ duration: 0.9, ease: EASE }} />
      </div>
      <p className="mt-3 text-[11px] leading-relaxed text-gray-500">Simulation illustrative du cycle d'alerte (le score réel décroît exponentiellement après chaque événement détecté par le client Python).</p>
    </div>
  )
}

/* ═══ Galerie de captures — PFE ADAS/DMS ═══ */
const PFE_ROLES = [
  { k: 'tous', l: 'Toutes', icon: ScanEye, color: '#a78bfa' },
  { k: 'admin', l: 'Administrateur', icon: UserCog, color: '#a78bfa' },
  { k: 'gestionnaire', l: 'Gestionnaire', icon: Users2, color: '#22d3ee' },
  { k: 'conducteur', l: 'Conducteur', icon: UserCircle2, color: '#fb7185' },
]

function ScreenshotGallery({ screenshots, reduced }) {
  const [cat, setCat] = useState('tous')
  const [lightbox, setLightbox] = useState(null)
  const filtered = cat === 'tous' ? screenshots : screenshots.filter((s) => s[2] === cat)
  const roleColor = (k) => PFE_ROLES.find((r) => r.k === k)?.color || '#a78bfa'

  useEffect(() => {
    if (lightbox === null) return
    const k = (e) => {
      if (e.key === 'Escape') setLightbox(null)
      if (e.key === 'ArrowRight') setLightbox((i) => (i + 1) % filtered.length)
      if (e.key === 'ArrowLeft') setLightbox((i) => (i - 1 + filtered.length) % filtered.length)
    }
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [lightbox, filtered.length])

  return (
    <div>
      {/* Filtres par rôle */}
      <div className="mb-4 flex flex-wrap gap-1.5">
        {PFE_ROLES.map((r) => {
          const count = r.k === 'tous' ? screenshots.length : screenshots.filter((s) => s[2] === r.k).length
          return (
            <button key={r.k} onClick={() => { setCat(r.k); setLightbox(null) }}
              className="relative flex items-center gap-1.5 overflow-hidden rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors duration-200"
              style={{ color: cat === r.k ? '#fff' : '#9ca3af', background: cat === r.k ? 'transparent' : 'rgba(255,255,255,.04)' }}>
              {cat === r.k && (
                <motion.div layoutId="pfe-role-filter" className="absolute inset-0"
                  style={{ background: `linear-gradient(90deg,${r.color}dd,${r.color}99)` }}
                  transition={{ type: 'spring', stiffness: 340, damping: 28 }} />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <r.icon size={13} />{r.l}
                <span className="rounded-full bg-black/25 px-1.5 text-[10px]">{count}</span>
              </span>
            </button>
          )
        })}
      </div>

      {/* Grille de vignettes */}
      <motion.div layout className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map(([src, label, c], i) => (
            <motion.button key={src} layout type="button" onClick={() => setLightbox(i)}
              initial={{ opacity: 0, y: 14, scale: 0.92 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: reduced ? 0 : i * 0.04, duration: 0.4, ease: EASE }}
              whileHover={reduced ? {} : { y: -4, scale: 1.02 }}
              className="group relative overflow-hidden rounded-xl border text-left"
              style={{ borderColor: `${roleColor(c)}35`, boxShadow: `0 8px 24px ${roleColor(c)}14` }}>
              <img src={src} alt={label} loading="lazy"
                className="h-32 w-full object-cover object-top transition-transform duration-500 group-hover:scale-110 sm:h-36" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent opacity-85 transition-opacity duration-300 group-hover:opacity-95" />
              <div className="absolute inset-x-0 bottom-0 p-2">
                <span className="mb-1 inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide"
                  style={{ background: `${roleColor(c)}2a`, color: roleColor(c) }}>
                  {PFE_ROLES.find((r) => r.k === c)?.l}
                </span>
                <p className="text-[11px] font-medium leading-tight text-white">{label}</p>
              </div>
              <div className="absolute right-1.5 top-1.5 rounded-lg bg-black/40 p-1 opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100">
                <Maximize2 size={12} className="text-white" />
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox plein écran */}
      <AnimatePresence>
        {lightbox !== null && filtered[lightbox] && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 p-4 backdrop-blur-2xl"
            onClick={() => setLightbox(null)}>
            <button onClick={() => setLightbox(null)} aria-label="Fermer"
              className="absolute right-5 top-5 rounded-xl border border-white/10 bg-white/5 p-2.5 text-white transition hover:bg-white/10">
              <X size={20} />
            </button>
            <button onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + filtered.length) % filtered.length) }}
              aria-label="Précédent"
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-white/5 p-2.5 text-white transition hover:bg-white/15 md:left-6">
              <ChevronLeft size={22} />
            </button>
            <button onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % filtered.length) }}
              aria-label="Suivant"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-white/5 p-2.5 text-white transition hover:bg-white/15 md:right-6">
              <ChevronRight size={22} />
            </button>
            <motion.div key={lightbox} initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25, ease: EASE }} onClick={(e) => e.stopPropagation()}
              className="flex max-h-[88vh] max-w-4xl flex-col items-center gap-4">
              <img src={filtered[lightbox][0]} alt={filtered[lightbox][1]}
                className="max-h-[75vh] rounded-xl border border-white/10 object-contain shadow-2xl" />
              <div className="flex flex-wrap items-center justify-center gap-3 text-center">
                <span className="rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide"
                  style={{ background: `${roleColor(filtered[lightbox][2])}2a`, color: roleColor(filtered[lightbox][2]) }}>
                  {PFE_ROLES.find((r) => r.k === filtered[lightbox][2])?.l}
                </span>
                <p className="text-sm font-medium text-white">{filtered[lightbox][1]}</p>
                <span className="font-mono text-xs text-gray-500">{lightbox + 1}/{filtered.length}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ═══ Modal détaillé (piloté par les données) ═══ */
function DetailModal({ project, onClose, reduced }) {
  const m = project?.modal
  useEffect(() => {
    if (!project) return
    document.body.style.overflow = 'hidden'
    const k = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', k)
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', k) }
  }, [project, onClose])

  const act = 'flex min-w-[150px] flex-1 items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.05] px-5 py-3 text-sm font-medium text-white transition hover:bg-white/[0.09]'
  return (
    <AnimatePresence>
      {project && m && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.22 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-xl" onClick={onClose}>
          <motion.div role="dialog" aria-modal="true" aria-label={project.title}
            initial={{ scale: 0.93, opacity: 0, y: 28 }} animate={{ scale: 1, opacity: 1, y: 0, transition: { type: 'spring', damping: 26, stiffness: 300 } }}
            exit={{ scale: 0.96, opacity: 0, y: 12, transition: { duration: 0.18 } }}
            className="relative max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-2xl border shadow-2xl"
            style={{ borderColor: `${project.color}45`, boxShadow: `0 40px 120px ${project.color}2e`, backdropFilter: 'blur(32px)',
              background: `linear-gradient(145deg,${project.color}16 0%,rgba(13,20,42,.97) 45%,rgba(8,10,20,.99) 100%)` }}
            onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b p-6 backdrop-blur-2xl" style={{ borderColor: `${project.color}30`, background: 'rgba(6,10,26,.94)' }}>
              <div className="flex items-center gap-4">
                {project.cube ? <Cube s={44} /> : <div className={`rounded-xl bg-gradient-to-br ${project.gradient} p-2.5`}><project.icon className="text-white" size={22} /></div>}
                <div><h3 className="text-lg font-bold leading-tight text-white">{project.title}</h3><p className="mt-0.5 text-xs text-gray-400">{m.sub}</p></div>
              </div>
              <button onClick={onClose} aria-label="Fermer" className="flex-shrink-0 rounded-xl border border-white/[0.08] bg-white/[0.05] p-2 text-gray-400 transition hover:bg-white/[0.09] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"><X size={18} /></button>
            </div>

            <div className="space-y-9 p-8">
              {m.hero === 'cube' ? (
                <div className="grid items-center gap-8 md:grid-cols-2">
                  <motion.div initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15, duration: 0.8, ease: BACK }} className="flex flex-col items-center gap-6">
                    <div className="relative flex h-44 items-center justify-center">
                      <div className="absolute h-28 w-28 rounded-full blur-3xl" style={{ background: 'radial-gradient(circle,rgba(99,102,241,.4),rgba(6,182,212,.2),transparent)' }} />
                      <Cube s={110} />
                    </div>
                    <div className="grid w-full max-w-[220px] grid-cols-3 gap-2">
                      {FACES.map(([c, n]) => <div key={n} className="flex items-center gap-1.5 rounded-lg border border-white/[0.06] px-2 py-1.5" style={{ background: 'rgba(255,255,255,.03)' }}><div className="h-3 w-3 flex-shrink-0 rounded-sm" style={{ background: c, boxShadow: `0 0 6px ${c}60` }} /><span className="text-[10px] text-gray-400">{n}</span></div>)}
                    </div>
                  </motion.div>
                  <div className="space-y-5">
                    <p className="text-sm leading-relaxed text-gray-300">{m.intro}</p>
                    {m.keys && (
                      <div className="rounded-xl border border-white/[0.06] p-4" style={{ background: 'rgba(255,255,255,.02)' }}>
                        <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-300"><MousePointer2 size={13} className="text-indigo-400" />Contrôles clavier</div>
                        <div className="grid grid-cols-2 gap-1.5">{m.keys.map(([k, v]) => <div key={k} className="flex items-center gap-2"><kbd className="rounded-md border border-white/[0.12] bg-white/[0.06] px-1.5 py-0.5 font-mono text-[10px] font-bold text-white">{k}</kbd><span className="text-[11px] text-gray-500">{v}</span></div>)}</div>
                      </div>
                    )}
                  </div>
                </div>
              ) : <p className="text-sm leading-relaxed text-gray-300">{m.intro}</p>}

              {project.kind === 'pfe' && m.screenshots && (
                <div>
                  <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-white">
                    <Camera size={16} style={{ color: project.color }} />Captures d'écran de l'application
                  </div>
                  <ScreenshotGallery screenshots={m.screenshots} reduced={reduced} />
                </div>
              )}

              {project.kind === 'fleet' && (
                <div className="space-y-6">
                  <div>
                    <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
                      <Zap size={16} style={{ color: project.color }} />Points forts
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.chips.map(([I, l, c]) => (
                        <motion.div key={l} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
                          className="flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium"
                          style={{ borderColor: `${c}30`, background: `${c}0d`, color: c }}>
                          <I size={13} />{l}
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
                      <Gauge size={16} style={{ color: project.color }} />Indicateurs clés
                    </div>
                    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                      {project.kpis.map(([v, l], i) => (
                        <motion.div key={l} initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.1 + i * 0.06, type: 'spring', stiffness: 200 }}
                          className="rounded-xl border border-white/[0.06] p-4 text-center" style={{ background: 'rgba(255,255,255,.03)' }}>
                          <div className="text-xl font-black tabular-nums" style={{ color: project.color }}>{v}</div>
                          <div className="text-[11px] text-gray-500">{l}</div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
                      <CalendarRange size={16} style={{ color: project.color }} />Calendrier de réservation en direct
                    </div>
                    <Timeline inView reduced={reduced} />
                  </div>
                </div>
              )}

              {project.kind === 'crypto' && (
                <div className="space-y-6">
                  <div>
                    <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
                      <Zap size={16} style={{ color: project.color }} />Points forts
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.chips.map(([I, l, c]) => (
                        <motion.div key={l} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
                          className="flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium"
                          style={{ borderColor: `${c}30`, background: `${c}0d`, color: c }}>
                          <I size={13} />{l}
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
                      <Gauge size={16} style={{ color: project.color }} />Indicateurs clés
                    </div>
                    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                      {project.kpis.map(([v, l], i) => (
                        <motion.div key={l} initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.1 + i * 0.06, type: 'spring', stiffness: 200 }}
                          className="rounded-xl border border-white/[0.06] p-4 text-center" style={{ background: 'rgba(255,255,255,.03)' }}>
                          <div className="text-xl font-black tabular-nums" style={{ color: project.color }}>{v}</div>
                          <div className="text-[11px] text-gray-500">{l}</div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
                      <Signal size={16} style={{ color: project.color }} />Démo signal en direct
                    </div>
                    <SignalTicker inView reduced={reduced} />
                  </div>
                </div>
              )}

              {project.kind === 'adas' && (
                <div className="space-y-6">
                  <div>
                    <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
                      <Zap size={16} style={{ color: project.color }} />Points forts
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.chips.map(([I, l, c]) => (
                        <motion.div key={l} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
                          className="flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium"
                          style={{ borderColor: `${c}30`, background: `${c}0d`, color: c }}>
                          <I size={13} />{l}
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
                      <Gauge size={16} style={{ color: project.color }} />Indicateurs clés
                    </div>
                    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                      {project.kpis.map(([v, l], i) => (
                        <motion.div key={l} initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.1 + i * 0.06, type: 'spring', stiffness: 200 }}
                          className="rounded-xl border border-white/[0.06] p-4 text-center" style={{ background: 'rgba(255,255,255,.03)' }}>
                          <div className="text-xl font-black tabular-nums" style={{ color: project.color }}>{v}</div>
                          <div className="text-[11px] text-gray-500">{l}</div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
                      <Activity size={16} style={{ color: project.color }} />Supervision en direct
                    </div>
                    <RiskScoreDemo inView reduced={reduced} />
                  </div>
                </div>
              )}

              {m.images && (
                <div className="grid gap-4 md:grid-cols-2">
                  {m.images.map(([src, label], i) => (
                    <motion.div key={label} initial={{ opacity: 0, x: i ? 16 : -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.18 + i * 0.1 }} className="group relative overflow-hidden rounded-xl border border-white/[0.07]">
                      <img src={src} alt={label} loading="lazy" className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3 text-sm font-medium text-white">{label}</div>
                    </motion.div>
                  ))}
                </div>
              )}

              <div>
                <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-white"><Activity size={16} style={{ color: project.color }} />{m.title1}</div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {m.blocks.map(([t, Ic, c, d], i) => (
                    <motion.div key={t} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.06 }}
                      whileHover={reduced ? {} : { y: -3 }} className="rounded-xl border p-4" style={{ borderColor: `${c}30`, background: `${c}0a` }}>
                      <div className="mb-2 flex items-center gap-2"><Ic size={15} style={{ color: c }} /><span className="text-sm font-semibold" style={{ color: c }}>{t}</span></div>
                      <p className="text-xs leading-relaxed text-gray-400">{d}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {m.metrics.length > 0 && (
                <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                  {m.metrics.map(([v, l], i) => (
                    <motion.div key={l} initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 + i * 0.06, type: 'spring', stiffness: 200 }}
                      className="rounded-xl border border-white/[0.06] p-4 text-center" style={{ background: 'rgba(255,255,255,.03)' }}>
                      <div className="mb-1 text-lg font-black" style={{ color: project.color }}>{v}</div><div className="text-[11px] leading-tight text-gray-500">{l}</div>
                    </motion.div>
                  ))}
                </div>
              )}

              {m.steps && (
                <div>
                  <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-white"><Terminal className="text-emerald-400" size={16} />Installation locale</div>
                  <div className="overflow-x-auto rounded-xl border border-white/[0.05] p-5 font-mono" style={{ background: 'rgba(4,6,14,.85)' }}>
                    {m.steps.map((s) => <div key={s} className="text-xs leading-6 text-emerald-400"><span className="mr-2 select-none text-gray-600">$</span>{s}</div>)}
                  </div>
                </div>
              )}
              {m.note && <div className="rounded-xl border border-white/[0.06] p-4 text-xs leading-relaxed text-gray-400" style={{ background: 'rgba(255,255,255,.02)' }}>{m.note}</div>}

              <div className="flex flex-wrap gap-3 border-t border-white/[0.05] pt-3">
                {project.code && <a href={project.code} target="_blank" rel="noopener noreferrer" className={act}><Github size={17} />Code source</a>}
                {m.links.map(([l, h]) => <a key={l} href={h} target="_blank" rel="noopener noreferrer" className={act}>{l === 'Télécharger' ? <Download size={17} /> : null}{l}{l !== 'Télécharger' && <ArrowUpRight size={14} />}</a>)}
                {project.demo && <a href={project.demo} target="_blank" rel="noopener noreferrer" className={`${act} border-0 bg-gradient-to-r ${project.gradient} shadow-lg`}><Eye size={17} />Démo live<ArrowUpRight size={14} /></a>}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ═══ Carte projet ═══ */
function ProjectCard({ project: p, index, reduced, onOpen }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [hov, setHov] = useState(false)
  const Icon = p.icon
  const btn = 'flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200'
  const ribbonBg = p.kind === 'pfe' ? 'linear-gradient(90deg,#7c3aed,#4f46e5)' : p.cube ? 'linear-gradient(90deg,#6366f1,#8b5cf6,#06b6d4)' : p.kind === 'crypto' ? 'linear-gradient(90deg,#06b6d4,#3b82f6,#6366f1)' : p.kind === 'adas' ? 'linear-gradient(90deg,#14b8a6,#10b981,#22c55e)' : 'linear-gradient(90deg,#3b82f6,#6366f1,#06b6d4)'
  const Label = ({ icon: I, children }) => <div className="mb-3 flex items-center gap-2"><I size={13} style={{ color: p.color }} /><span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">{children}</span></div>
  const Bullet = <div className={`mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gradient-to-r ${p.gradient}`} />

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 44, scale: 0.92, filter: 'blur(10px)' }}
      animate={inView ? { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.7, delay: (index % 4) * 0.1, ease: BACK }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      className={`group relative flex h-full flex-col ${p.wide ? 'lg:col-span-2' : ''}`}>
      <div className={`pointer-events-none absolute -inset-4 rounded-3xl bg-gradient-to-br ${p.gradient} blur-3xl transition-opacity duration-500`}
        style={{ opacity: hov && !reduced ? 0.3 : 0 }} aria-hidden="true" />
      <motion.div whileHover={reduced ? {} : { y: -8 }} transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        className={`relative flex h-full flex-col overflow-hidden rounded-2xl border shadow-2xl transition-colors duration-300 ${p.neon ? 'pj-neon' : ''}`}
        style={{ '--nc': p.neon, borderColor: hov ? `${p.color}73` : `${p.color}33`, backdropFilter: 'blur(28px)',
          background: `linear-gradient(145deg,${p.color}${p.wide || p.cube || p.highlight ? '22' : '0d'} 0%,rgba(8,12,32,.95) 55%,rgba(8,10,20,.98) 100%)` }}>
        <motion.div initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}} transition={{ delay: 0.4, duration: 0.9, ease: EASE }}
          style={{ originX: 0.5 }} className={`absolute left-0 right-0 top-0 h-px bg-gradient-to-r ${p.gradient}`} />
        <div className="pointer-events-none absolute inset-0 transition-opacity duration-500" aria-hidden="true"
          style={{ opacity: hov ? 1 : 0, background: `radial-gradient(ellipse at 50% 0%,${p.color}1a 0%,transparent 65%)` }} />

        {p.ribbon && (
          <motion.div initial={{ x: -60, opacity: 0 }} animate={inView ? { x: 0, opacity: 1 } : {}} transition={{ delay: 0.45, duration: 0.6, ease: EASE }}
            className="absolute left-0 top-5 z-10 flex items-center gap-1.5 rounded-r-full py-1 pl-4 pr-3 text-xs font-bold text-white shadow-lg" style={{ background: ribbonBg }}>
            {p.kind === 'pfe' ? <Star size={11} fill="white" /> : p.cube ? <Box size={11} /> : p.kind === 'crypto' ? <TrendingUp size={11} /> : p.kind === 'adas' ? <Eye size={11} /> : <Server size={11} />}{p.ribbon}
          </motion.div>
        )}
        <span className="absolute right-4 top-4 z-10 inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-3 py-1 text-xs font-semibold"
          style={{ color: p.color, borderColor: `${p.color}55`, background: `${p.color}22` }}>
          <span className="h-1.5 w-1.5 animate-pulse rounded-full" style={{ background: p.color }} />{p.status}
        </span>

        <div className={`flex flex-1 flex-col p-7 ${p.ribbon ? 'pt-14' : 'pt-12'}`}>
          <div className="mb-6 flex items-start gap-4 pr-28">
            <motion.div whileHover={reduced ? {} : { rotate: 10, scale: 1.1 }} transition={{ type: 'spring', stiffness: 300, damping: 14 }} className="relative flex-shrink-0">
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${p.gradient} opacity-40 blur-md`} />
              {p.cube
                ? <div className="relative rounded-2xl bg-gradient-to-br from-indigo-900/60 to-indigo-800/40 p-3 shadow-xl ring-1 ring-indigo-500/30"><Cube s={52} /></div>
                : <div className={`relative rounded-2xl bg-gradient-to-br ${p.gradient} p-4 shadow-xl ring-1 ring-white/15`}><Icon className="text-white" size={26} /></div>}
              <div className="absolute inset-0 animate-ping rounded-2xl border border-white/20" style={{ animationDelay: `${index * 0.3}s`, animationDuration: '3s' }} />
            </motion.div>
            <div className="min-w-0 flex-1">
              <h3 className="mb-1.5 text-xl font-bold leading-tight text-white transition-colors duration-300 group-hover:text-blue-100">{p.title}</h3>
              <p className="text-sm leading-relaxed text-gray-400">{p.description}</p>
            </div>
          </div>

          <div className={`mb-6 grid items-start gap-6 ${p.wide ? 'lg:grid-cols-2' : ''}`}>
            <div className="space-y-5">
              
              <div>
                <Label icon={Cpu}>Stack technique</Label>
                <div className="flex flex-wrap gap-1.5">
                  {p.tech.map((t) => (
                    <motion.span key={t} whileHover={reduced ? {} : { scale: 1.07, y: -2 }} transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                      className="cursor-default rounded-lg border border-white/[0.08] bg-white/[0.05] px-2.5 py-1 text-xs font-medium text-gray-300 transition-colors hover:border-white/20 hover:text-white">{t}</motion.span>
                  ))}
                </div>
              </div>
              <div>
                <Label icon={Zap}>Fonctionnalités</Label>
                <ul className="space-y-1.5">
                  {p.features.map((f, i) => (
                    <motion.li key={f} initial={{ opacity: 0, x: -12 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.4 + i * 0.06, ease: EASE }}
                      className="flex items-start gap-2 text-sm text-gray-400">{Bullet}{f}</motion.li>
                  ))}
                </ul>
              </div>
              {p.chips && (
                <div className="flex flex-wrap gap-2">
                  {p.chips.map(([I, l, c]) => <div key={l} className="flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-[11px] font-medium" style={{ borderColor: `${c}28`, background: `${c}0a`, color: c }}><I size={11} />{l}</div>)}
                </div>
              )}
            </div>
            
            {p.side && (
              <div className="grid grid-cols-2 gap-2">
                {p.side.map(([v, l], i) => (
                  <motion.div key={l} initial={{ opacity: 0, scale: 0.85 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.4 + i * 0.07, type: 'spring', stiffness: 200 }}
                    className="rounded-xl border border-white/[0.06] p-4 text-center" style={{ background: 'rgba(255,255,255,.03)' }}>
                    <div className="text-xl font-black" style={{ color: p.color }}>{v}</div><div className="text-[11px] text-gray-500">{l}</div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-auto flex flex-wrap gap-2.5">
            {p.code && <motion.a whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.96 }} href={p.code} target="_blank" rel="noopener noreferrer" className={`${btn} border border-white/[0.08] bg-white/[0.05] text-white hover:bg-white/[0.09]`}><Github size={16} />Code</motion.a>}
            {p.demo && <motion.a whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.96 }} href={p.demo} target="_blank" rel="noopener noreferrer" className={`${btn} bg-gradient-to-r ${p.gradient} text-white shadow-lg`}><Eye size={16} />Démo Live<ArrowUpRight size={14} /></motion.a>}
            {p.modal && <motion.button whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.96 }} onClick={() => onOpen(p)} className={`${btn} border text-white`} style={{ borderColor: `${p.color}55`, background: `${p.color}26` }}>
              {p.cube ? <Box size={16} /> : <Cpu size={16} />}{p.kind ? 'Architecture' : p.cube ? 'Voir le projet' : 'Voir Démo'}</motion.button>}
          </div>
        </div>
        <div className="absolute bottom-3 right-3 flex gap-1 opacity-20" aria-hidden="true">
          {[0, 1, 2].map((i) => <div key={i} className="h-1 w-1 animate-pulse rounded-full bg-white" style={{ animationDelay: `${i * 0.2}s` }} />)}
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ═══ Statistiques du bas ═══ */
function StatCard({ s, i, reduced }) {
  const [hov, setHov] = useState(false)
  return (
    <motion.div initial={{ opacity: 0, y: 20, scale: 0.88, filter: 'blur(8px)' }} whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }} viewport={{ once: true }}
      transition={{ delay: i * 0.09, duration: 0.6, ease: BACK }} whileHover={reduced ? {} : { y: -6, scale: 1.03 }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      className="relative cursor-default overflow-hidden rounded-[22px] border border-white/[0.06] p-6 text-center"
      style={{ background: 'linear-gradient(145deg,rgba(13,20,42,.95),rgba(8,10,20,.98))', backdropFilter: 'blur(24px)', boxShadow: '0 20px 60px rgba(0,0,0,.5)' }}>
      <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.09 + 0.3, duration: 0.9, ease: EASE }}
        style={{ originX: 0.5 }} className={`absolute left-6 right-6 top-0 h-px rounded-full bg-gradient-to-r ${s.g}`} />
      <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full blur-2xl transition-opacity duration-500" style={{ background: `linear-gradient(135deg,${s.gr})`, opacity: hov ? 0.16 : 0.04 }} aria-hidden="true" />
      <div className={`mb-2 bg-gradient-to-r ${s.g} bg-clip-text text-2xl font-black tabular-nums text-transparent md:text-3xl`}>{s.v}</div>
      <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-500">{s.l}</div>
      <div className="mx-auto mt-3 h-px rounded-full transition-all duration-500" style={{ width: hov ? '65%' : '28%', opacity: hov ? 1 : 0.4, background: `linear-gradient(90deg,${s.gr})` }} />
    </motion.div>
  )
}

/* ═══ Composant principal ═══ */
export default function Projects() {
  const reduced = useReducedMotion()
  const [open, setOpen] = useState(null)
  const [filter, setFilter] = useState('phares')
  const close = useMemo(() => () => setOpen(null), [])

  const visible = filter === 'tous' ? PROJECTS : PROJECTS.filter((p) => p.featured)
  const tabs = [{ k: 'phares', l: `Projets phares (${PROJECTS.filter((p) => p.featured).length})` }, { k: 'tous', l: `Tous (${PROJECTS.length})` }]
  const stats = [
    { v: `${PROJECTS.length}+`, l: 'Projets réalisés', g: 'from-blue-400 to-cyan-400', gr: '#60a5fa,#22d3ee' },
    { v: '10+', l: 'Technologies maîtrisées', g: 'from-purple-400 to-pink-400', gr: '#c084fc,#f472b6' },
    { v: 'SaaS · Edge AI', l: 'Spécialités', g: 'from-violet-400 to-indigo-400', gr: '#a78bfa,#6366f1' },
    { v: '17/20', l: 'Mention Très Bien', g: 'from-amber-400 to-orange-400', gr: '#fbbf24,#f97316' },
  ]
  const star = (cls) => <Star size={13} className={`flex-shrink-0 text-blue-400/50 ${reduced ? '' : cls}`} />

  return (
    <>
      <StyleInject />
      <section id="projects" className="relative overflow-hidden py-36" style={{ background: 'linear-gradient(180deg,rgba(2,8,23,0) 0%,rgba(2,8,23,.55) 40%,rgba(2,8,23,.62) 100%)' }}>
        <div className="pointer-events-none absolute inset-0" aria-hidden="true" style={{ backgroundImage: 'radial-gradient(circle,rgba(148,163,184,.038) 1px,transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="pointer-events-none absolute inset-0" aria-hidden="true" style={{ background: 'radial-gradient(ellipse 82% 68% at 50% 50%,transparent 38%,rgba(2,8,23,.52) 100%)' }} />
        <motion.div aria-hidden="true" className="pointer-events-none absolute -left-32 -top-32 h-[380px] w-[380px] rounded-full opacity-[0.06] blur-[88px]"
          style={{ background: 'radial-gradient(circle,#1e40af,#6d28d9)' }} animate={reduced ? {} : { x: [0, 28, -14, 0], y: [0, -18, 22, 0] }} transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.div aria-hidden="true" className="pointer-events-none absolute -bottom-32 -right-32 h-[320px] w-[320px] rounded-full opacity-[0.05] blur-[88px]"
          style={{ background: 'radial-gradient(circle,#7c3aed,#0891b2)' }} animate={reduced ? {} : { x: [0, -22, 18, 0], y: [0, 16, -12, 0] }} transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }} />

        <div className="container relative z-10 mx-auto max-w-[1400px] px-4 md:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={stagger(0, 0.1)} className="mb-24 text-center">
            <motion.div variants={fadeUp} className="mb-10 inline-flex items-center gap-2.5 rounded-full border border-blue-500/20 bg-blue-500/[0.055] px-5 py-2.5 text-[10px] font-black uppercase tracking-[0.24em] text-blue-400 shadow-xl shadow-blue-900/20 backdrop-blur-xl">
              <Sparkles size={11} className={reduced ? '' : 'pj-spin'} />Portfolio<Sparkles size={11} className={reduced ? '' : 'pj-spin-r'} />
            </motion.div>
            <motion.h2 variants={fadeUp} className="mb-6 text-5xl font-black leading-[1.01] tracking-tight sm:text-6xl md:text-[88px]">
              <span className="text-white">Mes </span>
              <span className="relative inline-block">
                <span className={reduced ? 'bg-clip-text text-transparent' : 'pj-gt'} style={{ backgroundImage: 'linear-gradient(90deg,#60a5fa 0%,#a78bfa 30%,#f472b6 60%,#60a5fa 100%)' }}>Projets</span>
                <motion.div initial={{ scaleX: 0, opacity: 0 }} whileInView={{ scaleX: 1, opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.7, duration: 1.2, ease: EASE }}
                  style={{ originX: 0.5 }} className="absolute -bottom-3 left-0 right-0 h-[2px] rounded-full bg-gradient-to-r from-transparent via-violet-400/75 to-transparent blur-sm" />
              </span>
            </motion.h2>
            <motion.p variants={fadeUp} className="mx-auto max-w-2xl text-base leading-relaxed text-gray-400 md:text-lg">
              Une sélection de projets qui démontrent mes compétences en <span className="font-semibold text-white">développement Full-Stack</span> et ma passion pour l'
              <span className="font-semibold" style={{ background: 'linear-gradient(90deg,#a78bfa,#818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>innovation</span>
            </motion.p>
            <motion.div initial={{ opacity: 0, scaleX: 0 }} whileInView={{ opacity: 1, scaleX: 1 }} viewport={{ once: true }} transition={{ delay: 0.55, duration: 1.1, ease: EASE }} className="mx-auto mt-12 flex max-w-[200px] items-center gap-4">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />{star('pj-spin')}<div className="h-px flex-1 bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />
            </motion.div>
          </motion.div>

          <div className="mb-14 flex justify-center">
            <div className="inline-flex gap-1 rounded-full border border-white/[0.07] p-1.5 backdrop-blur-xl" style={{ background: 'rgba(13,20,42,.8)' }} role="tablist" aria-label="Filtrer les projets">
              {tabs.map((t) => (
                <motion.button key={t.k} role="tab" aria-selected={filter === t.k} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} onClick={() => setFilter(t.k)}
                  className={`relative rounded-full px-6 py-2.5 text-sm font-semibold transition-colors duration-200 ${filter === t.k ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}>
                  {filter === t.k && <motion.div layoutId="proj-filter" className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-purple-600" transition={{ type: 'spring', stiffness: 340, damping: 28 }} />}
                  <span className="relative z-10">{t.l}</span>
                </motion.button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="popLayout">
            <motion.div key={filter} layout initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -12, filter: 'blur(6px)' }} transition={{ duration: 0.38, ease: EASE }} className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {visible.map((p, i) => <ProjectCard key={p.id} project={p} index={i} reduced={reduced} onOpen={setOpen} />)}
            </motion.div>
          </AnimatePresence>

          <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.75, ease: EASE }} className="mt-20 border-t border-white/[0.05] pt-12">
            <div className="grid grid-cols-2 gap-5 md:grid-cols-4">{stats.map((s, i) => <StatCard key={s.l} s={s} i={i} reduced={reduced} />)}</div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scaleX: 0 }} whileInView={{ opacity: 1, scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.82, ease: EASE }} className="mx-auto mt-16 flex max-w-[130px] items-center gap-3">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-indigo-500/25 to-transparent" />{star('pj-spin-r')}<div className="h-px flex-1 bg-gradient-to-r from-transparent via-violet-500/25 to-transparent" />
          </motion.div>
        </div>

        <DetailModal project={open} onClose={close} reduced={reduced} />
      </section>
    </>
  )
}