<template>
  <div>
    <CRow align-horizontal="center">
      <CCol md="8">
        <CCard>
          <CCardHeader>
            <CRow align-horizontal="end">
              <CCol>
                <h3>Tạo mới thiết bị</h3>
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <CTabs variant="pills" :active-tab="active_tab">
              <CTab title="Thông tin cơ bản">
                <CCard>
                  <CCardBody>
                    <CForm>
                      <CSelect
                        label="Loại thiết bị"
                        :options="type_options"
                        :value="current_type"
                        :disabled="true"
                      >
                      </CSelect>
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
                      <vue-json-pretty :data="device.attributes.device_info" :showLenght="true" > </vue-json-pretty>
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
                    <CInput
                      label="Mật khẩu"
                      v-model="device.attributes.secret_token"
                      :disabled="true"
                    />
                    <CBadge color="danger">
                      Lưu ý: Mật khẩu này nên được lưu lại ở một nơi khác. 
                      Sẽ không thể khôi phục hoặc thay đổi sau khi tạo thiết bị
                    </CBadge>
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
  components: {
    VueJsonPretty
  },
  data() {
    return {
      active_tab: 0
    }
  },
  computed: {
    ...mapState({
      type_options: (state) => {
        return state.deviceTypeModule.device_types.map(function (device_type) {
          return {
            value: device_type.attributes.name,
            label: device_type.attributes.name,
          };
        });
      },
      device: state => state.deviceModule.created_object,
      current_type: state => state.deviceModule.current_type
    })
  },
  methods: {
  },
  beforeMount() {
    if(JSON.stringify(this.device) === JSON.stringify({})) {
      this.$router.push('/devices')
    }
  }
}
</script>