<template>
  <div>
    <CRow align-horizontal="center">
      <CCol md="8">
        <CCard>
          <CCardHeader>
            <CRow align-horizontal="end">
              <CCol>
                <h3>Chi tiết luật</h3>
              </CCol>
              <CCol style="text-align: end">
                <CButton
                  color="info"
                  variant="outline"
                  square
                  @click="edit"
                >
                  Cập nhật
                </CButton>
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <CTabs variant="pills" :active-tab="active_tab">
              <CTab title="Thông tin cơ bản">
                <CCard>
                  <CCardBody>
                    <CForm>
                      <CInput label="Loại thiết bị" v-model="current_type" :disabled="true"/>
                      <CInput label="Tên" v-model="rule.attributes.name" :disabled="true"/>
                      <CTextarea
                        label="Mô tả"
                        v-model="rule.attributes.description"
                        :disabled="true"
                      />
                    </CForm>
                  </CCardBody>
                </CCard>
              </CTab>
              <CTab title="Hành động">
                <CCard>
                  <CCardHeader>
                    <CButtonGroup>
                      <CButton
                        color="success"
                        variant="outline"
                        square
                        size="sm"
                        @click="action_create_modal = true"
                      >
                        Thêm mới
                      </CButton>
                    </CButtonGroup>
                  </CCardHeader>
                  <CCardBody>
                    <CDataTable :items="actions" :fields="actions_table_fields" hover border>
                      <template #type="{item}">
                        <td>
                          {{ item.attributes.action_type }}
                        </td>
                      </template>
                      <template #data="{item}">
                        <td>
                          <vue-json-pretty :data="item.attributes.data" :showLenght="true" > </vue-json-pretty>
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
                              @click="destroy_action(item)"
                            >
                              Xóa
                            </CButton>
                          </CButtonGroup>
                        </td>
                      </template>
                    </CDataTable>
                  </CCardBody>
                </CCard>
              </CTab>
            </CTabs>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    <CModal title="Tạo mới hành động" color="info" :show.sync="action_create_modal">
      <CForm>
        <CSelect label="Loại hành động" :options="action_types" :value="action.action_type" @update:value="action_type_selected"/>
        <p>Dữ liệu</p>
        <vue-json-editor mode="code" v-model="action.data"></vue-json-editor> 
      </CForm>
      <template slot="footer">
          <CButton
            color="info"
            variant="outline"
            square
            size="sm"
            @click="create_action_cancel"
          >
            Hủy
          </CButton>
          <CButton
            color="success"
            variant="outline"
            square
            size="sm"
            @click="create_action_confirmed"
          >
            Thêm
          </CButton>
      </template>
    </CModal>
  </div>
</template>

<script>
import vueJsonEditor from 'vue-json-editor'
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';
import { mapState } from 'vuex'

export default {
  components: {
    VueJsonPretty,
    vueJsonEditor
  },
  data() {
    return {
      active_tab: 0,
      actions_table_fields: [
        {
          key: 'type',
          label: 'Loại'
        },
        {
          key: 'data',
          label: 'Dữ liệu'
        },
        {
          key: 'actions',
          label: '',
          _style: 'width:1%'
        }
      ],
      action_create_modal: false,
      action_types: [
        {
          value: 'alert',
          label: 'Alert'
        },
        {
          value: 'webhook',
          label: 'Webhook'
        }
      ],
      action: {
        action_type: 'alert',
        data: {}
      }
    }
  },
  computed: {
    ...mapState({
      rule: state => state.ruleModule.setting_object,
      current_type: state => state.ruleModule.current_type,
      actions: state => state.actionModule.actions
    })
  },
  methods: {
    edit() {
      this.$router.push(`/rules/${this.rule.id}/edit`)
    },
    destroy_action(item) {
      this.$store.dispatch('actionModule/destroy', { type_id: this.current_type, rule_id: this.$route.params.id, action_id: item.id })
    },
    create_action_cancel() {
      this.action = {
        action_type: '',
        data: {}
      }
      this.action_create_modal = false
    },
    create_action_confirmed() {
      this.$store.dispatch('actionModule/create', { type_id: this.current_type, rule_id: this.$route.params.id, data: this.action })
      this.action_create_modal = false
    },
    action_type_selected(value) {
      this.action.action_type = value
    }
  },
  async beforeMount() {
    if(this.current_type === '') {
      this.$router.push('/rules')
    } else {
      await this.$store.dispatch('ruleModule/show', this.$route.params.id)
      console.log(this.current_type)
      await this.$store.dispatch('actionModule/index', { type_id: this.current_type, rule_id: this.$route.params.id })
    }
  }
}
</script>