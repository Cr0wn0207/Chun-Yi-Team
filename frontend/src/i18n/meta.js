const SITE = 'Chun Yi Team';

const META_JA = {
  home: {
    title: `${SITE} | 未来を共に創るITパートナー`,
    description:
      'Chun Yi TeamはDX・AI・クラウド・システム開発・ITコンサル・CXをワンストップで提供。埼玉県志木市を拠点に、お客様と共に未来を創るITパートナーです。',
  },
  about: {
    title: `チーム情報 | ${SITE}`,
    description:
      '代表メッセージ、経営理念、チーム概要、沿革。Chun Yi Teamのビジョンとミッションをご紹介します。',
  },
  services: {
    title: `製品・サービス | ${SITE}`,
    description:
      'デジタルトランスフォーメーション、AI・データ、クラウド、システム開発、ITコンサル、CXなどITサービス一覧。',
  },
  serviceDetail: {
    titleSuffix: ` | ${SITE}`,
    descriptionFallback: 'Chun Yi Teamのサービス詳細ページです。',
  },
  news: {
    title: `ニュース | ${SITE}`,
    description: 'Chun Yi Teamの最新ニュース、プレスリリース、お知らせ一覧。',
  },
  newsDetail: {
    titleSuffix: ` | ${SITE}`,
    descriptionFallback: 'Chun Yi Teamのニュース詳細です。',
  },
  contact: {
    title: `お問い合わせ | ${SITE}`,
    description:
      'サービス・協業・採用などのお問い合わせはこちら。Chun Yi Teamが担当者よりご連絡いたします。',
  },
  admin: {
    title: `管理 | ${SITE}`,
    description: 'Chun Yi Team 管理画面',
    robots: 'noindex, nofollow',
  },
};

const META_KO = {
  home: {
    title: `${SITE} | 함께 미래를 만드는 IT 파트너`,
    description:
      'Chun Yi Team는 DX, AI, 클라우드, 시스템 개발, IT 컨설팅, CX를 원스톱으로 제공합니다. 일본 사이타마현 시키시를 기반으로 고객과 함께 성장합니다.',
  },
  about: {
    title: `팀 정보 | ${SITE}`,
    description: '대표 메시지, 경영 이념, 팀 개요, 연혁. Chun Yi Team의 비전과 미션을 소개합니다.',
  },
  services: {
    title: `제품·서비스 | ${SITE}`,
    description: '디지털 전환, AI·데이터, 클라우드, 시스템 개발, IT 컨설팅, CX 등 IT 서비스 목록.',
  },
  serviceDetail: {
    titleSuffix: ` | ${SITE}`,
    descriptionFallback: 'Chun Yi Team 서비스 상세 페이지입니다.',
  },
  news: {
    title: `뉴스 | ${SITE}`,
    description: 'Chun Yi Team 최신 뉴스, 보도자료, 공지 목록.',
  },
  newsDetail: {
    titleSuffix: ` | ${SITE}`,
    descriptionFallback: 'Chun Yi Team 뉴스 상세입니다.',
  },
  contact: {
    title: `문의하기 | ${SITE}`,
    description: '서비스, 협업, 채용 문의는 여기로 보내주세요. Chun Yi Team 담당자가 연락드립니다.',
  },
  admin: {
    title: `관리 | ${SITE}`,
    description: 'Chun Yi Team 관리 화면',
    robots: 'noindex, nofollow',
  },
};

const META_EN = {
  home: {
    title: `${SITE} | Your IT Partner for the Future`,
    description:
      'Chun Yi Team delivers DX, AI, cloud, system development, IT consulting, and CX. Based in Shiki, Saitama, Japan, we grow with our clients.',
  },
  about: {
    title: `Team | ${SITE}`,
    description:
      'CEO message, vision, team overview, and history. Learn about Chun Yi Team’s mission and values.',
  },
  services: {
    title: `Products & Services | ${SITE}`,
    description:
      'Digital transformation, AI & data, cloud infrastructure, system development, IT consulting, and CX services.',
  },
  serviceDetail: {
    titleSuffix: ` | ${SITE}`,
    descriptionFallback: 'Service details from Chun Yi Team.',
  },
  news: {
    title: `News | ${SITE}`,
    description: 'Latest news, press releases, and announcements from Chun Yi Team.',
  },
  newsDetail: {
    titleSuffix: ` | ${SITE}`,
    descriptionFallback: 'News article from Chun Yi Team.',
  },
  contact: {
    title: `Contact | ${SITE}`,
    description:
      'Contact us about services, partnerships, or careers. The Chun Yi Team will respond promptly.',
  },
  admin: {
    title: `Admin | ${SITE}`,
    description: 'Chun Yi Team administration',
    robots: 'noindex, nofollow',
  },
};

export const META_BY_LOCALE = {
  ja: META_JA,
  ko: META_KO,
  en: META_EN,
  zh: META_EN,
  de: META_EN,
  es: META_EN,
  fr: META_EN,
  pt: META_EN,
  vi: META_EN,
  th: META_EN,
};

export function getPageMeta(locale, pageKey, overrides = {}) {
  const pack = META_BY_LOCALE[locale] || META_EN;
  const page = pack[pageKey] || pack.home;

  const title = overrides.title
    ? `${overrides.title}${page.titleSuffix || ` | ${SITE}`}`
    : page.title;

  const description =
    overrides.description || page.description || page.descriptionFallback || META_EN.home.description;

  return {
    title,
    description: description.slice(0, 320),
    robots: page.robots,
  };
}
