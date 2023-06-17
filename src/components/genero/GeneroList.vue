<script setup lang="ts">
import type { Genero } from '@/models/genero'
import { onMounted, ref } from 'vue' 
import http from '@/plugins/axios'
import router from '@/router'/*rutas */

const props = defineProps<{
  ENDPOINT_API: string
}>()

const ENDPOINT = props.ENDPOINT_API ?? ''
var generos = ref<Genero[]>([])

async function getGeneros() {
  generos.value = await http.get(ENDPOINT).then((response) => response.data) /** aquie devolveria el valor a variable genero */
}

function toEdit(id: number) {
  router.push(`/generos/editar/${id}`)
} /* me movera a otra funcion */

async function toDelete(id: number) {
  var r = confirm('¿Está seguro que se desea eliminar el genero?')
  if (r == true) {
    await http.delete(`${ENDPOINT}/${id}`).then(() => getGeneros())
  }
}/*eliminar llama en http a delete */

onMounted(() => {
  getGeneros()
})
</script>

<template> 
  <div class="container">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><RouterLink to="/">Inicio</RouterLink></li>
        <li class="breadcrumb-item active" aria-current="page">Géneros</li>
      </ol>
    </nav>

    <div class="row">
      <h2>Lista de Géneros</h2>
      <div class="col-12">
        <RouterLink to="/generos/crear">Crear Nuevo</RouterLink>
      </div>
    </div>
    

    <div class="table-responsive">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col">N°</th>
            <th scope="col">Descripción</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(genero, index) in generos.values()" :key="genero.id">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ genero.descripcion }}</td>
            <td>
              <button class="btn btn-link" @click="toEdit(genero.id)">Editar</button>
              <button class="btn btn-link" @click="toDelete(genero.id)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template> 


<style scoped></style>