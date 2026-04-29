<template>
  <div id="userManagePage">
    <a-input-search
      style="max-width: 400px; margin-bottom: 20px"
      v-model:value="searchValue"
      placeholder="请输入用户名搜索"
      enter-button="搜索"
      size="large"
      @search="onSearch"
    />

    <a-table
      :columns="columns"
      :data-source="data"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'avatarUrl'">
          <a-image
            :src="record.avatarUrl"
            :width="120"
          />
        </template>

        <template v-else-if="column.dataIndex === 'userRole'">
          <div v-if="record.userRole === 1">
            <a-tag color="green">管理员</a-tag>
          </div>
          <div v-else>
            <a-tag color="blue">普通用户</a-tag>
          </div>
        </template>

        <template v-else-if="column.dataIndex === 'createTime'">
          {{ dayjs(record.createTime).format('YYYY-MM-DD HH:mm:ss') }}
        </template>

        <template v-else-if="column.key === 'action'">
          <a-button danger>删除</a-button>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { searchUsers } from '@/api/user'
import { message } from 'ant-design-vue'
import dayjs from 'dayjs'

const searchValue = ref('')

const onSearch = () => {
  fetchData(searchValue.value)
}

const columns = [
  {
    title: 'id',
    dataIndex: 'id',
  },
  {
    title: '用户名',
    dataIndex: 'username',
  },
  {
    title: '账号',
    dataIndex: 'userAccount',
  },
  {
    title: '头像',
    dataIndex: 'avatarUrl',
  },
  {
    title: '性别',
    dataIndex: 'gender',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
  },
  {
    title: '用户角色',
    dataIndex: 'userRole',
  },
  {
    title: '操作',
    key: 'action',
  },
]

const data = ref([])
// 获取用户列表数据
const fetchData = async (username = '') => {
  const res = await searchUsers(username)
  if (res.data.data) {
    data.value = res.data.data || []
  } else {
    message.error('获取用户列表失败！')
  }
}

fetchData()
</script>
