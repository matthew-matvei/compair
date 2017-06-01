import { expect } from "chai";

import { closeModal, openModal } from "actions/modals";
import modalReducers from "reducers/modals";
import { Modals } from "types";

describe("Modal reducers", () => {

    let testIsModalOpen: Modals;

    describe("open", () => {

        beforeEach(() => {
            testIsModalOpen = false;
        });

        it("the modal window showing the addCriterionDialog", () => {
            const result = modalReducers(testIsModalOpen,
                openModal("addCriterionDialog"));

            expect(result).to.equal("addCriterionDialog");
        });

        it("the modal window showing the addInstanceDialog", () => {
            const result = modalReducers(testIsModalOpen,
                openModal("addInstanceDialog"));

            expect(result).to.equal("addInstanceDialog");
        });
    });

    describe("close", () => {

        it("the modal window showing the addCriteriondialog", () => {
            testIsModalOpen = "addCriterionDialog";
            const result = modalReducers(testIsModalOpen, closeModal());

            expect(result).to.be.false;
        });

        it("the modal window showing the addInstancedialog", () => {
            testIsModalOpen = "addInstanceDialog";
            const result = modalReducers(testIsModalOpen, closeModal());

            expect(result).to.be.false;
        });
    });
});
