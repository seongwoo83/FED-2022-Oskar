import { render, screen } from '@testing-library/react';
// import App from './App';
import Test from './test';

test('renders learn react link', () => {
  render(<Test />);
  const linkElement = screen.getByText(/나야나/i);
  expect(linkElement).toBeInTheDocument();
});
