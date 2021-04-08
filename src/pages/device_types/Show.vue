<template>
  <div>
    <CRow align-horizontal="center">
      <CCol md="6">
        <CCard>
          <CCardHeader>
            <CRow align-horizontal="end">
              <CCol>
                <h3> Chi tiết loại thiết bị </h3>
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
                      <CInput label="Tên" v-model="device_type.attributes.name" :disabled="true"/>
                      <CTextarea label="Mô tả" v-model="device_type.attributes.description" :disabled="true"/>
                    </CForm>
                  </CCardBody>
                </CCard>
              </CTab>
              <CTab title="Metadata">
                <CCard>
                  <CCardBody>
                    <CForm>
                      <vue-json-pretty :data="device_type.attributes.metadata" :showLenght="true" > </vue-json-pretty>
                    </CForm>
                  </CCardBody>
                </CCard>
              </CTab>
              <CTab title="Thông tin thiết bị">
                <CCard>
                  <CCardBody>
                    <CForm>
                      <vue-json-pretty :data="device_type.attributes.device_info" :showLenght="true" > </vue-json-pretty>
                    </CForm>
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
      active_tab: 0
    }
  },
  computed: {
    ...mapState({
      device_type: state => state.deviceTypeModule.setting_object
    })
  },
  methods: {
    edit() {
      this.$router.push(`/device_types/${this.device_type.attributes.name}/edit`)
    }
  },
  beforeMount() {
    this.$store.dispatch('deviceTypeModule/show', this.$route.params.id)
  }
}
</script>