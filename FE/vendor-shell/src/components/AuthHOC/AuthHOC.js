import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

function AuthHoc({ children, userToken }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!userToken) {
      navigate('/auth', { replace: true });
    }
  });

  if (!userToken) {
    return null;
  }

  return children;
}

// export default connect(mapStateToProps, mapDispatchProps)(AuthHoc);

export default AuthHoc;
