
import React, { Component }  from 'react'
import {
  CCard,
  CCardBody,
  CDataTable,
  CModal,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CButton,
  CForm,
  CFormGroup,
  CLabel,
  CInput,
  CSwitch,
  CRow,
  CCol
} from '@coreui/react';

import $ from 'jquery';
import {toast} from "react-hot-toast";

const axios = require('axios')
const Config = require('../../Config.js')

const fields = [
  {key: 'userType'},
  {key: 'labInput', label: 'Input', sorter: false},
  {key: 'labAnalysis', label: 'Analysis', sorter: false},
  {key: 'labAdmin', label: 'Admin', sorter: false},
  {key: 'stockUser', label: 'User', sorter: false},
  {key: 'stockAdmin', label: 'Admin', sorter: false},
  {key: 'hsImport', label: 'Import', sorter: false},
  {key: 'hsExport', label: 'Export', sorter: false},
  {key: 'hsAdmin', label: 'Admin', sorter: false},
  {key: 'geologyImport', label: 'Import', sorter: false},
  {key: 'geologyExport', label: 'Export', sorter: false},
  {key: 'geologyAdmin', label: 'Admin', sorter: false},
  {key: 'remark', sorter: false}, 
  {key: 'buttonGroups', label: '', _style: { width: '84px', display: 'none'}}]

export default class AdminUserType extends Component {
  constructor(props) {
    super(props);
    this.getAllUserTypes = this.getAllUserTypes.bind(this);
    this.deleteUserType = this.deleteUserType.bind(this);
    this.createUserType = this.createUserType.bind(this);
    this.updateUserType = this.updateUserType.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSwitchChange = this.handleSwitchChange.bind(this);

    this.state = {
      userTypesData: [],
      modal_delete: false,
      modal_create: false,
      current_id: null,
      userType: '',
      labInput: false,
      labAnalysis: false,
      labAdmin: false,
      stockUser: false,
      stockAdmin: false,
      hsImport: false,
      hsExport: false,
      hsAdmin: false,
      geologyImport: false,
      geologyExport: false,
      geologyAdmin: false,
      remark: '',
      _create: false,
      double_error: '',
    }
  }

  componentDidMount() {
    this.getAllUserTypes();
  }

  handleInputChange(e) {
    var name = e.target.name;
    var value = e.target.value;

    if (name === 'userType') {
      var found = false;
      for (var i in this.state.userTypesData) {
        var item = this.state.userTypesData[i];
        if (item.userType === value && item._id !== this.state.current_id) {
          found = true;
          break;
        }
      }

      if (found === true) {
        this.setState({double_error: 'Value already exists'});
      }
      else this.setState({double_error: ''});
    }

    this.setState({
      [name]: value
    })
  }

  handleSwitchChange(e) {
    var name = e.target.name;
    var value = e.target.checked;

    if (value === true) {
      switch (name) {
        case 'labAdmin':
          this.setState({
            labInput: true,
            labAnalysis: true
          })
          break;
        case 'stockAdmin':
          this.setState({
            stockUser: true
          })
          break;
        case 'hsAdmin':
          this.setState({
            hsImport: true,
            hsExport: true
          })
          break;
        case 'geologyAdmin':
          this.setState({
            geologyImport: true,
            geologyExport: true
          })
          break;
        default:
          break;
      }
    }
    if (value === false) {
      switch (name) {
        case 'labInput': case 'labAnalysis':
          this.setState({
            labAdmin: false
          })
          break;
        case 'stockUser':
          this.setState({
            stockAdmin: false
          })
          break;
        case 'hsImport': case 'hsExport':
          this.setState({
            hsAdmin: false
          })
          break;
        case 'geologyImport': case 'geologyExport':
          this.setState({
            geologyAdmin: false
          })
          break;
        default:
          break;
      }
    }

    this.setState({
      [name]: value
    })
  }

