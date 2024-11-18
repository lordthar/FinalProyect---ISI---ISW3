import HomePage from '@/app/page';
import { render, screen } from '@testing-library/react';

it("render home page", () => {
    render(<HomePage/>)

    expect(screen.getByText('Matricúlate en el Instituto de Seguridad Integral')).toBeInTheDocument()
});

it("should render nav bar in home page", () => {
    render(<HomePage/>)

    expect(screen.getByText('Accede Alumno')).toBeInTheDocument()
});

it("should render home page 'matriculate en ISI'", () => {
    render(<HomePage/>)

    expect(screen.getByText('Matriculate en ISI')).toBeInTheDocument()
});

it("should render home '¿Eres auxiliar?'", () => {
    render(<HomePage/>)

    expect(screen.getByText('¿Eres Auxiliar?')).toBeInTheDocument()
});