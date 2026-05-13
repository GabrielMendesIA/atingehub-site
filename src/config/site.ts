export const site = {
  name: 'AtingeHUB',
  url: 'https://atingehub.com',
  tagline: 'Sistemas de IA para o varejo brasileiro.',
  description:
    'IA dentro da sua operação. Sistemas que conversam, lembram e decidem — não chatbots. Stack aberta, instalação acompanhada em Sorocaba e região.',
  founder: {
    name: 'Gabriel Mendes',
    role: 'Fundador',
  },
  contact: {
    whatsapp: '5515998554455',
    whatsappLabel: '+55 15 99855-4455',
    email: 'contato@atingehub.com.br',
    instagram: 'atingehub',
    address: 'Sorocaba/SP',
    region: ['Sorocaba', 'Votorantim', 'Itu', 'Salto', 'Boituva', 'Mairinque'],
  },
  social: {
    instagram: 'https://instagram.com/atingehub',
    github: 'https://github.com/GabrielMendesIA/atingehub-stack',
  },
} as const;

export const navigation = [
  { label: 'Serviços', href: '/#servicos' },
  { label: 'Processo', href: '/#processo' },
  { label: 'Workshop', href: '/workshop' },
  { label: 'Contato', href: '/#contato' },
] as const;

export const whatsappLink = (message?: string) => {
  const fallback = 'Oi Gabriel, vim pelo site da AtingeHUB. Queria conversar.';
  const msg = encodeURIComponent(message || fallback);
  return `https://wa.me/${site.contact.whatsapp}?text=${msg}`;
};
