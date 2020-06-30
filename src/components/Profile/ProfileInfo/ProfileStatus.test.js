import React from "react";
import {create} from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";


describe("ProfileStatus component", () => {

    test("Status", () => {
        const component = create(<ProfileStatus status={'fuck'} />);
        const instance = component.getInstance()
        expect(instance.state.status).toBe('fuck');
    });

    test("span", () => {
        const component = create(<ProfileStatus status={'fuck'} />);
        const root = component.root;
        const span = root.findByType('span');
        expect(span).toBeTruthy();
    });

    test("span children fuck", () => {
        const component = create(<ProfileStatus status={'fuck'} />);
        const root = component.root;
        const span = root.findByType('span');
        expect(span.children[0]).toBe('fuck');
    });

    test("span children vs span props children", () => {
        const component = create(<ProfileStatus status={'fuck'} />);
        const root = component.root;
        const span = root.findByType('span');
        expect(span.children[0] == span.props.children).toBeTruthy();
    });

    test("input instead span", () => {
        const component = create(<ProfileStatus status={'fuck'} />);
        const root = component.root;
        const span = root.findByType('span');
        span.props.onClick();
        expect(root.findByType('input')).toBeTruthy();
    });

    test("input instead span 2", () => {
        const component = create(<ProfileStatus status={'fuck'} />);
        const root = component.root;
        let span = root.findByType('span');
        span.props.onClick();
        let input = root.findByType('input');
        expect(input.props.value).toBe('fuck');
    });

    test("callback test", () => {
        let mockCallback = jest.fn();
        const component = create(<ProfileStatus status={'fuck'} updateStatusThunk={mockCallback} />);
        const instance = component.getInstance();
        instance.offEditStatus();
        expect(mockCallback.mock.calls.length).toBe(1);
    });

});
