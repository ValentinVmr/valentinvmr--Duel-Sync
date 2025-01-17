# Yu-Gi-Oh! Duel Sync. Webapp

Yu-Gi-Oh! Duel Sync. Webapp is an application to track life points during your remote duels or during your streaming sessions.
To do so, the application will create a SocketIO room where you can invite your friends to join and start a duel.

This project is part of the [Yu-Gi-Oh! Duel Sync.](https://github.com/ValentinVmr/valentinvmr--Duel-Sync) project.
This directory contains the webapp part of the project which is built with Vue 3.

## Installation
To install the application, you need to clone the repository and install the dependencies.
```bash
git clone https://github.com/ValentinVmr/valentinvmr--Duel-Sync Duel-Sync
cd Duel-Sync/webapp && npm install
```

## Start the webapp
You can start the webapp by running the following command in the webapp directory.
```bash
npm run dev
```

You can also start the webapp using Docker by running the following command in the webapp directory.
```bash
docker build -t duel-sync-webapp .
docker run -p 3000:3000 -e API_URL=<server_url> duel-sync-webapp
```

Both commands will start the webapp on [http://localhost:3000](http://localhost:3000).

## Build the webapp
You can build the webapp by running the following command in the webapp directory.
```bash
npm run build
```

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