  renderModalCreate() {
    var error = this.state.double_error;

    return (
      <CCard>
        <CCardBody>
          <CForm className="was-validated" onSubmit={this.state._create === true ? this.createUserType : this.updateUserType}>
            <CFormGroup>
              <CLabel style={{fontWeight: '500'}}>UserType</CLabel>
              <CInput name="userType" value={this.state.userType} onChange={this.handleInputChange} required />
              {
                error === undefined || error === '' ? <div></div> : 
                  <div style={{width: '100%', marginTop: '0.25rem', fontSize: '80%', color: '#e55353'}}>{error}</div>
              }
            </CFormGroup>
            <CFormGroup>
              <CRow>
                <CCol md="3">
                  <p style={{fontWeight: '500'}}>Laboratory</p>
                </CCol>
                <CCol>
                  <CRow>
                    <CCol md="2">
                      Input
                    </CCol>
                    <CCol md="2">
                      <CSwitch name="labInput" shape={'pill'} color={'info'} labelOn={'\u2713'} labelOff={'\u2715'} checked={this.state.labInput} onChange={this.handleSwitchChange}/>
                    </CCol>
                    <CCol md="2">
                      Analysis
                    </CCol>
                    <CCol md="2">
                      <CSwitch name="labAnalysis" shape={'pill'} color={'info'} labelOn={'\u2713'} labelOff={'\u2715'} checked={this.state.labAnalysis} onChange={this.handleSwitchChange}/>
                    </CCol>
                    <CCol md="2">
                      Admin
                    </CCol>
                    <CCol md="2">
                      <CSwitch name="labAdmin" shape={'pill'} color={'info'} labelOn={'\u2713'} labelOff={'\u2715'} checked={this.state.labAdmin} onChange={this.handleSwitchChange}/>
                    </CCol>
                  </CRow>
                </CCol>
              </CRow>
            </CFormGroup>
            <CFormGroup>
              <CRow>
                <CCol md="3">
                  <p style={{fontWeight: '500'}}>Stock Management</p>
                </CCol>
                <CCol>
                  <CRow>
                    <CCol md="2">
                      User
                    </CCol>
                    <CCol md="2">
                      <CSwitch name="stockUser" shape={'pill'} color={'info'} labelOn={'\u2713'} labelOff={'\u2715'} checked={this.state.stockUser} onChange={this.handleSwitchChange}/>
                    </CCol>
                    <CCol md="2">
                      Admin
                    </CCol>
                    <CCol md="2">
                      <CSwitch name="stockAdmin" shape={'pill'} color={'info'} labelOn={'\u2713'} labelOff={'\u2715'} checked={this.state.stockAdmin} onChange={this.handleSwitchChange}/>
                    </CCol>
                  </CRow>
                </CCol>
              </CRow>
            </CFormGroup>
            <CFormGroup>
              <CRow>
                <CCol md="3">
                  <p style={{fontWeight: '500'}}>Hs</p>
                </CCol>
                <CCol>
                  <CRow>
                    <CCol md="2">
                      Import
                    </CCol>
                    <CCol md="2">
                      <CSwitch name="hsImport" shape={'pill'} color={'info'} labelOn={'\u2713'} labelOff={'\u2715'} checked={this.state.hsImport} onChange={this.handleSwitchChange}/>
                    </CCol>
                    <CCol md="2">
                      Export
                    </CCol>
                    <CCol md="2">
                      <CSwitch name="hsExport" shape={'pill'} color={'info'} labelOn={'\u2713'} labelOff={'\u2715'} checked={this.state.hsExport} onChange={this.handleSwitchChange}/>
                    </CCol>
                    <CCol md="2">
                      Admin
                    </CCol>
                    <CCol md="2">
                      <CSwitch name="hsAdmin" shape={'pill'} color={'info'} labelOn={'\u2713'} labelOff={'\u2715'} checked={this.state.hsAdmin} onChange={this.handleSwitchChange}/>
                    </CCol>
                  </CRow>
                </CCol>
              </CRow>
            </CFormGroup>
            <CFormGroup>
              <CRow>
                <CCol md="3">
                  <p style={{fontWeight: '500'}}>Geology</p>
                </CCol>
                <CCol>
                  <CRow>
                    <CCol md="2">
                      Import
                    </CCol>
                    <CCol md="2">
                      <CSwitch name="geologyImport" shape={'pill'} color={'info'} labelOn={'\u2713'} labelOff={'\u2715'} checked={this.state.geologyImport} onChange={this.handleSwitchChange}/>
                    </CCol>
                    <CCol md="2">
                      Export
                    </CCol>
                    <CCol md="2">
                      <CSwitch name="geologyExport" shape={'pill'} color={'info'} labelOn={'\u2713'} labelOff={'\u2715'} checked={this.state.geologyExport} onChange={this.handleSwitchChange}/>
                    </CCol>
                    <CCol md="2">
                      Admin
                    </CCol>
                    <CCol md="2">
                      <CSwitch name="geologyAdmin" shape={'pill'} color={'info'} labelOn={'\u2713'} labelOff={'\u2715'} checked={this.state.geologyAdmin} onChange={this.handleSwitchChange}/>
                    </CCol>
                  </CRow>
                </CCol>
              </CRow>
            </CFormGroup>
            <CFormGroup>
              <CLabel style={{fontWeight: '500'}}>Remark</CLabel>
              <CInput name="remark" value={this.state.remark} onChange={this.handleInputChange} />
            </CFormGroup>
            <div className="float-right">
              <CButton type="submit" color="info">{ this.state._create === true ? 'Create' : 'Update' }</CButton>
              <span style={{padding: '4px'}}/>
              <CButton color="secondary" onClick={() => this.setModal_Create(false)}>Cancel</CButton>
            </div>
          </CForm>
        </CCardBody>
      </CCard>
    )
  }

