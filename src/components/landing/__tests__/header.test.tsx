import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Header } from '../header'; // Adjust path as necessary

// Mock Next.js Link and usePathname
jest.mock('next/link', () => {
    return ({ children, href }: { children: React.ReactNode, href: string }) => {
        return <a href={href}>{children}</a>;
    };
});

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  ...jest.requireActual('lucide-react'), // Import and retain default behavior
  LayersIcon: () => <svg data-testid="layers-icon" />,
  MenuIcon: () => <svg data-testid="menu-icon" />,
}));


describe('Header Component', () => {
  const headerTexts = {
    companyName: "Aetheria Consulting",
    benefits: "Beneficios",
    process: "Proceso",
    testimonials: "Testimonios",
    about: "Nosotros",
    contactUs: "Contáctanos",
  };

  test('renders company name and logo', () => {
    render(<Header />);
    expect(screen.getByText(headerTexts.companyName)).toBeInTheDocument();
    expect(screen.getByTestId('layers-icon')).toBeInTheDocument();
  });

  test('renders navigation links for desktop', () => {
    render(<Header />);
    // Check for one of the nav items
    expect(screen.getByText(headerTexts.benefits)).toBeInTheDocument();
    expect(screen.getByText(headerTexts.process)).toBeInTheDocument();
    expect(screen.getByText(headerTexts.testimonials)).toBeInTheDocument();
    expect(screen.getByText(headerTexts.about)).toBeInTheDocument();
  });

  test('renders Contáctanos button', () => {
    render(<Header />);
    const contactButton = screen.getByRole('button', { name: headerTexts.contactUs });
    expect(contactButton).toBeInTheDocument();
  });

  // Note: Testing Sheet (mobile menu) behavior might require more complex setup 
  // or specific testing utilities for Radix UI components if testing interactions.
  // For a basic render test, we can check if the trigger is there.
  test('renders mobile menu trigger', () => {
    render(<Header />);
    const mobileMenuTrigger = screen.getByLabelText(/Alternar menú/i);
    expect(mobileMenuTrigger).toBeInTheDocument();
    expect(screen.getByTestId('menu-icon')).toBeInTheDocument();
  });
});
