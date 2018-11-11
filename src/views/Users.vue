<template>
  <div class="users">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- .native修饰符的作用：让封装的组件也能够绑定原生的事件 -->
    <el-input placeholder="请输入内容" v-model="searchVal" class="search-input" @keydown.native.enter="searchUser">
      <!-- 给搜索按钮添加点击事件。 -->
      <el-button slot="append" icon="el-icon-search" @click="searchUser"></el-button>
    </el-input>

    <el-button type="primary" plain @click="addDialogFormVisible = true">添加用户</el-button>

    <!-- 表格 -->
    <!-- v-loading加载动画效果 -->
    <el-table
      v-loading="loading"
      class="mt-15"
      :data="userList"
      border
      style="width: 100%">
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        prop="username"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="电话">
      </el-table-column>
      <el-table-column
        prop=""
        label="状态">
        <template slot-scope="scope">
          <!-- 此处的v-model应该是scope.row.mg_state -->
          <el-switch
            @change="toggleState(scope.row)"
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        prop=""
        label="操作">
        <!-- 通过scope.row可以取到表格那一行对象里面的属性 -->
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" circle @click="handleEditUser(scope.row)"></el-button>
          <!-- scope.row.id可以将你点击的那个用户的id取到，传递给函数发请求 -->
          <el-button type="danger" icon="el-icon-delete" circle @click="handleDelUser(scope.row.id)"></el-button>
          <el-button type="success" icon="el-icon-check" circle></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      class="page mt-15"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="1"
      :page-sizes="[1, 2, 3, 4]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalNum">
    </el-pagination>

    <!-- 添加用户对话框 -->
    <el-dialog title="添加用户" :visible.sync="addDialogFormVisible">
      <el-form :model="addForm" ref="addFormRef" :rules="myrules">
        <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitAdd('addFormRef')">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑用户对话框 -->
    <el-dialog title="编辑用户" :visible.sync="editDialogFormVisible">
      <el-form :model="editForm" ref="editFormRef" :rules="myrules">
        <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
          <el-input v-model="editForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth" prop="mobile">
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitEdit('editFormRef')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
// 引入接口
import {getUserList, addUser, delUser, editUser, changeState} from '@/api'
// 导出
export default {
  data () {
    // 定义自定义校验规则所需的函数
    let checkEmail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入邮箱'))
      } else {
        // 校验邮箱规则，下面那句可以解除eslint警告
        // eslint-disable-next-line
        let emailReg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
        if (emailReg.test(value)) {
          callback()
        } else {
          callback(new Error('请输入正确的邮箱格式'))
        }
      }
    }
    return {
      searchVal: '', // 搜索框的值
      userList: [], // 定义一个空的用户数据数组
      totalNum: 0, // 用户总条数
      pagesize: 3, // 每页显示的条数，默认是3条
      pagenum: 1, // 当前页码，默认是第一页
      addDialogFormVisible: false, // 添加用户对话框的显示与隐藏
      formLabelWidth: '80px', // 设置input左侧的文字的宽度
      // 添加用户表单的数据
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      editDialogFormVisible: false, // 编辑对话框的显示与隐藏
      // 编辑用户表单的数据
      editForm: {
        id: -1,
        username: '',
        email: '',
        mobile: ''
      },
      // 表单数据校验规则
      myrules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        email: [
          // 自定义校验邮箱规则
          { required: true, validator: checkEmail, trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入电话', trigger: 'blur' }
        ]
      },
      // 显示加载动画效果
      loading: true
    }
  },
  // 页面元素创建时的函数，初始化
  created () {
    // 调用初始化table的方法
    this.initTable()
  },

  // 方法集合
  methods: {
    // 初始化table数据的方法
    initTable () {
      // 调用用户数据列表接口
      getUserList({query: this.searchVal, pagenum: this.pagenum, pagesize: this.pagesize})
        .then(res => {
          // 给用户总条数赋值
          this.totalNum = res.data.total
          // 给用户数据空数组赋值
          this.userList = res.data.users
          // 数据加载完，加载动画效果消失
          this.loading = false
        })
    },

    // 搜索用户的方法
    searchUser () {
      // 直接调用初始话方法，因为获取用户数据里的规则直接传值了
      this.initTable()
      // 清空搜索框
      this.searchVal = ''
    },

    // 处理一页显示多少条的方法
    handleSizeChange (val) {
      // console.log(`每页${val}条`)
      // 改变每页多少条的时候，将这个值赋值给pagesize属性，接着再调用获取数据的方法
      this.pagesize = val
      this.initTable()
    },

    // 处理多少页的方法
    handleCurrentChange (val) {
      // console.log(`当前页:${val}`)
      this.pagenum = val
      this.initTable()
    },

    // 提交添加用户的方法
    submitAdd (formRef) {
      this.$refs[formRef].validate((isPass) => {
        if (isPass) {
          // 调用添加用户的接口
          addUser(this.addForm)
            .then(res => {
              if (res.meta.status === 201) {
                this.$message.success('添加用户成功')
                this.addDialogFormVisible = false
                // 清空表单
                this.addForm.username = ''
                this.addForm.password = ''
                this.addForm.eamil = ''
                this.addForm.mobile = ''
                // 刷新表格数据
                this.initTable()
              }
            })
        } else {
          this.$message.warning('请正确填写表单')
        }
      })
    },

    // 删除用户的方法
    handleDelUser (id) {
      // 让提示框显示
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        concelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 点击确定执行的回调函数，调用删除用户数据的接口
        delUser(id)
          .then(res => {
            if (res.meta.status === 200) {
              this.initTable()
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
            } else {
              this.$message.error(res.meta.msg)
            }
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },

    // 编辑用户对话框渲染的方法
    handleEditUser (row) {
      this.editForm.id = row.id
      this.editForm.username = row.username
      this.editForm.email = row.email
      this.editForm.mobile = row.mobile
      // 编辑对话框显示
      this.editDialogFormVisible = true
    },

    // 提交编辑的方法
    submitEdit (formRef) {
      this.$refs[formRef].validate((isPass) => {
        if (isPass) {
          // 调用编辑用户数据的接口
          editUser(this.editForm)
            .then(res => {
              if (res.meta.status === 200) {
                this.$message.success('编辑用户成功')
                this.editDialogFormVisible = false
                // 清空表单
                this.editForm.username = ''
                this.editForm.password = ''
                this.editForm.eamil = ''
                this.editForm.mobile = ''
                // 刷新表格数据
                this.initTable()
              }
            })
        } else {
          this.$message.warning('请正确填写表单')
        }
      })
    },

    // 切换用户状态的方法
    toggleState (row) {
      // 调用切换用户状态接口
      changeState(row.id, row.mg_state)
        .then(res => {
          this.$message.success(res.meta.msg)
        })
    }
  }
}
</script>
<style>
  .search-input {
    width: 300px;
  }
</style>
