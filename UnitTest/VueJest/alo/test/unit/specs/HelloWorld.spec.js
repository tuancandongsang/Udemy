import Vue from 'vue'
import HelloWorld from '@/components/HelloWorld'
// import {shallowMount} from '@vue/test-utils'

// mo ta test suite = la cac test case cung loai voi nhau
describe('HelloWorld.vue', () => {
  // la cac test case cac truong hop voi nhau
  it('should render correct contents', () => {

    // phan thiet lap dau vao
    const Constructor = Vue.extend(HelloWorld)
    const vm = new Constructor().$mount()

    // la ham mong doi
    expect(vm.$el.querySelector('.hello h1').textContent)
      .toEqual('Welcome to Your Vue.js App')
  })

  it('data in helloworld', () => {
    const Constructor = Vue.extend(HelloWorld)
    const vm = new Constructor().$mount()
    expect(vm.msg).toBe('Welcome to Your Vue.js App')
  })
  it('computed in hello world', () => {
    const Constructor = Vue.extend(HelloWorld)
    const vm = new Constructor().$mount()
    console.log(vm);
    expect(vm.number).toEqual(3)
  })
 
})
