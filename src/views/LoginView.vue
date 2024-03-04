<template>
  <div class="login-container">
    <h1>登录</h1>
    <div class="panel-wrapper">
      <el-card class="panel">
        <el-form class="login-panel">
          <el-form-item label="Username" size="large">
            <el-input v-model="username" placeholder="Username" />
          </el-form-item>
          <el-form-item label="Password" size="large">
            <el-input v-model="password" placeholder="Password" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="login">登录</el-button>
            <el-button type="info">重置</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus';

function login() {
  ElMessage("Hello, Element Plus!");
}
</script>

<style lang="scss" scoped>
</style>
