<template>
  <div>
    <CCard>
      <CCardHeader>
        <CRow align-horizontal="end">
          <CCol md="6">
            <h3>Danh sách Schema</h3>
          </CCol>
          <CCol md="6" class="text-right">
            <CButton
              color="success"
              variant="outline"
              square
              md
              @click="create(item)"
            >
              <CIcon class="create-btn-icon" name="cil-plus" /> Tạo
            </CButton>
          </CCol>
        </CRow>
      </CCardHeader>
      <CCardBody>
        <CDataTable :items="schemas" :fields="fields" hover border>
          <template #name="{item}">
            <td @click="show(item)">
              {{ item.attributes.name }}
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
                  color="danger"
                  variant="outline"
                  square
                  size="sm"
                  @click="destroy(item)"
                >
                  Xóa
                </CButton>
              </CButtonGroup>
            </td>
          </template>
        </CDataTable>
      </CCardBody>
    </CCard>
    <CPagination :activePage.sync="paginate.current_page" :pages="paginate.pages" @update:activePage="active_page_updated"/>
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
          key: 'name',
          label: 'Tên'
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
      schemas: state => state.schemaModule.schemas,
      paginate: state => state.schemaModule.pagination
    })
  },
  methods: {
    show(item) {
      this.$router.push(`schemas/${item.id}/show`)
    },
    create() {
      this.$router.push(`schemas/create`)
    },
    update(item) {
      this.$router.push(`schemas/${item.id}/edit`)
    },
    destroy(item) {
      this.$store.dispatch('schemaModule/destroy', item.id)
    },
    active_page_updated(page_number) {
      this.$store.dispatch('schemaModule/index', page_number)
    }
  },
  async created() {
    await this.$store.dispatch('schemaModule/index')
  }
}
</script>
