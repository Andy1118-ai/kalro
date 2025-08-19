// Mock data for development and design purposes

export const mockUsers = [
  {
    id: 1,
    email: 'admin@kalro.org',
    name: 'Dr. Sarah Mwangi',
    role: 'admin',
    department: 'Research Administration',
    created_at: '2024-01-15T08:00:00Z'
  },
  {
    id: 2,
    email: 'researcher@kalro.org',
    name: 'Prof. John Kiprotich',
    role: 'researcher',
    department: 'Crop Sciences',
    created_at: '2024-01-20T09:30:00Z'
  },
  {
    id: 3,
    email: 'user@kalro.org',
    name: 'Mary Wanjiku',
    role: 'user',
    department: 'Extension Services',
    created_at: '2024-02-01T10:15:00Z'
  }
]

export const mockCategories = [
  {
    id: 1,
    name: 'Crops',
    slug: 'crops',
    description: 'Crop research and development',
    color: '#22c55e',
    icon: 'Wheat',
    parent_id: null,
    subcategories: [
      { id: 6, name: 'Maize Research', slug: 'maize', description: 'Maize breeding and production' },
      { id: 7, name: 'Rice Research', slug: 'rice', description: 'Rice varieties and cultivation' },
      { id: 8, name: 'Wheat Research', slug: 'wheat', description: 'Wheat improvement programs' }
    ]
  },
  {
    id: 2,
    name: 'Livestock',
    slug: 'livestock',
    description: 'Animal husbandry and livestock research',
    color: '#3b82f6',
    icon: 'Cow',
    parent_id: null,
    subcategories: [
      { id: 9, name: 'Dairy Cattle', slug: 'dairy', description: 'Dairy cattle breeding and management' },
      { id: 10, name: 'Poultry', slug: 'poultry', description: 'Poultry production systems' },
      { id: 11, name: 'Small Ruminants', slug: 'small-ruminants', description: 'Goat and sheep research' }
    ]
  },
  {
    id: 3,
    name: 'Natural Resources',
    slug: 'natural-resources',
    description: 'Environmental and natural resource management',
    color: '#10b981',
    icon: 'TreePine',
    parent_id: null,
    subcategories: [
      { id: 12, name: 'Soil Management', slug: 'soil', description: 'Soil health and fertility' },
      { id: 13, name: 'Water Resources', slug: 'water', description: 'Water conservation and irrigation' },
      { id: 14, name: 'Forestry', slug: 'forestry', description: 'Forest management and agroforestry' }
    ]
  },
  {
    id: 4,
    name: 'Socio Economics',
    slug: 'socio-economics',
    description: 'Agricultural economics and social research',
    color: '#f59e0b',
    icon: 'TrendingUp',
    parent_id: null,
    subcategories: [
      { id: 15, name: 'Market Analysis', slug: 'markets', description: 'Agricultural market research' },
      { id: 16, name: 'Rural Development', slug: 'rural-dev', description: 'Rural development strategies' },
      { id: 17, name: 'Farm Economics', slug: 'farm-econ', description: 'Farm-level economic analysis' }
    ]
  },
  {
    id: 5,
    name: 'Cross-cutting',
    slug: 'cross-cutting',
    description: 'Interdisciplinary research themes',
    color: '#8b5cf6',
    icon: 'Network',
    parent_id: null,
    subcategories: [
      { id: 18, name: 'Climate Change', slug: 'climate-change', description: 'Climate adaptation and mitigation' },
      { id: 19, name: 'Gender & Youth', slug: 'gender-youth', description: 'Inclusive agricultural development' },
      { id: 20, name: 'Nutrition & Food Security', slug: 'nutrition', description: 'Food systems and nutrition' },
      { id: 21, name: 'Technology Transfer', slug: 'technology-transfer', description: 'Innovation adoption' },
      { id: 22, name: 'Capacity Building', slug: 'capacity-building', description: 'Skills development' },
      { id: 23, name: 'Policy & Governance', slug: 'policy', description: 'Agricultural policy research' },
      { id: 24, name: 'Market Linkages', slug: 'market-linkages', description: 'Value chain development' },
      { id: 25, name: 'Innovation Systems', slug: 'innovation', description: 'Innovation ecosystems' }
    ]
  }
]

