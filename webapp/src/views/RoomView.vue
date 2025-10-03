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

  socket.onAny((event, ...args) => {
    console.log(`Event received: ${event}`, args);
  });

  socket.on("room-joined", onRoomJoined);
  socket.on("life-points-updated", updatePlayersData);
  socket.on('timer-updated', updateTimer)
  socket.on('duel-reset', onDuelReset);
  socket.on('configuration-updated', onConfigurationUpdated)
  socket.on('timer-stopped', () => isTimerRunning.value = false);
  socket.on('timer-reset', onTimerReset);
});

const enableSound = ref(true);
const darkMode = ref(true);
const isTimerRunning = ref(false);
const player1LP = ref(0);
const player2LP = ref(0);
const remainingTime = ref(0);
const configuration = ref({} as Configuration);
const showOptions = ref(false);

const onTimerReset = (data: string) => {
  remainingTime.value = JSON.parse(data).timer;
  isTimerRunning.value = false;
}

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

watch(isTimerRunning, (newVal) => {
  console.log(newVal)
  startOrStopTimer();
});

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
    <button @click="showOptions = !showOptions" class="show-options-button">
      <SettingsIcon class="icon"/>
    </button>
    <div class="content">
      <div class="points">
        <YgoLifePoints class="lp" duelist-name="Duelist 1" :isSoundEnabled="enableSound" :fontSize="4" :lifePoints="player1LP"/>
        <Timer class="timer" :time="remainingTime" v-model="isTimerRunning" @reset-timer="resetTimer"/>
        <YgoLifePoints class="lp" duelist-name="Duelist 2" :isSoundEnabled="enableSound" :fontSize="4" :lifePoints="player2LP"/>
      </div>
      <div>
        <Calculator @updateLifePoints="sendLifePointsUpdate($event)"></Calculator>
      </div>
    </div>
  </main>
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
  gap: 0.5rem;
  flex-direction: column;

  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100%;
    gap: 5rem;
  }
}

div.points {
  display: flex;
  gap: 2rem;
  align-items: center;
  width: 700px;

  .lp {
    width: calc(100% / 3);
  }

  .timer {
    width: calc(100% / 3);
  }

  @media screen and (max-width: 720px) {
    flex-direction: column;
    align-items: stretch;
    width: initial;

    .lp, .timer {
      width: 100% ;
    }
  }
}

.show-options-button {
  font-size: 1rem;
  background-color: transparent;
  fill: var(--text-primary);
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width:100%;
  text-align: right;
}

</style>
