// 'use client'

// import { useState } from 'react'
// import { motion } from 'framer-motion'
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { Badge } from '@/components/ui/badge'
// import { CloudRain, Users, Apple, Zap, GraduationCap, Scale, ShoppingCart, Lightbulb, Search, Download, Eye, Calendar, User } from 'lucide-react'

// const crossCuttingThemes = [
//   {
//     id: 'climate-change',
//     name: 'Climate Change',
//     icon: CloudRain,
//     color: 'bg-red-500',
//     description: 'Climate adaptation and mitigation strategies for sustainable agriculture',
//     resources: [
//       {
//         id: 1,
//         title: 'Climate-Smart Agriculture Practices',
//         description: 'Comprehensive guide on climate adaptation strategies',
//         author: 'Dr. Sarah Mwangi',
//         date: '2024-01-15',
//         downloads: 245,
//         type: 'Research Paper'
//       },
//       {
//         id: 2,
//         title: 'Drought-Resistant Crop Varieties',
//         description: 'Development of climate-resilient crop varieties',
//         author: 'Prof. John Kiprotich',
//         date: '2024-02-01',
//         downloads: 189,
//         type: 'Technical Report'
//       }
//     ]
//   },
//   {
//     id: 'gender-youth',
//     name: 'Gender & Youth',
//     icon: Users,
//     color: 'bg-pink-500',
//     description: 'Inclusive agricultural development and empowerment programs',
//     resources: [
//       {
//         id: 3,
//         title: 'Gender Mainstreaming in Agriculture',
//         description: 'Framework for integrating gender perspectives',
//         author: 'Mary Wanjiku',
//         date: '2024-02-10',
//         downloads: 156,
//         type: 'Policy Brief'
//       },
//       {
//         id: 4,
//         title: 'Youth in Agriculture Initiative',
//         description: 'Engaging young people in agricultural innovation',
//         author: 'Dr. Peter Kamau',
//         date: '2024-01-25',
//         downloads: 203,
//         type: 'Program Report'
//       }
//     ]
//   },
//   {
//     id: 'nutrition',
//     name: 'Nutrition & Food Security',
//     icon: Apple,
//     color: 'bg-orange-500',
//     description: 'Food systems research and nutritional improvement strategies',
//     resources: [
//       {
//         id: 5,
//         title: 'Nutritional Enhancement of Staple Crops',
//         description: 'Biofortification strategies for improved nutrition',
//         author: 'Dr. Grace Njeri',
//         date: '2024-01-30',
//         downloads: 278,
//         type: 'Research Paper'
//       },
//       {
//         id: 6,
//         title: 'Food Security Assessment Kenya',
//         description: 'Comprehensive food security analysis',
//         author: 'Prof. David Mwangi',
//         date: '2024-02-05',
//         downloads: 167,
//         type: 'Assessment Report'
//       }
//     ]
//   },
//   {
//     id: 'technology-transfer',
//     name: 'Technology Transfer',
//     icon: Zap,
//     color: 'bg-cyan-500',
//     description: 'Innovation adoption and scaling mechanisms',
//     resources: [
//       {
//         id: 7,
//         title: 'Digital Agriculture Platforms',
//         description: 'Technology adoption in smallholder farming',
//         author: 'Dr. James Ochieng',
//         date: '2024-01-20',
//         downloads: 234,
//         type: 'Technical Guide'
//       },
//       {
//         id: 8,
//         title: 'Innovation Scaling Strategies',
//         description: 'Best practices for technology dissemination',
//         author: 'Prof. Anne Wambui',
//         date: '2024-02-12',
//         downloads: 145,
//         type: 'Strategy Document'
//       }
//     ]
//   },
//   {
//     id: 'capacity-building',
//     name: 'Capacity Building',
//     icon: GraduationCap,
//     color: 'bg-purple-500',
//     description: 'Skills development and training programs',
//     resources: [
//       {
//         id: 9,
//         title: 'Farmer Training Modules',
//         description: 'Comprehensive training curriculum for farmers',
//         author: 'Dr. Lucy Mutua',
//         date: '2024-01-18',
//         downloads: 312,
//         type: 'Training Manual'
//       },
//       {
//         id: 10,
//         title: 'Extension Officer Handbook',
//         description: 'Professional development for extension services',
//         author: 'Prof. Samuel Kibe',
//         date: '2024-02-08',
//         downloads: 198,
//         type: 'Handbook'
//       }
//     ]
//   },
//   {
//     id: 'policy',
//     name: 'Policy & Governance',
//     icon: Scale,
//     color: 'bg-slate-500',
//     description: 'Agricultural policy research and governance frameworks',
//     resources: [
//       {
//         id: 11,
//         title: 'Agricultural Policy Framework 2024',
//         description: 'Comprehensive policy recommendations',
//         author: 'Dr. Francis Njoroge',
//         date: '2024-01-12',
//         downloads: 289,
//         type: 'Policy Document'
//       },
//       {
//         id: 12,
//         title: 'Governance in Agricultural Research',
//         description: 'Best practices in research governance',
//         author: 'Prof. Margaret Wanjiku',
//         date: '2024-02-15',
//         downloads: 176,
//         type: 'Research Paper'
//       }
//     ]
//   },
//   {
//     id: 'market-linkages',
//     name: 'Market Linkages',
//     icon: ShoppingCart,
//     color: 'bg-emerald-500',
//     description: 'Value chain development and market access strategies',
//     resources: [
//       {
//         id: 13,
//         title: 'Value Chain Analysis Framework',
//         description: 'Comprehensive market analysis methodology',
//         author: 'Dr. Robert Kimani',
//         date: '2024-01-28',
//         downloads: 223,
//         type: 'Methodology Guide'
//       },
//       {
//         id: 14,
//         title: 'Market Access for Smallholders',
//         description: 'Strategies for improving market participation',
//         author: 'Prof. Elizabeth Muthoni',
//         date: '2024-02-03',
//         downloads: 187,
//         type: 'Strategy Paper'
//       }
//     ]
//   },
//   {
//     id: 'innovation',
//     name: 'Innovation Systems',
//     icon: Lightbulb,
//     color: 'bg-red-600',
//     description: 'Agricultural innovation ecosystems and networks',
//     resources: [
//       {
//         id: 15,
//         title: 'Innovation Ecosystem Mapping',
//         description: 'Analysis of agricultural innovation networks',
//         author: 'Dr. Michael Waweru',
//         date: '2024-01-22',
//         downloads: 256,
//         type: 'Research Study'
//       },
//       {
//         id: 16,
//         title: 'Innovation Partnership Models',
//         description: 'Collaborative innovation frameworks',
//         author: 'Prof. Catherine Njeri',
//         date: '2024-02-18',
//         downloads: 134,
//         type: 'Framework Document'
//       }
//     ]
//   }
// ]

