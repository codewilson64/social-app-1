const DUMMYPOSTS = [
  {
    _id: "1",
    text: "Hello React, I love programming and design",
    user: {
      username: "wilson64",
      fullName: "Wilson"
    },
    likes: ['111', '222', '333'],
    comments: [
      {
        _id: "2",
        text: "Hello Wilson I love you!",
        user: {
          username: "chealsea23",
          fullName: "Chealsea"
        }
      }
    ]
  },
  {
    _id: "2",
    text: "Hello Javascript",
    user: {
      username: "wilson64",
      fullName: "Wilson"
    },
    likes: ['111', '222', '333', '444', '555'],
    comments: [
      {
        _id: "3",
        text: "Hello manda!",
        user: {
          username: "jesslyn123",
          fullName: "Jesslyn"
        }
      }
    ]
  },
  {
    _id: "3",
    text: "Hello API",
    user: {
      username: "wilson64",
      fullName: "Wilson"
    },
    likes: ['111', '222'],
    comments: []
  },
  {
    _id: "4",
    text: "Hello from Saturn",
    user: {
      username: "wilson64",
      fullName: "Wilson"
    },
    likes: ['111', '222', '333', '444', '555', '666'],
    comments: [
      {
        _id: "3",
        text: "Hello manda!",
        user: {
          username: "jesslyn123",
          fullName: "Jesslyn"
        }
      },
      {
        _id: "1",
        text: "Nice post!",
        user: {
          username: "wilson64",
          fullName: "Wilson"
        }
      }
    ]
  },
  {
    _id: "5",
    text: "Hello from the other side",
    user: {
      username: "wilson64",
      fullName: "Wilson"
    },
    likes: [],
    comments: []
  },
]

export const DUMMY_SUGGESTED_USERS = [
	{
		_id: "1",
		fullName: "John Doe",
		username: "johndoe",
	},
	{
		_id: "2",
		fullName: "Jane Doe",
		username: "janedoe",
	},
	{
		_id: "3",
		fullName: "Bob Doe",
		username: "bobdoe",
	},
	{
		_id: "4",
		fullName: "Daisy Doe",
		username: "daisydoe",
	},
];

export default DUMMYPOSTS