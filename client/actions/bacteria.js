import {
    SELECT_DATA,
    CHANGE_DATA,
    WAITING_ADD,
    WAITING_DEL,
    WAITING_RUN
} from './actionTypes';
import axios from 'axios';

/*============================================================================
    DATA 관리 actions
==============================================================================*/

export function selectData(idx) {
  return {
    type: SELECT_DATA,
    idx
  };
}

export function loadDataRequest() {
  return (dispatch) => {
    return axios.get('/api/data')
    .then((res) => {
      if (res.data.succ) {
        if (res.data.data.length > 0) {
          res.data.data.forEach((bacterium) => {
            bacterium.chart_data = [];
            bacterium.peaks.forEach((peak) => {
              bacterium.chart_data.push([peak.mz, peak.intensity, 'black']);
            });
            bacterium.chart_data.unshift(['Distance', 'Density', { role: 'style' }])
          });
        }
        else {
          res.data.data = [{
            bac_id: 'No data',
            chart_data:[]}];
        }
        console.log(res.data.data);
        dispatch(changeData(res.data.data));
      }
      else {
        console.log(res.data);
        console.log('something\'s wrong');
      }
    }).catch((err) => {
      console.log('error occured');
    });
  }
}

export function addDataRequest(data) {
  return (dispatch) => {
    dispatch(changeAddStatus(true));
    console.log('sent data', data);
    return axios.post(
      '/api/data',
      data
    )
    .then((res) => {
      console.log(res.data);
      dispatch(loadDataRequest());
      dispatch(changeAddStatus(false));
    })
  }
}

export function changeAddStatus(state) {
  return {
    type: WAITING_ADD,
    state
  }
}

export function delDataRequest(bac_id) {
  return (dispatch) => {
    dispatch(changeDelStatus(true));
    return axios.delete(
      '/api/data/' + bac_id
    )
    .then((res) => {
      console.log(res.data);
      dispatch(loadDataRequest());
      dispatch(changeDelStatus(false));
    })
  }
}

export function changeDelStatus(state) {
  return {
    type: WAITING_DEL,
    state
  }
}

export function runRequest() {
  return (dispatch) => {
    dispatch(changeRunStatus(true));
    return axios.get(
      '/api/run'
    )
    .then((res) => {
      console.log(res.data);
      dispatch(loadDataRequest());
      dispatch(changeRunStatus(false));
    })
  }
}

export function changeRunStatus(state) {
  return {
    type: WAITING_RUN,
    state
  }
}

export function changeData(state) {
  return {
    type: CHANGE_DATA,
    state
  }
}
