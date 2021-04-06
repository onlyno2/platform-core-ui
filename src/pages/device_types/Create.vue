<template>
  <div>
    <CRow align-horizontal="center">
      <CCol md="6">
        <CCard>
          <CCardHeader>
            <CRow align-horizontal="end">
              <CCol>
                <h3> Device Type Create </h3>
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
                color="success"
                variant="outline"
                square
                @click="create"
              >
                Create
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

export default {
  name: 'ProjectCreate',
  data() {
    return {
      active_tab: 0,
      device_type: {
        attributes: {
          name: '',
          description: '',
          metadata: {},
          device_info: {}
        }
      }
    }
  },
  components: {
    vueJsonEditor
  },
  computed: {
  },
  methods: {
    create() {
      this.$store.dispatch('deviceTypeModule/create', this.device_type.attributes)
    }
  }
}
</script>