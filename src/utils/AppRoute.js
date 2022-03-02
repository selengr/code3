// // customGridDataModel = {
// //   parameterMode: "1",
// //   parameterValueList: [""],
// //   socialGroupId: "2",
// // }
// import React, { Component, useState, useEffect } from 'react'
// import paginationFactory from 'react-bootstrap-table2-paginator'
// import BootstrapTable from 'react-bootstrap-table-next'
// import ToolkitProvider from 'react-bootstrap-table2-toolkit'
// import "../.././assets/CSS/component/ResponsiveView.css"
// import smartPhone from "../../assets/images/svg/newDesingin/smart-phone-half-block.svg"
// import Ellipse1 from "../../assets/images/svg/newDesingin/Ellipse 66.svg"
// import Ellipse2 from "../../assets/images/svg/newDesingin/Ellipse 45.svg"
// import EditSquare from "../../assets/images/svg/newDesingin/Edit Square.svg"
// import Rectangle from "../../assets/images/svg/newDesingin/Rectangle 208.svg"
// // import { TextField } from '@material-ui/core'
// import filterFactory, {
//   textFilter,
//   dateFilter,
//   selectFilter,
//   Comparator,
//   multiSelectFilter
// } from 'react-bootstrap-table2-filter'
// import {
//   RepoVar,
//   UtilCommon,
//   UtilAjax,
//   UtilDateTime,
//   UtilModal,
//   CustomDateTime,
//   CustomComboBox,
//   CustomTable,
//   CustomError,
//   CustomLoader,
//   CustomGrid,
//   CustomLabel
// } from '../ComponentIndex'
// import cellEditFactory, { Type } from 'react-bootstrap-table2-editor'
// import { UtilOAuth } from '../util/UtilOAuth'
// import { Input } from 'reactstrap'

// class CustomGridBootstrap22 extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       colList: [],
//       dataIsLoaded: false,
//       selectRow: false,
//       selected: [],
//       selectRowRadio: false,
//       FullselecteData: [],
//       setComboValue: false,
//       rowkey: '',
//       totalSize: 10,
//       currentPage: 1,
//       total: 0,
//       type: null,
//       restrictionList: null,
//       sortList: null,
//       showExcelButton: true,
//       // rowStyle: false,
//       // rowEvents:false
//       titleGrid: '',
//       perPageSizeKm:
//         this.props.perPageSizeKm == undefined ? 10 : this.props.perPageSizeKm
//     }
//     this.renderData = this.renderData.bind(this)
//     this.handleTableChange = this.handleTableChange.bind(this)
//   }

//   // در این قسمت نوع گرید که تک انتخاب یا چند انتخاب باشد ست می شود
//   static typeEnum = {
//     //گرید بصورت تک انتخابی می شود برای زمانی که کلید های زیر گرید فقط روی سطر کاربرد دارن
//     SINGLESELECT: 'SINGLESELECT',
//     //گرید بصورت چند انتخابی می شود برای زمانی که کلید های زیر گرید روی یک سطر یا بیشتر کاربرد دارن
//     MULTISELECT: 'MULTISELECT'
//   }

//   static SORT_TYPE_ENUM = {
//     desc: 'DSC',
//     asc: 'ASC'
//   }

//   componentDidMount() {

//     let count = 0
//     let newColumns = UtilCommon.copyObject(this.props.columnList)
//     this.props.columnList.forEach(({ dataField }) => {
//       if (dataField !== 'id') ++count
//     })

//     if (newColumns.length === count) newColumns.unshift({
//       dataField: 'id',
//       text: ' ',
//       hidden: true
//     })


//     this.setState(
//       {
//         dataUrl: this.props.dataUrl,
//         columns: this.props.columnList,
//         userData: this.props.userData,
//         selectRow: this.props.selectRow,
//         rowStyle: this.props.rowStyle,
//         selectRowRadio: this.props.selectRowRadio,
//         type: this.props.type,
//         rowEvents: this.props.rowEvents,
//         titleGrid: this.props.titleGrid,
//         showExcelButton: this.props.showExcelButton,
//         buttonPropsInTable: this.props.buttonPropsInTable
//       },
//       function () { }
//     )
//     setTimeout(() => {
//       this.renderData(this.state.currentPage - 1)
//     }, 50)
//     //this.ConvertData();
//   }

