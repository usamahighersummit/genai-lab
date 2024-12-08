// lessons.js
export const programmingLessons = [
    {
      id: 1,
      title: "Introduction to Python: Your First Program",
      conceptOverview: "Python is a beginner-friendly programming language known for its readability. Let's start with the basics of writing and running Python code.",
      keyConcepts: [
        {
          title: "Print Statement",
          description: "The print() function displays text or values on the screen. It's often the first thing you learn in any programming language!",
          code: 'print("Hello, Python!")'
        },
        {
          title: "Strings",
          description: "Text in Python is called a string. Strings are created by enclosing text in single or double quotes.",
          code: 'message = "Hello!"\nname = \'Alice\''
        },
        {
          title: "Basic Syntax",
          description: "Python uses indentation to structure code and doesn't need semicolons at the end of lines.",
          code: 'print("Line 1")\nprint("Line 2")'
        }
      ],
      practice: {
        id: 1,
        title: "Your First Python Program",
        difficulty: "Easy",
        description: "Write a program that prints 'I love coding!' to the console. Then on the next line, print 'Python is awesome!'",
        examples: [
          {
            input: null,
            output: "<br/>I love coding!<br/>Python is awesome!"
          }
        ],
        solutions: {
          python: {
            starterCode: "# Write two print statements here\n",
            solution: 'print("I love coding!")\nprint("Python is awesome!")',
          },
          javascript: {
            starterCode: "// Write two console.log statements here\n",
            solution: 'console.log("I love coding!");\nconsole.log("Python is awesome!");',
          }
        },
        hints: [
          "Remember to use print() in Python",
          "Each print statement will create a new line automatically"
        ]
      }
    },
    {
      id: 2,
      title: "Variables and Basic Data Types",
      conceptOverview: "Variables are containers for storing data values. Python has several basic data types that we use frequently.",
      keyConcepts: [
        {
          title: "Variables",
          description: "Variables store values that can be used later in your program. They're like labeled boxes for your data.",
          code: 'age = 25\nname = "Bob"\nis_student = True'
        },
        {
          title: "Numbers",
          description: "Python has integers (whole numbers) and floats (decimal numbers).",
          code: 'count = 10        # integer\nprice = 19.99    # float'
        },
        {
          title: "Basic Operations",
          description: "You can perform mathematical operations with numbers.",
          code: 'x = 5 + 3    # addition\ny = 10 - 2   # subtraction\nz = 4 * 3    # multiplication'
        }
      ],
      practice: {
        id: 2,
        title: "Calculate Total Cost",
        difficulty: "Easy",
        description: "Create a program that calculates the total cost of items. Create two variables: price = 10.99 and quantity = 5. Calculate the total cost (price * quantity) and print it.",
        examples: [
          {
            input: "price = 10.99, quantity = 5",
            output: "54.95"
          }
        ],
        solutions: {
          python: {
            starterCode: "# Create your variables here\n# Calculate and print the total\n",
            solution: 'price = 10.99\nquantity = 5\ntotal = price * quantity\nprint(total)',
          },
          javascript: {
            starterCode: "// Create your variables here\n// Calculate and print the total\n",
            solution: 'const price = 10.99;\nconst quantity = 5;\nconst total = price * quantity;\nconsole.log(total);',
          }
        },
        hints: [
          "Define your variables with the correct values",
          "Use the multiplication operator *",
          "Make sure to print/log the final result"
        ]
      }
    },
    {
      id: 3,
      title: "String Operations and Methods",
      conceptOverview: "Strings in Python are versatile and come with many built-in methods to manipulate text data.",
      keyConcepts: [
        {
          title: "String Concatenation",
          description: "Joining strings together using the + operator.",
          code: 'first = "Hello"\nsecond = "World"\nfull = first + " " + second'
        },
        {
          title: "String Methods",
          description: "Built-in functions that can modify or analyze strings.",
          code: 'text = "Python"\nprint(text.upper())    # PYTHON\nprint(text.lower())    # python'
        },
        {
          title: "String Formatting",
          description: "Using f-strings to embed variables in text.",
          code: 'name = "Alice"\nage = 25\nmessage = f"{name} is {age} years old"'
        }
      ],
      practice: {
        id: 3,
        title: "String Transformer",
        difficulty: "Easy",
        description: "Create a program that transforms a given name in three ways. Start with the variable name = 'alice' and print it in: 1) all uppercase, 2) all lowercase, and 3) with the first letter capitalized.",
        examples: [
          {
            input: "name = 'alice'",
            output: "ALICE\nalice\nAlice"
          }
        ],
        solutions: {
          python: {
            starterCode: "name = 'alice'\n# Transform and print the name in three ways\n",
            solution: 'name = "alice"\nprint(name.upper())\nprint(name.lower())\nprint(name.capitalize())',
          },
          javascript: {
            starterCode: "let name = 'alice';\n// Transform and print the name in three ways\n",
            solution: 'let name = "alice";\nconsole.log(name.toUpperCase());\nconsole.log(name.toLowerCase());\nconsole.log(name[0].toUpperCase() + name.slice(1));',
          }
        },
        hints: [
          "Use upper()/toUpperCase() for uppercase",
          "Use lower()/toLowerCase() for lowercase",
          "Use capitalize() in Python"
        ]
      }
    },
    {
      id: 4,
      title: "Making Decisions with If Statements",
      conceptOverview: "Programs often need to make decisions. If statements allow your code to execute different actions based on conditions.",
      keyConcepts: [
        {
          title: "If Statement",
          description: "Basic decision making using if keyword.",
          code: 'age = 18\nif age >= 18:\n    print("You are an adult")'
        },
        {
          title: "If-Else",
          description: "Making either-or decisions.",
          code: 'temperature = 25\nif temperature > 30:\n    print("It\'s hot!")\nelse:\n    print("It\'s nice!")'
        },
        {
          title: "Comparison Operators",
          description: "Used to compare values: == (equal), != (not equal), >, <, >=, <=",
          code: 'x = 5\ny = 10\nif x < y:\n    print("x is less than y")'
        }
      ],
      practice: {
        id: 4,
        title: "Temperature Classifier",
        difficulty: "Easy",
        description: "Create a program that classifies a temperature (stored in variable 'temp'). If temperature is above 30°C, print 'Hot day!'. If temperature is between 20°C and 30°C (inclusive), print 'Nice day!'. If temperature is below 20°C, print 'Cool day!'.",
        examples: [
          {
            input: "temp = 35",
            output: "Hot day!"
          },
          {
            input: "temp = 25",
            output: "Nice day!"
          },
          {
            input: "temp = 15",
            output: "Cool day!"
          }
        ],
        solutions: {
          python: {
            starterCode: "temp = 25\n# Write your temperature classification code here\n",
            solution: 'temp = 25\nif temp > 30:\n    print("Hot day!")\nelif temp >= 20:\n    print("Nice day!")\nelse:\n    print("Cool day!")',
          },
          javascript: {
            starterCode: "let temp = 25;\n// Write your temperature classification code here\n",
            solution: 'let temp = 25;\nif (temp > 30) {\n    console.log("Hot day!");\n} else if (temp >= 20) {\n    console.log("Nice day!");\n} else {\n    console.log("Cool day!");\n}',
          }
        },
        hints: [
          "Start with the highest temperature condition first",
          "Use elif/else if for the middle range",
          "Use else for the lowest range",
          "Remember proper indentation in Python"
        ]
      }
    },
    {
      id: 5,
      title: "Loops: Doing Things Repeatedly",
      conceptOverview: "Loops allow you to repeat actions multiple times without writing the same code over and over.",
      keyConcepts: [
        {
          title: "For Loop",
          description: "Used to iterate over a sequence (like range of numbers or string).",
          code: 'for i in range(3):\n    print(f"Count: {i}")'
        },
        {
          title: "Range Function",
          description: "Creates a sequence of numbers to iterate over.",
          code: 'range(5)      # 0,1,2,3,4\nrange(2, 5)   # 2,3,4\nrange(0, 10, 2) # 0,2,4,6,8'
        },
        {
          title: "While Loop",
          description: "Repeats code while a condition is True.",
          code: 'count = 0\nwhile count < 3:\n    print(count)\n    count += 1'
        }
      ],
      practice: {
        id: 5,
        title: "Number Sequence Generator",
        difficulty: "Easy",
        description: "Write a program that prints numbers from 1 to 5, each on a new line. After printing all numbers, print 'Counting completed!'",
        examples: [
          {
            input: null,
            output: "1\n2\n3\n4\n5\nCounting completed!"
          }
        ],
        solutions: {
          python: {
            starterCode: "# Write your counting loop here\n",
            solution: 'for number in range(1, 6):\n    print(number)\nprint("Counting completed!")',
          },
          javascript: {
            starterCode: "// Write your counting loop here\n",
            solution: 'for (let i = 1; i <= 5; i++) {\n    console.log(i);\n}\nconsole.log("Counting completed!");',
          }
        },
        hints: [
          "Use range(1, 6) in Python",
          "Remember to start from 1 and end at 5",
          "Print the completion message after the loop ends"
        ]
      }
    }
  ];