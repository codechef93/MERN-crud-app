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

import Select from "react-select";
import {toast} from "react-hot-toast";

const axios = require('axios')
const Config = require('../../Config.js')

const fields = [
  {key: 'objective'},
  {key: 'units', sorter: false},
  {key: 'remark', sorter: false},
  {key: 'buttonGroups', label: '', _style: { width: '84px'}}
]

export default class AdminObjective extends Component {
  constructor(props) {
    super(props);
    this.getAllObjectives = this.getAllObjectives.bind(this);
    this.deleteObjective = this.deleteObjective.bind(this);
    this.createObjective = this.createObjective.bind(this);
    this.updateObjective = this.updateObjective.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

    this.state = {
      objectivesData: [],
      unitsData: [],
      modal_delete: false,
      modal_create: false,
      current_id: null,
      objective: '',
      units: [],
      _units: [],
      remark: '',
      _create: false,
      objective_error: '',
    }
  }

  componentDidMount() {
    this.getAllObjectives();
  }

  getUnitName(id) {
    var units = this.state.unitsData;
    for (var i = 0; i < units.length; i ++) {
      if (units[i]._id === id)
        return units[i].unit;
    }
    return '';
  }

  handleMultiSelectChange(e) {
    var units = []
    e.map((item) => {
      units.push(item.value);
      return true;
    })

    this.setState({units: units, _units: e});
  }

  getUnits(units) {
    if (units === '' || units === undefined)
      return '';

    var returnVal = '';
    units.map((item, index) => {
      var label = this.getUnitName(item);
      if (label !== '') {
        if (index < units.length - 1)
          returnVal = returnVal + label + '\n';
        else
          returnVal = returnVal + label;
      }
      
      return true;
    })

    return returnVal;
  }

  handleInputChange(e) {
    var name = e.target.name;
    var value = e.target.value;

    if (name === 'objective') {
      var found = false;
      for (var i in this.state.objectivesData) {
        var item = this.state.objectivesData[i];
        if (item.objective === value && item._id !== this.state.current_id) {
          found = true;
          break;
        }
      }

      if (found === true) {
        this.setState({objective_error: 'Value already exists'});
      }
      else this.setState({objective_error: ''});
    }

    this.setState({
      [name]: value
    })
  }

  renderModalCreate() {
    var options = [];
    this.state.unitsData.map((item) => {
      options.push({label: item.unit, value: item._id});
      return true;
    })

    var error = this.state.objective_error;

    return (
      <CCard>
        <CCardBody>
          <CForm className="was-validated" onSubmit={this.state._create === true ? this.createObjective : this.updateObjective}>
            <CFormGroup>
              <CLabel style={{fontWeight: '500'}}>Objective</CLabel>
              <CInput name="objective" value={this.state.objective} onChange={this.handleInputChange} required />
              {
                error === undefined || error === '' ? <div></div> : 
                  <div style={{width: '100%', marginTop: '0.25rem', fontSize: '80%', color: '#e55353'}}>{error}</div>
              }
            </CFormGroup>
            <CFormGroup>
              <CLabel style={{fontWeight: '500'}}>Units</CLabel>
              <Select
                isMulti
                placeholder=""
                styles={{
                  control: (base, state) => ({
                    ...base,
                    boxShadow: state.isFocused ? "0 0 0 0.2rem rgba(46, 184, 92, 0.25)" : 0,
                    borderColor: '#2eb85c',
                    '&:hover': {
                      borderColor: '#2eb85c'
                    }
                  })
                }}
                options={options}
                onChange={(e) => this.handleMultiSelectChange(e)}
                value={this.state._units}
              />
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
        <div id="tableUserTypes">
          <CDataTable
            items={this.state.objectivesData}
            fields={fields}
            itemsPerPage={50}
            itemsPerPageSelect
            sorter
            //tableFilter
            pagination
            hover
            clickableRows
            scopedSlots = {{
              'units':
                (item)=>(
                  <td style={{whiteSpace: 'pre-line'}}>
                    { this.getUnits(item.units) }
                  </td>
                ),
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
            Do you really want to delete current objective?
          </CModalBody>
          <CModalFooter>
            <CButton
              color="danger"
              onClick={() => this.deleteObjective()}
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
            <CModalTitle>{this.state._create === true ? 'Create New Objective' : 'Update Objective'}</CModalTitle>
          </CModalHeader>
          <CModalBody>
            { this.renderModalCreate() }
          </CModalBody>
        </CModal>
      </div>
    );
  }

  getAllObjectives() {
    axios.get(Config.ServerUri + '/get_all_objectives')
    .then((res) => {
      this.setState({
        objectivesData: res.data.objectives,
        unitsData: res.data.units
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
      objective: '',
      units: [],
      _units: [],
      remark: '',
      _create: true,
      objective_error: ''
    });

    this.setModal_Create(true);
  }
  
  on_update_clicked(item) {
    var units = [];
    var _units = [];

    item.units.map((item, index) => {
      var label = this.getUnitName(item);
      if (label !== '') {
        units.push(item);
        _units.push({label: label, value: item});
      }
      return true
    })

    this.setState({
      current_id: item._id,
      objective: item.objective,
      units: units,
      _units: _units,
      remark: item.remark,
      _create: false,
      objective_error: ''
    });

    this.setModal_Create(true);
  }

  deleteObjective() {
    this.setModal_Delete(false);

    axios.post(Config.ServerUri + '/delete_objective', {
      id: this.state.current_id
    })
    .then((res) => {
      toast.success("Objective successfully deleted.")
      this.setState({
        objectivesData: res.data.objectives,
        unitsData: res.data.units
      });
    })
    .catch((error) => {
      
    })
  }

  createObjective(event) {
    event.preventDefault();

    if (this.state.objective_error !== '') return;

    this.setModal_Create(false);

    axios.post(Config.ServerUri + '/create_objective', {
      objective: this.state.objective,
      units: this.state.units,
      remark: this.state.remark
    })
    .then((res) => {
      if (res.data.status === 0) {
        toast.error("Objective already exists.")
      }
      else {
        toast.success("Objective successfully created.")
        this.setState({
          objectivesData: res.data.objectives,
          unitsData: res.data.units
        });
      }
    })
    .catch((error) => {
      
    })
  }
  
  updateObjective(event) {
    event.preventDefault();

    if (this.state.objective_error !== '') return;

    this.setModal_Create(false);

    axios.post(Config.ServerUri + '/update_objective', {
      id: this.state.current_id,
      objective: this.state.objective,
      units: this.state.units,
      remark: this.state.remark
    })
    .then((res) => {
      if (res.data.status === 0) {
        toast.error("Objective already exists.")
      }
      else {
        toast.success("Objective successfully updated.")
        this.setState({
          objectivesData: res.data.objectives,
          unitsData: res.data.units
        });
      }
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