//   componentWillReceiveProps(nextProps) {
//     if (
//       nextProps.setComboValue !== undefined &&
//       nextProps.setComboValue === true
//     ) {
//       console.log(`klsjadkjsakd`)
//       setTimeout(() => {
//         this.renderData(this.state.currentPage)
//       }, 50)
//     }
//     if (
//       nextProps.userData !== undefined &&
//       JSON.stringify(nextProps.userData) !== JSON.stringify(this.state.userData)
//     ) {
//       setTimeout(() => {
//         this.renderData(this.state.currentPage)
//       }, 50)
//     }
//     this.setState(
//       {
//         dataUrl: nextProps.dataUrl,
//         columns: nextProps.columnList,
//         userData: nextProps.userData,
//         selectRow: nextProps.selectRow,
//         setComboValue: nextProps.setComboValue,
//         rowkey: nextProps.rowKeys,
//         rowEvents: nextProps.rowEvents,
//         rowStyle: nextProps.rowStyle,
//         selectRowRadio: nextProps.selectRowRadio,
//         showExcelButton: nextProps.showExcelButton
//       },

//       function () { }
//     )
//   }

//   ConvertData(data) {
//     const col = []
//     let objFinal = {}
//     let curep = data.page

//     let flag = 0
//     let newColumns = UtilCommon.copyObject(this.props.columnList)

//     this.props.columnList.forEach(({ dataField }) => {
//       if (dataField !== 'id') ++flag
//     })

//      flag =  newColumns.length === flag

//     data.rows.map((item, index) => {
//       let obj2 = {}
//       obj2['RankKm'] = curep * this.state.perPageSizeKm + (index + 1)
//       objFinal = { ...objFinal, ...obj2 }
//       item.rowCellArray.map((item, index) => {
//         let obj = {}
//         obj[this.state.data.columns[index].name] = item
//         if(flag) obj.id = Math.round(Math.random() * 1000)
//         objFinal = { ...objFinal, ...obj }
//       })
//       col.push(objFinal)
//     })
//     this.setState({ colList: col, dataIsLoaded: true })
//   }

//   renderData(pageDataNo, sortModel, filterModel) {
//     var url = this.state.dataUrl
//     var columnChildList = this.state.columnChildList
//     var pageRowCount = this.state.pageRowCount
//     var mode = this.state.mode
//     var modeParameterList = this.state.modeParameterList

//     var pageGridColModelList = []

//     var totalRowCount = 0
//     let rowList = []
//     if (modeParameterList === undefined || modeParameterList.length >= 1) {
//       let restrictionList = []
//       if (filterModel) {
//         Object.keys(filterModel).forEach(function (key) {
//           if (Array.isArray(filterModel[key].filterVal)) {
//             if (filterModel[key].filterVal[0]) {
//               if (filterModel[key].filterVal[0].year) {
//                 let temp = UtilCommon.copyObject(filterModel[key].filterVal[0])
//                 temp.hour = 0
//                 temp.minute = 0
//                 temp.second = 0
//                 restrictionList.push({
//                   fieldName: key,
//                   fieldOperation: 'GREATER_THAN_EQUAL',
//                   fieldValue: temp,
//                   nextConditionOperator: 'AND'
//                 })
//               }
//             }
//             if (filterModel[key].filterVal[1]) {
//               if (filterModel[key].filterVal[1].year) {
//                 let temp = UtilCommon.copyObject(filterModel[key].filterVal[1])
//                 temp.hour = 23
//                 temp.minute = 59
//                 temp.second = 59
//                 restrictionList.push({
//                   fieldName: key,
//                   fieldOperation: 'LESS_THAN_EQUAL',
//                   fieldValue: temp,
//                   nextConditionOperator: 'AND'
//                 })
//               }
//             }
//           } else {
//             restrictionList.push({
//               fieldName: key,
//               fieldOperation: 'MATCH',
//               fieldValue: filterModel[key].filterVal,
//               nextConditionOperator: 'AND'
//             })
//           }
//         })
//       }
//       let sortList = [{ "fieldName": "id", "type": "DSC" }]
//       if (sortModel) {
//         sortList.push({
//           fieldName: sortModel.sortField,
//           type: CustomGridBootstrap22.SORT_TYPE_ENUM[sortModel.sortOrder]
//         })
//       }
//       var gridFilterModel = {
//         searchFilterModel: {
//           restrictionList: restrictionList,
//           sortList: sortList,
//           page: pageDataNo || 0,
//           rows: this.props.numberOfRows ? this.props.numberOfRows : 10
//         }
//       }
//       // gridFilterModel
//       gridFilterModel = { ...gridFilterModel, ...this.state.userData }

