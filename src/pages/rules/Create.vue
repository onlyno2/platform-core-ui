<template>
  <div>
    <CRow align-horizontal="center">
      <CCol md="8">
        <CCard>
          <CCardHeader>
            <CRow align-horizontal="end">
              <CCol>
                <h3>Tạo mới thiết bị</h3>
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <CTabs variant="pills" :active-tab="active_tab">
              <CTab title="Thông tin cơ bản">
                <CCard>
                  <CCardBody>
                    <CForm>
                      <CSelect
                        label="Loại thiết bị"
                        :options="type_options"
                        :value="current_type"
                        @update:value="type_selected"
                      >
                        <CPagination :activePage.sync="type_pagination.current_page" :pages="type_pagination.pages"/>
                      </CSelect>
                      <CInput label="Tên" v-model="rule.attributes.name" />
                      <CInput label="Định danh sự kiện" v-model="rule.attributes.event_id" />
                      <CTextarea
                        label="Mô tả"
                        v-model="rule.attributes.description"
                      />
                      <CTextarea
                        label="Điều kiện kích hoạt"
                        v-model="rule.attributes.condition"
                      />
                      <CBadge color="info">
                        Lưu ý: Có thể truy cập trực tiếp vào dữ liệu sự kiên hoặc metadata thông qua các biến event hoặc metadata
                      </CBadge>
                    </CForm>
                  </CCardBody>
                </CCard>
              </CTab>
            </CTabs>
          </CCardBody>
          <CCardFooter>
            <CRow align-horizontal="around">
              <CButton color="success" variant="outline" square @click="create">
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
import vueJsonEditor from "vue-json-editor";
import { mapState } from "vuex";

export default {
  data() {
    return {
      active_tab: 0,
      rule: {
        attributes: {
          name: "",
          description: "",
          event_id: "",
          condition: ""
        },
      },
    };
  },
  components: {
    vueJsonEditor,
  },
  computed: {
    ...mapState({
      current_type: (state) => state.ruleModule.current_type,
      type_options: (state) => {
        return state.deviceTypeModule.device_types.map(function (device_type) {
          return {
            value: device_type.attributes.name,
            label: device_type.attributes.name,
          };
        });
      },
      type_pagination: (state) => state.deviceTypeModule.pagination,
      device_types: (state) => state.deviceTypeModule.device_types,
    }),
  },
  methods: {
    create() {
      this.$store.dispatch('ruleModule/create', this.rule.attributes)
    },
    type_selected(value) {
      this.$store.dispatch("ruleModule/set_type", value);
      this.$store.dispatch("ruleModule/index");
    },
  },
  async created() {
    await this.$store.dispatch("deviceTypeModule/index")
    if (this.current_type === "") {
      this.$store.dispatch(
        "ruleModule/set_type",
        this.device_types[0].attributes.name
      );
    }
  },
};
</script>