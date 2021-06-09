<template>
  <div>
    <CCard>
      <CCardHeader>
        <CRow align-horizontal="end">
          <CCol md="6">
            <h3>Danh sách thiết bị</h3>
          </CCol>
          <CCol md="6" class="text-right">
            <CButton
              color="success"
              variant="outline"
              square
              md
              @click="create(item)"
            >
              <CIcon class="create-btn-icon" name="cil-plus" /> Tạo mới
            </CButton>
          </CCol>
        </CRow>
        <CRow>
          <CCol md="6" class="mt-3">
            <CSelect label="Loại thiết bị" :options="type_options" :value="current_type" @update:value="type_selected"> </CSelect>
          </CCol>
        </CRow>
      </CCardHeader>
      <CCardBody>
        <CDataTable :items="devices" :fields="fields" hover border>
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
          <template #active="{item}">
            <td>
              <CBadge color="success" v-if="item.attributes.active">Đang kết nối</CBadge>
              <CBadge color="danger" v-if="!item.attributes.active">Đã ngắt</CBadge>
            </td>
          </template>
          <template #last_active="{item}">
            <td>
              {{ item.attributes.last_active }}
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
                  @click="update(item)"
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
          label: 'ID'
        },
        {
          key: 'description',
          label: 'Mô tả'
        },
        {
          key: 'active',
          label: 'Kết nối'
        },
        {
          key: 'last_active',
          label: 'Hoạt động lần cuối'
        },
        {
          key: 'actions',
          label: '',
          _style: 'width:1%'
        }
      ]
    }
  },
  watch: {
    'paginate.current_page': function(newPage) {
      if (newPage <= this.paginate.pages)
        this.$store.dispatch('deviceModule/index', newPage)
    }
  },
  computed: {
    ...mapState({
      device_types: state => state.deviceTypeModule.device_types,
      devices: state => state.deviceModule.devices,
      paginate: state => state.deviceModule.pagination,
      type_options: (state) => {
        return state.deviceTypeModule.device_types.map(function(device_type) {
          return {
            value: device_type.attributes.name,
            label: device_type.attributes.name
          }
        })
      },
      current_type: state => state.deviceModule.current_type
    })
  },
  methods: {
    show(item) {
      this.$router.push(`devices/${item.attributes.name}/show`)
    },
    create() {
      this.$router.push(`devices/create`)
    },
    update(item) {
      this.$router.push(`devices/${item.attributes.name}/edit`)
    },
    destroy(item) {
      this.$store.dispatch('deviceModule/destroy', item.attributes.name)
    },
    type_selected(value) {
      this.$store.dispatch('deviceModule/set_type', value)
      this.$store.dispatch('deviceModule/index')
    }
  },
  async created() {
    await this.$store.dispatch('deviceTypeModule/index')
    if(this.current_type === '') {
      this.$store.dispatch('deviceModule/set_type', this.device_types[0].attributes.name)
    }
    this.$store.dispatch('deviceModule/index')
  }
}
</script>
