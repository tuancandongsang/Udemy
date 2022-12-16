<template>
  <section id="tools" class="py-8">
    <v-container>
      <div class="tools-title" :class="activedAnim" data-aos="zoom-in">
        <h2 class="text-center" v-html="$t(title)"></h2>
      </div>
      <div
          class="tools-subtitle"
          :class="activedAnim"
          data-aos="zoom-in"
          :data-aos-delay="350"
      >
        <p class="text-center" v-html="$t(subTitle)"></p>
      </div>
      <div class="tool-details hidden-sm-and-down">
        <v-card
            class="
            d-flex
            flex-column flex-wrap flex-md-row
            detail-item
            align-center
            elevation-6
          "
        >
          <div
              class="tool-item text-center pa-6"
              v-for="(tool, index) in tools"
              :key="index"
              data-aos="zoom-in"
              :class="activedAnim"
              :data-aos-delay="250 * index"
          >
            <div class="tool-icon">
              <img :src="require(`~/assets/${tool.icon}`)"/>
            </div>
            <div class="tool-item-text">
              {{ tool.title }}
            </div>
            <div>
              <v-btn
                  class="tool-btn"
                  color="primary"
                  :outlined="!tool.active"
                  @click="switchTool(`${tool.key}`)"
                  rounded
              >
                <span v-if="tool.active">Đang xem</span>
                <span v-else>Chi tiết</span>
              </v-btn>
            </div>
          </div>
        </v-card>
        <div
            class="
            d-flex
            flex-column flex-md-row
            my-6
            deatail-feature
            justify-space-between
          "
            data-aos-delay="3500"
        >
          <div
              class="mr-0 mr-md-5 tool-feature"
              data-aos="zoom-in"
              :class="activedAnim"
          >
            <v-img
                max-width="450"
                :src="require(`~/assets/images/tools/${imgTool}`)"
            />
          </div>
          <div
              class="tool-list text-center"
              data-aos="zoom-in"
              :class="activedAnim"
          >
            <div class="tool-list-title">{{ titleTool }}</div>
            <div class="list-warp d-flex flex-md-row flex-column">
              <v-list dense>
                <v-list-item
                    v-for="(item, i) in itemsFirst"
                    :key="i"
                    :href="item.link"
                >
                  <v-list-item-icon :class="`bg-${item.bgIcon}`">
                    <img :src="require(`~/assets/images/icons/${item.icon}`)"/>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title
                        v-text="$t(item.title)"
                    ></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
              <v-list dense>
                <v-list-item
                    v-for="(item, i) in itemsLast"
                    :key="i"
                    :href="item.link"
                >
                  <v-list-item-icon :class="`bg-${item.bgIcon}`">
                    <img :src="require(`~/assets/images/icons/${item.icon}`)"/>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title
                        v-text="$t(item.title)"
                    ></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </div>
          </div>
        </div>
      </div>
      <div class="tool-details hidden-md-and-up">
        <v-expansion-panels v-model="panel" multiple>
          <v-expansion-panel v-for="(tool, i) in tools" :key="i">
            <div class="text-center py-4">
              <div class="tool-icon">
                <img :src="require(`~/assets/${tool.icon}`)"/>
              </div>
              <div class="tool-item-text">
                {{ tool.title }}
              </div>
              <div>
                <v-btn
                    class="tool-btn"
                    color="primary"
                    :outlined="!tool.activeM"
                    @click="switchTool(`${tool.key}`)"
                    rounded
                >
                  <span v-if="tool.activeM">Đang xem</span>
                  <span v-else>Chi tiết</span>
                </v-btn>
              </div>
            </div>
            <v-expansion-panel-content>
              <div
                  class="
                  d-flex
                  flex-column-reverse flex-md-row
                  my-6
                  deatail-feature
                "
              >
                <div class="tool-list text-center">
                  <div class="list-warp d-flex flex-md-row flex-column">
                    <v-list dense>
                      <v-list-item
                          v-for="(item, i) in itemsTool(`${tool.key}`)"
                          :key="i"
                          :href="item.link"
                      >
                        <v-list-item-icon :class="`bg-${item.bgIcon}`">
                          <img
                              :src="require(`~/assets/images/icons/${item.icon}`)"
                              :alt="item.altStr"
                          />
                        </v-list-item-icon>
                        <v-list-item-content>
                          <v-list-item-title
                              v-text="$t(item.title)"
                          ></v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </div>
                </div>
                <div class="mr-0 mr-md-5 tool-feature">
                  <img
                      :src="
                      require(`~/assets/images/tools/${imgToolByKey(
                        `${tool.key}`
                      )}`)
                    "
                  />
                </div>
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
    </v-container>
  </section>
