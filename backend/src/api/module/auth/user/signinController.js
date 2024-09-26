import { createUser, findUserByEmail} from '../../user/repositories/userRepository.js'
import { validateEmail } from '../../user/validators/uservValidator.js'
import { generateAccessToken, generateRefreshToken } from '../token/generateToken.js';

//User Signin controller
const signin = async (req, res) => {
  console.log("entered signin")
  const { email } = req.body;

  // Validate email
  const { error } = validateEmail(email);
  if (error) return res.status(400).send(error.details[0].message);
  
  try {
    let user = await findUserByEmail(email);
    if (!user) {
        user = await createUser(email);
        console.log(user)
    }
    //issue tokens
    const accessToken = generateAccessToken(user.email,'user');
    const refreshToken = generateRefreshToken(user.email,'user');
    // Store refresh token in the database
    user.refreshToken = refreshToken;
    await user.save();//update user with the refresh token  

    // Send tokens to the client
    return res.status(201).json({ accessToken, refreshToken, user });
  } catch (err) {
    return res.status(500).send('Server error',err);
  }
};

export default signin 
