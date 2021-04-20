<template>
  <div>
    <CRow align-horizontal="center">
      <CCol md="6">
        <CCard>
          <CCardHeader>
            <CRow align-horizontal="end">
              <CCol>
                <h3> Chi tiết schema </h3>
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <CTabs variant="pills" :active-tab="active_tab">
              <CTab title="Thông tin cơ bản">
                <CCard>
                  <CCardBody>
                    <CForm>
                      <CInput label="Tên" v-model="schema.attributes.name" :disabled="true"/>
                      <CTextarea label="Mô tả" v-model="schema.attributes.description" :disabled="true"/>
                    </CForm>
                  </CCardBody>
                </CCard>
              </CTab>
              <CTab title="Nội dung">
                <CCard>
                  <CCardBody>
                    <CForm>
                      <vue-json-pretty :data="content" :showLenght="true" > </vue-json-pretty>
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
      schema: state => state.schemaModule.setting_object,
      content: state => state.schemaModule.content
    })
  },
  methods: {
  },
  async created() {
    await this.$store.dispatch('schemaModule/show', this.$route.params.id)
    await this.$store.dispatch('schemaModule/content', this.$route.params.id)
  }
}
</script>