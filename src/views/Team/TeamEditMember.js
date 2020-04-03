import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table, Form, Input, Label, FormGroup } from 'reactstrap';


import {TeamData, SetTeamData} from './TeamData'
import { teamList, updateMember, fetchUserDetails } from './UserFunctions';

class TeamEditMember extends Component {
  state={
    member: {
      teamid: '',
      firstname: '',
      lastname: '',
      email: '',
      mobileno:'',
      role:'',
      address: '',
      status: '',
      Joining_Date:'',
    },
    // teamDetails: []
  }


  async componentDidMount() {
    // console.log(Date.now())
    const dataRecieved = await teamList()
    SetTeamData(dataRecieved)
    const team = TeamData.find( team => team.teamid.toString() === this.props.match.params.id)
    console.log(team)
    // const teamDetails = team ? Object.entries(team) : [['id', (<span><i className="text-muted icon-ban"></i> Not found</span>)]]

    const member = this.state.member
    
    Object.keys(team).forEach(o => {
      member[o] = team[o]
      // teamDetails
    })
    this.setState({member})

  }

  onChange = (e) => {
    const val = e.target.value
    const member = this.state.member
    member[e.target.name] = val
    this.setState({member})
  }

  handleSubmit=(e)=> {
    e.preventDefault();
    updateMember(this.state.member) 
  }


  render() {

 
    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={12}>
            <Card>
              <CardHeader>
                <strong><i className="icon-info pr-1"></i>Team id: {this.props.match.params.id}</strong>
              </CardHeader>
              <CardBody>
                <form onSubmit={this.onSubmit}>
                  <div className="row">


                    { this.state.member.email!=='' ?
                      Object.keys(this.state.member).map(o => {
                        return (<div className="col-md-4">
                        <FormGroup>
                            <Label htmlFor="first name">{o}</Label>
                            <Input type="text" id="first name" placeholder="First name" name={o} disabled={
                              (o=='Joining_Date' || o=='email' || o=='teamid') ? true:false
                              } value={this.state.member[o]} onChange={this.onChange}/>
                            <div style={{fontSize: 10, color: "red"}}>
                              {this.state.first_nameError}
                            </div>
                        </FormGroup>
                        </div>)
                      }): ""
                    }
                      {/* {this.state.teamDetails.map(([key,value])=> {
                        return (
                         
                        )})
                      } */}
                      </div>
                      <button 
                      className="btn btn-outline-primary btn-sm "
                      onClick={this.handleSubmit}
                    >
                      <a className="createTeamBtn"style={{color:"#20a8d8"}} href="/team/add-member">
                      Update Details
                      </a>
                    </button>
                    </form>
              </CardBody>
                    
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default TeamEditMember;
