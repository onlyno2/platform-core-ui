<template>
  <div>
    <CRow align-horizontal="center">
      <CCol md="8">
        <CCard>
          <CCardHeader>
            <CRow align-horizontal="end">
              <CCol>
                <h3>Tạo mới trạng thái</h3>
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <CTabs variant="pills" :active-tab="active_tab">
              <CTab title="Loại thiết bị">
                <CCard>
                  <CCardBody>
                    <CForm>
                      <CInput label="Loại thiết bị" v-model="current_type" :disabled="true" />
                    </CForm>
                    <CDataTable :items="device_types" :fields="device_type_table_fields" hover border>
                      <template #name="{item}">
                        <td>
                          {{ item.attributes.name }}
                        </td>
                      </template>
                      <template #action="{item}">
                        <td class="py-2">
                          <CButtonGroup>
                            <CButton
                              color="info"
                              variant="outline"
                              square
                              size="sm"
                              @click="select_type(item)"
                            >
                              Chọn
                            </CButton>
                          </CButtonGroup>
                        </td>
                      </template>
                    </CDataTable>
                    <CPagination :activePage.sync="type_pagination.current_page" :pages="type_pagination.pages" @update:activePage="type_active_page_updated"/>
                  </CCardBody>
                </CCard>
              </CTab>
              <CTab title="Thông tin cơ bản" :disabled="current_step(1)">
                <CCard>
                  <CCardBody>
                    <CForm>
                      <CInput label="Tên trạng thái" v-model="mapping.attributes.state_id" />
                    </CForm>
                  </CCardBody>
                </CCard>
              </CTab>
              <CTab title="Sự kiện" :disabled="current_step(2)">
                <CCard>
                  <CCardHeader>
                    <CButton
                      color="success"
                      variant="outline"
                      square
                      size="sm"
                      @click="open_create_schema_modal"
                    >
                      Tạo mới
                    </CButton>
                  </CCardHeader>
                  <CCardBody>
                    <CForm>
                      <CInput label="Sự kiện" v-model="current_event" :disabled="true" />
                    </CForm>
                    <CDataTable :items="events" :fields="event_table_fields" hover border>
                      <template #name="{item}">
                        <td>
                          {{ item.attributes.name }}
                        </td>
                      </template>
                      <template #action="{item}">
                        <td class="py-2">
                          <CButtonGroup>
                            <CButton
                              color="info"
                              variant="outline"
                              square
                              size="sm"
                              @click="select_event(item)"
                            >
                              Chọn
                            </CButton>
                          </CButtonGroup>
                        </td>
                      </template>
                    </CDataTable>
                  </CCardBody>
                </CCard>
              </CTab>
              <CTab title="Mappings" :disabled="current_step(3)">
                <CCard>
                  <CCardBody>
                    <CForm>
                      <p>Nội dung</p>
                      <vue-json-editor mode="code" v-model="mapping.attributes.mappings"></vue-json-editor>
                    </CForm>
                  </CCardBody>
                </CCard>
              </CTab>
            </CTabs>
          </CCardBody>
          <CCardFooter>
            <CRow align-horizontal="around" v-if="active_tab === 3">
              <CButton color="success" variant="outline" square @click="prev_step" :disabled="step <= 0">
                <CIcon name="cil-arrow-left" /> 
              </CButton>
              <CButton color="success" variant="outline" square @click="create">
                Tạo
              </CButton>
            </CRow>
            <CRow align-horizontal="around" v-else>
              <CButton color="success" variant="outline" square @click="prev_step" :disabled="step <= 0">
                <CIcon name="cil-arrow-left" /> 
              </CButton>
              <CButton color="success" variant="outline" square @click="next_step" :disabled="step >= 3">
                <CIcon name="cil-arrow-right" />
              </CButton>
            </CRow>
          </CCardFooter>
        </CCard>
      </CCol>
    </CRow>
    <CModal title="Tạo mới sự kiện thiết bị" color="info" :show.sync="create_event_modal">
      <CCard>
        <CCardBody>
          <CTabs>
            <CTab title="Thông tin cơ bản">
              <CCard>
                <CCardBody>
                  <CForm>
                    <CInput label="Tên " v-model="event_data.name"/>
                    <CTextarea label="Mô tả " v-model="event_data.description"/>
                  </CForm>
                </CCardBody>
              </CCard>
            </CTab>
            <CTab title="Schema">
              <CCard>
                <CCardBody>
                  <CForm>
                    <CInput label="Schema " v-model="event_data.schema_name" :disabled="true"/>
                  </CForm>
                  <CDataTable :items="schemas" :fields="schema_table_fields" hover border>
                    <template #name="{item}">
                      <td>
                        {{ item.attributes.name }}
                      </td>
                    </template>
                    <template #action="{item}">
                      <td class="py-2">
                        <CButtonGroup>
                          <CButton
                            color="info"
                            variant="outline"
                            square
                            size="sm"
                            @click="select_schema(item)"
                          >
                            Chọn
                          </CButton>
                        </CButtonGroup>
                      </td>
                    </template>
                  </CDataTable>
                  <CPagination :activePage.sync="schema_pagination.current_page" :pages="schema_pagination.pages" @update:activePage="schema_active_page_updated"/>
                </CCardBody>
              </CCard>
            </CTab>
          </CTabs>
        </CCardBody>
      </CCard>
      <template slot="footer">
        <CButtonGroup>
          <CButton color="danger" variant="outline" square @click="cancel_create_event">
            Hủy
          </CButton>
          <CButton color="success" variant="outline" square @click="create_event">
            Tạo
          </CButton>
        </CButtonGroup>
      </template>
    </CModal>
  </div>
