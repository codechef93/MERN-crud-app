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

import {toast} from "react-hot-toast";

const axios = require('axios')
const Config = require('../../Config.js')

const fields = [
  {key: 'userName'},
  {key: 'email', sorter: false},
  {key: 'password', sorter: false},
  {key: 'userType'},
  {key: 'remark', sorter: false},
  {key: 'buttonGroups', label: '', _style: { width: '84px'}}
]

export default class AdminUser extends Component {
  constructor(props) {
    super(props);
    this.getAllUsers = this.getAllUsers.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.createUser = this.createUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

    this.state = {
      usersData: [],
      userTypesData: [],
      modal_delete: false,
      modal_create: false,
      current_id: null,
      userName: '',
      password: '',
      email: '',
      userType: 0,
      remark: '',
      _create: false,
      double_error: '',
    }
  }

  componentDidMount() {
    this.getAllUsers();
  }

  getUserType(userType) {
    var result = 'Unknown';
    this.state.userTypesData.map((item, i) => {
      if (item._id === userType)
        result = item.userType;
      return true;
    })
    return result;
  }

  handleInputChange(e) {
    var name = e.target.name;
    var value = e.target.value;

    if (name === 'userName') {
      var found = false;
      for (var i in this.state.usersData) {
        var item = this.state.usersData[i];
        if (item.userName === value && item._id !== this.state.current_id) {
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
          <CForm className="was-validated" onSubmit={this.state._create === true ? this.createUser : this.updateUser}>
            <CFormGroup>
              <CLabel style={{fontWeight: '500'}}>User Name</CLabel>
              <CInput name="userName" value={this.state.userName} onChange={this.handleInputChange} required />
              {
                error === undefined || error === '' ? <div></div> : 
                  <div style={{width: '100%', marginTop: '0.25rem', fontSize: '80%', color: '#e55353'}}>{error}</div>
              }
            </CFormGroup>
            <CFormGroup>
              <CLabel style={{fontWeight: '500'}}>Email</CLabel>
              <CInput name="email" type="email" value={this.state.email} onChange={this.handleInputChange} autoComplete="username" />
              <CInvalidFeedback className="help-block">
                Please provide a valid information
              </CInvalidFeedback>
              <CValidFeedback className="help-block">Input provided</CValidFeedback>
            </CFormGroup>
            <CFormGroup>
              <CLabel style={{fontWeight: '500'}}>Password</CLabel>
              <CInput name="password" value={this.state.password} onChange={this.handleInputChange} required />
              <CInvalidFeedback className="help-block">
                Please provide a valid information
              </CInvalidFeedback>
              <CValidFeedback className="help-block">Input provided</CValidFeedback>
            </CFormGroup>
            <CFormGroup>
              <CLabel style={{fontWeight: '500'}}>User Type</CLabel>
              <CSelect custom name="userType" value={this.state.userType} onChange={this.handleInputChange} required >
                <option value="" disabled></option>
                {
                  this.state.userTypesData.map((item, i) => {
                    return <option key={i} value={item._id}>{item.userType}</option>
                  })
                }
              </CSelect>
              <CInvalidFeedback className="help-block">
                Please provide a valid information
              </CInvalidFeedback>
              <CValidFeedback className="help-block">Input provided</CValidFeedback>
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
            items={this.state.usersData}
            fields={fields}
            itemsPerPage={50}
            itemsPerPageSelect
            sorter
            //tableFilter
            pagination
            hover
            clickableRows
            scopedSlots = {{
              'userType':
                (item)=>(
                  <td>
                    { this.getUserType(item.userType) }
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
            Do you really want to delete current user?
          </CModalBody>
          <CModalFooter>
            <CButton
              color="danger"
              onClick={() => this.deleteUser()}
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
            <CModalTitle>{this.state._create === true ? 'Create New User' : 'Update User'}</CModalTitle>
          </CModalHeader>
          <CModalBody>
            { this.renderModalCreate() }
          </CModalBody>
        </CModal>
      </div>
    );
  }

  getAllUsers() {
    axios.get(Config.ServerUri + '/get_all_users')
    .then((res) => {
      this.setState({
        usersData: res.data.users,
        userTypesData: res.data.userTypes,
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
      userName: '',
      email: '',
      password: '',
      userType: '',
      remark: '',
      _create: true,
      double_error: ''
    });

    this.setModal_Create(true);
  }
  
  on_update_clicked(item) {
    this.setState({
      current_id: item._id,
      userName: item.userName,
      email: item.email,
      password: item.password,
      userType: item.userType,
      remark: item.remark,
      _create: false,
      double_error: ''
    });

    this.setModal_Create(true);
  }

  deleteUser() {
    this.setModal_Delete(false);

    axios.post(Config.ServerUri + '/delete_user', {
      id: this.state.current_id
    })
    .then((res) => {
      toast.success('User successfully deleted');
      this.setState({
        usersData: res.data.users,
        userTypesData: res.data.userTypes,
      });
    })
    .catch((error) => {
      
    })
  }

  createUser(event) {
    event.preventDefault();

    if (this.state.double_error !== '') return;

    this.setModal_Create(false);

    axios.post(Config.ServerUri + '/create_user', {
      userName: this.state.userName,
      email: this.state.email,
      password: this.state.password,
      userType: this.state.userType,
      remark: this.state.remark
    })
    .then((res) => {
      toast.success('User successfully created');
      this.setState({
        usersData: res.data.users,
        userTypesData: res.data.userTypes,
      });
    })
    .catch((error) => {
      
    })
  }
  
  updateUser(event) {
    event.preventDefault();

    if (this.state.double_error !== '') return;

    this.setModal_Create(false);

    axios.post(Config.ServerUri + '/update_user', {
      id: this.state.current_id,
      userName: this.state.userName,
      email: this.state.email,
      password: this.state.password,
      userType: this.state.userType,
      remark: this.state.remark
    })
    .then((res) => {
      toast.success('User successfully updated');
      this.setState({
        usersData: res.data.users,
        userTypesData: res.data.userTypes,
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