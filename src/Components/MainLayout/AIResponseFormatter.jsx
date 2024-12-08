import React from "react";

const CodeBlock = ({ code }) => (
  <div className="mt-2 mb-3">
    <div className="bg-gray-800/50 rounded-lg">
      <div className="flex items-center space-x-1.5 p-2 border-b border-gray-700">
        <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
      </div>
      <div className="p-3 font-mono text-sm">
        {code.split("\n").map((line, i) => (
          <div key={i} className="leading-6">
            <SyntaxHighlighter text={line} />
          </div>
        ))}
      </div>
    </div>
  </div>
);

const SyntaxHighlighter = ({ text }) => {
  const tokens = text.split(/(\s+|[^\w\s]+)/g).filter(Boolean);

  return tokens.map((token, index) => {
    if (["print", "in", "def", "return"].includes(token)) {
      return (
        <span key={index} className="text-purple-400">
          {token}
        </span>
      );
    }
    if (["(", ")", ".", '"', "'"].includes(token)) {
      return (
        <span key={index} className="text-blue-400">
          {token}
        </span>
      );
    }
    if (/^["'].*["']$/.test(token)) {
      return (
        <span key={index} className="text-green-400">
          {token}
        </span>
      );
    }
    if (token.startsWith("#")) {
      return (
        <span key={index} className="text-gray-500">
          {token}
        </span>
      );
    }
    return <span key={index}>{token}</span>;
  });
};

const AIResponseFormatter = ({ response }) => {
  const processText = (text) => {
    let processed = text;
    const keywords = ["print", "in"];
    keywords.forEach((keyword) => {
      const regex = new RegExp(`\\b${keyword}\\s+${keyword}\\b`, "g");
      processed = processed.replace(regex, keyword);
    });
    return processed;
  };

  const renderLine = (line) => {
    const sections = {
      "✓ Working Parts:": "text-green-400",
      "⚠ Areas to Check:": "text-yellow-400",
      "💡 Hint:": "text-blue-400",
      "🔍 Example:": "text-purple-400",
    };

    // Skip markdown code block markers
    if (line.trim() === "python" || line.match(/^```/)) {
      return null;
    }

    // Handle section headers
    for (const [section, color] of Object.entries(sections)) {
      if (line.startsWith(section)) {
        return (
          <div className="my-3">
            <span className={`font-semibold ${color}`}>{section}</span>
            <span className="ml-2">{renderContent(processText(line.substring(section.length).trim()))}</span>
          </div>
        );
      }
    }

    return <div className="my-2">{renderContent(processText(line))}</div>;
  };

  const renderContent = (text) => {
    const parts = text.split(/(\b(?:print|in)\b|[()]|`[^`]+`)/g);
    return parts.map((part, index) => {
      if (!part) return null;
      if (["print", "in"].includes(part)) {
        return (
          <span key={index} className="text-purple-400 font-mono">
            {part}
          </span>
        );
      }
      if (["(", ")"].includes(part)) {
        return (
          <span key={index} className="text-blue-400">
            {part}
          </span>
        );
      }
      if (part.startsWith("`") && part.endsWith("`")) {
        return (
          <span key={index} className="text-purple-400 font-mono">
            {part.slice(1, -1)}
          </span>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  const processResponse = (text) => {
    const parts = text.split(/(```python[\s\S]*?```)/g);
    return parts.map((part, index) => {
      if (part.startsWith("```python")) {
        // Extract code between markers and remove the markers
        const code = part
          .replace(/```python\n?/, "")
          .replace(/```$/, "")
          .trim();
        return <CodeBlock key={index} code={code} />;
      }
      return <div key={index}>{part.split("\n").map((line, i) => line.trim() && renderLine(line))}</div>;
    });
  };

  return <div className="space-y-1 text-gray-300">{processResponse(response)}</div>;
};

export default AIResponseFormatter;
