 
  const reactSetupGuide = `application involves several key steps, most commonly using the \`create-react-app\` command line tool, which sets up the environment you need to start building a single-page React application. Below are the step-by-step instructions to initialize a new React application:

  ### Step 1: Install Node.js
  
  First, you need to have Node.js installed on your computer. Node.js is necessary because it comes with \`npm\` (Node Package Manager), which is used to manage your project's dependencies.
  
  1. Download Node.js from [nodejs.org](https://nodejs.org/).
  2. Follow the installation instructions for your specific operating system.
  
  To ensure Node.js and npm are installed correctly, open your terminal and type:
  
  \`\`\`bash
  node -v
  npm -v
  \`\`\`
  
  This will show you the current versions of Node.js and npm installed.
  
  ### Step 2: Create the React App
  
  Now that you have Node.js installed, you can use \`npx\` (which comes with npm) to create a new React application. \`npx\` lets you run packages without installing them globally.
  
  1. Open your command line tool.
  2. Navigate to the directory where you want to create your app.
  3. Run the following command:
  
  \`\`\`bash
  npx create-react-app my-app
  \`\`\`
  
  Replace "my-app" with your desired project name. This command creates a new directory called "my-app" with all the boilerplate code needed for a React application.
  
  ### Step 3: Navigate into your project
  
  Change directory to your newly created app folder:
  
  \`\`\`bash
  cd my-app
  \`\`\`
  
  ### Step 4: Start the development server
  
  Within the project directory, you can run the following command to start the local development server and view your new React application:
  
  \`\`\`bash
  npm start
  \`\`\`
  
  This command starts the development server and opens up a browser window with your React app running on \`localhost:3000\`. You can see your app live in the browser and it will automatically refresh if you make changes to the code.
  
  ### Step 5: Edit your application
  
  Now you can start editing the React application:
  
  1. Open your project folder in your favorite code editor.
  2. Inside the \`src\` directory, you'll find \`App.js\`. This is a good starting point for building your own components.
  3. Make changes to \`App.js\` and save them. Your browser will automatically reload and display the changes.
  
  ### Step`;