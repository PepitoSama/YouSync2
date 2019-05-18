<template>
  <v-footer
    height="auto"
    color="red darken-4"
    absolute
  >
    <v-layout
      justify-center
      row
      wrap
    >
      <v-btn
        v-for="link in links"
        :key="link"
        color="white"
        flat
        round
        @click=goTo(link.path)
      >
        {{ link.title }}
      </v-btn>
      <v-flex
        primary
        text-xs-center
        white--text
        xs12
      >
        &copy;2018 — <strong>Made with Vuetify</strong>
      </v-flex>
    </v-layout>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    links: [
      {
        title: "credit",
        path: "credit"
      }
    ]
  }),
  methods: {
    goTo: function (whereToGo) {
      this.$router.push({
        name: whereToGo
      })
    }
  }
}
</script>