  renderTableHeaders() {
    if ($("#insertedTr").length)
      return;
        
    var trContent = '<tr id="insertedTr"> \
      <th></th> \
      <th colspan="3" style="text-align: center">Laboratory</th> \
      <th colspan="2" style="text-align: center">Stock Management</th> \
      <th colspan="3" style="text-align: center">Hs</th> \
      <th colspan="3" style="text-align: center">Geology</th> \
      <th></th> \
      <th rowspan="2"></th> \
    </tr>';
    // <th rowspan="2" style="text-align: center; vertical-align: middle">User Type</th> \
    // <th rowspan="2" style="text-align: center; vertical-align: middle">Remark</th> \
    $("#tableUserTypes").find('thead').find('tr').before(trContent);
  }

  render() {
    return (
      <div>
        <div>
          <CButton
            color="info"
            className="float-right"
            style={{margin: '0px 0px 0px 16px'}}
            //style={{margin: '16px'}}
            onClick={()=>{ this.on_create_clicked() }}
          ><i className="fa fa-plus"/><span style={{padding: '4px'}}/>Create New</CButton>
        </div>
        <div id="tableUserTypes">
          <CDataTable
            items={this.state.userTypesData}
            fields={fields}
            itemsPerPage={50}
            itemsPerPageSelect
            sorter
            //tableFilter
            pagination
            hover
            clickableRows
            scopedSlots = {{
              'labInput':
                (item)=>{
                  return (
                    <td style={{textAlign: 'center'}}><CSwitch className={'mx-1'} shape={'pill'} color={'info'} labelOn={'\u2713'} labelOff={'\u2715'} checked={item.labInput} disabled/></td>
                  )},
              'labAnalysis':
                (item)=>{
                  return (
                    <td style={{textAlign: 'center'}}><CSwitch className={'mx-1'} shape={'pill'} color={'info'} labelOn={'\u2713'} labelOff={'\u2715'} checked={item.labAnalysis} disabled/></td>
                  )},
              'labAdmin':
                (item)=>{
                  return (
                    <td style={{textAlign: 'center'}}><CSwitch className={'mx-1'} shape={'pill'} color={'info'} labelOn={'\u2713'} labelOff={'\u2715'} checked={item.labAdmin} disabled/></td>
                  )},
              'stockUser':
                (item)=>{
                  return (
                    <td style={{textAlign: 'center'}}><CSwitch className={'mx-1'} shape={'pill'} color={'info'} labelOn={'\u2713'} labelOff={'\u2715'} checked={item.stockUser} disabled/></td>
                  )},
              'stockAdmin':
                (item)=>{
                  return (
                    <td style={{textAlign: 'center'}}><CSwitch className={'mx-1'} shape={'pill'} color={'info'} labelOn={'\u2713'} labelOff={'\u2715'} checked={item.stockAdmin} disabled/></td>
                  )},
              'hsImport':
                (item)=>{
                  return (
                    <td style={{textAlign: 'center'}}><CSwitch className={'mx-1'} shape={'pill'} color={'info'} labelOn={'\u2713'} labelOff={'\u2715'} checked={item.hsImport} disabled/></td>
                  )},
              'hsExport':
                (item)=>{
                  return (
                    <td style={{textAlign: 'center'}}><CSwitch className={'mx-1'} shape={'pill'} color={'info'} labelOn={'\u2713'} labelOff={'\u2715'} checked={item.hsExport} disabled/></td>
                  )},
              'hsAdmin':
                (item)=>{
                  return (
                    <td style={{textAlign: 'center'}}><CSwitch className={'mx-1'} shape={'pill'} color={'info'} labelOn={'\u2713'} labelOff={'\u2715'} checked={item.hsAdmin} disabled/></td>
                  )},
              'geologyImport':
                (item)=>{
                  return (
                    <td style={{textAlign: 'center'}}><CSwitch className={'mx-1'} shape={'pill'} color={'info'} labelOn={'\u2713'} labelOff={'\u2715'} checked={item.geologyImport} disabled/></td>
                  )},
              'geologyExport':
                (item)=>{
                  return (
                    <td style={{textAlign: 'center'}}><CSwitch className={'mx-1'} shape={'pill'} color={'info'} labelOn={'\u2713'} labelOff={'\u2715'} checked={item.geologyExport} disabled/></td>
                  )},
              'geologyAdmin':
                (item)=>{
                  return (
                    <td style={{textAlign: 'center'}}><CSwitch className={'mx-1'} shape={'pill'} color={'info'} labelOn={'\u2713'} labelOff={'\u2715'} checked={item.geologyAdmin} disabled/></td>
                  )},
              'buttonGroups':
                (item, index)=>{
                  return (
                    <td>
                      <div style={{display: 'flex'}}>
                        <CButton
                          color="info"
                          size="sm"
                          onClick={()=>{ this.on_update_clicked(item) }}
                        ><i className="fa fa-edit"/></CButton>
                        <span style={{padding: '4px'}}/>
                        <CButton
                          color="danger"
                          size="sm"
                          onClick={()=>{ this.on_delete_clicked(item._id) }}
                        ><i className="fa fa-trash"/></CButton>
                      </div>
                    </td>
                  )
                }
            }}
          />
        </div>
        { this.renderTableHeaders() }
        <CModal 
          show={this.state.modal_delete} 
          onClose={() => this.setModal_Delete(false)}
        >
          <CModalHeader>
            <CModalTitle>Confirm</CModalTitle>
          </CModalHeader>
          <CModalBody>
            Do you really want to delete current user type?
          </CModalBody>
          <CModalFooter>
            <CButton
              color="danger"
              onClick={() => this.deleteUserType()}
            >Delete</CButton>{' '}
            <CButton 
              color="secondary" 
              onClick={() => this.setModal_Delete(false)}
            >Cancel</CButton>
          </CModalFooter>
        </CModal>
        
        <CModal 
          show={this.state.modal_create} 
          onClose={() => this.setModal_Create(false)}
          closeOnBackdrop={false}
          centered
          size="lg"
        >
          <CModalHeader>
            <CModalTitle>{this.state._create === true ? 'Create New User Type' : 'Update User Type'}</CModalTitle>
          </CModalHeader>
          <CModalBody>
            { this.renderModalCreate() }
          </CModalBody>
        </CModal>
      </div>
    );
  }

