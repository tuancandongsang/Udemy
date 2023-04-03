import { createApp } from 'vue'
import { defineCustomElement } from './defineCustomElementWithStyle'
import App from './App.vue'
import router from './services/router'

// class NetflixService extends HTMLElement {
//   root
//   constructor() {
//     super()
//     const app = createApp(App)
//     app.use(router)
//     this.root = document.createElement('div')
//     app.mount(this.root)
//   }
//   connectedCallback() {
//     this.appendChild(this.root)
//   }
// }

const NetflixService = defineCustomElement(App, { plugins: [router]})

customElements.define('netflix-service', NetflixService)