export const mockDocuments = [
  {
    id: 1,
    title: 'Drought-Resistant Maize Varieties for Kenya',
    description: 'Comprehensive study on developing drought-resistant maize varieties suitable for Kenyan climate conditions.',
    file_path: '/documents/drought-resistant-maize-2024.pdf',
    file_type: 'PDF',
    file_size: 2048576,
    category_id: 6,
    author_id: 2,
    status: 'published',
    tags: ['drought', 'maize', 'climate-resilient', 'breeding'],
    download_count: 245,
    view_count: 1250,
    created_at: '2024-01-15T10:30:00Z',
    author: 'Prof. John Kiprotich'
  },
  {
    id: 2,
    title: 'Sustainable Dairy Farming Practices',
    description: 'Best practices for sustainable dairy farming in smallholder systems.',
    file_path: '/documents/sustainable-dairy-farming.pdf',
    file_type: 'PDF',
    file_size: 1536000,
    category_id: 9,
    author_id: 2,
    status: 'published',
    tags: ['dairy', 'sustainability', 'smallholder', 'practices'],
    download_count: 189,
    view_count: 890,
    created_at: '2024-01-20T14:15:00Z',
    author: 'Prof. John Kiprotich'
  },
  {
    id: 3,
    title: 'Climate Change Adaptation Strategies',
    description: 'Comprehensive guide on climate change adaptation strategies for Kenyan agriculture.',
    file_path: '/documents/climate-adaptation-strategies.pdf',
    file_type: 'PDF',
    file_size: 3072000,
    category_id: 18,
    author_id: 1,
    status: 'published',
    tags: ['climate-change', 'adaptation', 'agriculture', 'strategies'],
    download_count: 312,
    view_count: 1580,
    created_at: '2024-02-01T09:00:00Z',
    author: 'Dr. Sarah Mwangi'
  },
  {
    id: 4,
    title: 'Gender Mainstreaming in Agricultural Research',
    description: 'Framework for integrating gender perspectives in agricultural research and development.',
    file_path: '/documents/gender-mainstreaming-agriculture.pdf',
    file_type: 'PDF',
    file_size: 1024000,
    category_id: 19,
    author_id: 3,
    status: 'published',
    tags: ['gender', 'mainstreaming', 'research', 'development'],
    download_count: 156,
    view_count: 720,
    created_at: '2024-02-10T11:30:00Z',
    author: 'Mary Wanjiku'
  },
  {
    id: 5,
    title: 'Soil Health Assessment Manual',
    description: 'Practical manual for assessing and improving soil health in agricultural systems.',
    file_path: '/documents/soil-health-assessment.pdf',
    file_type: 'PDF',
    file_size: 2560000,
    category_id: 12,
    author_id: 2,
    status: 'published',
    tags: ['soil', 'health', 'assessment', 'manual'],
    download_count: 203,
    view_count: 1100,
    created_at: '2024-02-15T16:45:00Z',
    author: 'Prof. John Kiprotich'
  }
]

export const mockActivityLogs = [
  {
    id: 1,
    user_id: 1,
    action: 'document_upload',
    resource_type: 'document',
    resource_id: 3,
    details: { title: 'Climate Change Adaptation Strategies' },
    created_at: '2024-02-01T09:00:00Z'
  },
  {
    id: 2,
    user_id: 2,
    action: 'document_download',
    resource_type: 'document',
    resource_id: 1,
    details: { title: 'Drought-Resistant Maize Varieties for Kenya' },
    created_at: '2024-02-01T10:15:00Z'
  },
  {
    id: 3,
    user_id: 3,
    action: 'user_login',
    resource_type: 'user',
    resource_id: 3,
    details: { login_method: 'email' },
    created_at: '2024-02-01T08:30:00Z'
  }
]

export const mockAnalytics = [
  { date: '2024-01-01', metric_type: 'downloads', metric_value: 45 },
  { date: '2024-01-02', metric_type: 'downloads', metric_value: 52 },
  { date: '2024-01-03', metric_type: 'downloads', metric_value: 38 },
  { date: '2024-01-04', metric_type: 'downloads', metric_value: 61 },
  { date: '2024-01-05', metric_type: 'downloads', metric_value: 49 },
  { date: '2024-01-06', metric_type: 'downloads', metric_value: 73 },
  { date: '2024-01-07', metric_type: 'downloads', metric_value: 67 },
  { date: '2024-01-01', metric_type: 'views', metric_value: 234 },
  { date: '2024-01-02', metric_type: 'views', metric_value: 267 },
  { date: '2024-01-03', metric_type: 'views', metric_value: 198 },
  { date: '2024-01-04', metric_type: 'views', metric_value: 312 },
  { date: '2024-01-05', metric_type: 'views', metric_value: 289 },
  { date: '2024-01-06', metric_type: 'views', metric_value: 356 },
  { date: '2024-01-07', metric_type: 'views', metric_value: 334 }
]

export const mockBookmarks = [
  { id: 1, user_id: 1, document_id: 1, created_at: '2024-01-20T10:00:00Z' },
  { id: 2, user_id: 1, document_id: 3, created_at: '2024-02-01T15:30:00Z' },
  { id: 3, user_id: 2, document_id: 2, created_at: '2024-01-25T09:15:00Z' },
  { id: 4, user_id: 3, document_id: 4, created_at: '2024-02-10T14:20:00Z' }
]