</template>

<script>
import mixinMenu from '~/mixins/mixinMenu';

export default {
  mixins: [mixinMenu],
  data() {
    return {
      activedAnim: '',
      title: 'homePage.sections.tools.title',
      subTitle: 'homePage.sections.tools.subTitle',
      items: [],
      panel: [],
      titleTool: 'Điều hành và quản trị',
      imgTool: 'img-manager.png',
      tools: [
        {
          icon: `svg/icon-pin.svg`,
          title: 'Điều hành và quản trị',
          link: '#',
          active: true,
          activeM: false,
          key: 'mangager',
          altStr: 'Icon Điều hành và quản trị 4'
        },
        {
          icon: `svg/icon-book.svg`,
          title: 'Quản lý văn phòng',
          link: '#',
          active: false,
          activeM: false,
          key: 'office'
        },
        {
          icon: `svg/icon-account.svg`,
          title: 'Nhân sự - Kế toán',
          link: '#',
          active: false,
          activeM: false,
          key: 'account',
          altStr: 'Icon nhân sự kế toán 14'
        },
        {
          icon: `svg/icon-setting-1.svg`,
          title: 'Tiện ích',
          link: '#',
          active: false,
          activeM: false,
          key: 'utilities',
          altStr: 'Icon tiện ích 12'
        }
      ]
    };
  },
  created() {
    this.items = this.menuManager;
  },
  computed: {
    itemsFirst() {
      const items = this.items.filter((item, index) => index < 3);
      return items;
    },
    itemsLast() {
      const items = this.items.filter((item, index) => index > 2);
      return items;
    }
  },
  methods: {
    itemsTool(key) {
      switch (key) {
        case 'mangager':
          return this.menuManager;
        case 'office':
          return this.menuOffice;
        case 'account':
          return this.menuAccounting;
        case 'utilities':
          return this.menuUtilities;
        default:
          return this.menuManager;
      }
    },
    imgToolByKey(key) {
      switch (key) {
        case 'mangager':
          return 'img-manager.png';
        case 'office':
          return 'img-office.png';
        case 'account':
          return 'img-account.png';
        case 'utilities':
          return 'img-utilities.png';
        default:
          return 'img-manager.png';
      }
    },
    switchTool(key) {
      this.tools.map((tool) => {
        if (key === tool.key) {
          tool.active = true;
          tool.activeM = true;
        } else {
          tool.active = false;
          tool.activeM = false;
        }
      });
      this.activedAnim = 'aos-animate';
      switch (key) {
        case 'mangager':
          this.panel = [0];
          this.imgTool = 'img-manager.png';
          this.titleTool = 'Điều hành và quản trị';
          this.items = this.menuManager;
          break;
        case 'office':
          this.panel = [1];
          this.imgTool = 'img-office.png';
          this.titleTool = 'Quản lý văn phòng';
          this.items = this.menuOffice;
          break;
        case 'account':
          this.panel = [2];
          this.imgTool = 'img-account.png';
          this.titleTool = 'Nhân sự - Kế toán';
          this.items = this.menuAccounting;
          break;
        case 'utilities':
          this.panel = [3];
          this.imgTool = 'img-utilities.png';
          this.titleTool = 'Tiện ích';
          this.items = this.menuUtilities;
          break;
        default:
          this.panel = [0];
          this.imgTool = 'img-manager.png';
          this.titleTool = 'Điều hành và quản trị';
          this.items = this.menuManager;
          break;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
