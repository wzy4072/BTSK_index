<template>
  <el-container>
    <el-header class="header-wrap">
      <div class="main-header">
        <div class="logo-wrap">
          <img src="../assets/logo.png" alt="" />
          <div class="logotitle">拜特产融平台</div>
        </div>
        <div class="logotitle">在线融资申请</div>
      </div>
    </el-header>
    <el-main>
      <div class="pagecontaner">
        <div
          v-for="bank in bankList"
          :key="'key' + bank.id"
          class="cont-warp"
          :style="{ backgroundColor: bank.bgColor || '#2C5AA8' }"
          @click="addVisite(bank.bankCode)"
        >
          <div class="main-title">{{ bank.bankName }}xxx银行</div>
          <div class="sub-title">{{ bank.subTitle }}3分钟到账</div>
          <div class="img-wrap">
            <img :src="imgModule[bank.bankCode]" />
          </div>
        </div>

        <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="公司名称" prop="company">
              <el-input v-model="ruleForm.company"></el-input>
            </el-form-item>

            <el-form-item label="联系人" prop="userName">
              <el-input v-model="ruleForm.userName"></el-input>
            </el-form-item>

            <el-form-item label="联系电话" prop="mobile">
              <el-input v-model="ruleForm.mobile"></el-input>
            </el-form-item>

            <el-form-item label="验证码" prop="verifyCode">
              <el-input v-model="ruleForm.verifyCode">
                <template slot="append">
                  <span class="inputappend" @click.stop="verifyMobile">{{
                    msg
                  }}</span>
                </template>
              </el-input>
            </el-form-item>
          </el-form>

          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveUserInfo">提交资料</el-button>
          </span>
        </el-dialog>

        <el-dialog
          :title="producName|| 'XXX银行现金宝某某'"
          :visible.sync="detailVisible"
          width="50%"
        >
          <el-row>
            <el-col :span="16">
              <div v-for="info in detailInfoList" :key="info.id">
                <div class="li-title">{{ info.title }}</div>
                <div class="li-content" v-html="info.desc"></div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="ermwrap">
                <img
                  src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1592828649934&di=a76d1d2834dcea78b0d44d3f4538468c&imgtype=0&src=http%3A%2F%2Fefile.kaoyan.com%2Fimg%2F2020%2F05%2F25%2F193612_5ecbadac69b24.png"
                  alt=""
                />
              </div>
              <div class="ermtit">
                进件二维码
              </div>
            </el-col>
          </el-row>
        </el-dialog>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import Vue from 'vue'