</template>

<script>
import vueJsonEditor from 'vue-json-editor'
import { mapState } from "vuex";

export default {
  data() {
    return {
      step: 0,
      active_tab: 0,
      create_event_modal: false,
      event_data: {
        name: '',
        description: '',
        schema_id: '',
        schema_name: ''
      },
      device_type_table_fields: [
        {
          key: 'name',
          label: 'Tên'
        },
        {
          key: 'action',
          label: ''
        }
      ],
      mapping: {
        attributes: {
          state_id: "",
          mappings: ""
        },
      },
      event_table_fields: [
        {
          key: 'name',
          label: 'Tên'
        },
        {
          key: 'action',
          label: ''
        }
      ],
      schema_table_fields: [
        {
          key: 'name',
          label: 'Tên'
        },
        {
          key: 'action',
          label: ''
        }
      ],
      mapping: {
        attributes: {
          state_id: "",
          mappings: ""
        },
      },
    };
  },
  components: {
    vueJsonEditor
  },
  computed: {
    ...mapState({
      current_type: (state) => state.eventModule.current_type,      
      type_pagination: (state) => state.deviceTypeModule.pagination,
      device_types: (state) => state.deviceTypeModule.device_types,
      events: (state) => state.eventModule.events,
      schema_pagination: (state) => state.schemaModule.pagination,
      schemas: (state) => state.schemaModule.schemas,
      current_event: (state) => state.mappingModule.current_event
    }),
  },
  methods: {
    create() {
      this.$store.dispatch('mappingModule/create', this.mapping.attributes)
    },
    select_type(item) {
      this.$store.dispatch('schemaModule/set_type', item.attributes.name)
      this.$store.dispatch('eventModule/set_type', item.attributes.name)
      this.$store.dispatch('mappingModule/set_type', item.attributes.name)
    },
    select_schema(item) {
      this.event_data.schema_name = item.attributes.name
      this.event_data.schema_id = item.id
    },
    select_event(item) {
      this.$store.dispatch('mappingModule/set_event', item.attributes.name)
    },
    current_step(step) {
      return step > this.step
    },
    async next_step() {
      this.step += 1
      this.active_tab = this.step
      if(this.step === 2) {
        await this.$store.dispatch('eventModule/index')
      }
    },
    prev_step() {
      this.step -= 1
      this.active_tab = this.step
    },
    async open_create_schema_modal() {
      await this.$store.dispatch('schemaModule/index')
      this.create_event_modal = true
    },  
    async type_active_page_updated(new_page) {
      await this.$store.dispatch('deviceTypeModule/index', new_page)
    },
    async event_active_page_updated(new_page) {
      await this.$store.dispatch('eventModule/index', new_page)
    },
    async schema_active_page_updated(new_page) {
      await this.$store.dispatch('schemaModule/index', new_page)
    },
    async create_event() {
      await this.$store.dispatch('eventModule/create', this.event_data)
      this.create_event_modal = false
    },
    cancel_create_event() {
      this.event_data = {
        name: '',
        description: '',
        schema_id: '',
        schema_name: ''
      }
      this.create_event_modal = false
    }
  },
  async created() {
    await this.$store.dispatch("deviceTypeModule/index")
    if (this.current_type === "") {
      this.$store.dispatch(
        "ruleModule/set_type",
        this.device_types[0].attributes.name
      );
    }
  },
};
</script>