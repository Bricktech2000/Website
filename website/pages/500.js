import React, { Component } from 'react';
import Error from '../private/structure/Error';

//https://nextjs.org/docs/advanced-features/custom-error-page

export default function Error500() {
  return <Error status={'500'} />;
}
