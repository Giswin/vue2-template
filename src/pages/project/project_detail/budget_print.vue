<template>
    <div class="budget-wrap">
        <div class="budget-main">
            <div class="print-head">
                <div class="name">项目预算表</div>
            </div>

            <div class="basic-info">
                <table width="100%" cellspacing="0" cellpadding="0" border="0" class="table-form">
                    <tr>
                        <th width="70">项目编号</th>
                        <td width="110">{{}}</td>
                        <th width="70">版本</th>
                        <td width="80">{{}}</td>
                        <th width="70">业务类型</th>
                        <td width="100">{{}}</td>
                        <th width="70">业务员</th>
                        <td width="90">{{}}</td>
                        <th width="70">业务组</th>
                        <td width="70">{{}}</td>
                        <th width="70">创建日期</th>
                        <td width="90">{{}}</td>
                    </tr>
                    <tr>
                        <th>制单人</th>
                        <td>{{}}</td>
                        <th>订单号</th>
                        <td>{{}}</td>
                        <th>订单数量</th>
                        <td>{{}}</td>
                        <th>订单日期</th>
                        <td>{{}}</td>
                        <th>客户</th>
                        <td colspan="3">{{}}</td>

                    </tr>
                    <tr>
                        <th>结算方式</th>
                        <td>{{}}</td>
                        <th>天数</th>
                        <td>{{}}</td>
                        <th>价格条款</th>
                        <td>{{}}</td>
                        <th>交货日期</th>
                        <td>{{}}</td>
                        <th>出运方式</th>
                        <td>{{}}</td>
                        <th>信保余额</th>
                        <td>{{}}</td>
                    </tr>
                    <tr>
                        <th>备注</th>
                        <td colspan="11"></td>
                    </tr>
                </table>
            </div>

            <div style="margin-top: 10px;">
                <div>
                    <sy-row style="padding-top:5px;">
                        <div class="ic-title" style="border-bottom: 1px solid #000;">
                            <b>测算信息</b>
                        </div>
                    </sy-row>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
table.table-form {
    border: 1px solid #000;
    border-collapse: collapse;
}
table.table-form tr th {
    border: 1px solid #000;
    background: #f6f6f6;
    padding: 3px;
    font-weight: normal;
}
table.table-form tr td {
    border: 1px solid #000;
    padding: 3px;
}
.budget-wrap {
    .budget-main {
        width: 1040px;
        margin: auto;
        background: #fff;
        padding: 20px;
        border: 1px solid #000;
        margin-top: 10px;
        color: #000;
        .basic-info {
            margin-top: 10px;
        }
    }

    .print-head {
        position: relative;
        .name {
            font-size: 20px;
            text-align: center;
            font-weight: bold;
            line-height: 43px;
        }
        .logo {
            position: absolute;
            top: 0px;
            left: 0px;
            img {
                height: 20px;
                image-rendering: -moz-crisp-edges;
                image-rendering: -o-crisp-edges;
                image-rendering: -webkit-optimize-contrast;
                image-rendering: crisp-edges;
                -ms-interpolation-mode: nearest-neighbor;
            }
        }
    }
}
</style>