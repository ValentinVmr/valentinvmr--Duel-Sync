<script setup lang="ts">
import {io} from "socket.io-client";
import { useRoute } from "vue-router";
import {onMounted, ref} from "vue";
import YgoLifePoints from "@/components/YgoLifePoints.vue";
import Calculator from "@/components/Calculator.vue";
import useEnv from "@/services/env";

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

  socket.on("room-joined", updatePlayersData);
  socket.on("life-points-updated", updatePlayersData);
});
const updatePlayersData = (data: string) => {
  const playersData = JSON.parse(data).playersData;
  player1LP.value = playersData.player1.lifepoints;
  player2LP.value = playersData.player2.lifepoints;
}

const enableSound = ref(true);
const player1LP = ref(0);
const player2LP = ref(0);

const updateLifePoints = (data: {player: number, operation: string, amount: number}) => {
  const playerId = `player${data.player}`;

  const payload = JSON.stringify({
    roomId: roomId,
    playerId: playerId,
    operation: data.operation,
    amount: data.amount
  });

  socket.emit('update-life-points', payload);
}

</script>

<template>
  <main>
    <div class="points">
      <YgoLifePoints :isSoundEnabled="enableSound" :fontSize="4" :lifePoints="player1LP" />
      <YgoLifePoints :isSoundEnabled="enableSound" :fontSize="4" :lifePoints="player2LP" />
    </div>
    <div>
      <div class="sound-enable">
        <input type="checkbox" id="enableSound" value="Play sound" :checked="enableSound">
        <label for="enableSound">Activer / Désactiver le son</label>
      </div>
      <Calculator @updateLifePoints="updateLifePoints($event)"></Calculator>
    </div>
  </main>
</template>

<style>
.sound-enable {
  margin-bottom: 1rem;
}

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
