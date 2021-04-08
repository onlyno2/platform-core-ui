<template>
  <div>
    <CRow align-horizontal="center">
      <CCol md="6">
        <CCard>
          <CCardHeader>
            <CRow align-horizontal="end">
              <CCol>
                <h3>Tạo mới dự án</h3>
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <CForm>
              <CInput label="Tên" v-model="project.name" />
              <CTextarea
                label="Mô tả"
                v-model="project.description"
              />
            </CForm>
          </CCardBody>
          <CCardFooter>
            <CRow align-horizontal="around">
              <CButton
                color="success"
                variant="outline"
                square
                @click="create"
              >
                Tạo mới
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
  name: "ProjectShow",
  components: {},
  data() {
    return {
      project: {
        name: '',
        description: ''
      }
    };
  },
  computed: {},
  methods: {
    create() {
      this.$store.dispatch('projectModule/create', this.project)
    }
  }
};
</script>