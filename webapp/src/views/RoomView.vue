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
import DiceRoll from "@/components/DiceRoll.vue";

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
  socket.on('player-renamed', onPlayerRenamed)
  socket.on('timer-reset', onTimerReset);
  socket.on('dice-rolled', onDiceRolled);
});

const enableSound = ref(true);
const darkMode = ref(true);
const isTimerRunning = ref(false);
const player1LP = ref(0);
const player2LP = ref(0);
const player1Name = ref('');
const player2Name = ref('');

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
  player1Name.value = playersData.player1.name;
  player2Name.value = playersData.player2.name;
}

const onDuelReset = (data: string) => {
  onTimerReset(data);
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

const updatePlayerName = (data: { playerId: string, newName: string }) => {
  const payload = JSON.stringify({
    roomId: roomId,
    playerId: data.playerId,
    newName: data.newName
  });

  socket.emit('rename-player', payload);
}

const onPlayerRenamed = (data: string) => {
  const parsedData = JSON.parse(data);

  player1Name.value = parsedData.player1.name;
  player2Name.value = parsedData.player2.name;
}

watch(configuration, (newVal, oldVal) => {
  if (!oldVal || !oldVal?.startingLifePoints) {
    return;
  }

  if (JSON.stringify(newVal) === JSON.stringify(oldVal)) {
    return;
  }

  saveConfiguration(newVal);

}, {deep: true});

watch(isTimerRunning, () => {
  startOrStopTimer();
});


const saveConfiguration = (newConfiguration: Configuration) => {
  const payload = JSON.stringify({
    roomId: roomId,
    configuration: newConfiguration
  });

  socket.emit('update-configuration', payload);
}

const rollDice = () => {
  socket.emit('roll-dice', JSON.stringify({roomId: roomId}));
}

const onDiceRolled = (data: string) => {
  const parsedData = JSON.parse(data);

  const event = new CustomEvent('roll-dice', {detail: parsedData});
  window.dispatchEvent(event);
}

</script>

<template>
  <main>
    <button @click="showOptions = !showOptions" class="show-options-button">
      <SettingsIcon class="icon"/>
    </button>
    <div class="content">
      <div class="points">
        <YgoLifePoints class="lp" :player-id="1" :duelist-name="player1Name" :isSoundEnabled="enableSound" :fontSize="4"
                       :lifePoints="player1LP"/>
        <Timer class="timer" :time="remainingTime" v-model="isTimerRunning" @reset-timer="resetTimer"/>
        <YgoLifePoints class="lp" :player-id="2" :duelist-name="player2Name" :isSoundEnabled="enableSound" :fontSize="4"
                       :lifePoints="player2LP"/>
      </div>
      <div>
        <Calculator @updateLifePoints="sendLifePointsUpdate($event)" @roll-dice="rollDice"></Calculator>
      </div>
    </div>
  </main>
  <ConfigurationLayer v-if="configuration?.startingLifePoints"
                      v-model="configuration"
                      v-model:dark-mode="darkMode"
                      v-model:enable-sound="enableSound"
                      v-model:show-options="showOptions"
                      :player1-name="player1Name"
                      :player2-name="player2Name"
                      @player-name-updated="updatePlayerName"
                      @reset-duel="resetDuel"/>

  <DiceRoll/>
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
    width: 100%;
  }

  @media screen and (max-width: 720px) {
    flex-direction: column;
    align-items: stretch;
    width: initial;

    .lp, .timer-and-rolls {
      width: 100%;
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
  width: 100%;
  text-align: right;
}

</style>
