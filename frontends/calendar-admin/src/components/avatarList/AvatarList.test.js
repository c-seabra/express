import React from 'react';
import renderer from 'react-test-renderer';
import AvatarList from './AvatarList.jsx';

describe('AvatarList', () => {
    let realUseContext;
    let useContextMock;

    beforeEach(() => {
        realUseContext = React.useContext;
        React.useContext = jest.fn()
        useContextMock = React.useContext;
    });

    afterEach(() => {
        React.useContext = realUseContext;
    });

    test('renders without props', () => {
        useContextMock.mockReturnValue({});
        const component = renderer.create(
            <AvatarList />,
        );
        expect(component.toJSON()).toMatchSnapshot();
    });

    test('renders with props', () => {
        useContextMock.mockReturnValue({});
        const component = renderer.create(
            <AvatarList
                styles="styles"

                avatarList={[
                    {
                        invitation: { id: 123, response: { response_status: 'accepted' } },
                        attendance: { data: { person: { first_name: 'Tomasz' } } }

                    }
                ]}
                organizerId="123456"

                iconActive={true}
                iconType="delete"
                iconClickCallback={function () { return null }}
            />,
        );
        expect(component.toJSON()).toMatchSnapshot();
    });

});
