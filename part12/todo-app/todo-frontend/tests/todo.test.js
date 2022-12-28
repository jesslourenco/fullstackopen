import React from 'react';
import '@testing-library/jest-dom';
// import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
// import Todo from '../src/Todos/Todo';
import Fetch from './fetch'

test('loads and display info on a todo', () => {
    render(<Fetch url="/todo/63abaa9cf493ea30d0b7aa7d" />)
    expect(screen).toHaveTextContent('63abaa9cf493ea30d0b7aa7d')
})