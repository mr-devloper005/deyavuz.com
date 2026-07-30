import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const pagesContent = {
  home: {
    metadata: {
      title: 'Discover businesses, services, and local opportunities',
      description: 'Browse business listings, read insightful articles, and explore local services through a beautifully designed discovery experience.',
      openGraphTitle: 'Discover businesses, services, and local opportunities',
      openGraphDescription: 'Your gateway to local business discovery, curated articles, and community-driven content.',
      keywords: ['business listing', 'local discovery', 'business directory', 'services near me'],
    },
    hero: {
      badge: 'Welcome to Deyavuz',
      title: ['Your guide to discovering', 'local businesses and services.'],
      description: 'Explore trusted business listings, insightful articles, and community resources through a beautifully curated discovery experience.',
      primaryCta: { label: 'Browse listings', href: '/listing' },
      secondaryCta: { label: 'Read articles', href: '/article' },
      searchPlaceholder: 'Search businesses, services, articles, and more',
      focusLabel: 'Featured',
      featureCardBadge: 'Fresh discoveries',
      featureCardTitle: 'New listings shape the community every day.',
      featureCardDescription: 'Recently added businesses and services keep the platform vibrant and up to date.',
    },
    intro: {
      badge: 'About the platform',
      title: 'Built for meaningful discovery and genuine connections.',
      paragraphs: [
        'We bring together business listings, editorial content, and community resources so visitors can explore and connect naturally.',
        'Rather than scattering information across disconnected pages, our platform keeps everything organized in one welcoming space with intuitive navigation.',
        'Whether you start with a business listing, an article, or a community profile, you can keep discovering related content effortlessly.',
      ],
      sideBadge: 'At a glance',
      sidePoints: [
        'Curated business listings with verified details and reviews.',
        'Insightful articles covering local trends and community stories.',
        'Beautiful visual galleries showcasing businesses and events.',
        'A welcoming platform designed for effortless exploration.',
      ],
      primaryLink: { label: 'Browse listings', href: '/listing' },
      secondaryLink: { label: 'View gallery', href: '/image' },
    },
    cta: {
      badge: 'Get started',
      title: 'Join the community and share your business with the world.',
      description: 'Add your business listing, share an article, or connect with local services through one beautiful platform.',
      primaryCta: { label: 'Add your business', href: '/create' },
      secondaryCta: { label: 'Contact us', href: '/contact' },
    },
    taskSection: {
      heading: 'Latest {label}',
      descriptionSuffix: 'Explore the newest additions in this section.',
    },
  },
  about: {
    badge: 'Our Story',
    title: 'A warmer way to discover local businesses.',
    description: `${slot4BrandConfig.siteName} is designed to make business discovery feel personal, trustworthy, and genuinely helpful.`,
    paragraphs: [
      'We believe finding the right business should feel like getting a recommendation from a trusted friend, not scrolling through an impersonal directory.',
      'Our platform brings together verified listings, authentic reviews, and community stories to help you make confident decisions about local services.',
    ],
    values: [
      {
        title: 'Community first',
        description: 'We prioritize genuine connections between businesses and the communities they serve, fostering trust and transparency.',
      },
      {
        title: 'Thoughtful curation',
        description: 'Every listing, article, and resource is organized with care to make exploration intuitive and rewarding.',
      },
      {
        title: 'Beautiful simplicity',
        description: 'Our clean, welcoming design helps you find what you need without clutter or confusion.',
      },
    ],
  },
  contact: {
    eyebrow: `Reach out to ${slot4BrandConfig.siteName}`,
    title: 'We would love to hear from you.',
    description: 'Whether you want to list your business, partner with us, or simply have a question, we are here to help.',
    formTitle: 'Send us a message',
  },

  search: {
    metadata: {
      title: 'Search',
      description: 'Search businesses, articles, services, and content across the platform.',
    },
    hero: {
      badge: 'Find what you need',
      title: 'Search businesses, articles, and local resources.',
      description: 'Use keywords, categories, and content types to discover listings and content from every section of the platform.',
      placeholder: 'Search by business name, topic, category, or keyword',
    },
    resultsTitle: 'Browse recent listings and articles',
  },
  create: {
    metadata: {
      title: 'Create',
      description: 'Create and submit new content for the platform.',
    },
    locked: {
      badge: 'Member access',
      title: 'Sign in to start creating.',
      description: 'Use your account to access the publishing tools and share businesses, articles, and resources with the community.',
    },
    hero: {
      badge: 'Creator studio',
      title: 'Share something valuable with the community.',
      description: 'Choose a content type, add your details, and create a polished listing or article to share.',
    },
    formTitle: 'Content details',
    submitLabel: 'Publish content',
    successTitle: 'Content published successfully.',
  },
  auth: {
    login: {
      metadataDescription: 'Sign in to your account.',
      badge: 'Welcome back',
      title: 'Sign in to your account.',
      description: 'Access your dashboard, manage your listings, and continue building your presence on the platform.',
      formTitle: 'Sign in',
      submitLabel: 'Continue',
      noAccount: 'No account found. Please create an account first.',
      success: 'Welcome back! Redirecting...',
      createCta: 'Create an account',
    },
    signup: {
      metadataDescription: 'Create your free account.',
      badge: 'Join the community',
      title: 'Create your free account today.',
      description: 'Join thousands of businesses and community members who trust our platform for local discovery.',
      formTitle: 'Create account',
      submitLabel: 'Get started',
      passwordShort: 'Password must be at least 4 characters.',
      success: 'Account created! Redirecting...',
      loginCta: 'Sign in',
    },
  },
  detailPages: {
    article: {
      relatedTitle: 'Related articles',
      fallbackTitle: 'Article details',
    },
    listing: {
      relatedTitle: 'Similar businesses',
      fallbackTitle: 'Business details',
    },
    image: {
      relatedTitle: 'More from the gallery',
      fallbackTitle: 'Image details',
    },
    profile: {
      relatedTitle: 'Discover more profiles',
      fallbackDescription: 'Profile details will appear here once available.',
      visitButton: 'Visit website',
    },
  },
} as const
