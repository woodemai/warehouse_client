import { describe, test, expect,beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ItemForm } from './ItemForm'
import { FormState } from '@/shared/consts/formState'


describe("Item form test", () => {
    beforeEach( async () => {
        await render(<ItemForm formState={FormState.CREATE} />);
    });

    test("button should be defined", () => {
        expect(screen.getByTestId(/open-form-button/i)).toBeDefined();
    });
    test("when clicked, modal should appear", () => {
        const openButton = screen.getByTestId(/open-form-button/i);
        expect(openButton).toBeDefined();
        fireEvent.click(openButton);
        expect(screen.findByTestId(/item-form-modal/i)).toBeDefined();
    });
})