export const dynamic = 'force-static'
export default function CrossCuttingPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-2">Cross-cutting Themes</h1>
      <p>Content coming soon.</p>
    </div>
  )
}
//   const [searchTerm, setSearchTerm] = useState('')
//   const [activeTab, setActiveTab] = useState('climate-change')

//   const filteredThemes = crossCuttingThemes.map(theme => ({
//     ...theme,
//     resources: theme.resources.filter(resource =>
//       resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       resource.description.toLowerCase().includes(searchTerm.toLowerCase())
//     )
//   }))

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1
//       }
//     }
//   }

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.5
//       }
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Header */}
//         <motion.div
//           className="text-center mb-12"
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//         >
//           <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
//             Cross-cutting <span className="text-[#007A33]">Themes</span>
//           </h1>
//           <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
//             Explore interdisciplinary research themes that span across all agricultural domains, 
//             addressing complex challenges through integrated approaches.
//           </p>
          
//           {/* Search */}
//           <div className="max-w-md mx-auto relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//             <Input
//               placeholder="Search resources..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="pl-10 pr-4 py-2 w-full"
//             />
//           </div>
//         </motion.div>

//         {/* Tabs */}
//         <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
//           {/* Tab List - Responsive Grid */}
//           <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 h-auto p-1 bg-gray-100 mb-8">
//             {crossCuttingThemes.map((theme) => {
//               const IconComponent = theme.icon
//               return (
//                 <TabsTrigger
//                   key={theme.id}
//                   value={theme.id}
//                   className="flex flex-col items-center p-3 data-[state=active]:bg-white data-[state=active]:shadow-sm"
//                 >
//                   <div className={`p-2 rounded-lg ${theme.color} mb-2`}>
//                     <IconComponent className="h-4 w-4 text-white" />
//                   </div>
//                   <span className="text-xs font-medium text-center leading-tight">
//                     {theme.name}
//                   </span>
//                 </TabsTrigger>
//               )
//             })}
//           </TabsList>