export const mockDomainDocuments = [
  {
    domain: 'Crops',
    documents: [
      {
        id: 101,
        title: 'High-Yielding Maize Varieties for Eastern Kenya',
        description: 'Research findings on newly developed maize varieties suitable for eastern Kenya regions.',
        file_path: '/domains/crops/maize-varieties-eastern-kenya.pdf',
        file_type: 'PDF',
        file_size: 1845760,
        category_id: 6,
        author_id: 2,
        status: 'published',
        tags: ['maize', 'eastern-kenya', 'high-yield', 'varieties'],
        download_count: 178,
        view_count: 890,
        created_at: '2024-03-15T08:30:00Z',
        author: 'Prof. John Kiprotich'
      },
      {
        id: 102,
        title: 'Rice Production in Irrigated Systems',
        description: 'Guidelines for optimal rice production in irrigated agricultural systems.',
        file_path: '/domains/crops/rice-irrigation-systems.pdf',
        file_type: 'PDF',
        file_size: 2097152,
        category_id: 7,
        author_id: 1,
        status: 'published',
        tags: ['rice', 'irrigation', 'production', 'systems'],
        download_count: 145,
        view_count: 670,
        created_at: '2024-03-20T09:45:00Z',
        author: 'Dr. Sarah Mwangi'
      }
    ]
  },
  {
    domain: 'Livestock',
    documents: [
      {
        id: 201,
        title: 'Improved Dairy Cattle Breeds for Kenya',
        description: 'Comprehensive guide on dairy cattle breeds adapted for Kenyan conditions.',
        file_path: '/domains/livestock/dairy-cattle-breeds.pdf',
        file_type: 'PDF',
        file_size: 3145728,
        category_id: 9,
        author_id: 2,
        status: 'published',
        tags: ['dairy', 'cattle', 'breeds', 'kenya'],
        download_count: 234,
        view_count: 1120,
        created_at: '2024-03-25T10:15:00Z',
        author: 'Prof. John Kiprotich'
      },
      {
        id: 202,
        title: 'Modern Poultry Management Techniques',
        description: 'Best practices for commercial poultry farming in Kenya.',
        file_path: '/domains/livestock/poultry-management.pdf',
        file_type: 'PDF',
        file_size: 2621440,
        category_id: 10,
        author_id: 3,
        status: 'published',
        tags: ['poultry', 'management', 'commercial', 'farming'],
        download_count: 198,
        view_count: 945,
        created_at: '2024-04-01T11:30:00Z',
        author: 'Mary Wanjiku'
      }
    ]
  },
  {
    domain: 'Natural Resources',
    documents: [
      {
        id: 301,
        title: 'Soil Conservation Techniques',
        description: 'Modern approaches to soil conservation in agricultural lands.',
        file_path: '/domains/natural-resources/soil-conservation.pdf',
        file_type: 'PDF',
        file_size: 1572864,
        category_id: 12,
        author_id: 1,
        status: 'published',
        tags: ['soil', 'conservation', 'agriculture', 'techniques'],
        download_count: 167,
        view_count: 823,
        created_at: '2024-04-05T13:45:00Z',
        author: 'Dr. Sarah Mwangi'
      },
      {
        id: 302,
        title: 'Water Management in Agriculture',
        description: 'Strategies for efficient water use in agricultural production.',
        file_path: '/domains/natural-resources/water-management.pdf',
        file_type: 'PDF',
        file_size: 2359296,
        category_id: 13,
        author_id: 2,
        status: 'published',
        tags: ['water', 'management', 'agriculture', 'efficiency'],
        download_count: 156,
        view_count: 734,
        created_at: '2024-04-10T14:20:00Z',
        author: 'Prof. John Kiprotich'
      }
    ]
  },
  {
    domain: 'Cross-cutting',
    documents: [
      {
        id: 401,
        title: 'Climate-Smart Agriculture Practices',
        description: 'Implementation guide for climate-smart agricultural practices in Kenya.',
        file_path: '/domains/cross-cutting/climate-smart-agriculture.pdf',
        file_type: 'PDF',
        file_size: 2883584,
        category_id: 18,
        author_id: 1,
        status: 'published',
        tags: ['climate-smart', 'agriculture', 'practices', 'implementation'],
        download_count: 289,
        view_count: 1345,
        created_at: '2024-04-15T15:30:00Z',
        author: 'Dr. Sarah Mwangi'
      },
      {
        id: 402,
        title: 'Youth in Agriculture Programs',
        description: 'Strategies for engaging youth in modern agricultural practices.',
        file_path: '/domains/cross-cutting/youth-agriculture.pdf',
        file_type: 'PDF',
        file_size: 1835008,
        category_id: 19,
        author_id: 3,
        status: 'published',
        tags: ['youth', 'agriculture', 'engagement', 'modern-practices'],
        download_count: 223,
        view_count: 1056,
        created_at: '2024-04-20T16:45:00Z',
        author: 'Mary Wanjiku'
      }
    ]
  }
]
