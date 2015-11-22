import React, { Component }  from 'react'
import AdminUser from './AdminUser'
import AdminObjective from './AdminObjective'
import AdminPackingType from './AdminPackingType'
import AdminCertificateType from './AdminCertificateType'
import AdminAnalysisType from './AdminAnalysisType'
import AdminSampleType from './AdminSampleType'
import AdminUserType from './AdminUserType'
import AdminMaterial from './AdminMaterial'
import AdminUnit from './AdminUnit'
import AdminClient from './AdminClient'

import {Toaster} from "react-hot-toast";

import {
  CCol,
  CNav,
  CNavItem,
  CNavLink,
  CRow,
  CTabContent,
  CTabPane,
  CCard,
  CCardBody,
  CTabs,
} from '@coreui/react'

import './style.css';

export default class Administration extends Component {
  constructor(props) {
    super(props)
    this.state = {
      current_tab: 0,
    }
  }

  on_tab_clicked(e, tab) {
    e.preventDefault();
    this.setState({
      current_tab: tab
    })
  }

  render() {
    return (
      <CRow>
        <CCol xs="12" md="12">
          <CCard>
            <CCardBody>
              <CTabs>
                <CNav variant="tabs">
                  <CNavItem>
                    <CNavLink onClick={(e) => this.on_tab_clicked(e, 0)}>
                      Users
                    </CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink onClick={(e) => this.on_tab_clicked(e, 1)}>
                      User Types
                    </CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink onClick={(e) => this.on_tab_clicked(e, 2)}>
                      Sample Types
                    </CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink onClick={(e) => this.on_tab_clicked(e, 3)}>
                      Material
                    </CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink onClick={(e) => this.on_tab_clicked(e, 4)}>
                      Analysis Types
                    </CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink onClick={(e) => this.on_tab_clicked(e, 5)}>
                      Objectives
                    </CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink onClick={(e) => this.on_tab_clicked(e, 6)}>
                      Packing Types
                    </CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink onClick={(e) => this.on_tab_clicked(e, 7)}>
                      Certificate Types
                    </CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink onClick={(e) => this.on_tab_clicked(e, 8)}>
                      Unit Types
                    </CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink onClick={(e) => this.on_tab_clicked(e, 9)}>
                      Clients
                    </CNavLink>
                  </CNavItem>
                </CNav>
                <CTabContent>
                  <CTabPane>
                    {this.state.current_tab !== 0 ? <div /> : <AdminUser />}
                  </CTabPane>
                  <CTabPane>
                  {this.state.current_tab !== 1 ? <div /> : <AdminUserType />}
                  </CTabPane>
                  <CTabPane>
                    {this.state.current_tab !== 2 ? <div /> : <AdminSampleType />}
                  </CTabPane>
                  <CTabPane>
                    {this.state.current_tab !== 3 ? <div /> : <AdminMaterial />}
                  </CTabPane>
                  <CTabPane>
                    {this.state.current_tab !== 4 ? <div /> : <AdminAnalysisType />}
                  </CTabPane>
                  <CTabPane>
                    {this.state.current_tab !== 5 ? <div /> : <AdminObjective />}
                  </CTabPane>
                  <CTabPane>
                    {this.state.current_tab !== 6 ? <div /> : <AdminPackingType />}
                  </CTabPane>
                  <CTabPane>
                    {this.state.current_tab !== 7 ? <div /> : <AdminCertificateType />}
                  </CTabPane>
                  <CTabPane>
                    {this.state.current_tab !== 8 ? <div /> : <AdminUnit />}
                  </CTabPane>
                  <CTabPane>
                    {this.state.current_tab !== 9 ? <div /> : <AdminClient />}
                  </CTabPane>
                </CTabContent>
              </CTabs>
            </CCardBody>
          </CCard>
        </CCol>
        <Toaster
          position="top-right"
          reverseOrder={true}
        />
      </CRow>
    )
  }
}