  getAllUserTypes() {
    axios.get(Config.ServerUri + '/get_all_userTypes')
    .then((res) => {
      this.setState({
        userTypesData: res.data
      });
    })
    .catch((error) => {
      
    })
  }

  on_delete_clicked(id) {
    this.setState({current_id: id});

    this.setModal_Delete(true);
  }

  on_create_clicked() {
    this.setState({
      current_id: '',
      userType: '',
      labInput: false,
      labAnalysis: false,
      labAdmin: false,
      stockUser: false,
      stockAdmin: false,
      hsImport: false,
      hsExport: false,
      hsAdmin: false,
      geologyImport: false,
      geologyExport: false,
      geologyAdmin: false,
      remark: '',
      _create: true,
      double_error: ''
    });

    this.setModal_Create(true);
  }
  
  on_update_clicked(item) {
    this.setState({
      current_id: item._id,
      userType: item.userType,
      labInput: item.labInput,
      labAnalysis: item.labAnalysis,
      labAdmin: item.labAdmin,
      stockUser: item.stockUser,
      stockAdmin: item.stockAdmin,
      hsImport: item.hsImport,
      hsExport: item.hsExport,
      hsAdmin: item.hsAdmin,
      geologyImport: item.geologyImport,
      geologyExport: item.geologyExport,
      geologyAdmin: item.geologyAdmin,
      remark: item.remark,
      _create: false,
      double_error: ''
    });

    this.setModal_Create(true);
  }

