import React from "react";
import { ChevronRight, Code2, Brain, Target, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="py-6">
          <div className="flex items-center gap-2">
            <Code2 className="w-8 h-8 text-blue-400" />
            <h1 className="text-2xl font-bold text-white">GenAI Lab</h1>
          </div>
        </header>

        {/* Hero Section */}
        <main className="py-16">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
              <span className="block">Master Programming With</span>
              <span className="block text-blue-400">AI-Powered Learning</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Learn, practice, and grow! Start with interactive lessons to grasp the basics, then test your knowledge with fun challenges.
            </p>
          </div>

          {/* Features */}
          <div className="mt-24 grid gap-8 md:grid-cols-3">
            <div className="relative rounded-lg bg-gray-800 p-6 border border-gray-700">
              <div className="absolute -top-4 left-4">
                <div className="rounded-full bg-blue-500/10 p-3 border border-blue-500/20">
                  <Brain className="w-6 h-6 text-blue-400" />
                </div>
              </div>
              <h3 className="mt-4 text-xl font-semibold text-white">Interactive Learning</h3>
              <p className="mt-2 text-gray-300">
                Step-by-step lessons with real-time feedback and AI assistance to help you understand concepts better.
              </p>
            </div>

            <div className="relative rounded-lg bg-gray-800 p-6 border border-gray-700">
              <div className="absolute -top-4 left-4">
                <div className="rounded-full bg-green-500/10 p-3 border border-green-500/20">
                  <Target className="w-6 h-6 text-green-400" />
                </div>
              </div>
              <h3 className="mt-4 text-xl font-semibold text-white">Hands-on Practice</h3>
              <p className="mt-2 text-gray-300">
                Reinforce your learning with practical coding challenges and get immediate feedback on your solutions.
              </p>
            </div>

            <div className="relative rounded-lg bg-gray-800 p-6 border border-gray-700">
              <div className="absolute -top-4 left-4">
                <div className="rounded-full bg-purple-500/10 p-3 border border-purple-500/20">
                  <Sparkles className="w-6 h-6 text-purple-400" />
                </div>
              </div>
              <h3 className="mt-4 text-xl font-semibold text-white">AI Assistant</h3>
              <p className="mt-2 text-gray-300">Get help from our AI tutor whenever you're stuck. Ask questions and receive guided explanations.</p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-24 text-center">
            <h2 className="text-3xl font-bold text-white">Ready to Start Your Journey?</h2>
            <p className="mt-4 text-xl text-gray-300">Join our interactive platform to master Programming.</p>
            <button
              onClick={() => navigate("/lessons")}
              className="mt-8 inline-flex items-center gap-2 px-6 py-3 border border-transparent text-base font-medium rounded-lg text-gray-900 bg-white hover:bg-gray-100 md:py-4 md:text-lg md:px-8 transition-all hover:scale-105"
            >
              Begin Your Programming Journey
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HomePage;
