import React from 'react';
import { Alert } from 'react-bootstrap';

class Notice extends React.Component {
  render() {
    return (
      <Alert bsStyle="warning">
        <strong>Version 0.0.1 : </strong> 기본적인 Load 기능이 구현되었습니다. <br/>
        <strong>Version 0.0.2 : </strong> 기본적인 Data 로드 및 프로세스 실행이 구현되었습니다. <br/>
        <strong>TODO          : </strong> Marker 관련 기능은 구현되지 않았습니다.
      </Alert>
    );
  }
}

export default Notice;
