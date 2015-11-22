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
} from '@coreui/react'

import {toast} from "react-hot-toast";

const axios = require('axios')
const Config = require('../../Config.js')

const fields = [
  {key: 'sampleType'},
  {key: 'material', sorter: false},
  {key: 'client', sorter: false},
  {key: 'packingType', sorter: false},
  {key: 'dueDate', sorter: false},
  {key: 'sampleDate', sorter: false},
  {key: 'sendingDate', sorter: false},
  {key: 'analysisType', sorter: false},
  {key: 'incomingProduct', sorter: false},
  {key: 'distributor', sorter: false},
  {key: 'certificateType', sorter: false},
  {key: 'remark', sorter: false},
  {key: 'buttonGroups', label: '', _style: { width: '84px'}}
]

export default class AdminSampleType extends Component {
  constructor(props) {
    super(props);
    this.getAllSampleTypes = this.getAllSampleTypes.bind(this);
    this.deleteSampleType = this.deleteSampleType.bind(this);
    this.createSampleType = this.createSampleType.bind(this);
    this.updateSampleType = this.updateSampleType.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSwitchChange = this.handleSwitchChange.bind(this);

    this.state = {
      sampleTypesData: [],
      modal_delete: false,
      modal_create: false,
      current_id: null,
      sampleType: '',
      material: false,
      client: false,
      packingType: false,
      dueDate: false,
      sampleDate: false,
      sendingDate: false,
      analysisType: false,
      incomingProduct: false,
      distributor: false,
      certificateType: false,
      remark: '',
      _create: false,
      double_error: '',
    }
  }

  componentDidMount() {
    this.getAllSampleTypes();
  }

