import React from 'react';
import { render } from '@testing-library/react';
import ProductList from './ProductList';

test('renders the ProductList', () => {
  const { getByText } = render(<ProductList />);
  const linkElement = getByText(/Wisenet/i);
  expect(linkElement).toBeInTheDocument();
});
