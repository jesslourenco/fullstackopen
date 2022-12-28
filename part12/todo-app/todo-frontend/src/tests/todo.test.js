import React from 'react';
import '@testing-library/jest-dom';
// import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import Todo from '../Todos/Todo';

beforeEach(() => {
    const todo = {
      id: '5a422a851b54a676234d17f7',
      text: 'Lorem ipsum',
      done: false,
    };

    const onClickComplete = jest.fn()
    const onClickDelete = jest.fn()
  
    render(<Todo todo={todo} onClickComplete={onClickComplete} onClickDelete={onClickDelete} />);
  });

test('content is redered correctly', () => {
    expect(screen.getByText(/Lorem ipsum/)).toBeDefined()
    expect(screen.getByText(/This todo is not done/)).toBeDefined()
})


