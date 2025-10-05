# Yu-Gi-Oh! Duel Sync.

Yu-Gi-Oh! Duel Sync. is an application to track life points during your remote duels or during your streaming sessions.
To do so, the application will create a SocketIO room where you can invite your friends to join and start a duel.

## Demo
You can visit the [demo](https://duel-sync.vercel.app/) to see the application in action.

## Installation
To install the application, you need to clone the repository and install the dependencies.
```bash
git clone https://github.com/ValentinVmr/valentinvmr--Duel-Sync Duel-Sync
cd Duel-Sync/server && npm install
cd ../webapp && npm install
```

## Starting the server and the webapp
You can start the server and the webapp by running the following command in the root directory.
```bash
docker-compose up --build
```

It will build the server and the webapp images and start the containers.

## Usage
To use the application, you need to open the webapp and create a room by visiting [http://localhost:3000](http://localhost:3000) :
you will be redirected to the room page where you can set your life points and start the duel.

Then, you can share the room link with your friends to invite them to join the duel.

## Contributing
1. Clone the project.
2. Create a branch for your feature (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

## For OBS users
You can use the application with OBS by adding a browser source and setting the URL to your room link.
When you have added the browser source, you can follow these steps to make it all transparent :
1. Right click on the browser source and select `Properties`.
2. In the "Custom CSS" field, add the following CSS code :
```css
* {
background: transparent !important;
}

#dice-container, .dice-box-info {
    display: none !important;
}

.digits {
/* Here you can change the color of the life points */
/* For example, to make them red, you can use : */
/* color: red !important; */
}
```

## Code owners
Check the `CODEOWNERS` file to know the code owners.

## License
This project is under the MIT license. You are allowed to reproduce, distribute or use this project for commercial purposes.
For more details, check the `LICENSE` file.
