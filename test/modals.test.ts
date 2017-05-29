import { expect } from "chai";

import { closeModal, openModal } from "actions/modals";
import modalReducers from "reducers/modals";

describe("Modal reducers", () => {

    let testIsModalOpen: boolean;

    describe("open", () => {

        it("the modal window", () => {
            testIsModalOpen = false;
            const result = modalReducers(testIsModalOpen, openModal());

            expect(result).to.be.true;
        });
    });

    describe("close", () => {

        it("the modal window", () => {
            testIsModalOpen = true;
            const result = modalReducers(testIsModalOpen, closeModal());

            expect(result).to.be.false;
        });
    });
});
