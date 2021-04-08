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
                      </CSelect>
                      <CInput label="Tên" v-model="device.attributes.name" />
                      <CTextarea
                        label="Mô tả"
                        v-model="device.attributes.description"
                      />
                    </CForm>
                  </CCardBody>
                </CCard>
              </CTab>
              <CTab title="Metadata">
                <CCard>
                  <CCardBody>
                    <CForm>
                      <vue-json-editor
                        mode="code"
                        v-model="device.attributes.metadata"
                      ></vue-json-editor>
                    </CForm>
                  </CCardBody>
                </CCard>
              </CTab>
              <CTab title="Thông tin thiết bị">
                <CCard>
                  <CCardBody>
                    <CForm>
                      <vue-json-editor
                        mode="code"
                        v-model="device.attributes.device_info"
                      ></vue-json-editor>
                    </CForm>
                  </CCardBody>
                </CCard>
              </CTab>
              <CTab title="Bảo mật">
                <CCard>
                  <CCardBody>
                    <CInput
                      label="Mật khẩu"
                      type="password"
                      v-model="device.attributes.secret_token"
                    />
                  </CCardBody>
                </CCard>
              </CTab>
            </CTabs>
          </CCardBody>
          <CCardFooter>
            <CRow align-horizontal="around">
              <CButton color="success" variant="outline" square @click="create">
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
import vueJsonEditor from "vue-json-editor";
import { mapState } from "vuex";

export default {
  name: "ProjectCreate",
  data() {
    return {
      active_tab: 0,
      device: {
        attributes: {
          name: "",
          description: "",
          metadata: {},
          device_info: {},
          secret_token: null,
        },
      },
    };
  },
  components: {
    vueJsonEditor,
  },
  computed: {
    ...mapState({
      current_type: (state) => state.deviceModule.current_type,
      type_options: (state) => {
        return state.deviceTypeModule.device_types.map(function (device_type) {
          return {
            value: device_type.attributes.name,
            label: device_type.attributes.name,
          };
        });
      },
      device_types: (state) => state.deviceTypeModule.device_types,
    }),
  },
  methods: {
    create() {
      this.$store.dispatch('deviceModule/create', this.device.attributes)
    },
    type_selected(value) {
      this.$store.dispatch("deviceModule/set_type", value);
      this.$store.dispatch("deviceModule/index");
    },
  },
  beforeMount() {
    this.$store.dispatch("deviceTypeModule/index")
    if (this.current_type === "") {
      this.$store.dispatch(
        "deviceModule/set_type",
        this.device_types[0].attributes.name
      );
    }
  },
};
</script>