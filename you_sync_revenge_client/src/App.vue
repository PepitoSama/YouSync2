<template>
  <div id="app">
    <v-app>
      <Header/>
        <main>
          <v-container fluid>
            <router-view></router-view>
          </v-container>
        </main>
      <Footer/>
    </v-app>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  data () {
    return {
      //
    }
  },
  methods: {
    //
  }
}
</script>