//       Object.entries(gridFilterModel).map((item, index) => { })
//       Object.keys(gridFilterModel).map(function (key, index) {
//         gridFilterModel[key] = JSON.stringify(gridFilterModel[key])
//       })

//       var serverRows = []
//       var gridFilterModelTest = {
//         searchFilterModel: JSON.stringify({
//           restrictionList: [],
//           sortList: [],
//           page: 0,
//           rows: this.props.numberOfRows ? this.props.numberOfRows : 10
//         }),
//         customGridDataModel: JSON.stringify({
//           parameterMode: '1',
//           parameterValueList: [''],
//           socialGroupId: '2'
//         })
//       }
//       var gridDataResult = UtilAjax.sendRequest(
//         this,
//         UtilAjax.requestTypeEnum.POST_HTML,
//         UtilAjax.responseDataTypeEnum.HTML,
//         UtilAjax.mimeTypeEnum.JSON,
//         url,
//         gridFilterModel,
//         false,
//         false,
//         null,
//         null,
//         false,
//         null,
//         null
//       )

//       if (gridDataResult.status === 200) {
//         gridDataResult.data = JSON.parse(gridDataResult.data)
//         serverRows = gridDataResult.data.rows
//         totalRowCount = gridDataResult.data.records
//         if (totalRowCount === undefined) {
//           totalRowCount = 0
//         }
//         this.setState(
//           {
//             totalSize: gridDataResult.data.records,
//             currentPage: gridDataResult.data.page,
//             total: gridDataResult.data.total,
//             data: gridDataResult.data,
//             restrictionList: restrictionList,
//             sortList: sortList
//           },
//           function () { }
//         )

//         if (this.props.returnData) this.props.returnData(gridDataResult)

//         this.ConvertData(gridDataResult.data)

//         var indexFrom = 0
//         var indexTo = serverRows.length
//         if (indexTo > totalRowCount) {
//           indexTo = totalRowCount
//         }

//         var hasIdColumn = false

//           ; ([] || columnChildList).map(c => {
//             if (c.field === 'id') {
//               hasIdColumn = true
//             }
//           }, this)
//         rowList = []
//         for (let r = indexFrom; r < indexTo; r++) {
//           let rowObject = {}
//           if (!hasIdColumn) {
//             rowObject['id'] = 'randomId-' + r
//           }
//           ; ([] || columnChildList).map((c, index) => {
//             if (c.hidden !== true) {
//               rowObject[c.field] = serverRows[r].cell[index]
//             }
//           }, this)
//           rowList.push(rowObject)
//         }

//         return
//       } else {
//         this.setState(
//           {
//             error: gridDataResult,
//             dataIsLoaded: false
//           },
//           function () {
//             return {
//               rowList: [],
//               pageDataNo: 1,
//               totalRowCount: 0,
//               gridFilterModel: gridFilterModel,
//               pageGridColModelList: pageGridColModelList
//             }
//           }
//         )
//       }
//     } else {
//       rowList = []
//     }

//     return {
//       rowList: rowList,
//       pageDataNo: pageDataNo,
//       totalRowCount: totalRowCount,
//       gridFilterModel: gridFilterModel,
//       pageGridColModelList: pageGridColModelList
//     }
//   }

//   handleOnSelectAll = (isSelect, rows) => {
//     // if (isSelect) {
//     //   return rows.filter((r) => r.id >= 3).map((r) => r.id);
//     // }
//   }

//   handleOnSelect = (row, isSelect) => {
//     if (isSelect) {
//       this.setState(
//         () => ({
//           selected: [...this.state.selected, row.id],
//           FullselecteData: [...this.state.FullselecteData, row]
//         }),
//         () => {
//           this.props.handelSelectedRows(
//             row,
//             this.state.selected,
//             this.state.FullselecteData
//           )
//         }
//       )
//     } else {
//       this.setState(
//         () => ({
//           selected: this.state.selected.filter(x => x !== row.id),
//           FullselecteData: this.state.FullselecteData.filter(
//             x => x.id !== row.id
//           )
//         }),
//         () => {
//           this.props.handelSelectedRows(
//             row,
//             this.state.selected,
//             this.state.FullselecteData
//           )
//         }
//       )
//     }
//   }

