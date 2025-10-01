<script setup lang="ts">
import {io} from "socket.io-client";
import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import YgoLifePoints from "@/components/YgoLifePoints.vue";
import Calculator from "@/components/Calculator.vue";
import useEnv from "@/services/env";
import Timer from "@/components/Timer.vue";

const env = useEnv();
const route = useRoute();
const roomId = route.params.roomId;

const URL = env.get('API_URL');
const socket = io(URL);
let pingID: number;

onMounted(() => {
  socket.on("connect", () => {
    socket.emit('join-room', roomId);

    pingID = setInterval(() => {
      socket.emit('ping');
    }, 1000);
  });

  socket.on('disconnect', () => {
    clearInterval(pingID);
  });

  socket.on("room-joined", onRoomJoined);
  socket.on("life-points-updated", updatePlayersData);
  socket.on('timer-updated', updateTimer)
  socket.on('duel-reset', onDuelReset);
  socket.on('configuration-updated', onConfigurationUpdated)
});

const enableSound = ref(true);
const isTimerRunning = ref(false);
const player1LP = ref(0);
const player2LP = ref(0);
const remainingTime = ref(0);
const configuration = ref({startingLifePoints: 8000, initialTimer: 40 * 60});
const newConfiguration = ref({startingLifePoints: 8000, initialTimer: 40 * 60});
const darkMode = ref(true);

const onRoomJoined = (data: string) => {
  const parsedData = JSON.parse(data);

  remainingTime.value = parsedData.timer;
  configuration.value = parsedData.configuration;
  newConfiguration.value = Object.assign({}, parsedData.configuration);

  updatePlayersData(data);
}

const onConfigurationUpdated = (data: string) => {
  onRoomJoined(data);
}

const updatePlayersData = (data: string) => {
  const parsedData = JSON.parse(data);

  const playersData = parsedData.playersData;
  player1LP.value = playersData.player1.lifepoints;
  player2LP.value = playersData.player2.lifepoints;
}

const onDuelReset = (data: string) => {
  updatePlayersData(data);
}

const updateTimer = (data: string) => {
  remainingTime.value = JSON.parse(data).timer;
}

const resetTimer = () => {
  const payload = JSON.stringify({roomId: roomId});
  socket.emit('reset-timer', payload);
}

const resetDuel = () => {
  const payload = JSON.stringify({roomId: roomId});
  socket.emit('reset-duel', payload);
}

const getTimerMinutesAndSeconds = (timerInSeconds: number) => {
  const minutes = Math.floor(timerInSeconds / 60);
  const seconds = timerInSeconds % 60;

  return {minutes, seconds};
}

const sendLifePointsUpdate = (data: { player: number, operation: string, amount: number }) => {
  const playerId = `player${data.player}`;

  const payload = JSON.stringify({
    roomId: roomId,
    playerId: playerId,
    operation: data.operation,
    amount: data.amount
  });

  socket.emit('update-life-points', payload);
}

const startOrStopTimer = () => {
  isTimerRunning.value = !isTimerRunning.value;

  const payload = JSON.stringify({roomId: roomId});

  if (isTimerRunning.value) {
    socket.emit('start-timer', payload);
  } else {
    socket.emit('stop-timer', payload);
  }
}

const changeInitialTimer = () => {
  const minutesInput = document.getElementById('minutes') as HTMLInputElement;
  const secondsInput = document.getElementById('seconds') as HTMLInputElement;

  let minutes = parseInt(minutesInput.value);
  let seconds = parseInt(secondsInput.value);

  if (isNaN(minutes) || minutes < 0) {
    minutes = 0;
    minutesInput.value = '0';
  }

  if (isNaN(seconds) || seconds < 0) {
    seconds = 0;
    secondsInput.value = '0';
  } else if (seconds > 59) {
    seconds = 59;
    secondsInput.value = '59';
  }

  newConfiguration.value.initialTimer = (minutes * 60) + seconds;
}

const hasConfigurationChanged = () => {
  return configuration.value.startingLifePoints !== newConfiguration.value.startingLifePoints ||
    configuration.value.initialTimer !== newConfiguration.value.initialTimer;
}

const saveConfiguration = () => {
  const payload = JSON.stringify({
    roomId: roomId,
    configuration: newConfiguration.value
  });

  socket.emit('update-configuration', payload);
}

const setStartingLifePoints = (points: number) => {
  newConfiguration.value.startingLifePoints = points;
}

</script>

<template>
  <main>
    <div class="points">
      <YgoLifePoints :isSoundEnabled="enableSound" :fontSize="4" :lifePoints="player1LP"/>
      <YgoLifePoints :isSoundEnabled="enableSound" :fontSize="4" :lifePoints="player2LP"/>
      <Timer :time="remainingTime"/>
      <button @click="startOrStopTimer">Démarrer / Arrêter le timer</button>
      <button @click="resetTimer">Réinitialiser le timer</button>
    </div>
    <div>
      <Calculator @updateLifePoints="sendLifePointsUpdate($event)"></Calculator>
    </div>
  </main>

  <aside class="configuration">
    <h2>Options</h2>
    <div class="configuration__options">
      <div class="dark-theme">
        <label for="dark-theme">Thème sombre (à venir)</label>
        <input type="checkbox" id="dark-theme" v-model="darkMode"/>
      </div>
      <div class="sound-effects">
        <label for="sound-effects">Effets sonores</label>
        <input type="checkbox" id="sound-effects" v-model="enableSound"/>
      </div>
      <hr>
      <div class="starting-life-points">
        <h3>Points de vie de départ</h3>
        <input type="number" v-model.number="newConfiguration.startingLifePoints"/>
        <div class="default-life-points">
          <button @click="setStartingLifePoints(8000)">8000</button>
          <button @click="setStartingLifePoints(12000)">12000</button>
          <button @click="setStartingLifePoints(16000)">16000</button>
        </div>
      </div>
      <hr>
      <div class="duel-timer">
        <h3>Horloge</h3>
        <div class="minutes">
          <label for="minutes">Minutes</label>
          <input type="number" id="minutes" @change="changeInitialTimer()" :value="getTimerMinutesAndSeconds(newConfiguration.initialTimer).minutes"/>
        </div>
        <div class="seconds">
          <label for="seconds">Secondes</label>
          <input type="number" id="seconds" @change="changeInitialTimer()" :value="getTimerMinutesAndSeconds(newConfiguration.initialTimer).seconds"/>
        </div>
        <hr>
        <button @click="resetDuel()">Réinitialiser le duel</button>
        <button v-if="hasConfigurationChanged()" @click="saveConfiguration()">Sauvegarder la configuration</button>
      </div>
    </div>
  </aside>
</template>

<style>
main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  gap: 5rem;
}

div.points {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
</style>
