'use client'

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-wine-950 via-wine-900 to-wine-950"></div>
      
      {/* Animated decorative elements - Large blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-wine-800/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-wine-700/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-wine-900/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      
      {/* Floating animated circles - More variations */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-wine-600/10 rounded-full blur-2xl animate-float"></div>
      <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-wine-700/10 rounded-full blur-2xl animate-float-delayed"></div>
      <div className="absolute bottom-1/4 left-1/3 w-36 h-36 bg-wine-800/10 rounded-full blur-2xl animate-float-slow"></div>
      <div className="absolute top-2/3 right-1/3 w-28 h-28 bg-wine-600/15 rounded-full blur-2xl animate-float"></div>
      <div className="absolute top-1/5 right-1/5 w-44 h-44 bg-wine-500/8 rounded-full blur-3xl animate-float-delayed"></div>
      <div className="absolute bottom-1/3 left-1/5 w-38 h-38 bg-wine-700/12 rounded-full blur-2xl animate-float-slow"></div>
      <div className="absolute top-3/4 left-2/3 w-35 h-35 bg-wine-600/12 rounded-full blur-2xl animate-float"></div>
      <div className="absolute bottom-1/5 right-1/4 w-42 h-42 bg-wine-500/10 rounded-full blur-3xl animate-float-delayed"></div>
      
      {/* Animated decorative shapes - Small dots floating */}
      <div className="absolute top-32 right-20 w-4 h-4 bg-wine-400/30 rounded-full animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '3s' }}></div>
      <div className="absolute top-48 left-32 w-3 h-3 bg-wine-300/40 rounded-full animate-bounce" style={{ animationDelay: '1.5s', animationDuration: '2.5s' }}></div>
      <div className="absolute bottom-48 right-32 w-5 h-5 bg-wine-500/30 rounded-full animate-bounce" style={{ animationDelay: '2s', animationDuration: '3.5s' }}></div>
      <div className="absolute top-64 left-20 w-4 h-4 bg-wine-400/35 rounded-full animate-bounce" style={{ animationDelay: '0.8s', animationDuration: '2.8s' }}></div>
      <div className="absolute bottom-32 left-1/4 w-3 h-3 bg-wine-300/45 rounded-full animate-bounce" style={{ animationDelay: '1.2s', animationDuration: '3.2s' }}></div>
      <div className="absolute top-80 right-1/3 w-5 h-5 bg-wine-500/35 rounded-full animate-bounce" style={{ animationDelay: '2.5s', animationDuration: '4s' }}></div>
      <div className="absolute bottom-64 right-16 w-4 h-4 bg-wine-400/30 rounded-full animate-bounce" style={{ animationDelay: '1.8s', animationDuration: '3.8s' }}></div>
      <div className="absolute top-1/2 left-16 w-3 h-3 bg-wine-300/40 rounded-full animate-bounce" style={{ animationDelay: '0.3s', animationDuration: '2.6s' }}></div>
      <div className="absolute top-1/3 left-1/2 w-4 h-4 bg-wine-400/35 rounded-full animate-bounce" style={{ animationDelay: '1.7s', animationDuration: '3.3s' }}></div>
      <div className="absolute bottom-1/4 right-1/2 w-3 h-3 bg-wine-300/40 rounded-full animate-bounce" style={{ animationDelay: '2.3s', animationDuration: '3.7s' }}></div>
      
      {/* Animated geometric shapes */}
      <div className="absolute top-1/4 right-1/5 w-8 h-8 border-2 border-wine-400/20 rotate-45 animate-spin-slow"></div>
      <div className="absolute bottom-1/4 left-1/6 w-6 h-6 border-2 border-wine-500/25 rotate-45 animate-spin-slow-reverse"></div>
      <div className="absolute top-2/3 left-1/4 w-10 h-10 border-2 border-wine-300/20 rotate-45 animate-spin-slow" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-1/3 right-1/4 w-7 h-7 border-2 border-wine-400/25 rotate-45 animate-spin-slow-reverse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 right-1/6 w-9 h-9 border-2 border-wine-500/20 rotate-45 animate-spin-slow" style={{ animationDelay: '1.5s' }}></div>
      <div className="absolute bottom-2/3 left-1/5 w-6 h-6 border-2 border-wine-300/25 rotate-45 animate-spin-slow-reverse" style={{ animationDelay: '2.5s' }}></div>
      
      {/* Animated lines/waves */}
      <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-wine-600/20 to-transparent animate-slide-right"></div>
      <div className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-l from-transparent via-wine-500/20 to-transparent animate-slide-left"></div>
      <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-wine-700/15 to-transparent animate-slide-right" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-l from-transparent via-wine-600/15 to-transparent animate-slide-left" style={{ animationDelay: '1s' }}></div>
    </div>
  )
}