//   handleTableChange(
//     type,
//     { page, sizePerPage, filters, sortField, sortOrder, cellEdit }
//   ) {
//     //TODO test methid
//     let sortModel = undefined
//     if (sortField) {
//       sortModel = { sortField: sortField, sortOrder: sortOrder }
//     }
//     switch (type) {
//       case 'pagination':
//         this.renderData(page - 1, sortModel, filters)
//         break
//       case 'filter':
//         this.renderData(0, sortModel, filters)
//         break
//       case 'sort':
//         this.renderData(0, sortModel, filters)
//         break
//       default:
//         break
//     }
//   }
//   showRadio = ({ mode, ...rest }) => {
//     if (this.props.selectRowRadio) {
//       return <input type={mode} {...rest} />
//     } else {
//       return null
//     }
//   }
//   handleOnSelectRadio = (row, isSelect, rowIndex, e) => {
//     if (this.props.selectRowRadio) {
//       this.props.handleOnSelectRadio(row, isSelect, rowIndex, e);
//     }
//   }
//   handelExcel = () => {
//     var gridFilterModel = {
//       searchFilterModel: {
//         restrictionList: this.state.restrictionList,
//         sortList: [],
//         page: 0,
//         rows: this.state.perPageSizeKm
//       }
//     }
//     let str = ''
//     gridFilterModel = { ...gridFilterModel, ...this.state.userData }
//     Object.keys(gridFilterModel).map(function (key, index) {
//       str += key + '=' + JSON.stringify(gridFilterModel[key]) + '&'
//     })

//     str += 'access_token=' + UtilOAuth.getToken().access_token
//     window.open(
//       encodeURI(this.state.dataUrl + '/excel-export?' + str),
//       '_parent'
//     )
//     // let loadUrl =
//     //   "/membership/test?searchFilterModel=%7B%22restrictionList%22%3A%5B%5D%2C%22sortList%22%3A%5B%5D%2C%22page%22%3A0%2C%22rows%22%3A20%7D";
//   }

//   handelExpandRow = row => this.props.handelExpandRenderer(row)

//   handelOnExpand = (row, isExpand, rowIndex, e) => {
//     if (this.props.expandRowOption)
//       this.props.handleOnExpand(row, isExpand, rowIndex, e)
//   }

//   render() {
//     console.log('this.state.data :>> ', this.state);
   
//     const {
//       // error,
//       dataIsLoaded,
//       // customClass,
//       // customStyle,
//       type,
//       columns,
//       // pageRowCount,
//       // pageNo,
//       // totalRowCount,
//       // gridActionHashMap,
//       // enableSorting,
//       // enableFilter,
//       // enableRtl,
//       // theme,
//       // reloadId,
//       titleGrid,
//       buttonPropsInTable
//       // selectRow,
//     } = this.state

//     console.log('ui5===>', this.state.total)

//     if (!dataIsLoaded) {
//       return <CustomLoader type={CustomLoader.typeEnum.OZVIAT_LOADER} />
//     } else {
//       // const rowStyle2 = (row, rowIndex) => {
//       //   const style = {};
//       //   this.props.handelRowStyle(row);
//       //   style.backgroundColor = '#c8e6c9';

//       // };

//       const rowStyle = {}

//       const rowEvents = {
//         onClick: (e, row, rowIndex) => {
//           if (this.props.rowEvents) {
//             this.props.handelRowClick(row)
//           }
//         }

//         // onMouseEnter: (e, row, rowIndex) => {
//         //   this.props.handelRowOnMouseEnter(row);
//         // },
//       }

//       const selectRow = {
//         mode: 'checkbox',
//         // clickToSelect: true,
//         hideSelectAll: true,
//         selected: this.state.selected,
//         onSelectAll: this.handleOnSelectAll,
//         onSelect: this.handleOnSelect
//       }
//       const selectRowRadio = {
//         mode: 'radio',
//         clickToSelect: true,
//         selectionRenderer: this.showRadio,
//         onSelect: this.handleOnSelectRadio,
//         bgColor: '#E4E8F9'
//       };
//       let options = {
//         page: this.state.currentPage + 1,
//         sizePerPage: this.state.perPageSizeKm,
//         totalSize: this.state.totalSize,
//         paginationSize: 3,
//         pageStartIndex: 1,
//         firstPageText: '>>',
//         prePageText: '>',
//         nextPageText: '<',
//         lastPageText: '<<',
//         hideSizePerPage: true,
//         nextPageTitle: 'First page',
//         prePageTitle: 'Pre page',
//         firstPageTitle: 'Next page',
//         lastPageTitle: 'Last page',
//         sizePerPageList: [
//           {
//             text: '10',
//             value: 10
//           },
//           {
//             text: '5',
//             value: 5
//           }
//         ]
//       }

