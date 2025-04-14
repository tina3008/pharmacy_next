import {
  registerUser,
  loginUser,
  logoutUser,
  refreshSession,
  getInfoUserService,
} from '../services/auth.js';
import { ONE_DAY } from '../constants/index.js';

async function register(req, res) {
  const registeredUser = await registerUser(req.body);

  const session = await loginUser({
    email: req.body.email,
    password: req.body.password,
  });

  res.header('Access-Control-Allow-Credentials', 'true');
  res.clearCookie('refreshToken');
  res.clearCookie('sessionId');

  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
  });
  res.clearCookie('sessionId', {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
  });
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
    expires: new Date(Date.now() + ONE_DAY),
  });
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
    expires: new Date(Date.now() + ONE_DAY),
  });

  res.status(201).json({
    status: 201,
    message: 'Successfully registered and logged in!',
    data: {
      accessToken: session.accessToken,
      user: {
        name: registeredUser.name,
        email: registeredUser.email,
        phone: registeredUser.phone,
        id: registeredUser._id,
        createdAt: registeredUser.createdAt,
        updatedAt: registeredUser.updatedAt,
      },
    },
  });
}

async function login(req, res) {
  const session = await loginUser(req.body);
  res.header('Access-Control-Allow-Credentials', 'true');
  res.clearCookie('refreshToken');
  res.clearCookie('sessionId');

  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
  });
  res.clearCookie('sessionId', {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
  });
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
    expires: new Date(Date.now() + ONE_DAY),
  });
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
    expires: new Date(Date.now() + ONE_DAY),
  });

  res.json({
    status: 200,
    message: 'Successfully logged in a user!',
    data: {
      accessToken: session.accessToken,
    },
  });
}

async function logout(req, res) {
  if (req.cookies.sessionId) {
    await logoutUser(req.cookies.sessionId);
  }

  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');

  res.status(204).send();
}

const setupSession = (res, session) => {
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });
};

const refreshRequests = new Map();

export const refreshSessionController = async (req, res) => {
  const sessionId = req.cookies.sessionId;

  if (!sessionId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const now = Date.now();
  const lastRequestTime = refreshRequests.get(sessionId) || 0;

  if (now - lastRequestTime < 5000) {
    return res
      .status(429)
      .json({ message: 'Too many refresh requests, please wait.' });
  }

  refreshRequests.set(sessionId, now);

  try {
    const session = await refreshSession({
      sessionId: req.cookies.sessionId,
      refreshToken: req.cookies.refreshToken,
    });

    setupSession(res, session);
    res.header('Access-Control-Allow-Credentials', 'true');
    res.json({
      status: 200,
      message: 'Successfully refreshed a session!',
      data: {
        accessToken: session.accessToken,
      },
    });
  } catch (error) {
    console.error('refresh session error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getInfoUserController = async (req, res) => {
  const userId = req.user._id;
  const user = await getInfoUserService(userId);

  res.status(200).json({
    status: 200,
    data: user,
  });
};

export { register, login, logout };
