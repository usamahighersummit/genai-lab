import React, { useState, useRef } from "react";
import { Mic, MicOff, Play, Terminal, ChevronLeft, ChevronRight, Code2, Lightbulb, Info, TestTube, CheckCircle2 } from "lucide-react";
import Editor from "@monaco-editor/react";
import { codingQuestions } from "../Constants/questions";
import AIResponseFormatter from "../Components/MainLayout/AIResponseFormatter";
import HolographicAI from "../Components/MainLayout/HolographicAI";

function MainLayout() {
  const editorRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState("python");
  const [output, setOutput] = useState("");
  const [isEditorReady, setIsEditorReady] = useState(false);
  const [isProcessingVoice, setIsProcessingVoice] = useState(false);
  const [transcription, setTranscription] = useState(null);

  const currentQuestion = codingQuestions[currentQuestionIndex];

  function handleEditorDidMount(editor) {
    editorRef.current = editor;
    setIsEditorReady(true);
    editor.setValue(currentQuestion.solutions[selectedLanguage].starterCode);
  }

  function handleLanguageChange(e) {
    const newLanguage = e.target.value;
    setSelectedLanguage(newLanguage);
    if (editorRef.current) {
      editorRef.current.setValue(currentQuestion.solutions[newLanguage].starterCode);
    }
  }

  function handleNextQuestion() {
    if (currentQuestionIndex < codingQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      if (editorRef.current) {
        editorRef.current.setValue(codingQuestions[currentQuestionIndex + 1].solutions[selectedLanguage].starterCode);
      }
      setOutput("");
    }
  }

  function handlePreviousQuestion() {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      if (editorRef.current) {
        editorRef.current.setValue(codingQuestions[currentQuestionIndex - 1].solutions[selectedLanguage].starterCode);
      }
      setOutput("");
    }
  }

  async function handleRunCode() {
    try {
      setOutput("Running code...");

      const response = await fetch("http://localhost:8000/execute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: editorRef.current.getValue(),
          language: selectedLanguage,
          input_data: "",
        }),
      });

      const data = await response.json();

      if (data.status === "success") {
        setOutput(data.output || "Program executed successfully with no output.");
      } else {
        setOutput(`Error:\n${data.error || "Unknown error occurred"}`);
      }
    } catch (error) {
      setOutput(`Failed to execute code: ${error.message}`);
    }
  }

  async function handleStartRecording() {
    try {
      setIsRecording(true);
      const response = await fetch("http://localhost:8000/start-recording", {
        method: "POST",
      });

      const data = await response.json();
      if (data.status !== "success") {
        console.error("Failed to start recording:", data.message);
        setIsRecording(false);
      }
    } catch (error) {
      console.error("Error starting recording:", error);
      setIsRecording(false);
    }
  }

  async function handleStopRecording() {
    try {
      setIsProcessingVoice(true);
      const response = await fetch("http://localhost:8000/stop-recording", {
        method: "POST",
      });

      const data = await response.json();
      if (data.status === "success" && data.transcription) {
        const userQuery = data.transcription;

        const commandResponse = await fetch("http://localhost:8000/process-voice-command", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            command: userQuery,
            currentQuestion: currentQuestion,
            currentCode: editorRef.current ? editorRef.current.getValue() : "",
            language: selectedLanguage,
          }),
        });

        const commandData = await commandResponse.json();
        if (commandData.status === "success") {
          setTranscription({
            query: userQuery,
            answer: commandData.response.help_text,
          });
        }
      } else {
        console.error("Failed to stop recording:", data.message);
        setTranscription(null);
      }
    } catch (error) {
      console.error("Error stopping recording:", error);
      setTranscription(null);
    } finally {
      setIsRecording(false);
      setIsProcessingVoice(false);
    }
  }

  function toggleRecording() {
    if (!isRecording) {
      handleStartRecording();
    } else {
      handleStopRecording();
    }
  }

  return (
    <div className="h-screen flex flex-col bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 flex-none">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Code2 className="w-8 h-8 text-blue-400" />
              <h1 className="text-2xl font-bold text-white">GenAI Lab</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Question Panel */}
        <div className="w-96 bg-gray-800 shadow-lg overflow-auto border-r border-gray-700">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <span className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm border border-blue-500/20">
                Challenge {currentQuestionIndex + 1} of {codingQuestions.length}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  currentQuestion.difficulty === "Easy"
                    ? "bg-green-500/10 text-green-400 border border-green-500/20"
                    : currentQuestion.difficulty === "Medium"
                    ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                    : "bg-red-500/10 text-red-400 border border-red-500/20"
                }`}
              >
                {currentQuestion.difficulty}
              </span>
            </div>

            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <TestTube className="w-5 h-5 text-blue-400" />
              {currentQuestion.title}
            </h2>

            <div className="prose max-w-none text-gray-300">
              <p className="mb-6">{currentQuestion.description}</p>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <Info className="w-5 h-5 text-blue-400" />
                  Examples
                </h3>
                {currentQuestion.examples.map((example, index) => (
                  <div key={index} className="bg-gray-900/50 p-4 rounded-lg mb-3 border border-gray-700">
                    {example.input && (
                      <div className="mb-2">
                        <span className="text-gray-400 text-sm font-medium">Input:</span>
                        <code className="ml-2 text-gray-300 font-mono text-sm">{example.input}</code>
                      </div>
                    )}
                    <div>
                      <span className="text-gray-400 text-sm font-medium">Output:</span>
                      <code className="ml-2 text-gray-300 font-mono text-sm">{example.output}</code>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-yellow-400" />
                  Hints
                </h3>
                <ul className="space-y-2">
                  {currentQuestion.hints.map((hint, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-400 mt-1 flex-shrink-0" />
                      <span className="text-gray-300">{hint}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex justify-between mt-6 pt-6 border-t border-gray-700">
              <button
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  currentQuestionIndex === 0 ? "bg-gray-700/50 text-gray-500 cursor-not-allowed" : "bg-gray-700 text-white hover:bg-gray-600"
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>

              <button
                onClick={handleNextQuestion}
                disabled={currentQuestionIndex === codingQuestions.length - 1}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  currentQuestionIndex === codingQuestions.length - 1
                    ? "bg-gray-700/50 text-gray-500 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-500"
                }`}
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Editor Section */}
        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex-1 p-4 min-h-0">
            <div className="h-full rounded-lg overflow-hidden shadow-xl bg-gray-800 flex flex-col border border-gray-700">
              <div className="bg-gray-900 text-white p-3 flex items-center justify-between gap-3 flex-none border-b border-gray-700">
                <div className="flex items-center gap-3">
                  <label htmlFor="language" className="font-medium text-gray-300">
                    Language:
                  </label>
                  <select
                    id="language"
                    value={selectedLanguage}
                    onChange={handleLanguageChange}
                    className="bg-gray-800 text-white rounded-lg px-3 py-1.5 outline-none focus:ring-2 focus:ring-blue-500 border border-gray-600"
                  >
                    <option value="python">Python</option>
                    <option value="javascript">JavaScript</option>
                  </select>
                </div>
                <button
                  onClick={handleRunCode}
                  className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-green-600 hover:bg-green-500 text-white transition-colors"
                >
                  <Play className="w-4 h-4" />
                  Run Code
                </button>
              </div>

              <div className="flex-1 min-h-0">
                {!isEditorReady && (
                  <div className="h-full flex items-center justify-center bg-gray-900">
                    <p className="text-gray-300">Loading editor...</p>
                  </div>
                )}
                <Editor
                  height="100%"
                  language={selectedLanguage}
                  theme="vs-dark"
                  onMount={handleEditorDidMount}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    wordWrap: "on",
                    padding: { top: 20 },
                    lineNumbers: "on",
                    roundedSelection: false,
                    cursorStyle: "line",
                    renderLineHighlight: "all",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Output Panel */}
          <div className="h-1/3 p-4 min-h-0">
            <div className="h-full rounded-lg overflow-hidden shadow-xl bg-gray-800 flex flex-col border border-gray-700">
              <div className="bg-gray-900 text-white p-3 flex justify-between items-center flex-none border-b border-gray-700">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-green-400" />
                  <span className="font-medium">Console Output</span>
                </div>
              </div>
              <div className="flex-1 p-4 overflow-auto font-mono text-sm bg-gray-900/50">
                <pre className="text-gray-300">{output || "Program output will appear here..."}</pre>
              </div>
            </div>
          </div>
        </div>

        {/* Voice Assistant Panel */}
        <div className="w-80 bg-gray-800 shadow-lg p-4 flex-none border-l border-gray-700">
          <div className="h-full flex flex-col">
            <h2 className="text-lg font-semibold mb-4 text-white flex items-center gap-2">
              <Mic className="w-5 h-5 text-blue-400" />
              Voice Assistant
            </h2>
            <div
              className="flex-1 bg-gray-900/50 rounded-lg p-4 mb-4 overflow-auto border border-gray-700"
              style={{ display: isProcessingVoice && "flex", alignItems: isProcessingVoice && "center" }}
            >
              {isProcessingVoice ? (
                <div>
                  {" "}
                  {/* Add fixed height container */}
                  {/* <p className="text-gray-400 mb-4">Processing voice command...</p> */}
                  <HolographicAI />
                </div>
              ) : transcription ? (
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-400 font-medium mb-2">You asked:</p>
                    <p className="text-gray-300 mb-4">{transcription.query}</p>
                  </div>

                  <div>
                    <p className="text-gray-400 font-medium mb-2">Answer:</p>
                    <AIResponseFormatter response={transcription.answer} />
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <p className="text-gray-400 italic mb-2">Ask me specific questions like:</p>
                  <ul className="text-gray-500 text-sm space-y-2">
                    <li>❓ "What does this error mean?"</li>
                    <li>🤔 "How do I start solving this problem?"</li>
                    <li>🔍 "Can you explain what a for loop does?"</li>
                    <li>📝 "How can I check if my logic is correct?"</li>
                    <li>⚡ "I'm stuck on step 2, can you give me a hint?"</li>
                  </ul>
                  <p className="text-gray-400 text-sm mt-4">I'll guide you towards the solution without solving it for you!</p>
                </div>
              )}
            </div>
            <button
              onClick={toggleRecording}
              disabled={isProcessingVoice}
              className={`w-full py-3 rounded-lg flex items-center justify-center gap-2 transition-colors ${
                isRecording ? "bg-red-600 hover:bg-red-500 text-white" : "bg-blue-600 hover:bg-blue-500 text-white"
              } ${isProcessingVoice ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {isRecording ? (
                <>
                  <MicOff className="w-5 h-5" />
                  Stop Recording
                </>
              ) : (
                <>
                  <Mic className="w-5 h-5" />
                  {isProcessingVoice ? "Processing..." : "Start Recording"}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
