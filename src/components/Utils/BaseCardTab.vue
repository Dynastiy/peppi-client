<template>
    <div class=" tw-rounded-md w-100 h-100 tw-border-0">
      <div class="custom-card-tabs">
        <ul id="pills-tab" class="nav" role="tablist">
          <li
            v-for="(tab, index) in tabs"
            :key="index"
            class="tw-flex tw-items-center tw-justify-center"
            role="presentation"
            @click="selectTab(index)"
          >
            <a
              :class="[index === selectedIndex ? 'active' : '']"
              class="nav-link d-flex align-items-center"
              data-toggle="pill"
              href="#pills-attendance"
              role="tab"
              aria-controls="pills-attendance"
              aria-selected="true"
              v-html="tab.title"
            >
            </a>
            <span v-if="index !== tabs.length - 1"></span>
          </li>
        </ul>
      </div>
  
      <div
        id="pills-tabContent"
        class="tab-content card-body"
        :style="{ padding: subTabs ? '0px' : '0' }"
      >
        <slot ></slot>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
    //   backgroundColor: {
    //     type: String,
    //     default: "",
    //   },
      counts: {
        type: Array,
        default: () => [0, 0],
      },
    },
  
    data() {
      return {
        selectedTab: 0,
        tabs: [],
        subTabs: false,
        array: [0, 0],
      };
    },
    mounted() {
      this.tabs = this.$children;
      const urlTab = this.checkUrlForTab();
      this.selectTab(urlTab);
      this.array = this.counts;
    },
    methods: {
      selectTab(tabIndex) {
        // console.log(this.tabs[tabIndex].title, 'tabIndex')
        this.$emit('tabname', this.tabs[tabIndex].title)
        this.selectedIndex = tabIndex;
        // loop over all the tabs
        console.log(this.tabs)
        this.tabs.forEach((control, index) => {
          control.active = index === tabIndex;
          this.subTabs = control.tabs;
          if (index === tabIndex) {
            // debugger
            this.$router.replace({
              // name: this.$route.name,
              // params: {
              //   ...this.$route.params
              // },
              query: {
                ...this.$route.query,
                tab: index,
              },
            }).catch(() => {});
          }
        });
        // console.log(this.tabs)
      },
      checkUrlForTab() {
        if (this.$route.query.tab) {
          return Number(this.$route.query.tab);
        }
        return 0;
      },
    },
  };
  </script>
  
  <style  scoped>
  
  li span {
    border-right: 0.5px solid #e0e0e0;
    height: 12px;
  }
  li div{
    position: absolute;
    bottom: 0;
    width: 20px !important;
    height: 20px !important;
    border-radius: 50%;
    background-color: var(--primary-color) !important;
  }
  </style>