const USERS = [
  {
    name: "Inas",
    email: "admin@gmail.com",
    password: "123456789",
  },
];

export const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    // 400: bad response (browser)
    // 500: server error (server/database)
    // 200: success
    res.status(400).json({
      status: false,
      message: "Email atau Password required",
    });
  }

  // find()
  const user = USERS.find((u) => u.email === email && u.password === password);
  if (!user) {
    // 401: unauthorize (login gagal)
    return res.status(401).json({
      status: false,
      message: "Invalid Credential",
    });
  }

  res.status(200).json({
    status: true,
    message: "Login Success",
    data: {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token: `jwt-token-123 ${user.id} - ${Date.now()}`,
    },
  });
};
