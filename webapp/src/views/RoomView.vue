<script setup lang="ts">
import {io} from "socket.io-client";
import {useRoute} from "vue-router";
import {onMounted, ref, watch} from "vue";
import YgoLifePoints from "@/components/YgoLifePoints.vue";
import Calculator from "@/components/Calculator.vue";
import useEnv from "@/services/env";
import Timer from "@/components/Timer.vue";
import type Configuration from "@/types/configuration.model.ts";
import ConfigurationLayer from "@/components/ConfigurationLayer.vue";
import SettingsIcon from "@/components/icons/SettingsIcon.vue";

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
const darkMode = ref(true);
const isTimerRunning = ref(false);
const player1LP = ref(0);
const player2LP = ref(0);
const remainingTime = ref(0);
const configuration = ref({} as Configuration);
const showOptions = ref(false);

const onRoomJoined = (data: string) => {
  const parsedData = JSON.parse(data);

  remainingTime.value = parsedData.timer;
  configuration.value = parsedData.configuration;
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
  updateTimer(data);
  updatePlayersData(data);
}

const updateTimer = (data: string) => {
  remainingTime.value = JSON.parse(data).timer;
  isTimerRunning.value = true;
}

const resetTimer = () => {
  const payload = JSON.stringify({roomId: roomId});
  socket.emit('reset-timer', payload);
}

const resetDuel = () => {
  const payload = JSON.stringify({roomId: roomId});
  socket.emit('reset-duel', payload);
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

watch(configuration, (newVal, oldVal) => {
  if (!oldVal || !oldVal?.startingLifePoints) {
    return;
  }

  if (JSON.stringify(newVal) === JSON.stringify(oldVal)) {
    return;
  }

  console.log('Old configuration:', oldVal);
  console.log('Configuration changed, saving...', newVal);

  saveConfiguration(newVal);

}, {deep: true});

const saveConfiguration = (newConfiguration: Configuration) => {
  const payload = JSON.stringify({
    roomId: roomId,
    configuration: newConfiguration
  });

  socket.emit('update-configuration', payload);
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
  <button @click="showOptions = !showOptions" class="show-options-button">
    <SettingsIcon class="icon" />
  </button>
  <ConfigurationLayer v-if="configuration?.startingLifePoints"
                      v-model="configuration"
                      v-model:dark-mode="darkMode"
                      v-model:enable-sound="enableSound"
                      v-model:show-options="showOptions"
                      @reset-duel="resetDuel"/>


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

.show-options-button {
  position: fixed;
  top: 1rem;
  right: 1rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background-color: transparent;
  fill: var(--text-primary);
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

</style>