//       const expandRowOption = {
//         renderer: this.handelExpandRow,
//         showExpandColumn: true,

//         expandColumnRenderer: ({ expanded }) => {
//           if (expanded) return <b>{'-'}</b>
//           return <b>{'+'}</b>
//         },

//         expandHeaderColumnRenderer: ({ isAnyExpands }) => {
//           if (isAnyExpands) return <b>{'-'}</b>
//           return <b>{'+'}</b>
//         },

//         onExpand: this.props.handleOnExpand ? this.handelOnExpand : undefined
//       }
//       if(false){
//         switch (type) {
//           case CustomGridBootstrap22.typeEnum.SINGLESELECT:
//             return (
//               <React.Fragment>
//                 <div
//                   className='col-12'
//                   style={{
//                     direction: 'rtl',
//                     display: 'flex'
//                     // flexDirection: "column",
//                     // marginBottom: "5rem",
//                   }}
//                 >
//                   <ToolkitProvider
//                     keyField='id'
//                     data={this.state.colList}
//                     columns={columns}
//                   >
//                     {props => (
//                       <div
//                         style={{
//                           display: 'flex',
//                           flexDirection: 'column',
//                           width: '100%'
//                           // alignItems: "center",
//                           // marginTop: "5rem",
//                         }}
//                       >
//                         <h2 style={{
//                           display: 'flex',
//                           flexDirection: 'row',
//                           alignItems: "center",
//                           justifyContent: "start",
//                           color: '#009aae',
//                           margin: 10,
//                           fontSize: "18px"
//                         }}> {titleGrid} </h2>
//                         <div>
//                           <div
//                               className='excel'
//                               id='bootstrapTable_topBottons'
//                               style={{
//                                 display: this.state.showExcelButton
//                                     ? 'flex'
//                                     : 'none',
//                                 flexDirection: 'row-reverse',
//                                 color: '#009aae',
//                                 marginTop: 5
//                               }}
//                           >
//                             {this.props.disabledExcel !== true &&
//                             <button
//                                 onClick={this.handelExcel}
//                                 style={{fontSize: '14px', margin: '10px'}}
//                                 className='btn btn-info'
//                             >
//                               خروجی اکسل
//                             </button>
//                             }
//                             {buttonPropsInTable}
//                           </div>
//                         </div>
  
//                         <BootstrapTable
//                             remote
//                             columns={columns}
//                             onTableChange={this.handleTableChange}
//                             data={this.state.colList}
//                             selectRow={this.props.selectRowRadio ? selectRowRadio : undefined}
//                             pagination={this.state.total > 1 ? paginationFactory(options) : undefined}
//                             {...props.baseProps}
//                             filter={filterFactory()}
//                             filterPosition='top'
//                             cellEdit={
//                               this.props.notCellEdit
//                                   ? () => {
//                                   }
//                                   : cellEditFactory({
//                                     mode: 'click',
//                                     blurToSave: true
//                                   })
//                             }
//                             // caption={<CaptionElement style= />}
//                           rowStyle={rowStyle}
//                           rowEvents={rowEvents}
//                           filtersClasses='filter-class'
//                           headerClasses='headerClasses'
//                           noDataIndication='هیچ رکوردی وجود ندارد'
//                           classes='headerWrapper-class'
//                           wrapperClasses='table-responsive body-class'
//                           bodyClasses='bodyClasses'
//                           hover
//                           expandRow={
//                             this.props.expandRowOption ? expandRowOption : false
//                           }
//                         />
//                       </div>
//                     )}
//                   </ToolkitProvider>
//                 </div>
//               </React.Fragment>
//             )
//           case CustomGridBootstrap22.typeEnum.MULTISELECT:
//             return (
//               <React.Fragment>
//                 <div
//                   className='col-12 customGrid'
//                   style={{
//                     direction: 'rtl',
//                     display: 'flex',
//                     flexDirection: 'column',
  