  deleteUserType() {
    this.setModal_Delete(false);

    axios.post(Config.ServerUri + '/delete_userType', {
      id: this.state.current_id
    })
    .then((res) => {
      toast.success('UserType successfully deleted');
      this.setState({
        userTypesData: res.data
      });
    })
    .catch((error) => {
      
    })
  }

  createUserType(event) {
    event.preventDefault();

    if (this.state.double_error !== '') return;

    this.setModal_Create(false);

    axios.post(Config.ServerUri + '/create_userType', {
      userType: this.state.userType,
      labInput: this.state.labInput,
      labAnalysis: this.state.labAnalysis,
      labAdmin: this.state.labAdmin,
      stockUser: this.state.stockUser,
      stockAdmin: this.state.stockAdmin,
      hsImport: this.state.hsImport,
      hsExport: this.state.hsExport,
      hsAdmin: this.state.hsAdmin,
      geologyImport: this.state.geologyImport,
      geologyExport: this.state.geologyExport,
      geologyAdmin: this.state.geologyAdmin,
      remark: this.state.remark
    })
    .then((res) => {
      toast.success('UserType successfully created');
      this.setState({
        userTypesData: res.data
      });
    })
    .catch((error) => {
      
    })
  }
  
  updateUserType(event) {
    event.preventDefault();

    if (this.state.double_error !== '') return;

    this.setModal_Create(false);

    axios.post(Config.ServerUri + '/update_userType', {
      id: this.state.current_id,
      userType: this.state.userType,
      labInput: this.state.labInput,
      labAnalysis: this.state.labAnalysis,
      labAdmin: this.state.labAdmin,
      stockUser: this.state.stockUser,
      stockAdmin: this.state.stockAdmin,
      hsImport: this.state.hsImport,
      hsExport: this.state.hsExport,
      hsAdmin: this.state.hsAdmin,
      geologyImport: this.state.geologyImport,
      geologyExport: this.state.geologyExport,
      geologyAdmin: this.state.geologyAdmin,
      remark: this.state.remark
    })
    .then((res) => {
      toast.success('UserType successfully updated');
      this.setState({
        userTypesData: res.data
      });
    })
    .catch((error) => {
      
    })
  }

  setModal_Delete(modal) {
    this.setState({
      modal_delete: modal
    })
  }

  setModal_Create(modal) {
    this.setState({
      modal_create: modal
    })
  }
}