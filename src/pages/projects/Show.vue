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
              <CCol style="text-align: end">
                <CButton
                  color="info"
                  variant="outline"
                  square
                  size="md"
                  @click="edit(item)"
                >
                  Edit
                </CButton>
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <CForm>
              <CInput label="Name" :disabled="true" v-model="project.attributes.name" />
              <CTextarea label="Description" :disabled="true" v-model="project.attributes.description" />
              <CInput label="Slug" :disabled="true" v-model="project.attributes.slug" />
              <CInput label="Created At" :disabled="true" v-model="project.attributes.created_at" />
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
  name: 'ProjectShow',
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