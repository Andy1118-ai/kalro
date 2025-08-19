import HeroSection from "@/components/hero-section"
import { DomainCards } from "@/components/domain-cards"
import { FeaturedContent } from "@/components/featured-content"
import { SearchSection } from "@/components/search-section"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F4F1E1] to-white">
      <HeroSection />
      <SearchSection />
      <DomainCards />
      <FeaturedContent />
    </div>
  )
}
