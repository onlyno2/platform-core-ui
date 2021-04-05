<template>
  <div>
    <CRow align-horizontal="center">
      <CCol md="6">
        <CCard>
          <CCardHeader>
            <CRow align-horizontal="end">
              <CCol>
                <h3>Project Edit</h3>
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <CForm>
              <CInput label="Name" v-model="project.name" />
              <CTextarea
                label="Description"
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