//                     // marginBottom: "5rem",
//                     width: '100%'
//                   }}
//                 >
//                   <ToolkitProvider
//                     keyField='id'
//                     data={this.state.colList}
//                     columns={columns}
//                   >
//                     {props => (
//                       <div
//                         style={{
//                           // display: "flex",
//                           flexDirection: 'column'
//                           // alignItems: "center",
//                           // marginTop: "5rem",
//                         }}
//                       >
//                         <div
//                             id='bootstrapTable_topBottons'
//                           style={{
//                             display: 'flex',
//                             flexDirection: this.state.titleGrid ? 'row' : "row-reverse",
//                             justifyContent: this.state.titleGrid ? "space-between" : "start",
//                             color: '#009aae'
//                           }}
//                         >
//                           <h2 style={{
//                             display: 'flex',
//                             flexDirection: 'row',
//                             alignItems: "center",
//                             justifyContent: "center",
//                             color: '#009aae',
//                             fontSize: "18px"
//                           }}> {titleGrid} </h2>
  
//                           <button
//                             onClick={this.handelExcel}
//                             style={{ fontSize: '14px', margin: '10px' }}
//                             className='btn btn-info'
//                           >
//                             خروجی اکسل
//                           </button>
//                           {buttonPropsInTable}
  
//                         </div>
//                         <BootstrapTable
//                           remote
//                           columns={columns}
//                           onTableChange={this.handleTableChange}
//                           data={this.state.colList}
//                           pagination={paginationFactory(options)}
//                           {...props.baseProps}
//                           filter={filterFactory()}
//                           filterPosition='top'
//                           cellEdit={cellEditFactory({
//                             mode: 'click',
//                             blurToSave: true
//                           })}
//                           // caption={<CaptionElement />}
//                           rowEvents={rowEvents}
//                           selectRow={selectRow}
//                           rowStyle={rowStyle}
//                           filtersClasses='filter-class'
//                           headerClasses='headerClasses'
//                           classes='headerWrapper-class'
//                           wrapperClasses='table-responsive-sm table-responsive-md table-responsive-lg body-class'
//                           bodyClasses='bodyClasses'
//                           hover
//                         />
//                       </div>
//                     )}
//                   </ToolkitProvider>
//                 </div>
//               </React.Fragment>
//             )
//         }

//       }else {
//        return  < ResponsiveView listData={this.state}/>
//       }
//     }
//   }
// }




// const ResponsiveView = ({listData}) => {

//   console.log('listData1 :>> ', listData);

//   const [list, setList] = useState([]);

//   useEffect(() => {
//     let newRows = listData.data.rows[0].rowCellArray.map(item =>  item )
//     let newList = listData.columns.map(item =>  item )
//     setTimeout(() => {
//       console.log('newRows :>> ', newRows);
//       console.log('newList :>> ', newList);
//     }, 3000);
//   }, []);
  
// // console.log('newList :>> ', newList);

//   const Style = {
//     borderRadius: "15px !important",
//     height : "fitContent",
//     marginBottom: ".3rem"
//   }
//   const Main = { 
//     flexDirection: "column",
//    }
//   const h6 = { 
//     fontSize:"10px",
//     color: "#8D9398",
//     margin:0
//    }
//   const h5 = { 
//     fontSize:"10px",
//     color:"#2F3134"
//    }
//   const img = { 
//     width:"119px",
//     height:"119px"
//    }
//   const h6Tag1 = { 
//     margin:0,
//     fontSize:"9px",
//     padding:"2px 8px"
//    }
//   const col2 = { 
//     marginTop:"6px"
//    }
//   const col3 = { 
//     marginLeft:"-6px",
//     marginTop:"6px"
//    }
//   const col2Div = { 
//     margin: "6px 0px"
//    }
//   const col3img2 = { 
//     transform: "rotate(90deg)",
//     marginTop: "25px",
//     marginRight: "-10px"
//    }
//    const labelContainer= {
//     backgroundColor: "white", // Same color as background
//     alignSelf: "flex-start", // Have View be same width as Text inside
//     paddingHorizontal: 3, // Amount of spacing between border and first/last letter
//     marginStart: 10, // How far right do you want the label to start
//     zIndex: 1, // Label must overlap border
//     elevation: 1, // Needed for android
//     shadowColor: "white", // Same as background color because elevation: 1 creates a shadow that we don't want
//     position: "absolute", // Needed to be able to precisely overlap label with border
//     top: -12, // Vertical position of label. Eyeball it to see where label intersects border.
// }
//  const inputContainer= {
//     borderWidth: 1, // Create border
//     borderRadius: 8, // Not needed. Just make it look nicer.
//     padding: 8, // Also used to make it look nicer
//     zIndex: 0, // Ensure border has z-index of 0
// }
//  const input = {
//    borderRadius:"8px",
//    textAlign: "center",
//    textAlign: "center",
//    border: "1px solid #8D9398",
//    color:"#8D9398"
// }
//  const p = {
//    color:"#8D9398",
//    fontSize:"8px"
// }
// const divMainInput = {
//   display:"flex",
//   flexDirection:"row",
//   marginTop:"22px",
//   marginBottom:"20px"
// }
// const divSecondInput = {
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
//   flexDirection: "column",
//   height:"30px"
// }
// const button = {
//    background : "#009AAE",
//    width: "98%",
//    borderRadius:"8px",
//    border:"none",
//    color:"#fff",
//    height:"29px"
// }

