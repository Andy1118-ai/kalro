import { useState } from 'react';
import { Search, Users, FileText, TrendingUp, Download } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-[70vh] lg:min-h-[80vh] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/farmers.jpg"
          alt="Farmers background"
          className="w-full h-full object-cover"
        />
        {/* Clean glassmorphism overlay */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-50px" />
      </div>
      
      {/* Animated Background Elements with glassmorphism */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 backdrop-blur-sm rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 backdrop-blur-sm rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 w-60 h-60 bg-white/5 backdrop-blur-sm rounded-full blur-2xl animate-spin" style={{ animationDuration: '15s' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="flex justify-center items-center min-h-[45vh] lg:min-h-[50vh]">
          {/* Main Content */}
          <div className="text-center max-w-4xl">
            {/* Badge with glassmorphism */}
            <div className="mb-6 lg:mb-8">
              <span className="inline-flex px-4 py-2 text-sm font-medium bg-white/20 backdrop-blur-md text-white border border-white/30 rounded-full hover:bg-white/30 transition-all duration-300 shadow-lg">
                🌱 Advancing Agricultural Research in Kenya
              </span>
            </div>

            {/* Main Heading */}
            <div className="mb-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight drop-shadow-2xl">
                KALRO{' '}
                <span className="text-brown-500 animate-pulse drop-shadow-lg">
                  Knowledge
                </span>
                <br />
                Bank
              </h1>
            </div>

            {/* Subtitle */}
            <p className="text-lg md:text-xl lg:text-2xl text-white/90 mb-8 lg:mb-12 leading-relaxed max-w-2xl mx-auto lg:mx-0 drop-shadow-lg">
              Discover cutting-edge agricultural research, innovative solutions, and knowledge resources 
              that drive sustainable farming practices across Kenya and beyond.
            </p>

            {/* CTA Buttons with glassmorphism */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12 lg:mb-16">
              <button className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white border border-white/30 px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 w-full sm:w-auto rounded-xl hover:scale-105 flex items-center justify-center">
                <Search className="mr-2 h-5 w-5" />
                Explore Research
              </button>
              <button className="border border-white/40 text-white hover:bg-white/20 backdrop-blur-md hover:text-white px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 w-full sm:w-auto rounded-xl hover:scale-105 flex items-center justify-center">
                <FileText className="mr-2 h-5 w-5" />
                Browse Documents
              </button>
            </div>
          </div>
        </div>
        
        {/* Centralized Analytics Cards at Bottom */}
        <div className="relative mt-16 pb-8">
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            <div className="animate-bounce">
              <div className="bg-white/20 backdrop-blur-md shadow-2xl border border-white/30 rounded-xl p-4 md:p-6">
                <div className="flex items-center space-x-3 md:space-x-4">
                  <div className="p-3 bg-green-700/20 backdrop-blur-sm rounded-lg">
                    <Users className="h-6 w-6 md:h-7 md:w-7 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl md:text-3xl font-bold text-white">500+</div>
                    <div className="text-sm md:text-base text-white/80">Researchers</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="animate-bounce" style={{ animationDelay: '0.5s' }}>
              <div className="bg-white/20 backdrop-blur-md shadow-2xl border border-white/30 rounded-xl p-4 md:p-6">
                <div className="flex items-center space-x-3 md:space-x-4">
                  <div className="p-3 bg-blue-500/20 backdrop-blur-sm rounded-lg">
                    <FileText className="h-6 w-6 md:h-7 md:w-7 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl md:text-3xl font-bold text-white">2,500+</div>
                    <div className="text-sm md:text-base text-white/80">Publications</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="animate-bounce" style={{ animationDelay: '1.0s' }}>
              <div className="bg-white/20 backdrop-blur-md shadow-2xl border border-white/30 rounded-xl p-4 md:p-6">
                <div className="flex items-center space-x-3 md:space-x-4">
                  <div className="p-3 bg-blue-500/20 backdrop-blur-sm rounded-lg">
                    <Download className="h-6 w-6 md:h-7 md:w-7 text-brown-500" />
                  </div>
                  <div>
                    <div className="text-2xl md:text-3xl font-bold text-white">2,500+</div>
                    <div className="text-sm md:text-base text-white/80">Downloads</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="animate-bounce" style={{ animationDelay: '1.5s' }}>
              <div className="bg-white/20 backdrop-blur-md shadow-2xl border border-white/30 rounded-xl p-4 md:p-6">
                <div className="flex items-center space-x-3 md:space-x-4">
                  <div className="p-3 bg-green-500/20 backdrop-blur-sm rounded-lg">
                    <TrendingUp className="h-6 w-6 md:h-7 md:w-7 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl md:text-3xl font-bold text-white">50+</div>
                    <div className="text-sm md:text-base text-white/80">Projects</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}