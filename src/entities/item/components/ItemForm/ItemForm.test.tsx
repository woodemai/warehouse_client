import { test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ItemForm } from './ItemForm'
import { FormState } from '@/shared/consts/formState'
import "@testing-library/jest-dom";


test("button should be in the document", () => {
    const { container } = render(<ItemForm formState={FormState.CREATE} />);
    expect(container).toMatchSnapshot();
    expect(screen.getByTestId(/open-form-button/i)).toBeInTheDocument();
});