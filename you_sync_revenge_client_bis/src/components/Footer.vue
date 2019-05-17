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
      >
        {{ link }}
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
      'Home',
      'Team',
      'Contact Us'
    ]
  })
}
</script>
