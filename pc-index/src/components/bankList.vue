<template>
 <div class="pagecontaner">
   

    

   



    
  </div>
</template>

<script>
import {
  getBankList,
  addAccessRecord,
  verifyMobile,
  saveUserInfo
} from "@/api/api.js";
export default {
  name: "bankList",
  components: {},
  data() {
    return {
      bankList: [],
      dialogVisible: false,
      ruleForm: {
        company: "",
        userName: "",
        mobile: "",
        verifyCode: ""
      },
      msg: "获取验证码",
      count: 0,
      timer: null,
      activeBankCode: null,
      rules: {
        company: [{ required: true, message: "必填", trigger: "blur" }],
        userName: [{ required: true, message: "必填", trigger: "blur" }],
        mobile: [
          { required: true, message: "必填", trigger: "blur" },
          {
            pattern: /^[1][3,4,5,7,8,9][0-9]{9}$/,
            message: "请检查手机格式！",
            trigger: "blur"
          }
        ],

        verifyCode: [{ required: true, message: "必填", trigger: "blur" }]
      },
      detailVisible:false,
      bankName:'',
      producName:null,
      detailInfoList:[]
    };
  },
  mounted() {
    this.getBankList();
  },
  methods: {
    getBankList() {
      getBankList().then(res => {
        this.bankList = res;
        this.bankList = [
          { id: 1, bankName: "", bankCode: "js" },
          { id: 1, bankName: "", bankCode: "js" },
          { id: 1, bankName: "", bankCode: "js" }
        ];
      });
    },
    addVisite(bankCode) {
      if (!window.localStorage) {
        console.error("浏览器不支持localStorage");
        return false;
      }
      var loginToken = localStorage.getItem("loginToken");
      if (loginToken) {
        addAccessRecord({ loginToken, bankCode }).then(res => {
          // 添加访问记录后访问详情
          this.$router.push('/pruduct/info');
        });
      } else {
        // 录入信息
        this.activeBankCode = bankCode;
        this.ruleForm = this.initRuleForm();
        this.dialogVisible = true;
      }
    },
    initRuleForm() {
      return {
        company: "",
        userName: "",
        mobile: "",
        verifyCode: ""
      };
    },
    verifyMobile() {
      if (this.$refs.ruleForm.validateField("mobile")) {
        verifyMobile({ mobile: this.ruleForm.mobile }).then(res => {
          this.$message.success("发送成功，请查看手机短信！");
          this.countTime();
        });
      }
    },
    countTime() {
      const TIME_COUNT = 5;
      if (!this.timer) {
        this.count = TIME_COUNT;
        // this.show = false;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--;
            this.msg = `剩余${this.count}秒`;
          } else {
            // this.show = true;
            clearInterval(this.timer);
            this.$router.push('/pruduct/info');
            this.timer = null;
            this.msg = "获取验证码";
          }
        }, 1000);
      }
    },
    saveUserInfo() {
        // 提交信息 并生成访问记录 返回登录token存储到本地
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          let { company, userName, mobile, verifyCode } = this.ruleForm;
          saveUserInfo({
            company,
            userName,
            mobile,
            verifyCode,
            bankCode: this.activeBankCode
          }).then(res => {
            this.$message.success("提交成功！");
            localStorage.setItem("loginToken", );
            this.dialogVisible = false;
          });
        } else {
          return false;
        }
      });
    }
  }
};
</script>
<style scoped>
/* .pagecontaner {
  display: flex;

  .cont-warp {
    width: 20%;
    max-width: 400px;
    position: relative;
    color: #fff;
    .main-title {
    }
    .sub-title {
    }
    .img-wrap {
    }
  }
  .inputappend {
  }
} */
</style>