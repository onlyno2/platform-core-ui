<template>
  <CDropdown
    inNav
    class="c-header-nav-items"
    placement="bottom"
    add-menu-classes="pt-0"
    v-if="data_loaded"
  >
    <template #toggler>
      <CHeaderNavLink>
        Project: {{ current_project.attributes.slug }}
      </CHeaderNavLink>
    </template>
    <div v-for="(item, index) in projects" v-bind:key="index">
      <CDropdownItem class="" @click="set_current(item)">
        {{ item.attributes.name }}
      </CDropdownItem>
    </div>
    <CPagination :activePage.sync="paginate.current_page" :pages="paginate.pages"/>
  </CDropdown>
</template>

<script>
import { AuthService } from '../../services/auth.service'
import { mapState } from 'vuex'

export default {
  data () {
    return { 
    }
  },
  computed: {
    ...mapState({
      projects: state => state.projectModule.projects,
      paginate: state => state.projectModule.pagination,
      current_project: state => state.projectModule.current_project
    })
  },
  watch: {
    'paginate.current_page': function(newPage) {
      if (newPage <= this.paginate.pages)
        this.$store.dispatch('projectModule/index', newPage)
    }
  },
  methods: {
    logout() {
      AuthService.logout()
    },
    set_current(project) {
      this.$store.dispatch('projectModule/set_current', project)
    },
    data_loaded() {
      return JSON.stringify(this.projects) === JSON.stringify({})
    }
  },
  async created() {
    await this.$store.dispatch('projectModule/index')
    if(localStorage.getItem('cprj') === 'undefined') {
      this.$store.dispatch('projectModule/set_current', this.projects[0])
    } else {
      let current_project = JSON.parse(localStorage.getItem('cprj'))
      this.$store.dispatch('projectModule/set_current', current_project)
    }
  }
}
</script>

<style scoped>
  .c-icon {
    margin-right: 0.3rem;
  }
</style>