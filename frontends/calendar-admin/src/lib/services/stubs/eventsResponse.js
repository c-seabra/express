import moment from 'moment'
export default {
    "calendar_events": [
        {
            "id": "e83e7504-babc-46d4-ac45-a9b2f9eacb1e",
            "type": "calendar_event",
            "title": "Calendar event",
            "description": "This is a calendar event with a predefined location 3",
            "starts_at": "2019-04-11T06:15:06.078Z",
            "ends_at": "2019-04-11T09:45:06.078Z",
            "location": {
                "id": "452bf6c7-21de-4b1a-b31d-6bde4edadd40",
                "type": "location"
            },
            "source": null,
            "organizer": {
                "id": "725603d6-b60f-48a0-ab3c-6f9187c163c3",
                "type": "attendance"
            },
            "invitations": [
                {
                    "id": "c7bf3fc8-248d-4a04-bed9-e4288e87e5ac",
                    "type": "invitation",
                    "response": {
                        "response_status": "accepted",
                        "responded_at": "2019-04-04T16:03:06.078Z"
                    },
                    "invitee": {
                        "id": "725603d6-b60f-48a0-ab3c-6f9187c163c3",
                        "type": "attendance"
                    }
                }
            ]
        },
        {
            "id": "2828e123-9b27-47a9-a70e-8fcd0e25fd54",
            "type": "calendar_event",
            "title": "Calendar event",
            "description": "This is a calendar event with a predefined location 3",
            "starts_at": "2019-04-04T09:03:06.078Z",
            "ends_at": "2019-04-04T10:03:06.078Z",
            "location": {
                "id": "452bf6c7-21de-4b1a-b31d-6bde4edadd40",
                "type": "location"
            },
            "source": null,
            "organizer": {
                "id": "725603d6-b60f-48a0-ab3c-6f9187c163c3",
                "type": "attendance"
            },
            "invitations": [
                {
                    "id": "b3243609-98cf-45b3-9302-22b2723962a1",
                    "type": "invitation",
                    "response": {
                        "response_status": "accepted",
                        "responded_at": "2019-04-04T16:03:14.765Z"
                    },
                    "invitee": {
                        "id": "725603d6-b60f-48a0-ab3c-6f9187c163c3",
                        "type": "attendance"
                    }
                }
            ]
        },
        {
            "id": "4e598025-fd2d-4abe-b535-1c8601987362",
            "type": "calendar_event",
            "title": "Calendar event",
            "description": "This is a calendar event with a predefined location 3",
            "starts_at": "2019-04-04T07:03:06.078Z",
            "ends_at": "2019-04-04T08:03:06.078Z",
            "location": {
                "id": "452bf6c7-21de-4b1a-b31d-6bde4edadd40",
                "type": "location"
            },
            "source": null,
            "organizer": {
                "id": "725603d6-b60f-48a0-ab3c-6f9187c163c3",
                "type": "attendance"
            },
            "invitations": [
                {
                    "id": "d0555dff-7820-4b49-adb0-cb79f7418ab8",
                    "type": "invitation",
                    "response": {
                        "response_status": "accepted",
                        "responded_at": "2019-04-04T16:03:15.568Z"
                    },
                    "invitee": {
                        "id": "725603d6-b60f-48a0-ab3c-6f9187c163c3",
                        "type": "attendance"
                    }
                }
            ]
        },
        {
            "id": "09febde6-0ac7-42f3-bbd2-444abf92cd03",
            "type": "calendar_event",
            "title": "Calendar event that is always in view",
            "description": "This one is dynamically created to be today",
            "starts_at": moment(`${moment().format('MM-DD-YYYY')} 11:45 AM`, 'MM-DD-YYYY hh:mm A').toDate(),
            "ends_at": moment(`${moment().format('MM-DD-YYYY')} 1:45 PM`, 'MM-DD-YYYY hh:mm A').toDate(),
            "location": {
                "id": "452bf6c7-21de-4b1a-b31d-6bde4edadd40",
                "type": "location"
            },
            "source": null,
            "organizer": {
                "id": "725603d6-b60f-48a0-ab3c-6f9187c163c3",
                "type": "attendance"
            },
            "invitations": [
                {
                    "id": "eaa250af-f947-4b5d-a968-0a9e14ce32d2",
                    "type": "invitation",
                    "response": {
                        "response_status": "accepted",
                        "responded_at": "2019-04-04T16:03:16.589Z"
                    },
                    "invitee": {
                        "id": "725603d6-b60f-48a0-ab3c-6f9187c163c3",
                        "type": "attendance"
                    }
                },
                {
                    "id": "79e5eddf-3857-4f77-9d9b-5f9f6b6821be",
                    "type": "invitation",
                    "response": {
                        "response_status": "needs_action",
                        "responded_at": "2019-04-04T16:03:23.253Z"
                    },
                    "invitee": {
                        "id": "7ab468c2-61bf-46ec-b9e3-a054d4c581b4",
                        "type": "attendance"
                    }
                },
                {
                    "id": "0f793f27-5d43-415d-9dd2-9882a770254a",
                    "type": "invitation",
                    "response": {
                        "response_status": "needs_action",
                        "responded_at": "2019-04-04T16:03:24.270Z"
                    },
                    "invitee": {
                        "id": "d20960f6-c349-4b7d-88f2-a236c6181175",
                        "type": "attendance"
                    }
                }
            ]
        },
        {
            "id": "53d66e0f-d3a2-4d7e-8cbe-23a2b05c0778",
            "type": "calendar_event",
            "title": "Calendar event",
            "description": "This is a calendar event with a predefined location 3",
            "starts_at": "2019-02-18",
            "ends_at": "2019-02-18",
            "location": {
                "id": "452bf6c7-21de-4b1a-b31d-6bde4edadd40",
                "type": "location"
            },
            "source": null,
            "organizer": {
                "id": "725603d6-b60f-48a0-ab3c-6f9187c163c3",
                "type": "attendance"
            },
            "invitations": [
                {
                    "id": "701864f8-e850-447f-aca9-7ed0de1e2f3b",
                    "type": "invitation",
                    "response": {
                        "response_status": "accepted",
                        "responded_at": "2019-04-04T16:03:27.487Z"
                    },
                    "invitee": {
                        "id": "725603d6-b60f-48a0-ab3c-6f9187c163c3",
                        "type": "attendance"
                    }
                },
                {
                    "id": "44cc3a1b-a3bb-45ca-b2f4-6afd84e7d0bc",
                    "type": "invitation",
                    "response": {
                        "response_status": "needs_action",
                        "responded_at": "2019-04-04T16:03:29.641Z"
                    },
                    "invitee": {
                        "id": "7a3583d7-d9fa-4c5e-be61-1ab50de48b94",
                        "type": "attendance"
                    }
                },
                {
                    "id": "225b5fa8-6986-4124-a12b-306c1e3ede7b",
                    "type": "invitation",
                    "response": {
                        "response_status": "needs_action",
                        "responded_at": "2019-04-04T16:03:30.445Z"
                    },
                    "invitee": {
                        "id": "fc2b1c7a-834b-41ef-a843-ec98d03b61ae",
                        "type": "attendance"
                    }
                }
            ]
        },
        {
            "id": "51bd98bb-b2c7-4e3c-877e-245f4838ea69",
            "type": "calendar_event",
            "title": "Calendar event",
            "description": "This is a calendar event with a predefined location 3",
            "starts_at": "2019-02-18",
            "ends_at": "2019-02-18",
            "location": {
                "id": "452bf6c7-21de-4b1a-b31d-6bde4edadd40",
                "type": "location"
            },
            "source": null,
            "organizer": {
                "id": "725603d6-b60f-48a0-ab3c-6f9187c163c3",
                "type": "attendance"
            },
            "invitations": [
                {
                    "id": "ef3098c2-1a45-40cc-b362-4fb69855ea84",
                    "type": "invitation",
                    "response": {
                        "response_status": "accepted",
                        "responded_at": "2019-04-04T16:03:33.095Z"
                    },
                    "invitee": {
                        "id": "725603d6-b60f-48a0-ab3c-6f9187c163c3",
                        "type": "attendance"
                    }
                },
                {
                    "id": "2b4fdcfe-8c9d-46ab-be1f-e3846d684089",
                    "type": "invitation",
                    "response": {
                        "response_status": "needs_action",
                        "responded_at": "2019-04-04T16:03:36.029Z"
                    },
                    "invitee": {
                        "id": "5f59b0cd-2290-415a-befe-0d74d361d43d",
                        "type": "attendance"
                    }
                },
                {
                    "id": "1d0f2afd-8652-476a-866d-3eac10b9e4a4",
                    "type": "invitation",
                    "response": {
                        "response_status": "needs_action",
                        "responded_at": "2019-04-04T16:03:36.768Z"
                    },
                    "invitee": {
                        "id": "0b39d5ec-9a8f-48a5-99c5-e17587f15df8",
                        "type": "attendance"
                    }
                }
            ]
        }
    ]
}
