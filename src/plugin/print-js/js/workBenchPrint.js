const printCss = `
@page {
 
  margin: 5mm;
}
.main {
    display: flex;
    justify-content: space-between;
    margin: 30px 0px;
  }
  .main .JnlNo div,.main .DealName div,.main .DealTime div,.main .DealState div{
    margin-bottom: 10px;
  }
  
  .table-yhh table {
    -webkit-print-color-adjust:exact;
    -moz-print-color-adjust:exact;
    -ms-print-color-adjust:exact;
    print-color-adjust:exact;
    font-size: 13px;
    width: 100%;
    border-collapse: collapse;
    border: 1px solid rgb(211, 211, 211);
  }
  
  .table-yhh table tr {
    text-align: left;
    page-break-inside: avoid;
  }
  
  .table-yhh table tr td {
    padding: 12px;
    border: 1px solid rgb(211, 211, 211);
  }
  
  .table-yhh table tr td:nth-child(2n-1) {
    width: 14%;
    background: rgb(249, 249, 249);
  }
  
  .table-yhh table tr td:nth-child(2n) {
    width: 36%;
  }
  
  .table-yhh th {
    background-image: url('/image/Seal.png');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }
  
  .detail-list-yhh {
    width: 100%;
  }
  
  .detail-list-yhh .el-table__header-wrapper {
    text-align: center;
  }
  .detail-list-yhh .el-table__body-wrapper {
   
    text-align: center;
  }
  .detail-list-yhh thead tr th {
    height: 44px;
    line-height: 44px;
    background: rgb(244, 246, 245);
    border-radius: 4px;
    color: rgba(0, 0, 0, 1);
    font-size: 13px;
    
  }
  
  .detail-list-yhh tbody tr th {
    height: 44px;
    line-height: 44px;
    text-align: center;
    background: rgb(244, 246, 245);
    border-radius: 4px;
    color: rgba(0, 0, 0, 1);
    font-size: 13px;
   
  }
 
  .detail-list-yhh tbody tr {
    page-break-inside: avoid;
  }
  .detail-list-yhh tbody tr td {
    padding: 0px;
    height: 44px;
    line-height: 44px;
    color: rgba(51, 51, 51, 1);
    font-size: 13px;
    border: 1px solid rgb(211, 211, 211);
  } 
   .detail-list-yhh .el-table .el-table__body-wrapper .el-table__body tbody tr td .cell{
    white-space:normal;
  word-wrap:break-word;
  }


  


.contextPositionBox {
  width: 100%;}

.contextPositionBox  table{
  width: 100%;

  border-bottom: none;
  font-size: 14px;
  border-collapse: collapse;
}


.contextPositionBox th {
  background: #ffffff;
  text-align: left;
  height: 44px;
  font-size: 14px;
  font-weight: 900 !important;
  letter-spacing: 1px;
  border-bottom: 1px solid #dddddd;
  
}

.contextPositionBox table th p   {
  display: block;
                width: 3px;
                height: 16px;
                background: #00b672;
                float: left;
}
.contextPositionBox table th p  span {
  color: #333333;
  padding-left: 5px;
  height: 16px;
  line-height: 16px;
  display: block;
  float: left;
}
.contextPositionBox td {
  border: 1px solid #dddddd;
}
.contextPositionBox .zzw-title {
    text-align: left;
    padding-left: 16px;
    height: 40px;
    line-height: 40px;
    background: #f9f9f9;
    color: #666666;
}
.contextPositionBox .zzw-content {
   
    text-align: left;
    color: #333333;
    padding-left: 10px !important;
    height: 40px;
    line-height: 40px;
}



  .business-details .userInfoList-as {
    display:flex;
    justify-content: space-between;
    margin-bottom: 16px;
  
  }

  .business-details .userInfoList-as li {
    list-style:none;
  }

  .setupsTitle-c-as {
    width: 120px;
    height: 24px;
    margin: 20px 0 20px 0;
    text-align: center;
    line-height: 24px;
    font-size: 14px;
    color: white;
    background-color: #666666;
  }
 
  .table-as {
    width: 95%;
    height: 150px;
    margin-bottom: 10px;
    border: 1px solid black;
    border-radius: 5px;
  }


  .powerDetails-as {
    width: 95%;
    border: 1px solid #eeeeee;
    border-radius: 5px;
    margin: 5px auto;
  }
  .powerDetails-as ul > li {
    width: 45%;
    display: inline-block;
    padding: 10px;
    font-size: 14px;
  }
  .powerDetails-as ul > li:nth-of-type(1),
  .powerDetails-as ul > li:nth-of-type(2) {
    font-size: 14px;
  }
  /* 审核流程 */
  .setupsTitle-c-as {
    display: inline-block;
    width: 80px;
    height: 24px;
    margin: 20px 0 20px 0;
    text-align: center;
    line-height: 24px;
    font-size: 14px;
    color: white;
    background-color: #666666;
  }
 
  .promptMessage-as {
    font-size: 14px;
  }
  
  .el-row {
    width: 150px;
    margin: 20px auto;
  }
  .balance-list{
    text-align: center;
  }
  .shadeLayer-as {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: 999;
  }

  .shadeLayer-as h1 {
    width: 240px;
    margin: 0 auto;
  }
  
  .shadeLayer-as table {
    width: 100%;
    margin: 20px auto;
    border-collapse: collapse;
    font-size: 14px;
  }
  .shadeLayer-as td {
    border: 1px solid black;
    padding: 15px 14px;
    height: 30px;
    text-align: center;
    line-height: 30px;
  }

  .shadeLayer-as .tableTitle-as {
    background-color: #cccccc;
  }
 
  .shadeLayer-as .oneColumn-as {
    width: 210px;
  }
  #printJS-form  td{
    border-right: 1px solid #e7e7e7;
    border-bottom: 1px solid #e7e7e7;
  }
  #printJS-form tr td:first-child {
    border-left: 1px solid #e7e7e7;
}
#printJS-form tr:first-child td {
  border-top: 1px solid #e7e7e7;
}


  .no-print {
    display: none;
  }`
export default printCss
