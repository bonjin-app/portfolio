import { Feather, Image, MonitorSmartphone, ShieldCheck } from 'lucide-react';

export const works = [
  {
    slug: 'genius-choi',
    name: 'Genius CHOI',
    type: 'Web',
    description: 'The first portfolio project that started the Bonjin journey.',
    image: '/images/bonjin/facebook_cover_photo_1.png',
    site: 'https://gigas-blog.tistory.com',
    technologies: ['Design', 'HTML5 / CSS3', 'JavaScript'],
  },
  {
    slug: 'jeju-living-dialect',
    name: '제주 생활방언',
    type: 'App',
    description: '오래전부터 제주에서 이어져 온 생활방언을 쉽고 편하게 만나는 앱입니다.',
    image: '/images/bonjin/linkedin_banner_image_2.png',
    site: 'https://play.google.com/store/apps/details?id=com.bonjin.B04',
    technologies: ['Java', 'Spring Boot', 'Kotlin', 'Open API'],
  },
  {
    slug: 'idol-manager',
    name: '아이돌 관리자',
    type: 'Web',
    description: '아이돌 정보를 한곳에서 관리하기 위해 만든 웹 프로젝트입니다.',
    image: '/images/bonjin/facebook_cover_photo_2.png',
    site: 'https://github.com/bonjin-app',
    technologies: ['Java', 'Spring Boot', 'JPA', 'HTML5 / CSS3', 'JavaScript'],
  },
  {
    slug: 'jejutmalsami',
    name: '제줏말싸미',
    type: 'App',
    description: '제주어 생활방언과 속담, 제주 문화 이야기를 전하는 모바일 앱입니다.',
    image: '/images/bonjin/linkedin_banner_image_1.png',
    site: 'https://play.google.com/store/apps/details?id=kr.co.bonjin.jejudialect',
    technologies: ['Dart', 'Flutter', 'Swift', 'Kotlin', 'Open API'],
  },
];

export const services = [
  {
    title: 'Security',
    description: '서비스의 처음부터 안전을 기본값으로 설계합니다.',
    items: ['사용자별 권한 설계', '통신 데이터 암호화', '개인정보 보호'],
    icon: ShieldCheck,
  },
  {
    title: 'Mobile Applications',
    description: '손끝에서 자연스럽고 편리한 모바일 경험을 만듭니다.',
    items: ['iOS & Android', '간결한 사용 흐름', '네이티브 수준의 경험'],
    icon: MonitorSmartphone,
  },
  {
    title: 'UX & UI Design',
    description: '읽기 쉽고 기억에 남는 화면을 섬세하게 설계합니다.',
    items: ['명확한 정보 구조', '브랜드에 맞는 디자인', '반응형 인터페이스'],
    icon: Image,
  },
  {
    title: 'Light & Fast',
    description: '기능은 단단하게, 움직임은 가볍고 빠르게 만듭니다.',
    items: ['빠른 로딩', '부드러운 상호작용', '유지보수 가능한 구조'],
    icon: Feather,
  },
];

export const skills = [
  ['Java & Spring', 100],
  ['Swift & iOS', 94],
  ['Flutter', 92],
  ['SQL & Data', 90],
  ['HTML & CSS', 96],
  ['JavaScript & React', 94],
  ['UI Design', 88],
];