  handleInputChange(e) {
    var name = e.target.name;
    var value = e.target.value;

    if (name === 'sampleType') {
      var found = false;
      for (var i in this.state.sampleTypesData) {
        var item = this.state.sampleTypesData[i];
        if (item.sampleType === value && item._id !== this.state.current_id) {
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

    this.setState({
      [name]: value
    })
  }

  renderModalCreate() {
    var error = this.state.double_error;

    return (
      <CCard>
        <CCardBody>
          <CForm className="was-validated" onSubmit={this.state._create === true ? this.createSampleType : this.updateSampleType}>
            <CFormGroup>
              <CLabel style={{fontWeight: '500'}}>SampleType</CLabel>
              <CInput name="sampleType" value={this.state.sampleType} onChange={this.handleInputChange} required />
              {
                error === undefined || error === '' ? <div></div> : 
                  <div style={{width: '100%', marginTop: '0.25rem', fontSize: '80%', color: '#e55353'}}>{error}</div>
              }
            </CFormGroup>
            <CFormGroup>
              <CRow>
                <CCol md="3">
                  <CLabel style={{fontWeight: '500'}}>Material</CLabel>
                </CCol>
                <CCol md="3">
                  <CSwitch name="material" shape={'pill'} color={'info'} labelOn={'\u2713'} labelOff={'\u2715'} checked={this.state.material} onChange={this.handleSwitchChange}/>
                </CCol>
                <CCol md="3">
                  <CLabel style={{fontWeight: '500'}}>Client</CLabel>
                </CCol>
                <CCol md="3">
                  <CSwitch name="client" shape={'pill'} color={'info'} labelOn={'\u2713'} labelOff={'\u2715'} checked={this.state.client} onChange={this.handleSwitchChange}/>
                </CCol>
              </CRow>
            </CFormGroup>
            <CFormGroup>
              <CRow>
                <CCol md="3">
                  <CLabel style={{fontWeight: '500'}}>Packing Type</CLabel>
                </CCol>
                <CCol md="3">
                  <CSwitch name="packingType" shape={'pill'} color={'info'} labelOn={'\u2713'} labelOff={'\u2715'} checked={this.state.packingType} onChange={this.handleSwitchChange}/>
                </CCol>
                <CCol md="3">
                  <CLabel style={{fontWeight: '500'}}>Due Date</CLabel>
                </CCol>
                <CCol md="3">
                  <CSwitch name="dueDate" shape={'pill'} color={'info'} labelOn={'\u2713'} labelOff={'\u2715'} checked={this.state.dueDate} onChange={this.handleSwitchChange}/>
                </CCol>
              </CRow>
            </CFormGroup>
            <CFormGroup>
              <CRow>
                <CCol md="3">
                  <CLabel style={{fontWeight: '500'}}>Sample Date</CLabel>
                </CCol>
                <CCol md="3">
                  <CSwitch name="sampleDate" shape={'pill'} color={'info'} labelOn={'\u2713'} labelOff={'\u2715'} checked={this.state.sampleDate} onChange={this.handleSwitchChange}/>
                </CCol>
                <CCol md="3">
                  <CLabel style={{fontWeight: '500'}}>Sending Date</CLabel>
                </CCol>
                <CCol md="3">
                  <CSwitch name="sendingDate" shape={'pill'} color={'info'} labelOn={'\u2713'} labelOff={'\u2715'} checked={this.state.sendingDate} onChange={this.handleSwitchChange}/>
                </CCol>
              </CRow>
            </CFormGroup>
            <CFormGroup>
              <CRow>
                <CCol md="3">
                  <CLabel style={{fontWeight: '500'}}>Analysis Type</CLabel>
                </CCol>
                <CCol md="3">
                  <CSwitch name="analysisType" shape={'pill'} color={'info'} labelOn={'\u2713'} labelOff={'\u2715'} checked={this.state.analysisType} onChange={this.handleSwitchChange}/>
                </CCol>
                <CCol md="3">
                  <CLabel style={{fontWeight: '500'}}>Incoming Product</CLabel>
                </CCol>
                <CCol md="3">
                  <CSwitch name="incomingProduct" shape={'pill'} color={'info'} labelOn={'\u2713'} labelOff={'\u2715'} checked={this.state.incomingProduct} onChange={this.handleSwitchChange}/>
                </CCol>
              </CRow>
            </CFormGroup>
            <CFormGroup>
              <CRow>
                <CCol md="3">
                  <CLabel style={{fontWeight: '500'}}>Distributor</CLabel>
                </CCol>
                <CCol md="3">
                  <CSwitch name="distributor" shape={'pill'} color={'info'} labelOn={'\u2713'} labelOff={'\u2715'} checked={this.state.distributor} onChange={this.handleSwitchChange}/>
                </CCol>
                <CCol md="3">
                  <CLabel style={{fontWeight: '500'}}>Certificate Type</CLabel>
                </CCol>
                <CCol md="3">
                  <CSwitch name="certificateType" shape={'pill'} color={'info'} labelOn={'\u2713'} labelOff={'\u2715'} checked={this.state.certificateType} onChange={this.handleSwitchChange}/>
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
        <div id="tableSampleTypes">
          <CDataTable
            items={this.state.sampleTypesData}
            fields={fields}
            itemsPerPage={50}
            itemsPerPageSelect
            sorter
            //tableFilter
            pagination
            hover
            clickableRows
            scopedSlots = {{
              'material':
                (item)=>{
                  return (
                    <td style={{textAlign: 'center'}}><CSwitch className={'mx-1'} shape={'pill'} color={'info'} labelOn={'\u2713'} labelOff={'\u2715'} checked={item.material} disabled/></td>
                  )},
              'client':
                (item)=>{
                  return (
                    <td style={{textAlign: 'center'}}><CSwitch className={'mx-1'} shape={'pill'} color={'info'} labelOn={'\u2713'} labelOff={'\u2715'} checked={item.client} disabled/></td>
                  )},
              'packingType':
                (item)=>{
                  return (
                    <td style={{textAlign: 'center'}}><CSwitch className={'mx-1'} shape={'pill'} color={'info'} labelOn={'\u2713'} labelOff={'\u2715'} checked={item.packingType} disabled/></td>
                  )},
              'dueDate':
                (item)=>{
                  return (
                    <td style={{textAlign: 'center'}}><CSwitch className={'mx-1'} shape={'pill'} color={'info'} labelOn={'\u2713'} labelOff={'\u2715'} checked={item.dueDate} disabled/></td>
                  )},
              'sampleDate':
              (item)=>{
                return (
                  <td style={{textAlign: 'center'}}><CSwitch className={'mx-1'} shape={'pill'} color={'info'} labelOn={'\u2713'} labelOff={'\u2715'} checked={item.sampleDate} disabled/></td>
                )},
              'sendingDate':
              (item)=>{
                return (
                  <td style={{textAlign: 'center'}}><CSwitch className={'mx-1'} shape={'pill'} color={'info'} labelOn={'\u2713'} labelOff={'\u2715'} checked={item.sendingDate} disabled/></td>
                )},
              'analysisType':
                (item)=>{
                  return (
                    <td style={{textAlign: 'center'}}><CSwitch className={'mx-1'} shape={'pill'} color={'info'} labelOn={'\u2713'} labelOff={'\u2715'} checked={item.analysisType} disabled/></td>
                  )},
              'incomingProduct':
                (item)=>{
                  return (
                    <td style={{textAlign: 'center'}}><CSwitch className={'mx-1'} shape={'pill'} color={'info'} labelOn={'\u2713'} labelOff={'\u2715'} checked={item.incomingProduct} disabled/></td>
                  )},
              'distributor':
              (item)=>{
                return (
                  <td style={{textAlign: 'center'}}><CSwitch className={'mx-1'} shape={'pill'} color={'info'} labelOn={'\u2713'} labelOff={'\u2715'} checked={item.distributor} disabled/></td>
                )},
              'certificateType':
                (item)=>{
                  return (
                    <td style={{textAlign: 'center'}}><CSwitch className={'mx-1'} shape={'pill'} color={'info'} labelOn={'\u2713'} labelOff={'\u2715'} checked={item.certificateType} disabled/></td>
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
              
        <CModal 
          show={this.state.modal_delete} 
          onClose={() => this.setModal_Delete(false)}
        >
          <CModalHeader>
            <CModalTitle>Confirm</CModalTitle>
          </CModalHeader>
          <CModalBody>
            Do you really want to delete current sample type?
          </CModalBody>
          <CModalFooter>
            <CButton
              color="danger"
              onClick={() => this.deleteSampleType()}
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
            <CModalTitle>{this.state._create === true ? 'Create New Sample Type' : 'Update Sample Type'}</CModalTitle>
          </CModalHeader>
          <CModalBody>
            { this.renderModalCreate() }
          </CModalBody>
        </CModal>
      </div>
    );
  }

  getAllSampleTypes() {
    axios.get(Config.ServerUri + '/get_all_sampleTypes')
    .then((res) => {
      this.setState({
        sampleTypesData: res.data
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
      sampleType: '',
      material: false,
      client: false,
      packingType: false,
      dueDate: false,
      sampleDate: false,
      sendingDate: false,
      analysisType: false,
      incomingProduct: false,
      distributor: false,
      certificateType: false,
      remark: '',
      _create: true,
      double_error: ''
    });

    this.setModal_Create(true);
  }
  
  on_update_clicked(item) {
    this.setState({
      current_id: item._id,
      sampleType: item.sampleType,
      material: item.material,
      client: item.client,
      packingType: item.packingType,
      dueDate: item.dueDate,
      sampleDate: item.sampleDate,
      sendingDate: item.sendingDate,
      analysisType: item.analysisType,
      incomingProduct: item.incomingProduct,
      distributor: item.distributor,
      certificateType: item.certificateType,
      remark: item.remark,
      _create: false,
      double_error: ''
    });

    this.setModal_Create(true);
  }

  deleteSampleType() {
    this.setModal_Delete(false);

    axios.post(Config.ServerUri + '/delete_sampleType', {
      id: this.state.current_id
    })
    .then((res) => {
      toast.success('SampleType successfully deleted');
      this.setState({
        sampleTypesData: res.data
      });
    })
    .catch((error) => {
      
    })
  }

  createSampleType(event) {
    event.preventDefault();

    if (this.state.double_error !== '') return;

    this.setModal_Create(false);

    axios.post(Config.ServerUri + '/create_sampleType', {
      sampleType: this.state.sampleType,
      material: this.state.material,
      client: this.state.client,
      packingType: this.state.packingType,
      dueDate: this.state.dueDate,
      sendingDate: this.state.sendingDate,
      sampleDate: this.state.sampleDate,
      analysisType: this.state.analysisType,
      incomingProduct: this.state.incomingProduct,
      distributor: this.state.distributor,
      certificateType: this.state.certificateType,
      remark: this.state.remark
    })
    .then((res) => {
      toast.success('SampleType successfully created');
      this.setState({
        sampleTypesData: res.data
      });
    })
    .catch((error) => {
      
    })
  }
  
  updateSampleType(event) {
    event.preventDefault();

    if (this.state.double_error !== '') return;

    this.setModal_Create(false);

    axios.post(Config.ServerUri + '/update_sampleType', {
      id: this.state.current_id,
      sampleType: this.state.sampleType,
      material: this.state.material,
      client: this.state.client,
      packingType: this.state.packingType,
      dueDate: this.state.dueDate,
      sendingDate: this.state.sendingDate,
      sampleDate: this.state.sampleDate,
      analysisType: this.state.analysisType,
      incomingProduct: this.state.incomingProduct,
      distributor: this.state.distributor,
      certificateType: this.state.certificateType,
      remark: this.state.remark
    })
    .then((res) => {
      toast.success('SampleType successfully updated');
      this.setState({
        sampleTypesData: res.data
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