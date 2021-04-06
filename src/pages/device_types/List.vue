<template>
  <div>
    <CCard>
      <CCardHeader>
        <CRow align-horizontal="end">
          <CCol md="6">
            <h3>Device Type List</h3>
          </CCol>
          <CCol md="6" class="text-right">
            <CButton
              color="success"
              variant="outline"
              square
              md
              @click="create(item)"
            >
              <CIcon class="create-btn-icon" name="cil-plus" /> Create
            </CButton>
          </CCol>
        </CRow>
      </CCardHeader>
      <CCardBody>
        <CDataTable :items="device_types" :fields="fields" hover border>
          <template #name="{item}">
            <td>
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
                  color="primary"
                  variant="outline"
                  square
                  size="sm"
                  @click="show(item)"
                >
                  Show
                </CButton>
                <CButton
                  color="info"
                  variant="outline"
                  square
                  size="sm"
                  @click="edit(item)"
                >
                  Edit
                </CButton>
                <CButton
                  color="danger"
                  variant="outline"
                  square
                  size="sm"
                  @click="destroy(item)"
                >
                  Delete
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
  name: 'DeviceTypeList',
  components: {
  },
  data () {
    return {
      fields: [
        {
          key: 'id'
        },
        {
          key: 'name'
        },
        {
          key: 'description'
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
  beforeMount() {
    this.$store.dispatch('deviceTypeModule/get_list')
  }
}
</script>
