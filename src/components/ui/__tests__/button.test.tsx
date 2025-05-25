import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Button } from '../button'; // Adjust path as necessary

describe('Button Component', () => {
  test('renders button with children', () => {
    render(<Button>Click Me</Button>);
    const buttonElement = screen.getByText(/Click Me/i);
    expect(buttonElement).toBeInTheDocument();
  });

  test('applies default variant and size classes', () => {
    render(<Button>Default Button</Button>);
    const buttonElement = screen.getByText(/Default Button/i);
    // Check for a class that is part of the default variant (e.g., bg-primary)
    expect(buttonElement).toHaveClass('bg-primary'); 
    // Check for a class that is part of the default size (e.g., h-10)
    expect(buttonElement).toHaveClass('h-10');
  });

  test('applies specified variant classes', () => {
    render(<Button variant="destructive">Destructive Button</Button>);
    const buttonElement = screen.getByText(/Destructive Button/i);
    expect(buttonElement).toHaveClass('bg-destructive');
  });

  test('applies specified size classes', () => {
    render(<Button size="lg">Large Button</Button>);
    const buttonElement = screen.getByText(/Large Button/i);
    expect(buttonElement).toHaveClass('h-11'); // or 'h-12' depending on final styles
  });

  test('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Clickable</Button>);
    const buttonElement = screen.getByText(/Clickable/i);
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('renders as child when asChild prop is true', () => {
    render(
      <Button asChild>
        <a href="/test">Link Button</a>
      </Button>
    );
    const linkElement = screen.getByText(/Link Button/i);
    expect(linkElement.tagName).toBe('A');
    expect(linkElement).toHaveAttribute('href', '/test');
  });

  test('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled Button</Button>);
    const buttonElement = screen.getByText(/Disabled Button/i);
    expect(buttonElement).toBeDisabled();
  });
});
