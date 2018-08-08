import React from 'react';
import styled from 'styled-components';

import Colors from '../styles/colors';

const TextContainer = styled.div`
  padding: 0 40px;
  border-bottom: 2px solid ${Colors.$green};
  
  h3 {
    color: ${Colors.$gray};
    font-weight: 100;
    font-size: 15px;
    line-height: 20px;
  }
`;

const itemText = ({category}) => {
  return(
    <TextContainer>
      <h3 className="mdl-typography--title">
        The {category} attribute type describes attributes that are important for applications - such as name.
        This attribute type cannot be changed from the device and has NO DeviceDataType or LWM2M resource ID.
        This attribute type can only be changed through the Applications API by doing a PUT on the Avatar
        which will update the Avatar immediately and NO device Job will be created.
      </h3>
    </TextContainer>
  );
};

export default itemText;
