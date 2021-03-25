<template>
  <CDropdown
    inNav
    class="c-header-nav-items"
    placement="bottom"
    add-menu-classes="pt-0"
  >
    <template #toggler>
      <CHeaderNavLink>
        Project: {{ current_project ? current_project.attributes.slug : 'Not selected' }}
      </CHeaderNavLink>
    </template>
    <div v-for="(item, index) in projects" v-bind:key="index">
      <CDropdownItem class="" @click="set_current(item)">
        {{ item.attributes.name }}
      </CDropdownItem>
    </div>
    <CPagination :activePage.sync="paginate.current_page" :pages="Math.round(paginate.total / paginate.items)" @change="update_page(page)"/>
  </CDropdown>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Project',
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
      this.$store.dispatch('projectModule/get_list', newPage)
    }
  },
  methods: {
    logout() {
      AuthService.logout()
    },
    set_current(project) {
      this.$store.dispatch('projectModule/set_current', project)
    },
    update_page(page) {
      console.log(page)
    }
  },
  beforeMount() {
    this.$store.dispatch('projectModule/get_list')
    if(this.current_project && Object.keys(this.current_project).length === 0)
      this.$store.dispatch('projectModule/set_current', this.projects[0])
  }
}
</script>

<style scoped>
  .c-icon {
    margin-right: 0.3rem;
  }
</style>