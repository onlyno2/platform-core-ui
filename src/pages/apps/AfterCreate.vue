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
                      <CInput label="Tên" v-model="app.attributes.name" :disabled="true"/>
                      <CTextarea
                        label="Mô tả"
                        v-model="app.attributes.description"
                        :disabled="true"
                      />
                    </CForm>
                  </CCardBody>
                </CCard>
              </CTab>
              <CTab title="Bảo mật">
                <CCard>
                  <CCardBody>
                    <CInput
                      label="Username"
                      v-model="app.attributes.username"
                      :disabled="true"
                    />
                    <CInput
                      label="Clientid"
                      v-model="app.attributes.client_id"
                      :disabled="true"
                    />
                    <CInput
                      label="Mật khẩu"
                      v-model="app.attributes.secret_token"
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
      app: state => state.appModule.created_object
    })
  },
  methods: {
  },
  beforeMount() {
    if(JSON.stringify(this.app) === JSON.stringify({})) {
      this.$router.push('/apps')
    }
  }
}
</script>