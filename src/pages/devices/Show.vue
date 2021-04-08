<template>
  <div>
    <CRow align-horizontal="center">
      <CCol md="8">
        <CCard>
          <CCardHeader>
            <CRow align-horizontal="end">
              <CCol>
                <h3>Chi tiết thiết bị</h3>
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
                      <CInput label="Tên" v-model="current_type" :disabled="true"/>
                      <CInput label="Tên" v-model="device.attributes.name" :disabled="true"/>
                      <CTextarea
                        label="Mô tả"
                        v-model="device.attributes.description"
                        :disabled="true"
                      />
                    </CForm>
                  </CCardBody>
                </CCard>
              </CTab>
              <CTab title="Metadata">
                <CCard>
                  <CCardBody>
                    <CForm>
                      <vue-json-pretty :data="device.attributes.metadata" :showLenght="true" > </vue-json-pretty>
                    </CForm>
                  </CCardBody>
                </CCard>
              </CTab>
              <CTab title="Thông tin thiết bị">
                <CCard>
                  <CCardBody>
                    <CForm>
                      <vue-json-pretty :data="device.attributes.device_info" :showLenght="true" > </vue-json-pretty>
                    </CForm>
                  </CCardBody>
                </CCard>
              </CTab>
              <CTab title="Bảo mật">
                <CCard>
                  <CCardBody>
                    <CInput
                      label="Username"
                      v-model="device.attributes.username"
                      :disabled="true"
                    />
                    <CInput
                      label="Clientid"
                      v-model="device.attributes.client_id"
                      :disabled="true"
                    />
                  </CCardBody>
                </CCard>
              </CTab>
              <CTab title="Trạng thái (state)">
                <CCard>
                  <CCardBody>
                    <CSelect :options="state_options" v-model="state_id" @update:value="state_selected"></CSelect>
                    <vue-json-pretty :data="state_data" :showLenght="true" > </vue-json-pretty>
                  </CCardBody>
                </CCard>
              </CTab>
            </CTabs>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';
import { mapState } from 'vuex'

export default {
  name: 'ProjectShow',
  components: {
    VueJsonPretty
  },
  data() {
    return {
      active_tab: 0,
      state_data: {},
      state_id: ''
    }
  },
  computed: {
    ...mapState({
      device: state => state.deviceModule.setting_object,
      current_type: state => state.deviceModule.current_type,
      state_options: (state) => {
        return state.deviceModule.device_states.map(function(state) {
          return {
            value: state.state_id,
            label: state.state_id
          }
        })
      },
      states: state => state.deviceModule.device_states
    })
  },
  methods: {
    edit() {
      this.$router.push(`/devices/${this.device.attributes.name}/edit`)
    },
    state_selected(state_id) {
      console.log(state_id)
    }
  },
  async beforeMount() {
    if(this.current_type === '') {
      this.$router.push('/devices')
    } else {
      await this.$store.dispatch('deviceModule/show', this.$route.params.id)
      await this.$store.dispatch('deviceModule/states', this.$route.params.id)
      this.state_id = this.state_options[0].value
      this.state_data = this.states.find(state => state.state_id === this.state_id).state
    }
  }
}
</script>