// const divMainInputAndbtn = {
//   display:'flex',
//   flexDirection:"column",
//   marginBottom:"20px"
// }

//   return(
//       <div className="ResponsiveView_main d-flex col col-12 p-2 bd-highlight container" style={Main}>


//             {
//                listData.columns.map(item => {
                   
//                  return (
//                   <div className="card col col-12" style={Style,{borderRadius:"10px !important"}}>
//                   <div className="card-body p-0">
//                       <div className="row col-12">


//                           <div className="col-5">
//                               <img style={img} src={smartPhone} />
//                           </div>

//                          <div className="col col-6" style={col2}>
//                              <div className="row" style={col2Div}>
//                                 <h5 style={h5}>گوشی آیفون 12 پرو مکس</h5>
//                               </div>

//                               <div className="row" style={col2Div} style={{border:"1px solid #8D9398",borderRadius:"8px",width:"fit-content"}}>
//                                 <img src={Ellipse1} />
//                                 <h6 style={h6,h6Tag1}>آبی</h6>
//                               </div>

//                               <div className="row" style={col2Div}>
//                                 <img src={Ellipse2} />
//                                 <h6 style={h6}>ابعاد cm 146*68*8</h6>
//                               </div>

//                               <div className="row" style={col2Div}>
//                                 <img src={Ellipse2} />
//                                 <h6  style={h6}>فاقد گارانتی</h6>
//                               </div>

//                               <div className="row" style={col2Div}>
//                                 <img src={Ellipse2} />
//                                 <h6  style={h6}>497 گرم</h6>
//                               </div>

//                          </div>

//                          <div className="col col-1" style={col3}>
//                             <img src={EditSquare} />
//                             <img style={col3img2} src={Rectangle} />
//                          </div>
                 

//                       </div>



//               <div style={divMainInputAndbtn}>
//                   <div className="" style={divMainInput} >
//                            <div style={divSecondInput}>
//                                <label style={p}>قیمت(تومان</label>
//                                 <input value="5,000,000" className="col-10" style={input}/>
//                            </div>
//                            <div style={divSecondInput}>
//                                 <label style={p}>تخفیف(درصد)</label>
//                                 <input value="5" className="col-10" style={input}/>
//                            </div>
//                            <div style={divSecondInput}>
//                                 <label style={p}>موجودی(عدد)</label>
//                                 <input value="20" className="col-10" style={input}/>
//                            </div>

//                         </div>

//                      <div>
//                         <button style={button}>
//                             ثبت
//                         </button>
//                       </div>

//                       {/* <TextField id="outlined-basic" label="Outlined" variant="outlined" />
//                        <TextField id="filled-basic" label="Filled" variant="filled" />
//                             <TextField id="standard-basic" label="Standard" variant="standard" /> */}
//                             {/* <I/nput defaultValue="Hello world" inputProps={ariaLabel} /> */}
//                                 {/* <Input placeholder="Placeholder" inputProps={ariaLabel} />
//                                 <Input disabled defaultValue="Disabled" inputProps={ariaLabel} />
//                                 <Input defaultValue="Error" error inputProps={ariaLabel} /> */}
//                   </div>
                     

//                   </div>
//                </div> 
//                  )                
              
//             })
//             }
    


//       </div>
//   )
// }

// export { CustomGridBootstrap22, ResponsiveView }