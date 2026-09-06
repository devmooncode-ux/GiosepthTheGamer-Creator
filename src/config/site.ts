export const siteConfig = {
  creator: {
    alias: 'GiosephTheGamer',
    realName: 'Giuseppe Mele',
    tagline: 'Gaming Creator Hub',
    positioning: 'Il brand digitale ufficiale',
    description:
      'Creator italiano con un percorso decennale su YouTube. Gaming, Dragon Ball, walkthrough, recensioni e unboxing — il brand va oltre una singola piattaforma.',
    channelStartYear: 2012,
    businessEmail: 'business@giosephthegamer.com',
  },
  socials: [
    {
      platform: 'YouTube',
      handle: '@GiosephTheGamer',
      url: 'https://www.youtube.com/@GiosephTheGamer',
      icon: 'youtube',
      primary: true,
    },
    {
      platform: 'Instagram',
      handle: '@giosephthegamer',
      url: 'https://www.instagram.com/giosephthegamer',
      icon: 'instagram',
    },
    {
      platform: 'Twitch',
      handle: 'giosephthegamer',
      url: 'https://www.twitch.tv/giosephthegamer',
      icon: 'twitch',
    },
  ],
  nav: [
    { label: 'Home', id: 'home' },
    { label: 'Videos', id: 'videos' },
    { label: 'Gaming', id: 'gaming' },
    { label: 'Dragon Ball', id: 'dragonball' },
    { label: 'Community', id: 'community' },
    { label: 'Members', id: 'members' },
    { label: 'About', id: 'about' },
    { label: 'Collaborate', id: 'collaborate' },
  ],
  heroMetadata: ['YouTube', 'Gaming', 'Dragon Ball', 'Live'],
  contentCategories: [
    { id: 'dragonball', label: 'Dragon Ball', accent: 'ember', featured: true },
    { id: 'sparking-zero', label: 'Sparking! Zero', accent: 'gold' },
    { id: 'xenoverse', label: 'Xenoverse', accent: 'cyan' },
    { id: 'kakarot', label: 'Kakarot', accent: 'ember' },
    { id: 'new-games', label: 'New Games', accent: 'energy' },
    { id: 'challenges', label: 'Challenges', accent: 'cyan' },
    { id: 'vlogs', label: 'Vlogs', accent: 'gold' },
    { id: 'unboxing', label: 'Unboxing', accent: 'energy' },
    { id: 'reviews', label: 'Reviews', accent: 'cyan' },
  ],
  membership: {
    tiers: [
      {
        id: 'novice',
        name: 'Novice',
        tierNumber: '01',
        priceMonthly: 4.99,
        tagline: 'Il primo passo nella community',
        benefits: [
          'Badge membro esclusivo',
          'Accesso ai post della community',
          'Sondaggi community riservati',
          'Contenuti extra settimanali',
        ],
        accent: 'cyan',
        popular: false,
      },
      {
        id: 'super-saiyan',
        name: 'Super Saiyan',
        tierNumber: '02',
        priceMonthly: 9.99,
        tagline: 'Esperienza premium per veri fan',
        benefits: [
          'Tutti i vantaggi Novice',
          'Video estesi e dietro le quinte',
          'Accesso anticipato ai contenuti',
          'Wallpaper esclusivi',
          'Eventi live riservati ai membri',
        ],
        accent: 'gold',
        popular: true,
      },
      {
        id: 'super-saiyan-blue',
        name: 'Super Saiyan Blue',
        tierNumber: '03',
        priceMonthly: 19.99,
        tagline: 'Il livello massimo della community',
        benefits: [
          'Tutti i vantaggi Super Saiyan',
          'Video esclusivi members-only',
          'Q&A mensile diretta con Gioseph',
          'Contenuti digitali scaricabili',
          'Accesso community privata',
          'Riconoscimento speciale nei crediti',
        ],
        accent: 'energy',
        popular: false,
      },
    ],
    faq: [
      {
        question: 'Posso annullare in qualsiasi momento?',
        answer:
          'Sì. Puoi gestire o annullare il tuo abbonamento direttamente dal dashboard membro in qualsiasi momento, senza penali.',
      },
      {
        question: 'I contenuti members-only sono disponibili subito?',
        answer:
          'Sì, tutti i contenuti della tua tier sono disponibili immediatamente dopo la conferma dell\'abbonamento.',
      },
      {
        question: 'Posso cambiare tier?',
        answer:
          'Puoi passare a una tier superiore o inferiore in qualsiasi momento dal tuo dashboard. Il costo viene proratato automaticamente.',
      },
      {
        question: 'Come funziona il pagamento?',
        answer:
          'Il pagamento è gestito in modo sicuro tramite Stripe. I tuoi dati non vengono mai salvati sul sito.',
      },
    ],
    disclaimer:
      'Il sistema membership è un\'esperienza futura basata sul sito web. I nomi delle tier sono esempi concettuali e possono essere personalizzati.',
  },
  collaborationTypes: [
    { id: 'gaming-campaign', label: 'Gaming Campaign', icon: 'gamepad' },
    { id: 'product-launch', label: 'Product Launch', icon: 'rocket' },
    { id: 'hardware', label: 'Hardware', icon: 'cpu' },
    { id: 'software', label: 'Software', icon: 'code' },
    { id: 'events', label: 'Events', icon: 'calendar' },
    { id: 'sponsorship', label: 'Sponsorship', icon: 'badge-check' },
    { id: 'media', label: 'Media Appearances', icon: 'radio' },
    { id: 'partnership', label: 'Creator Partnership', icon: 'users' },
  ],
  events: [
    {
      title: 'COMICON Napoli',
      year: '2024',
      type: 'Convention',
      description: 'Incontro con la community e contenuti dal vivo.',
      status: 'confirmed',
    },
    {
      title: 'Collaborazioni Creator',
      year: '2024',
      type: 'Partnership',
      description: 'Progetti con altri creator del panorama gaming italiano.',
      status: 'ongoing',
    },
    {
      title: 'Dragon Ball: Sparking! ZERO',
      year: '2024',
      type: 'Game Coverage',
      description: 'Copertura completa del titolo al lancio.',
      status: 'confirmed',
    },
  ],
  disclosure:
    'Il canale dichiara esplicitamente collaborazioni commerciali, promozioni e contenuti affiliati. Per informazioni business: business@giosephthegamer.com',
} as const;

export type SiteConfig = typeof siteConfig;
export type MembershipTier = (typeof siteConfig.membership.tiers)[number];
export type ContentCategory = (typeof siteConfig.contentCategories)[number];
export type SocialLink = (typeof siteConfig.socials)[number];
export type CollaborationType = (typeof siteConfig.collaborationTypes)[number];
