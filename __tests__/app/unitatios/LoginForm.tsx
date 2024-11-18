import Matricula from '@/app/matricula/page';
import { render, screen } from '@testing-library/react';

it("renders login form", () => {
    render(<Matricula/>)

    expect(screen.getByText('Volver atrás')).toBeInTheDocument()
});

it("should render 'Matricúlate'", () => {
    render(<Matricula/>)

    expect(screen.getByText('Matricúlate')).toBeInTheDocument()
});

it("should render 'Nombre'", () => {
    render(<Matricula/>)

    expect(screen.getByRole("button", {
        name: /matriculate/i
    })).toBeInTheDocument()
});