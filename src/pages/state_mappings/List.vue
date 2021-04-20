<template>
  <div>
    <CCard>
      <CCardHeader>
        <CRow align-horizontal="end">
          <CCol md="6">
            <h3>Danh sách trạng thái thiết bị</h3>
          </CCol>
          <CCol md="6" class="text-right">
            <CButton
              color="success"
              variant="outline"
              square
              md
              @click="create"
            >
              <CIcon class="create-btn-icon" name="cil-plus" /> Tạo mới
            </CButton>
          </CCol>
        </CRow>
        <CRow>
          <CCol md="6" class="mt-3">
            <CInput label="Loại thiết bị" v-model="current_type" :disabled="true"> </CInput>
          </CCol>
          <CCol md="6" class="my-auto">
            <CButton
              color="success"
              variant="outline"
              square
              sm
              @click="select_type_modal = true"
              class="mt-4"
            >
              Chọn
            </CButton>
          </CCol>
        </CRow>
        <CRow>
          <CCol md="6" class="mt-3">
            <CInput label="Sự kiện" v-model="current_event" :disabled="true"> </CInput>
          </CCol>
          <CCol md="6" class="my-auto">
            <CButton
              color="success"
              variant="outline"
              square
              sm
              @click="select_event_modal = true"
              class="mt-4"
            >
              Chọn
            </CButton>
          </CCol>
        </CRow>
      </CCardHeader>
      <CCardBody>
        <CDataTable :items="mappings" :fields="fields" hover border>
          <template #state="{item}">
            <td>
              {{ item.attributes.state_id }}
            </td>
          </template>
          <template #mappings="{item}">
            <td>
              {{ item.attributes.mappings }}
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
                  @click="destoy(item)"
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
    <CModal size="lg" title="Chọn loại thiết bị" color="info" :show.sync="select_type_modal">
      <CCard>
        <CCardBody>
          <CDataTable :items="device_types" :fields="device_type_fields" hover border>
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
                    @click="select_type(item)"
                    :disabled="selecting_type(item)"
                  >
                    Chọn
                  </CButton>
                </CButtonGroup>
              </td>
            </template>
          </CDataTable>
        </CCardBody>
      </CCard>
      <CPagination :activePage.sync="type_paginate.current_page" :pages="type_paginate.pages"/>
      <template slot="footer">
        <CButtonGroup>
          <CButton color="danger" variant="outline" square @click="cancel_select_type">
            Hủy
          </CButton>
        </CButtonGroup>
      </template>
    </CModal>
    <CModal size="lg" title="Chọn sự kiện" color="info" :show.sync="select_event_modal">
      <CCard>
        <CCardBody>
          <CDataTable :items="events" :fields="event_table_fields" hover border>
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
                    @click="select_event(item)"
                    :disabled="selecting_event(item)"
                  >
                    Chọn
                  </CButton>
                </CButtonGroup>
              </td>
            </template>
          </CDataTable>
        </CCardBody>
      </CCard>
      <CPagination :activePage.sync="type_paginate.current_page" :pages="type_paginate.pages"/>
      <template slot="footer">
        <CButtonGroup>
          <CButton color="danger" variant="outline" square @click="cancel_select_type">
            Hủy
          </CButton>
        </CButtonGroup>
      </template>
    </CModal>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  components: {
  },
  data () {
    return {
      device_type_fields: [
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
      ],
      event_table_fields: [
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
      ],
      fields: [
        {
          key: 'id'
        },
        {
          key: 'state',
          label: 'Trạng thái'
        },
        {
          key: 'mappings',
          label: 'Ánh xạ'
        },
        {
          key: 'actions',
          label: '',
          _style: 'width:1%'
        }
      ],
      select_type_modal: false,
      select_event_modal: false
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
      type_paginate: state => state.deviceTypeModule.pagination,
      mappings: state => state.mappingModule.mappings,
      paginate: state => state.mappingModule.pagination,
      current_type: state => state.mappingModule.current_type,
      events: state => state.eventModule.events,
      current_event: state => state.mappingModule.current_event
    })
  },
  methods: {
    create() {
      this.$router.push(`mappings/create`)
    },
    update(item) {
      this.$router.push(`devices/${item.attributes.name}/edit`)
    },
    destroy(item) {
      this.$store.dispatch('deviceModule/destroy', item.attributes.name)
    },
    cancel_select_type() {
      this.select_type_modal = false
    },
    select_type(item) {
      this.$store.dispatch('mappingModule/set_type', item.attributes.name)
      this.$store.dispatch('eventModule/set_type', item.attributes.name)
      this.select_type_modal = false
    },
    select_event(item) {
      this.$store.dispatch('mappingModule/set_event', item.attributes.name)
      this.$store.dispatch('mappingModule/index')
      this.select_event_modal = false
    },
    selecting_type(item) {
      return this.current_type === item.attributes.name
    },
    selecting_event(item) {
      return this.current_event === item.attributes.name
    }
  },
  async created() {
    await this.$store.dispatch('deviceTypeModule/index')
    if(this.current_type === '') {
      this.$store.dispatch('mappingModule/set_type', this.device_types[0].attributes.name)
      this.$store.dispatch('eventModule/set_type', this.device_types[0].attributes.name)
    }
  }
}
</script>
