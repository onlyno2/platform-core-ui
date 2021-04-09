<template>
  <div>
    <CRow align-horizontal="center">
      <CCol md="6">
        <CCard>
          <CCardHeader>
            <CRow align-horizontal="end">
              <CCol>
                <h3> Chi tiết dự án </h3>
              </CCol>
              <CCol style="text-align: end">
                <CButton
                  color="info"
                  variant="outline"
                  square
                  size="md"
                  @click="edit(item)"
                >
                  Sửa
                </CButton>
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <CForm>
              <CInput label="Tên" :disabled="true" v-model="project.attributes.name" />
              <CTextarea label="Mô tả" :disabled="true" v-model="project.attributes.description" />
              <CInput label="Id" :disabled="true" v-model="project.attributes.slug" />
              <CInput label="Khởi tạo lúc" :disabled="true" v-model="project.attributes.created_at" />
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  components: {
  },
  data() {
    return {

    }
  },
  computed: {
    ...mapState({
      project: state => state.projectModule.setting_object
    })
  },
  methods: {
    edit() {
      this.$router.push(`/projects/${this.project.attributes.name}/edit`)
    }
  },
  beforeMount() {
    this.$store.dispatch('projectModule/show', this.$route.params.id)
  }
}
</script>