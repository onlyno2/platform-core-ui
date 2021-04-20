<template>
  <div>
    <CRow align-horizontal="center">
      <CCol md="6">
        <CCard>
          <CCardHeader>
            <CRow align-horizontal="end">
              <CCol>
                <h3> Tạo mới schema </h3>
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <CTabs variant="pills" :active-tab="active_tab">
              <CTab title="Thông tin cơ bản">
                <CCard>
                  <CCardBody>
                    <CForm>
                      <CInput label="Tên" v-model="schema.attributes.name" />
                      <CTextarea label="Mô tả" v-model="schema.attributes.description" />
                    </CForm>
                  </CCardBody>
                </CCard>
              </CTab>
              <CTab title="Nội dung schema">
                <CCard>
                  <CCardBody>
                    <CBadge color="info">Hiện tại chỉ hỗ trợ JSON Schema v4</CBadge>
                    <CForm>
                      <p>Nội dung</p>
                      <vue-json-editor mode="code" v-model="schema.attributes.schema_content"></vue-json-editor>
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
import vueJsonEditor from 'vue-json-editor'

export default {
  data() {
    return {
      active_tab: 0,
      schema: {
        attributes: {
          name: '',
          description: '',
          metadata: {},
          schema_content: {
            "type": "object",
            "$schema": "http://json-schema.org/draft-04/schema#",
            "properties": {

            }
          },
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
      this.$store.dispatch('schemaModule/create', this.schema.attributes)
    }
  }
}
</script>