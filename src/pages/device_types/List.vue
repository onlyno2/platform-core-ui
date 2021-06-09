<template>
  <div>
    <CCard>
      <CCardHeader>
        <CRow align-horizontal="end">
          <CCol md="6">
            <h3>Danh sách loại thiết bị</h3>
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
        <CDataTable :items="device_types" :fields="fields" hover border>
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
                  color="info"
                  variant="outline"
                  square
                  size="sm"
                  @click="edit(item)"
                >
                  Sửa
                </CButton>
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
      device_types: state => state.deviceTypeModule.device_types,
      paginate: state => state.deviceTypeModule.pagination
    })
  },
  methods: {
    show(item) {
      this.$router.push(`device_types/${item.attributes.name}/show`)
    },
    create() {
      this.$router.push(`device_types/create`)
    },
    update(item) {
      this.$router.push(`device_types/${item.attributes.name}/edit`)
    },
    destroy(item) {
      this.$store.dispatch('deviceTypeModule/destroy', item)
    }
  },
  async created() {
    await this.$store.dispatch('deviceTypeModule/index')
  }
}
</script>
