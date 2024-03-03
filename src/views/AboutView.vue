<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>

  <div>
    <el-button @click="showMessage" > Click me</el-button>
  </div>
</template>


<script setup>
import { ElMessage } from 'element-plus';



  function showMessage() {
      ElMessage('Hello, Element Plus!')
    }

</script>