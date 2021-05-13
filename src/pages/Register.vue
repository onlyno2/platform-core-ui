<template>
  <div class="d-flex align-items-center min-vh-100">
    <CContainer fluid>
      <CRow class="justify-content-center">
        <CCol md="6">
          <CCard class="mx-4 mb-0">
            <CCardBody class="p-4">
              <CForm>
                <h1>Tạo tài khoản</h1>
                <CInput
                  placeholder="Email"
                  autocomplete="email"
                  prepend="@"
                  v-model="user.email"
                  invalid-feedback="Email không được bỏ trống"
                  :is-valid="email_validator"
                >
                  <template #prepend-content><CIcon name="cil-user"/></template>
                </CInput>
                <CInput
                  placeholder="Mật khẩu"
                  type="password"
                  autocomplete="new-password"
                  v-model="user.password"
                >
                  <template #prepend-content><CIcon name="cil-lock-locked"/></template>
                </CInput>
                <CInput
                  placeholder="Nhắc lại mật khẩu"
                  type="password"
                  autocomplete="new-password"
                  class="mb-4"
                  v-model="user.password_confirmation"
                  invalid-feedback="Mật khẩu xác nhận không khớp"
                  valid-feedback=""
                  :is-valid="password_confirm_validator"
                >
                  <template #prepend-content><CIcon name="cil-lock-locked"/></template>
                </CInput>
                <CButton color="success" block @click="signup">Đăng ký</CButton>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
import { AuthService } from '../services/auth.service'

export default {
  name: 'Register',
  data: () => {
    return {
      user: {
        email: '',
        password: '',
        password_confirmation: ''
      }
    }
  },
  methods: {
    email_validator() {
      return this.user.email !== ''
    },
    password_confirm_validator() {
      return this.user.password !== '' && this.user.password === this.user.password_confirmation
    },
    signup() {
      AuthService.signup(this.user)
    }
  }
}
</script>
