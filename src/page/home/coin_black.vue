<template>
  <div class="coin-black-wrapper">
    <mu-table
      :fixedHeader="true"
      :selectable="false"
      :showCheckbox="false"
      :height="height">
      <mu-thead slot="header">
        <mu-tr>
          <mu-th>排行</mu-th>
          <mu-th>姓名</mu-th>
          <mu-th style="text-align: center;">本月失去金币</mu-th>
        </mu-tr>
      </mu-thead>
      <mu-tbody>
        <mu-tr
          v-for="item,index in tableData"
          :key="index"
          style="border-bottom: 0;">
          <mu-td>No.{{index + 1}}</mu-td>
          <mu-td>{{item.user_name}}</mu-td>
          <mu-td style="text-align: center;">
            <mu-badge :content="item.opt_num + ''" color="#ff3d00" />
          </mu-td>
        </mu-tr>
      </mu-tbody>
    </mu-table>
  </div>
</template>
<style lang="less">
.coin-black-wrapper {
  height: 100%;
  width: 100%;
  overflow: hidden;
}
</style>
<script>
 import initScroll from '@/mixins/initscroller'
  export default{
    data() {
      return {
        tableData: [],
        height: ''
      }
    },
    mixins: [initScroll],
    mounted() {
      this.height = this.$el.clientHeight - 56 + 'px'
      this.$http.get('/journal_coin_plist?type=1').then((res) => {
        this.tableData = res.resultlist
    }).catch((erro) => {
        console.log(erro)
    })
    }
  }
</script>
