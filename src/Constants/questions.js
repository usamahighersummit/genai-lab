// questions.js
export const codingQuestions = [
    {
      id: 1,
      title: "Hello World",
      difficulty: "Easy",
      description: "Write a program that prints 'Hello, World!' to the console.",
      examples: [
        {
          output: "Hello, World!"
        }
      ],
      solutions: {
        python: {
          starterCode: "# Write your code here\n",
          solution: 'print("Hello, World!")',
        },
        javascript: {
          starterCode: "// Write your code here\n",
          solution: 'console.log("Hello, World!");',
        }
      },
      hints: ["Use print() in Python or console.log() in JavaScript"]
    },
    {
      id: 2,
      title: "Sum of Two Numbers",
      difficulty: "Easy",
      description: "Write a function that takes two numbers as parameters and returns their sum.",
      examples: [
        {
          input: "Input: a=5, b=3",
          output: "8"
        }
      ],
      solutions: {
        python: {
          starterCode: `def sum_numbers(a, b):
      # Write your code here
      pass
  
  # Test your function
  print(sum_numbers(5, 3))`,
          solution: `def sum_numbers(a, b):
      return a + b
  
  # Test your function
  print(sum_numbers(5, 3))`,
        },
        javascript: {
          starterCode: `function sumNumbers(a, b) {
      // Write your code here
  }
  
  // Test your function
  console.log(sumNumbers(5, 3));`,
          solution: `function sumNumbers(a, b) {
      return a + b;
  }
  
  // Test your function
  console.log(sumNumbers(5, 3));`,
        }
      },
      hints: ["Use the + operator to add numbers"]
    },
    {
      id: 3,
      title: "Reverse a String",
      difficulty: "Easy",
      description: "Write a function that reverses a string. The input string is given as an array of characters.",
      examples: [
        {
          input: 'Input: "hello"',
          output: 'Output: "olleh"'
        }
      ],
      solutions: {
        python: {
          starterCode: `def reverse_string(text):
      # Write your code here
      pass
  
  # Test your function
  print(reverse_string("hello"))`,
          solution: `def reverse_string(text):
      return text[::-1]
  
  # Test your function
  print(reverse_string("hello"))`,
        },
        javascript: {
          starterCode: `function reverseString(text) {
      // Write your code here
  }
  
  // Test your function
  console.log(reverseString("hello"));`,
          solution: `function reverseString(text) {
      return text.split('').reverse().join('');
  }
  
  // Test your function
  console.log(reverseString("hello"));`,
        }
      },
      hints: [
        "Python: Try using string slicing with a negative step",
        "JavaScript: Try split(), reverse(), and join() methods"
      ]
    },
    {
      id: 4,
      title: "Count Vowels",
      difficulty: "Easy",
      description: "Write a function that counts the number of vowels in a given string. Consider 'a', 'e', 'i', 'o', 'u' as vowels.",
      examples: [
        {
          input: 'Input: "hello world"',
          output: "Output: 3"
        }
      ],
      solutions: {
        python: {
          starterCode: `def count_vowels(text):
      # Write your code here
      pass
  
  # Test your function
  print(count_vowels("hello world"))`,
          solution: `def count_vowels(text):
      vowels = 'aeiou'
      return sum(1 for char in text.lower() if char in vowels)
  
  # Test your function
  print(count_vowels("hello world"))`,
        },
        javascript: {
          starterCode: `function countVowels(text) {
      // Write your code here
  }
  
  // Test your function
  console.log(countVowels("hello world"));`,
          solution: `function countVowels(text) {
      const vowels = 'aeiou';
      return text.toLowerCase().split('')
          .filter(char => vowels.includes(char)).length;
  }
  
  // Test your function
  console.log(countVowels("hello world"));`,
        }
      },
      hints: [
        "Create a string containing all vowels",
        "Convert the string to lowercase for easier comparison",
        "Python: Use list comprehension or generator expression",
        "JavaScript: Use array methods like filter()"
      ]
    }
  ];