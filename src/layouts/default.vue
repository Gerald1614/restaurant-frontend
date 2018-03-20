<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar
        color="primary"
        :glossy="$q.theme === 'mat'"
        :inverted="$q.theme === 'ios'"
      >
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
          Restaurant review app
          <div slot="subtitle">Find the best restaurant</div>
        </q-toolbar-title>
        <q-btn flat dense label="Login" @click="$router.push('/login')"/>
        <q-btn flat dense label="SignUp" @click="$router.push('/signup')"/>
        <q-btn flat dense label="Logout"/>
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer
      v-model="leftDrawerOpen"
      :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null"
    >
      <q-list
        no-border
        link
        inset-delimiter
      >
        <q-list-header >Restaurant reviews</q-list-header>
        <q-item  to="/restaurants">
          <q-item-side icon="restaurant" />
          <q-item-main label="List of restaurants" />
        </q-item>
        <q-item>
          <q-item-side icon="add_location" />
          <q-item-main label="Add a restaurant"/>
        </q-item>
        <q-item @click.native="openURL('https://discord.gg/5TDhbDg')">
          <q-item-side icon="chat" />
          <q-item-main label="Discord Chat Channel" sublabel="https://discord.gg/5TDhbDg" />
        </q-item>
        <q-item @click.native="openURL('http://forum.quasar-framework.org')">
          <q-item-side icon="record_voice_over" />
          <q-item-main label="Forum" sublabel="forum.quasar-framework.org" />
        </q-item>
        <q-item @click.native="openURL('https://twitter.com/quasarframework')">
          <q-item-side icon="rss feed" />
          <q-item-main label="Twitter" sublabel="@quasarframework" />
        </q-item>
      </q-list>
    </q-layout-drawer>

    <q-page-container>
      <transition name="slide" mode="out-in">    
        <router-view />
      </transition>
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'LayoutDefault',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  methods: {
    openURL
  }
}
</script>

<style>
.slide-enter-active {
        animation: slide-in 300ms ease-out forwards;
    }
    .slide-leave-active {
        animation: slide-out 300ms ease-out forwards;
    }
    @keyframes slide-in {
        from {
            transform: translateX(-300px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
       @keyframes slide-out {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(300px);
            opacity: 0;
        }
    }
</style>
