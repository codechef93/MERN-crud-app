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
  CInput
} from '@coreui/react'

import {toast} from "react-hot-toast";

const axios = require('axios')
const Config = require('../../Config.js')

const fields = [
  {key: 'unit', _style: {width: '25%'}}, 
  {key: 'remark', sorter: false},
  {key: 'buttonGroups', label: '', _style: { width: '84px'}}
]

export default class AdminUnit extends Component {
  constructor(props) {
    super(props);
    this.getAllUnits = this.getAllUnits.bind(this);
    this.deleteUnit = this.deleteUnit.bind(this);
    this.createUnit = this.createUnit.bind(this);
    this.updateUnit = this.updateUnit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

    this.state = {
      unitsData: [],
      modal_delete: false,
      modal_create: false,
      current_id: null,
      unit: '',
      remark: '',
      _create: false,
      double_error: '',
    }
  }

  componentDidMount() {
    this.getAllUnits();
  }

  handleInputChange(e) {
    var name = e.target.name;
    var value = e.target.value;

    if (name === 'unit') {
      var found = false;
      for (var i in this.state.unitsData) {
        var item = this.state.unitsData[i];
        if (item.unit === value && item._id !== this.state.current_id) {
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

  renderModalCreate() {
    var error = this.state.double_error;

    return (
      <CCard>
        <CCardBody>
          <CForm className="was-validated" onSubmit={this.state._create === true ? this.createUnit : this.updateUnit}>
            <CFormGroup>
              <CLabel style={{fontWeight: '500'}}>Unit</CLabel>
              <CInput name="unit" value={this.state.unit} onChange={this.handleInputChange} required />
              {
                error === undefined || error === '' ? <div></div> : 
                  <div style={{width: '100%', marginTop: '0.25rem', fontSize: '80%', color: '#e55353'}}>{error}</div>
              }
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
        <div>
          <CDataTable
            items={this.state.unitsData}
            fields={fields}
            itemsPerPage={50}
            itemsPerPageSelect
            sorter
            //tableFilter
            pagination
            hover
            clickableRows
            scopedSlots = {{
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
            Do you really want to delete current unit?
          </CModalBody>
          <CModalFooter>
            <CButton
              color="danger"
              onClick={() => this.deleteUnit()}
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
            <CModalTitle>{this.state._create === true ? 'Create New Unit' : 'Update Unit'}</CModalTitle>
          </CModalHeader>
          <CModalBody>
            { this.renderModalCreate() }
          </CModalBody>
        </CModal>
      </div>
    );
  }

  getAllUnits() {
    axios.get(Config.ServerUri + '/get_all_units')
    .then((res) => {
      this.setState({
        unitsData: res.data
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
      unit: '',
      remark: '',
      _create: true,
      double_error: ''
    });

    this.setModal_Create(true);
  }
  
  on_update_clicked(item) {
    this.setState({
      current_id: item._id,
      unit: item.unit,
      remark: item.remark,
      _create: false,
      double_error: ''
    });

    this.setModal_Create(true);
  }

  deleteUnit() {
    this.setModal_Delete(false);

    axios.post(Config.ServerUri + '/delete_unit', {
      id: this.state.current_id
    })
    .then((res) => {
      toast.success('Unit successfully deleted');
      this.setState({
        unitsData: res.data
      });
    })
    .catch((error) => {
      
    })
  }

  createUnit(event) {
    event.preventDefault();

    if (this.state.double_error !== '') return;

    this.setModal_Create(false);

    axios.post(Config.ServerUri + '/create_unit', {
      unit: this.state.unit,
      remark: this.state.remark
    })
    .then((res) => {
      toast.success('Unit successfully created');
      this.setState({
        unitsData: res.data
      });
    })
    .catch((error) => {
      
    })
  }
  
  updateUnit(event) {
    event.preventDefault();

    if (this.state.double_error !== '') return;

    this.setModal_Create(false);

    axios.post(Config.ServerUri + '/update_unit', {
      id: this.state.current_id,
      unit: this.state.unit,
      remark: this.state.remark
    })
    .then((res) => {
      toast.success('Unit successfully updated');
      this.setState({
        unitsData: res.data
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