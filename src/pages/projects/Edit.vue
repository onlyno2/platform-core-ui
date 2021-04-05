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
              <CInput label="Name" v-model="project.attributes.name" />
              <CTextarea
                label="Description"
                v-model="project.attributes.description"
              />
            </CForm>
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
import { mapState } from "vuex";

export default {
  name: "ProjectShow",
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapState({
      project: (state) => state.projectModule.setting_object,
    }),
  },
  methods: {
    update() {
      this.$store.dispatch('projectModule/update', this.project)
    }
  },
  beforeMount() {
    this.$store.dispatch("projectModule/show", this.$route.params.id);
  },
};
</script>