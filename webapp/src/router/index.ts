import { createRouter, createWebHistory } from 'vue-router'
import CreateRoomView from "@/views/CreateRoomView.vue";
import RoomView from "@/views/RoomView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'create-room',
      component: CreateRoomView,
    },
    {
      path: '/room/:roomId',
      name: 'room',
      component: RoomView
    }
  ],
})

export default router
