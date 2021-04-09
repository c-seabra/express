import Api from './Api';

describe('Api', () => {
  test('getEvents', async () => {
    const response = await Api.getEvents('testToken', 'mock');
    expect(response.data.calendar_events.length).toBe(6);
  });

  test('getLocation', async () => {
    const response = await Api.getLocation(
      '452bf6c7-21de-4b1a-b31d-6bde4edadd40',
      'conf_slug',
      'mock',
    );
    expect(response.data.name).toBe('Sunset Summit');
  });

  test('getLocations', async () => {
    const response = await Api.getLocations('conf_slug', 'mock');
    expect(response.data);
  });

  test('getAttendance', async () => {
    const response = await Api.getAttendance(
      '725603d6-b60f-48a0-ab3c-6f9187c163c3',
      'conf_slug',
      'testToken',
      'mock',
    );
    expect(response.data.person.first_name).toBe('Susan');
  });

  test('getNotificationsData', async () => {
    const response = await Api.getNotificationsData('campaigns', 'mock');
    expect(response.data.calendar_events.length).toBe(2);
  });
});
