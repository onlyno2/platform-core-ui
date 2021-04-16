<template>
  <div>
    <CCard>
      <CCardHeader>
        <CRow align-horizontal="end">
          <CCol md="6">
            <h3>Danh sách luật</h3>
          </CCol>
          <CCol md="6" class="text-right">
            <CButton
              color="success"
              variant="outline"
              square
              md
              @click="create(item)"
            >
              <CIcon class="create-btn-icon" name="cil-plus" /> Thêm mới
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
        <CDataTable :items="rules" :fields="fields" hover border>
          <template #name="{item}">
            <td @click="show(item)">
              {{ item.attributes.name }}
            </td>
          </template>
           <template #event_id="{item}">
            <td>
              {{ item.attributes.event_id }}
            </td>
          </template>
          <template #description="{item}">
            <td>
              {{ item.attributes.description }}
            </td>
          </template>
          <template #condition="{item}">
            <td>
              {{ item.attributes.condition }}
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
          label: 'Tên'
        },
        {
          key: 'event_id',
          label: 'Sự kiện'
        },
        {
          key: 'description',
          label: 'Mô tả'
        },
        {
          key: 'condition',
          label: 'Điều kiện kích hoạt'
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
        this.$store.dispatch('ruleModule/index', newPage)
    }
  },
  computed: {
    ...mapState({
      device_types: state => state.deviceTypeModule.device_types,
      rules: state => state.ruleModule.rules,
      paginate: state => state.ruleModule.pagination,
      type_options: (state) => {
        return state.deviceTypeModule.device_types.map(function(device_type) {
          return {
            value: device_type.attributes.name,
            label: device_type.attributes.name
          }
        })
      },
      current_type: state => state.ruleModule.current_type
    })
  },
  methods: {
    show(item) {
      this.$router.push(`rules/${item.id}/show`)
    },
    create() {
      this.$router.push(`rules/create`)
    },
    update(item) {
      this.$router.push(`rules/${item.attributes.id}/edit`)
    },
    destroy(item) {
      this.$store.dispatch('ruleModule/destroy', item.attributes.name)
    },
    type_selected(value) {
      this.$store.dispatch('ruleModule/set_type', value)
      this.$store.dispatch('ruleModule/index')
    }
  },
  async created() {
    await this.$store.dispatch('deviceTypeModule/index')
    if(this.current_type === '') {
      this.$store.dispatch('ruleModule/set_type', this.device_types[0].attributes.name)
    }
    this.$store.dispatch('ruleModule/index')
  }
}
</script>
