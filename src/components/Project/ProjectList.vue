<template>
  <CDropdown
    inNav
    class="c-header-nav-items"
    placement="bottom"
    add-menu-classes="pt-0"
    v-if="current_project"
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
      if (newPage <= this.paginate.pages)
        this.$store.dispatch('projectModule/get_list', newPage)
    }
  },
  methods: {
    logout() {
      AuthService.logout()
    },
    set_current(project) {
      this.$store.dispatch('projectModule/set_current', project)
    }
  },
  created() {
    this.$store.dispatch('projectModule/get_list')
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