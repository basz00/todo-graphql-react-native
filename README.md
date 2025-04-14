# Notes App

Welcome to Notes App!

This is a fun react-native expo project that I update whenever I can that aims to show you how I usually approach a project.

It is built with clean architecture approach in mind, and would also include testing (but later) and some other stuffs to!

If you want to test this project out, you need to set up a backend server too, I'll explain it in the next section.

## How To Run The Project

✅ Make sure you have Node installed!

✅ Get the backend code at https://github.com/basz00/todo-graphql-server

✅ Checkout that code, and run "node index.js" inside the /src of it

✅ Your backend should be running!

✅ Check your PC's IP, and then create a new .env file inside the Notes App (at the root) then add these two variables "EXPO_PUBLIC_GRAPHQL_URI=http://your.api.here:4000/graphql"
"EXPO_PUBLIC_GRAPHQL_WS_URI=ws://your.api.here:4000/graphql"

✅ Run the app with npm run command
