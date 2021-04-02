import React from 'react';
import renderer from 'react-test-renderer';
import Avatar from './Avatar.jsx';

describe('Avatar', () => {

    test('renders without props', () => {
        const component = renderer.create(
            <Avatar />,
        );
        expect(component.toJSON()).toMatchSnapshot();
    });

    test('renders with props', () => {
        const component = renderer.create(
            <Avatar
                src="https://s3-eu-west-1.amazonaws.com/avenger.cilabs.net/staging/avatars/medium/8a86c417e1f0bf13bcd3f1b33fe7f36dd29dc5ff.png?1524668194"
                defaultSrc="https://websummit.com/wp-content/uploads/2019/06/ws-logo-pride2.png"
                alt="Invitee avatar"
            />,
        );
        expect(component.toJSON()).toMatchSnapshot();
    });

});
