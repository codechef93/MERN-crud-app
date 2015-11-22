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
  CSelect,
  CForm,
  CFormGroup,
  CValidFeedback,
  CInvalidFeedback,
  CLabel,
  CInput
} from '@coreui/react'

import Select from "react-select";
import {toast} from "react-hot-toast";

const axios = require('axios')
const Config = require('../../Config.js')

const fields = [
  {key: 'analysisType'},
  {key: 'labType'},
  {key: 'objectives', sorter: false},
  {key: 'remark', sorter: false},
  {key: 'buttonGroups', label: '', _style: { width: '84px'}}
]

export default class AdminAnalysisType extends Component {
  constructor(props) {
    super(props);
    this.getAllAnalysisTypes = this.getAllAnalysisTypes.bind(this);
    this.deleteAnalysisType = this.deleteAnalysisType.bind(this);
    this.createAnalysisType = this.createAnalysisType.bind(this);
    this.updateAnalysisType = this.updateAnalysisType.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

    this.state = {
      analysisTypesData: [],
      objectivesData: [],
      unitsData: [],
      modal_delete: false,
      modal_create: false,
      current_id: null,
      analysisType: '',
      labType: '',
      objectives: [],
      _objectives: [],
      remark: '',
      _create: false,
      double_error: '',
    }
  }

  componentDidMount() {
    this.getAllAnalysisTypes();
  }

  getLabType(userType) {
    switch (userType) {
      case 0: return 'Physical'
      case 1: return 'Chemical'
      default: return 'Other'
    }
  }

  getObjectiveName(id) {
    var objectives = this.state.objectivesData;
    for (var i = 0; i < objectives.length; i ++) {
      if (objectives[i]._id === id)
        return objectives[i].objective;
    }
    return '';
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
    var objectives = []
    e.map((item) => {
      var ids = item.value.split('-');
      objectives.push({id: ids[0], unit: ids[1]});
      return true;
    })

    this.setState({objectives: objectives, _objectives: e});
  }

  getObjectives(objectives) {
    if (objectives === '' || objectives === undefined)
      return '';

    var returnVal = '';
    objectives.map((item, index) => {
      var name = this.getObjectiveName(item.id);
      var unit = this.getUnitName(item.unit);
      if (name !== '' && unit !== '') {
        returnVal = returnVal + name + ' ' + unit + '\n';
      }
      
      return true;
    })

    return returnVal;
  }

