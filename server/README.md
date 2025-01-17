# Yu-Gi-Oh! Duel Sync. Server

Yu-Gi-Oh! Duel Sync. Server is an application to track life points during your remote duels or during your streaming sessions.
To do so, the application will create a SocketIO room where you can invite your friends to join and start a duel.

This project is part of the [Yu-Gi-Oh! Duel Sync.](https://github.com/ValentinVmr/valentinvmr--Duel-Sync) project.
This directory contains the server part of the project which is built with JavaScript and NodeJS.

## Installation
To install the application, you need to clone the repository and install the dependencies.
```bash
git clone https://github.com/ValentinVmr/valentinvmr--Duel-Sync Duel-Sync
cd Duel-Sync/server && npm install
```

## Start the server
You can start the server by running the following command in the server directory.
```bash
npm run start
```

You can also start the server using Docker by running the following command in the server directory.
```bash
docker build -t duel-sync-server .
docker run -p 8080:8080 duel-sync-server
```

Both commands will start the server on [http://localhost:8080](http://localhost:8080).

## Contributing
1. Clone the project.
2. Create a branch for your feature (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.
6. Enjoy a refreshing :coffee: and wait for the review.

## Code owners
Check the `CODEOWNERS` file to know the code owners.

## License
This project is under the MIT license. You are allowed to reproduce, distribute or use this project for commercial purposes.