//           {/* Tab Content */}
//           {filteredThemes.map((theme) => {
//             const IconComponent = theme.icon
//             return (
//               <TabsContent key={theme.id} value={theme.id} className="mt-0">
//                 <motion.div
//                   variants={containerVariants}
//                   initial="hidden"
//                   animate="visible"
//                 >
//                   {/* Theme Header */}
//                   <motion.div variants={itemVariants} className="mb-8">
//                     <Card className="bg-gradient-to-r from-white to-gray-50 border-0 shadow-lg">
//                       <CardHeader className="pb-6">
//                         <div className="flex items-center space-x-4">
//                           <div className={`p-4 rounded-xl ${theme.color}`}>
//                             <IconComponent className="h-8 w-8 text-white" />
//                           </div>
//                           <div>
//                             <CardTitle className="text-2xl font-bold text-gray-900">
//                               {theme.name}
//                             </CardTitle>
//                             <CardDescription className="text-lg text-gray-600 mt-2">
//                               {theme.description}
//                             </CardDescription>
//                           </div>
//                         </div>
//                       </CardHeader>
//                     </Card>
//                   </motion.div>

//                   {/* Resources Grid */}
//                   <motion.div
//                     variants={containerVariants}
//                     className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
//                   >
//                     {theme.resources.map((resource) => (
//                       <motion.div key={resource.id} variants={itemVariants}>
//                         <Card className="h-full hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
//                           <CardHeader className="pb-4">
//                             <div className="flex items-start justify-between">
//                               <Badge variant="secondary" className="mb-2">
//                                 {resource.type}
//                               </Badge>
//                               <div className="flex items-center space-x-1 text-sm text-gray-500">
//                                 <Download className="h-3 w-3" />
//                                 <span>{resource.downloads}</span>
//                               </div>
//                             </div>
//                             <CardTitle className="text-lg font-semibold text-gray-900 leading-tight">
//                               {resource.title}
//                             </CardTitle>
//                             <CardDescription className="text-gray-600">
//                               {resource.description}
//                             </CardDescription>
//                           </CardHeader>
//                           <CardContent className="pt-0">
//                             <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
//                               <div className="flex items-center space-x-1">
//                                 <User className="h-3 w-3" />
//                                 <span>{resource.author}</span>
//                               </div>
//                               <div className="flex items-center space-x-1">
//                                 <Calendar className="h-3 w-3" />
//                                 <span>{new Date(resource.date).toLocaleDateString()}</span>
//                               </div>
//                             </div>
//                             <div className="flex space-x-2">
//                               <Button size="sm" className="flex-1 bg-[#007A33] hover:bg-[#005a26]">
//                                 <Eye className="h-3 w-3 mr-1" />
//                                 View
//                               </Button>
//                               <Button size="sm" variant="outline" className="flex-1">
//                                 <Download className="h-3 w-3 mr-1" />
//                                 Download
//                               </Button>
//                             </div>
//                           </CardContent>
//                         </Card>
//                       </motion.div>
//                     ))}
//                   </motion.div>

//                   {/* No Results */}
//                   {theme.resources.length === 0 && searchTerm && (
//                     <motion.div
//                       variants={itemVariants}
//                       className="text-center py-12"
//                     >
//                       <div className="text-gray-400 mb-4">
//                         <Search className="h-12 w-12 mx-auto" />
//                       </div>
//                       <h3 className="text-lg font-medium text-gray-900 mb-2">
//                         No resources found
//                       </h3>
//                       <p className="text-gray-600">
//                         Try adjusting your search terms or browse other themes.
//                       </p>
//                     </motion.div>
//                   )}
//                 </motion.div>
//               </TabsContent>
//             )
//           })}
//         </Tabs>
//       </div>
//     </div>
//   )
// }
