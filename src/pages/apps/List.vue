<template>
  <div>
    <CCard>
      <CCardHeader>
        <CRow align-horizontal="end">
          <CCol md="6">
            <h3>Danh sách ứng dụng</h3>
          </CCol>
          <CCol md="6" class="text-right">
            <CButton
              color="success"
              variant="outline"
              square
              md
              @click="create(item)"
            >
              <CIcon class="create-btn-icon" name="cil-plus" /> Tạo mới
            </CButton>
          </CCol>
        </CRow>
      </CCardHeader>
      <CCardBody>
        <CDataTable :items="apps" :fields="fields" hover border>
          <template #id="{item}">
            <td @click="show(item)">
              {{ item.attributes.slug }}
            </td>
          </template>
          <template #name="{item}">
            <td @click="show(item)">
              {{ item.attributes.name }}
            </td>
          </template>
          <template #description="{item}">
            <td>
              {{ item.attributes.description }}
            </td>
          </template>
          <template #actions="{item}">
            <td class="py-2">
              <CButtonGroup>
                <CButton
                  color="info"
                  variant="outline"
                  square
                  size="sm"
                  @click="update(item)"
                >
                  Sửa
                </CButton>
                <CButton
                  color="danger"
                  variant="outline"
                  square
                  size="sm"
                  @click="destroy(item)"
                >
                  Xóa
                </CButton>
              </CButtonGroup>
            </td>
          </template>
        </CDataTable>
      </CCardBody>
    </CCard>
    <CPagination :activePage.sync="paginate.current_page" :pages="paginate.pages"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  components: {
  },
  data () {
    return {
      fields: [
        {
          key: 'name',
          label: 'Tên'
        },
        {
          key: 'description',
          label: 'Mô tả'
        },
        {
          key: 'actions',
          label: '',
          _style: 'width:1%'
        }
      ]
    }
  },
  watch: {
    'paginate.current_page': function(newPage) {
      if (newPage <= this.paginate.pages)
        this.$store.dispatch('deviceModule/index', newPage)
    }
  },
  computed: {
    ...mapState({
      apps: state => state.appModule.apps,
      paginate: state => state.appModule.pagination
    })
  },
  methods: {
    show(item) {
      this.$router.push(`apps/${item.attributes.slug}/show`)
    },
    create() {
      this.$router.push(`apps/create`)
    },
    update(item) {
      this.$router.push(`apps/${item.attributes.slug}/edit`)
    },
    destroy(item) {
      this.$store.dispatch('appModule/destroy', item.attributes.slug)
    }
  },
  async created() {
    this.$store.dispatch('appModule/index')
  }
}
</script>