  handleInputChange(e) {
    var name = e.target.name;
    var value = e.target.value;

    if (name === 'analysisType') {
      var found = false;
      for (var i in this.state.analysisTypesData) {
        var item = this.state.analysisTypesData[i];
        if (item.analysisType === value && item._id !== this.state.current_id) {
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
    var objOptions = [];
    this.state.objectivesData.map((item) => { // options for objective multi-select
      item.units.map((item0) => {
        var unit = this.getUnitName(item0);
        if (unit !== '')
          objOptions.push({label: item.objective + ' ' + unit, value: item._id + '-' + item0});

        return true;
      })
      return true;
    })

    var error = this.state.double_error;

    return (
      <CCard>
        <CCardBody>
          <CForm className="was-validated" onSubmit={this.state._create === true ? this.createAnalysisType : this.updateAnalysisType}>
            <CFormGroup>
              <CLabel style={{fontWeight: '500'}}>Analysis Type</CLabel>
              <CInput name="analysisType" value={this.state.analysisType} onChange={this.handleInputChange} required />
              {
                error === undefined || error === '' ? <div></div> : 
                  <div style={{width: '100%', marginTop: '0.25rem', fontSize: '80%', color: '#e55353'}}>{error}</div>
              }
            </CFormGroup>
            <CFormGroup>
              <CLabel style={{fontWeight: '500'}}>Lab Type</CLabel>
              <CSelect custom name="labType" value={this.state.labType} onChange={this.handleInputChange} required >
                <option value="" disabled></option>
                <option value="0">Physical</option>
                <option value="1">Chemical</option>
                <option value="2">Other</option>
              </CSelect>
              <CInvalidFeedback className="help-block">
                Please provide a valid information
              </CInvalidFeedback>
              <CValidFeedback className="help-block">Input provided</CValidFeedback>
            </CFormGroup>
            <CFormGroup>
              <CLabel style={{fontWeight: '500'}}>Objectives</CLabel>
              <Select
                isMulti
                placeholder=""
                styles={{
                  control: (base, state) => ({
                    ...base,
                    boxShadow: state.isFocused ? "0 0 0 0.2rem rgba(46, 184, 92, 0.25)" : 0,
                    /*borderColor: state.isFocused
                      ? '#46beed'
                      : base.borderColor,*/
                    borderColor: '#2eb85c',
                    '&:hover': {
                      /*borderColor: state.isFocused
                        ? '#46beed'
                        : base.borderColor,*/
                      borderColor: '#2eb85c'
                    }
                  })
                }}
                options={objOptions}
                onChange={(e) => this.handleMultiSelectChange(e)}
                value={this.state._objectives}
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
            items={this.state.analysisTypesData}
            fields={fields}
            itemsPerPage={50}
            itemsPerPageSelect
            sorter
            //tableFilter
            pagination
            hover
            clickableRows
            scopedSlots = {{
              'labType':
                (item)=>(
                  <td>
                    { this.getLabType(item.labType) }
                  </td>
                ),
              'objectives':
                (item)=>(
                  <td style={{whiteSpace: 'pre-line'}}>
                    { this.getObjectives(item.objectives) }
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
            Do you really want to delete current analysis type?
          </CModalBody>
          <CModalFooter>
            <CButton
              color="danger"
              onClick={() => this.deleteAnalysisType()}
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
            <CModalTitle>{this.state._create === true ? 'Create New Analysis Type' : 'Update Analysis Type'}</CModalTitle>
          </CModalHeader>
          <CModalBody>
            { this.renderModalCreate() }
          </CModalBody>
        </CModal>
      </div>
    );
  }

  getAllAnalysisTypes() {
    axios.get(Config.ServerUri + '/get_all_analysisTypes')
    .then((res) => {
      this.setState({
        analysisTypesData: res.data.analysisTypes,
        objectivesData: res.data.objectives,
        unitsData: res.data.units,
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
      analysisType: '',
      labType: '',
      objectives: [],
      _objectives: [],
      remark: '',
      _create: true,
      double_error: ''
    });

    this.setModal_Create(true);
  }
  
  on_update_clicked(item) {
    var objectives = [];
    var _objectives = [];

    item.objectives.map((item, index) => {
      var label = this.getObjectiveName(item.id);
      var unit = this.getUnitName(item.unit);
      if (label !== '' && unit !== '') {
        objectives.push(item);
        _objectives.push({label: label + ' ' + unit, value: item.id + '-' + item.unit});
      }
      return true
    })

    this.setState({
      current_id: item._id,
      analysisType: item.analysisType,
      labType: item.labType,
      objectives: objectives,
      _objectives: _objectives,
      remark: item.remark,
      _create: false,
      double_error: ''
    });

    this.setModal_Create(true);
  }

  deleteAnalysisType() {
    this.setModal_Delete(false);

    axios.post(Config.ServerUri + '/delete_analysisType', {
      id: this.state.current_id
    })
    .then((res) => {
      toast.success('AnalysisType successfully deleted');
      this.setState({
        analysisTypesData: res.data.analysisTypes,
        objectivesData: res.data.objectives,
        unitsData: res.data.units,
      });
    })
    .catch((error) => {
      
    })
  }

  createAnalysisType(event) {
    event.preventDefault();

    if (this.state.double_error !== '') return;

    this.setModal_Create(false);

    axios.post(Config.ServerUri + '/create_analysisType', {
      analysisType: this.state.analysisType,
      labType: this.state.labType,
      objectives: this.state.objectives,
      remark: this.state.remark
    })
    .then((res) => {
      toast.success('AnalysisType successfully created');
      this.setState({
        analysisTypesData: res.data.analysisTypes,
        objectivesData: res.data.objectives,
        unitsData: res.data.units,
      });
    })
    .catch((error) => {
      
    })
  }
  
  updateAnalysisType(event) {
    event.preventDefault();

    if (this.state.double_error !== '') return;

    this.setModal_Create(false);

    axios.post(Config.ServerUri + '/update_analysisType', {
      id: this.state.current_id,
      analysisType: this.state.analysisType,
      labType: this.state.labType,
      objectives: this.state.objectives,
      remark: this.state.remark
    })
    .then((res) => {
      toast.success('AnalysisType successfully updated');
      this.setState({
        analysisTypesData: res.data.analysisTypes,
        objectivesData: res.data.objectives,
        unitsData: res.data.units,
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