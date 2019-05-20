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
        :key="link.title"
        :href="link.href"
        :target="link.target"
        color="white"
        flat
        round
        @click=goTo(link.path)
      >
        <v-icon dark>{{ link.icon }}</v-icon>
        {{ link.title }}
      </v-btn>

      <v-flex
        primary
        text-xs-center
        white--text
        xs12
      >
        Web project 2019 — <strong>Made with Vuetify</strong>
      </v-flex>
    </v-layout>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    links: [
      {
        title: "Credit",
        icon: "info",
        path: "credit",
        href: "",
        target: ""
      },
      {
        title: "GitHub",
        icon: "code",
        path: "",
        href: "https://github.com/PepitoSama",
        target: "_blank"
      },
      {
        title: "Polytech",
        icon: "business_center",
        path: "",
        href: "https://www.polytech.umontpellier.fr/",
        target: "_blank"
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
