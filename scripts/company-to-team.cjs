#!/usr/bin/env node
/**
 * Update user-facing "company" wording to "team" across frontend.
 * Does NOT rename JS keys, routes, or file names.
 *
 * Run: node scripts/company-to-team.cjs
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const FRONTEND = path.join(ROOT, 'frontend');

function read(file) {
  return fs.readFileSync(file, 'utf8');
}

function write(file, content) {
  fs.writeFileSync(file, content, 'utf8');
}

function applyReplacements(content, pairs) {
  let result = content;
  for (const [from, to] of pairs) {
    if (from) result = result.split(from).join(to);
  }
  return result;
}

// Global brand replacements (all files)
const GLOBAL = [
  ['CHUN YI COMPANY', 'CHUN YI TEAM'],
  ['Chun Yi Company', 'Chun Yi Team'],
  ['Chun Yi Technologies', 'Chun Yi Team'],
];

const LOCALE_RULES = {
  en: [
    ['Company Info', 'Team Info'],
    ['company information', 'team information'],
    ['Company Overview', 'Team Overview'],
    ['Company name', 'Team name'],
    ['Company Name', 'Team Name'],
    ['the Company', 'the Team'],
    ['The Company', 'The Team'],
    ['The Chun Yi Team team', 'The Chun Yi Team'],
    ["Chun Yi Team's", "Chun Yi Team's"],
    ['heroTitle: \'COMPANY\'', "heroTitle: 'TEAM'"],
    ["label: 'Company'", "label: 'Team'"],
    ["title: 'Company'", "title: 'Team'"],
    [": 'Company',", ": 'Team',"],
    ['company overview', 'team overview'],
    ['Company |', 'Team |'],
    ['address, company, phone', 'address, team, phone'],
  ],
  ko: [
    ['기업정보', '팀 정보'],
    ['회사 정보', '팀 정보'],
    ['회사 개요', '팀 개요'],
    ['회사 소개', '팀 소개'],
    ['회사 위치', '팀 위치'],
    ['회사명', '팀명'],
    ["heroTitle: 'COMPANY'", "heroTitle: 'TEAM'"],
    [": '회사',", ": '팀',"],
    ['수집 항목：이름, 이메일, 주소, 회사,', '수집 항목：이름, 이메일, 주소, 팀,'],
    ['1. 수집 항목: 이름, 이메일, 주소, 회사,', '1. 수집 항목: 이름, 이메일, 주소, 팀,'],
    ['(이하 "회사")', '(이하 "팀")'],
    ['회사는 관련 법령', '팀은 관련 법령'],
  ],
  ja: [
    ['企業情報', 'チーム情報'],
    ['会社概要', 'チーム概要'],
    ['会社所在地', 'チーム所在地'],
    ['会社紹介', 'チーム紹介'],
    ['会社名', 'チーム名'],
    ['貴社名', 'チーム名'],
    ['（以下「当社」）', '（以下「当チーム」）'],
    ['当社は関連法令', '当チームは関連法令'],
    ['当社は', '当チームは'],
    ["heroTitle: 'COMPANY'", "heroTitle: 'TEAM'"],
    [": '会社',", ": 'チーム',"],
    ['1. 収集項目：氏名、メールアドレス、住所、会社名、', '1. 収集項目：氏名、メールアドレス、住所、チーム名、'],
  ],
  zh: [
    ['公司介绍', '团队介绍'],
    ['公司概况', '团队概况'],
    ['公司名称', '团队名称'],
    ['公司位置', '团队位置'],
    ['本公司', '本团队'],
    ['公司名', '团队名'],
    ["heroTitle: 'COMPANY'", "heroTitle: 'TEAM'"],
    [": '公司',", ": '团队',"],
  ],
  de: [
    ['Unternehmensübersicht', 'Teamübersicht'],
    ['Firmenname', 'Teamname'],
    ['für Ihr Unternehmen', 'für Ihr Team'],
    ['Für Unternehmen', 'Für Teams'],
    ['Unternehmen', 'Team'],
    ["heroTitle: 'COMPANY'", "heroTitle: 'TEAM'"],
    [': \'Unternehmen\'', ": 'Team'"],
  ],
  es: [
    ['desafíos empresariales', 'desafíos del equipo'],
    ['Empresa', 'Equipo'],
    ['empresa', 'equipo'],
    ["heroTitle: 'COMPANY'", "heroTitle: 'TEAM'"],
  ],
  fr: [
    ['Entreprise', 'Équipe'],
    ['entreprise', 'équipe'],
    ["heroTitle: 'COMPANY'", "heroTitle: 'TEAM'"],
  ],
  pt: [
    ['Empresa', 'Equipe'],
    ['empresa', 'equipe'],
    ["heroTitle: 'COMPANY'", "heroTitle: 'TEAM'"],
  ],
  vi: [
    ['Công ty', 'Đội'],
    ['công ty', 'đội'],
    ['doanh nghiệp', 'đội'],
    ["heroTitle: 'COMPANY'", "heroTitle: 'TEAM'"],
  ],
  th: [
    ['ภาพรวมบริษัท', 'ภาพรวมทีม'],
    ['ชื่อบริษัท', 'ชื่อทีม'],
    ['ที่ตั้งบริษัท', 'ที่ตั้งทีม'],
    ['บริษัท', 'ทีม'],
    ["heroTitle: 'COMPANY'", "heroTitle: 'TEAM'"],
  ],
};

const ADMIN_RULES = {
  en: [
    ['Company Info', 'Team Info'],
    ['Company info saved', 'Team info saved'],
    ['Company name', 'Team name'],
    ['company information', 'team information'],
    ["company: 'Company'", "company: 'Team'"],
    ["labelCompany: 'Company'", "labelCompany: 'Team'"],
  ],
  ko: [
    ['회사 정보', '팀 정보'],
    ['회사명', '팀명'],
    ["labelCompany: '회사'", "labelCompany: '팀'"],
  ],
  ja: [
    ['会社情報', 'チーム情報'],
    ['会社名', 'チーム名'],
    ["labelCompany: '会社'", "labelCompany: 'チーム'"],
  ],
};

const META_RULES = {
  ja: [
    ['企業情報', 'チーム情報'],
    ['会社概要', 'チーム概要'],
  ],
  ko: [
    ['기업정보', '팀 정보'],
    ['회사 개요', '팀 개요'],
  ],
  en: [
    ['Company |', 'Team |'],
    ['company overview', 'team overview'],
    ['The Chun Yi Team team', 'The Chun Yi Team'],
  ],
};

function transformLocale(content, lang) {
  let result = applyReplacements(content, GLOBAL);
  const rules = LOCALE_RULES[lang] || [];
  result = applyReplacements(result, rules);
  if (lang === 'zh') {
    result = result.replace(/heroTitle: 'COMPANY'/g, "heroTitle: 'TEAM'");
  }
  return result;
}

function transformAdmin(content) {
  let result = applyReplacements(content, GLOBAL);
  for (const rules of Object.values(ADMIN_RULES)) {
    result = applyReplacements(result, rules);
  }
  return result;
}

function transformMeta(content) {
  let result = content.replace("const SITE = 'Chun Yi Company';", "const SITE = 'Chun Yi Team';");
  result = applyReplacements(result, GLOBAL);
  for (const rules of Object.values(META_RULES)) {
    result = applyReplacements(result, rules);
  }
  return result;
}

const changed = [];

function processFile(relPath, transform = null) {
  const file = path.join(FRONTEND, relPath);
  if (!fs.existsSync(file)) {
    console.warn('SKIP (missing):', relPath);
    return;
  }
  const before = read(file);
  const after = transform ? transform(before, relPath) : applyReplacements(before, GLOBAL);
  if (before !== after) {
    write(file, after);
    changed.push(relPath);
  }
}

const locales = ['ko', 'ja', 'en', 'zh', 'de', 'es', 'fr', 'pt', 'vi', 'th'];
for (const lang of locales) {
  processFile(`src/i18n/locales/${lang}.js`, (c) => transformLocale(c, lang));
}

processFile('src/i18n/locales/adminTranslations.js', transformAdmin);
processFile('src/i18n/meta.js', transformMeta);

for (const rel of [
  'src/components/Logo.jsx',
  'src/pages/admin/AdminLayout.jsx',
  'src/pages/admin/AdminLogin.jsx',
]) {
  processFile(rel);
}

processFile('src/components/Footer.jsx', (c) =>
  applyReplacements(c, [['Chun Yi Technologies', 'Chun Yi Team']])
);

processFile('index.html');
processFile('src/hooks/usePageMeta.js');

console.log('Updated files:', changed.length);
changed.forEach((f) => console.log(' -', f));
