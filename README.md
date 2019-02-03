# RN2 - ReactRoulette

ReactRoulette is an application allowing to randomly match and talk to users over the world

HOW TO INSTALL

First, you have to make sure you have git and npm installed

Then, go to the directory of your choice and clone the project
  git clone https://github.com/CedrikMontavon/rn2-github-reactroulette.git
  
Enter the directory and install the dependencies :
  npm install
  npm install -g expo-cli
  npm install -g eslint
  
! Important ! You need to edit the .babelrc file contained in the folder nodes_modules/react-native-vector-icons
Change the following value in the "presets" array :
  "module:metro-react-native-babel-preset"
To :
  "react-native"
  
Now, you can start the application

HOW TO START

To launch the application, run the following line :
  npm start

This project uses the airbnb config of the ESLint
To launch the linter, run the following line :
  npm run lint
You need to add in the package.json file any directory you add in the "npm run lint" command

IF YOU WANT TO LAUNCH THE SERVER ON YOUR MACHINE

Go to the folder rn2-api in the root folder of the project
  cd ./rn2-api

Edit the api.js file and, in the second line, change the port to your desired port
  const wss = new WebSocket.Server({port: <your port>});
  
Go back to the root folder of the project to edit the actions/websocket.js file
  cd ../actions/
  
Change the server's ip and port to your own
  const socket = new WebSocket('ws://<your ip>:<your port>');
  
To start the server, enter the rn2-api folder and run the following command line :
  nohup npm start &
  
Press enter to access the prompt again, go back the root folder and start the application again
  expo start
  
To access logs from the server, simply run cat nohup.out
