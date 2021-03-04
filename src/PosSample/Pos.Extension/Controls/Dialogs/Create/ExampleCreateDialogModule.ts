/**
 * SAMPLE CODE NOTICE
 * 
 * THIS SAMPLE CODE IS MADE AVAILABLE AS IS.  MICROSOFT MAKES NO WARRANTIES, WHETHER EXPRESS OR IMPLIED,
 * OF FITNESS FOR A PARTICULAR PURPOSE, OF ACCURACY OR COMPLETENESS OF RESPONSES, OF RESULTS, OR CONDITIONS OF MERCHANTABILITY.
 * THE ENTIRE RISK OF THE USE OR THE RESULTS FROM THE USE OF THIS SAMPLE CODE REMAINS WITH THE USER.
 * NO TECHNICAL SUPPORT IS PROVIDED.  YOU MAY NOT DISTRIBUTE THIS CODE UNLESS YOU HAVE A LICENSE AGREEMENT WITH MICROSOFT THAT ALLOWS YOU TO DO SO.
 */

import * as Dialogs from "PosApi/Create/Dialogs";
import { Entities } from "../../../DataService/DataServiceEntities.g";
import { ObjectExtensions } from "PosApi/TypeExtensions";

type DialogResolve = (updatedEntity: Entities.ExampleEntity) => void;
type DialogReject = (reason: any) => void;

export default class ExampleCreateDialog extends Dialogs.ExtensionTemplatedDialogBase {
    private _resolve: DialogResolve;
    private _data: Entities.ExampleEntity;

    constructor() {
        super();
        this._data = {
            UnusualEntityId: -1,
            IntData: 0,
            StringData: "",
            ExtensionProperties: []
        };
    }

    /**
     * Executed when the dialog is instantiated, its HTML element is rendered and ready to be used.
     * @param {HTMLElement} element The HTMLElement
     */
    public onReady(element: HTMLElement): void {
        let intDataInput: HTMLInputElement = element.querySelector("#intData") as HTMLInputElement;
        intDataInput.onchange = () => { this._data.IntData = intDataInput.valueAsNumber; };

        let stringDataInput: HTMLInputElement = element.querySelector("#stringData") as HTMLInputElement;
        stringDataInput.onchange = () => { this._data.StringData = stringDataInput.value; };
    }

    /**
     * Opens the dialog.
     */
    public open(): Promise<Entities.ExampleEntity> {
        let promise: Promise<Entities.ExampleEntity> = new Promise((resolve: DialogResolve, reject: DialogReject) => {
            this._resolve = resolve;
            let option: Dialogs.ITemplatedDialogOptions = {
                title: "Create Example Entity",
                button1: {
                    id: "buttonCreate",
                    label: this.context.resources.getString("string_2001"),
                    isPrimary: true,
                    onClick: this._buttonUpdateClickHandler.bind(this)
                },
                button2: {
                    id: "buttonCancel",
                    label: this.context.resources.getString("string_2004"),
                    onClick: this._buttonCancelClickHandler.bind(this)
                },
                onCloseX: () => this._buttonCancelClickHandler()
            };

            this.openDialog(option);
        });

        return promise;
    }

    /**
     * A handler for when the user clicks on the update button.
     */
    private _buttonUpdateClickHandler(): boolean {
        this._resolvePromise(this._data);
        return true;
    }

    /**
     * A handler for when the user clicks on the cancel button.
     */
    private _buttonCancelClickHandler(): boolean {
        this._resolvePromise(null);
        return true;
    }

    /**
     * Resolves the stored promise with the payload of editResult.
     * @param {Entities.ExampleEntity} createResult The edit result.
     */
    private _resolvePromise(createResult: Entities.ExampleEntity): void {
        if (ObjectExtensions.isFunction(this._resolve)) {
            this._resolve(createResult);
            this._resolve = null;
        }
    }
}