import { Dialog } from 'element-ui'
import { getToken, setToken } from '@/api/auth'
import {
  getBankList,
  addAccessRecord,
  verifyMobile,
  saveUserInfo,
} from '@/api/api.js'
Vue.component(Dialog.name, Dialog)
export default {
  name: 'bankList',
  components: {},
  data() {
    return {
      imgModule: {
        gsyh: require('../assets/gsyh.png'),
        nyyh: require('../assets/nyyh.png'),
        gfyh: require('../assets/gfyh.png'),
        xyyh: require('../assets/xyyh.png'),
        cayh: require('../assets/cayh.png'),
        jsyh: require('../assets/jsyh.png'),
      },
      bankList: [
        { id: 1, bankName: '工商银行', bankCode: 'gsyh', bgColor: '' },
        { id: 2, bankName: '农业银行', bankCode: 'nyyh', bgColor: '#31856E' },
        { id: 3, bankName: '广发银行', bankCode: 'gfyh', bgColor: '#EA5505' },
        { id: 5, bankName: '兴业银行', bankCode: 'xyyh', bgColor: '' },
        { id: 4, bankName: '长安银行', bankCode: 'cayh', bgColor: '' },
        { id: 6, bankName: '建设银行', bankCode: 'jsyh', bgColor: '' },
      ],
      dialogVisible: false,
      ruleForm: {
        company: '',
        userName: '',
        mobile: '',
        verifyCode: '',
      },
      msg: '获取验证码',
      count: 0,
      timer: null,
      activeBankCode: null,
      rules: {
        company: [{ required: true, message: '必填', trigger: 'blur' }],
        userName: [{ required: true, message: '必填', trigger: 'blur' }],
        mobile: [
          { required: true, message: '必填', trigger: 'blur' },
          {
            pattern: /^[1][3,4,5,7,8,9][0-9]{9}$/,
            message: '请检查手机格式！',
            trigger: 'blur',
          },
        ],

        verifyCode: [{ required: true, message: '必填', trigger: 'blur' }],
      },
      detailVisible: false,
      bankName: '',
      producName: null,
      detailInfoList: [],
    }
  },
  mounted() {
    // this.getBankList()
  },
  methods: {
    getBankList() {
      getBankList().then((res) => {
        this.bankList = res
      })
    },
    addVisite(row) {
      this.producName = row.producName
      var loginToken = getToken()
      loginToken = true
      if (loginToken) {
        this.detailVisible = true
        this.detailInfoList = [
          {
            id: 1,
            title: '产品介绍',
            desc:
              '<p>AAA:1231654654656&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; BBB:sdfslkdfjsk</p> <p>AAA:1231654654656&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; BBB:sdfslkdfjsk</p> <p>AAA:1231654654656&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; BBB:sdfslkdfjsk</p> <p>AAA:1231654654656&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; VVV:sasdfasdfasdfasdfasdfasdfadf</p> <p>&nbsp;</p>',
          },
          {
            id: 2,
            title: '申请资格',
            desc:
              '<p>AAA:1231654654656&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; BBB:sdfslkdfjsk</p> <p>AAA:1231654654656&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; BBB:sdfslkdfjsk</p> <p>AAA:1231654654656&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; BBB:sdfslkdfjsk</p> <p>AAA:1231654654656&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; VVV:sasdfasdfasdfasdfasdfasdfadf</p> <p>&nbsp;</p>',
          },
          {
            id: 3,
            title: '审核流程',
            desc:
              '<p>AAA:1231654654656&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; BBB:sdfslkdfjsk</p> <p>AAA:1231654654656&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; BBB:sdfslkdfjsk</p> <p>AAA:1231654654656&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; BBB:sdfslkdfjsk</p> <p>AAA:1231654654656&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; VVV:sasdfasdfasdfasdfasdfasdfadf</p> <p>&nbsp;</p>',
          },
        ]

        addAccessRecord({ loginToken, bankCode: row.bankCode }).then((res) => {
          // 添加访问记录后访问详情
          res
          this.detailVisible = true
        })
      } else {
        // 录入信息
        this.activeBankCode = row.bankCode
        this.ruleForm = this.initRuleForm()
        this.dialogVisible = true
      }
    },
    initRuleForm() {
      return {
        company: '',
        userName: '',
        mobile: '18866669898',
        verifyCode: '',
      }
    },
    verifyMobile() {
      if (this.$refs.ruleForm.validateField('mobile')) {
        verifyMobile({ mobile: this.ruleForm.mobile }).then((res) => {
          res
          this.$message.success('发送成功，请查看手机短信！')
          this.countTime()
        })
      }
      this.countTime()
    },
    countTime() {
      const TIME_COUNT = 5
      if (!this.timer) {
        this.count = TIME_COUNT
        // this.show = false;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--
            this.msg = `剩余${this.count}秒`
          } else {
            // this.show = true;
            clearInterval(this.timer)
            this.timer = null
            this.msg = '获取验证码'
          }
        }, 1000)
      }
    },
    saveUserInfo() {
      // 提交信息 并生成token
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          let { company, userName, mobile, verifyCode } = this.ruleForm
          saveUserInfo({
            company,
            userName,
            mobile,
            verifyCode,
            bankCode: this.activeBankCode,
          }).then((res) => {
            this.$message.success('提交成功！')
            setToken(res)
            this.dialogVisible = false
            this.addVisite(this.activeBankCode)
          })
        } else {
          return false
        }
      })
    },
  },
}
</script>

<style lang="scss">
.header-wrap {
  background: #000;
  .main-header {
    width: 100%;
    max-width: 1280px;
    display: flex;
    margin: 0 auto;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    img {
      height: 26px;
      display: inline-block;
      margin-top: 14px;
      vertical-align: bottom;
    }
    .logotitle {
      font-size: 20px;
      font-weight: 600;
      margin-top: 16px;
      display: inline-block;
      margin-left: 8px;
    }
  }
}
.pagecontaner {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  background: #fff;
  padding: 24px;
  .cont-warp {
    width: 340px;
    position: relative;
    color: #fff;
    padding: 32px;
    margin-bottom: 32px;
    cursor: pointer;

    .main-title {
      font-size: 20px;
      margin-bottom: 8px;
      margin-top: 6px;
      opacity: 0.8;
    }
    .sub-title {
      font-size: 14px;
      margin-bottom: 14px;
      opacity: 0.8;
    }
    .img-wrap {
      position: absolute;
      right: 52px;
      top: 28px;
      width: 80px;
      height: 80px;
      overflow: hidden;
      img {
        width: 100%;
      }
    }
  }
  span.inputappend {
    cursor: pointer;
  }
}
.ermwrap {
  img {
    width: 100%;
    max-width: 200px;
    display: block;
    margin: 0 auto;
    margin-top: 32px;
  }
}
.ermtit {
  text-align: center;
  margin-top: 8px;
}
</style>
