import React from "react";
import { ChevronRight, BookOpen } from "lucide-react";

const CodeBlock = ({ code, language = "python" }) => (
  <div className="my-4 rounded-lg overflow-hidden bg-gray-900">
    <div className="flex items-center justify-between px-4 py-2 bg-gray-800">
      <span className="text-sm text-gray-400">{language}</span>
      {/* <button className="text-sm text-gray-400 hover:text-white">Copy code</button> */}
    </div>
    <div className="p-4 font-mono text-sm">
      <pre className="text-green-400">{code}</pre>
    </div>
  </div>
);

const LessonView = ({ lesson, onStartPractice }) => {
  return (
    <div className="flex-1 overflow-auto bg-gray-900 text-white p-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <BookOpen className="w-8 h-8 text-blue-400" />
          <h1 className="text-2xl font-bold">{lesson.title}</h1>
        </div>

        {/* Concept Overview */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Concept Overview:</h2>
          <p className="text-gray-300 leading-relaxed">{lesson.conceptOverview}</p>
        </div>

        {/* Key Concepts */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold mb-4">Key concepts to know:</h2>
          {lesson.keyConcepts.map((concept, index) => (
            <div key={index} className="border-b border-gray-800 last:border-0">
              <h3 className="text-lg font-medium">
                {index + 1}. {concept.title}: <span className="text-gray-400 font-normal">{concept.description}</span>
              </h3>
              {concept.code && <CodeBlock code={concept.code} />}
            </div>
          ))}
        </div>

        {/* Ready for Practice Button */}
        <div className="mt-12 flex justify-center">
          <button
            onClick={onStartPractice}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors"
          >
            Ready to Practice
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LessonView;
