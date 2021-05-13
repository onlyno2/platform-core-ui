<template>
  <div class="c-app flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol md="8">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CForm>
                  <h1>Đăng nhập</h1>
                  <p class="text-muted">Đăng nhập vào tài khoản của bạn</p>
                  <CInput
                    placeholder="Email"
                    autocomplete="Email"
                    v-model="user.email"
                  >
                    <template #prepend-content><CIcon name="cil-user"/></template>
                  </CInput>
                  <CInput
                    placeholder="Mật khẩu"
                    type="password"
                    autocomplete="curent-password"
                    v-model="user.password"
                  >
                    <template #prepend-content><CIcon name="cil-lock-locked"/></template>
                  </CInput>
                  <CRow>
                    <CCol col="6" class="text-left">
                      <CButton color="primary" class="px-4" @click="login">Đăng nhập</CButton>
                    </CCol>
                    <CCol col="6" class="text-right">
                      <CButton color="link" class="px-0">Quên mật khẩu?</CButton>
                      <CButton color="link" class="d-lg-none">Đăng ký ngay</CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
            <CCard
              color="primary"
              text-color="white"
              class="text-center py-5 d-md-down-none"
              body-wrapper
            >
              <CCardBody>
                <h2>Đăng ký</h2>
                <p>Chưa có tài khoản ?</p>
                <CButton
                  color="light"
                  variant="outline"
                  size="lg"
                  @click="register"
                >
                  Đăng ký ngay
                </CButton>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
import { AuthService } from '../services/auth.service'

export default {
  data: () => {
    return {
      user: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    login() {
      AuthService.login(this.user)
    },
    register() {
      this.$router.push('/register')
    }
  }
}
</script>
