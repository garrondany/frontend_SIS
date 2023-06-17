<script setup lang="ts">
import type { Interprete } from '@/models/interprete'
import { onMounted, ref } from 'vue' 
import http from '@/plugins/axios'
import router from '@/router'
/*rutas */

const props = defineProps<{
  ENDPOINT_API: string
}>()

const ENDPOINT = props.ENDPOINT_API ?? ''
var interpretes = ref<Interprete[]>([])

async function getInterpretes() {
  interpretes.value = await http.get(ENDPOINT).then((response) => response.data) /** aquie devolveria el valor a variable interpretes */
}

function toEdit(id: number) {
  router.push(`/interpretes/editar/${id}`)
} /* me movera a otra funcion */

async function toDelete(id: number) {
  var r = confirm('¿Está seguro que se desea eliminar el Intérprete?')
  if (r == true) {
    await http.delete(`${ENDPOINT}/${id}`).then(() => getInterpretes())
  }
}/*eliminar llama en http a delete */

onMounted(() => {
  getInterpretes()
})
</script>

<template> 
  <div class="container">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><RouterLink to="/">Inicio</RouterLink></li>
        <li class="breadcrumb-item active" aria-current="page">Intérpretes</li>
      </ol>
    </nav>

    <div class="row">
      <h2>Lista de Intérpretes</h2>
      <div class="col-12">
        <RouterLink to="/interpretes/crear">Crear Nuevo</RouterLink>
      </div>
    </div>
    
    <div class="table-responsive">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col">N°</th>
            <th scope="col">Nombre</th>
            <th scope="col">Nacionalidad</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(interprete, index) in interpretes.values()" :key="interprete.id">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ interprete.nombre }}</td>
            <td>{{ interprete.nacionalidad }}</td>
            <td>
              <button class="btn btn-link" @click="toEdit(interprete.id)">Editar</button>
              <button class="btn btn-link" @click="toDelete(interprete.id)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template> 

<style scoped></style>