import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    //Dev
    // key: 'AIzaSyB0SsBMmgewIFDPzxmNJu1qk2RUSyWU2O4',
    //Product
    key: 'AIzaSyDWSad7k8LS4aHfxfTt56g5O0QJl2HZVnQ',
  },

  installComponents: true
})