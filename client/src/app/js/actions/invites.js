import 'whatwg-fetch';
import _ from 'lodash';
import { push } from 'react-router-redux';

import { API_URL } from './index';
import {resetError} from './error';


import {
  ERROR,
  GET_INVITES_FOR_PARTY,
  CREATE_INVITE,
  GET_INVITE,
  ACCEPT_INVITE,
  REJECT_INVITE
} from './constants';


export function getInvite(id) {
  const query = { "query":
    `{
      invite(id: "${id}")
      {
        id,
        childName,
        inviteStatus
        partyId
      }
    }`
  };


  return (dispatch) => fetch(`${API_URL}/data/`, {
    method: 'POST',
    body: JSON.stringify(query)
  })
  .then(response => response.json())
  .then(json => dispatch({
    type: GET_INVITE,
    payload: json
  }))
  .catch(exception => dispatch({
    type: ERROR,
    payload: exception.message
  }));
}


export function getInvitesForParty(partyId) {


  const query = { "query":
    `{
      invites_for_party(partyId: "${partyId}")
      {
        id,
        childName,
        mobileNumber,
        inviteStatus
      }
    }`
  };

  return (dispatch) => fetch(`${API_URL}/data/`, {
    method: 'POST',
    body: JSON.stringify(query)
  })
  .then(response => response.json())
  .then(json => dispatch({
    type: GET_INVITES_FOR_PARTY,
    payload: json
  }))
  .catch(exception => dispatch({
    type: ERROR,
    payload: exception.message
  }));
}

export function createInvite(invite, partyId) {
  const query = { "query":
      `mutation createNewInvite {
      invite: createInvite (
        childName: "${invite.childName}",
        mobileNumber: "${invite.mobileNumber}",
        partyId: "${partyId}"
      )
      {
        id,
        childName,
        mobileNumber,
        inviteStatus
      }
    }`
  };

  return (dispatch) => fetch(`${API_URL}/data/`, {
    method: 'POST',
    body: JSON.stringify(query)
  })
  .then(response => response.json())
  .then(json => dispatch({
    type: CREATE_INVITE,
    payload: json
  }))
  .catch(exception => dispatch({
    type: ERROR,
    payload: exception.message
  }));
}

export function acceptInvite(id) {
  const query = { "query":
      `mutation acceptInvite {
      invite: acceptInvite (
        inviteId: "${id}"
      )
      {
        id,
        childName,
        inviteStatus
      }
    }`
  };

  return (dispatch) => fetch(`${API_URL}/data/`, {
    method: 'POST',
    body: JSON.stringify(query)
  })
  .then(response => response.json())
  .then(json => dispatch({
    type: ACCEPT_INVITE,
    payload: json
  }))
  .catch(exception => dispatch({
    type: ERROR,
    payload: exception.message
  }));
}

export function rejectInvite(id) {
  const query = { "query":
      `mutation rejectInvite {
      invite: rejectInvite (
        inviteId: "${id}"
      )
      {
        id,
        childName,
        inviteStatus
      }
    }`
  };

  return (dispatch) => fetch(`${API_URL}/data/`, {
    method: 'POST',
    body: JSON.stringify(query)
  })
  .then(response => response.json())
  .then(json => dispatch({
    type: REJECT_INVITE,
    payload: json
  }))
  .catch(exception => dispatch({
    type: ERROR,
    payload: exception.message
  }));
}
