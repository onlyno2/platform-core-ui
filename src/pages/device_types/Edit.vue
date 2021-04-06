<template>
  <div>
    <CRow align-horizontal="center">
      <CCol md="6">
        <CCard>
          <CCardHeader>
            <CRow align-horizontal="end">
              <CCol>
                <h3> Device Type Detail </h3>
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <CTabs variant="pills" :active-tab="active_tab">
              <CTab title="Basic Info">
                <CCard>
                  <CCardBody>
                    <CForm>
                      <CInput label="name" v-model="device_type.attributes.name" />
                      <CTextarea label="description" v-model="device_type.attributes.description" />
                    </CForm>
                  </CCardBody>
                </CCard>
              </CTab>
              <CTab title="Metadata">
                <CCard>
                  <CCardBody>
                    <CForm>
                      <vue-json-editor mode="code" v-model="device_type.attributes.metadata"></vue-json-editor> 
                    </CForm>
                  </CCardBody>
                </CCard>
              </CTab>
              <CTab title="Device Type Info">
                <CCard>
                  <CCardBody>
                    <CForm>
                      <vue-json-editor mode="code" v-model="device_type.attributes.device_info"></vue-json-editor>
                    </CForm>
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
                Update
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
  data() {
    return {
      active_tab: 0
    }
  },
  components: {
    vueJsonEditor
  },
  computed: {
    ...mapState({
      device_type: state => state.deviceTypeModule.setting_object
    })
  },
  methods: {
    update() {
      this.$store.dispatch('deviceTypeModule/update', this.$route.params.id)
    }
  },
  beforeMount() {
    this.$store.dispatch('deviceTypeModule/show', this.$route.params.id)
  }
}
</script>