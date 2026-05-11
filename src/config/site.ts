/**
 * Configuração central do site AtingeHUB
 * Todos os componentes consomem daqui. Editar em 1 lugar = atualiza tudo.
 */

export const site = {
  name: 'AtingeHUB',
  url: 'https://atingehub.com',
  tagline: 'Sistemas de IA para varejo brasileiro.',
  description:
    'A AtingeHUB instala sistemas de IA sob medida no varejo brasileiro. Cada produto resolve um problema concreto, com stack aberta e relação humana em primeiro lugar.',
  manifesto:
    'AtingeHUB é o sistema; Gabriel é o fundador co-criando junto. Relação humana primeiro, IA como extensão — nunca substituto. Cliente fica dono dos dados e da infra.',
  founder: {
    name: 'Gabriel Mendes',
    role: 'Fundador e arquiteto',
    background:
      '5 anos atendendo empresários do varejo de Sorocaba com maquininha de cartão e crediário. Diretor de teatro. Criador de conteúdo. Construiu o AUTOMAKER (Maia + Sofia) e mantém o Açaí Algomais rodando como case real.',
    photo: '/brand/gabriel.jpg',
  },
  contact: {
    whatsapp: '5515999999999',
    whatsappLabel: '+55 15 99999-9999',
    whatsappMessage:
      'Oi Gabriel, vim pelo site da AtingeHUB. Queria entender melhor como funciona.',
    email: 'oi@atingehub.com',
    instagram: 'atingehub',
    address: 'Sorocaba/SP',
    region: ['Sorocaba', 'Votorantim', 'Itu', 'Salto', 'Boituva', 'Mairinque'],
  },
  social: {
    instagram: 'https://instagram.com/atingehub',
    github: 'https://github.com/GabrielMendesIA/atingehub-stack',
  },
  legal: {
    dpoEmail: 'privacidade@atingehub.com',
  },
} as const;

export const navigation = [
  { label: 'Sobre', href: '/sobre' },
  { label: 'Portfólio', href: '/portfolio' },
  { label: 'Processo', href: '/processo' },
  { label: 'Casos', href: '/casos' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contato', href: '/contato' },
] as const;

export const whatsappLink = (message?: string) => {
  const msg = encodeURIComponent(message || site.contact.whatsappMessage);
  return `https://wa.me/${site.contact.whatsapp}?text=${msg}`;
};
