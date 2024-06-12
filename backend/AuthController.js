// import S from "./UserModel.js";
// import Job from "./Jobmodel.js";
// import AppliedJobModel from "./AppliedJobModel.js";
import UserModel from "./UserModel.js";

export const registerController = async (req, res) => {
    try {
      const { name, email, password, phone, address } = req.body;
  
      // Validations
      if (!name) {
        return res.status(400).send({ message: "Name is required" });
      }
      if (!email) {
        return res.status(400).send({ message: "Email is required" });
      }
      if (!password) {
        return res.status(400).send({ message: "Password is required" });
      }
      if (!phone) {
        return res.status(400).send({ message: "Phone is required" });
      }
      if (!address) {
        return res.status(400).send({ message: "Address is required" });
      }
  
      // Check if user already exists
      const existingUser = await UserModel.findOne({ email });
      console.log("in register controller");
  
      if (existingUser) {
        return res.status(400).send({
          success: false,
          message: "Already registered. Please login",
        });
      }
  
      // Register user
      const user = await new UserModel({
        name,
        email,
        password,
        phone,
        address,
      }).save();
  
      res.status(201).send({
        success: true,
        message: "Successfully registered",
        user,
      });
    } catch (error) {

      console.error(error);
      res.status(500).send({
        success: req.body.email,
        message: "Error in registration",
        error: error.message,
      });
    }
  };

 export const loginController = async (req, res) => {
  try {
    // Taking parameters
    const { email, password } = req.body;
    //  giving error if email or password is not given by user
    if (!email) {
      return res.send({ message: "Please provide email" });
    }
    if (!password) {
      return res.send({ message: "Please provide password" });
    }
    // check: has the user already been registered ?
    const user = await UserModel.findOne({ email });
    if (!user) {
     return( res.send({
        success:false,
        message: "Please Register first" }));
    }
    console.log(user.password)
    // const match = await comparePassword(password, user.password);
    if (user.password!=password) {
    return res.status(200).send({ 
        success:false,
        message: "Invalid password" });
    }
    // localStorage.setItem('userData', JSON.stringify(user.name));

  
    //token
    // const token =  JWT.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:"20d"})
    // if login successfully done
    res
      .status(200)
      .send({
        success: true,
        message: "Successfully login",
        user: { name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address
        },
      });
    // res.status(200).json({
    //   token : token
    // })
      
  } catch (error) {
    console.error(error);
    // if unexpected error occurs
    res.send({
      error: true,
      message: "Error while login",
      error
    });
  }
};


