<template>
  <div>
    <CDataTable :items="device_types" pagination>
    </CDataTable>
    <CPagination :activePage.sync="paginate.current_page" :pages="paginate.pages"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'DeviceTypeList',
  components: {
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      device_types: state => state.deviceTypeModule.device_types,
      paginate: state => state.deviceTypeModule.pagination
    })
  },
  methods: {
  },
  beforeMount() {
    this.$store.dispatch('deviceTypeModule/get_list')
  }
}
</script>
