<template>
  <div>
    <CRow align-horizontal="center">
      <CCol md="8">
        <CCard>
          <CCardHeader>
            <CRow align-horizontal="end">
              <CCol>
                <h3>Cập nhật thiết bị</h3>
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
                      <CInput label="Tên" v-model="device.attributes.name" :disabled="true"/>
                      <CTextarea
                        label="Mô tả"
                        v-model="device.attributes.description"
                      />
                    </CForm>
                  </CCardBody>
                </CCard>
              </CTab>
              <CTab title="Metadata">
                <CCard>
                  <CCardBody>
                    <CForm>
                      <vue-json-editor mode="code" v-model="device.attributes.metadata"></vue-json-editor> 
                    </CForm>
                  </CCardBody>
                </CCard>
              </CTab>
              <CTab title="Thông tin thiết bị">
                <CCard>
                  <CCardBody>
                    <CForm>
                      <vue-json-editor mode="code" v-model="device.attributes.device_info"></vue-json-editor> 
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
            </CTabs>
          </CCardBody>
          <CCardFooter>
            <CRow align-horizontal="around">
              <CButton
                color="info"
                variant="outline"
                square
                @click="update"
              >
                Cập nhật
              </CButton>
            </CRow>
          </CCardFooter>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import vueJsonEditor from 'vue-json-editor'
import { mapState } from 'vuex'

export default {
  name: 'ProjectShow',
  components: {
    vueJsonEditor
  },
  data() {
    return {
      active_tab: 0
    }
  },
  computed: {
    ...mapState({
      device: state => state.deviceModule.setting_object,
      current_type: state => state.deviceModule.current_type
    })
  },
  methods: {
    update() {
      this.$store.dispatch('deviceModule/update', this.$route.params.id)
    }
  },
  async beforeMount() {
    if(this.current_type === '') {
      this.$router.push('/devices')
    } else {
      await this.$store.dispatch('deviceModule/show', this.$route.params.id)
    }
  }
}
</script>