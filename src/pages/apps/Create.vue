<template>
  <div>
    <CRow align-horizontal="center">
      <CCol md="8">
        <CCard>
          <CCardHeader>
            <CRow align-horizontal="end">
              <CCol>
                <h3>Tạo mới ứng dụng</h3>
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
                      label="Mật khẩu"
                      type="password"
                      v-model="app.attributes.secret_token"
                    />
                  </CCardBody>
                </CCard>
              </CTab>
            </CTabs>
          </CCardBody>
          <CCardFooter>
            <CRow align-horizontal="around">
              <CButton color="success" variant="outline" square @click="create">
                Tạo
              </CButton>
            </CRow>
          </CCardFooter>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active_tab: 0,
      app: {
        attributes: {
          name: "",
          description: "",
          secret_token: null,
        },
      },
    };
  },
  computed: {
  },
  methods: {
    create() {
      this.$store.dispatch('appModule/create', this.app.attributes)
    }
  },
  beforeMount() {
  }
};
</script>