<template>
  <div>
    <CRow align-horizontal="center">
      <CCol md="8">
        <CCard>
          <CCardHeader>
            <CRow align-horizontal="end">
              <CCol>
                <h3>Cập nhật ứng dụng</h3>
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <CTabs variant="pills" :active-tab="active_tab">
              <CTab title="Thông tin cơ bản">
                <CCard>
                  <CCardBody>
                    <CForm>
                      <CInput label="Tên" v-model="app.attributes.name" />
                      <CTextarea
                        label="Mô tả"
                        v-model="app.attributes.description"
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
import { mapState } from 'vuex'

export default {
  data() {
    return {
      active_tab: 0
    }
  },
  computed: {
    ...mapState({
      app: state => state.appModule.setting_object,
    })
  },
  methods: {
    update() {
      this.$store.dispatch('appModule/update', this.$route.params.id)
    }
  },
  async beforeMount() {
    await this.$store.dispatch('appModule/show', this.$route.params.id)
  }
}
</script>