<template>
  <div>
    <CCard>
      <CCardHeader>
        <CRow align-horizontal="end">
          <CCol md="6">
            <h3>Danh sách dự án</h3>
          </CCol>
          <CCol md="6" class="text-right">
            <CButton
              color="success"
              variant="outline"
              square
              md
              @click="create_project(item)"
            >
              <CIcon class="create-btn-icon" name="cil-plus" /> Tạo mới
            </CButton>
          </CCol>
        </CRow>
      </CCardHeader>
      <CCardBody>
        <CDataTable :items="projects" :fields="fields" hover border>
          <template #id="{item}">
            <td @click="show_project(item)">
              {{ item.attributes.slug }}
            </td>
          </template>
          <template #description="{item}">
            <td>
              {{ item.attributes.description }}
            </td>
          </template>
          <template #actions="{item}">
            <td class="py-2">
              <CButtonGroup>
                <CButton
                  color="info"
                  variant="outline"
                  square
                  size="sm"
                  @click="edit_project(item)"
                >
                  Sửa
                </CButton>
                <CButton
                  color="danger"
                  variant="outline"
                  square
                  size="sm"
                  @click="delete_project(item)"
                >
                  Xóa
                </CButton>
              </CButtonGroup>
            </td>
          </template>
        </CDataTable>
      </CCardBody>
    </CCard>
    <CPagination :activePage.sync="paginate.current_page" :pages="paginate.pages"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  components: {
  },
  data () {
    return {
      fields: [
        {
          key: 'id'
        },
        {
          key: 'description',
          label: 'Mô tả'
        },
        {
          key: 'actions',
          label: '',
          _style: 'width:1%'
        }
      ]
    }
  },
  computed: {
    ...mapState({
      projects: state => state.projectModule.projects,
      paginate: state => state.projectModule.pagination
    })
  },
  methods: {
    create_project() {
      this.$router.push('/projects/create')
    },
    show_project(item) {
      this.$router.push(`/projects/${item.attributes.slug}/show`)
    },
    delete_project(item) {
      this.$store.dispatch('projectModule/delete', item)
    },
    edit_project(item) {
      this.$router.push(`/projects/${item.attributes.slug}/edit`)
    }
  },
  async beforeMount() {
    await this.$store.dispatch('projectModule/index')
  }
}
</script>

