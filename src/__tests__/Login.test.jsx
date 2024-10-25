import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Login from '../Pages/Auth/Login';
import store from '../Store/store';

test('renders head line', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </Provider>
  );

  expect(screen.getByText(/Login/i)).toBeInTheDocument();
});
test('renders email field', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </Provider>
  );

  expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
});
test('renders password field', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </Provider>
  );
  expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();  
});
test('renders login button', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </Provider>
  );

  expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
});
