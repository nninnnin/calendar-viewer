import React from 'react';
import * as Styled from '../styled';

export default function Modal () {

  return (
    <>
      <Styled.Overlay />
      <Styled.Modal>
        <div>모달입니다..</div>
      </Styled.Modal>
    </>
  );
}
