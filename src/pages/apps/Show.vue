<template>
  <div>
    <CRow align-horizontal="center">
      <CCol md="8">
        <CCard>
          <CCardHeader>
            <CRow align-horizontal="end">
              <CCol>
                <h3>Chi tiết ứng dụng</h3>
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
import vueJsonEditor from "vue-json-editor";
import { mapState } from "vuex";

export default {
  data() {
    return {
      active_tab: 0
    };
  },
  components: {
    vueJsonEditor,
  },
  computed: {
    ...mapState({
      app: state => state.appModule.setting_object
    }),
  },
  methods: {
    edit() {
      this.$router.push(`/apps/${this.$route.params.id}/edit`)
    }
  },
  async created() {
    await this.$store.dispatch("appModule/show", this.$route.params.id)
  }
};
</script>